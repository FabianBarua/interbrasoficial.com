import { useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DownloadPdfButtonProps {
  elementId?: string;
  filename?: string;
  buttonText?: string;
}

export const DownloadPdfButton = ({ 
  elementId = 'product', 
  filename = 'scooters.pdf',
  buttonText = 'DESCARGAR COMO PDF'
}: DownloadPdfButtonProps) => {
  
  const handleDownload = useCallback(async () => {
    const elements = document.querySelectorAll(`[id="${elementId}"]`);
    
    if (elements.length === 0) {
      console.error('No se encontraron elementos para exportar');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLElement;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pageWidth - (margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
    }

    pdf.save(filename);
  }, [elementId, filename]);

  return (
    <button
      onClick={handleDownload}
      className="bg-interbrasGreen-500 hover:bg-interbrasGreen-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
    >
      {buttonText}
    </button>
  );
};
