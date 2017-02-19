import {core} from '../../core/core';
import React from 'react';

let eventBus = core.eventBus;

export class DrumPadCell extends core.View {
	constructor(props){
		super(props);
		this.state = {
			cellActive: false
		};
	}
  componentWillMount() {}
  componentDidMount() {
		this.turnOffListeners =[
			eventBus.kitPlayer.playSound.on(({sound})=>{
				this.setState({cellActive:false});
				if(this.props.sound != sound){ return;}
				console.log(`drumcell sound played handler called for sound`);
				this.setState({cellActive:true});
			})
		];
	}
  componentWillUnmount() {
		this.turnOffListeners.forEach(off=>off());
	}

  render() {
  	console.log(`drumcell render called.`);
		let {sound} = this.props;
		let {cellActive} = this.state;
		let className = cellActive ? "drumpadcell active" : "drumpadcell";
		let playSound = ()=> eventBus.kitPlayer.playSound({sound:this.props.sound});
    return (
			<div className={className} onTouchStart={playSound} onClick={playSound}>
      	<label>{sound.name}</label>
			</div>
    );
  }
}
