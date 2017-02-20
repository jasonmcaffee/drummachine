import {core} from '../../core/core';
import React from 'react';

let eventBus = core.eventBus;

export class DrumMachineControls extends core.View {
  constructor(props){
    super(props);
    this.state = {
			isPlaying: this.props.isPlaying,
			beatsPerMinute: this.props.beatsPerMinute
		};
  }
  componentWillMount() {}
  componentDidMount() {
    this.offs = [
      eventBus.drumMachineControls.play.on(()=>this.setState({isPlaying:true})),
			eventBus.drumMachineControls.stop.on(()=>this.setState({isPlaying:false})),
			eventBus.drumMachineControls.beatsPerMinuteChanged.on(({beatsPerMinute})=>this.setState({beatsPerMinute}))
    ]
  }
  componentWillUnmount() {
    this.offs.forEach(off=>off());
  }

	playOrStop(){
		this.state.isPlaying ? eventBus.drumMachineControls.stop() : eventBus.drumMachineControls.play();
	}


  render() {
		let buttonText = this.state.isPlaying ? '&#9689' : '&#9658';
		let playStopButton = <button onClick={()=>this.playOrStop()} dangerouslySetInnerHTML={{__html: buttonText}}></button>;
  	return (
      <div className="drummachine-controls" >
				<div>{playStopButton}</div>
				<div>
					<label>bpm</label><input type="number" value={this.state.beatsPerMinute} min="1" max="700" onChange={(event)=>eventBus.drumMachineControls.beatsPerMinuteChanged({beatsPerMinute:event.target.value})}/>
				</div>
      </div>
    );
  }
}
