// Declaraciones de tipos para librerías cargadas desde CDN
declare global {
  interface Window {
    JSZip: any;
    htmlToImage: any;
    PDFLib: any;
  }
  
  const JSZip: any;
  const htmlToImage: any;
  const PDFLib: any;
}

export {};
