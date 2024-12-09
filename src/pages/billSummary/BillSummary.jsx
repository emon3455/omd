import React, { useState } from "react";
import Select from "react-select";
import Table from "../../component/Table";
import { Eye, RotateCcw, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BillSummary = () => {
  const [filters, setFilters] = useState({
    invoiceNumber: null,
    paymentDateFrom: "",
    paymentDateTo: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Items per page

  const user = useSelector((state) => state.userSlice.user);

  // Add a fallback for `user` if it's null or undefined
  if (!user) {
    return <div>Loading...</div>;
  }

  const { paymentHistory } = user;

  // Prepare Select options
  const options = paymentHistory.map((entry) => ({
    value: entry.transactionId,
    label: `Invoice: ${entry.transactionId}`,
  }));

  // Format the data
  const formattedData = paymentHistory.map((entry) => ({
    "Payment Date": entry.paymentDate.slice(0, 8), // Slice first 8 characters
    "Invoice Number": entry.transactionId,
    "Plan": entry.plan,
    "Paid Amount ($)": entry.amount,
    View: (
      <Link to={`/invoice/${entry?._id}`}>
        <Eye className="text-primary cursor-pointer" />
      </Link>
    ),
  }));

  const [data, setData] = useState(formattedData);

  const tableColumns = [
    "Payment Date",
    "Invoice Number",
    "Plan",
    "Paid Amount ($)",
    "View",
  ];

  // Handle filtering
  const handleFilterChange = (selectedOption) => {
    setFilters({ ...filters, invoiceNumber: selectedOption });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    const { invoiceNumber, paymentDateFrom, paymentDateTo } = filters;

    const filteredData = formattedData.filter((row) => {
      const matchesInvoice =
        !invoiceNumber || row["Invoice Number"] === invoiceNumber.value;

      const matchesDateFrom =
        !paymentDateFrom ||
        new Date(row["Payment Date"]) >= new Date(paymentDateFrom);

      const matchesDateTo =
        !paymentDateTo ||
        new Date(row["Payment Date"]) <= new Date(paymentDateTo);

      return matchesInvoice && matchesDateFrom && matchesDateTo;
    });

    setData(filteredData);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const handleReset = () => {
    setFilters({
      invoiceNumber: null,
      paymentDateFrom: "",
      paymentDateTo: "",
    });
    setData(formattedData);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="max-w-screen-2xl mx-auto min-h-screen mt-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold text-center mb-14">Bill Summary</h1>

      {/* Filters */}
      <div className="flex flex-wrap max-w-screen-xl mx-auto items-end gap-4 mb-6">
        {/* Filter by Invoice Number */}
        <div className="flex-1 min-w-[200px]">
          <label className="font-semibold block mb-2" htmlFor="invoiceNumber">
            Filter by Invoice Number
          </label>
          <Select
            id="invoiceNumber"
            options={options}
            value={filters.invoiceNumber}
            onChange={handleFilterChange}
            placeholder="Select an invoice"
            isClearable
            className="w-full"
            styles={{
              control: (base, state) => ({
                ...base,
                borderColor: state.isFocused ? "#00836C" : base.borderColor, // Green border when focused
                boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 131, 108, 0.5)" : "none", // Green ring effect
                "&:hover": {
                  borderColor: "#00836C", // Green border on hover
                },
              }),
            }}
          />
        </div>
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="font-semibold text-black p-2 rounded hover:bg-gray-200 transition"
            title="Reset Filters"
          >
            <RotateCcw />
          </button>
          <button
            onClick={handleSearch}
            className="bg-[#00836C] font-semibold text-white py-2 px-4 flex justify-center items-center gap-2 rounded hover:bg-[#00C85C] transition"
          >
            <Search />
            Search
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 rounded shadow">
        <Table columns={tableColumns} data={currentData} />
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-4">
        <button
          className={`border-2 text-white py-2 bg-[#00836C] hover:bg-[#00836C] px-4 rounded-lg ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "bg-[#00836C]"
            }`}
          onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`border-2 rounded-full font-semibold  border-[#00836C] py-2 px-4 ${currentPage === index + 1
                ? "bg-[#00836C] text-white"
                : "text-black hover:text-white hover:bg-[#00836C]"
              }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`border-2 text-white bg-[#00836C] hover:bg-[#00836C] py-2 px-4 rounded-lg ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "bg-[#00836C]"
            }`}
          onClick={() =>
            currentPage < totalPages && handlePageClick(currentPage + 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BillSummary;
