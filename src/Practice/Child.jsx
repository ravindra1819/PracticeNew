import { useState } from "react"

export default function Child({ sendData , change , blur }) {

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => sendData('green')}>Green</button>
        <button onClick={() => sendData('blue')}>Blue</button>
        <button onClick={() => sendData('red')}>Red</button>
      </div>
      <div>
        <p>on Change : {change}</p>
        <p>on Blur : {blur}</p>
      </div>
    </>

  )
}