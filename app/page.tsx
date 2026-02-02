"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | null>(null)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const updateMatch = () => setIsDesktop(mediaQuery.matches)
    updateMatch()
    mediaQuery.addEventListener("change", updateMatch)
    return () => mediaQuery.removeEventListener("change", updateMatch)
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      if (isDesktop) {
        const sectionWidth = scrollContainerRef.current.offsetWidth
        scrollContainerRef.current.scrollTo({
          left: sectionWidth * index,
          behavior: "smooth",
        })
      } else {
        const sectionHeight = scrollContainerRef.current.offsetHeight
        scrollContainerRef.current.scrollTo({
          top: sectionHeight * index,
          behavior: "smooth",
        })
      }
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    if (!isDesktop) return
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection, isDesktop])

  useEffect(() => {
    if (!isDesktop) return
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest("[data-vertical-scroll]")) {
        return
      }
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection, isDesktop])

  useEffect(() => {
    if (!isDesktop) return
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = null
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = null
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current !== null) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection, isDesktop])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#0E7C61"
            colorB="#000000"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0E7C61"
            upColor="#0E7C61"
            downColor="#000000"
            leftColor="#5A5A5A"
            rightColor="#5A5A5A"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <span className="font-sans text-xl font-bold text-foreground">M</span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Media</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {["Bosh sahifa", "Ishlar", "Xizmatlar", "Tariflar", "Kontakt"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
          Bog'lanish
        </MagneticButton>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen flex-col overflow-y-auto overflow-x-hidden transition-opacity duration-700 md:flex-row md:overflow-x-auto md:overflow-y-hidden ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-full shrink-0 flex-col justify-end px-4 pb-14 pt-20 sm:px-6 sm:pt-24 md:w-screen md:px-12 md:pb-24">
          <div className="max-w-xl sm:max-w-2xl md:max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-3 py-1.5 backdrop-blur-md duration-700 sm:px-4">
              <p className="font-mono text-[10px] text-foreground/90 sm:text-xs">
                Biznesingizni keyingi bosqichga olib chiqing
              </p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-3xl font-bold leading-[1.1] tracking-tight text-foreground duration-1000 sm:text-5xl md:text-7xl lg:text-8xl">
              <span className="text-balance">O&#39;zbekistondagi professional smm agentligi</span>
            </h1>
            <p className="mb-8 max-w-[42ch] animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/90 duration-1000 delay-200 sm:text-lg md:max-w-[48ch] md:text-xl">
              <span className="text-pretty">
                Biz shunchaki SMM agentlik emasmiz. Biz — sun&#39;iy intellekt (AI) va professional video production
                yordamida brendingizni millionlarga tanitamiz.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton size="lg" variant="primary" className="w-full sm:w-auto" onClick={() => scrollToSection(3)}>
                Batafsil
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" className="w-full sm:w-auto" onClick={() => scrollToSection(2)}>
                Xizmatlarni ko'rish
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Pastga tushib ko'ring</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection />
        <ServicesSection />
        <section className="flex min-h-screen w-full shrink-0 snap-start items-start px-4 pt-16 sm:px-6 sm:pt-20 md:h-screen md:w-screen md:items-center md:px-12 md:pt-0 lg:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-10 transition-all duration-700 md:mb-16">
              <h2 className="mb-2 font-sans text-3xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
                Maxsus Tariflar
              </h2>
              <p className="font-mono text-[11px] text-foreground/60 sm:text-sm md:text-base">
                O'z biznesingizga mos tarifni tanlang va bugunoq o'sishni boshlang.
              </p>
            </div>

            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Silver",
                  subtitle: "Boshlang'ich biznes uchun",
                  price: "$500/oy",
                  items: [
                    "Instagram & Telegram",
                    "Oyiga 10 ta post",
                    "Grafik dizayn",
                    "Target reklama sozlash",
                    "Oylik hisobot",
                  ],
                },
                {
                  title: "Gold",
                  subtitle: "Ko'plab kompaniyalar tanlovi",
                  price: "$1000/oy",
                  items: [
                    "Instagram, TG, YouTube",
                    "Oyiga 14 ta post",
                    "AI Kontent yaratish",
                    "Professional kopirayting",
                    "Chat-bot o'rnatish",
                  ],
                  featured: true,
                },
                {
                  title: "Premium",
                  subtitle: "To'liq media qamrovi",
                  price: "$1500/oy",
                  items: [
                    "Barcha ijtimoiy tarmoqlar",
                    "20 ta Video (Reels)",
                    "Professional s'yomka",
                    "Chat-bot o'rnatish",
                    "AI kontent",
                    "Shaxsiy menejer 24/7",
                  ],
                },
              ].map((plan) => (
                <div
                  key={plan.title}
                  className={`group relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/4 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.45)] transition-all duration-300 sm:p-6 ${
                    plan.featured ? "border-foreground/40 bg-foreground/6" : ""
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent/60 via-foreground/20 to-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-5 flex items-start justify-between">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">{plan.title}</p>
                      <h3 className="mt-3 text-base font-light text-foreground sm:text-2xl">{plan.subtitle}</h3>
                    </div>
                    {plan.featured && (
                      <span className="rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/80">
                        Tavsiya
                      </span>
                    )}
                  </div>
                  <div className="mb-5 flex items-end justify-between">
                    <p className="select-none text-xl font-semibold text-foreground blur-sm sm:text-3xl">
                      {plan.price}
                    </p>
                    <span className="text-xs text-foreground/50">oylik</span>
                  </div>
                  <div className="h-px w-full bg-foreground/10" />
                  <ul className="mt-4 space-y-2 text-[11px] text-foreground/80 sm:text-sm">
                    {plan.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ContactSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
