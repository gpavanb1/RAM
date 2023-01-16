import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import { useState } from 'react';

import LinkBox from './components/LinkBox';
import Player from './components/Player';


export const MyContext = React.createContext();

function App() {
  const [state, setState] = useState({})

  return (
    <div>
      <h2 className='mx-2'> Repeat After Me (RAM) </h2>

      <MyContext.Provider value={{ state, setState }}>
        < LinkBox />
      </MyContext.Provider>

      <br />
      <Player videoId={state.videoId} />

    </div>
  )
}

export default App;
