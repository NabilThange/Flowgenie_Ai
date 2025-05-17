"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed pointer-events-none flex flex-col gap-y-2 p-4 sm:gap-y-3 md:w-[380px] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:zoom-out-95 data-[side=top]:top-0 data-[side=bottom]:bottom-0 data-[side=top]:translate-y-0 data-[side=bottom]:translate-y-0 right-0 z-[100]",
      className,
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "group relative flex flex-col gap-1 rounded-md bg-zinc-900 p-4 shadow-lg shadow-black/20 border border-zinc-800 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:zoom-out-95 overflow-hidden",
        className,
      )}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md text-zinc-500 opacity-0 transition-opacity hover:text-zinc-300 focus:shadow-none group-hover:opacity-100 data-[state=open]:bg-zinc-800",
      className,
    )}
    {...props}
  />
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold [&[data-swipe=move]>*]:transition-none text-zinc-100", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm text-zinc-500 [&[data-swipe=move]>*]:transition-none", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-transparent px-3 text-sm font-medium transition-colors focus:shadow-none hover:bg-zinc-800 disabled:pointer-events-none data-[state=open]:bg-zinc-800 [&:has([data-state=open])]:hover:bg-zinc-800 [&[data-swipe=move]>*]:transition-none text-zinc-100",
      className,
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction }

import { useToast as useToastOriginal } from "@/components/ui/use-toast"

export const useToast = useToastOriginal
