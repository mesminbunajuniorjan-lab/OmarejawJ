import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[16px] text-sm font-bold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-mcdo-red text-white hover:opacity-90 shadow-mcdo",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-gray-200 text-gray-700 hover:border-mcdo-red hover:text-mcdo-red",
        secondary: "bg-[#F6F7FB] text-mcdo-red hover:bg-purple-50",
        ghost: "hover:bg-[#F6F7FB] hover:text-mcdo-red",
        link: "text-mcdo-red underline-offset-4 hover:underline",
        primary: "gradient-red text-white shadow-mcdo",
      },
      size: {
        default: "h-[56px] px-6",
        sm: "h-[48px] rounded-[14px] px-4",
        lg: "h-[64px] rounded-[20px] px-8 text-base",
        icon: "h-[56px] w-[56px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }