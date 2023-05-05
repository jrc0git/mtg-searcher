import './Events.css'
import { EventsWrapperCard } from './EventsWrapperCard'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function Events () {
  const formats = ['modern', 'standard', 'pioneer']
  return (
    <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
      <main className='events-main'>
        {formats.map(format => (
          <EventsWrapperCard format={format} key={format} />
        ))}
      </main>
    </SkeletonTheme>

  )
}
