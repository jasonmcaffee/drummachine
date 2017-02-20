let events = require('../../services/eventBus');

describe('event bus', ()=>{
	it('should support registering multiple event handlers which trigger when event is fired', ()=>{
		let callCount = 0;
		//register event handler
		events.drumMachine.snareHit.on(({x})=>{
			++callCount;
			expect(x).toEqual(1);
		});

		//trigger event
		events.drumMachine.snareHit({x:1});

		expect(callCount).toEqual(1);

		//register event handlers
		events.synth.soundPlayed.on(({y})=>{
			++callCount;
			expect(y).toEqual(2);
		});
		events.synth.soundPlayed.on((data)=>{
			++callCount;
			expect(data.y).toEqual(2);
		});

		//trigger event
		events.synth.soundPlayed({y:2});

		expect(callCount).toEqual(3);

		events.drumMachine.cymbalHit({x:22});
		expect(callCount).toEqual(3);

	});

	it('should support deregistering events', ()=>{
		let callCount = 0;
		//create references to event handlers so they can be deregistered
		let eventHandler1 = ({x})=>{
			++callCount;
			expect(x).toEqual(1);
		};
		let eventHandler2 = ({x})=>{
			++callCount;
			expect(x).toEqual(1);
		};

		//register event handlers
		events.drumMachine.snareHit.on(eventHandler1);
		events.drumMachine.snareHit.on(eventHandler2);

		//trigger event
		events.drumMachine.snareHit({x:1});

		expect(callCount).toEqual(2);

		//unregister 1 event handler and ensure the other is still called.
		events.drumMachine.snareHit.off(eventHandler1);

		//trigger event
		events.drumMachine.snareHit({x:1});

		expect(callCount).toEqual(3);
	});

	it('should support deregistering events via returned off', ()=>{
		let callCount = 0;
		//create references to event handlers so they can be deregistered
		let eventHandler1 = ({x})=>{
			++callCount;
			expect(x).toEqual(1);
		};
		let eventHandler2 = ({x})=>{
			++callCount;
			expect(x).toEqual(1);
		};

		//register event handlers
		let off1 = events.drumMachine.snareHit.on(eventHandler1);
		events.drumMachine.snareHit.on(eventHandler2);

		//trigger event
		events.drumMachine.snareHit({x:1});

		expect(callCount).toEqual(2);

		//unregister 1 event handler and ensure the other is still called.
		//events.drumMachine.snareHit.off(eventHandler1);
		off1();
		//trigger event
		events.drumMachine.snareHit({x:1});

		expect(callCount).toEqual(3);
	});

	fit('should support deregistering events via returned off', ()=>{
		let callCount = 0;
		//create references to event handlers so they can be deregistered
		let offs = [];
		let off = (off)=>offs.push(off);
		//register event handlers
		off(events.drumMachine.snareHit.on(({x})=>{
			++callCount;
			expect(x).toEqual(1);
		}));
		off(events.drumMachine.snareHit.on(({x})=>{
			++callCount;
			expect(x).toEqual(1);
		}));

		//trigger event
		events.drumMachine.snareHit({x:1});

		expect(callCount).toEqual(2);

		//unregister 1 event handler and ensure the other is still called.
		//events.drumMachine.snareHit.off(eventHandler1);
		offs.forEach(off=>off());
		//trigger event
		events.drumMachine.snareHit({x:1});

		expect(callCount).toEqual(2);
	});
});
