import { useCallback } from 'react';

interface PrintOptions {
  content: () => HTMLElement | null;
  onAfterPrint?: () => void;
}

export function useReactToPrint({ content, onAfterPrint }: PrintOptions) {
  return useCallback(() => {
    const printContent = content();
    if (!printContent) {
      console.warn('Print content not found');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.warn('Could not open print window');
      return;
    }

    // Add print styles
    const style = `
      <style>
        @media print {
          @page {
            margin: 20mm;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
        body {
          font-family: system-ui, -apple-system, sans-serif;
        }
        /* Ensure content fits on page */
        table { page-break-inside: avoid; }
        tr { page-break-inside: avoid; }
      </style>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Invoice</title>
          ${style}
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Print after images are loaded
    const handleLoad = () => {
      // Small delay to ensure styles are applied
      setTimeout(() => {
      printWindow.print();
        // Only close window and call callback after print dialog is closed
        setTimeout(() => {
          printWindow.close();
          if (onAfterPrint) {
            onAfterPrint();
          }
        }, 100);
      }, 100);
    };

    if (printWindow.document.readyState === 'complete') {
      handleLoad();
    } else {
      printWindow.onload = handleLoad;
    }
  }, [content, onAfterPrint]);
}