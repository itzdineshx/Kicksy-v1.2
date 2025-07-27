import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Raj Patel",
      role: "Cricket Enthusiast",
      location: "Mumbai",
      rating: 5,
      text: "SportsTix made booking IPL tickets so easy! Got the best seats for the Mumbai Indians match. The whole experience was seamless from booking to entry.",
      event: "Mumbai Indians vs Chennai Super Kings",
      avatar: "👨‍💼"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Football Fan",
      location: "Bengaluru",
      rating: 5,
      text: "Amazing platform! Booked tickets for ISL finals and the prices were great. Customer support was super helpful when I needed to change my seats.",
      event: "ISL Finals 2024",
      avatar: "👩‍💻"
    },
    {
      id: 3,
      name: "Arjun Singh",
      role: "Sports Journalist",
      location: "Delhi",
      rating: 5,
      text: "As someone who covers sports events regularly, I appreciate how reliable SportsTix is. Never had any issues with tickets or last-minute bookings.",
      event: "Pro Kabaddi League",
      avatar: "👨‍📝"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      role: "Student",
      location: "Hyderabad",
      rating: 5,
      text: "Love the student discounts! Went to my first live cricket match with friends. The atmosphere was incredible and the booking process was super simple.",
      event: "India vs Australia ODI",
      avatar: "👩‍🎓"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in-bottom">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-sports bg-clip-text text-transparent">
            What Our Fans Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join millions of satisfied sports fans who trust us for their live sports experience
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main testimonial */}
          <div className="relative mb-12 animate-scale-in [animation-delay:200ms]">
            <Card className="border-0 bg-gradient-card shadow-floating overflow-hidden">
              <CardContent className="p-12 text-center relative">
                {/* Background decoration */}
                <div className="absolute top-8 left-8 opacity-10">
                  <Quote className="w-16 h-16 text-primary" />
                </div>
                <div className="absolute bottom-8 right-8 opacity-10 rotate-180">
                  <Quote className="w-16 h-16 text-primary" />
                </div>

                <div className="relative z-10">
                  {/* Avatar */}
                  <div className="text-6xl mb-6 animate-float">
                    {testimonials[currentTestimonial].avatar}
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-6 h-6 text-yellow-400 fill-current animate-wiggle" 
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <blockquote className="text-xl md:text-2xl text-foreground mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
                    "{testimonials[currentTestimonial].text}"
                  </blockquote>

                  {/* Author info */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-bold text-primary">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-muted-foreground">
                      {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                    </p>
                    <p className="text-sm text-muted-foreground italic">
                      Event: {testimonials[currentTestimonial].event}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background shadow-floating"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background shadow-floating"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Testimonial thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slide-in-bottom [animation-delay:600ms]">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.id}
                className={`cursor-pointer transition-all duration-500 hover:shadow-floating hover:-translate-y-1 ${
                  index === currentTestimonial 
                    ? "ring-2 ring-primary shadow-floating scale-105" 
                    : "opacity-60 hover:opacity-100"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{testimonial.avatar}</div>
                  <h5 className="font-semibold text-sm mb-1">{testimonial.name}</h5>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  <div className="flex justify-center mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-primary scale-125"
                    : "bg-muted hover:bg-muted-foreground"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;