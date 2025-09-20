"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, ArrowLeft, Sun, Moon, Utensils, Car, Home, Bed } from "lucide-react"

interface Dua {
  id: number
  title: string
  category: string
  arabic: string
  kurdish: string
  transliteration: string
  occasion: string
  icon: React.ReactNode
}

const duas: Dua[] = [
  {
    id: 1,
    title: "دووعای بەیانی",
    category: "ڕۆژانە",
    arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    kurdish: "بەیانیمان کرد و پاشایەتی بۆ خوایە، ستایش بۆ خوایە، هیچ خوایەک نییە جگە لە خوا کە یەکە و هاوبەشی نییە",
    transliteration: "Asbahna wa asbahal-mulku lillah, walhamdu lillah, la ilaha illa Allah wahdahu la sharika lah",
    occasion: "لە بەیانیدا",
    icon: <Sun className="h-5 w-5" />,
  },
  {
    id: 2,
    title: "دووعای ئێوارە",
    category: "ڕۆژانە",
    arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    kurdish: "ئێوارەمان کرد و پاشایەتی بۆ خوایە، ستایش بۆ خوایە، هیچ خوایەک نییە جگە لە خوا کە یەکە و هاوبەشی نییە",
    transliteration: "Amsayna wa amsal-mulku lillah, walhamdu lillah, la ilaha illa Allah wahdahu la sharika lah",
    occasion: "لە ئێوارەدا",
    icon: <Moon className="h-5 w-5" />,
  },
  {
    id: 3,
    title: "دووعای پێش خواردن",
    category: "خواردن",
    arabic: "بِسْمِ اللَّهِ",
    kurdish: "بە ناوی خوا",
    transliteration: "Bismillah",
    occasion: "پێش دەستکردن بە خواردن",
    icon: <Utensils className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "دووعای دوای خواردن",
    category: "خواردن",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ",
    kurdish: "ستایش بۆ خوا کە خواردنی پێدا و ئاوی خواردنەوەی پێدا و مسڵمانی کردین",
    transliteration: "Alhamdu lillahil-ladhi at'amana wa saqana wa ja'alana muslimin",
    occasion: "دوای تەواوکردنی خواردن",
    icon: <Utensils className="h-5 w-5" />,
  },
  {
    id: 5,
    title: "دووعای چوونە ماڵەوە",
    category: "گەشت",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    kurdish: "بە ناوی خوا چووینە ژوورەوە، بە ناوی خوا هاتینە دەرەوە، و لەسەر خوای پەروەردگارمان پشتمان بەست",
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'ala rabbina tawakkalna",
    occasion: "کاتی چوونە ماڵەوە",
    icon: <Home className="h-5 w-5" />,
  },
  {
    id: 6,
    title: "دووعای سواربوون",
    category: "گەشت",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ",
    kurdish: "پاکە ئەوەی ئەمەی بۆ ئێمە ڕام کرد و ئێمە نەمانتوانی بەسەریدا زاڵ بین",
    transliteration: "Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin",
    occasion: "کاتی سواربوون لە ئۆتۆمبێل یان هەر شتێکی تر",
    icon: <Car className="h-5 w-5" />,
  },
  {
    id: 7,
    title: "دووعای خەوتن",
    category: "ڕۆژانە",
    arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    kurdish: "بە ناوی تۆ ئەی خوا دەمرم و دەژیم",
    transliteration: "Bismika Allahumma amutu wa ahya",
    occasion: "پێش خەوتن",
    icon: <Bed className="h-5 w-5" />,
  },
  {
    id: 8,
    title: "دووعای هەستان لە خەو",
    category: "ڕۆژانە",
    arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
    kurdish: "ستایش بۆ خوا کە دوای ئەوەی مردنی بەسەرماندا هێنا، ژیانی کردینەوە و بەرەو ئەو هەڵستانەوەیە",
    transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
    occasion: "کاتی هەستان لە خەو",
    icon: <Sun className="h-5 w-5" />,
  },
]

const categories = ["هەموو", "ڕۆژانە", "خواردن", "گەشت"]

interface DuasSectionProps {
  onBack: () => void
}

export function DuasSection({ onBack }: DuasSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("هەموو")
  const [selectedDua, setSelectedDua] = useState<Dua | null>(null)

  const filteredDuas = selectedCategory === "هەموو" ? duas : duas.filter((dua) => dua.category === selectedCategory)

  if (selectedDua) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setSelectedDua(null)} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            گەڕانەوە بۆ لیست
          </Button>
          <div className="flex items-center gap-2">
            {selectedDua.icon}
            <h2 className="text-2xl font-bold">{selectedDua.title}</h2>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                {selectedDua.title}
              </div>
              <Badge variant="secondary">{selectedDua.category}</Badge>
            </CardTitle>
            <p className="text-sm text-muted-foreground">{selectedDua.occasion}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Arabic Text */}
            <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-2xl leading-relaxed font-arabic" dir="rtl">
                {selectedDua.arabic}
              </p>
            </div>

            {/* Kurdish Translation */}
            <div className="p-4 bg-card rounded-lg border">
              <h4 className="font-semibold mb-2 text-primary">وەرگێڕان:</h4>
              <p className="text-lg leading-relaxed">{selectedDua.kurdish}</p>
            </div>

            {/* Transliteration */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2 text-muted-foreground">دەنگەکردن:</h4>
              <p className="italic text-muted-foreground">{selectedDua.transliteration}</p>
            </div>

            {/* Usage */}
            <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <h4 className="font-semibold mb-2 text-accent-foreground">کاتی بەکارهێنان:</h4>
              <p className="text-sm">{selectedDua.occasion}</p>
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
        <h2 className="text-2xl font-bold">دووعاکان</h2>
      </div>

      {/* Categories */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{duas.length}</div>
            <div className="text-sm text-muted-foreground">کۆی دووعاکان</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{duas.filter((d) => d.category === "ڕۆژانە").length}</div>
            <div className="text-sm text-muted-foreground">ڕۆژانە</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{duas.filter((d) => d.category === "خواردن").length}</div>
            <div className="text-sm text-muted-foreground">خواردن</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{duas.filter((d) => d.category === "گەشت").length}</div>
            <div className="text-sm text-muted-foreground">گەشت</div>
          </CardContent>
        </Card>
      </div>

      {/* Duas List */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedCategory === "هەموو" ? "تەواوی دووعاکان" : `دووعاکانی ${selectedCategory}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {filteredDuas.map((dua) => (
                <div
                  key={dua.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/5 cursor-pointer transition-colors"
                  onClick={() => setSelectedDua(dua)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {dua.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{dua.title}</h3>
                      <p className="text-sm text-muted-foreground">{dua.occasion}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {dua.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
