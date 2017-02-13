let eventBus = require('../../services/eventBus');

describe('event bus', ()=>{
	it('should register events', (done)=>{
		let callCount = 0;
		eventBus.events.drumMachine.snare({on:({data})=>{
			console.log(`cb1 called with data: ${JSON.stringify(data)}`);
			++callCount;
			expect(data.x).toEqual(1);
			//done();
		}});
		eventBus.events.drumMachine.snare({data:{x:1}});

		expect(callCount).toEqual(1);

		this.x = 123;
		eventBus.events.synth.soundPlayed({on:({data})=>{
			console.log(`cb1 called with data: ${JSON.stringify(data)}`);
			++callCount;
			expect(data.y).toEqual(2);
			done();
		}});

		eventBus.events.synth.soundPlayed({data:{y:2}});
		expect(callCount).toEqual(2);

	});
});
