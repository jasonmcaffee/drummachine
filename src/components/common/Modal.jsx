import {core} from '../../core/core';
import React from 'react';

let eventBus = core.eventBus;

export class Modal extends core.View {
	constructor(props) {
		super(props);
		this.state = {
			active: props.active
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({active:nextProps.active});
	}
	componentWillMount() {}

	componentDidMount() {
		this.offs = [
			eventBus.event.on(({data})=> {
			})
		]
	}

	componentWillUnmount() {
		this.offs.forEach(off=>off());
	}
	closeModal(){
		//this.setState({active:false});
		eventBus.modal.close();
	}

	render() {
		let className = this.state.active ? "modal active" : "modal";
		let {title, children} = this.props;
		console.log(`modal render: ${className}`);
		return (
			<div className={className}>
				<div className="modal-background"></div>
				<div className="modal-content">
					<header><label>{title}</label><button className="close-button" onClick={()=>this.closeModal()}>X</button></header>
					<div className="modal-passed-in-content">
						{children}
					</div>
				</div>
			</div>
		);
	}
}
