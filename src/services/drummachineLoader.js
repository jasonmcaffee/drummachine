

let machineConfigs = [
	{
		name:"first",
		cellsPerRow: 8,
		notesPerMeasure: 4,
		beatsPerMinute: 60,
		get totalNumberOfMeasures(){ return this.cellsPerRow / this.notesPerMeasure },
		rows: [ //cells are for cell state, effects, etc
			{ kitName: "808v1", soundName:"bass drum 1", cells:[], volume:100 },
			{ kitName: "808v1", soundName:"snare 1", cells:[], volume:100 },
			//kitPath: "/electronic/808v1",
			{ kitName: "808v1", soundName:"hihat closed 1", cells:[], volume:100 },
			{ kitName: "808v1", soundName:"tom low 1", cells:[], volume:100 },
			{ kitName: "808v1", soundName:"tom mid 1", cells:[], volume:100 },
			{ kitName: "808v1", soundName:"tom high 1", cells:[], volume:100 },
			{ kitName: "808v1", soundName:"click 1", cells:[], volume:100 },
			{ kitName: "808v1", soundName:"clap 1", cells:[], volume:100 },
			{ kitName: "808v1", soundName:"cowbell 1", cells:[], volume:100 },
			{ kitName: "808v1", soundName:"ride 1", cells:[], volume:90 },
		]
	}
];

let createCell = ()=>({activated:false, active:false});


let createCells = (machine)=>{
	let {rows, cellsPerRow} = machine;
	rows.forEach(row=>{
		[...Array(cellsPerRow).keys()].map(i=>{
			if(row.cells[i]){return;}
			row.cells.splice(i, 0, createCell());
		});
	});
};

machineConfigs.map(createCells);

export let loadMachines = ()=>{
	console.log(`loading machines: ${JSON.stringify(machineConfigs, null, 2)}`);
	return machineConfigs;
};


