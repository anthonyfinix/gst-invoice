import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import getFormat from './pdf-format';

function createPdf(formatType,data) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake
    .createPdf(getFormat(formatType,data))
    .open();
}
export default createPdf;
