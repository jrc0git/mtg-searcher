import './LastEvents.css'
import { Event } from './Event'
import { useEffect, useState } from 'react'
import { getLastEvents } from '../../logic/events'

export function LastEvents () {
  const [events, setEvents] = useState()
  useEffect(() => {
    getLastEvents()
      .then(res => res.json())
      .then(json => setEvents(json.data))
  }, [])

  return (
    <>
      <div className='lastevents'>
        {
                    events !== null
                      ? events?.map((event) => {
                        return (
                          <Event event={event} key={event.url} />
                        )
                      })
                      : null
                }
      </div>

    </>
  )
}
