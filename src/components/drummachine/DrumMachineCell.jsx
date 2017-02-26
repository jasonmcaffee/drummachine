import {core} from '../../core/core';
import React from 'react';

let eventBus = core.eventBus;

export class DrumMachineCell extends core.View {
  constructor(props){
    super(props);
		this.state = {
			activated: this.props.cell.activated,
			active: this.props.cell.active
		};
  }
	componentWillReceiveProps(nextProps){
		this.setState({
			activated: nextProps.cell.activated,
			active: nextProps.cell.active
		});
	}
  componentWillMount() {}
  componentDidMount() {
    this.offs = [
			eventBus.drumMachineCell.activatedToggle.on(({activated, cell})=>cell === this.props.cell ? this.setState({activated}) : 0),
			eventBus.drumMachineCell.active.on(({active, cell})=> cell === this.props.cell ? this.setState({active}) : 0)
    ]
  }
  componentWillUnmount() {
    this.offs.forEach(off=>off());
  }

  render() {
		let {sound, cell} = this.props;
		let {activated} = this.state;
		let className = activated ? "drummachinecell activated" : "drummachinecell";
		className += this.state.active ? ' active' : '';
		let activateDeactivate = ()=> eventBus.drumMachineCell.activatedToggle({activated:!this.state.activated, cell});
  	return (
      <div className={className} onClick={activateDeactivate} style={{width: this.props.cellWidth}}>
				<div className="drummachinecell-inner">&nbsp;</div>
      </div>
    );
  }
}
