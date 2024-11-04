import React, { useState } from 'react'

function MyComponent() {
  const [allowDuplicates, setAllowDuplicates] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAllowDuplicates(event.target.checked)
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={allowDuplicates}
          onChange={handleChange}
        />
        Allow Duplicates
      </label>
    </div>
  )
}

export default MyComponent
