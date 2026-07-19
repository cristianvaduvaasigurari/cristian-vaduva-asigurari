"use client";

import * as React from "react";
import { Button, ButtonProps } from "./button";
import { trackConversion } from "@/lib/analytics";

export interface CTAButtonProps extends ButtonProps {
  conversionEvent: string;
}

export const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ conversionEvent, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      trackConversion(conversionEvent);
      if (onClick) {
        onClick(e);
      }
    };

    return <Button ref={ref} onClick={handleClick} {...props} />;
  }
);

CTAButton.displayName = "CTAButton";
