import './Modal.css'

export function Modal ({ visible, handleModalClose, children, card }) {
  const handleClose = (event) => {
    if (event.target.id === 'modalContainer' || event.target.id === 'closeButton') handleModalClose()
  }

  if (!visible) return null

  return (
    <div
      className='modal-overlay'
      id='modalContainer'
      onClick={handleClose}
    >
      <div className='modal-content'>
        <button 
          id='closeButton' 
          className='modal-close-button'
          onClick={handleClose}
        >
          ×
        </button>
        
        <div className='modal-card-section'>
          <img className='modal-image' src={card.image} alt={card.cardName} />
          <div className='modal-card-info'>
            <div className="card-info-item">
              <span className="info-label">Artist</span>
              <span className="info-value">{card.artist}</span>
            </div>
            <div className="card-info-item">
              <span className="info-label">Edition</span>
              <span className="info-value">{card.set}</span>
            </div>
          </div>
        </div>

        <div className='modal-details-section'>
          {children}
        </div>
      </div>
    </div>
  )
}
