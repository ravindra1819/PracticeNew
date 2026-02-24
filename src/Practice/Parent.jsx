import { useState } from "react"
import Child from "./Child"

export default function Parent() {

  const [value, setValue] = useState('')
  const [field, setField] = useState([])
  const [onBlur, setOnBlur] = useState([])

  const handleClick = (color) => {
    setValue(color)
  }

  const handleChange = (e) => {
    setField(e.target.value)
  }

  const handleBlur = (e) => {
    setOnBlur(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Name / find color"
        style={{ backgroundColor: value }}
        onChange={handleChange}
        onBlur={handleBlur} />
      <div>
        <Child sendData={handleClick}
        change={field}
        blur={onBlur}
        />
      </div>
    </div>
  )
}