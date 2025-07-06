import React from 'react'
import './SingleCard.css'

export const SingleCard = ({card, handleChoice, flipped, disabled}) => {
  const handleClick = () => {
    if(!disabled && !flipped){
      handleChoice(card)
    }
  }
  return (
    <div data-card-id={card.id} className={`single-card${flipped ? ' flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
        <div className="card-front">
          <img 
            src="https://i.ibb.co/b5x3dbz/cover.png"
            className="rounded-2xl border-2 border-white object-cover sm:h-24 w-24 xl:h-32 w-32"
            alt='Card back'
            draggable={false}
          />
        </div>
        <div className="card-back">
          <img 
            src={card.src}
            className="rounded-2xl border-2 border-white object-cover sm:h-24 w-24 xl:h-32 w-32"
            alt='Card front'
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}