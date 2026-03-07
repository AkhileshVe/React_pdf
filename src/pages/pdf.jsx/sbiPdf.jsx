import {
    Document,
    Page,
    Text,
    View,
    PDFViewer,
    StyleSheet,
    Image,
    PDFDownloadLink
} from "@react-pdf/renderer";
import Navbar from "../NavBar";
import { Font } from "@react-pdf/renderer";
Font.register({
    family: "Roboto",
    fonts: [
        { src: "../../assets/fonts/Roboto-Regular.ttf" },
        { src: "../../assets/fonts/Roboto-Bold.ttf", fontWeight: "bold" }
    ]
});

const formatMoney = (num) => {
    if (num === null || num === undefined) return "";
    return Number(num).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};
import { useEffect, useState } from "react";
import { generateBankData, sbiDataDynamic } from "./sbiNew_data";
import dayjs from "dayjs";
import sbiLogo from "../../assets/sbi-logo.png";
import transactions from "./sbiData"
import { sbidatata } from "./sbiData"
import { originaldata } from "./sbiData"
import { useNavigate, useLocation } from "react-router-dom";

const today = dayjs();
const sixMonthsAgo = dayjs().subtract(6, "month");

const formattedToday = today.format("DD MMM YYYY");
const formattedSixMonthsAgo = sixMonthsAgo.format("DD MMM YYYY");
let transactionss = [2, 4, 6, 8, 12, 13, 15, 17, 20, 34]

const filteredTransactions = sbiDataDynamic.map(txn => {
    return (dayjs().subtract(txn.txnDate, "days").format("DD MMM YYYY"))
}
);

// console.log(filteredTransactions, "@@@@@@@@@@@llllllllllll")

const sixMonths = dayjs().subtract(6, "days");
const formattedSixMonths = sixMonths.format("DD MMM YYYY");

const generateRandom4 = () => {
    return Math.floor(1000 + Math.random() * 9000);
};
const changeSpecific = (str) => {
    return str.replace(/\d+/g, (num) => {
        if (num.length > 6) {
            const random4 = generateRandom4();
            return num.slice(0, 4) + random4 + num.slice(-4);
        }
        return num;
    });
};

const randomNames = [
  "MEENA",
  "GEETA",
  "MONU",
  "NEHA",
  "KOMAL",
  "RAVI",
  "AMIT",
  "RAHUL",
  "SONU",
  "VIKAS",
];


const changeDescription = (str, companyName) => {

  let updated = str.replace(/\d{12}/g, (num) => {
    const random4 = generateRandom4();
    return num.slice(0, 4) + random4 + num.slice(-4);
  });

  updated = updated.replace(
    /(MEENA|GEETAT|SAVITA|NEHAD|KOMAL S|RAVI|AMIT)/,
    randomNames[Math.floor(Math.random() * randomNames.length)]
  );

  if(companyName){
     updated = updated.replace(/AIR INDIA LIMITED/, companyName);
  }

  return updated;
};

const styles = StyleSheet.create({
    page: {
        fontFamily: "Helvetica",
        padding: 30,
        fontSize: 9.7
    },
    header: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "normal",
        fontFamily: "Helvetica"
    },
    section: {
        marginBottom: 10
    },
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",

    },
    tableRow: {
        flexDirection: "row"
    },
    tableColHeader: {
        width: "14%",
        padding: 2,
        fontWeight: "bold",
        fontFamily: "Helvetica",
        textAlign: "right",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 1,
    },
    tableCol: {
        width: "14%",
        paddingTop: 2,
        paddingHorizontal: 2,
        paddingBottom: 2.5,
        textAlign: "right",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableColHeaderDate: {
        width: "12%",
        paddingTop: 2,
        paddingHorizontal: 2,
        borderLeftWidth: 1,
        paddingBottom: 2.5,
        borderStyle: "solid",
        fontWeight: "bold",
        fontFamily: "Helvetica",
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    tableColDate: {
        width: "12%",
        paddingTop: 2,
        paddingHorizontal: 2,
        borderLeftWidth: 1,
        borderRigthWidth: 0,
        paddingBottom: 2.5,
        textAlign: "right",
        borderStyle: "solid",
        //borderWidth: 1,
        borderBottomWidth: 1

    },

    tableColHeaderDis: {
        borderLeftWidth: 1,
        width: "32%",
        paddingTop: 2,
        paddingHorizontal: 2,
        paddingBottom: 2.5,
        fontWeight: "bold",
        fontFamily: "Helvetica",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 1,
    },
    tableColDis: {
        borderLeftWidth: 1,
        width: "32%",
        paddingTop: 2,
        paddingHorizontal: 2,
        paddingBottom: 2.5,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        flexShrink: 1
    },
    tableColHeaderRef: {
        width: "18%",
        paddingTop: 2,
        paddingHorizontal: 2,
        paddingBottom: 2.5,
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 1,
        fontWeight: "bold",
        fontFamily: "Helvetica"
    },
    tableColRef: {
        width: "18%",
        paddingTop: 2,
        textAlign: "left",
        paddingHorizontal: 2,
        paddingBottom: 2.5,
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        // padding: 4
    },



    textst: {
        marginBottom: "6px"
    },
    imagelogo: {
        height: "40px",
        width: "125px",
        marginBottom: "15px"
    },
    textParent: {
        display: "flex",
        flexDirection: "row",
        gap: "10px"
    }
});

const MyDocument = ({
     companyName,finalData, accountName, address, date, accountNumber, accountDescription, branch, drawingPower, cifNo, ckycrNumber, ifsCode, micrCode, nominationRegistered, balance,
}) => (

    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.imagelogo} src={sbiLogo} />


            <View style={styles.section}>
                <View style={styles.textParent}> <Text style={styles.textst}>Account Name</Text>
                    <Text style={{ marginLeft: 55 }}>: {accountName ?? "Rajesh singh"}</Text>
                </View>
                <View style={styles.textParent}> <Text style={styles.textst}>Address</Text>
                    <View style={{ width: 140, marginLeft: 83, display: "flex", flexDirection: "row" }}>
                        <Text>: </Text>
                        <Text style={{ lineHeight: 0.8 }}>{address ?? "S/O: Jayprakash Rajput WARD 01 Mehangipura beraisa - 462038 bhopal"}</Text>
                    </View>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Date</Text>
                    <Text style={{ marginLeft: 97 }}>: {date ?? "21 Jan 2026"} </Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Account Number</Text>
                    <Text style={{ marginLeft: 46 }}>: {accountNumber ?? "00000042511739493"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Account Discription</Text>
                    <Text style={{ marginLeft: 36 }}>: {accountDescription ?? "SBCHQ-SGSP-PUBIND-DIMOND-INR"}</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>Branch</Text>
                    <Text style={{ marginLeft: 89 }}>: {branch ?? "BERASIA MAIN ROAD"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Drawing Power</Text>
                    <Text style={{ marginLeft: 55 }}>: {drawingPower ?? "0.00"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>CIF No</Text>
                    <Text style={{ marginLeft: 89 }}>: {cifNo ?? "67262931429"}</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>CKYCR Number</Text>
                    <Text style={{ marginLeft: 47 }}>: {ckycrNumber ?? "XXXXXXXXXXX1234"}</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>IFS Code</Text>
                    <Text style={{ marginLeft: 77 }}>: {ifsCode ?? "SBIN0001499"}</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>(Indian Financial System)</Text>
                    <Text style={{ marginLeft: 12 }}></Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>MICR Code</Text>
                    <Text style={{ marginLeft: 65 }}>: {micrCode ?? "462002502"}</Text>
                </View>


                <View style={styles.textParent}>
                    <Text style={styles.textst}>(Magnetic Ink Character Recognition)</Text>
                    <Text style={{ marginLeft: 12 }}></Text>
                </View>


                <View style={styles.textParent}>
                    <Text style={styles.textst}>Nomination Registered</Text>
                    <Text style={{ marginLeft: 16 }}>: {nominationRegistered ?? "No"}</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>Balance as on {formattedSixMonthsAgo}</Text>
                    <Text style={{ marginLeft: 8 }}>: {balance}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={{ fontSize: 12, marginTop: 10, marginBottom: 2 }}>Account Statement from {formattedSixMonthsAgo} to {formattedToday}</Text>

                </View>

            </View>

            <Text style={{ marginBottom: 5 }}>
            </Text>
            <br />
            <View style={styles.table}>

                {/* Table Header */}
                <View style={styles.tableRow} fixed={true} wrap={false}>
                    <Text style={styles.tableColHeaderDate}>Txn Date</Text>
                    <Text style={styles.tableColHeaderDate}>Value Date </Text>
                    <Text style={styles.tableColHeaderDis}>Description</Text>
                    <Text style={styles.tableColHeaderRef}>Ref No./Cheque No.</Text>
                    <Text style={styles.tableColHeader}>Debit</Text>
                    <Text style={styles.tableColHeader}>Credit</Text>
                    <Text style={styles.tableColHeader}>Balance</Text>
                </View>
                <br />
                {/* Row 1 */}
                {finalData.map((item, index) => {


                    return (
                        <View style={styles.tableRow} key={index} wrap={false}>
                            <Text style={styles.tableColDate}>{
                                dayjs().subtract(item.txnDate, "days").format("D MMM YYYY")
                            }</Text>
                            <Text style={styles.tableColDate}>{
                                dayjs().subtract(item.valueDate, "days").format("D MMM YYYY")
                            }</Text>
                            <Text style={styles.tableColDis}>{changeDescription(item.description,companyName)}</Text>
                            <Text style={styles.tableColRef}>{changeSpecific(item.refNo)}</Text>
                            <Text style={styles.tableCol}>{formatMoney(item.debit)}</Text>
                            <Text style={styles.tableCol}> {formatMoney(item.credit)}</Text>
                            <Text style={styles.tableCol}>{formatMoney(item.balance)}</Text>
                        </View>
                    )

                })}
                <br />


            </View>
        </Page>
    </Document>
);

function SbiPDF() {

    const [bankData, setBankData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [formData, setFormData] = useState(null);
    const location = useLocation();

    useEffect(() => {

        if (location.state) {
            setFormData(location.state);
        } else {
            console.log("No navigation data found");
        }
        const generated = generateBankData({
            openingBalance: 50000,
            salaryAmount: 65000,
            totalRows: 236
        });

        setBankData(generated);

        const merged = sbiDataDynamic.map((item, index) => ({
            ...item,
            debit: generated[index]?.debit ?? null,
            credit: generated[index]?.credit ?? null,
            balance: generated[index]?.balance ?? null,
        }));

        setFinalData(merged);

    }, [location.state]);

    if (!formData) {
        return <p>No data received</p>;
    }

    return (
        <div>
            <Navbar />

            <PDFViewer width="100%" height="600"  >
                <MyDocument
                    accountName={formData.accountName ?? ""}
                    address={formData.address ?? ""}
                    date={formData.date ?? ""}
                    accountNumber={formData.accountNumber ?? ""}
                    accountDescription={formData.accountDescription ?? ""}
                    branch={formData.branch ?? ""}
                    drawingPower={formData.drawingPower ?? ""}
                    cifNo={formData.cifNo ?? ""}
                    ckycrNumber={formData.ckycrNumber ?? ""}
                    ifsCode={formData.ifsCode ?? ""}
                    micrCode={formData.micrCode ?? ""}
                    nominationRegistered={formData.nominationRegistered ?? ""}
                    balance={formData.balance ?? ""}
                    finalData={finalData}
                    companyName={formData.salaryCompany ?? ""}
                />
            </PDFViewer>
            <PDFDownloadLink document={<MyDocument
                accountName={formData.accountName ?? " "}
                address={formData.address ?? ""}
                date={formData.date ?? ""}
                accountNumber={formData.accountNumber ?? ""}
                accountDescription={formData.accountDescription ?? ""}
                branch={formData.branch ?? ""}
                drawingPower={formData.drawingPower ?? ""}
                cifNo={formData.cifNo ?? ""}
                ckycrNumber={formData.ckycrNumber ?? ""}
                ifsCode={formData.ifsCode ?? ""}
                micrCode={formData.micrCode ?? ""}
                nominationRegistered={formData.nominationRegistered ?? ""}
                balance={formData.balance ?? ""}
                finalData={finalData}

            />} fileName="1643187072367f6n02eHnEKt3QtUM.pdf">
                {({ loading }) =>
                    loading ? "Generating PDF..." : "Download SBI Statement"
                }
            </PDFDownloadLink>
        </div>
    );
}

export default SbiPDF;
