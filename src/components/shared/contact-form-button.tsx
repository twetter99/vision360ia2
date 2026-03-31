'use client';

import * as React from 'react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { useContactSlideOver } from '@/context/contact-slideover-provider';

export function ContactFormButton({ onClick, type = 'button', ...props }: ButtonProps) {
  const { openContactSlideOver } = useContactSlideOver();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      openContactSlideOver();
    }
  };

  return <Button {...props} type={type} onClick={handleClick} />;
}