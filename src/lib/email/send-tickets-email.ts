import { supabase } from "@/lib/supabase";
import { Order } from "@/types/order";
import { Ticket } from "@/features/tickets/services/ticket-service";
import QRCode from "qrcode";
import JsBarcode from "jsbarcode";
import { DOMImplementation, XMLSerializer } from "xmldom";

async function generateQRCode(code: string): Promise<string> {
  try {
    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(code, {
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

async function generateBarcode(code: string): Promise<string> {
  try {
    // Create a virtual DOM document for SVG generation
    const xmlSerializer = new XMLSerializer();
    const document = new DOMImplementation().createDocument(
      "http://www.w3.org/1999/xhtml",
      "html",
      null
    );
    const svgNode = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );

    // Generate barcode as SVG
    JsBarcode(svgNode, code, {
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
      svgString
    ).toString("base64")}`;

    return dataUrl;
  } catch (error) {
    console.error("Failed to generate barcode:", error);
    throw error;
  }
}

export async function sendTicketEmail(
  toEmail: string,
  tickets: Ticket[],
  order: Order
): Promise<void> {
  try {
    // Group tickets by event
    const ticketsByEvent = tickets.reduce((acc, ticket) => {
      const eventId = ticket.metadata.eventId;
      if (!acc[eventId]) {
        acc[eventId] = [];
      }
      acc[eventId].push(ticket);
      return acc;
    }, {} as Record<string, Ticket[]>);

    // Create email content with tickets grouped by event
    const emailContent = await Promise.all(
      Object.entries(ticketsByEvent).map(async ([eventId, eventTickets]) => {
        const ticketsHtml = await Promise.all(
          eventTickets.map(async (ticket) => {
            const qrCode = await generateQRCode(ticket.code);
            const barcode = await generateBarcode(ticket.code);

            return `
            <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
              <p><strong>Ticket Code:</strong> ${ticket.code}</p>
              <p><strong>Attendee:</strong> ${ticket.metadata.attendeeName}</p>
              <div style="margin: 15px 0;">
                <img src="${qrCode}" alt="QR Code" style="width: 200px; height: 200px;"/>
              </div>
              <div style="margin: 15px 0;">
                <img src="${barcode}" alt="Barcode" style="width: 300px;"/>
              </div>
            </div>
          `;
          })
        );

        return `
          <div style="margin-bottom: 30px;">
            <h2>${eventTickets[0].metadata.eventName}</h2>
            ${ticketsHtml.join("")}
          </div>
        `;
      })
    );

    const finalEmailContent = `
      <h1>Your Event Tickets</h1>
      <p>Thank you for your order #${order.id}!</p>
      
      ${emailContent.join("")}
      
      <p>Please present these tickets at the event entrance.</p>
      <p>Each ticket can only be used once.</p>
    `;

    // Send email using Supabase Edge Function
    const { error } = await supabase.functions.invoke("send-event-tickets", {
      body: {
        to: toEmail,
        subject: `Your Tickets for Order #${order.id}`,
        html: finalEmailContent,
      },
    });

    if (error) throw error;
  } catch (error) {
    console.error("Failed to send ticket email:", error);
    throw error;
  }
}
