import './EventsWrapperCard.css'
import { getEventsByMeta } from '../../logic/events'
import { EventCard } from './EventCard'
import { useState, useEffect } from 'react'
import { EventSkeletonCard } from './EventSkeletonCard'

export function EventsWrapperCard ({ format }) {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getEventsByMeta(format)
      .then(res => res.json())
      .then(json => {
        setEvents(json.data)
        setIsLoading(false)
      })
  }, [])
  return (

    <main className='events-wrapper'>
      <p>{format.toUpperCase()}</p>
      {isLoading && <EventSkeletonCard />}
      {events.map((event) => {
        return (<EventCard event={event} key={event.url} />)
      })}
    </main>

  )
}
