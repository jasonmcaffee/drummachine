import {core} from '../core/core';
import React from 'react';

let eventBus = core.eventBus;

export class DrumCell extends core.View {
  componentWillMount() {}
  componentDidMount() {

	}
  componentWillUnmount() {}

  render() {
  	console.log(`drumcell render called.`);
  	let sound = this.props.sound;
    return (
      <h1>DrumCell ${sound.name}</h1>
    );
  }
}
