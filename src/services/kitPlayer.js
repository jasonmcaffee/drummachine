import eventBus from './eventBus';
import {loadKits} from './kitLoader';
import {core} from '../core/core';

let {audioContext} = core;

let cachedDecodedAudioData = {};//memoization to limit network requests

/**
 * Listens to qwerty eventBus events and plays appropriate sound by either downloading and playing audio file or (soon)
 * use synthesizer/oscillators, etc
 * @type {{init: (function(*))}}
 */
export let kitPlayer = {
	init(currentKit){
		this._currentKit = currentKit;
		eventBus.kitPlayer.kitLoaded({kit:currentKit});

		//qwerty keyboard listener
		eventBus.qwerty.keydown.on(({keyCode})=>{
			console.log(`kitPlay qwerty.keydown keyCode:${keyCode}`);
			//find the keycodes which match in the current kits sounds array
			let soundsWhichShouldBePlayed = currentKit.sounds.filter(sound=>sound.qwertyTriggers.includes(keyCode));
			console.log(`found ${soundsWhichShouldBePlayed.length} sounds to play`);
			soundsWhichShouldBePlayed.forEach(sound=>eventBus.kitPlayer.playSound({sound}));
		});

		//play sound listener
		eventBus.kitPlayer.playSound.on(async ({sound})=>{
			console.log(`playing sound with path: ${sound.path}`);
			await playFile({filePath:sound.path});
		});
	},
	get currentKit(){
		return this._currentKit;
	}
};

async function playFile({filePath}){
	if(!cachedDecodedAudioData[filePath]){
		let response = await fetch(filePath);
		let arrayBuffer = await response.arrayBuffer();
		let decodedAudioData = await audioContext.decodeAudioData(arrayBuffer);
		cachedDecodedAudioData[filePath] = decodedAudioData;
	}

	let source = audioContext.createBufferSource();
	source.buffer = cachedDecodedAudioData[filePath];
	source.connect(audioContext.destination);
	source.start(0);
}

kitPlayer.init(loadKits()[0]);
