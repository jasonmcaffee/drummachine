import {core} from '../../core/core';
import React from 'react';

let eventBus = core.eventBus;

export class DrumMachineCell extends core.View {
  constructor(props){
    super(props);
		this.state = {
			cellActive: false
		};
  }
  componentWillMount() {}
  componentDidMount() {
    this.offs = [
      eventBus.event.on(({data})=>{})
    ]
  }
  componentWillUnmount() {
    this.offs.forEach(off=>off());
  }

  render() {
		let {sound} = this.props;
  	return (
      <div className="drummachinecell" >
				<label>{sound.name}</label>
      </div>
    );
  }
}
