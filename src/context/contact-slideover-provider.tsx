"use client";

import React, { createContext, useContext, useState } from "react";

interface ContactSlideOverContextType {
  isOpen: boolean;
  openContactSlideOver: () => void;
  closeContactSlideOver: () => void;
}

const ContactSlideOverContext = createContext<ContactSlideOverContextType | undefined>(undefined);

export function ContactSlideOverProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContactSlideOver = () => setIsOpen(true);
  const closeContactSlideOver = () => setIsOpen(false);

  return (
    <ContactSlideOverContext.Provider value={{ isOpen, openContactSlideOver, closeContactSlideOver }}>
      {children}
    </ContactSlideOverContext.Provider>
  );
}

export function useContactSlideOver() {
  const context = useContext(ContactSlideOverContext);
  if (context === undefined) {
    throw new Error("useContactSlideOver must be used within a ContactSlideOverProvider");
  }
  return context;
}
