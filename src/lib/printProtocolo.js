// lib/printProtocolo.js
import axios from '@/lib/axios';
import QRCode from 'qrcode';

export async function printProtocolo(id) {
  try {
    const response = await axios.get(`/documentos/${id}`);
    const data = response.data;

    const qrBase64 = await QRCode.toDataURL(data.documento.qrcode_doc);

    const html = `
      <html>
        <head>
          <title>Protocolo</title>
          <style>
            @media print { @page { margin: 40px; } }
            body { font-family: Arial; padding: 40px; position: relative; }
            .header { text-align: center; margin-bottom: 50px; }
            .center { text-align: center; margin-bottom: 300px; }
            .footer-left { position: absolute; bottom: 40px; left: 40px; }
            .footer-right { position: absolute; bottom: 40px; right: 40px; text-align:center; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="/logo gov.png" alt="Logo" style="max-height:200px"/>
          </div>
          <div class="center">
            <h1>${data.documento.titulo_doc}</h1>
            <p><strong>Data de Entrada:</strong> ${data.documento.created_at}</p>
            <p><strong>Responsável:</strong> ${data.documento.name}</p>
            <img src="${qrBase64}" style="width:120px;height:120px"/>
          </div>
          <div class="footer-right">
            <img src="data:image/png;base64,${data.documento.barcode_doc}" style="height:40px; width:150px;" />
            <div style="margin-top:5px; font-size:12px;">${data.documento.codigo_documento}</div>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(html);
    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };


  } catch (error) {
    console.error('Erro ao imprimir protocolo:', error);
    alert('Erro ao imprimir protocolo. Veja o console para detalhes.');
  }
}

