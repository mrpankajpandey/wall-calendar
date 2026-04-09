"use client"

import Image from "next/image"
import { MONTH_IMAGES, MONTHS } from "@/constants/calendar"

interface HeroImageProps {
  month: number
  year: number
}


const HeroImage = ({ month, year }: HeroImageProps) => {
  const imageUrl = MONTH_IMAGES[month]
  const monthName = MONTHS[month]

  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
      {/* Background photo */}
      <Image
        src={imageUrl}
        alt={`${monthName} ${year}`}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover transition-all duration-700 ease-in-out"
        priority
      />

      {/* Blue geometric wave overlay — mimics the reference image */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: "80px" }}
        >
          {/* Left blue triangle */}
          <polygon points="0,80 0,30 160,80" fill="#1a9fd4" />
          {/* Right blue triangle */}
          <polygon points="400,80 400,30 240,80" fill="#1a9fd4" />
          {/* Center white peak (the "V" notch) */}
          <polygon points="160,80 200,45 240,80" fill="white" />
        </svg>

        {/* Month & Year label — sits on the right blue area */}
        <div
          className="absolute bottom-0 right-0 text-right pr-5 pb-2"
          style={{ color: "white" }}
        >
          <div className="text-3xl font-black tracking-tight leading-none">
            {year}
          </div>
          <div
            className="text-4xl font-black tracking-widest uppercase leading-none"
            style={{ letterSpacing: "0.15em" }}
          >
            {monthName}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroImage