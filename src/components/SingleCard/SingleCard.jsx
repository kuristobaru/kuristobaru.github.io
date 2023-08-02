import React, { useState } from 'react'
import './SingleCard.css'

export const SingleCard = ({card, handleChoice, flipped, disabled}) => {
 

  const handleClick = () => {

    if(!disabled){
      handleChoice(card)
    }
  }
  return (
    
      <div className='single-card'>
        {flipped ?
        <img 
          src={card.src} 
          className={`rounded-2xl
          rotate-y-once
          border-2 
          border-white
          object-cover
          sm:h-24 w-24
          xl:h-32 w-32 ${flipped ? 'transform rotate-y-180' : ''}`}
          onClick={handleClick}
          alt='Card is actually in front position'
        />
        :
        <img 
          src="https://i.ibb.co/b5x3dbz/cover.png"
          className={`transform rounded-2xl 
          rotate-y-once
          border-2 
          border-white
          object-cover
          sm:h-24 w-24
          xl:h-32 w-32 ${flipped ? 'transform rotate-y-180' : ''}`}
          // style={{height:60, width:60, objectFit:'cover'}}
          onClick={handleClick}
        /> 
        }
      </div>
    
  )
}