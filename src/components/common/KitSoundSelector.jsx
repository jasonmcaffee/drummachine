import {core} from '../../core/core';
import React from 'react';
import {loadKits} from '../../services/kitLoader';

let eventBus = core.eventBus;

/**
* Formats the kit configs found in kitLoader into a nested selection menu,
* where the kit is selected, and all sounds in the kit are displayed and can be
* chosen so a new sound can be played, added to a drummachine, etc.
*/
export class KitSoundSelector extends core.View {
  constructor(props){
    super(props);
		let kits = loadKits();
    this.state = {
    	selectedKit: props.selectedKit || kits[0],
			selectedSound: props.selectedSound || kits[0].sounds[0]
		};
  }
  componentWillMount() {}
  componentDidMount() {
    this.offs = [
      eventBus.event.on(({data})=>{})
    ]
  }
  componentWillUnmount() {
    this.offs.forEach(off=>off());
  }

  handleKitSelected(selectedKit){
    //change the selected sound to the first one in the kit, since previous sound doesn't apply
    this.handleSoundSelected(selectedKit.sounds[0], selectedKit);
	}
	handleSoundSelected(selectedSound, selectedKit){
    let {soundSelectedContext} = this.props; //should be the machineRow
    //send new sound and kit so uis can update their representative elements.
    eventBus.kit.soundSelected({sound:selectedSound, kit:selectedKit,
      previousSound:this.state.selectedSound, previousKit:this.state.selectedKit, soundSelectedContext});
    this.setState({selectedSound, selectedKit});
	}
  render() {
		let kits = loadKits();
		let kitSelector = this.createKitSelectors();
		let soundSelectors = this.createSoundSelectors(this.state.selectedKit);
  	return (
      <div className="kits-selector">
				<div className="menu-items">
					{kitSelector}
				</div>
				<div className="menu-items">
					{soundSelectors}
				</div>
      </div>
    );
  }

	createKitSelectors(){
		let kits = loadKits();
		let kitElements = kits.map(kit=>{
			let className = this.state.selectedKit === kit ? "menu-item selected" : "menu-item";
			return <div className={className} onClick={()=>this.handleKitSelected(kit)}>{kit.name}</div>
		});
		return kitElements;
	}

	createSoundSelectors(kit){
		let sounds = kit.sounds;
		let soundElements = sounds.map(sound=>{
			let className = this.state.selectedSound === sound ? "menu-item selected" : "menu-item";
			return <div className={className} onClick={()=>this.handleSoundSelected(sound, kit)}>{sound.name}</div>
		});
		return soundElements;
	}

}
