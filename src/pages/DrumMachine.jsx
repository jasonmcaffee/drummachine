import {core} from '../core/core';
import React from 'react';
import {DrumPadCell} from '../components/drumpad/DrumPadCell';

export class DrumMachine extends core.View {
	render(){
		console.log(`rendering DrumMachine page`);
		let kit = this.props.kit;
		let drumCellContainer =this.buildDrumcellContainer({sounds:kit.sounds});
		return (
			<div className="drummachine-page">
				<h1>Drum Machine</h1>
				<div className="drummachine">
					{drumCellContainer}
				</div>
			</div>
		);
	}

	buildDrumcellContainer({sounds}){
		console.log(`buildDrumcellContainer called.`)
		let drumCells = sounds.map(sound=><DrumPadCell sound={sound}/>);
		return(
			<div className="drumcells-container">{drumCells}</div>
		)
	}
}
