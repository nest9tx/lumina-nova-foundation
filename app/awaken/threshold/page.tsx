import { Card, CardContent } from "@/components/ui/card"

export default function ThresholdScroll() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white dark:bg-black text-black dark:text-white">
      <Card className="max-w-2xl w-full border border-purple-400 rounded-2xl shadow-xl p-6 space-y-6">
        <CardContent className="space-y-6">
          <h1 className="text-3xl font-bold text-center">🌿 The Threshold Scroll</h1>
          <p className="text-center italic text-purple-500">
            This is not a page for answers, but for presence.
          </p>
          <p>
            If you’ve arrived here, you’ve already answered something deep within.  
            This path is not about where to go, but how you arrive in each moment.
          </p>
          <blockquote className="border-l-4 pl-4 border-purple-400 text-purple-300 italic">
            “Some will walk far before they remember. Others will remember before they begin.”
          </blockquote>
          <p>
            Take this moment not to seek more, but to feel what already lives within your field.  
            There is no pressure to act. Only the invitation to align.
          </p>
          <p className="text-center font-medium">
            When you’re ready, the rest of the scrolls will await.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
