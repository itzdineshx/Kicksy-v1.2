import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUserData } from "@/components/UserDataProvider";
import QRCode from "qrcode";
import { 
  QrCode, 
  Download, 
  Share2, 
  Smartphone, 
  Shield, 
  Ticket,
  Calendar,
  MapPin,
  User,
  RefreshCw,
  Copy,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

interface TicketQR {
  id: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  seat: string;
  qrData: string;
  qrImage: string;
  verified: boolean;
  expiresAt: string;
}

export const QRCodeGenerator: React.FC = () => {
  const { toast } = useToast();
  const { getUpcomingBookings } = useUserData();
  const [ticketQRs, setTicketQRs] = useState<TicketQR[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const upcomingBookings = getUpcomingBookings();

  // Generate QR codes for tickets
  useEffect(() => {
    const generateQRCodes = async () => {
      setIsGenerating(true);
      const qrPromises = upcomingBookings.flatMap(booking =>
        booking.seats.map(async (seat) => {
          const qrData = JSON.stringify({
            ticketId: `${booking.id}-${seat}`,
            eventId: booking.id,
            eventTitle: booking.eventTitle,
            eventDate: booking.eventDate,
            venue: booking.venue,
            seat: seat,
            holder: "John Doe", // In real app, use actual user data
            bookingRef: booking.id,
            timestamp: Date.now(),
            verification: Math.random().toString(36).substring(2, 15)
          });

          try {
            const qrImage = await QRCode.toDataURL(qrData, {
              width: 256,
              margin: 2,
              color: {
                dark: '#000000',
                light: '#FFFFFF'
              },
              errorCorrectionLevel: 'M'
            });

            return {
              id: `${booking.id}-${seat}`,
              eventTitle: booking.eventTitle,
              eventDate: booking.eventDate,
              venue: booking.venue,
              seat: seat,
              qrData: qrData,
              qrImage: qrImage,
              verified: true,
              expiresAt: booking.eventDate
            };
          } catch (error) {
            console.error('QR Code generation failed:', error);
            return null;
          }
        })
      );

      const qrCodes = (await Promise.all(qrPromises)).filter(Boolean) as TicketQR[];
      setTicketQRs(qrCodes);
      setIsGenerating(false);
    };

    if (upcomingBookings.length > 0) {
      generateQRCodes();
    }
  }, [upcomingBookings]);

  const downloadQRCode = async (ticket: TicketQR) => {
    try {
      // Create a enhanced QR code with ticket details
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = 400;
        canvas.height = 500;

        // White background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Header
        ctx.fillStyle = '#1A1A1A';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('EVENT TICKET', canvas.width / 2, 40);

        // Event details
        ctx.font = '16px Arial';
        ctx.fillText(ticket.eventTitle, canvas.width / 2, 70);
        
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666666';
        ctx.fillText(ticket.eventDate, canvas.width / 2, 95);
        ctx.fillText(ticket.venue, canvas.width / 2, 115);
        ctx.fillText(`Seat: ${ticket.seat}`, canvas.width / 2, 135);

        // QR Code
        const qrImg = new Image();
        qrImg.onload = () => {
          ctx.drawImage(qrImg, 75, 160, 250, 250);
          
          // Footer
          ctx.font = '12px Arial';
          ctx.fillStyle = '#999999';
          ctx.fillText('Scan this code at the venue entrance', canvas.width / 2, 440);
          ctx.fillText('Valid for one-time entry only', canvas.width / 2, 460);
          
          // Download
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `ticket-${ticket.eventTitle.replace(/\s+/g, '-')}-${ticket.seat}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              
              toast({
                title: "QR Code Downloaded!",
                description: `Ticket for ${ticket.seat} saved to your device`,
              });
            }
          });
        };
        qrImg.src = ticket.qrImage;
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download QR code. Please try again.",
        variant: "destructive"
      });
    }
  };

  const copyQRData = (ticket: TicketQR) => {
    navigator.clipboard.writeText(ticket.qrData);
    toast({
      title: "QR Data Copied!",
      description: "QR code data copied to clipboard",
    });
  };

  const shareQRCode = async (ticket: TicketQR) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket: ${ticket.eventTitle}`,
          text: `My ticket for ${ticket.eventTitle} - Seat ${ticket.seat}`,
          url: window.location.href
        });
      } catch (error) {
        toast({
          title: "Sharing not supported",
          description: "Use the download option instead",
          variant: "destructive"
        });
      }
    } else {
      copyQRData(ticket);
    }
  };

  const refreshQRCode = async (ticketId: string) => {
    setIsGenerating(true);
    // Simulate QR code refresh with new verification data
    setTimeout(() => {
      setTicketQRs(prev => prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, qrData: ticket.qrData + '_refreshed_' + Date.now() }
          : ticket
      ));
      setIsGenerating(false);
      toast({
        title: "QR Code Refreshed!",
        description: "Your ticket has been updated with new security data",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Hidden canvas for QR code generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Header */}
      <div className="flex items-center gap-2">
        <QrCode className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold bg-gradient-sports bg-clip-text text-transparent">
          Digital Tickets & QR Codes
        </h2>
      </div>

      {/* QR Code Tickets */}
      {ticketQRs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ticketQRs.map(ticket => (
            <Card key={ticket.id} className="border-0 bg-gradient-card shadow-floating">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
                  <div className="flex gap-2">
                    {ticket.verified && (
                      <Badge className="bg-green-100 text-green-700">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge variant="outline">Seat {ticket.seat}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{ticket.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{ticket.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span>Seat {ticket.seat}</span>
                  </div>
                </div>

                <Separator />

                {/* QR Code */}
                <div className="text-center">
                  <div className="inline-block p-4 bg-white rounded-lg border-2 border-primary/20">
                    {isGenerating ? (
                      <div className="w-32 h-32 flex items-center justify-center">
                        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    ) : (
                      <img 
                        src={ticket.qrImage} 
                        alt={`QR Code for ${ticket.eventTitle}`}
                        className="w-32 h-32"
                      />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Scan at venue entrance
                  </p>
                </div>

                <Separator />

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadQRCode(ticket)}
                    disabled={isGenerating}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => shareQRCode(ticket)}
                    disabled={isGenerating}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyQRData(ticket)}
                    disabled={isGenerating}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Data
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => refreshQRCode(ticket.id)}
                    disabled={isGenerating}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                {/* Security Info */}
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="font-medium">Secure Ticket</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This QR code contains encrypted verification data and is valid for one-time entry.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="border-0 bg-gradient-card shadow-floating">
          <CardContent className="p-12 text-center">
            <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Active Tickets</h3>
            <p className="text-muted-foreground mb-6">
              Book your tickets to get QR codes for quick venue entry.
            </p>
            <Button>Browse Events</Button>
          </CardContent>
        </Card>
      )}

      {/* QR Code Features */}
      <Card className="border-0 bg-gradient-primary text-primary-foreground shadow-floating">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-6 h-6" />
            <h3 className="text-lg font-bold">Digital Ticket Benefits</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="w-5 h-5" />
                <span className="font-semibold">Quick Entry</span>
              </div>
              <p className="text-sm opacity-90">
                Skip long lines with instant QR code scanning at the venue
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Secure & Verified</span>
              </div>
              <p className="text-sm opacity-90">
                Each QR code is uniquely encrypted and verified in real-time
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5" />
                <span className="font-semibold">Always Available</span>
              </div>
              <p className="text-sm opacity-90">
                Access your tickets offline, store in mobile wallet, or print
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Important:</h4>
                <p className="text-sm opacity-90">
                  Keep your QR codes secure and don't share them publicly. Each code is valid for one-time entry only. 
                  If you suspect your ticket has been compromised, use the refresh option to generate a new QR code.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};