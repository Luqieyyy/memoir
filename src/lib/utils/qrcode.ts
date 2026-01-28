import QRCode from 'qrcode';

export interface QRCodeOptions {
  width?: number;
  margin?: number;
  color?: {
    dark?: string;
    light?: string;
  };
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
}

const defaultOptions: QRCodeOptions = {
  width: 300,
  margin: 2,
  color: {
    dark: '#1a1a1a',
    light: '#ffffff',
  },
  errorCorrectionLevel: 'H',
};

/**
 * Generate QR code as Data URL (base64)
 */
export async function generateQRCodeDataURL(
  url: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const mergedOptions = { ...defaultOptions, ...options };
  
  return QRCode.toDataURL(url, {
    width: mergedOptions.width,
    margin: mergedOptions.margin,
    color: mergedOptions.color,
    errorCorrectionLevel: mergedOptions.errorCorrectionLevel,
  });
}

/**
 * Generate QR code as SVG string
 */
export async function generateQRCodeSVG(
  url: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const mergedOptions = { ...defaultOptions, ...options };
  
  return QRCode.toString(url, {
    type: 'svg',
    width: mergedOptions.width,
    margin: mergedOptions.margin,
    color: mergedOptions.color,
    errorCorrectionLevel: mergedOptions.errorCorrectionLevel,
  });
}

/**
 * Download QR code as PNG
 */
export async function downloadQRCodeAsPNG(
  url: string,
  filename: string,
  options: QRCodeOptions = {}
): Promise<void> {
  const dataURL = await generateQRCodeDataURL(url, { ...options, width: 1024 });
  
  const link = document.createElement('a');
  link.download = `${filename}.png`;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Download QR code as SVG
 */
export async function downloadQRCodeAsSVG(
  url: string,
  filename: string,
  options: QRCodeOptions = {}
): Promise<void> {
  const svgString = await generateQRCodeSVG(url, { ...options, width: 1024 });
  
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const blobUrl = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.download = `${filename}.svg`;
  link.href = blobUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(blobUrl);
}

/**
 * Generate wedding QR code URL
 */
export function getWeddingQRCodeUrl(weddingId: string): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://memoir.app';
  return `${appUrl}/wedding/${weddingId}`;
}

/**
 * Generate print-ready QR code (higher resolution)
 */
export async function generatePrintReadyQRCode(
  url: string,
  options: QRCodeOptions = {}
): Promise<string> {
  return generateQRCodeDataURL(url, {
    ...options,
    width: 2048,
    errorCorrectionLevel: 'H',
  });
}
