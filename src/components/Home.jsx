import './Home.css'
import { useState, useEffect } from 'react'
import { searchAutocomplete } from '../logic/apiCalls'
import { SwitchTransition, CSSTransition } from 'react-transition-group'
import { Card } from './Card'

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
        console.log('api call')
        searchAutocomplete(searchInput)
          .then(response => setCards(response))
          .then(setIsSearching(false))
      } else {
        setCards(null)
        setIsSearching(false)
      }
    }, 1000)
    console.log('setted timer id')
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
          Looking for a specific card?
        </div>
        <div className='search'>
          <input
            type='text' placeholder='Looking for something?'
            onChange={(input) => setSearchInput(input.target.value)}
          />
          {isSearching && <span className='loader' />}
        </div>
      </div>

      <SwitchTransition>
        <CSSTransition
          classNames='fade'
          key={cards}
          addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
        >

          <div className='results'>
            {
                          cards !== null
                            ? cards.map((card) => {
                              return (

                                <Card name={card} key={card} />

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
