"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Bell, Compass } from "lucide-react"

interface PrayerTime {
  name: string
  time: string
  passed: boolean
  next?: boolean
}

interface City {
  name: string
  latitude: number
  longitude: number
  timezone: string
}

const kurdishCities: City[] = [
  { name: "هەولێر", latitude: 36.1911, longitude: 44.0093, timezone: "Asia/Baghdad" },
  { name: "سلێمانی", latitude: 35.5558, longitude: 45.4347, timezone: "Asia/Baghdad" },
  { name: "دهۆک", latitude: 36.8625, longitude: 42.9918, timezone: "Asia/Baghdad" },
  { name: "کەرکووک", latitude: 35.4681, longitude: 44.3922, timezone: "Asia/Baghdad" },
  { name: "زاخۆ", latitude: 37.1459, longitude: 42.6857, timezone: "Asia/Baghdad" },
  { name: "شەقڵاوە", latitude: 36.4056, longitude: 44.3408, timezone: "Asia/Baghdad" },
  { name: "کۆیە", latitude: 36.0833, longitude: 44.6333, timezone: "Asia/Baghdad" },
  { name: "رانیە", latitude: 36.2667, longitude: 44.8833, timezone: "Asia/Baghdad" },
  { name: "قەڵادزێ", latitude: 36.3667, longitude: 44.7333, timezone: "Asia/Baghdad" },
  { name: "چەمچەماڵ", latitude: 35.5167, longitude: 45.9167, timezone: "Asia/Baghdad" },
  { name: "کفری", latitude: 35.1167, longitude: 44.9667, timezone: "Asia/Baghdad" },
  { name: "خانەقین", latitude: 34.3667, longitude: 45.4, timezone: "Asia/Baghdad" },
  { name: "سنجار", latitude: 36.3167, longitude: 41.8667, timezone: "Asia/Baghdad" },
  { name: "شێخان", latitude: 36.7667, longitude: 43.3833, timezone: "Asia/Baghdad" },
  { name: "عەمادیە", latitude: 37.0833, longitude: 43.4833, timezone: "Asia/Baghdad" },
  { name: "سۆران", latitude: 36.65, longitude: 44.5333, timezone: "Asia/Baghdad" },
  { name: "پشدەر", latitude: 36.7167, longitude: 44.0167, timezone: "Asia/Baghdad" },
  { name: "مەخموور", latitude: 36.3167, longitude: 43.6, timezone: "Asia/Baghdad" },
  { name: "حەریر", latitude: 36.6, longitude: 44.2167, timezone: "Asia/Baghdad" },
  { name: "دیانا", latitude: 36.7833, longitude: 43.0833, timezone: "Asia/Baghdad" },
]

export function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedCity, setSelectedCity] = useState<City>(kurdishCities[0])
  const [timeToNext, setTimeToNext] = useState("")

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const calculatePrayerTimes = (city: City): PrayerTime[] => {
    const now = new Date()
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000)

    // Solar declination angle
    const declination = 23.45 * Math.sin((((360 * (284 + dayOfYear)) / 365) * Math.PI) / 180)

    // Convert latitude to radians
    const latRad = (city.latitude * Math.PI) / 180
    const declRad = (declination * Math.PI) / 180

    // Calculate sunrise and sunset times
    const hourAngle = Math.acos(-Math.tan(latRad) * Math.tan(declRad))
    const sunrise = 12 - (hourAngle * 180) / Math.PI / 15
    const sunset = 12 + (hourAngle * 180) / Math.PI / 15

    // Fajr: 18 degrees below horizon
    const fajrAngle = (18 * Math.PI) / 180
    const fajrHourAngle = Math.acos(
      (-Math.sin(fajrAngle) - Math.sin(latRad) * Math.sin(declRad)) / (Math.cos(latRad) * Math.cos(declRad)),
    )
    const fajr = 12 - (fajrHourAngle * 180) / Math.PI / 15

    // Isha: 17 degrees below horizon
    const ishaAngle = (17 * Math.PI) / 180
    const ishaHourAngle = Math.acos(
      (-Math.sin(ishaAngle) - Math.sin(latRad) * Math.sin(declRad)) / (Math.cos(latRad) * Math.cos(declRad)),
    )
    const isha = 12 + (ishaHourAngle * 180) / Math.PI / 15

    // Dhuhr: Solar noon + 1 minute
    const dhuhr = 12.0167

    // Asr: When shadow length = object length + shadow at noon
    const asrAngle = Math.atan(1 + Math.tan(Math.abs(latRad - declRad)))
    const asrHourAngle = Math.acos(
      (Math.sin(asrAngle) - Math.sin(latRad) * Math.sin(declRad)) / (Math.cos(latRad) * Math.cos(declRad)),
    )
    const asr = 12 + (asrHourAngle * 180) / Math.PI / 15

    // Maghrib: Sunset + 3 minutes
    const maghrib = sunset + 0.05

    // Convert decimal hours to HH:MM format
    const formatTime = (decimalHour: number): string => {
      const hours = Math.floor(decimalHour)
      const minutes = Math.round((decimalHour - hours) * 60)
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`
    }

    return [
      {
        name: "بەیانی (فەجر)",
        time: formatTime(fajr),
        passed: isTimePassed(formatTime(fajr)),
      },
      {
        name: "ڕۆژهەڵات",
        time: formatTime(sunrise),
        passed: isTimePassed(formatTime(sunrise)),
      },
      {
        name: "نیوەڕۆ (زوهر)",
        time: formatTime(dhuhr),
        passed: isTimePassed(formatTime(dhuhr)),
      },
      {
        name: "عەسر",
        time: formatTime(asr),
        passed: isTimePassed(formatTime(asr)),
      },
      {
        name: "مەغریب",
        time: formatTime(maghrib),
        passed: isTimePassed(formatTime(maghrib)),
      },
      {
        name: "عیشا",
        time: formatTime(isha),
        passed: isTimePassed(formatTime(isha)),
      },
    ]
  }

  const isTimePassed = (timeString: string): boolean => {
    const [hours, minutes] = timeString.split(":").map(Number)
    const prayerTime = new Date()
    prayerTime.setHours(hours, minutes, 0, 0)
    return currentTime > prayerTime
  }

  const prayerTimes = calculatePrayerTimes(selectedCity)

  // Find next prayer
  const nextPrayer = prayerTimes.find((prayer) => !prayer.passed) || prayerTimes[0]
  if (nextPrayer) {
    nextPrayer.next = true
  }

  // Calculate time remaining to next prayer
  useEffect(() => {
    if (nextPrayer) {
      const [hours, minutes] = nextPrayer.time.split(":").map(Number)
      const nextPrayerTime = new Date()
      nextPrayerTime.setHours(hours, minutes, 0, 0)

      // If prayer time has passed today, set it for tomorrow
      if (nextPrayerTime <= currentTime) {
        nextPrayerTime.setDate(nextPrayerTime.getDate() + 1)
      }

      const timeDiff = nextPrayerTime.getTime() - currentTime.getTime()
      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60))
      const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

      setTimeToNext(`${hoursLeft} کاتژمێر و ${minutesLeft} خولەک`)
    }
  }, [currentTime, nextPrayer])

  const calculateQiblaDirection = (city: City): number => {
    // Kaaba coordinates
    const kaabaLat = 21.4225
    const kaabaLng = 39.8262

    const lat1 = (city.latitude * Math.PI) / 180
    const lat2 = (kaabaLat * Math.PI) / 180
    const deltaLng = ((kaabaLng - city.longitude) * Math.PI) / 180

    const y = Math.sin(deltaLng) * Math.cos(lat2)
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng)

    let bearing = (Math.atan2(y, x) * 180) / Math.PI
    bearing = (bearing + 360) % 360

    return Math.round(bearing)
  }

  const qiblaDirection = calculateQiblaDirection(selectedCity)

  return (
    <div className="space-y-6">
      {/* City Selection */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <Select
                value={selectedCity.name}
                onValueChange={(value) => {
                  const city = kurdishCities.find((c) => c.name === value)
                  if (city) setSelectedCity(city)
                }}
              >
                <SelectTrigger className="w-48 bg-transparent border-none shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {kurdishCities.map((city) => (
                    <SelectItem key={city.name} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {currentTime.toLocaleTimeString("en-US", {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="text-xs text-muted-foreground">
                {currentTime.toLocaleDateString("ku", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Prayer Countdown */}
      {nextPrayer && (
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardHeader className="text-center pb-2">
            <CardTitle className="flex items-center justify-center gap-2 text-primary">
              <Clock className="h-6 w-6" />
              کاتی بانگی داهاتوو
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">{nextPrayer.name}</h3>
              <p className="text-xl mb-2">{nextPrayer.time}</p>
              <p className="text-sm text-muted-foreground">ماوە: {timeToNext}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Prayer Times */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>کاتەکانی بانگی ئەمڕۆ</span>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
              <Bell className="h-4 w-4" />
              ئاگادارکردنەوە
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {prayerTimes.map((prayer, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                  prayer.next
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : prayer.passed
                      ? "bg-muted/50 text-muted-foreground border-muted"
                      : "bg-card border-border hover:bg-accent/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      prayer.next ? "bg-primary-foreground" : prayer.passed ? "bg-muted-foreground" : "bg-primary"
                    }`}
                  />
                  <span className="font-semibold">{prayer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg">{prayer.time}</span>
                  {prayer.passed && (
                    <Badge variant="secondary" className="text-xs">
                      تەواو
                    </Badge>
                  )}
                  {prayer.next && <Badge className="text-xs bg-primary-foreground text-primary">داهاتوو</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Qibla Direction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            ئاراستەی قیبلە
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">لە {selectedCity.name}ەوە</p>
              <p className="text-2xl font-bold text-primary">{qiblaDirection}°</p>
              <p className="text-xs text-muted-foreground">
                {qiblaDirection >= 315 || qiblaDirection < 45
                  ? "باکوور"
                  : qiblaDirection >= 45 && qiblaDirection < 135
                    ? "ڕۆژهەڵات"
                    : qiblaDirection >= 135 && qiblaDirection < 225
                      ? "باشوور"
                      : "ڕۆژئاوا"}
              </p>
            </div>
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full"></div>
              <div className="absolute inset-2 border border-primary/40 rounded-full"></div>
              <div
                className="absolute top-1/2 left-1/2 w-1 h-8 bg-primary rounded-full origin-bottom transform -translate-x-1/2 -translate-y-full"
                style={{ transform: `translate(-50%, -100%) rotate(${qiblaDirection}deg)` }}
              ></div>
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-primary font-bold">ش</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
