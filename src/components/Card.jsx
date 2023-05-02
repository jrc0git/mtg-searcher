import './Card.css'
import { useEffect, useState } from 'react'
import scryfall from 'scryfall-client'
import { transformText } from '../logic/apiCalls'
import { CSSTransition } from 'react-transition-group'
import { Modal } from './Modal'

export function Card ({ name }) {
  const [loadInfo, setLoadInfo] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [card, setCard] = useState({
    cardName: name,
    image: '',
    price: { normal: '', foil: '' },
    formats: { standard: '', modern: '', legacy: '' },
    artist: '',
    set: '',
    text: '',
    id: '',
    cita: ''
  })
  const handleModalClose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (showModal) setLoadInfo(true)
  }, [showModal])

  useEffect(() => {
    scryfall.get('cards/named', {
      exact: name
    })
      .then((res) => {
        setCard({
          cardName: name,
          image: res.getImage('normal'),
          price: {
            normal: res.getPrice('eur'),
            foil: res.getPrice('eur_foil')
          },
          formats: {
            standard: res.isLegal('standard'),
            modern: res.isLegal('modern'),
            legacy: res.isLegal('legacy')
          },
          artist: res.artist,
          set: res.set_name,
          text: res.oracle_text,
          id: res.id,
          cita: res.flavor_text
        })
        console.log(res)
      })
  }, [loadInfo])

  return (
    <>
      <img className='listImage' src={card.image} onClick={() => setShowModal(true)} />
      <CSSTransition
        timeout={600}
        classNames='modal'
        in={showModal}
      >
        <Modal visible={showModal} handleModalClose={handleModalClose} card={card}>

          <div className='grow flex flex-col text-left justify-start items-center text-black break-words w-70 max-w-xl p-5 '>
            <div className='mb-2 text-2xl italic'>
              {card.cardName}
            </div>
            <div className='whitespace-pre-line shadow-black bg-slate-300 bg-opacity-25 rounded p-6 mt-5'>
              {transformText(card.text)}
            </div>
            <p className='text-center mt-5 italic'>{card.cita}</p>
            <br />
            <br />
            <p><strong>Price</strong>: {card.price.normal ? `${card.price.normal}€` : null} {card.price.foil ? ` ${card.price.foil}€(foil) ` : null} </p>
            <div>
              <strong>Formats</strong>:&nbsp;

              {card.formats.standard ? <div className='text-green-400 inline'>Standard</div> : <div className='text-rose-700 inline'>Standard</div>}&nbsp;
              {card.formats.modern ? <div className='text-green-400 inline'>Modern</div> : <div className='text-rose-700 inline'>Modern</div>}&nbsp;
              {card.formats.legacy ? <div className='text-green-400 inline'>Legacy</div> : <div className='text-rose-700 inline'>Legacy</div>}

            </div>
          </div>

        </Modal>
      </CSSTransition>
    </>
  )
}
