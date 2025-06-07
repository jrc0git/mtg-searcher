import './Card.css'
import { useEffect, useState } from 'react'
import scryfall from 'scryfall-client'
import { transformText } from '../logic/apiCalls'
import { CSSTransition } from 'react-transition-group'
import { Modal } from './Modal'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function Card ({ name }) {
  const [loadInfo, setLoadInfo] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(true)
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
      })
  }, [loadInfo])

  return (
    <>
      {isImageLoading && (
        <div className="card-skeleton">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={209} width={150} borderRadius={12} />
          </SkeletonTheme>
        </div>
      )}
      <img 
        className='listImage' 
        src={card.image} 
        onClick={() => setShowModal(true)}
        onLoad={() => setIsImageLoading(false)}
        style={{ display: isImageLoading ? 'none' : 'block' }}
      />
      <CSSTransition
        timeout={600}
        classNames='modal'
        in={showModal}
      >
        <Modal visible={showModal} handleModalClose={handleModalClose} card={card}>
          <div className="modal-details">
            <h2 className="modal-title">{card.cardName}</h2>
            <div className="modal-text">{card.text}</div>
            {card.cita && (
              <div className="modal-flavor-text">{card.cita}</div>
            )}
            <div className="modal-info-section">
              <div className="modal-price-section">
                <h3>Price Information</h3>
                <div className='price-cards'>
                  {card.price.normal && (
                    <div className='price-card'>
                      <span className='price-label'>Regular</span>
                      <span className='price-value'>{card.price.normal}€</span>
                    </div>
                  )}
                  {card.price.foil && (
                    <div className='price-card foil'>
                      <span className='price-label'>Foil</span>
                      <span className='price-value'>{card.price.foil}€</span>
                    </div>
                  )}
                </div>
              </div>

              <div className='modal-formats-section'>
                <h3>Format Legality</h3>
                <div className='format-cards'>
                  <div className={`format-card ${card.formats.standard ? 'legal' : 'illegal'}`}>
                    <span className='format-name'>Standard</span>
                    <span className='format-status'>{card.formats.standard ? 'Legal' : 'Not Legal'}</span>
                  </div>
                  <div className={`format-card ${card.formats.modern ? 'legal' : 'illegal'}`}>
                    <span className='format-name'>Modern</span>
                    <span className='format-status'>{card.formats.modern ? 'Legal' : 'Not Legal'}</span>
                  </div>
                  <div className={`format-card ${card.formats.legacy ? 'legal' : 'illegal'}`}>
                    <span className='format-name'>Legacy</span>
                    <span className='format-status'>{card.formats.legacy ? 'Legal' : 'Not Legal'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </CSSTransition>
    </>
  )
}
