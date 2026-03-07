import { PDFViewer } from "@react-pdf/renderer";
import BankStatement from "./bankstate";
    import { PDFDownloadLink } from "@react-pdf/renderer";

function PdfPreview({ formData, transactions }) {

  return (
 < >  <PDFViewer width="100%" height="100%">
      <BankStatement
        formData={formData}
        transactions={transactions}
      />
    </PDFViewer>


<PDFDownloadLink
  document={<BankStatement formData={formData} transactions={transactions} />}
  fileName="bank-statement.pdf"
>
  {({ loading }) =>
    loading ? "Generating..." : "Download PDF"
}
</PDFDownloadLink></>
  );
}

export default PdfPreview;