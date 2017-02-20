
let kitBasePath = "/kits";
var a4midiNoteNumber = 69;
var qwertyKeyCodeOrder = [
// `   1   2   3   4   5   6   7   8   9   0   -    =    delete
	192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
// q  w   e   r   t   y   u   i   o   p   [    ]    \
	81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220,
// a  s   d   f   g   h   j   k   l   ;    '
	65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222,
// z  x   c   v   b   n   m   ,    .    /    space
	90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 32
];

let k = {
	backtick: 192, _1: 49, _2: 50, _3: 51, _4: 52, _5: 53, _6: 54, _7: 55, _8: 56, _9: 57, _0: 48, dash: 189, equal: 187, 'delete': 8,
	q: 81, w: 87, e: 69, r: 82, t: 84, y: 89, u: 85, i: 73, o: 79, p: 80, leftBracket: 219, rightBracket: 221, backslash: 220,
	a: 65, s: 83, d: 68, f: 70, g: 71, h: 72, j: 74, k: 75, l: 76, semicolon: 186, singleQuote: 222,
	z: 90, x: 88, c: 67, v: 86, b: 66, n: 78, m: 77, comma: 188, period: 190, forwardslash: 191,
	space: 32,
};

let kits = [
	{
		name:"808v1",
		kitPath: "/electronic/808v1",

		sounds: [
			//toms
			{ path: "/tom-high-1.wav", name:"tom high 1", tags:["tom", "tom high"], midiTriggers:[69], qwertyTriggers:[k.a] },
			{ path: "/tom-high-2.wav", name:"tom high 2", tags:["tom", "tom high"], midiTriggers:[69], qwertyTriggers:[k.s] },
			{ path: "/tom-high-3.wav", name:"tom high 3", tags:["tom", "tom high"], midiTriggers:[69], qwertyTriggers:[k.d] },
			{ path: "/tom-mid-1.wav", name:"tom mid 1", tags:["tom", "tom mid"], midiTriggers:[69], qwertyTriggers:[k.f] },
			{ path: "/tom-mid-2.wav", name:"tom mid 2", tags:["tom", "tom mid"], midiTriggers:[69], qwertyTriggers:[k.g] },
			{ path: "/tom-mid-3.wav", name:"tom mid 3", tags:["tom", "tom mid"], midiTriggers:[69], qwertyTriggers:[k.h] },
			{ path: "/tom-low-1.wav", name:"tom low 1", tags:["tom", "tom low"], midiTriggers:[69], qwertyTriggers:[k.j] },
			{ path: "/tom-low-2.wav", name:"tom low 2", tags:["tom", "tom low"], midiTriggers:[69], qwertyTriggers:[k.k] },
			{ path: "/tom-low-3.wav", name:"tom low 3", tags:["tom", "tom low"], midiTriggers:[69], qwertyTriggers:[k.l] },

			//bassdrum
			{ path: "/bassdrum-1.wav", name:"bass drum 1", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k.backtick] },
			{ path: "/bassdrum-2.wav", name:"bass drum 2", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._1] },
			{ path: "/bassdrum-3.wav", name:"bass drum 3", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._2] },
			{ path: "/bassdrum-4.wav", name:"bass drum 4", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._3] },
			{ path: "/bassdrum-5.wav", name:"bass drum 5", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._4] },
			{ path: "/bassdrum-6.wav", name:"bass drum 6", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._5] },
			{ path: "/bassdrum-7.wav", name:"bass drum 7", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._6] },
			{ path: "/bassdrum-8.wav", name:"bass drum 8", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._7] },
			{ path: "/bassdrum-9.wav", name:"bass drum 9", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._8] },
			{ path: "/bassdrum-10.wav", name:"bass drum 10", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._9] },
			{ path: "/bassdrum-11.wav", name:"bass drum 11", tags:["bassdrum"], midiTriggers:[69], qwertyTriggers:[k._0] },

			//snare
			{ path: "/snare-1.wav", name:"snare 1", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.q] },
			{ path: "/snare-2.wav", name:"snare 2", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.w] },
			{ path: "/snare-3.wav", name:"snare 3", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.e] },
			{ path: "/snare-4.wav", name:"snare 4", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.r] },
			{ path: "/snare-5.wav", name:"snare 5", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.t] },
			{ path: "/snare-6.wav", name:"snare 6", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.y] },
			{ path: "/snare-7.wav", name:"snare 7", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.u] },
			{ path: "/snare-8.wav", name:"snare 8", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.i] },
			{ path: "/snare-9.wav", name:"snare 9", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.o] },
			{ path: "/snare-10.wav", name:"snare 10", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.p] },
			{ path: "/snare-11.wav", name:"snare 11", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.leftBracket] },
			{ path: "/snare-12.wav", name:"snare 12", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.rightBracket] },
			{ path: "/snare-13.wav", name:"snare 13", tags:["snare"], midiTriggers:[69], qwertyTriggers:[k.backslash] }

		]
	}
];

let setKitPaths = ()=>{
	console.log(`setKitPaths called`)
	for(let kit of kits){
		for(let sound of kit.sounds){
			sound.path = kitBasePath + kit.kitPath + sound.path;
			//console.log(`new sound path is :${sound.path}`);
		}
	}
};

setKitPaths();

export let loadKits = ()=>{
	console.log(`loading kits: ${JSON.stringify(kits, null, 2)}`);
	return kits;
};
