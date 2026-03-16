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
import { generateSelfEmployeeBankData } from "./sbiSelfEmpData"
import { generateMixedStatement } from "./salariedEmpData"

import { useEffect, useState } from "react";
import { generateEveryBankData } from "./sbiNew_data";
import dayjs from "dayjs";
import sbiLogo from "../../assets/sbi-logo.png";
import { useLocation } from "react-router-dom";

const today = dayjs();
const sixMonthsAgo = dayjs().subtract(6, "month");

const formattedToday = today.format("DD MMM YYYY");
const formattedSixMonthsAgo = sixMonthsAgo.format("DD MMM YYYY");
const formatMoney = (num) => {
    if (num === null || num === undefined) return "";
    return Number(num).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

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
        borderLeftWidth: 0,
        width: "32%",
        paddingTop: 2,
        paddingHorizontal: 2,
        paddingBottom: 2.5,
        fontWeight: "bold",
        fontFamily: "Helvetica",
        borderStyle: "solid",
        borderWidth: 1,
        borderTopWidth: 1,
    },
    tableColDis: {
        borderLeftWidth: 0,
        width: "32%",
        paddingTop: 2,
        paddingHorizontal: 2,
        paddingBottom: 2.5,
        borderWidth: 1,
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
    modeBalance, interestRate, bankEveryData, accountName, address, date, accountNumber, accountDescription, branch, drawingPower, cifNo, ckycrNumber, ifsCode, micrCode, nominationRegistered, balance,
}) => (

    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.imagelogo} src={sbiLogo} />
            <View style={styles.section}>
                <View style={styles.textParent}> <Text style={styles.textst}>Account Name</Text>
                    <Text style={{ marginLeft: 55 }}>: {accountName || "Rajesh singh"}</Text>
                </View>
                <View style={styles.textParent}> <Text style={styles.textst}>Address</Text>
                    <View style={{ width: 140, marginLeft: 83, display: "flex", flexDirection: "row" }}>
                        <Text>: </Text>
                        <Text style={{ lineHeight: 0.8 }}>{address || "S/O: Jayprakash Rajput WARD 01 Mehangipura beraisa - 462038 bhopal"}</Text>
                    </View>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Date</Text>

                    <Text style={{ marginLeft: 97 }}>: {dayjs(date).format("D MMM YYYY") || "21 Jan 2026"} </Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Account Number</Text>
                    <Text style={{ marginLeft: 46 }}>: 000000{accountNumber || "00000042511739493"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Account Discription</Text>
                    <Text style={{ marginLeft: 36 }}>: {accountDescription || "SBCHQ-SGSP-PUBIND-DIMOND-INR"}</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>Branch</Text>
                    <Text style={{ marginLeft: 89 }}>: {branch || "BERASIA MAIN ROAD"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Drawing Power</Text>
                    <Text style={{ marginLeft: 55 }}>: {drawingPower || "0.00"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>Interest Rate(% p.a.)</Text>
                    <Text style={{ marginLeft: 30 }}>: {interestRate || "2.5"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>MOD Balance</Text>
                    <Text style={{ marginLeft: 60 }}>: {modeBalance || "0.00"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>CIF No</Text>
                    <Text style={{ marginLeft: 89 }}>: {cifNo || "67262931429"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>CKYCR Number</Text>
                    <Text style={{ marginLeft: 49 }}>: {ckycrNumber || "XXXXXXXXXXX1234"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>IFS Code</Text>
                    <Text style={{ marginLeft: 78 }}>: {ifsCode || "SBIN0001499"}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>(Indian Financial System)</Text>
                    <Text style={{ marginLeft: 14 }}></Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={styles.textst}>MICR Code</Text>
                    <Text style={{ marginLeft: 69 }}>: {micrCode || "462002502"}</Text>
                </View>


                <View style={styles.textParent}>
                    <Text style={styles.textst}>(Magnetic Ink Character Recognition)</Text>
                    <Text style={{ marginLeft: 16 }}></Text>
                </View>


                <View style={styles.textParent}>
                    <Text style={styles.textst}>Nomination Registered</Text>
                    <Text style={{ marginLeft: 20 }}>: {nominationRegistered || "No"}</Text>
                </View>

                <View style={styles.textParent}>
                    <Text style={styles.textst}>Balance as on {formattedSixMonthsAgo}</Text>
                    <Text style={{ marginLeft: 0 }}>: {formatMoney(balance)}</Text>
                </View>
                <View style={styles.textParent}>
                    <Text style={{ fontSize: 12, marginTop: 10, marginBottom: 2 }}>Account Statement from {formattedSixMonthsAgo} to {formattedToday}</Text>

                </View>

            </View>

            <Text style={{ marginBottom: 5 }}>
            </Text>
            <View style={styles.table}>

                {/* Table Header */}
                {bankEveryData.length > 0 &&
                    (<View style={styles.tableRow} fixed={true} >
                        <Text style={styles.tableColHeaderDate}>Txn Date</Text>
                        <Text style={styles.tableColHeaderDate}>Value Date </Text>
                        <Text style={styles.tableColHeaderDis}>Description</Text>
                        <Text style={styles.tableColHeaderRef}>Ref No./Cheque No.</Text>
                        <Text style={styles.tableColHeader}>Debit</Text>
                        <Text style={styles.tableColHeader}>Credit</Text>
                        <Text style={styles.tableColHeader}>Balance</Text>
                    </View>)}
                {/* Row 1 */}
                {bankEveryData.map((item, index) => {
                    return (
                        <View style={styles.tableRow} key={index} wrap={false}>

                            <Text style={styles.tableColDate}>{item.txnDate}</Text>
                            <Text style={styles.tableColDate}>{item.valueDate}</Text>
                            <Text style={styles.tableColDis}>{item.description}</Text>
                            <Text style={styles.tableColRef}>{item.refNo}</Text>
                            <Text style={styles.tableCol}>{item.debit}</Text>
                            <Text style={styles.tableCol}> {item.credit}</Text>
                            <Text style={styles.tableCol}>{item.balance}</Text>
                        </View>
                    )

                })}
                <Text style={{ marginTop: 4, marginLeft: 14, fontSize: 9, letterSpacing: .2 }}> Please do not share your ATM, Debit/Credit card number, PIN (Personal Identification Number) and OTP (One Time Password)</Text>
                <Text style={{ fontSize: 9 }}>with anyone over mail, SMS, phone call or any other media. Bank never asks for such information.</Text>
                <Text style={{ marginTop: 12, marginLeft: 5, fontSize: 9, letterSpacing: .2, lineHeight: 1.5 }}>  **This is a computer generated statement and does not require a signature. </Text>
            </View>
        </Page>
    </Document >
);

function SbiPDF() {

    // const [bankData, setBankData] = useState([]);
    const [bankEveryData, setBankEveryData] = useState([]);
    const [fileName, setFileName] = useState("000000187072367f6n02eHnEKt3QtUM.pdf");
    const [formData, setFormData] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setFormData(location.state);

        } else {
            console.log("No navigation data found");
        }

    }, [location.state]);

    useEffect(() => {
        if (!formData) return;


        setFileName(formData.pdf_Name)
        // const generateMixed = generateMixedStatement({
        //     openingBalance: parseInt(formData.balance),
        //     salaryAmount: parseInt(formData.salaryAmount),
        //     company: "RBISOGOMPEP"
        // });
        // setBankEveryData(generateMixed)
        // console.log(formData.pdf_type, "fdghddnj ============== formData.pdf_type =============")
        // ==========================.  Self_Employee ==============
        if (formData.pdf_type == "Self_Employee") {
            const generated = generateSelfEmployeeBankData({
                openingBalance: formData.balance
            });
            setBankEveryData(generated)
        }

        // // ==========================.  Salary ==============
        else if (formData.pdf_type == "Salary") {
            const generateEvery = generateEveryBankData({
                openingBalance: parseInt(formData.balance),
                salaryAmount: parseInt(formData.salaryAmount),
                company: formData.salaryCompany
            })
            setBankEveryData(generateEvery)
        }
        else {
            const generateMixed = generateMixedStatement({
                openingBalance: parseInt(formData.balance),
                salaryAmount: parseInt(formData.salaryAmount),
                company: "RBISOGOMPEP"
            });
            setBankEveryData(generateMixed)
        }
        // // ==========================.  Salaried_banking ==============


    }, [formData])

    if (!formData) {
        return <p>No data received</p>;
    }

    return (
        <div>
            <Navbar />

            <PDFViewer width="99.7%" height="600"  >
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
                    bankEveryData={bankEveryData}
                    companyName={formData.salaryCompany ?? ""}
                    interestRate={formData.interestRate ?? ""}
                    modeBalance={formData.modeBalance ?? ""}
                />
            </PDFViewer>
            <PDFDownloadLink document={<MyDocument
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
                bankEveryData={bankEveryData}


            />} fileName={fileName + ".pdf"}>
                {({ loading }) =>
                    loading ? "Generating PDF..." : "Download SBI Statement"
                }
            </PDFDownloadLink>
        </div>
    );
}

export default SbiPDF;
