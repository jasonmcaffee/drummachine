import React from 'react';
import {DrumMachine} from './pages/DrumMachine';
import {DrumPad} from './pages/DrumPad';
import {kitPlayer} from './services/kitPlayer';
import {attachQwertyListener} from './services/listeners/qwerty';
import {attachPageListener} from './services/listeners/page';
import {loadKits} from './services/kitLoader';

import {core} from './core/core';

let eventBus = core.eventBus;

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			activeAddress: location.hash
		};
	}
	componentDidMount(){
		this.offs=[
			attachQwertyListener(),
			attachPageListener(),
			eventBus.page.addressChanged.on(({address})=> this.setState({activeAddress: address}))
		];
	}
	componentWillUnmount(){
		this.offs.forEach(off=>off());
	}

  render() {
		console.log(`render called for app: `, this.state.activeAddress);
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

			case '#drumpad':
				activePage = <DrumPad kit={kitPlayer.currentKit}></DrumPad>;
				break;
			case '#drummachine':
			default:
				activePage =  <DrumMachine kits={loadKits()}></DrumMachine>;
		}
		return activePage;
	}
}
