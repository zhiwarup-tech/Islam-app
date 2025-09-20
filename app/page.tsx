"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Heart, RotateCcw, ArrowLeft, Clock, Sparkles } from "lucide-react"
import { PrayerTimes } from "@/components/prayer-times"
import { QuranSection } from "@/components/quran-section"
import { DuasSection } from "@/components/duas-section"
import { TasbihSection } from "@/components/tasbih-section"

export default function IslamicApp() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentView, setCurrentView] = useState<"home" | "prayer-times" | "quran" | "duas" | "tasbih" | "guidance">(
    "home",
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Show loading for 3 seconds

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen islamic-gradient flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-primary/30 rounded-full float-animation"></div>
          <div
            className="absolute top-40 right-32 w-1 h-1 bg-accent/40 rounded-full float-animation"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-primary/20 rounded-full float-animation"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/3 right-20 w-1 h-1 bg-accent/30 rounded-full float-animation"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="text-center space-y-8 p-8 glass-card rounded-3xl max-w-md mx-4 pulse-glow">
          {/* Mosque Image */}
          <div className="relative mx-auto w-56 h-56 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl"></div>
            <img
              src="/beautiful-islamic-mosque-silhouette-at-sunset-with.jpg"
              alt="مزگەوت"
              className="relative w-full h-full object-contain rounded-full shadow-2xl border-4 border-primary/20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-full"></div>
          </div>

          {/* Loading Text */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                بەرنامەی ئیسلامی
              </h1>
              <Sparkles className="h-6 w-6 text-accent animate-pulse" />
            </div>
            <p className="text-xl text-foreground/80 font-medium">بە ناوی خوای گەورە و بەزەیی</p>

            {/* Loading Animation */}
            <div className="flex justify-center items-center space-x-3 rtl:space-x-reverse">
              <div className="w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full animate-bounce"></div>
              <div
                className="w-4 h-4 bg-gradient-to-r from-accent to-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-4 h-4 bg-gradient-to-r from-primary to-accent rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>

            <p className="text-base text-foreground/60 font-medium">چاوەڕوان بە...</p>
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "prayer-times":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentView("home")}
                className="flex items-center gap-2 hover:bg-primary/10 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                گەڕانەوە
              </Button>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                کاتەکانی بانگ
              </h2>
            </div>
            <PrayerTimes />
          </div>
        )
      case "quran":
        return <QuranSection onBack={() => setCurrentView("home")} />
      case "duas":
        return <DuasSection onBack={() => setCurrentView("home")} />
      case "tasbih":
        return <TasbihSection onBack={() => setCurrentView("home")} />
      case "home":
      default:
        return (
          <div className="space-y-8">
            <Card className="glass-card border-primary/20 prayer-glow overflow-hidden relative">
              <div className="absolute inset-0 islamic-gradient"></div>
              <CardContent className="relative p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    بەخێربێیت بۆ بەرنامەی ئیسلامی
                  </h2>
                  <Sparkles className="h-8 w-8 text-accent animate-pulse" />
                </div>
                <Button
                  onClick={() => setCurrentView("prayer-times")}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Clock className="h-5 w-5 mr-2" />
                  بینینی کاتەکانی بانگ
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card
                className="hover:shadow-2xl transition-all duration-500 cursor-pointer group glass-card border-primary/10 hover:border-primary/30 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setCurrentView("prayer-times")}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 group-hover:scale-110">
                    <Clock className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    کاتەکانی بانگ
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    کاتی نوێژەکان و ئاراستەی قیبلە
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-2xl transition-all duration-500 cursor-pointer group glass-card border-primary/10 hover:border-primary/30 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setCurrentView("quran")}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 group-hover:scale-110">
                    <BookOpen className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    قورئانی پیرۆز
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    تەواوی سورەتەکانی قورئان
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-2xl transition-all duration-500 cursor-pointer group glass-card border-primary/10 hover:border-primary/30 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setCurrentView("duas")}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 group-hover:scale-110">
                    <Heart className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    دووعاکان
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    دووعاکانی ڕۆژانە و تایبەت
                  </p>
                </CardContent>
              </Card>

              <Card
                className="hover:shadow-2xl transition-all duration-500 cursor-pointer group glass-card border-primary/10 hover:border-primary/30 transform hover:scale-105 hover:-translate-y-2"
                onClick={() => setCurrentView("tasbih")}
              >
                <CardContent className="p-8 text-center">
                  <div className="bg-gradient-to-br from-primary/20 to-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300 group-hover:scale-110">
                    <RotateCcw className="h-10 w-10 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    تەسبیحات
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                    ژمێردنی تەسبیح و زیکر
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  کردارە خێراکان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    variant="outline"
                    className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:from-primary/20 hover:to-accent/20 transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-xl"
                    onClick={() => setCurrentView("tasbih")}
                  >
                    <RotateCcw className="h-5 w-5" />
                    دەستکردی تەسبیح
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:from-primary/20 hover:to-accent/20 transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-xl"
                    onClick={() => setCurrentView("quran")}
                  >
                    <BookOpen className="h-5 w-5" />
                    سورەتی یاسین
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:from-primary/20 hover:to-accent/20 transition-all duration-300 transform hover:scale-105 px-6 py-3 rounded-xl"
                    onClick={() => setCurrentView("duas")}
                  >
                    <Heart className="h-5 w-5" />
                    دووعای بەیانی
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 islamic-gradient"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-1 h-1 bg-primary/20 rounded-full float-animation"></div>
        <div
          className="absolute top-40 right-32 w-0.5 h-0.5 bg-accent/30 rounded-full float-animation"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-1 h-1 bg-primary/15 rounded-full float-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 right-20 w-0.5 h-0.5 bg-accent/25 rounded-full float-animation"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <header className="relative glass-card border-b border-primary/20 p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="h-7 w-7 text-primary animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              بەرنامەی ئیسلامی
            </h1>
            <Sparkles className="h-7 w-7 text-accent animate-pulse" />
          </div>
          <p className="text-center text-base text-foreground/70 font-medium">
            کاتەکانی بانگ • قورئان • دووعا • تەسبیح
          </p>
        </div>
      </header>

      <main className="relative max-w-4xl mx-auto p-6">{renderCurrentView()}</main>

      <footer className="relative glass-card border-t border-primary/20 mt-16 p-8 text-center">
        <p className="text-foreground/60 text-base font-medium">بەرنامەی ئیسلامی بۆ کوردان • دروستکراو بە خۆشەویستی</p>
      </footer>
    </div>
  )
}
