
let kitBasePath = "/kits";
var a4midiNoteNumber = 69;
var qwertyKeyCodeOrder = [
	// 1   2   3   4   5   6   7   8   9   0
	49, 50, 51, 52, 53, 54, 55, 56, 57, 48,
	// q   w   e   r   t   y   u   i   o   p
	81, 87, 69, 82, 84, 89, 85, 73, 79, 80,
	// a   s   d   f   g   h   j   k   l
	65, 83, 68, 70, 71, 72, 74, 75, 76,
	// z   x   c   v   b   n   m
	90, 88, 67, 86, 66, 78, 77
];

let kits = [
	{
		name:"808v1",
		kitPath: "/808v1",

		sounds: [
			//toms
			{ path: "/tom-high-1.wav", name:"tom high 1", tags:["tom", "tom high"], midiTriggers:[69], qwertyTriggers:[49] },
			{ path: "/tom-high-2.wav", name:"tom high 2", tags:["tom", "tom high"], midiTriggers:[69], qwertyTriggers:[50] },
			{ path: "/tom-high-3.wav", name:"tom high 3", tags:["tom", "tom high"], midiTriggers:[69], qwertyTriggers:[51] },
			{ path: "/tom-mid-1.wav", name:"tom mid 1", tags:["tom", "tom mid"], midiTriggers:[69], qwertyTriggers:[52] },
			{ path: "/tom-mid-2.wav", name:"tom mid 2", tags:["tom", "tom mid"], midiTriggers:[69], qwertyTriggers:[53] },
			{ path: "/tom-mid-3.wav", name:"tom mid 3", tags:["tom", "tom mid"], midiTriggers:[69], qwertyTriggers:[54] },
			{ path: "/tom-low-1.wav", name:"tom low 1", tags:["tom", "tom low"], midiTriggers:[69], qwertyTriggers:[55] },
			{ path: "/tom-low-2.wav", name:"tom low 2", tags:["tom", "tom low"], midiTriggers:[69], qwertyTriggers:[56] },
			{ path: "/tom-low-3.wav", name:"tom low 3", tags:["tom", "tom low"], midiTriggers:[69], qwertyTriggers:[57] },

			//bassdrum
			{ path: "/bassdrum-1.wav", name:"bass drum 1", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[81] },
			{ path: "/bassdrum-2.wav", name:"bass drum 2", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[87] },
			{ path: "/bassdrum-3.wav", name:"bass drum 3", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[69] },
			{ path: "/bassdrum-4.wav", name:"bass drum 4", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[82] },
			{ path: "/bassdrum-5.wav", name:"bass drum 5", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[84] },
			{ path: "/bassdrum-6.wav", name:"bass drum 6", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[89] },
			{ path: "/bassdrum-7.wav", name:"bass drum 7", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[85] },
			{ path: "/bassdrum-8.wav", name:"bass drum 8", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[73] },
			{ path: "/bassdrum-9.wav", name:"bass drum 9", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[79] },
			{ path: "/bassdrum-10.wav", name:"bass drum 10", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[80] },
			{ path: "/bassdrum-11.wav", name:"bass drum 11", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[48] },

			//snare
			{ path: "/snare-1.wav", name:"snare 1", tags:["snare"], midiTriggers:[69], qwertyTriggers:[65] },
			{ path: "/snare-2.wav", name:"snare 2", tags:["snare"], midiTriggers:[69], qwertyTriggers:[83] },
			{ path: "/snare-3.wav", name:"snare 3", tags:["snare"], midiTriggers:[69], qwertyTriggers:[68] },
			{ path: "/snare-4.wav", name:"snare 4", tags:["snare"], midiTriggers:[69], qwertyTriggers:[70] },
			{ path: "/snare-5.wav", name:"snare 5", tags:["snare"], midiTriggers:[69], qwertyTriggers:[71] },
			{ path: "/snare-6.wav", name:"snare 6", tags:["snare"], midiTriggers:[69], qwertyTriggers:[72] },
			{ path: "/snare-7.wav", name:"snare 7", tags:["snare"], midiTriggers:[69], qwertyTriggers:[74] },
			{ path: "/snare-8.wav", name:"snare 8", tags:["snare"], midiTriggers:[69], qwertyTriggers:[75] },
			{ path: "/snare-9.wav", name:"snare 9", tags:["snare"], midiTriggers:[69], qwertyTriggers:[76] },
			{ path: "/snare-10.wav", name:"snare 10", tags:["snare"], midiTriggers:[69], qwertyTriggers:[90] },
			{ path: "/snare-11.wav", name:"snare 11", tags:["snare"], midiTriggers:[69], qwertyTriggers:[88] },
			{ path: "/snare-12.wav", name:"snare 12", tags:["snare"], midiTriggers:[69], qwertyTriggers:[67] },
			{ path: "/snare-13.wav", name:"snare 13", tags:["snare"], midiTriggers:[69], qwertyTriggers:[86] }

		]
	}
];

let setKitPaths = ()=>{
	for(let kit in kits){
		for(let sound in kit.sounds){
			sound.path = kitBasePath + kit.kitPath + sound.path;
		}
	}
};

setKitPaths();

export let loadKits = ()=>{
	console.log(`loading kits: ${JSON.stringify(kits, null, 2)}`);
	return kits;
};
