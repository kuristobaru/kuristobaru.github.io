import React, { useEffect, useState } from 'react'
import { SingleCard } from '../SingleCard/SingleCard';
// import './Memorize.scss'

const Memorize = ({difficulty, handleBack, images}) => {

    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [turns, setTurns] = useState(0);
    const [tries, setTries] = useState(0);

    useEffect(() => {
        if(choiceOne && choiceTwo){
            if (choiceOne === choiceTwo){
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne){
                                card.matched = true
                                return card
                        }else{
                            return card
                        }
                    })
                })
                newTry()
            }else{
                console.log('THOSE CARDS NOT MATCH')
                newTry()    
            }
        }
    }, [choiceOne, choiceTwo]);

    console.log(cards)
    useEffect(() => {
        //shuffleling cards
        shuffleCards()
    }, []);

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const shuffleCards = () => {
        //adding field matched into every img url & setting to false
        const cardWithFlag = images.map(src => ({src, matched: false}))

        const mixingCards = [...cardWithFlag, ...cardWithFlag].sort(() => 0.5 - Math.random()).map((card) => ({...card, id: Math.random()}))
        setCards(mixingCards)
        setTurns(0)
    }

    const newTry = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTries(prevTry => prevTry + 1)
    }

    return (
        <div className='memorize-comp'>
            <div className='container mx-auto bg-cover'>
                <div className='grid grid-rows-4 mt-10'>
                    <div className='grid grid-cols-12 gap-8 content-center'>
                        <button className='text-xl
                            font-bold
                            bg-transparent
                            hover:bg-violet-700 transition ease-in-out duration-300
                            text-white 
                            text-center 
                            border-2
                            col-start-5
                            col-span-2
                            rounded-full
                            border-sky-500
                            px-10'
                            onClick={handleBack}>
                                Go Back
                        </button>
                        <button className='text-xl 
                            font-bold
                            bg-transparent
                            hover:bg-violet-700 transition ease-in-out duration-300
                            text-white
                            text-center 
                            border-2
                            col-span-3
                            rounded-full
                            border-sky-500
                            px-10'
                            onClick={() => shuffleCards()}>
                                Start again
                        </button>
                    </div>
                </div>
                {/* {mixingCards ?
                    <div className='grid grid-cols-1 text-white text-center text-4xl'>
                        Cargando...
                    </div>
                    : */}
                    <div className='grid grid-cols-10 gap-5'>
                        {cards?.map((img) => {
                            return <SingleCard 
                                        key={img.id}
                                        card={img.src}
                                        handleChoice={handleChoice}
                                        flipped={img === choiceOne || img === choiceTwo || img.matched}
                                    />
                        })}
                    </div>
                {/* } */}
            </div>
        </div>
    )
}

export default Memorize