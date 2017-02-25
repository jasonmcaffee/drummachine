import {core} from '../core/core';
let eventBus = core.eventBus;
import {loadMachines} from '../services/drummachineLoader';
let createCell = ()=>({activated:false, active:false});

let createCellsIfNeeded = (machineConfig)=>{
	let {rows, cellsPerRow} = machineConfig;
	rows.forEach(row=>{
		[...Array(cellsPerRow).keys()].map(i=>{
			if(row.cells[i]){return;}
			row.cells.splice(i, 0, createCell());
		});
	});
};

class DrumMachine{
	constructor(machineConfig){
		this.loadConfig(machineConfig);

		this.offs = [
			eventBus.drumMachineControls.addColumn.on(()=>{
				this.machineConfig.cellsPerRow +=1;
				createCellsIfNeeded(this.machineConfig);
				eventBus.drumMachine.configChange({machineConfig:this.machineConfig});
			}),
			eventBus.drumMachineControls.removeColumn.on(()=>{
				this.machineConfig.cellsPerRow -=1;
				eventBus.drumMachine.configChange({machineConfig:this.machineConfig});
			})
		];
	}

	loadConfig(machineConfig){
		this.machineConfig = machineConfig;
		createCellsIfNeeded(this.machineConfig);
		eventBus.drumMachine.configChange({machineConfig:this.machineConfig});
	}

}

export let drumMachine = new DrumMachine(loadMachines()[0]);
