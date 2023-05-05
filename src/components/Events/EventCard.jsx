import './EventCard.css'

export function EventCard ({ event }) {
  return (
    <div className='event-card'>
      <p>{event.title}</p>
      <div className='info'>
        <p>{event.location}</p>
        <p>{event.date}</p>
      </div>

    </div>
  )
}
