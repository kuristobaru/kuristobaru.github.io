import { useEffect, useState } from 'react';
import './App.css'
import Memorize from './components/Memorize/Memorize';
import useLocalStorage from '../helpers/useLocalStorage';

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [isInGame, setIsInGame] = useState(false);
  const [images, setImages] = useState([]);
  const [name, setName] = useLocalStorage('name', '')
  const [needName, setNeedName] = useState(false);

  useEffect(() => {
    const promise = fetch("https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20")
        promise.then(response => {
            return response.json()
        })
        .then(data => {
          if(difficulty === 'easy'){
            setImages(data.entries.splice(0,10).map(item => item.fields.image.url))
          }else if (difficulty === 'medium'){
            setImages(data.entries.splice(0,15).map(item => item.fields.image.url))
          }else{
            setImages(data.entries.map(item => item.fields.image.url))
          }
        })
        setNeedName(false)
  }, [difficulty, name]);

  const handleBack = () => {
    setIsInGame(false)
  }

  const handlePlayBtn = () => {
    if(name){
      setIsInGame(true)
    }else{
      setNeedName(true) 
    }
  }

  return (
    <div className='App'>
      {isInGame ?
        <Memorize difficulty={difficulty} images={images} handleBack={() => handleBack()}/>
        :
        <div className='container mx-auto bg-cover'>
          <div className='grid grid-rows-5'>
            <div>
            </div>
            <div>
            </div>
            <div className="text-6xl font-bold text-white text-center">
              <div className=''>
                Memorize Modyo
              </div>
            </div>
            <div>
            </div>
            <div className='text-center'>
              <button onClick={() => handlePlayBtn()} className='text-4xl 
                font-bold
                bg-transparent
                animate-pulse
                hover:bg-violet-700 transition ease-in-out duration-300
                text-white 
                text-center 
                border-2 
                rounded-full
                border-sky-500 
                px-10'
              >
                Play!
              </button>
            </div>
            <div className='text-center'>
              <div className="text-3xl font-bold text-white text-center mt-10">
                Difficulty
              </div>
            </div>
          </div>
          <div className='grid grid-rows-3 mt-5'>
            <div className={(difficulty === 'easy' ? 'text-violet-600' : 'text-white')+' text-2xl text-center animate-pulse'}>
              <button onClick={() => setDifficulty('easy')} className='hover:text-violet-600 transition ease-in-out duration-500'>
                Easy
              </button>
            </div>
            <div className={(difficulty==='medium' ? 'text-violet-600' : 'text-white')+' text-2xl text-center animate-pulse'}>
              <button onClick={() => setDifficulty('medium')} className='hover:text-violet-600 transition ease-in-out duration-500'>
                Medium
              </button>
            </div>
            <div className={(difficulty==='hard' ? 'text-violet-600' : 'text-white')+' text-2xl text-center animate-pulse'}>
              <button onClick={() => setDifficulty('hard')} className='hover:text-violet-600 transition ease-in-out duration-500'>
                Hard
              </button>
            </div>
          </div>
          <div className='grid grid-rows-2 mt-10'>
            <div className='grid grid-cols-8'>
              <input className="col-span-2 col-start-4 p-3 rounded-2xl" 
                    placeholder='Please enter your name here' 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
              />
            </div>
            <div className='grid grid-cols-8'>
              {needName &&
                <div className='col-span-2 col-start-4 text-white text-center mt-5'>
                  You must enter your name first!
                </div>
              }
            </div>
          </div>
          
        </div>
      }

      {/* global scope */}
      <div className='grid grid-cols-12 p-10'>
        <audio controls autoplay className='col-span-2 col-start-6'>
          <source src="https://github.com/kuristobaru/kuristobaru.github.io/blob/49ecab61f056846463d5fdc43a462f01a71baaa1/src/assets/soundmemorize.mp3" type="audio/mpeg" />
          Tu navegador no soporta el elemento de audio.
        </audio>
      </div>
    </div>
  )
}

export default App
