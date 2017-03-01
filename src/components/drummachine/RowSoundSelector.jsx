import {core} from '../../core/core';
import React from 'react';
import {Modal} from '../common/Modal';
import {KitSoundSelector} from '../common/KitSoundSelector';
let eventBus = core.eventBus;

export class RowSoundSelector extends core.View {
	constructor(props) {
		super(props);
		this.state = {
			modalActive:false
		};
	}

	componentWillMount() {}
	componentDidMount() {
		this.offs = [
			eventBus.modal.close.on(()=> this.setState({modalActive:false}))
		];
	}
	componentWillUnmount() {
		this.offs.forEach(off=>off());
	}

	toggleModal(){
		console.log(`toggleModal called`);
		this.setState({modalActive:!this.state.modalActive});
	}



	render() {
		let {sound, kit} = this.props;
		let {modalActive} = this.state;
		let soundName = sound.name;
			return (
					<div className="">
						<div onClick={()=>this.toggleModal() }>{soundName}</div>
						<Modal active={modalActive} title={soundName}>
							<KitSoundSelector selectedSound={sound} selectedKit={kit}></KitSoundSelector>
						</Modal>
					</div>
			);
	}
}
