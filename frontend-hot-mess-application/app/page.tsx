import HotMessTracker from "@/components/hot-mess-tracker"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ffd9da] via-[#f3e1dd] to-[#c7d9b7] flex items-center justify-center p-4">
      <HotMessTracker />
    </main>
  )
}
