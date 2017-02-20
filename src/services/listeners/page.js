import eventBus from '../eventBus';

export let attachPageListener = ()=>{
	console.log(`attaching page listener...`);
	let handle = ()=>eventBus.page.addressChanged({address:location.hash});
	window.addEventListener('hashchange', handle, true);
	return ()=>{
		window.removeEventListener('hashchange', handle, true);
	}
};
