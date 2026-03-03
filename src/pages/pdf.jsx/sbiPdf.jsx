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
import { useEffect, useState } from "react";
import { generateBankData,sbiDataDynamic } from "./sbiNew_data";
import dayjs from "dayjs";
import sbiLogo from "../../assets/sbi-logo.png";
import transactions from "./sbiData"
import { sbidatata } from "./sbiData"
import { originaldata } from "./sbiData"
import { useNavigate } from "react-router-dom";

const today = dayjs();
const sixMonthsAgo = dayjs().subtract(6, "month");

const formattedToday = today.format("DD MMM YYYY");
const formattedSixMonthsAgo = sixMonthsAgo.format("DD MMM YYYY");
let transactionss = [2,4,6,8,12,13,15,17,20,34] 

const filteredTransactions = sbiDataDynamic.map(txn =>{
     return( dayjs().subtract(txn.txnDate, "days").format("DD MMM YYYY"))}
);

console.log(filteredTransactions,"@@@@@@@@@@@llllllllllll")

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

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 10
    },
    header: {
        fontSize: 16,
        marginBottom: 10
    },
    section: {
        marginBottom: 10
    },
    table: {
        display: "table",
        width: "100%",
        borderStyle: "solid",
        // borderWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 1,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: "row"
    },
    tableColHeader: {
        width: "14%",
        padding: 2,
        fontWeight: "bold",
        textAlign: "right",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 1,
        fontWeight: "bold"
    },
    tableCol: {
        width: "14%",
        padding: 2,
        textAlign: "right",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableColHeaderDate: {
        width: "12%",
        padding: 2,
        fontWeight: "bold",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: "bold",
        borderTopWidth: 1,
    },
    tableColDate: {
        width: "12%",
        padding: 2,
        textAlign: "right",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0

    },

    tableColHeaderDis: {
        width: "32%",
        padding: 2,
        fontWeight: "bold",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 1,
        fontWeight: "bold"
    },
    tableColDis: {
        width: "32%" ,
        padding: 2,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        flexShrink: 1
    },
    tableColHeaderRef: {
        width: "18%",
        padding: 2,
        fontWeight: "bold",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 1,
        fontWeight: "bold"
    },
    tableColRef: {
        width: "18%",
        padding: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 4
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

const MyDocument = ({ name,finalData }) => (

    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.imagelogo} src={sbiLogo} />


            <View style={styles.section}>
                <View style={styles.textParent}> <Text style={styles.textst}>Account Name</Text>
                    <Text style={{ marginLeft: 50 }}>: {name}</Text>
                </View>
                <View style={styles.textParent}> <Text style={styles.textst}>Address</Text>
                    <View style={{ width: 140, marginLeft: 80, display: "flex", flexDirection: "row" }}>
                        <Text>: </Text>
                        <Text style={{ lineHeight: 0.8 }}>S/O: Jayprakash Rajput WARD 01 Mehangipura beraisa - 462038 bhopal</Text>
                    </View>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Date</Text>
                    <Text style={{ marginLeft: 99 }}>: 21 Jan 2026 </Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Account Number</Text>
                    <Text style={{ marginLeft: 44 }}>: 00000042511739493</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Account Discription</Text>
                    <Text style={{ marginLeft: 36 }}>: SBCHQ-SGSP-PUBIND-DIMOND-INR</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>Branch</Text>
                    <Text style={{ marginLeft: 86 }}>: BERASIA MAIN ROAD</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Drawing Power</Text>
                    <Text style={{ marginLeft: 53 }}>: 0.00</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>CIF No</Text>
                    <Text style={{ marginLeft: 86 }}>: 67262931429</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>CKYCR Number</Text>
                    <Text style={{ marginLeft: 42 }}>: XXXXXXXXXXX1234</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>IFS Code</Text>
                    <Text style={{ marginLeft: 72 }}>: SBIN0001499</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>(Indian Financial System)</Text>
                    <Text style={{ marginLeft: 12 }}></Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>MICR Code</Text>
                    <Text style={{ marginLeft: 62 }}>: 462002502</Text>
                </View>


                <View style={styles.textParent}>
                    <Text style={styles.textst}>(Magnetic Ink Character Recognition)</Text>
                    <Text style={{ marginLeft: 12 }}></Text>
                </View>


                <View style={styles.textParent}>
                    <Text style={styles.textst}>Nomination Registered</Text>
                    <Text style={{ marginLeft: 12 }}>: No</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>Balance as on 21 jul 2025</Text>
                    <Text style={{ marginLeft: 6 }}>: 43,235.00</Text>
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
                <View style={styles.tableRow} fixed={true}>
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
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableColDate}>{
                                 dayjs().subtract(item.txnDate, "days").format("D MMM YYYY")
                            }</Text>
                            <Text style={styles.tableColDate}>{
                            dayjs().subtract(item.valueDate, "days").format("D MMM YYYY")
                            }</Text>
                            <Text style={styles.tableColDis}>{changeSpecific(item.description)}</Text>
                            <Text style={styles.tableColRef}>{changeSpecific(item.refNo)}</Text>
                            <Text style={styles.tableCol}>{item.debit}</Text>
                            <Text style={styles.tableCol}> {item.credit}</Text>
                            <Text style={styles.tableCol}>{item.balance}</Text>
                        </View>
                    )

                })}
                <br />


            </View>
        </Page>
    </Document>
);

function SbiPDF() {


    const [name, setName] = useState("Jayprakash Rajput")
    const [bankData, setBankData] = useState([]);
    const [finalData, setFinalData] = useState([]);

  useEffect(() => {

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
  }, []);

    return (
        <div>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <PDFViewer width="100%" height="600"  >
                <MyDocument name={name} finalData={finalData} />
            </PDFViewer>
            <PDFDownloadLink document={<MyDocument name={name} finalData={finalData} />} fileName="1643187072367f6n02eHnEKt3QtUM.pdf">
                {({ loading }) =>
                    loading ? "Generating PDF..." : "Download SBI Statement"
                }
            </PDFDownloadLink>
        </div>
    );
}

export default SbiPDF;
