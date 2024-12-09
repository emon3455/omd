import { useState } from "react";
import { Search } from "lucide-react";
import Table from "../../component/Table";
import { useGetAllPaymentsQuery } from "../../redux/features/payment/paymentApiSlice";
import formatDate from "../../utils/formateDate";
import Pagination from "../../component/Pagination";
import Datepicker from "react-tailwindcss-datepicker";
import capitalizeWords from "../../utils/CapitalizeText";

const NEXT_MONTH = new Date();
NEXT_MONTH.setMonth(NEXT_MONTH.getMonth() + 1);

const PaymentReportPage = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // Fetch data from backend with filters and pagination
  const {
    data: paymentData,
    error,
    isLoading,
  } = useGetAllPaymentsQuery({
    page: currentPage,
    limit,
    search,
    startDate: dateRange.startDate
      ? new Date(dateRange.startDate).toISOString()
      : null,
    endDate: dateRange.endDate
      ? new Date(dateRange.endDate).toISOString()
      : null,
  });

  // Calculate the total amount
  const totalAmount = paymentData?.data?.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  // Table columns
  const columns = [
    "Name",
    "Email",
    "Amount",
    "Transaction ID",
    "Payment Date",
    "Phone",
  ];

  // Data mapping for the table
  const filteredData =
    paymentData?.data?.map((item) => ({
      Name: capitalizeWords(
        `${item?.userId?.firstName} ${item?.userId?.lastName}`
      ),
      Email: `${item?.userId?.email}`,
      Amount: `$${item?.amount}`,
      "Transaction ID": item?.transactionId,
      "Payment Date": formatDate(item?.paymentDate),
      Phone: `${item?.userId?.phone}`,
    })) || [];

  // Enhanced error handling
  const errorMessage = error?.data?.message || "An error occurred";

  return (
    <div>
      <div className="grid justify-items-center pb-6">
        <h1 className="text-3xl font-semibold my-10">Payment Report</h1>

        <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4 mb-6  ">
          {/* Search Input */}
          <div className="transition w-full flex gap-3 px-3 items-center h-[2.6rem] border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by transaction id"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus:outline-none w-full"
            />
          </div>

          {/* Datepicker */}
          <Datepicker
            primaryColor="green"
            value={dateRange}
            onChange={(newValue) => {
              setCurrentPage(1);
              setDateRange({
                startDate: newValue.startDate
                  ? new Date(newValue.startDate)
                  : null,
                endDate: newValue.endDate ? new Date(newValue.endDate) : null,
              });
            }}
            showShortcuts={true}
            inputClassName="border py-2 px-4 min-w-72 border-gray-300 rounded-md"
          />
        </div>

        {/* Total Amount */}
        <div className="mt-10 text-2xl font-semibold">
          Total Paid Amount: ${totalAmount || 0}
        </div>

        {/* Data Table */}
        {paymentData?.data?.length ? (
          <Table isLoading={isLoading} data={filteredData} columns={columns} />
        ) : (
          <p className="text-center text-gray-500 mt-6">
            {isLoading ? "Loading data..." : "No payment records found."}
          </p>
        )}

        {/* Pagination */}
        <div className="w-full max-w-screen-md flex justify-center -mt-24">
          <Pagination
            totalCount={paymentData?.total || 0}
            limit={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      )}
    </div>
  );
};

export default PaymentReportPage;
