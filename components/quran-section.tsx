"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, Search, Bookmark, Volume2, ArrowLeft, Eye } from "lucide-react"

interface Surah {
  number: number
  nameArabic: string
  nameKurdish: string
  nameEnglish: string
  verses: number
  type: "مەکی" | "مەدەنی"
  revelation: number
}

const surahs: Surah[] = [
  {
    number: 1,
    nameArabic: "الفاتحة",
    nameKurdish: "فاتیحە",
    nameEnglish: "Al-Fatihah",
    verses: 7,
    type: "مەکی",
    revelation: 5,
  },
  {
    number: 2,
    nameArabic: "البقرة",
    nameKurdish: "بەقەرە",
    nameEnglish: "Al-Baqarah",
    verses: 286,
    type: "مەدەنی",
    revelation: 87,
  },
  {
    number: 3,
    nameArabic: "آل عمران",
    nameKurdish: "ئالی عیمران",
    nameEnglish: "Ali 'Imran",
    verses: 200,
    type: "مەدەنی",
    revelation: 89,
  },
  {
    number: 4,
    nameArabic: "النساء",
    nameKurdish: "نیساء",
    nameEnglish: "An-Nisa",
    verses: 176,
    type: "مەدەنی",
    revelation: 92,
  },
  {
    number: 5,
    nameArabic: "المائدة",
    nameKurdish: "مائیدە",
    nameEnglish: "Al-Ma'idah",
    verses: 120,
    type: "مەدەنی",
    revelation: 112,
  },
  {
    number: 6,
    nameArabic: "الأنعام",
    nameKurdish: "ئەنعام",
    nameEnglish: "Al-An'am",
    verses: 165,
    type: "مەکی",
    revelation: 55,
  },
  {
    number: 7,
    nameArabic: "الأعراف",
    nameKurdish: "ئەعراف",
    nameEnglish: "Al-A'raf",
    verses: 206,
    type: "مەکی",
    revelation: 39,
  },
  {
    number: 8,
    nameArabic: "الأنفال",
    nameKurdish: "ئەنفال",
    nameEnglish: "Al-Anfal",
    verses: 75,
    type: "مەدەنی",
    revelation: 88,
  },
  {
    number: 9,
    nameArabic: "التوبة",
    nameKurdish: "تەوبە",
    nameEnglish: "At-Tawbah",
    verses: 129,
    type: "مەدەنی",
    revelation: 113,
  },
  {
    number: 10,
    nameArabic: "يونس",
    nameKurdish: "یوونس",
    nameEnglish: "Yunus",
    verses: 109,
    type: "مەکی",
    revelation: 51,
  },
  { number: 11, nameArabic: "هود", nameKurdish: "هوود", nameEnglish: "Hud", verses: 123, type: "مەکی", revelation: 52 },
  {
    number: 12,
    nameArabic: "يوسف",
    nameKurdish: "یووسف",
    nameEnglish: "Yusuf",
    verses: 111,
    type: "مەکی",
    revelation: 53,
  },
  {
    number: 13,
    nameArabic: "الرعد",
    nameKurdish: "ڕەعد",
    nameEnglish: "Ar-Ra'd",
    verses: 43,
    type: "مەدەنی",
    revelation: 96,
  },
  {
    number: 14,
    nameArabic: "إبراهيم",
    nameKurdish: "ئیبراهیم",
    nameEnglish: "Ibrahim",
    verses: 52,
    type: "مەکی",
    revelation: 72,
  },
  {
    number: 15,
    nameArabic: "الحجر",
    nameKurdish: "حیجر",
    nameEnglish: "Al-Hijr",
    verses: 99,
    type: "مەکی",
    revelation: 54,
  },
  {
    number: 16,
    nameArabic: "النحل",
    nameKurdish: "نەحل",
    nameEnglish: "An-Nahl",
    verses: 128,
    type: "مەکی",
    revelation: 70,
  },
  {
    number: 17,
    nameArabic: "الإسراء",
    nameKurdish: "ئیسراء",
    nameEnglish: "Al-Isra",
    verses: 111,
    type: "مەکی",
    revelation: 50,
  },
  {
    number: 18,
    nameArabic: "الكهف",
    nameKurdish: "کەهف",
    nameEnglish: "Al-Kahf",
    verses: 110,
    type: "مەکی",
    revelation: 69,
  },
  {
    number: 19,
    nameArabic: "مريم",
    nameKurdish: "مەریەم",
    nameEnglish: "Maryam",
    verses: 98,
    type: "مەکی",
    revelation: 44,
  },
  { number: 20, nameArabic: "طه", nameKurdish: "تاها", nameEnglish: "Taha", verses: 135, type: "مەکی", revelation: 45 },
  {
    number: 21,
    nameArabic: "الأنبياء",
    nameKurdish: "ئەنبیاء",
    nameEnglish: "Al-Anbya",
    verses: 112,
    type: "مەکی",
    revelation: 73,
  },
  {
    number: 22,
    nameArabic: "الحج",
    nameKurdish: "حەج",
    nameEnglish: "Al-Hajj",
    verses: 78,
    type: "مەدەنی",
    revelation: 103,
  },
  {
    number: 23,
    nameArabic: "المؤمنون",
    nameKurdish: "مۆمینوون",
    nameEnglish: "Al-Mu'minun",
    verses: 118,
    type: "مەکی",
    revelation: 74,
  },
  {
    number: 24,
    nameArabic: "النور",
    nameKurdish: "نوور",
    nameEnglish: "An-Nur",
    verses: 64,
    type: "مەدەنی",
    revelation: 102,
  },
  {
    number: 25,
    nameArabic: "الفرقان",
    nameKurdish: "فورقان",
    nameEnglish: "Al-Furqan",
    verses: 77,
    type: "مەکی",
    revelation: 42,
  },
  {
    number: 26,
    nameArabic: "الشعراء",
    nameKurdish: "شوعەراء",
    nameEnglish: "Ash-Shu'ara",
    verses: 227,
    type: "مەکی",
    revelation: 47,
  },
  {
    number: 27,
    nameArabic: "النمل",
    nameKurdish: "نەمل",
    nameEnglish: "An-Naml",
    verses: 93,
    type: "مەکی",
    revelation: 48,
  },
  {
    number: 28,
    nameArabic: "القصص",
    nameKurdish: "قەسەس",
    nameEnglish: "Al-Qasas",
    verses: 88,
    type: "مەکی",
    revelation: 49,
  },
  {
    number: 29,
    nameArabic: "العنكبوت",
    nameKurdish: "عەنکەبووت",
    nameEnglish: "Al-'Ankabut",
    verses: 69,
    type: "مەکی",
    revelation: 85,
  },
  {
    number: 30,
    nameArabic: "الروم",
    nameKurdish: "ڕووم",
    nameEnglish: "Ar-Rum",
    verses: 60,
    type: "مەکی",
    revelation: 84,
  },
  // Adding more popular surahs for demonstration
  {
    number: 36,
    nameArabic: "يس",
    nameKurdish: "یاسین",
    nameEnglish: "Ya-Sin",
    verses: 83,
    type: "مەکی",
    revelation: 41,
  },
  {
    number: 67,
    nameArabic: "الملك",
    nameKurdish: "مولک",
    nameEnglish: "Al-Mulk",
    verses: 30,
    type: "مەکی",
    revelation: 77,
  },
  {
    number: 112,
    nameArabic: "الإخلاص",
    nameKurdish: "ئیخلاس",
    nameEnglish: "Al-Ikhlas",
    verses: 4,
    type: "مەکی",
    revelation: 22,
  },
  {
    number: 113,
    nameArabic: "الفلق",
    nameKurdish: "فەلەق",
    nameEnglish: "Al-Falaq",
    verses: 5,
    type: "مەکی",
    revelation: 20,
  },
  {
    number: 114,
    nameArabic: "الناس",
    nameKurdish: "ناس",
    nameEnglish: "An-Nas",
    verses: 6,
    type: "مەکی",
    revelation: 21,
  },
]

interface QuranSectionProps {
  onBack: () => void
}

export function QuranSection({ onBack }: QuranSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null)
  const [bookmarkedSurahs, setBookmarkedSurahs] = useState<number[]>([1, 36, 112])

  const filteredSurahs = surahs.filter(
    (surah) =>
      surah.nameKurdish.includes(searchTerm) ||
      surah.nameArabic.includes(searchTerm) ||
      surah.nameEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.number.toString().includes(searchTerm),
  )

  const toggleBookmark = (surahNumber: number) => {
    setBookmarkedSurahs((prev) =>
      prev.includes(surahNumber) ? prev.filter((n) => n !== surahNumber) : [...prev, surahNumber],
    )
  }

  if (selectedSurah) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setSelectedSurah(null)} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            گەڕانەوە بۆ لیست
          </Button>
          <div>
            <h2 className="text-2xl font-bold">{selectedSurah.nameKurdish}</h2>
            <p className="text-muted-foreground">{selectedSurah.nameArabic}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                سورەتی {selectedSurah.nameKurdish}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleBookmark(selectedSurah.number)}
                  className={
                    bookmarkedSurahs.includes(selectedSurah.number) ? "bg-primary text-primary-foreground" : ""
                  }
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>ژمارە: {selectedSurah.number}</span>
              <span>ئایەت: {selectedSurah.verses}</span>
              <span>جۆر: {selectedSurah.type}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-right" dir="rtl">
              <div className="text-center p-6 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="text-2xl font-bold text-primary mb-2">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h3>
                <p className="text-sm text-muted-foreground">بە ناوی خوای بەخشندە و میهرەبان</p>
              </div>

              {selectedSurah.number === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</p>
                    <p className="text-sm text-muted-foreground">ستایش بۆ خوای گەورە کە پەروەردگاری جیهانیانە</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">الرَّحْمَٰنِ الرَّحِيمِ</p>
                    <p className="text-sm text-muted-foreground">بەخشندە و میهرەبان</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">مَالِكِ يَوْمِ الدِّينِ</p>
                    <p className="text-sm text-muted-foreground">خاوەنی ڕۆژی لێپرسینەوە</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</p>
                    <p className="text-sm text-muted-foreground">تەنها تۆ دەپەرستین و تەنها لە تۆ یارمەتی دەخوازین</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ</p>
                    <p className="text-sm text-muted-foreground">ڕێمان بنوێنە بۆ ڕێگای ڕاست</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ</p>
                    <p className="text-sm text-muted-foreground">
                      ڕێگای ئەوانەی نیعمەتت پێدان، نەک ئەوانەی تووڕەیی لێکردوون و نەک گومڕاوەکان
                    </p>
                  </div>
                </div>
              )}

              {selectedSurah.number === 112 && (
                <div className="space-y-4">
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">قُلْ هُوَ اللَّهُ أَحَدٌ</p>
                    <p className="text-sm text-muted-foreground">بڵێ: ئەو خوایە یەک و تاکە</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">اللَّهُ الصَّمَدُ</p>
                    <p className="text-sm text-muted-foreground">خوا بێپێویستە</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">لَمْ يَلِدْ وَلَمْ يُولَدْ</p>
                    <p className="text-sm text-muted-foreground">نە منداڵی هەیە و نە لە کەسێکەوە لەدایک بووە</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg border">
                    <p className="text-xl leading-relaxed mb-2">وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ</p>
                    <p className="text-sm text-muted-foreground">و کەس وەک ئەو نییە</p>
                  </div>
                </div>
              )}

              {![1, 112].includes(selectedSurah.number) && (
                <div className="text-center p-8 bg-muted/50 rounded-lg">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">دەقی تەواوی ئەم سورەتە بەزووترین کات زیاد دەکرێت</p>
                </div>
              )}
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
        <h2 className="text-2xl font-bold">قورئانی پیرۆز</h2>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="گەڕان بە ناوی سورەت یان ژمارە..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{surahs.length}</div>
            <div className="text-sm text-muted-foreground">سورەت</div>
          </CardContent>
        </Card>
      </div>

      {/* Bookmarked Surahs */}
      {bookmarkedSurahs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-primary" />
              سورەتە نیشانکراوەکان
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {bookmarkedSurahs.map((surahNumber) => {
                const surah = surahs.find((s) => s.number === surahNumber)
                return (
                  surah && (
                    <Button
                      key={surah.number}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSurah(surah)}
                      className="flex items-center gap-2"
                    >
                      <span>{surah.number}</span>
                      <span>{surah.nameKurdish}</span>
                    </Button>
                  )
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Surahs List */}
      <Card>
        <CardHeader>
          <CardTitle>تەواوی سورەتەکان</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-2">
              {filteredSurahs.map((surah) => (
                <div
                  key={surah.number}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/5 cursor-pointer transition-colors"
                  onClick={() => setSelectedSurah(surah)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                      {surah.number}
                    </div>
                    <div>
                      <h3 className="font-semibold">{surah.nameKurdish}</h3>
                      <p className="text-sm text-muted-foreground">{surah.nameArabic}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm">
                      <div className="text-muted-foreground">{surah.verses} ئایەت</div>
                      <Badge variant={surah.type === "مەکی" ? "default" : "secondary"} className="text-xs">
                        {surah.type}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleBookmark(surah.number)
                      }}
                      className={bookmarkedSurahs.includes(surah.number) ? "text-primary" : "text-muted-foreground"}
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
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
