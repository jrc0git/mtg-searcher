import './EventSkeletonCard.css'
import Skeleton from 'react-loading-skeleton'

export function EventSkeletonCard () {
  return Array(5)
    .fill(0)
    .map((_, index) => (
      <div className='event-skeleton-card' key={index}>
        <div className='skeleton-name'>
          <Skeleton />
        </div>

        <div className='skeleton-info'>
          <Skeleton width={100} />
          <Skeleton width={100} />
        </div>
      </div>
    ))
}
