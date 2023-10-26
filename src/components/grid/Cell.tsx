import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
// import { REVEAL_TIME_MS, LOADING_REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
// import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { GuessContext } from '../../context/GameStateContext'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  // isCompleted?: boolean
  //isLoading?:boolean
  position?: number
  row?:number
  completedRow?: boolean
}

export const Cell = ({
    value,
    status,
    isRevealing,
    position = 0,
    row = 0,
    completedRow = true
  }: Props) => {
  const isFilled = value
  const revealTime = 350 
  const isHighContrast = getStoredIsHighContrastMode()

  const [currentStatus, setCurrentStatus] = useState(null||'');
  const [animationDelay, setAnimationDelay] = useState('0ms');
  // const [statusChanged, setStatusChanged] = useState(isRevealing);
  // const [flip, setFlip] = useState(1);
  const [classes, setClasses] = useState("");
  const [key] = useState(row);

  
  const gameStateContext = useContext(GuessContext);

useEffect(()=>{
  const delay = isRevealing ? `${(position * 400)}ms` : `${(position * 100) + revealTime + row * 100}ms`;
  setAnimationDelay(delay);
}, [isRevealing, position, row, setAnimationDelay]);

  useEffect(() => {
    if (status) {
      setCurrentStatus(status);
    }
  }, [status, setCurrentStatus]);

  useEffect(()=>{
    const newClassNames = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold  dark:text-white',
    {
      // no status set yet
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !currentStatus,
      // cell has a value AND a status
      'border-black dark:border-slate-100': value && !currentStatus,
      // cell has a value but "absent" status
      'absent shadowed  dark:absent text-white border-slate-400 dark:border-slate-700': //absent-color
        currentStatus === 'absent',
      // high contrast styles
      'correct shadowed bg-orange-500 text-white border-orange-500':
        currentStatus === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        currentStatus === 'present' && isHighContrast,
      // low contrast styles
      'correct shadowed  text-white correct-border': //correct-color
        currentStatus === 'correct' && !isHighContrast,
      'present shadowed  text-white present-border': //present-color
        currentStatus === 'present' && !isHighContrast,
      // animations
      'cell-fill-animation': isFilled,
      'cell-reveal': completedRow //isRevealing,
    }
  );
  setClasses(newClassNames);
  }, [currentStatus, isFilled, isHighContrast, setClasses, value, isRevealing, completedRow]);

  

  function changeStatus(): void {
    console.log(currentStatus);
    if (!currentStatus){
      return
    }
    let newStatus = currentStatus;
    let newState = '';
    switch(currentStatus) {
      case 'absent': 
        newStatus = 'correct'; 
        newState = '2';
        break;
      case 'present': 
        newStatus ='absent'; 
        newState = '0';
        break;
      case 'correct': 
        newStatus ='present'; 
        newState = '1';
        break;
    }
    console.log({currentStatus, newStatus})
    setCurrentStatus(newStatus);
    setAnimationDelay('0ms');
        
    // update the gameStateContext using the key
    const newDictionary = {...gameStateContext?.dictionary};
    const newGuess = {...newDictionary[key]};



    if (!newGuess.state)
    {
      newGuess.state = '00000';
    }


   
    newDictionary[key] = newGuess;

    newGuess.state = `${newGuess.state.slice(0, position)}${newState}${newGuess.state.slice(position + 1)}`;
    
    gameStateContext?.setDictionary(newDictionary);

  }

  const cellStyle = {
    animationDelay
  };

  
  return (
    <div className={classes} style={{ animationDelay }} onClick={changeStatus}  >
      <div className="letter-container" style={cellStyle}  >
        {value}
      </div>
    </div>
  )
}
