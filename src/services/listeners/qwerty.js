import eventBus from '../eventBus';

export let attachQwertyListener = ()=>{
	console.log(`attaching qwerty listener...`);
	window.addEventListener('keydown', ({keyCode})=>eventBus.qwerty.keydown({keyCode}), true);
	//$(document).on('keyup', this.boundHandleQwertyKeyUp);
};
