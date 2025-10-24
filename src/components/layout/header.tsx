'use client';

import Link from 'next/link';
import { Menu, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navigationLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const CataloniaFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="14"
    viewBox="0 0 9 6"
    className="mr-2"
  >
    <rect fill="#FCDD09" width="9" height="6" />
    <path stroke="#DA121A" strokeWidth="0.6" d="M0 1.2h9M0 2.4h9M0 3.6h9M0 4.8h9" />
  </svg>
);

const BasqueCountryFlag = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="14"
    viewBox="0 0 100 60"
    className="mr-2"
  >
    <rect width="100" height="60" fill="#da2128" />
    <path d="M0,0 100,60M0,60 100,0" stroke="#009b48" strokeWidth="12" />
    <path d="M50,0V60 M0,30H100" stroke="#fff" strokeWidth="12" />
  </svg>
);

const SpainFlag = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="14" 
    viewBox="0 0 750 500"
    className="mr-2"
  >
    <rect width="750" height="500" fill="#c60b1e"/>
    <rect width="750" height="250" y="125" fill="#ffc400"/>
  </svg>
);

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-border/60 bg-background/80 backdrop-blur-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold text-primary">
            Vision360ia
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Cambiar idioma</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="flex items-center">
                <SpainFlag />
                Castellano
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <CataloniaFlag />
                Catalan
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center">
                <BasqueCountryFlag />
                Euskera
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="hidden md:flex">
            Iniciar Sesión
          </Button>
          <Button className="hidden bg-accent text-accent-foreground hover:bg-accent/90 md:flex">
            Pedir Presupuesto
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir Menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 pt-10">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-4">
                  <Button variant="outline">Iniciar Sesión</Button>
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Pedir Presupuesto</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}