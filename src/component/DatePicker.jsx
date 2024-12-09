import { CalendarRange, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

export default function DatePicker({ selectedStartDate, selectedEndDate, onDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const datepickerRef = useRef(null);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    // Add empty spaces before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`}></div>);
    }

    // Render each day of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(Date.UTC(year, month, i));  // Ensure UTC date
      const dayString = day.toISOString().split('T')[0]; // Format date for comparison
      let className = "flex items-center justify-center cursor-pointer w-[46px] h-[46px] text-dark-3 dark:text-dark-6 hover:bg-primary hover:text-white";

      if (startDate && dayString === startDate) {
        className += " bg-[#00C85C] text-white";
      }
      if (endDate && dayString === endDate) {
        className += " bg-[#00C85C] text-white";
      }
      if (
        startDate &&
        endDate &&
        new Date(day) > new Date(startDate) &&
        new Date(day) < new Date(endDate)
      ) {
        className += " bg-[#00C85C] text-white"; // Highlight days in between
      }

      daysArray.push(
        <div
          key={i}
          className={className}
          data-date={dayString}
          onClick={() => handleDayClick(dayString)}
        >
          {i}
        </div>
      );
    }

    return daysArray;
  };

  const handleDayClick = (selectedDay) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(selectedDay);
      setEndDate(null);
    } else {
      if (new Date(selectedDay) < new Date(startDate)) {
        setEndDate(startDate);
        setStartDate(selectedDay);
      } else {
        setEndDate(selectedDay);
      }
    }

    // Directly update the parent component's state
    const adjustedEndDate = endDate ? new Date(endDate) : null;

    if (adjustedEndDate) {
      // Adjust to end of the day (23:59:59 UTC)
      adjustedEndDate.setUTCHours(23, 59, 59, 999);
    }

    // Convert start and end dates to UTC to ensure consistency
    const utcStartDate = new Date(startDate);
    const formattedStartDate = utcStartDate.toISOString().split('T')[0];

    const formattedEndDate = adjustedEndDate
      ? adjustedEndDate.toISOString().split('T')[0]
      : null;

    onDateChange(formattedStartDate, formattedEndDate);
  };

  const updateInput = () => {
    if (startDate && endDate) {
      return `${startDate} ~ ${endDate}`;
    } else if (startDate) {
      return startDate;
    } else {
      return "";
    }
  };

  const toggleDatepicker = () => {
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = (e) => {
    if (datepickerRef.current && !datepickerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <section className="bg-white dark:bg-dark">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="">
              <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
                Date range picker
              </label>

              <div className="relative" ref={datepickerRef}>
                <div className="relative flex items-center">
                  <span className="absolute left-0 pl-5 text-dark-5">
                    <CalendarRange color="#979797" />
                  </span>

                  <input
                    id="datepicker"
                    type="text"
                    placeholder="Pick a date"
                    className="w-full rounded-md border text-gray-500 border-gray-300 bg-transparent py-2 pl-[50px] pr-8 text-dark-2 outline-none transition focus:border-primary dark:border-dark-3 dark:text-dark-6 dark:focus:border-primary"
                    value={updateInput()}
                    onClick={toggleDatepicker}
                    readOnly
                  />

                  <span
                    className="absolute right-0 cursor-pointer pr-4 text-dark-5"
                    onClick={toggleDatepicker}
                  >
                    <ChevronDown />
                  </span>
                </div>

                {isOpen && (
                  <div
                    id="datepicker-container"
                    className="shadow-datepicker absolute mt-2 rounded-xl border border-stroke bg-white pt-5 dark:border-dark-3 dark:bg-dark-2"
                  >
                    <div className="flex items-center justify-between px-5">
                      <button
                        id="prevMonth"
                        className="rounded-md px-2 py-2 text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-dark"
                        onClick={() =>
                          setCurrentDate(
                            new Date(
                              currentDate.setMonth(currentDate.getMonth() - 1)
                            )
                          )
                        }
                      >
                        <ChevronLeft />
                      </button>

                      <div
                        id="currentMonth"
                        className="text-lg font-medium text-dark-3 dark:text-white"
                      >
                        {currentDate.toLocaleString("default", {
                          month: "long",
                        })}{" "}
                        {currentDate.getFullYear()}
                      </div>

                      <button
                        id="nextMonth"
                        className="rounded-md px-2 py-2 text-dark hover:bg-gray-2 dark:text-white dark:hover:bg-dark"
                        onClick={() =>
                          setCurrentDate(
                            new Date(
                              currentDate.setMonth(currentDate.getMonth() + 1)
                            )
                          )
                        }
                      >
                        <ChevronRight />
                      </button>
                    </div>

                    <div className="mb-4 mt-6 grid grid-cols-7 gap-2 px-5">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                          <div
                            key={day}
                            className="text-center text-sm font-medium text-secondary-color"
                          >
                            {day}
                          </div>
                        )
                      )}
                    </div>

                    <div
                      id="days-container"
                      className="mt-2 grid grid-cols-7 gap-y-0.5 px-5"
                    >
                      {renderCalendar()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
