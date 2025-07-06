import { useEffect, useState, useRef } from 'react';
import './App.css'
import Memorize from './components/Memorize/Memorize';
import useLocalStorage from '../helpers/useLocalStorage';

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [isInGame, setIsInGame] = useState(false);
  const [images, setImages] = useState([]);
  const [name, setName] = useLocalStorage('name', '')
  const [needName, setNeedName] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const [pageTransition, setPageTransition] = useState('');

  useEffect(() => {
    const promise = fetch("https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20")
        promise.then(response => {
            return response.json()
        })
        .then(data => {
          if(difficulty === 'easy'){
            setImages(data.entries.slice(0,10).map(item => item.fields.image.url))
          }else if (difficulty === 'medium'){
            setImages(data.entries.slice(0,15).map(item => item.fields.image.url))
          }else{
            setImages(data.entries.map(item => item.fields.image.url))
          }
        })
        setNeedName(false)
  }, [difficulty, name]);

  // Asegura que la música empiece desde el principio cada vez que se monta el componente
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, []);

  // Maneja el mute/unmute global
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleBack = () => {
    setPageTransition('fade-page-exit');
    setTimeout(() => {
      setIsInGame(false);
      setPageTransition('fade-page-enter');
      setTimeout(() => setPageTransition('fade-page-active'), 30);
    }, 500);
  }

  const handlePlayBtn = () => {
    if(name){
      setPageTransition('fade-page-exit');
      setTimeout(() => {
        setIsInGame(true);
        setPageTransition('fade-page-enter');
        setTimeout(() => setPageTransition('fade-page-active'), 30);
      }, 500);
    }else{
      setNeedName(true) 
    }
  }

  // Inicializar transición al cargar
  useEffect(() => {
    setPageTransition('fade-page-enter');
    setTimeout(() => setPageTransition('fade-page-active'), 30);
  }, [isInGame]);

  return (
    <div className='App'>
      {/* Botón global para mutear/desmutear */}
      <button
        onClick={() => setIsMuted((prev) => !prev)}
        className='fixed top-4 right-4 z-50 bg-violet-700 text-white rounded-full px-4 py-2 shadow-lg hover:bg-violet-900 transition duration-300'
        aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
      >
        {isMuted ? '🔇 Silenciar' : '🔊 Sonido'}
      </button>
      {isInGame ?
        <div className={`fade-page ${pageTransition}`}>
          <Memorize difficulty={difficulty} images={images} handleBack={() => handleBack()}/>
        </div>
        :
        <div className={`fade-page ${pageTransition} container mx-auto bg-cover`}>
          <div className='grid grid-rows-5'>
            <div>
            </div>
            <div>
            </div>
            <div className="text-6xl font-bold text-white text-center grid place-content-center">
              <div className=''>
                Memorize Modyo
              </div>
            </div>
            <div>
            </div>
            <div className='text-center grid place-content-center'>
              <button onClick={() => handlePlayBtn()} className='text-4xl 
                font-bold
                bg-transparent
                pl-20 pr-20 pt-2 pb-2
                animate-pulse
                hover:bg-violet-700 transition ease-in-out duration-300
                text-white 
                text-center 
                border-2 
                rounded-full
                shadow-xl shadow-cyan-500/50
                border-sky-500 
                '
              >
                Play!
              </button>
            </div>
            <div className='grid place-content-center'>
              <div className="text-3xl font-bold text-white text-center mt-10 min-[320px]:col-span-6 min-[320px]:col-start-2">
                Difficulty
              </div>
            </div>
          </div>
          <div className='grid place-content-center'>
            <div className='grid grid-rows-3 mt-5 min-[320px]:col-span-6 min-[320px]:col-start-2'>
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
          </div>
          <div className='grid grid-rows-2 mt-10'>
            <div className='grid place-content-center'>
                {needName &&
                  <div className='col-span-2 col-start-4 text-xl text-center text-white animate-bounce'>
                    You must enter your name first!
                  </div>
                }
            </div>
            <div className='grid place-content-center'>
              <input className="pl-20 pr-20 pt-2 pb-2 rounded-2xl caret-pink-500" 
                    placeholder='Please enter your name' 
                    onChange={(e) => setName(e.target.value)} 
                    value={name}
              />
            </div>
            
          </div>
          
        </div>
      }

      {/* global scope */}
      <div className='grid grid-rows-1 mb-10'>
        <div className='grid place-content-center'>
          <audio
            ref={audioRef}
            loop
            autoPlay
            muted={isMuted}
            className='mt-10 hidden'
            onPlay={() => { if (audioRef.current.currentTime === 0) audioRef.current.play(); }}
          >
            <source src="https://raw.githubusercontent.com/kuristobaru/kuristobaru.github.io/main/src/assets/soundmemorize.mp3" type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      </div>
    </div>
  )
}

export default App
