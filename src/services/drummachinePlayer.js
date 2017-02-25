import {loadMachines} from './drummachineLoader';
import {core} from '../core/core';
let eventBus = core.eventBus;
class DrumMachinePlayer{
	constructor(machine){
		this.machine = machine;
		this.columnCount = 0;
		this.offs=[
			eventBus.drumMachineControls.play.on(()=>this.play()),
			eventBus.drumMachineControls.stop.on(()=>this.stop()),
			eventBus.drumMachineControls.pause.on(()=>this.pause()),
			eventBus.drumMachineControls.beatsPerMinuteChanged.on(({beatsPerMinute})=>{
				if(beatsPerMinute < 1){return;}
				this.machine.beatsPerMinute = beatsPerMinute;
				let wasPlaying = this._isPlaying;
				eventBus.drumMachineControls.pause();
				if(wasPlaying){eventBus.drumMachineControls.play();}
			}),
			eventBus.drumMachine.configChange.on(({machineConfig})=>{
				this.machine = machineConfig;
				eventBus.drumMachineControls.pause(); //reconfigure based on cellsPerRow
				let wasPlaying = this._isPlaying;
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
		let {cellsPerRow, beatsPerMinute} = this.machine;
		let intervalMs = 60000 / beatsPerMinute / cellsPerRow;
		this._intervalId = setInterval(()=>{
			let columnIndex = this.columnCount % (cellsPerRow );
			this.playColumn(columnIndex);
			++this.columnCount;
		}, intervalMs);
	}

	pause(){
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
		//find the sound for active cells in the column...

	}
	stop(){
		this._isPlaying = false;
		this.columnCount = 0;
		this.deactivateCellsBeforeNext = this.deactivateCellsBeforeNext || [];
		this.deactivateCellsBeforeNext.forEach(cell=>eventBus.drumMachineCell.active({active:false, cell}));
		this.deactivateCellsBeforeNext=[];
		clearInterval(this._intervalId);
	}

}

export let drumMachinePlayer = new DrumMachinePlayer(loadMachines()[0]);
