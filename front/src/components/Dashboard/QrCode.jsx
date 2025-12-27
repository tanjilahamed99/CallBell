import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Download, Share2, Link } from "lucide-react";

const QrCode = ({ user = {} }) => {
  const qrRef = useRef();
  const qrValue = `userId=${user?.id}&name=${encodeURIComponent(user?.name)}`;
  const websiteUrl = "www.callbell.in";

  // Download QR Code with website text
  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const originalCanvas = document.createElement("canvas");
    const ctx = originalCanvas.getContext("2d");
    
    // Set up dimensions for the final image
    const qrSize = 200;
    const padding = 40;
    const textHeight = 40;
    const totalHeight = qrSize + padding * 2 + textHeight + 20;
    const totalWidth = qrSize + padding * 2;
    
    originalCanvas.width = totalWidth;
    originalCanvas.height = totalHeight;
    
    // Fill background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, totalWidth, totalHeight);
    
    // Add subtle gradient background
    const gradient = ctx.createLinearGradient(0, 0, totalWidth, totalHeight);
    gradient.addColorStop(0, "#fef2f2");
    gradient.addColorStop(1, "#fee2e2");
    ctx.fillStyle = gradient;
    ctx.fillRect(10, 10, totalWidth - 20, totalHeight - 20);
    
    // Draw QR code
    ctx.drawImage(canvas, padding, padding, qrSize, qrSize);
    
    // Add border around QR code
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 2;
    ctx.strokeRect(padding - 5, padding - 5, qrSize + 10, qrSize + 10);
    
    // Add website text
    ctx.fillStyle = "#dc2626";
    ctx.font = "bold 20px 'Inter', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(websiteUrl, totalWidth / 2, padding + qrSize + padding / 2 + 20);
    
    // Add user name text
    if (user?.name) {
      ctx.fillStyle = "#374151";
      ctx.font = "bold 16px 'Inter', Arial, sans-serif";
      ctx.fillText(user.name, totalWidth / 2, padding - 10);
    }
    
    // Add scan instruction
    ctx.fillStyle = "#6b7280";
    ctx.font = "14px 'Inter', Arial, sans-serif";
    ctx.fillText("Scan to connect", totalWidth / 2, totalHeight - 10);
    
    // Add border
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, totalWidth, totalHeight);
    
    // Create download link
    const url = originalCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `${user?.name || "user"}_callbell_qr.png`;
    link.click();
  };

  // Share QR Code
  const handleShare = async () => {
    try {
      const canvas = qrRef.current.querySelector("canvas");
      const finalCanvas = document.createElement("canvas");
      const ctx = finalCanvas.getContext("2d");
      
      // Create enhanced QR for sharing
      const qrSize = 200;
      const padding = 30;
      const textHeight = 30;
      const totalHeight = qrSize + padding * 2 + textHeight;
      const totalWidth = qrSize + padding * 2;
      
      finalCanvas.width = totalWidth;
      finalCanvas.height = totalHeight;
      
      // Background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, totalWidth, totalHeight);
      
      // Draw QR
      ctx.drawImage(canvas, padding, padding, qrSize, qrSize);
      
      // Add website text
      ctx.fillStyle = "#dc2626";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(websiteUrl, totalWidth / 2, padding + qrSize + padding / 2 + 15);
      
      const blob = await new Promise((resolve) => finalCanvas.toBlob(resolve));
      const filesArray = [
        new File([blob], `${user?.name}_callbell_qr.png`, { type: "image/png" }),
      ];
      
      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        await navigator.share({
          files: filesArray,
          title: "CallBell QR Code",
          text: `Scan this QR code to connect with ${user?.name} on CallBell (${websiteUrl})`,
        });
      } else {
        // Fallback: show download
        handleDownload();
      }
    } catch (error) {
      console.error("Error sharing QR code:", error);
      handleDownload();
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Scan to connect with <span className="text-red-600">{user?.name}</span>
        </h2>
        <p className="text-gray-600">
          Share this QR code for quick connection
        </p>
      </div>

      {/* QR Code Container */}
      <div className="relative mb-8">
        <div className="flex justify-center">
          <div 
            ref={qrRef}
            className="relative p-4 bg-white rounded-xl shadow-inner border-2 border-gray-100"
          >
            <QRCodeCanvas 
              value={qrValue} 
              size={200}
              bgColor="#FFFFFF"
              fgColor="#dc2626"
              level="H"
              includeMargin={true}
            />
          </div>
        </div>
        
        {/* Website URL Display */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Link className="w-5 h-5 text-red-600" />
          <span className="text-lg font-bold text-red-700">{websiteUrl}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleDownload}
          className="group relative flex-1 max-w-xs mx-auto sm:mx-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 font-semibold">
            <Download className="w-5 h-5" />
            Download QR Code
          </div>
        </button>

        <button
          onClick={handleShare}
          className="group relative flex-1 max-w-xs mx-auto sm:mx-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-semibold">
            <Share2 className="w-5 h-5" />
            Share QR Code
          </div>
        </button>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Download Information</h4>
            <p className="text-sm text-gray-600">
              Your downloaded QR code will include the website URL (www.callbell.in) 
              and can be used to quickly connect with you on the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;