"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Users, Droplets, BookOpen, Play, ChevronRight, CheckCircle } from "lucide-react"

interface PrayerStep {
  id: number
  title: string
  description: string
  arabic?: string
  kurdish?: string
  position: string
}

interface PrayerType {
  id: string
  name: string
  rakats: number
  time: string
  description: string
}

const prayerTypes: PrayerType[] = [
  {
    id: "fajr",
    name: "نوێژی بەیانی",
    rakats: 2,
    time: "لە بەرەبەیان تا ڕۆژهەڵات",
    description: "یەکەم نوێژی ڕۆژ کە دوو رەکعەتە",
  },
  {
    id: "dhuhr",
    name: "نوێژی نیوەڕۆ",
    rakats: 4,
    time: "دوای نیوەڕۆ",
    description: "چوار رەکعەتی فەرزە",
  },
  {
    id: "asr",
    name: "نوێژی عەسر",
    rakats: 4,
    time: "لە دوای نیوەڕۆ تا ئاوابوونی خۆر",
    description: "چوار رەکعەتی فەرزە",
  },
  {
    id: "maghrib",
    name: "نوێژی مەغریب",
    rakats: 3,
    time: "دوای ئاوابوونی خۆر",
    description: "سێ رەکعەتی فەرزە",
  },
  {
    id: "isha",
    name: "نوێژی عیشا",
    rakats: 4,
    time: "دوای نەمانی ڕووناکی ئاسمان",
    description: "چوار رەکعەتی فەرزە",
  },
]

const wuduSteps: PrayerStep[] = [
  {
    id: 1,
    title: "نیەت",
    description: "نیەتی دەستپاکی بکە",
    arabic: "نَوَيْتُ أَنْ أَتَوَضَّأَ لِلصَّلاةِ",
    kurdish: "نیەتم کرد دەستپاکی بکەم بۆ نوێژ",
    position: "بە دڵەوە",
  },
  {
    id: 2,
    title: "بیسمیلاه",
    description: "بیسمیلاه بڵێ",
    arabic: "بِسْمِ اللَّهِ",
    kurdish: "بە ناوی خوا",
    position: "بە دەنگەوە",
  },
  {
    id: 3,
    title: "شوشتنی دەست",
    description: "هەردوو دەست تا مەچەک سێ جار بشۆ",
    position: "دەستەکان",
  },
  {
    id: 4,
    title: "مەضمەضە",
    description: "دەم سێ جار بشۆ",
    position: "دەم",
  },
  {
    id: 5,
    title: "استنشاق",
    description: "لووت سێ جار بشۆ",
    position: "لووت",
  },
  {
    id: 6,
    title: "شوشتنی ڕوو",
    description: "ڕوو سێ جار بشۆ",
    position: "ڕوو",
  },
  {
    id: 7,
    title: "شوشتنی دەست",
    description: "دەستی ڕاست و چەپ تا ئەژنۆ سێ جار بشۆ",
    position: "دەستەکان تا ئەژنۆ",
  },
  {
    id: 8,
    title: "مەسحی سەر",
    description: "بە دەستی تەڕ سەر مەسح بکە",
    position: "سەر",
  },
  {
    id: 9,
    title: "مەسحی گوێ",
    description: "ناوەوە و دەرەوەی گوێ مەسح بکە",
    position: "گوێکان",
  },
  {
    id: 10,
    title: "شوشتنی پێ",
    description: "پێی ڕاست و چەپ تا قولنگ سێ جار بشۆ",
    position: "پێکان",
  },
]

const prayerSteps: PrayerStep[] = [
  {
    id: 1,
    title: "نیەت و تەکبیرەتول ئیحرام",
    description: "بەرەو قیبلە ڕابوەستە و نیەتی نوێژ بکە",
    arabic: "اللَّهُ أَكْبَرُ",
    kurdish: "خوا گەورەترە",
    position: "ڕاوەستاو",
  },
  {
    id: 2,
    title: "دووعای ثەنا",
    description: "دووعای ثەنا بخوێنەوە",
    arabic: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ",
    kurdish: "پاکیت ئەی خوا و بە ستایشتەوە، بەرەکەتدارە ناوت و بەرزە شکۆمەندیت و هیچ خوایەک نییە جگە لە تۆ",
    position: "ڕاوەستاو",
  },
  {
    id: 3,
    title: "سورەتی فاتیحە",
    description: "سورەتی فاتیحە بخوێنەوە",
    arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ...",
    kurdish: "ستایش بۆ خوای گەورە کە پەروەردگاری جیهانیانە...",
    position: "ڕاوەستاو",
  },
  {
    id: 4,
    title: "سورەتێکی تر",
    description: "سورەتێکی تری قورئان بخوێنەوە",
    position: "ڕاوەستاو",
  },
  {
    id: 5,
    title: "رووکوع",
    description: "ئەڵڵاهو ئەکبەر بڵێ و رووکوع بکە",
    arabic: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
    kurdish: "پاکە پەروەردگاری گەورەم",
    position: "رووکوع",
  },
  {
    id: 6,
    title: "هەستانەوە لە رووکوع",
    description: "لە رووکوع هەستەوە",
    arabic: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ رَبَّنَا وَلَكَ الْحَمْدُ",
    kurdish: "خوا گوێی لە کەسێک گرت کە ستایشی کرد، پەروەردگارمان ستایش بۆ تۆیە",
    position: "ڕاوەستاو",
  },
  {
    id: 7,
    title: "سەجدە",
    description: "ئەڵڵاهو ئەکبەر بڵێ و سەجدە بکە",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    kurdish: "پاکە پەروەردگاری بەرزم",
    position: "سەجدە",
  },
  {
    id: 8,
    title: "دانیشتن لە نێوان دوو سەجدە",
    description: "لە سەجدە هەستە و کەمێک دابنیشە",
    arabic: "رَبِّ اغْفِرْ لِي",
    kurdish: "پەروەردگارم لێم خۆشبە",
    position: "دانیشتوو",
  },
  {
    id: 9,
    title: "سەجدەی دووەم",
    description: "دووبارە سەجدە بکە",
    arabic: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
    kurdish: "پاکە پەروەردگاری بەرزم",
    position: "سەجدە",
  },
  {
    id: 10,
    title: "تەشەههود",
    description: "لە رەکعەتی کۆتاییدا تەشەههود بخوێنەوە",
    arabic: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ...",
    kurdish: "ڕێزگرتنەکان بۆ خوان و نوێژەکان و چاکەکان...",
    position: "دانیشتوو",
  },
  {
    id: 11,
    title: "سەلام",
    description: "بە سەلام نوێژ تەواو بکە",
    arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ",
    kurdish: "سەلام لەسەرتان و ڕەحمەتی خوا",
    position: "ڕاست و چەپ",
  },
]

interface PrayerGuidanceProps {
  onBack: () => void
}

export function PrayerGuidance({ onBack }: PrayerGuidanceProps) {
  const [selectedPrayer, setSelectedPrayer] = useState<PrayerType | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const handleStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    if (currentStep < prayerSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const resetProgress = () => {
    setCurrentStep(0)
    setCompletedSteps([])
  }

  if (selectedPrayer) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setSelectedPrayer(null)} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            گەڕانەوە بۆ لیست
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{selectedPrayer.name}</h2>
            <p className="text-muted-foreground">{selectedPrayer.rakats} رەکعەت</p>
          </div>
        </div>

        {/* Prayer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              زانیاری نوێژ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">{selectedPrayer.rakats}</div>
                <div className="text-sm text-muted-foreground">رەکعەت</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-lg font-semibold text-primary">فەرز</div>
                <div className="text-sm text-muted-foreground">جۆری نوێژ</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-sm font-semibold text-primary">{selectedPrayer.time}</div>
                <div className="text-sm text-muted-foreground">کاتی نوێژ</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step-by-step Guide */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>ڕێنمایی هەنگاو بە هەنگاو</span>
              <Button variant="outline" size="sm" onClick={resetProgress}>
                دووبارە دەستپێکردنەوە
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prayerSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    index === currentStep
                      ? "bg-primary/10 border-primary"
                      : completedSteps.includes(step.id)
                        ? "bg-green-50 border-green-200"
                        : "bg-card border-border"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        completedSteps.includes(step.id)
                          ? "bg-green-500 text-white"
                          : index === currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {completedSteps.includes(step.id) ? <CheckCircle className="h-4 w-4" /> : step.id}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <Badge variant="outline" className="text-xs mb-2">
                        {step.position}
                      </Badge>
                      {step.arabic && (
                        <div className="mt-3 p-3 bg-background rounded border">
                          <p className="text-lg font-arabic mb-1" dir="rtl">
                            {step.arabic}
                          </p>
                          {step.kurdish && <p className="text-sm text-muted-foreground">{step.kurdish}</p>}
                        </div>
                      )}
                      {index === currentStep && !completedSteps.includes(step.id) && (
                        <Button
                          size="sm"
                          className="mt-3"
                          onClick={() => handleStepComplete(step.id)}
                        >
                          تەواو کرا
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          گەڕانەوە
        </Button>
        <h2 className="text-2xl font-bold">ڕێنمایی نوێژ</h2>
      </div>

      <Tabs defaultValue="prayers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="prayers">نوێژەکان</TabsTrigger>
          <TabsTrigger value="wudu">دەستپاکی</TabsTrigger>
          <TabsTrigger value="basics">بنەڕەتەکان</TabsTrigger>
        </TabsList>

        <TabsContent value="prayers" className="space-y-6">
          {/* Prayer Types */}
          <Card>
            <CardHeader>
              <CardTitle>جۆرەکانی نوێژی فەرز</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prayerTypes.map((prayer) => (
                  <div
                    key={prayer.id}
                    className="p-4 rounded-lg border hover:bg-accent/5 cursor-pointer transition-colors"
                    onClick={() => setSelectedPrayer(prayer)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{prayer.name}</h3>
                      <Badge variant="secondary">{prayer.rakats} رەکعەت</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{prayer.description}</p>
                    <p className="text-xs text-primary">{prayer.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wudu" className="space-y-6">
          {/* Wudu Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                هەنگاوەکانی دەستپاکی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {wuduSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4 p-4 rounded-lg border">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                        {step.id}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{step.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {step.position}
                        </Badge>
                        {step.arabic && (
                          <div className="mt-3 p-3 bg-primary/5 rounded border border-primary/20">
                            <p className="text-lg font-arabic mb-1" dir="rtl">
                              {step.arabic}
                            </p>
                            {step.kurdish && <p className="text-sm text-muted-foreground">{step.kurdish}</p>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="basics" className="space-y-6">
          {/* Prayer Basics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  مەرجەکانی نوێژ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    دەستپاکی هەبێت
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    جل و شوێن پاک بێت
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    بەرەو قیبلە ڕووت لێ بێت
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    کاتی نوێژ هاتبێت
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    عەورەت داپۆشرابێت
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  ئەرکانی نوێژ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    تەکبیرەتول ئیحرام
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    قیام (ڕاوەستان)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    قیرائەت (خوێندنەوە)
                  </li\
