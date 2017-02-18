/**
 * Returns an object where each property accessed is guaranteed to exist.
 * when the property is executed all event handlers registered via 'on' will be triggered.
 * e.g.
 * let eventBus = eventify();
 * //register the event
 * eventBus.some.event.on((data)=>console.log(`event fired with data: ${data}`);
 *
 * //trigger event
 * eventBus.some.event('hello');
 *
 * // prints: 'event fired with data: hello'
 * @param val
 * @returns {Proxy}
 */
const eventify = (val={})=>{

	let trigger = (data)=>{
		if(!val.callbacks){return;}
		for(let cb of val.callbacks.values()){
			cb(data);
		}
	};
	trigger.__rawValue = val;//store so that proxy handler has access

	//allow registering of events
	trigger.on = (cb)=>{
		val.callbacks = val.callbacks || new Set();
		val.callbacks.add(cb);
	};

	//allow deregistering of events
	trigger.off = (cbToRemove)=>{
		if(!val.callbacks){return;}
		val.callbacks.delete(cbToRemove);
	};

	return new Proxy(trigger, handler);
};

const handler = {
	get(target, name){
		//when key functions are access on the trigger function, return their normal value.
		if(['on', 'off'].includes(name)){
			return target[name];
		}else{
			target.__rawValue[name] = target.__rawValue[name] || {};//object which contains callbacks.
			return eventify(target.__rawValue[name]);
		}
	}
};

let eventBus = eventify();
module.exports = eventBus;
