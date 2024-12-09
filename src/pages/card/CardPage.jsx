import React from "react";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { useSelector } from "react-redux";
import capitalizeWords from "../../utils/CapitalizeText";

// Styles for the PDF document
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    gap: 5,
  },
  header: {
    backgroundColor: "#24D466",
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },
  profileSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  profile: {
    width: 128,
    height: 128,
    borderRadius: "50%",
    objectFit: "cover",
    marginRight: 10,
  },
  section: {
    padding: 10,
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  field: {
    fontSize: 12,
    marginVertical: 4,
  },
  highlight: {
    textAlign: "center",
    fontSize: 12,
    color: "#6C7B6B",
    marginVertical: 4,
  },
  footer: {

    textAlign: "center",
    backgroundColor: "#29ABFA",
    color: "#fff",
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  disclaimerSection: {
    flexDirection: "row",
    gap: 10,

  },
  disclaimerBox: {
    width: "50%",
    display: "grid",
    gap: 5,
    fontSize: 10,
    padding: 10,
    backgroundColor: "#fff",

    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  wraper: {
    border: "2px dashed #DCE5D8"
  }
});

const PDFDocument = ({ data, profileImage }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* Header */}
      <View style={pdfStyles.wraper}>
        <Text style={pdfStyles.header}>Member Information</Text>

        {/* Profile Section */}
        <View style={pdfStyles.profileSection}>

          <View>
            <Text style={{ fontSize: 10, fontWeight: "bold" }}>Member Name: {data.memberName}</Text>
            <Text style={pdfStyles.field}>
              <Text style={{ fontWeight: "500", fontSize: "10px" }}>Group Name:</Text> {data.groupName}
            </Text>
            <Text style={pdfStyles.field}>
              <Text style={{ fontWeight: "500", fontSize: "10px" }}>Effective Date:</Text> {data.effectiveDate}
            </Text>
            <Text style={pdfStyles.field}>
              <Text style={{ fontWeight: "500", fontSize: "10px" }}>Member ID:</Text> {data.memberId}
            </Text>
            <Text style={pdfStyles.field}>
              <Text style={{ fontWeight: "500", fontSize: "10px" }}>Rx BIN:</Text> {data.rxBin}
            </Text>
            <Text style={pdfStyles.field}>
              <Text style={{ fontWeight: "500", fontSize: "10px" }}>Rx PCN:</Text> {data.rxPcn}
            </Text>
            <Text style={pdfStyles.field}>
              <Text style={{ fontWeight: "500", fontSize: "10px" }}>Rx Group:</Text> {data.rxGroup}
            </Text>
            <Text style={pdfStyles.field}>
              <Text style={{ fontWeight: "500", fontSize: "10px" }}>Medication Program:</Text> {data.medicationProgram}
            </Text>
          </View>
          <Image style={pdfStyles.profile} src={profileImage} />
        </View>
        {/* Highlight */}
        <Text style={pdfStyles.highlight}>
          Log into OMDRX.com to view available formularies and medications.
        </Text>
      </View>




      <View style={pdfStyles.wraper}>

        {/* Footer */}
        <Text style={pdfStyles.footer}>
          Get More Program Discounts by Visiting OMDRX.com
        </Text>

        {/* Disclaimer Section */}
        <View style={pdfStyles.disclaimerSection}>
          <View style={pdfStyles.disclaimerBox}>
            <Text style={{ fontWeight: "bold" }}>
              Present this card at the pharmacy with a valid prescription.
            </Text>
            <Text style={{ lineHeight: "12px" }}>
              In order to get the most out of your OptimalRx COMPLETE Medication Program, utilize our mail-order program by activating your member portal at OMDRX.com. If logging in for the first time, click Login With Member/Group ID then enter the Member ID and Rx Group (Group ID) Number from the FRONT of this card.
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              Customer Support: (855) 798-2538 Mon–Thu: 8am–8pm & Fri 8am–7pm EST.
            </Text>
            <Text>Escribe: 04229971 | Efax: (888) 870 3823</Text>
          </View>
          <View style={pdfStyles.disclaimerBox}>
            <Text>
              This is a Pharmacy Subscription Program. THIS IS NOT INSURANCE. We provide you with direct access to medications at negotiated PBM pricing and Home Delivery Pharmacy pricing on a prepaid basis. OptimalRx offers solutions for high-priced specialty medications via an International Pharmacy or PAP service.
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

// Invoice Component
const InvoiceCard = () => {
  const user = useSelector((state) => state.userSlice.user);

  // Add a fallback for `user` if it's null or undefined
  if (!user) {
    return <div>Loading...</div>; // Or a suitable placeholder
  }
  // console.log(user)
  const { planStartDate, shipingAddress1, _id, lastName, image, dob, paymentHistory, plan, firstName } = user;
  const fullName = firstName + " " + lastName
  const invoiceData = {
    memberName: capitalizeWords(fullName),
    groupName: "OptimalRx",
    effectiveDate: planStartDate,
    memberId: _id,
    rxBin: "__",
    rxPcn: "__",
    rxGroup: "__",
    medicationProgram: plan === "Plus" ? "Access Plus" : "Trial",
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center p-6 min-h-screen">
      {/* Card Layout */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-screen-sm">
        <div className="border-2 border-[#DCE5D8] border-dashed mb-3">
          <div className="bg-[#24D466] text-white text-center font-semibold text-md py-2">
            Member Information
          </div>
          <div className="flex px-2 lg:px-4 justify-between  items-center mt-4">


            <div className="space-y-2  ">
              <p className="text-xs lg:text-sm">
                <strong>Member Name:</strong> {invoiceData.memberName}
              </p>
              <p className="text-xs lg:text-sm">
                <strong>Group Name:</strong> {invoiceData.groupName}
              </p>
              <p className="text-xs lg:text-sm">
                <strong>Effective Date:</strong> {invoiceData.effectiveDate}
              </p>
              <p className="text-xs lg:text-sm">
                <strong>Member ID:</strong> {invoiceData.memberId}
              </p>

              <p className="text-xs lg:text-sm">
                <strong>Rx BIN:</strong> {invoiceData.rxBin}
              </p>
              <p className="text-xs lg:text-sm">
                <strong>Rx PCN:</strong> {invoiceData.rxPcn}
              </p>

              <p className="text-xs lg:text-sm">
                <strong>Rx Group:</strong> {invoiceData.rxGroup}
              </p>
              <p className="text-xs lg:text-sm">
                <strong>Medication Program:</strong> {invoiceData.medicationProgram}
              </p>
            </div>
            <img
              src={image}
              alt="Member Profile"
              className="w-20 h-20  lg:w-32 lg:h-32 object-cover rounded-full mb-4"
            />
          </div>
          <p className="text-center text-[#6C7B6B] my-2 text-md"> Log into OMDRX.com to view available formularies and medications.</p>
        </div>
        <div className=" border-2 border-dashed border-[#DCE5D8]">
          <div className="bg-[#29ABFA] text-white text-center text-xs lg:text-[16px] font-semibold py-2 mt- ">
            Get More Program Discounts by Visiting OMDRX.com
          </div>
          <div className="grid gap-2 lg:gap-4 p-3 grid-cols-2">


            <div className="space-y-1 text-xs">
              <strong>Present this card at the pharmacy with a valid prescription.</strong>
              <p>In order to get the most out of your OptimalRx COMPLETE Medication Program, utilize our mail-order program by activating your member portal at <strong>OMDRX.com.</strong></p>
              <p>If logging in for the first time, click Login With Member/Group ID then enter the Member ID and Rx Group (Group ID) Number from the FRONT of this card.</p>
              <strong>Customer Support: (855) 798-2538 Mon–Thu: 8am–8pm & Fri 8am–7pm EST.</strong>
              <p>Escribe: <strong>04229971 </strong>| Efax: <strong>(888) 870 3823</strong></p>
            </div>

            <p className="text-xs">This is a Pharmacy Subscription Program. THIS IS NOT INSURANCE. We provided you with direct access to medications at negotiated PBM pricing and Home Delivery Pharmacy pricing on a prepaid basis. OptimalRx offers solutions for high-priced specialty medications via an International Pharmacy or PAP service. In addition, a discount pharmacy solution is available, where you search discount options and are directed to a specific pharmacy for super-low pricing. Sometimes this can be your lowest price option. Only certain doses and quantities for each medication are offered through this program.</p>

          </div>
        </div>
      </div>

      {/* PDF Download Button */}
      <PDFDownloadLink
        document={<PDFDocument data={invoiceData} profileImage={image} />}
        fileName="member_card.pdf"
        className="mt-6 px-6 py-2 bg-[#24D466] text-white rounded shadow font-semibold transition flex items-center gap-2"
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

export default InvoiceCard;
