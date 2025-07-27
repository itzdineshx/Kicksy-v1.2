import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Calendar, MapPin, CreditCard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBooking } from "@/components/BookingProvider";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  options?: string[];
  eventSuggestion?: {
    title: string;
    date: string;
    price: string;
    venue: string;
  };
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { openBookingModal } = useBooking();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting with more personality
      setTimeout(() => {
        addBotMessage("🏆 Hey there! I'm Alex, your personal sports buddy! I live and breathe sports just like you. Whether you want to catch the next big match, grab tickets for your favorite team, or just chat about the latest scores - I'm your guy! What's exciting you today?", [
          "Show me hot matches",
          "My bookings & tickets",
          "Latest sports news", 
          "Find great deals"
        ]);
      }, 800);
    }
  }, [isOpen]);

  const addBotMessage = (content: string, options?: string[], eventSuggestion?: any) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "bot",
      content,
      timestamp: new Date(),
      options,
      eventSuggestion
    };
    setMessages(prev => [...prev, message]);
    setIsTyping(false);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

const processUserInput = async (input: string) => {
    addUserMessage(input);
    setIsTyping(true);
    
    // More realistic AI processing delay with variance
    const processingTime = 800 + Math.random() * 1500;
    await new Promise(resolve => setTimeout(resolve, processingTime));

    const lowerInput = input.toLowerCase();
    
    // More natural conversation patterns
    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      addBotMessage(
        "Hey there! 👋 Great to see you! I'm Alex, your personal sports assistant. I'm here to make your sports experience amazing. What's on your mind today?",
        ["Find upcoming matches", "Check my bookings", "Explore deals", "Get recommendations"]
      );
    } else if (lowerInput.includes("cricket") || lowerInput.includes("find")) {
      addBotMessage(
        "🏏 Awesome choice! Cricket is absolutely thrilling right now. I've been tracking some incredible matches for you. Let me show you something special I found:",
        ["Book this match", "Show more matches", "Check weather forecast", "Compare prices"],
        {
          title: "India vs Australia ODI",
          date: "Dec 30, 2025",
          price: "₹2,500",
          venue: "Wankhede Stadium, Mumbai"
        }
      );
    } else if (lowerInput.includes("booking") || lowerInput.includes("ticket") || lowerInput.includes("my")) {
      addBotMessage(
        "📱 Let me pull up your account... Perfect! I can see you have 2 upcoming events and your last booking was just confirmed. You're all set! What would you like to do?",
        ["View my bookings", "Book another event", "Modify booking", "Download e-tickets", "Share with friends"]
      );
    } else if (lowerInput.includes("weather")) {
      addBotMessage(
        "🌤️ Just checked the latest forecast for you! It's looking absolutely perfect - 26°C with clear skies in Mumbai. Ideal cricket weather! The 5-day forecast shows no rain either. You picked a great time!",
        ["Detailed 7-day forecast", "Weather for other venues", "Get weather alerts", "Best weather cities"]
      );
    } else if (lowerInput.includes("payment") || lowerInput.includes("refund") || lowerInput.includes("money")) {
      addBotMessage(
        "💳 No worries at all! Payment issues happen to everyone. I'm here to sort this out quickly for you. Let me know what specific issue you're facing and I'll get it resolved right away.",
        ["Payment declined", "Refund request", "Update card details", "View payment history", "Contact finance team"]
      );
    } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("deal") || lowerInput.includes("cheap")) {
      addBotMessage(
        "💰 You came at the perfect time! I just spotted some incredible deals. There's a flash sale running with 20% off premium seats, and I noticed football tickets dropped 15% since yesterday. Want me to show you the best offers?",
        ["Show flash deals", "Set price alerts", "Budget finder", "Compare venues", "Student discounts"]
      );
    } else if (lowerInput.includes("help") || lowerInput.includes("support") || lowerInput.includes("problem")) {
      addBotMessage(
        "🤝 Absolutely! I'm here to help you with anything. I've helped thousands of sports fans and I love solving problems. What's going on? Don't worry, we'll figure this out together!",
        ["Booking troubles", "Payment issues", "Account problems", "App not working", "Speak to human agent"]
      );
    } else if (lowerInput.includes("football") || lowerInput.includes("soccer")) {
      addBotMessage(
        "⚽ Football fan! Excellent taste. The season is heating up and there are some jaw-dropping matches coming up. I've been tracking the best games for you. Ready to see something exciting?",
        ["Show football matches", "Premier League", "Champions League", "Local tournaments", "Set team alerts"]
      );
    } else if (lowerInput.includes("thank") || lowerInput.includes("thanks")) {
      addBotMessage(
        "🙏 You're so welcome! It's my pleasure helping sports fans like you. I'm always here whenever you need assistance. Enjoy your matches and feel free to reach out anytime!",
        ["Find more events", "Set reminders", "Get match updates", "Rate my help"]
      );
    } else if (lowerInput.includes("bye") || lowerInput.includes("goodbye")) {
      addBotMessage(
        "👋 Take care and enjoy your sports adventures! Remember, I'm just a click away whenever you need help with bookings, updates, or recommendations. Have an amazing time at your events!",
        ["Quick booking", "Save for later", "Set notifications"]
      );
    } else {
      const responses = [
        "🤔 Hmm, let me think about that... I want to make sure I understand exactly what you need. Could you tell me a bit more?",
        "💭 Interesting question! I'm here to help with anything sports-related. What specifically are you looking for today?",
        "🎯 I want to give you the best possible help! Could you clarify what you'd like assistance with?",
        "✨ I'm ready to help you with anything sports-related! What's the main thing you're trying to do right now?"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      addBotMessage(
        randomResponse,
        ["Find events", "My bookings", "Payment help", "General support", "Start over"]
      );
    }
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      processUserInput(inputValue);
      setInputValue("");
    }
  };

  const handleOptionClick = (option: string) => {
    const lowerOption = option.toLowerCase();
    
    // Handle special navigation options with visual feedback
    if (lowerOption.includes('booking') || lowerOption.includes('dashboard')) {
      addUserMessage(option);
      setIsTyping(true);
      
      setTimeout(() => {
        addBotMessage("🚀 Perfect! I'm taking you to your dashboard now where you can see all your bookings and tickets. You'll be redirected in just a moment...");
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }, 800);
      return;
    }
    
    if (lowerOption.includes('events') || lowerOption.includes('matches')) {
      addUserMessage(option);
      setIsTyping(true);
      
      setTimeout(() => {
        addBotMessage("🎯 Awesome! I'm opening the events page for you. You'll find all the latest matches and tournaments there. Redirecting now...");
        
        setTimeout(() => {
          navigate('/events');
        }, 2000);
      }, 800);
      return;
    }
    
    if (lowerOption.includes('venue')) {
      addUserMessage(option);
      setIsTyping(true);
      
      setTimeout(() => {
        addBotMessage("🏟️ Great choice! I'm taking you to explore all available venues. You'll see locations, facilities, and upcoming events. Redirecting...");
        
        setTimeout(() => {
          navigate('/venues');
        }, 2000);
      }, 800);
      return;
    }
    
    // Default behavior for other options
    processUserInput(option);
  };

  const handleEventBook = (event: any) => {
    openBookingModal({
      id: Date.now(),
      title: event.title,
      date: event.date,
      time: "2:30 PM",
      venue: event.venue,
      price: event.price,
      category: "Cricket",
      attendance: "500 tickets left"
    });
    addBotMessage("🎉 Great choice! I've opened the booking modal for you. Complete your booking and I'll send you a confirmation with your e-tickets!");
  };

  return (
    <>
      {/* Chat Widget Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-floating hover:scale-110 transition-all duration-300 z-50 hidden lg:flex ${isOpen ? 'hidden' : 'flex'}`}
        size="lg"
      >
        <MessageCircle className="h-6 w-6" />
        <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs animate-pulse">
          <Sparkles className="w-3 h-3" />
        </div>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-floating border-2 border-primary/20 z-50 flex flex-col animate-scale-in hidden lg:flex">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Alex - Sports Assistant</h3>
                <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Online • Always ready to help
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:text-primary-foreground/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <div className="flex items-start gap-2">
                    {message.type === 'bot' && (
                      <Bot className="w-4 h-4 mt-0.5 text-primary" />
                    )}
                    {message.type === 'user' && (
                      <User className="w-4 h-4 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Event Suggestion */}
                      {message.eventSuggestion && (
                        <Card className="mt-3 p-3 border border-primary/20 bg-card">
                          <div className="space-y-2">
                            <h4 className="font-bold text-sm text-card-foreground">{message.eventSuggestion.title}</h4>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {message.eventSuggestion.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {message.eventSuggestion.venue.split(',')[0]}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-primary">{message.eventSuggestion.price}</span>
                              <Button 
                                size="sm" 
                                onClick={() => handleEventBook(message.eventSuggestion)}
                                className="text-xs"
                              >
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </Card>
                      )}
                      
                      {/* Quick Options */}
                      {message.options && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleOptionClick(option)}
                              className="text-xs h-7"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-muted-foreground rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} size="sm" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatbotWidget;