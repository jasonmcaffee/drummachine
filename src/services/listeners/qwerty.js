import eventBus from '../eventBus';

export let attachQwertyListener = ()=>{
	console.log(`attaching qwerty listener...`);
	let handle =  ({keyCode})=>eventBus.qwerty.keydown({keyCode});
	window.addEventListener('keydown', handle, true);
	return ()=>{
		window.removeEventListener('keydown',handle, true);
	};
	//$(document).on('keyup', this.boundHandleQwertyKeyUp);
};
