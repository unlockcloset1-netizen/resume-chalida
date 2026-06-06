"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { Language } from "@/lib/data";
interface LanguageContextType { language: Language; setLanguage: (lang: Language) => void; }
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("th");
  useEffect(() => { const saved = localStorage.getItem("resume-lang") as Language; if (saved && ["th", "en", "zh"].includes(saved)) setLanguage(saved); }, []);
  const handleSetLanguage = (lang: Language) => { setLanguage(lang); localStorage.setItem("resume-lang", lang); };
  return ( <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}> {children} </LanguageContext.Provider> );
}
export function useLanguage() { const context = useContext(LanguageContext); if (context === undefined) throw new Error("useLanguage must be used within a LanguageProvider"); return context; }