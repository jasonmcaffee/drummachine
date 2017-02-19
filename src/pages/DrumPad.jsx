import {core} from '../core/core';
import React from 'react';
import {DrumPadCell} from '../components/drumpad/DrumPadCell';

export class DrumPad extends core.View {
	render(){
		console.log(`rendering DrumMachine page`);
		let kit = this.props.kit;
		let drumCellContainer =this.buildDrumcellContainer({sounds:kit.sounds});
		return (
			<div className="drumpad-page">
				<h1>Hello Drum Machine as</h1>
				<div className="drumpad">
					{drumCellContainer}
				</div>
			</div>
		);
	}

	buildDrumcellContainer({sounds}){
		console.log(`buildDrumcellContainer called.`);
		let drumCells = sounds.map(sound=><DrumPadCell sound={sound}/>);
		return(
			<div className="drumpadcells-container">{drumCells}</div>
		)
	}
}
