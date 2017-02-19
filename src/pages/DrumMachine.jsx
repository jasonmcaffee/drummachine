import {core} from '../core/core';
import React from 'react';
import {attachQwertyListener} from '../services/listeners/qwerty';
import {DrumCell} from '../components/DrumCell';

attachQwertyListener();

export class DrumMachine extends core.View {
	render(){
		console.log(`rendering DrumMachine page`);
		let kit = this.props.kit;
		let drumCellContainer =this.buildDrumcellContainer({sounds:kit.sounds});
		return (
			<div>
				<h1>Hello Drum Machine as</h1>
				{drumCellContainer}
			</div>
		);
	}

	buildDrumcellContainer({sounds}){
		console.log(`buildDrumcellContainer called.`)
		let drumCells = sounds.map(sound=><DrumCell sound={sound}/>);
		return(
			<div className="drumcell-container">{drumCells}</div>
		)
	}
}
