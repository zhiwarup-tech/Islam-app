"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RotateCcw, ArrowLeft, RefreshCw, Target, Award } from "lucide-react"

interface TasbihType {
  id: number
  name: string
  arabic: string
  kurdish: string
  target: number
  color: string
}

const tasbihTypes: TasbihType[] = [
  {
    id: 1,
    name: "سوبحان الله",
    arabic: "سُبْحَانَ اللَّهِ",
    kurdish: "پاکە خوا",
    target: 33,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "الحمد لله",
    arabic: "الْحَمْدُ لِلَّهِ",
    kurdish: "ستایش بۆ خوا",
    target: 33,
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "الله أكبر",
    arabic: "اللَّهُ أَكْبَرُ",
    kurdish: "خوا گەورەترە",
    target: 34,
    color: "bg-red-500",
  },
  {
    id: 4,
    name: "لا إله إلا الله",
    arabic: "لَا إِلَهَ إِلَّا اللَّهُ",
    kurdish: "هیچ خوایەک نییە جگە لە خوا",
    target: 100,
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "استغفار",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    kurdish: "لە خوا لێبوردن دەخوازم",
    target: 100,
    color: "bg-orange-500",
  },
  {
    id: 6,
    name: "صلوات",
    arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
    kurdish: "خوایا درود بنێرە بۆ محەمەد",
    target: 10,
    color: "bg-teal-500",
  },
]

interface TasbihSectionProps {
  onBack: () => void
}

export function TasbihSection({ onBack }: TasbihSectionProps) {
  const [selectedTasbih, setSelectedTasbih] = useState<TasbihType>(tasbihTypes[0])
  const [count, setCount] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [completedSets, setCompletedSets] = useState(0)

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`tasbih-${selectedTasbih.id}`)
    if (savedProgress) {
      const progress = JSON.parse(savedProgress)
      setTotalCount(progress.totalCount || 0)
      setCompletedSets(progress.completedSets || 0)
    } else {
      setTotalCount(0)
      setCompletedSets(0)
    }
    setCount(0)
    setIsCompleted(false)
  }, [selectedTasbih])

  // Save progress to localStorage
  useEffect(() => {
    const progress = {
      totalCount,
      completedSets,
    }
    localStorage.setItem(`tasbih-${selectedTasbih.id}`, JSON.stringify(progress))
  }, [totalCount, completedSets, selectedTasbih.id])

  const handleIncrement = () => {
    const newCount = count + 1
    const newTotalCount = totalCount + 1

    setCount(newCount)
    setTotalCount(newTotalCount)

    if (newCount >= selectedTasbih.target) {
      setIsCompleted(true)
      setCompletedSets(completedSets + 1)
      // Auto reset after 2 seconds
      setTimeout(() => {
        setCount(0)
        setIsCompleted(false)
      }, 2000)
    }
  }

  const handleReset = () => {
    setCount(0)
    setIsCompleted(false)
  }

  const handleResetAll = () => {
    setCount(0)
    setTotalCount(0)
    setCompletedSets(0)
    setIsCompleted(false)
    localStorage.removeItem(`tasbih-${selectedTasbih.id}`)
  }

  const progress = (count / selectedTasbih.target) * 100

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          گەڕانەوە
        </Button>
        <h2 className="text-2xl font-bold">تەسبیحات</h2>
      </div>

      {/* Tasbih Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>جۆری تەسبیح هەڵبژێرە</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tasbihTypes.map((tasbih) => (
              <Button
                key={tasbih.id}
                variant={selectedTasbih.id === tasbih.id ? "default" : "outline"}
                className={`h-auto p-4 text-left justify-start ${
                  selectedTasbih.id === tasbih.id ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => setSelectedTasbih(tasbih)}
              >
                <div>
                  <div className="font-semibold">{tasbih.name}</div>
                  <div className="text-xs opacity-75">{tasbih.target} جار</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{count}</div>
            <div className="text-sm text-muted-foreground">ئێستا</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{selectedTasbih.target}</div>
            <div className="text-sm text-muted-foreground">ئامانج</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{completedSets}</div>
            <div className="text-sm text-muted-foreground">تەواوکراو</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalCount}</div>
            <div className="text-sm text-muted-foreground">کۆی گشتی</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tasbih Counter */}
      <Card className={`${isCompleted ? "bg-primary/10 border-primary" : ""} transition-colors`}>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <RotateCcw className="h-6 w-6 text-primary" />
            {selectedTasbih.name}
          </CardTitle>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-primary" dir="rtl">
              {selectedTasbih.arabic}
            </p>
            <p className="text-muted-foreground">{selectedTasbih.kurdish}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>پێشکەوتن</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{count}</span>
              <span>{selectedTasbih.target}</span>
            </div>
          </div>

          {/* Counter Button */}
          <div className="text-center space-y-4">
            <Button
              size="lg"
              className={`w-32 h-32 rounded-full text-4xl font-bold ${
                isCompleted ? "bg-green-500 hover:bg-green-600" : "bg-primary hover:bg-primary/90"
              } transition-all transform active:scale-95`}
              onClick={handleIncrement}
              disabled={isCompleted}
            >
              {isCompleted ? <Award className="h-12 w-12" /> : count}
            </Button>

            {isCompleted && (
              <div className="text-center">
                <Badge className="bg-green-500 text-white text-lg px-4 py-2">تەبریک! تەواو کرا</Badge>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={handleReset} className="flex items-center gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              دووبارە دەستپێکردنەوە
            </Button>
            <Button variant="outline" onClick={handleResetAll} className="flex items-center gap-2 bg-transparent">
              <Target className="h-4 w-4" />
              سڕینەوەی هەموو
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Section */}
      {completedSets > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              دەستکەوتەکان
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">{completedSets}</div>
                <div className="text-sm text-muted-foreground">سێت تەواوکراو</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">{totalCount}</div>
                <div className="text-sm text-muted-foreground">کۆی تەسبیح</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {Math.round((totalCount / selectedTasbih.target) * 100) / 100}
                </div>
                <div className="text-sm text-muted-foreground">ڕێژەی تەواوکردن</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {completedSets >= 10 ? "🏆" : completedSets >= 5 ? "🥇" : completedSets >= 1 ? "🥈" : "🥉"}
                </div>
                <div className="text-sm text-muted-foreground">ئاست</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
