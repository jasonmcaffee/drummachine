import {core} from '../core/core';
import React from 'react';
import {DrumMachineCell} from '../components/drummachine/DrumMachineCell';
import {drumMachinePlayer} from '../services/drummachinePlayer';

let eventBus = core.eventBus;
export class DrumMachine extends core.View {
	constructor(props){
		super(props);
		this.state = {
			isPlaying: false
		};
		let {machine}=this.props;
		eventBus.drumMachineCell.activateToggle.on(({activated, cell})=>{
			console.log(`activating cell`, cell);
			cell.activated = activated;
		});

	}
	render(){
		console.log(`rendering DrumMachine page`);
		let {machine, kits} = this.props;
		let drumCellContainer =this.buildDrumcellContainer({kits, machine});
		let buttonText = this.state.isPlaying ? 'stop' : 'play';
		let playStopButton = <button onClick={()=>this.playOrStop()}>{buttonText}</button>;
		return (
			<div className="drummachine-page">
				<h1>Drum Machine</h1>
				{playStopButton}
				<div className="drummachine">
					{drumCellContainer}
				</div>
			</div>
		);
	}

	playOrStop(){
		this.state.isPlaying ? this.stop() : this.play();
	}
	play(){
		this.stop();
		drumMachinePlayer.play();
		this.setState({isPlaying:true});
	}

	stop(){
		drumMachinePlayer.stop();
		this.setState({isPlaying:false});
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
