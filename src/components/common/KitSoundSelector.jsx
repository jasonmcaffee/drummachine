import {core} from '../../core/core';
import React from 'react';
import {loadKits} from '../../services/kitLoader';

let eventBus = core.eventBus;

export class KitSoundSelector extends core.View {
  constructor(props){
    super(props);
    this.state = {};
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

  render() {
		let kits = loadKits();
		let kitSelector = this.createKitSelector();
  	return (
      <div className="kits-selector" >
				{kitSelector}
      </div>
    );
  }

	createKitSelector(){
		let kits = loadKits();
		let kitElements = kits.map(kit=>{
			return <div className="kit-selector">{kit.name}</div>
		});
		return kitElements;
	}
}
