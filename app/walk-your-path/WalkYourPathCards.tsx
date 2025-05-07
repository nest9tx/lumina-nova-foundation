'use client'

import ScrollCard from '@/components/ScrollCard'
import { FaSeedling } from 'react-icons/fa'

export default function WalkYourPathCards() {
  return (
    <div className="mb-8">
      <ScrollCard
        icon={<FaSeedling />}
        title="The Circle of the Willing"
        excerpt="We are not calling the masses. We are lighting a beacon for the ones who already feel the flame."
        href="/walk-your-path/circle-of-the-willing"
        tier="PUBLIC"
      />
    </div>
  )
}
