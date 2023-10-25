import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS, LOADING_REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  isLoading?:boolean
  position?: number
  row?:number
}

export const CellCurrent = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
  row = 0
}: Props) => {
  const isFilled = value && !isCompleted
  const revealTime = isRevealing ? REVEAL_TIME_MS : LOADING_REVEAL_TIME_MS
  const animationDelay =  `${(position * 100) + revealTime + row * 100}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold  dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed absent-color dark:absent text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed correct-color text-white correct-border':
        status === 'correct' && !isHighContrast,
      'present shadowed present-color text-white present-border':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
