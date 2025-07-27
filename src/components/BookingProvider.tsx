import React, { createContext, useContext, useState } from "react";

interface Event {
  id: number;
  title: string;
  subtitle?: string;
  teams?: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  originalPrice?: string;
  category: string;
  rating?: number;
  attendance?: string;
  image?: string;
}

interface BookingContextType {
  openBookingModal: (event: Event) => void;
  isBookingOpen: boolean;
  selectedEvent: Event | null;
  closeBookingModal: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const openBookingModal = (event: Event) => {
    setSelectedEvent(event);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setSelectedEvent(null);
  };

  return (
    <BookingContext.Provider value={{
      openBookingModal,
      isBookingOpen,
      selectedEvent,
      closeBookingModal
    }}>
      {children}
    </BookingContext.Provider>
  );
};