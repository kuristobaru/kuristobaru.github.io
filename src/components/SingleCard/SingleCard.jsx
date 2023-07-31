import React from 'react'

export const SingleCard = ({card, handleChoice}) => {
  const handleClick = () => {
    handleChoice(card)
  }
  return (
    <>
      <img 
        src={card.card} 
        className='rounded-2xl 
                   border-2 
                   border-white' 
        style={{height:120, width:120, objectFit:'cover'}} 
        onClick={handleClick}
      />
      <img 
        src='../public/img/cover.png' 
        className='rounded-2xl 
                   border-2 
                   border-white' 
        style={{height:120, width:120, objectFit:'cover'}}
        onClick={handleClick}
      />
    </>
  )
}