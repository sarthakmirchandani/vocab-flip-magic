
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useEffect, useRef } from "react"

export function Toaster() {
  const { toasts } = useToast()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("/notification-sound.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    // Play sound when a new toast appears
    if (toasts.length > 0 && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.log("Error playing notification sound:", err)
      })
    }
  }, [toasts.length])

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="bg-black text-white border-gray-700">
            <div className="grid gap-1">
              {title && <ToastTitle className="text-white">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-gray-300">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-white hover:text-gray-300" />
          </Toast>
        )
      })}
      <ToastViewport className="bottom-0 top-auto" />
    </ToastProvider>
  )
}
