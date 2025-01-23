import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { DOMImplementation, XMLSerializer } from "xmldom";

export async function generateQRCode(data: string): Promise<string> {
  try {
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 300,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    throw error;
  }
}

export async function generateBarcode(data: string): Promise<string> {
  try {
    // Create a virtual DOM document for SVG generation
    const xmlSerializer = new XMLSerializer();
    const document = new DOMImplementation().createDocument(
      "http://www.w3.org/1999/xhtml",
      "html",
      null,
    );
    const svgNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );

    // Generate barcode as SVG
    JsBarcode(svgNode, data, {
      format: "CODE128",
      width: 2,
      height: 100,
      displayValue: true,
      fontSize: 20,
      margin: 10,
    });

    // Convert SVG to string and then to data URL
    const svgString = xmlSerializer.serializeToString(svgNode);
    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(
      svgString,
    ).toString("base64")}`;

    return dataUrl;
  } catch (error) {
    console.error("Failed to generate barcode:", error);
    throw error;
  }
}
