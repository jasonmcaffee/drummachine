import React from 'react';
import {DrumMachine} from './pages/DrumMachine';
import {kitPlayer} from './services/kitPlayer';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <DrumMachine kit={kitPlayer.currentKit}></DrumMachine>
      </div>
    )
  }
}
