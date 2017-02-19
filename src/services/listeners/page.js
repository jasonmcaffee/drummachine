import eventBus from '../eventBus';

export let attachPageListener = ()=>{
	console.log(`attaching qwerty listener...`);
	window.addEventListener('hashchange', ()=>eventBus.page.addressChanged({address:location.hash}), true);
	//$(document).on('keyup', this.boundHandleQwertyKeyUp);
};
