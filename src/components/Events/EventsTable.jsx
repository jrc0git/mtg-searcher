import './EventsTable.css'

export function EventsTable ({ events }) {
  function openEvent (url) {
    window.open(url, '_blank').focus()
  }
  return (
    <table className='eventsTable'>

      <tr>
        <th>Event</th>
        <th>Location</th>
        <th>Date</th>
      </tr>

      {events !== null
        ? events.map((event) => (

          <tr key={event.url} onClick={() => openEvent(event.url)}>
            <td>{event.title}</td>
            <td>{event.location}</td>
            <td>{event.date}</td>
          </tr>

        ))
        : null}

    </table>
  )
}
