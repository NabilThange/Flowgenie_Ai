"use client"

import { useToast as useToastOriginal } from "@/components/ui/toast"

export const useToast = useToastOriginal

// Re-export for convenience when not using the hook
export const toast = (props: Parameters<ReturnType<typeof useToastOriginal>["toast"]>[0]) => {
  // This is a bit of a hack, but it allows us to use toast outside of React components
  const toastFn = (window as any).__TOAST_FUNCTION__

  if (toastFn) {
    toastFn(props)
  } else {
    console.warn("Toast function not available. Make sure to use the ToastProvider.")
    // Fallback to console
    if (props.variant === "destructive") {
      console.error(`${props.title}: ${props.description}`)
    } else {
      console.log(`${props.title}: ${props.description}`)
    }
  }
}
