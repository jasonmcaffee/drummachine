import React from 'react';
import {DrumMachine} from './pages/DrumMachine';
import {DrumPad} from './pages/DrumPad';
import {kitPlayer} from './services/kitPlayer';
import {attachQwertyListener} from './services/listeners/qwerty';
import {attachPageListener} from './services/listeners/page';
import {core} from './core/core';

let eventBus = core.eventBus;

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			activeAddress: location.hash
		};
		this.attachListeners();

	}

	attachListeners(){
		attachQwertyListener();
		attachPageListener();

		eventBus.page.addressChanged.on(({address})=> this.setState({activeAddress: address}));
	}

  render() {
		console.log(`render called for app: `, this.state.activePage);
		let activePage = this.getActivePage(this.state.activeAddress);
    return (
      <div>
				{activePage}
      </div>
    )
  }

	getActivePage(address){
		let activePage;
		switch(address){
			case '#drummachine':
				activePage =  <DrumMachine kit={kitPlayer.currentKit}></DrumMachine>;
				break;
			case '#drumpad':
			default:
				activePage = <DrumPad kit={kitPlayer.currentKit}></DrumPad>;
		}
		return activePage;
	}
}
