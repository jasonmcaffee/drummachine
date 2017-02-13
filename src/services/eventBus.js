
class EventBus {
	constructor(){
		console.log(`eventBus constructor called`);
		this.eventCallbackRegistry = {};
		this.events = eventPath.call({}, {});
	}
}

const eventPath = (val, parentPath)=>{
	console.log(`val is: ${JSON.stringify(val, null, 2)}`);
	//register callback for event or trigger event
	let wrappedVal = ({data, on, cbContext})=>{
		//console.log(`wrappVal this: ${JSON.stringify(this)}`);
		if(on){ //register
			//console.log('registering callback');
			val.callbacks = val.callbacks || [];
			val.callbacks.push(on);
			//this.eventCallbackRegistry[callbackId] =
		}else if(val.callbacks){ //trigger event
			//console.log('triggering callbacks');
			for(let cb of val.callbacks){
				if(cbContext){//don't mess with context unless it is passed
					cb.call(cbContext, {data});
				}else{
					cb({data});
				}
			}
		}
		return val;
	};
	wrappedVal.__rawValue = val;
	wrappedVal.__parentPath = parentPath;
	return new Proxy(wrappedVal, handler);
};

//let callbackId = generateCallbackId(callback);
const generateCallbackId = (cb)=>{
	let S4 = function() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
};


const handler = {
	get(target, name){
		let parentPath = target.__parentPath;
		let currentPath = parentPath ? `${parentPath}.${name}` : name;
		console.log(`get called for path: ${currentPath}`);
		target.__rawValue[name] = target.__rawValue[name] || {};
		return eventPath(target.__rawValue[name], currentPath);
	}
};
//
//eventBus.events.drumMachine.snare.hit.register(()=>{
//
//});


module.exports = new EventBus();
