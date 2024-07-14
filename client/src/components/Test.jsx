import React from 'react'

const Test = () => {
    const [value, setValue] = useState("")
  return (
    <div>
        <input onChange={(e)=>setValue(e.target.value)}></input>
        <button></button>
        <p>{value}</p>
    </div>
  )
}

export default Test