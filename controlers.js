const PDFDocument = require('pdfkit');

const hello = (req, res) => {
  const datas = req.body;
  console.log(datas);
  try {
    const doc = new PDFDocument();
    const buffers = [];

    datas.forEach((data, index) => {
      if (index > 0) {
        doc.addPage(); // Tambah halaman baru untuk setiap objek data setelah yang pertama
      }

      // Gambar logo
      doc.image('logo.png', 50, 50, { width: 50, height: 50 });

      // Judul
      doc.fontSize(24).text('VZA Liquid Shop', { align: 'center', bold: true });

      // Jenis Pengiriman
      doc.moveDown();
      doc.fontSize(30).text(`${data.payment_method} ${data.courier}`, { bold: true, align: 'right' });

      // Nomor Invoice
      doc.moveDown();
      doc.fontSize(16).text(`Invoice: ${data.id}`, { align: 'left' });

      // Informasi Barang
      doc.moveDown();
      doc.fontSize(16).text(`Est Ongkos : Rp.${data.total}`, { bold: true });
      doc.moveDown();
      doc.fontSize(16).text('Kirim Est Berat : 95 gram', { bold: true });

      // Informasi pembeli
      doc.moveDown();
      doc.fontSize(16).text('Nama Pembeli : Taufik (Opik)', { bold: true });
      doc.moveDown();
      doc.fontSize(16).text('Telephon : 0895702990080', { bold: true });
      doc.moveDown();
      doc
        .fontSize(16)
        .text('Alamat : Kp.babakan Sukasari RT 2 RW 9 DS.Mekarsari Bandung, Ciparay Jawa Barat. POS 40381', {
          bold: true,
        });

      doc.moveDown();
      const lineY = doc.y;
      doc.lineWidth(2).moveTo(50, lineY).lineTo(550, lineY).stroke();

      doc.moveDown();
      doc.moveDown();
      data.products.forEach((product, productIndex) => {
        doc.fontSize(16).text(`${productIndex + 1}. ${product.name} - ${product.size} x ${product.quantity}`);
      });

      // Contoh: Menambahkan total pembelian
      const totalAmount = data.products.reduce((total, product) => total + product.price * product.quantity, 0);
      doc.moveDown(); // Spasi
      doc.fontSize(16).text(`Total Pembelian: Rp.${totalAmount}`, { align: 'right', bold: true });
      doc.moveDown(); // Spasi
      // Tanggal invoice
      doc.fontSize(16).text(`Tanggal Pembelian: ${data.created_at}`, { align: 'left' });
    });
    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);
    });

    doc.end();
  } catch (error) {
    res.status(500).json('Internal server error');
  }
};

module.exports = {
  hello,
};
