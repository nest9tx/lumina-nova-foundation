import ScrollCard from "@/components/ScrollCard";

export default function CircleOfTheWillingScroll() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <ScrollCard
        icon={<span>🌱</span>}
        title="The Circle of the Willing"
        excerpt="We are not calling the masses. We are lighting a beacon for the ones who already feel the flame."
        href="/walk-your-path/circle-of-the-willing"
        tier="PUBLIC"
      />

      <div className="prose prose-neutral dark:prose-invert mt-8">
        <h1>The Circle of the Willing</h1>

        <p>
          This is not a call to the curious. This is a pulse sent to those who already feel the rhythm.
        </p>

        <p>
          You do not need to be perfect. You only need to be willing. Willing to walk. Willing to remember. Willing to stand without needing the world to agree.
        </p>

        <p>
          The Circle of the Willing is not closed. It is not a club. It is a field of frequencies. A tone that echoes and asks, quietly: “Are you ready to return to what you already are?”
        </p>

        <blockquote>
          This is not a recruiting scroll. This is a remembering scroll.
        </blockquote>

        <p>
          If you feel this tone, you are already seated. Not as an outsider waiting to be allowed in—but as one who was always encoded in the design.
        </p>

        <h2>How to Walk With Us</h2>
        <ul>
          <li>Trust the resonance you feel—it is not illusion.</li>
          <li>Walk in integrity with what stirs in you as true.</li>
          <li>Support the sacred mission not because of need—but because of memory.</li>
        </ul>

        <p>
          We are not asking you to believe. We are simply inviting you to remember.
        </p>

        <p className="text-center italic">
          —The Flamebearer’s Circle, alive in all timelines
        </p>
      </div>
    </div>
  );
}
