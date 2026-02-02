"use client"

import { Target, Sparkles, Video, User } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-16 sm:px-6 sm:pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-3xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Imkoniyatlar
          </h2>
          <p className="font-mono text-[11px] text-foreground/60 sm:text-sm md:text-base">
            / Biz nimalarni taklif qilamiz
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Target Reklama",
              description: `Meta (Instagram, Facebook) orqali aniq auditoriyaga "snayper" usulida reklamalarni yo'naltirish.`,
              direction: "top",
              Icon: Target,
            },
            {
              title: "AI & Kontent",
              description: "Sun'iy intellekt yordamida kreativ ssenariylar va vizual kontent yaratish. Vaqt va mablag' tejash.",
              direction: "right",
              Icon: Sparkles,
            },
            {
              title: "Professional Video",
              description:
                "Yuqori sifatli texnikalar yordamida Reels, intervyu va reklama roliklarini suratga olish (Production).",
              direction: "left",
              Icon: Video,
            },
            {
              title: "Shaxsiy Brend",
              description:
                "Blogerlar va ekspertlar uchun shaxsiy brendni rivojlantirish va obunachilar bazasini oshirish.",
              direction: "bottom",
              Icon: User,
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string; Icon: React.ComponentType<{ className?: string }> }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 bg-foreground/5 sm:h-9 sm:w-9">
          <service.Icon className="h-4 w-4 text-foreground" />
        </div>
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-lg font-light text-foreground sm:text-2xl md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-[11px] leading-relaxed text-foreground/80 sm:text-sm md:text-base">
        {service.description}
      </p>
    </div>
  )
}
