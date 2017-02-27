import {core} from '../../core/core';
import React from 'react';
import {loadKits} from '../../services/kitLoader';

let eventBus = core.eventBus;

export class KitSoundSelector extends core.View {
  constructor(props){
    super(props);
		let kits = loadKits();
    this.state = {
    	selectedKit: kits[0],
			selectedSound: undefined
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
		this.setState({selectedKit});
	}
	handleSoundSelected(sound){

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
			return <div className={className} onClick={()=>this.handleSoundSelected(sound)}>{sound.name}</div>
		});
		return soundElements;
	}

}
