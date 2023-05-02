import './Modal.css'

export function Modal ({ visible, handleModalClose, children, card }) {
  const handleClose = (event) => {
    if (event.target.id === 'modalContainer' || event.target.id === 'closeButton') handleModalClose()
  }
  if (!visible) return null
  return (

    <div
      className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center'
      id='modalContainer'
      onClick={handleClose}
    >
      <div className='flex flex-row flex-nowrap bg-gradient-to-r from-indigo-500 from-10 via-violet-400 to-indigo-400 to-100% p-5  rounded gap-x-1 '>
        <div className='text-black max-w-xs'>
          <img className='modalImage' src={card.image} />
          <div className='flex flex-col text-center justify-center items-center'>
            <p className='float-left '><strong>Artist</strong>: {card.artist}</p>
            <p className='float-left'> <strong>Edition</strong>: {card.set}</p>
          </div>

        </div>

        {children}
        {/*
            <button id='closeButton' className='bg-violet-400 mt-4 float-right' onClick={handleClose}>Close</button>
    */}

      </div>

    </div>

  )
}
