import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatePDFFromElement(element: HTMLElement, filename: string) {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL("image/png");
    
    // Calculate A4 size
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Check if height > A4 height, handle multi-page if needed, but for now we'll just draw the scaled image.
    // If it's a long report, it might be better to split, but html2canvas makes it one big image.
    // We'll insert it directly.
    let heightLeft = pdfHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    // Add remaining pages
    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }
    
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}

export function generateGenericPDF(title: string, description: string, filename: string) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header / Branding
  doc.setFillColor(30, 58, 138); // blue-900
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("Cristian Văduva", 20, 20);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Premium Knowledge Platform", 20, 30);
  
  // Content
  doc.setTextColor(30, 41, 59); // slate-800
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const splitTitle = doc.splitTextToSize(title, pageWidth - 40);
  doc.text(splitTitle, 20, 60);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139); // slate-500
  const splitDesc = doc.splitTextToSize(description, pageWidth - 40);
  doc.text(splitDesc, 20, 75 + (splitTitle.length - 1) * 8);
  
  const contentStart = 75 + (splitTitle.length - 1) * 8 + (splitDesc.length) * 6 + 10;
  
  doc.setTextColor(51, 65, 85); // slate-700
  doc.setFontSize(10);
  const fakeContent = `Acest document contine strategii si informatii premium destinate exclusiv pentru dumneavoastra. Platforma AiX OS va pune la dispozitie cele mai avansate metode de planificare financiara si protectie a patrimoniului din Romania.

Aspecte Cheie:
• Optimizare Fiscala: Utilizarea structurilor corecte.
• Protectia Activelor: Separarea riscurilor comerciale de averea privata.
• Planificare Succesorala: Transferul averii catre urmatoarea generatie.

Pentru o analiza detaliata si implementarea acestor strategii, va rugam sa ne contactati.`;
  const splitFakeContent = doc.splitTextToSize(fakeContent, pageWidth - 40);
  doc.text(splitFakeContent, 20, contentStart);
  
  // Footer
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.line(20, pageHeight - 30, pageWidth - 20, pageHeight - 30);
  
  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFontSize(8);
  doc.text("Powered by cristianvaduva.com | Confidential", 20, pageHeight - 20);
  doc.text(`Data emiterii: ${new Date().toLocaleDateString("ro-RO")}`, 20, pageHeight - 15);
  
  doc.save(`${filename}.pdf`);
}
