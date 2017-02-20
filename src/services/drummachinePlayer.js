import {loadMachines} from './drummachineLoader';
import {core} from '../core/core';
let eventBus = core.eventBus;
class DrumMachinePlayer{
	constructor(machine){
		this.machine = machine;
		this.offs=[
			eventBus.drumMachineControls.play.on(()=>this.play()),
			eventBus.drumMachineControls.stop.on(()=>this.stop()),
			eventBus.drumMachineControls.beatsPerMinuteChanged.on(({beatsPerMinute})=>{
				if(beatsPerMinute < 1){return;}
				this.machine.beatsPerMinute = beatsPerMinute;
				eventBus.drumMachineControls.stop();
			})
		];
	}

	set machine(machine){ this._machine = machine; }
	get machine(){return this._machine; }
	get isPlaying(){return this._isPlaying; }

	play(){
		this.stop();
		this._isPlaying = true;
		let {cellsPerRow, beatsPerMinute} = this.machine;
		let intervalMs = 60000 / beatsPerMinute / cellsPerRow;
		this.columnCount = 0;
		this._intervalId = setInterval(()=>{
			let columnIndex = this.columnCount % (cellsPerRow );
			this.playColumn(columnIndex);
			++this.columnCount;
		}, intervalMs);
	}

	playColumn(columnIndex){
		this.deactivateCellsBeforeNext = this.deactivateCellsBeforeNext || [];
		this.deactivateCellsBeforeNext.forEach(cell=>eventBus.drumMachineCell.active({active:false, cell}));
		this.deactivateCellsBeforeNext=[];
		//console.log(`playing column: ${columnIndex}`);
		//iterate over all rows
		let {machine:{rows}} = this;
		rows.forEach(row=>{
			let {soundName, kitName} = row;
			let cell = row.cells[columnIndex];
			//active always so the column lights up
			eventBus.drumMachineCell.active({active:true, cell});
			this.deactivateCellsBeforeNext.push(cell);
			if(!cell.activated){return;}
			eventBus.kitPlayer.playSound({soundName, kitName});

		});
		//find the sound for active cells in the column...

	}
	stop(){
		this._isPlaying = false;
		this.deactivateCellsBeforeNext = this.deactivateCellsBeforeNext || [];
		this.deactivateCellsBeforeNext.forEach(cell=>eventBus.drumMachineCell.active({active:false, cell}));
		this.deactivateCellsBeforeNext=[];
		clearInterval(this._intervalId);
	}

}

export let drumMachinePlayer = new DrumMachinePlayer(loadMachines()[0]);
