import {loadMachines} from './drummachineLoader';
import {core} from '../core/core';
let eventBus = core.eventBus;
class DrumMachinePlayer{
	constructor(machine){
		this.machine = machine;
	}

	set machine(machine){ this._machine = machine; }
	get machine(){return this._machine; }

	play(){
		this.stop();
		let {cellsPerRow, beatsPerMinute} = this.machine;
		let intervalMs = 60000 / beatsPerMinute / cellsPerRow;
		this.columnCount = 0;
		this._intervalId = setInterval(()=>{
			let columnIndex = this.columnCount % (cellsPerRow - 1);
			this.playColumn(columnIndex);
			++this.columnCount;
		}, intervalMs);
	}

	playColumn(columnIndex){
		console.log(`playing column: ${columnIndex}`);
		//iterate over all rows
		let {machine:{rows}} = this;
		rows.forEach(row=>{
			let {soundName, kitName} = row;
			let cell = row.cells[columnIndex];
			if(!cell.activated){return;}
			eventBus.kitPlayer.playSound({soundName, kitName});
		});
		//find the sound for active cells in the column...

	}
	stop(){
		clearInterval(this._intervalId);
	}

}

export let drumMachinePlayer = new DrumMachinePlayer(loadMachines()[0]);
