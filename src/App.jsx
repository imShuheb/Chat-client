import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChatRoom from './Chat'
import JoinRoom from './JoinRoom'
import CreateRoom from './CreateRoom'

function App() {

  return (
    <>
      {/* <ChatRoom /> */}
      <CreateRoom />
      <JoinRoom />
    </>
  )
}

export default App
