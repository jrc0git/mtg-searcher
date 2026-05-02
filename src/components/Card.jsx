import './Card.css'
import { useEffect, useState, useCallback } from 'react'
import scryfall from 'scryfall-client'
import { CSSTransition } from 'react-transition-group'
import { Modal } from './Modal'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function imageExists(url) {
  if (!url) return false
  const link = new Image()
  link.src = url
  return link.complete && (link.naturalHeight > 0 || link.naturalWidth > 0)
}

export function Card ({ cardData }) {
  const [showModal, setShowModal] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(() => !imageExists(cardData.getImage('small')))
  const [hasError, setHasError] = useState(false)
  const [card, setCard] = useState(() => ({
    cardName: cardData.name,
    image: cardData.getImage('normal') || '',
    price: { normal: '', foil: '' },
    formats: { standard: '', modern: '', legacy: '' },
    artist: '',
    set: '',
    text: '',
    id: cardData.id,
    cita: ''
  }))

  const handleModalClose = () => {
    setShowModal(false)
  }

  useEffect(() => {
    if (!showModal) return

    const loadCard = async () => {
      try {
        const res = await scryfall.get('cards/named', {
          exact: cardData.name
        })
        setCard({
          cardName: cardData.name,
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
      } catch (err) {
        console.error('Error loading card:', err)
      }
    }

    loadCard()
  }, [showModal, cardData.name])

  const handleImageLoad = useCallback(() => {
    setIsImageLoading(false)
  }, [])

  const handleImageError = useCallback(() => {
    setIsImageLoading(false)
    setHasError(true)
  }, [])

  const imageUrl = cardData.getImage('small') || ''

  return (
    <>
      {isImageLoading && (
        <div className="card-skeleton">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={209} width={150} borderRadius={12} />
          </SkeletonTheme>
        </div>
      )}
      {!hasError && (
        <img
          className='listImage'
          src={imageUrl}
          alt={cardData.name}
          onClick={() => setShowModal(true)}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ display: isImageLoading ? 'none' : 'block' }}
        />
      )}
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
                    <a
                      href={`https://www.cardmarket.com/es/Magic/Products/Search?searchString=${encodeURIComponent(card.cardName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='price-card'
                    >
                      <span className='price-label'>Regular</span>
                      <span className='price-value'>{card.price.normal}€</span>
                    </a>
                  )}
                  {card.price.foil && (
                    <a
                      href={`https://www.cardmarket.com/es/Magic/Products/Search?searchString=${encodeURIComponent(card.cardName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='price-card foil'
                    >
                      <span className='price-label'>Foil</span>
                      <span className='price-value'>{card.price.foil}€</span>
                    </a>
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
