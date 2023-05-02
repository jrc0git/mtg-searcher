import './Events.css'
import { useEffect, useState } from 'react'
import { getEventsByMeta } from '../../logic/events'
import { EventsTable } from './EventsTable'

export function Events () {
  const formats = ['modern', 'standard', 'pioneer']
  const [events, setEvents] = useState([])
  useEffect(() => {
    Promise.all(formats.map(meta => getEventsByMeta(meta)
      .then(res => res.json())
      .then(json => json.data)
    ))
      .then((array) => {
        const newEvents = []
        array.forEach((format) => {
          newEvents.push(format)
        })
        setEvents(newEvents)
      })
  }, [])
  return (
    <main className='mainEvents'>
      {
        events.length === formats.length
          ? events.map((format) => {
            return (

              <EventsTable events={format} key={format} />

            )
          })
          : null
      }
    </main>

  )
}
