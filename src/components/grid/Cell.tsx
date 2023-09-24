import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS, LOADING_REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import classNames from 'classnames'
import { useEffect, useState } from 'react'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  isLoading?:boolean
  position?: number
  row?:number
}

export const Cell = ({
    value,
    status,
    isRevealing,
    position = 0,
    row = 0
  }: Props) => {
  const isFilled = value
  const revealTime = 350 
  const animationDelay = isRevealing ? `${(position * 400)}ms` : `${(position * 100) + revealTime + row * 100}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  console.log(`value: ${value} status:${status} animationDelay: ${animationDelay}`)

  const [currentStatus, setCurrentStatus] = useState('absent');

  useEffect(() => {
    if (status) {
      setCurrentStatus(status);
    }
  }, [status, setCurrentStatus]);

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold  dark:text-white',
    {
      // no status set yet
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      // cell has a value AND a status
      'border-black dark:border-slate-100': value && !status,
      // cell has a value but "absent" status
      'absent shadowed absent-color dark:absent text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      // high contrast styles
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      // low contrast styles
      'correct shadowed correct-color text-white correct-border':
        currentStatus === 'correct' && !isHighContrast,
      'present shadowed present-color text-white present-border':
        status === 'present' && !isHighContrast,
      // animations
      'cell-fill-animation': isFilled,
      'cell-reveal': true// isRevealing,
    }

  )

  function changeStatus(): void {
    switch(currentStatus) {
      case 'absent': setCurrentStatus('correct'); break;
      case 'correct': setCurrentStatus('present'); break;
      case 'present': setCurrentStatus('absent'); break;
    }
  }

  return (
    <div className={classes} style={{ animationDelay }} onClick={changeStatus}>
      <div className="letter-container" style={{ animationDelay }}  >
        {value}
      </div>
    </div>
  )
}
