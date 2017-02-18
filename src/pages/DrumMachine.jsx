import {core} from '../core/core';
import React from 'react';
import {kitPlayer} from '../services/kitPlayer';
import {attachQwertyListener} from '../services/listeners/qwerty';

attachQwertyListener();

export class DrumMachine extends core.View {
	render(){
		return (
			<h1>Hello Drum Machine as</h1>
		);
	}
}
