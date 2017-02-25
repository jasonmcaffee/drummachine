import React from 'react';
import eventBus from '../services/eventBus';

export let core = {
	View: React.Component,
	audioContext: window.AudioContext ? new AudioContext() : new webkitAudioContext(),
	eventBus
};
