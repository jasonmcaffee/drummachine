import eventBus from './eventBus';
import {loadKits} from './kitLoader';

export let kitPlayer = {
	init(currentKit){
		eventBus.qwerty.keydown.on(({keyCode})=>{
			console.log(`kitPlay qwerty.keydown keyCode:${keyCode}`);
			//find the keycodes which match in the current kits sounds array
			let soundsWhichShouldBePlayed = currentKit.sounds.filter(sound=>sound.qwertyTriggers.includes(keyCode));
			console.log(`found ${soundsWhichShouldBePlayed.length} sounds to play`);
		});
	}
};

kitPlayer.init(loadKits()[0]);
