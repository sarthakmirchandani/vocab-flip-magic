
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { useEffect, useRef } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const previousToastsCountRef = useRef(0)

  useEffect(() => {
    audioRef.current = new Audio("/notification-sound.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current = null
      }
    }
  }, [])

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-center"
      onToastAdd={() => {
        if (audioRef.current) {
          audioRef.current.play().catch(err => {
            console.log("Error playing notification sound:", err)
          })
        }
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-black group-[.toaster]:text-white group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-300",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
