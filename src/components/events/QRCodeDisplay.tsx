'use client';

import React, { useState, useEffect } from 'react';
import { generateQRCodeDataURL, downloadQRCodeAsPNG, downloadQRCodeAsSVG } from '@/lib/utils';
import { Button, Card, Spinner } from '@/components/ui';
import { Download, Copy, Check, QrCode } from 'lucide-react';
import toast from 'react-hot-toast';

interface QRCodeDisplayProps {
  url: string;
  brideName: string;
  groomName: string;
  weddingId: string;
  size?: number;
  showDownloadButtons?: boolean;
  showCopyButton?: boolean;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  url,
  brideName,
  groomName,
  weddingId,
  size = 280,
  showDownloadButtons = true,
  showCopyButton = true,
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const generateQR = async () => {
      setLoading(true);
      try {
        const dataUrl = await generateQRCodeDataURL(url, {
          width: size,
          color: {
            dark: '#2d2d2d',
            light: '#ffffff',
          },
        });
        setQrCodeDataUrl(dataUrl);
      } catch (error) {
        console.error('Error generating QR code:', error);
        toast.error('Failed to generate QR code');
      } finally {
        setLoading(false);
      }
    };

    generateQR();
  }, [url, size]);

  const handleDownloadPNG = async () => {
    try {
      const filename = `memoir-${brideName.toLowerCase()}-${groomName.toLowerCase()}-qr`;
      await downloadQRCodeAsPNG(url, filename);
      toast.success('QR code downloaded as PNG');
    } catch (error) {
      console.error('Error downloading PNG:', error);
      toast.error('Failed to download QR code');
    }
  };

  const handleDownloadSVG = async () => {
    try {
      const filename = `memoir-${brideName.toLowerCase()}-${groomName.toLowerCase()}-qr`;
      await downloadQRCodeAsSVG(url, filename);
      toast.success('QR code downloaded as SVG');
    } catch (error) {
      console.error('Error downloading SVG:', error);
      toast.error('Failed to download QR code');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error('Failed to copy link');
    }
  };

  return (
    <Card className="text-center" padding="lg">
      <div className="flex flex-col items-center">
        {/* QR Code Header */}
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 text-primary-600 mb-2">
            <QrCode className="w-5 h-5" />
            <span className="text-sm font-medium">Wedding QR Code</span>
          </div>
          <h3 className="text-lg font-display font-semibold text-secondary-800">
            {brideName} & {groomName}
          </h3>
        </div>

        {/* QR Code Image */}
        <div className="relative bg-white p-4 rounded-xl border border-secondary-100 shadow-sm mb-4">
          {loading ? (
            <div
              className="flex items-center justify-center"
              style={{ width: size, height: size }}
            >
              <Spinner size="lg" />
            </div>
          ) : qrCodeDataUrl ? (
            <img
              src={qrCodeDataUrl}
              alt={`QR Code for ${brideName} & ${groomName}'s wedding`}
              width={size}
              height={size}
              className="block"
            />
          ) : (
            <div
              className="flex items-center justify-center bg-secondary-50 text-secondary-400"
              style={{ width: size, height: size }}
            >
              Failed to load QR code
            </div>
          )}
        </div>

        {/* URL Display */}
        <div className="w-full bg-secondary-50 rounded-lg p-3 mb-4">
          <p className="text-xs text-secondary-500 mb-1">Guests can scan this code or visit:</p>
          <code className="text-sm text-primary-600 font-mono break-all">{url}</code>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {showCopyButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            >
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          )}
          
          {showDownloadButtons && (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownloadPNG}
                icon={<Download className="w-4 h-4" />}
              >
                PNG
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownloadSVG}
                icon={<Download className="w-4 h-4" />}
              >
                SVG
              </Button>
            </>
          )}
        </div>

        {/* Print Instructions */}
        <div className="mt-4 p-3 bg-primary-50 rounded-lg w-full">
          <p className="text-xs text-primary-700">
            <strong>Tip:</strong> Download the SVG for best print quality. Place QR codes on tables,
            invitations, or anywhere guests can easily scan.
          </p>
        </div>
      </div>
    </Card>
  );
};
