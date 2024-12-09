import {} from "react";
import CapsuleAnimation from "./capsuleLoading/CapsuleAnimation";

const Table = ({ columns, data, isLoading }) => {
  return (
    <div className="container mx-auto px-4  sm:px-8 overflow-x-auto">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full pb-8 overflow-hidden">
            <table className="min-w-full  leading-normal">
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="px-5 py-3 font-bold border-gray-200 text-left text-sm text-gray-700 uppercase tracking-wider"
                    >
                      <p className="grid justify-start">
                        {col}
                        <p className="border-[#9FEEA7] border-b-2" />
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {data?.length > 0 ? (
                  data?.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={`font-semibold text-gray-500 text-sm ${
                        rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      {columns.map((col, colIndex) => {
                        // Check if the column is "Payment Status"
                        const isPaymentStatus = col === "Payment Status";
                        const paymentStatus = row[col];

                        let paymentStatusClass = "";
                        if (isPaymentStatus) {
                          // Apply green for "Paid" and red for "Failed"
                          if (paymentStatus === "Paid") {
                            paymentStatusClass = "text-primary"; // Green
                          } else if (paymentStatus === "Failed") {
                            paymentStatusClass = "text-red-500"; // Red
                          }
                        }

                        return (
                          <td
                            key={colIndex}
                            className={`px-4 py-4 border-none text-sm ${
                              rowIndex % 2 === 0
                                ? colIndex === 0
                                  ? "rounded-l-full"
                                  : colIndex === columns.length - 1
                                  ? "rounded-r-full"
                                  : ""
                                : colIndex === 0
                                ? ""
                                : colIndex === columns.length - 1
                                ? ""
                                : ""
                            } ${paymentStatusClass}`}
                          >
                            {row[col] || "N/A"}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="text-center px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {isLoading && (
              <div className="flex  mx-auto justify-center items-center w-full">
                <CapsuleAnimation />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
