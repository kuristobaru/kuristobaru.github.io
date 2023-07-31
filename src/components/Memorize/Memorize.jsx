import React, { useEffect, useState } from 'react'
import { SingleCard } from '../SingleCard/SingleCard';
import useLocalStorage from '../../../helpers/useLocalStorage';
// import './Memorize.scss'

const Memorize = ({difficulty, handleBack, images}) => {

    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [tries, setTries] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [matchCounter, setMatchCounter] = useState(0);
    const [wrongCounter, setWrongCounter] = useState(0);
   const [playerName, setPlayerName] = useLocalStorage('name', '');

    useEffect(() => {
        if(choiceOne && choiceTwo){
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src){
                setMatchCounter(prev => prev+1)
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src){
                                return {...card, matched: true}
                        }else{
                            return card
                        }
                    })
                })
                newTry()
            }else{
                setWrongCounter(prev => prev +1)
                setTimeout(() => newTry(), 1000)
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
    }

    const newTry = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTries(prevTry => prevTry + 1)
        setDisabled(false)
    }

    return (
        <div className='memorize-comp'>
            <div className='container mx-auto'>
                <div className='grid grid-rows-3 mt-10 gap-5'>
                    <div className='grid grid-cols-12'>
                        <button className='text-xl
                            font-bold
                            bg-transparent
                            hover:bg-violet-700 transition ease-in-out duration-300
                            text-white 
                            text-center 
                            border-2
                            col-span-2
                            rounded-full
                            border-sky-950'
                            onClick={handleBack}>
                                Go Back
                        </button>
                    </div>
                    <div className='grid grid-cols-8'>
                        <button className='text-xl 
                            font-bold
                            bg-transparent
                            hover:bg-violet-700 transition ease-in-out duration-300
                            text-white
                            text-center 
                            border-2
                            col-span-2
                            col-start-4
                            rounded-full
                            border-sky-500'
                            onClick={() => shuffleCards()}>
                                Start again
                        </button>
                    </div>
                    <div className='text-white text-center text-2xl'>
                        {playerName+"'s Game"}
                    </div>
                </div>
                <div className='grid grid-cols-10 gap-5 mt-10'>
                        {cards?.map((card) => {
                            return <SingleCard 
                                        key={card.id}
                                        card={card}
                                        handleChoice={handleChoice}
                                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                                        disabled={disabled}
                                    />
                        })}
                </div>
                <div className='grid grid-cols-3 mt-10'>
                    <div className='text-lime-500 text-2xl text-center'>
                        Matches: {matchCounter}
                    </div>
                    <div className='text-red-700 text-2xl text-center'>
                        Wrongs: {wrongCounter}
                    </div>
                    <div className='text-white text-2xl text-center'>
                        Tries: {tries}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Memorize