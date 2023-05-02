
export function getLastEvents () {
  return fetch('http://127.0.0.1:5000/events/modern')
}

export function getEventsByMeta (meta) {
  return fetch(`http://127.0.0.1:5000/events/${meta}`)
}
