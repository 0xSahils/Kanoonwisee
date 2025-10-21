const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const QRCode = require('qrcode');
const crypto = require('crypto');

/**
 * Generate e-stamp paper PDF with QR verification
 */
async function generateStampPdf(order, verificationHash) {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points

    // Embed fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const { width, height } = page.getSize();

    // Header - Government Stamp Paper
    page.drawText('GOVERNMENT OF INDIA', {
      x: 50,
      y: height - 60,
      size: 18,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.5),
    });

    page.drawText(`NON-JUDICIAL STAMP PAPER - ${order.state}`, {
      x: 50,
      y: height - 85,
      size: 14,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.5),
    });

    // Stamp Amount Box (prominent)
    const amountText = `Rs. ${(order.stampAmount / 100).toFixed(2)}`;
    page.drawRectangle({
      x: width - 200,
      y: height - 100,
      width: 150,
      height: 60,
      borderColor: rgb(0.1, 0.1, 0.5),
      borderWidth: 2,
    });

    page.drawText('STAMP DUTY', {
      x: width - 185,
      y: height - 70,
      size: 10,
      font: regularFont,
    });

    page.drawText(amountText, {
      x: width - 185,
      y: height - 90,
      size: 20,
      font: boldFont,
      color: rgb(0.8, 0, 0),
    });

    // Document Details
    let yPos = height - 140;
    const lineHeight = 20;

    const details = [
      { label: 'Order ID:', value: order.id },
      { label: 'Document Type:', value: order.documentType },
      { label: 'Purpose:', value: order.purpose || 'Not specified' },
      { label: 'Date of Issue:', value: new Date().toLocaleDateString('en-IN') },
      { label: 'Service Type:', value: order.serviceType.toUpperCase() },
    ];

    details.forEach((detail) => {
      page.drawText(detail.label, {
        x: 50,
        y: yPos,
        size: 10,
        font: boldFont,
      });

      const valueText = detail.value.length > 50 ? detail.value.substring(0, 50) + '...' : detail.value;
      page.drawText(valueText, {
        x: 180,
        y: yPos,
        size: 10,
        font: regularFont,
      });

      yPos -= lineHeight;
    });

    // Party Details Section
    yPos -= 20;
    page.drawText('PARTY DETAILS', {
      x: 50,
      y: yPos,
      size: 12,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.5),
    });

    yPos -= 25;

    // First Party
    page.drawText('First Party:', {
      x: 50,
      y: yPos,
      size: 10,
      font: boldFont,
    });

    page.drawText(order.firstPartyName, {
      x: 180,
      y: yPos,
      size: 10,
      font: regularFont,
    });

    yPos -= lineHeight;

    if (order.firstPartyPhone) {
      page.drawText('Phone:', {
        x: 50,
        y: yPos,
        size: 10,
        font: regularFont,
      });

      page.drawText(order.firstPartyPhone, {
        x: 180,
        y: yPos,
        size: 10,
        font: regularFont,
      });

      yPos -= lineHeight;
    }

    yPos -= 10;

    // Second Party
    page.drawText('Second Party:', {
      x: 50,
      y: yPos,
      size: 10,
      font: boldFont,
    });

    page.drawText(order.secondPartyName, {
      x: 180,
      y: yPos,
      size: 10,
      font: regularFont,
    });

    yPos -= lineHeight;

    if (order.secondPartyPhone) {
      page.drawText('Phone:', {
        x: 50,
        y: yPos,
        size: 10,
        font: regularFont,
      });

      page.drawText(order.secondPartyPhone, {
        x: 180,
        y: yPos,
        size: 10,
        font: regularFont,
      });

      yPos -= lineHeight;
    }

    // Payment Breakdown
    yPos -= 30;
    page.drawText('PAYMENT DETAILS', {
      x: 50,
      y: yPos,
      size: 12,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.5),
    });

    yPos -= 25;

    const payments = [
      { label: 'Stamp Paper Amount:', value: `Rs. ${(order.basePrice / 100).toFixed(2)}` },
      { label: 'Convenience Fee:', value: `Rs. ${(order.convenienceFee / 100).toFixed(2)}` },
      { label: 'Service Charge:', value: `Rs. ${(order.serviceCharge / 100).toFixed(2)}` },
    ];

    if (order.promoDiscount > 0) {
      payments.push({ label: 'Discount:', value: `-Rs. ${(order.promoDiscount / 100).toFixed(2)}` });
    }

    payments.push({ label: 'Total Paid:', value: `Rs. ${(order.totalAmount / 100).toFixed(2)}` });

    payments.forEach((payment) => {
      page.drawText(payment.label, {
        x: 50,
        y: yPos,
        size: 10,
        font: regularFont,
      });

      page.drawText(payment.value, {
        x: 200,
        y: yPos,
        size: 10,
        font: payment.label.includes('Total') ? boldFont : regularFont,
      });

      yPos -= lineHeight;
    });

    // Generate QR Code
    const verificationUrl = `${process.env.FRONTEND_URL || 'https://kanoonwise.com'}/stamps/verify/${verificationHash}`;
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      margin: 1,
      width: 150,
      errorCorrectionLevel: 'H',
    });

    const qrImageBytes = Buffer.from(qrDataUrl.split(',')[1], 'base64');
    const qrImage = await pdfDoc.embedPng(qrImageBytes);

    // Position QR at bottom right
    const qrSize = 120;
    page.drawImage(qrImage, {
      x: width - qrSize - 50,
      y: 100,
      width: qrSize,
      height: qrSize,
    });

    page.drawText('Scan to Verify', {
      x: width - qrSize - 40,
      y: 75,
      size: 9,
      font: regularFont,
    });

    // Footer disclaimer
    page.drawText('This is a digitally generated stamp paper. Physical delivery available on request.', {
      x: 50,
      y: 60,
      size: 8,
      font: regularFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    page.drawText('Printed documents will be discarded after 30 days unless doorstep delivery is chosen.', {
      x: 50,
      y: 45,
      size: 8,
      font: regularFont,
      color: rgb(0.8, 0, 0),
    });

    page.drawText(`Verification Hash: ${verificationHash.substring(0, 32)}...`, {
      x: 50,
      y: 30,
      size: 7,
      font: regularFont,
      color: rgb(0.4, 0.4, 0.4),
    });

    // Watermark (diagonal text) - Official Government style
    page.drawText('GOVERNMENT OF INDIA', {
      x: 120,
      y: height / 2 + 50,
      size: 50,
      font: boldFont,
      color: rgb(0.97, 0.97, 0.97),
      rotate: { type: 'degrees', angle: 45 },
    });

    page.drawText('NON-JUDICIAL STAMP', {
      x: 130,
      y: height / 2 - 20,
      size: 40,
      font: boldFont,
      color: rgb(0.97, 0.97, 0.97),
      rotate: { type: 'degrees', angle: 45 },
    });

    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
}

/**
 * Generate verification hash for stamp
 */
function generateVerificationHash(orderId, stampAmount, timestamp) {
  const data = `${orderId}|${stampAmount}|${timestamp}`;
  return crypto
    .createHash('sha256')
    .update(data + process.env.JWT_SECRET)
    .digest('hex');
}

module.exports = {
  generateStampPdf,
  generateVerificationHash,
};
