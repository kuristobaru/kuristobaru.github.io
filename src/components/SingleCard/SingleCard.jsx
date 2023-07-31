import React from 'react'
import './SingleCard.css'

export const SingleCard = ({card, handleChoice, flipped, disabled}) => {

  const handleClick = () => {
    if(!disabled){
      handleChoice(card)
    }
  }
  return (
    
      <>
        {flipped ?
        <img 
          src={card.src} 
          className="rounded-2xl border-2 border-white"
          style={{height:120, width:120, objectFit:'cover'}} 
          onClick={handleClick}
          alt='Card is actually in front position'
        />
        :
        // <div 
        //   className='bg-purple-700 rounded-2xl 
        //               border-2 
        //             border-white ' 
        //   style={{objectFit:'cover'}}
        //   onClick={handleClick}
        //   alt='Card is actually in back position'>
        //   </div>

        <img 
          src='../public/img/cover.png' 
          className='rounded-2xl 
                    border-2 
                    border-white' 
          style={{height:120, width:120, objectFit:'cover'}}
          onClick={handleClick}
        /> 
        }
      </>
    
  )
}