import React from 'react';
import {DrumMachine} from './pages/DrumMachine';
import {DrumPad} from './pages/DrumPad';
import {kitPlayer} from './services/kitPlayer';
import {attachQwertyListener} from './services/listeners/qwerty';
export default class App extends React.Component {
	constructor(props){
		super(props);
		attachQwertyListener();
	}
  render() {
    return (
      <div>
        <DrumPad kit={kitPlayer.currentKit}></DrumPad>
      </div>
    )
  }
}
