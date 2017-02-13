class EventBus {
	constructor(){
		this.events = eventPath.call({}, {});
	}
}

const eventPath = (val, parentPath)=>{
	console.log(`val is: ${JSON.stringify(val, null, 2)}`);
	//register callback for event or trigger event
	let wrappedVal = ({data, on, cbContext})=>{
		if(on){ //register
			val.callbacks = val.callbacks || new Set();
			val.callbacks.add(on);
		}else if(val.callbacks){ //trigger event
			for(let cb of val.callbacks.values()){
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

	//allow deregistering of events
	wrappedVal.off = (cbToRemove)=>{
		if(!val.callbacks){return;}
		val.callbacks.delete(cbToRemove);
	};
	return new Proxy(wrappedVal, handler);
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

module.exports = new EventBus();
