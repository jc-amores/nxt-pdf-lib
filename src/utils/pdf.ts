import { PDFDocument, PDFName, PDFString, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface FormField {
  fieldName: string;
  fieldValue: string;
}

export async function generatePdf(formData: FormData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();

  const { width, height } = page.getSize();

  page.drawText(`Name: ${formData.name}`, { x: 50, y: height - 100, size: 12 });
  page.drawText(`Email: ${formData.email}`, {
    x: 50,
    y: height - 120,
    size: 12,
  });
  page.drawText(`Phone: ${formData.phone}`, {
    x: 50,
    y: height - 140,
    size: 12,
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}

export async function modifyPDF(
  inputPath: string,
  outputPath: string,
  formFields: FormField[]
) {
  const pdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const form = pdfDoc.getForm();

  formFields.forEach(({ fieldName, fieldValue }) => {
    const textField = form.getTextField(fieldName);
    if (textField) {
      textField.setText(fieldValue);
    }
  });

  const modifiedPdfBytes = await pdfDoc.save();

  fs.writeFileSync(outputPath, modifiedPdfBytes);
}
