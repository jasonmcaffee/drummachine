import {core} from '../../core/core';
import React from 'react';

let eventBus = core.eventBus;

export class DrumMachineCell extends core.View {
  constructor(props){
    super(props);
		this.state = {
			activated: this.props.cell.activated
		};

		eventBus.drumMachineCell.activateToggle.on(({activated, cell})=>cell === this.props.cell ? this.setState({activated}) : 0);
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
		let {sound, cell} = this.props;
		let {activated} = this.state;
		let className = activated ? "drummachinecell active" : "drummachinecell";
		let activateDeactivate = ()=> eventBus.drumMachineCell.activateToggle({activated:!this.state.activated, cell});
  	return (
      <div className={className} onClick={activateDeactivate}>
      </div>
    );
  }
}
