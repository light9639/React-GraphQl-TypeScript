import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Continents from "./components/Continents";

export default function App(): JSX.Element {
  return (
    <div className="App">
      <div>
        <a href="https://graphql.org/" target="_blank">
          <img src="https://camo.githubusercontent.com/07c382b68200c1a86d52d1682346e73e038b2f160c9afbc0af773fb3646882c8/68747470733a2f2f7777772e766563746f726c6f676f2e7a6f6e652f6c6f676f732f6772617068716c2f6772617068716c2d69636f6e2e737667" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>GraphQl + React</h1>
      <Continents></Continents>
    </div>
  )
}
