"use client"

import { useReveal } from "@/hooks/use-reveal"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-full shrink-0 snap-start items-start px-4 pt-16 sm:px-6 sm:pt-20 md:h-screen md:w-screen md:items-center md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Tanlangan ishlar
          </h2>
          <p className="font-mono text-xs text-foreground/60 sm:text-sm md:text-base">/ So'nggi loyihalar</p>
        </div>

        <div
          data-vertical-scroll
          className="space-y-6 overflow-visible pr-0 md:h-106 md:space-y-8 md:overflow-y-auto md:pr-2"
        >
          {[
            {
              number: "01",
              title: "Fan va Texnologiyalar Universiteti",
              category:
                "Universitet marketing bo'limida 1 yil davomida samarali strategiya qo'lladik. Natija kutilmalardan oshdi.",
              year: "1,600+ jalb qilingan talaba • 1 yil hamkorlik",
              direction: "left",
            },
            {
              number: "02",
              title: "O'zbekiston Teleradiokompaniyasi",
              category: "O'zbekiston teleradiokompaniyasiga suniy intellekt orqali anonslarni tayyorladik",
              year: "2023",
              direction: "right",
            },
            {
              number: "03",
              title: "O'zbekiston 24",
              category: "O'zbekiston 24 telekanali uchun axborot videolarini motion grafika orqali tayyorladik",
              year: "2023",
              direction: "left",
            },
            {
              number: "04",
              title: "Ustoz Akademiyasi",
              category:
                "Ustoz Akademiyasi o'quv markazi uchun Instagram va Facebook ijtimoiy tarmoqlari uchun video kontent orqali o'quvchilar sonini oshirishga hissa qo'shdik",
              year: "2024",
              direction: "right",
            },
            {
              number: "05",
              title: "Ilm Akademiyasi",
              category:
                "Ilm Akademiyasi o'quv markazi uchun Instagram va Facebook ijtimoiy tarmoqlari uchun video kontent orqali o'quvchilar sonini oshirishga hissa qo'shdik",
              year: "2025-yil",
              direction: "left",
            },
            {
              number: "06",
              title: "Mumtaz Center",
              category: "Instagram va Facebook yordamida brendni rivojlantirishga yordam berdik",
              year: "2025 yil",
              direction: "right",
            },
            {
              number: "07",
              title: "Muallim Media",
              category: "Motion va grafik dizayn orqali YouTube sahifasini rivojlantirdik",
              year: "2022 yil",
              direction: "left",
            },
            {
              number: "08",
              title: "Himagro",
              category:
                "Germaniyadan urug'larni olib kiruvchi Himagro kompaniyasiga shaxsiy brendini rivojlantirib berdik",
              year: "2022 yil",
              direction: "right",
            },
            {
              number: "09",
              title: "Solar Space",
              category:
                "Xitoy investorlari bilan Toshkentda Solar Space quyosh panellarini ijtimoiy tarmoq orqali sotishga hissa qo'shdik",
              year: "2025 yil",
              direction: "left",
            },
            {
              number: "10",
              title: "Guli Turaeva (Psixoterapevt)",
              category: "Ijtimoiy tarmoq orqali shaxsiy brendini rivojlantirishga hissa qo'shdik",
              year: "2023 yil",
              direction: "right",
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: { number: string; title: string; category: string; year: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex min-h-22 items-center justify-between border-b border-foreground/10 py-5 transition-all duration-700 hover:border-foreground/20 md:min-h-26 md:py-8 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: index % 2 === 0 ? "0" : "auto",
        maxWidth: index % 2 === 0 ? "85%" : "90%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8">
        <span className="font-mono text-xs text-foreground/30 transition-colors group-hover:text-foreground/50 sm:text-sm md:text-base">
          {project.number}
        </span>
        <div>
          <h3 className="mb-1 font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl md:text-3xl lg:text-4xl">
            {project.title}
          </h3>
          <p className="max-w-[48ch] font-mono text-[11px] text-foreground/50 sm:text-xs md:text-sm">
            {project.category}
          </p>
        </div>
      </div>
    </div>
  )
}
