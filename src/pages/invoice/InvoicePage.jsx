import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../assets/OMD.png"
import { Download } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetSinglePaymentQuery } from "../../redux/features/payment/paymentApiSlice";
import { useParams } from "react-router-dom";

// Styles for the PDF document
const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 30,
  },
  font: {
    fontSize: 12,
  },
  title: {
    fontSize: 12,
    textAlign: "right",
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#e4e4e4",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e4",
    padding: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10,
  },
  footer: {
    marginTop: 20,
    fontSize: 10,
    textAlign: "center",
  },
});

// PDF Invoice Document Component
const MyDocument = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Header Section */}
      <View style={pdfStyles.header}>
        <Image style={pdfStyles.logo} src={logo} />
        <Text style={pdfStyles.title}>Invoice No: {invoiceData?.invoiceNumber}</Text>
      </View>
      <View>
        <Text style={pdfStyles.font}>Name: {invoiceData?.customerName}</Text>
        <Text style={pdfStyles.font}>Address: {invoiceData?.customerAddress}</Text>
      </View>

      {/* Invoice Summary Table */}
      <View style={pdfStyles.table}>
        <View style={[pdfStyles.tableRow, { backgroundColor: "#EAF3E6" }]}>
          <Text style={pdfStyles.tableCell}>Invoice Number</Text>
          <Text style={pdfStyles.tableCell}>Date</Text>
          <Text style={pdfStyles.tableCell}>Total Amount ($)</Text>
        </View>
        <View style={pdfStyles.tableRow}>
          <Text style={pdfStyles.tableCell}>{invoiceData?.invoiceNumber}</Text>
          <Text style={pdfStyles.tableCell}>{invoiceData?.date}</Text>
          <Text style={pdfStyles.tableCell}>{invoiceData?.totalAmount}</Text>
        </View>
      </View>

      {/* Members Information Section */}
      <Text style={{ marginTop: 20, fontSize: 14, fontWeight: "bold" }}>Plan Information</Text>
      <View style={pdfStyles.table}>
        <View style={[pdfStyles.tableRow, { backgroundColor: "#EAF3E6" }]}>
          <Text style={pdfStyles.tableCell}>Serial No.</Text>
          <Text style={pdfStyles.tableCell}>Member Name</Text>
          <Text style={pdfStyles.tableCell}>Program Name</Text>
          <Text style={pdfStyles.tableCell}>Amount ($)</Text>
        </View>

        <View style={pdfStyles.tableRow} >
          <Text style={pdfStyles.tableCell}>{1}</Text>
          <Text style={pdfStyles.tableCell}>{invoiceData?.customerName}</Text>
          <Text style={pdfStyles.tableCell}>{invoiceData?.members?.plan}</Text>
          <Text style={pdfStyles.tableCell}>{invoiceData?.members?.amount}</Text>
        </View>

      </View>
    </Page>
  </Document>
);

// Invoice UI Component
const Invoice = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.userSlice.user);
  const { data, error, isLoading } = useGetSinglePaymentQuery(id);
  console.log(data)
  // Add a fallback for `user` if it's null or undefined
  if (!user) {
    return <div>Loading...</div>; // Or a suitable placeholder
  }
  const { planStartDate, shipingAddress1, _id, lastName, dob, paymentHistory, firstName } = user;

  // Helper function to format dates
  const formatDate = (isoDate) => {
    if (!isoDate) {
      return "Invalid Date"; // Fallback for undefined or null dates
    }

    const date = new Date(isoDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Fallback for malformed dates
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short", // Short month name (e.g., Nov)
      day: "2-digit", // Two-digit day (e.g., 07)
      year: "numeric", // Full year (e.g., 2024)
    }).format(date);
  };
  // const totalAmount = paymentHistory.reduce((total, payment) => total + payment.amount, 0);
  const fullName =
    firstName.charAt(0).toUpperCase() + firstName.slice(1) + " " +
    lastName.charAt(0).toUpperCase() + lastName.slice(1);
  // console.log(planStartDate)
  const invoiceData = {
    invoiceNumber: `${data?.data?.transactionId}`,
    date: formatDate(data?.data?.paymentDate), // Use the formatted date
    totalAmount: data?.data?.amount,
    customerName: fullName,
    customerAddress: shipingAddress1,
    members: data?.data,

  };


  return (
    <div className=" flex flex-col mt-20 items-center justify-center p-4">
      {/* Display Invoice on the Page */}
      <div className="bg-white shadow-md border pb-10 rounded p-6 w-full max-w-screen-lg">
        <div className="flex justify-between items-center mb-6">
          <div>
            <img
              src={logo}
              alt="OptimalMD"
              className="w-28"
            />
          </div>
          <div>
            <p className="text-sm">Invoice No: {invoiceData.invoiceNumber}</p>
          </div>
        </div>
        <div className="mb-4">
          <p>
            <strong>Name:</strong> {invoiceData.customerName}
          </p>
          <p>
            <strong>Address:</strong> {invoiceData.customerAddress}
          </p>
        </div>
        <div className="border-t border-[#6C7B6B] mt-4">
          <table className="w-full mt-4 text-sm text-left border-collapse">
            <thead className="bg-[#EAF3E6]">
              <tr>
                <th className="border-b p-2">Invoice Number</th>
                <th className="border-b p-2">Date</th>
                <th className="border-b p-2">Total Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b p-2">{invoiceData.invoiceNumber}</td>
                <td className="border-b p-2">{invoiceData.date}</td>
                <td className="border-b p-2">{invoiceData.totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="mt-6 font-bold">Plan Information</h2>
        <table className="w-full mt-4 text-sm text-left border-collapse">
          <thead className="bg-[#EAF3E6] border">
            <tr>
              <th className="border-b p-2">Serial No.</th>
              <th className="border-b p-2">Member Name</th>
              <th className="border-b p-2">Program Name</th>
              <th className="border-b p-2">Amount ($)</th>
            </tr>
          </thead>
          <tbody>

            <tr >
              <td className="border-b p-2">{1}</td>
              <td className="border-b p-2">{invoiceData.customerName}</td>
              <td className="border-b p-2">{invoiceData.members?.plan ? invoiceData.members?.plan : "Loading"}</td>
              <td className="border-b p-2">{invoiceData.members?.amount ? invoiceData.members?.amount : "Loading..."}</td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* PDF Download Link */}
      <PDFDownloadLink
        document={<MyDocument invoiceData={invoiceData} />}
        fileName="invoice.pdf"
        className="mt-6 px-6 py-2 bg-primary text-white rounded shadow-md flex items-center gap-2 font-semibold transition"
      >
        {({ loading }) =>
          loading ? (
            "Loading document..."
          ) : (
            <>
              <Download size={18} className="text-white" />
              <span>Download PDF</span>
            </>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Invoice;
