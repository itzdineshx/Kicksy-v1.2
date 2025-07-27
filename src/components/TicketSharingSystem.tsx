import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Share2, 
  Copy, 
  Mail, 
  MessageCircle, 
  Facebook, 
  Twitter, 
  Users, 
  QrCode,
  Calendar,
  MapPin,
  Clock,
  Gift,
  ExternalLink
} from "lucide-react";

interface SharedTicket {
  id: string;
  eventTitle: string;
  eventDate: string;
  venue: string;
  seats: string[];
  totalAmount: number;
  shareCode: string;
  expiresAt: string;
  status: "active" | "expired" | "used";
}

export const TicketSharingSystem: React.FC = () => {
  const { toast } = useToast();
  const [sharedTickets, setSharedTickets] = useState<SharedTicket[]>([
    {
      id: "tk-001",
      eventTitle: "IPL Final 2025",
      eventDate: "Dec 28, 2025",
      venue: "Wankhede Stadium, Mumbai",
      seats: ["A12", "A13"],
      totalAmount: 5000,
      shareCode: "SHARE-IPL-2025-A12",
      expiresAt: "Dec 27, 2025",
      status: "active"
    },
    {
      id: "tk-002",
      eventTitle: "Football Championship",
      eventDate: "Dec 30, 2025",
      venue: "Salt Lake Stadium, Kolkata",
      seats: ["B25", "B26", "B27"],
      totalAmount: 5400,
      shareCode: "SHARE-FOOT-2025-B25",
      expiresAt: "Dec 29, 2025",
      status: "active"
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<SharedTicket | null>(null);
  const [recipientEmail, setRecipientEmail] = useState("");

  const generateShareLink = (ticket: SharedTicket) => {
    return `${window.location.origin}/tickets/shared/${ticket.shareCode}`;
  };

  const handleCopyLink = (ticket: SharedTicket) => {
    const link = generateShareLink(ticket);
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied!",
      description: "Share link has been copied to clipboard",
    });
  };

  const handleShareViaEmail = async () => {
    if (!selectedTicket || !recipientEmail) return;

    const subject = `Ticket Share: ${selectedTicket.eventTitle}`;
    const body = `Hi! I'm sharing my tickets for ${selectedTicket.eventTitle} with you.

Event Details:
📅 Date: ${selectedTicket.eventDate}
📍 Venue: ${selectedTicket.venue}
🎫 Seats: ${selectedTicket.seats.join(', ')}
💰 Total: ₹${selectedTicket.totalAmount.toLocaleString()}

Use this link to claim your tickets:
${generateShareLink(selectedTicket)}

Code: ${selectedTicket.shareCode}
Valid until: ${selectedTicket.expiresAt}

See you at the event!`;

    const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
    
    toast({
      title: "Email Draft Created!",
      description: "Email client opened with ticket details",
    });
  };

  const handleSocialShare = (platform: string, ticket: SharedTicket) => {
    const link = generateShareLink(ticket);
    const text = `Check out these tickets for ${ticket.eventTitle}! 🎫 ${ticket.eventDate}`;
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + link)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const getStatusColor = (status: SharedTicket["status"]) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "expired": return "bg-red-100 text-red-700";
      case "used": return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Share2 className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold bg-gradient-sports bg-clip-text text-transparent">
          Share Your Tickets
        </h2>
      </div>

      {/* Shared Tickets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sharedTickets.map(ticket => (
          <Card key={ticket.id} className="border-0 bg-gradient-card shadow-floating">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{ticket.eventTitle}</CardTitle>
                <Badge className={getStatusColor(ticket.status)}>
                  {ticket.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>Seats: {ticket.seats.join(', ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>Expires: {ticket.expiresAt}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-muted/20 rounded">
                  <code className="text-sm font-mono">{ticket.shareCode}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyLink(ticket)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Share via Email</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Recipient email address"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                        />
                        <Button 
                          onClick={handleShareViaEmail}
                          disabled={!recipientEmail}
                          className="w-full"
                        >
                          Send Email
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSocialShare("whatsapp", ticket)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSocialShare("twitter", ticket)}
                  >
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSocialShare("facebook", ticket)}
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sharing Features Info */}
      <Card className="border-0 bg-gradient-primary text-primary-foreground shadow-floating">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="w-6 h-6" />
            <h3 className="text-lg font-bold">Sharing Benefits</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">Easy Transfer</span>
              </div>
              <p className="text-sm opacity-90">
                Share tickets with friends and family using secure codes
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <QrCode className="w-5 h-5" />
                <span className="font-semibold">QR Code Access</span>
              </div>
              <p className="text-sm opacity-90">
                Recipients get scannable QR codes for quick entry
              </p>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="w-5 h-5" />
                <span className="font-semibold">Multiple Platforms</span>
              </div>
              <p className="text-sm opacity-90">
                Share via email, social media, or direct links
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <h4 className="font-semibold mb-2">How it works:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm opacity-90">
              <li>Select the tickets you want to share</li>
              <li>Choose your preferred sharing method</li>
              <li>Recipient receives a secure link and code</li>
              <li>They can claim the tickets to their account</li>
              <li>Everyone gets QR codes for event entry</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};