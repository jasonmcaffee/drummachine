import {loadMachines} from './drummachineLoader';
import {core} from '../core/core';
let eventBus = core.eventBus;

class DrumMachinePlayer{
	constructor(machine){
		this.machine = machine;
		this.columnCount = -1;
		this.offs=[
			eventBus.drumMachineControls.play.on(()=>this.play()),
			eventBus.drumMachineControls.stop.on(()=>this.stop()),
			eventBus.drumMachineControls.pause.on(()=>this.pause()),

			//listen for changes in cells per row, notes per measure
			eventBus.drumMachine.configChange.on(({machineConfig})=>{
				this.machine = machineConfig;
				let wasPlaying = this._isPlaying;
				eventBus.drumMachineControls.pause(); //reconfigure based on cellsPerRow
				if(wasPlaying){eventBus.drumMachineControls.play();}
			})
		];
	}

	set machine(machine){ this._machine = machine; }
	get machine(){return this._machine; }
	get isPlaying(){return this._isPlaying; }

	play(){
		//this.stop();
		this._isPlaying = true;
		let {cellsPerRow, beatsPerMinute, notesPerMeasure} = this.machine;
		//play a column on each interval
		let noteLength = 60000 / beatsPerMinute / notesPerMeasure;
		this._intervalId = setInterval(()=>{
			++this.columnCount;
			let columnIndex = this.columnCount % (cellsPerRow );
			this.playColumn(columnIndex);
		}, noteLength);
	}

	pause(){
		this._isPlaying = false;
		clearInterval(this._intervalId);
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

	}
	stop(){
		this._isPlaying = false;
		this.columnCount = -1;
		this.deactivateCellsBeforeNext = this.deactivateCellsBeforeNext || [];
		this.deactivateCellsBeforeNext.forEach(cell=>eventBus.drumMachineCell.active({active:false, cell}));
		this.deactivateCellsBeforeNext=[];
		clearInterval(this._intervalId);
	}

}

export let drumMachinePlayer = new DrumMachinePlayer(loadMachines()[0]);
