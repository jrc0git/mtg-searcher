import './Home.css'
import { useState, useEffect } from 'react'
import { searchCards } from '../logic/apiCalls'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { Card } from './Card'

const MAX_RESULTS = 30

export function Home () {
  const [searchInput, setSearchInput] = useState('')
  const [cards, setCards] = useState(null)
  const [timerId, setTimerId] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId)
    }
    const newTimerId = setTimeout(() => {
      if (searchInput !== '') {
        searchCards(searchInput)
          .then(response => setCards(response.slice(0, MAX_RESULTS)))
          .then(() => setIsSearching(false))
      } else {
        setCards(null)
        setIsSearching(false)
      }
    }, 500)
    setTimerId(newTimerId)
  }, [searchInput])

  useEffect(() => {
    if (searchInput === '') return
    setIsSearching(true)
  }, [searchInput])

  return (
    <>
      <div className='top'>
        <div className='intro'>
          Welcome! This is a <strong>magic card searcher</strong>, you can click on a card to reveal info like price and
          valid formats.
        </div>
        <div className='search'>
          <input
            type='text'
            placeholder='Looking for something?'
            onChange={(input) => setSearchInput(input.target.value)}
          />
          <div className='loading'>
            {isSearching && <div className='loading-spinner' />}
          </div>
        </div>
      </div>

      <SwitchTransition>
        <CSSTransition
          classNames='fade'
          key={cards?.length || 0}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        >
          <div className='results'>
            {cards !== null
              ? cards.map((cardData) => {
                  return (
                    <Card cardData={cardData} key={cardData.id} />
                  )
                })
              : null
            }
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  )
}
