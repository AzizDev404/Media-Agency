"use client"

import { Mail, MapPin } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return
    }

    setIsSubmitting(true)

    const subject = `Yangi xabar: ${formData.name}`
    const body = `Ism: ${formData.name}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\n\nXabar:\n${formData.message}`
    const mailto = `mailto:abuishoq30@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", email: "", phone: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-full shrink-0 snap-start items-start px-4 pt-16 sm:pt-20 md:h-screen md:w-screen md:items-center md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-3xl font-light leading-[1.05] tracking-tight text-foreground sm:text-4xl md:mb-3 md:text-7xl lg:text-8xl">
                Keling
                <br />
                gaplashamiz
              </h2>
              <p className="font-mono text-[11px] text-foreground/60 sm:text-xs md:text-base">/ Bog'lanish</p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <a
                href="mailto:hello@studio.com"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">Elektron pochta</span>
                </div>
                <p className="text-sm text-foreground transition-colors group-hover:text-foreground/70 sm:text-base md:text-2xl">
                  abuishoq30@gmail.com
                </p>
              </a>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">Manzil</span>
                </div>
                <p className="text-sm text-foreground sm:text-base md:text-2xl">Toshkent, O'zbekiston</p>
              </div>

              <div
                className={`flex gap-2 pt-2 transition-all duration-700 md:pt-4 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {[
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/suxrob_agency?igsh=MXh6cXUzeWhvZDY3ag%3D%3D&utm_source=qr",
                  },
                  { label: "Telegram", href: "https://t.me/suxrob_aimedia" },
                  { label: "YouTube", href: "https://youtube.com/@mr.avrangzeb?si=9OzIfC_pjIBu2en5" },
                ].map((social, i) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Minimal form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <label className="mb-1 block font-mono text-[11px] text-foreground/60 sm:text-xs md:mb-2">Ism</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-xs text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none sm:text-sm md:py-2 md:text-base"
                  placeholder="Ismingiz"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <label className="mb-1 block font-mono text-[11px] text-foreground/60 sm:text-xs md:mb-2">
                  Elektron pochta
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-xs text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none sm:text-sm md:py-2 md:text-base"
                  placeholder="siz@email.com"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <label className="mb-1 block font-mono text-[11px] text-foreground/60 sm:text-xs md:mb-2">
                  Telefon raqami
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-xs text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none sm:text-sm md:py-2 md:text-base"
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "650ms" }}
              >
                <label className="mb-1 block font-mono text-[11px] text-foreground/60 sm:text-xs md:mb-2">Xabar</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-xs text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none sm:text-sm md:py-2 md:text-base"
                  placeholder="Loyihangiz haqida yozing..."
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "800ms" }}
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full disabled:opacity-50"
                  onClick={isSubmitting ? undefined : undefined}
                >
                  {isSubmitting ? "Yuborilmoqda..." : "Xabar yuborish"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-xs text-foreground/80 sm:text-sm">
                    Xabar muvaffaqiyatli yuborildi!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
