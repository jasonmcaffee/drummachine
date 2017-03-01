import {core} from '../core/core';
import React from 'react';
import {DrumMachineCell} from '../components/drummachine/DrumMachineCell';
import {drumMachinePlayer} from '../services/drummachinePlayer';
import {DrumMachineControls} from '../components/drummachine/DrumMachineControls';
import {RowSoundSelector} from '../components/drummachine/RowSoundSelector';
import {drumMachine} from '../models/DrumMachine';

let eventBus = core.eventBus;

export class DrumMachine extends core.View {
	constructor(props){
		super(props);
		this.state = {
			isPlaying: drumMachinePlayer.isPlaying
		};
	}

	componentDidMount(){
		this.offs =[
			eventBus.drumMachineCell.activatedToggle.on(({activated, cell})=>{
				//console.log(`activating cell`, cell);
				cell.activated = activated;
			}),
			eventBus.drumMachine.configChange.on(({machineConfig})=>{
				console.log(`new machine config: ${JSON.stringify(machineConfig, null, 2)}`)
				this.forceUpdate();
			})
		]
	}

	componentWillUnmount(){
		this.offs.forEach(off=>off());
	}
	render(){
		console.log(`rendering DrumMachine page`);
		let {kits} = this.props;
		let machine = drumMachinePlayer.machine;
		let drumCellContainer =this.buildDrumcellContainer({kits, machine});
		return (
			<div className="drummachine-page">
				<h1>Drum Machine</h1>
				<DrumMachineControls isPlaying={drumMachinePlayer.isPlaying} beatsPerMinute={machine.beatsPerMinute} notesPerMeasure={machine.notesPerMeasure} cellsPerRow={machine.cellsPerRow}/>
				<div className="drummachine ">
					{drumCellContainer}
				</div>
			</div>
		);
	}

	buildDrumcellContainer({kits, machine}){
		console.log(`buildDrumcellContainer called. cellsPerRow: ${machine.cellsPerRow}`);
		let {cellsPerRow, notesPerMeasure, totalNumberOfMeasures} = machine;
		let cellRows = machine.rows.map(machineRow=>this.buildDrumCellRow({machineRow, cellsPerRow, kits, notesPerMeasure, totalNumberOfMeasures}));
		return(
			<div className="drumcell-row-container">{cellRows}</div>
		)
	}

	buildDrumCellRow({machineRow, kits, notesPerMeasure, cellsPerRow, totalNumberOfMeasures}){
		let {kitName, soundName, cells} = machineRow;
		let kit = kits.find(kit=>kit.name===kitName)
		let sound = kit.sounds.find(sound=>sound.name===soundName);
		// let drumCells = cells.map(cell=><DrumMachineCell sound={sound} cell={cell} />);
		//group drum cells into measures (array of measures where each measure is an array of cells
		// [
		// 	[cell, cell, cell, cell],   //measure 1
		// 	[cell, cell, cell, cell]    //measure 2
		// ]
		let measures = cells.slice(0, cellsPerRow).reduce((accumulator, cell, i)=>{
			let measureIndex = Math.floor(( i/notesPerMeasure) % (cellsPerRow));
			console.log(`measureIndex: ${measureIndex} i: ${i}  totalNumberOfMeasures:${totalNumberOfMeasures}`);
			let measure = accumulator[measureIndex] = accumulator[measureIndex] || [];
			measure.push(cell);
			return accumulator;
		}, []);
		console.log(`measures`, measures);

		let measureWidth = (100 / totalNumberOfMeasures) + '%';
		let cellWidth = (100 / notesPerMeasure) + '%';
		let measureElements = measures.map((cellsForMeasure)=>{
			let drumCellElements = cellsForMeasure.map(cell=><DrumMachineCell sound={sound} cell={cell} cellWidth={cellWidth}/>);
			return(
				<div className="measure" style={{"width" : measureWidth}}>{drumCellElements}</div>
			);
		});
		return(
			<div className="drumcell-row">
				<div className="row-name">
					<RowSoundSelector sound={sound} kit={kit}/>
				</div>
				{measureElements}
			</div>
		);
	}
}
