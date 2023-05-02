import './Event.css'

export function Event ({ event }) {
  function openEvent (url) {
    window.open(url, '_blank').focus()
  }
  return (
    <>
      <div className='event' onClick={() => openEvent(event.url)}>
        <div className='eventName'>
          {event.title}
        </div>
        <div className='eventLoc'>
          {event.location}
        </div>
        <div className='eventDate'>
          ({event.date})
        </div>
      </div>
    </>
  )
}
