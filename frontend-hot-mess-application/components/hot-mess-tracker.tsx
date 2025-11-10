"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, Save } from "lucide-react"

interface SliderData {
  id: string
  label: string
  value: number
  emoji: string
}

const sarcasticMessages = [
  { min: 0, max: 20, message: "Wow, look at you being all responsible. Boring. 😴" },
  { min: 21, max: 40, message: "A little chaos never hurt anyone... right? 🤷‍♀️" },
  { min: 41, max: 60, message: "We're entering hot mess territory. Iconic. 💅" },
  { min: 61, max: 80, message: "At least you're consistently chaotic. We love that for you 💖" },
  { min: 81, max: 100, message: "LEGENDARY chaos energy. You're a whole disaster and we're here for it 🔥✨" },
]

const emojiStates = [
  { min: 0, max: 20, emoji: "😌", scale: 1 },
  { min: 21, max: 40, emoji: "😅", scale: 1.05 },
  { min: 41, max: 60, emoji: "😰", scale: 1.1 },
  { min: 61, max: 80, emoji: "🫠", scale: 1.15 },
  { min: 81, max: 100, emoji: "💀", scale: 1.2 },
]

export default function HotMessTracker() {
  const [sliders, setSliders] = useState<SliderData[]>([
    { id: "late", label: "Late to class", value: 0, emoji: "⏰" },
    { id: "charger", label: "Lost charger", value: 0, emoji: "🔌" },
    { id: "text", label: "Sent risky text", value: 0, emoji: "📱" },
    { id: "procrastination", label: "Procrastination", value: 0, emoji: "🛋️" },
  ])

  const [savedScores, setSavedScores] = useState<Array<{ date: string; score: number }>>([])
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("hotMessScores")
    if (saved) {
      setSavedScores(JSON.parse(saved))
    }
  }, [])

  const totalScore = sliders.reduce((sum, slider) => sum + slider.value, 0) / sliders.length

  const currentMessage =
    sarcasticMessages.find((msg) => totalScore >= msg.min && totalScore <= msg.max)?.message ||
    sarcasticMessages[0].message

  const currentEmoji = emojiStates.find((state) => totalScore >= state.min && totalScore <= state.max) || emojiStates[0]

  const handleSliderChange = (id: string, value: number[]) => {
    setSliders(sliders.map((slider) => (slider.id === id ? { ...slider, value: value[0] } : slider)))
  }

  const handleReset = () => {
    setSliders(sliders.map((slider) => ({ ...slider, value: 0 })))
  }

  const handleSave = () => {
    const newScore = {
      date: new Date().toLocaleDateString(),
      score: Math.round(totalScore),
    }
    const updated = [newScore, ...savedScores].slice(0, 10)
    setSavedScores(updated)
    localStorage.setItem("hotMessScores", JSON.stringify(updated))
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 3000)
  }

  return (
    <div className="w-full max-w-2xl">
      <Card className="bg-white/90 backdrop-blur-sm border-[#cc7178] border-2 shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#89023e] mb-2 text-balance">Hot Mess Tracker 💅</h1>
          <p className="text-[#cc7178] text-lg">How chaotic is your day? Let's find out.</p>
        </div>

        {/* Animated Emoji Face */}
        <div className="flex justify-center mb-8">
          <div
            className="text-8xl transition-all duration-500 ease-out"
            style={{
              transform: `scale(${currentEmoji.scale}) rotate(${totalScore > 50 ? (totalScore - 50) / 2 : 0}deg)`,
            }}
          >
            {currentEmoji.emoji}
          </div>
        </div>

        {/* Hot Mess Score */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-[#89023e] mb-2">{Math.round(totalScore)}</div>
          <div className="text-sm text-[#cc7178] uppercase tracking-wider font-semibold">Hot Mess Score</div>
        </div>

        {/* Sliders */}
        <div className="space-y-6 mb-8">
          {sliders.map((slider) => (
            <div key={slider.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[#89023e] font-medium flex items-center gap-2">
                  <span className="text-xl">{slider.emoji}</span>
                  {slider.label}
                </label>
                <span className="text-[#cc7178] font-bold min-w-[3ch] text-right">{slider.value}</span>
              </div>
              <Slider
                value={[slider.value]}
                onValueChange={(value) => handleSliderChange(slider.id, value)}
                max={100}
                step={1}
                className="[&_[role=slider]]:bg-[#89023e] [&_[role=slider]]:border-[#89023e] [&_.bg-primary]:bg-[#cc7178]"
              />
            </div>
          ))}
        </div>

        {/* Sarcastic Message */}
        <div className="bg-[#ffd9da] border-2 border-[#cc7178] rounded-lg p-6 mb-6 text-center">
          <p className="text-[#89023e] text-lg font-medium text-balance">{currentMessage}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-2 border-[#cc7178] text-[#89023e] hover:bg-[#ffd9da] hover:text-[#89023e] bg-transparent"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            variant="outline"
            onClick={handleSave}
            className="border-2 border-[#cc7178] text-[#89023e] hover:bg-[#ffd9da] hover:text-[#89023e] bg-transparent"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Score
          </Button>
        </div>

        {/* Save Confirmation */}
        {showSaved && (
          <div className="mt-4 text-center text-[#89023e] font-medium animate-in fade-in slide-in-from-bottom-2">
            ✨ Score saved! Your chaos is documented.
          </div>
        )}

        {/* Saved Scores History */}
        {savedScores.length > 0 && (
          <div className="mt-8 pt-6 border-t-2 border-[#cc7178]">
            <h3 className="text-[#89023e] font-bold text-lg mb-4 text-center">Your Chaos History</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {savedScores.map((score, index) => (
                <div key={index} className="flex justify-between items-center bg-[#f3e1dd] rounded-lg px-4 py-2">
                  <span className="text-[#89023e] text-sm">{score.date}</span>
                  <span className="text-[#cc7178] font-bold">{score.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
