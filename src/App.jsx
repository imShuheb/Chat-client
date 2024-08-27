import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatRoom from './Chat'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'
import Checkout from './Checkout'

function App() {

  return (
    <>
      {/* <ChatRoom /> */}
      <CreateRoom />
      <JoinRoom />
      {/* <Checkout /> */}
    </>
  )
}

export default App
