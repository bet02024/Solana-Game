import React from 'react'
import Row from './Row'
import { recentPlay } from '../../../Play'
interface props {
  recentPlays: recentPlay[]
}

const RecentPlays = ({ recentPlays }: props) => {
  return (
    <div className='recent-table-background px-8 pt-2 pb-4 mb-32'>
      {
        recentPlays.map((r, i) => (
          <Row
            key={i}
            {...r}
          />
        ))
      }
    </div>
  )
}

export default RecentPlays