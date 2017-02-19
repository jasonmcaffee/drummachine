import React from 'react';
import eventBus from '../services/eventBus';

export let core = {
	View: React.Component,
	audioContext: new AudioContext(),
	eventBus
};
