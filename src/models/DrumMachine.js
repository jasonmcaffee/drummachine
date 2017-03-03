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
			//ui controls
			//increase cells per row
			eventBus.drumMachineControls.addColumn.on(()=>{
				this.machineConfig.cellsPerRow +=1;
				createCellsIfNeeded(this.machineConfig);
				eventBus.drumMachine.configChange({machineConfig:this.machineConfig});
			}),

			//decrease cells per row
			eventBus.drumMachineControls.removeColumn.on(()=>{
				this.machineConfig.cellsPerRow -=1;
				eventBus.drumMachine.configChange({machineConfig:this.machineConfig});
			}),

			//bpm
			eventBus.drumMachineControls.beatsPerMinuteChanged.on(({beatsPerMinute})=>{
				if(beatsPerMinute < 1){return;}
				this.machineConfig.beatsPerMinute = beatsPerMinute;
				eventBus.drumMachine.configChange({machineConfig:this.machineConfig});
			}),

			eventBus.drumMachineControls.increaseNotesPerMeasure.on(()=>{
				this.machineConfig.notesPerMeasure += 1;
				eventBus.drumMachine.configChange({machineConfig:this.machineConfig});
			}),
			eventBus.drumMachineControls.decreaseNotesPerMeasure.on(()=>{
				this.machineConfig.notesPerMeasure -= 1;
				eventBus.drumMachine.configChange({machineConfig:this.machineConfig});
			}),

			//when a new sound is selected, change the current machine config to reflect new sound
			eventBus.kit.soundSelected.on(({previousSound, previousKit, kit, sound, soundSelectedContext})=>{
				//update the machineRow config entry that is passed as soundSelectedContext
				soundSelectedContext.kitName = kit.name;
				soundSelectedContext.soundName = sound.name;
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
