"use client"

import { APPLICATION_DATES } from "@/lib/constants"
import { useEffect, useState, useMemo } from "react"

const formatDateNorwegian = (date: Date) =>
  date.toLocaleDateString("nb-NO", { day: "numeric", month: "long" })

export function DeadlineCountdown() {
  const [now, setNow] = useState(() => new Date())

  // Update current time every hour
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000 * 60 * 60)
    return () => clearInterval(interval)
  }, [])

  const nextApplicationDate = useMemo(() => {
    const currentYear = now.getFullYear()

    const nextDateThisYear = APPLICATION_DATES
      .map(({ month, day }) => new Date(currentYear, month, day))
      .find((date) => date > now)

    return nextDateThisYear ?? new Date(currentYear + 1, APPLICATION_DATES[0].month, APPLICATION_DATES[0].day)
  }, [now])

  const daysRemaining = useMemo(() => {
    return Math.ceil((nextApplicationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  }, [now, nextApplicationDate])

  return (
    <div className="border-t border-gray-700 pt-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-100">Neste søknadsfrist</h3>
        <p className="text-3xl sm:text-4xl font-bold text-onlineyellow">
          {formatDateNorwegian(nextApplicationDate)}
        </p>
        <p className="text-gray-300">
          ({daysRemaining} {daysRemaining === 1 ? "dag" : "dager"})
        </p>
      </div>
    </div>
  )
}
