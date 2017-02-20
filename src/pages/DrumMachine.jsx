import {core} from '../core/core';
import React from 'react';
import {DrumMachineCell} from '../components/drummachine/DrumMachineCell';
import {drumMachinePlayer} from '../services/drummachinePlayer';
import {DrumMachineControls} from '../components/drummachine/DrumMachineControls';

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
				console.log(`activating cell`, cell);
				cell.activated = activated;
			})
		]
	}

	componentWillUnmount(){
		this.offs.forEach(off=>off());
	}
	render(){
		console.log(`rendering DrumMachine page`);
		let {machine, kits} = this.props;
		let drumCellContainer =this.buildDrumcellContainer({kits, machine});
		return (
			<div className="drummachine-page">
				<h1>Drum Machine</h1>
				<DrumMachineControls isPlaying={drumMachinePlayer.isPlaying} beatsPerMinute={drumMachinePlayer.machine.beatsPerMinute}/>
				<div className="drummachine">
					{drumCellContainer}
				</div>
			</div>
		);
	}

	buildDrumcellContainer({kits, machine}){
		console.log(`buildDrumcellContainer called.`);
		let {cellsPerRow} = machine;
		let cellRows = machine.rows.map(machineRow=>this.buildDrumCellRow({machineRow, cellsPerRow, kits}));
		return(
			<div className="drumcell-row-container">{cellRows}</div>
		)
	}

	buildDrumCellRow({machineRow, kits}){
		let {kitName, soundName, cells} = machineRow;
		let sound = kits.find(kit=>kit.name===kitName).sounds.find(sound=>sound.name===soundName);
		let drumCells = cells.map(cell=><DrumMachineCell sound={sound} cell={cell} />);
		return(
			<div className="drumcell-row">
				<div className="row-name">
					{soundName}
				</div>
				{drumCells}
			</div>
		);
	}
}
