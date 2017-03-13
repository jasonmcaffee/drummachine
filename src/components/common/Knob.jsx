import {core} from '../../core/core';
import React from 'react';
import ReactDom from 'react-dom';

let eventBus = core.eventBus;


//needed for scroll offset
var bodyEl = document.body;

export class RangeInput extends core.View{

	render(){
		var min = this.props.min;
		var max = this.props.max;
		var increment = this.props.increment;
		var value = this.value;
		var name = this.props.name;
		return (
			<input className="range-input" type="text" name={name} value={value} onChange={this.handleInputChange.bind(this)} min={min} max={max} step={increment} />
		);
	}

	componentWillMount(){
		this.value = this.props.value;
	}

	handleInputChange(e){
		var value = e.target ? e.target.value : e; //if target is not defined, then we came from the knob release event.            todo:be careful of string values when we need to send ints
		var isPeriodLastIndex =value.indexOf(".") === value.length -1;

		if(!isPeriodLastIndex && value != "" && !isNaN(value)){
			value = Number(value);
		}

		//console.log('new val: ' + param.value);

		this.value = value;
		//don't trigger if the user is typing.
		if(!isPeriodLastIndex && value !== "" && !isNaN(value)){
			//Let the Synthesizer know so it can change the value on the audioWeb node.
			//core.trigger(core.eventsConfig.node.modelChanged, {nodeModel: this.props.nodeModel, param: param});
			if(this.props.onChange){
				this.props.onChange(value);
			}
			this.forceUpdate();
		}else{
			this.forceUpdate();//still need to render
		}


	}
	updateValue(newValue){
		//this.props.value = newValue;
		//this.setState({value:newValue});
		this.value = newValue;
		this.forceUpdate();
	}

}


export class Knob  extends core.View{
	render() {
		console.log('rerendering knob');
		this.setRotationDegreeBasedOnValue();
		var min = this.props.min;
		var max = this.props.max;
		var increment = this.props.increment;
		var value = this.value;
		var name = this.props.name;
		var imgRotationStyle = {transform: "rotate(" + this.rotationDegree + "deg)"};
		var className="knob";
		if(this.props.className){
			className = className + ' ' + this.props.className;
		}
		return (
			<div className={className} onClick={this.handleKnobClick.bind(this)}>
				<label>{name}</label>
				<div className="image-container">
					<canvas ref={canvas=>this.backgroundCanvas=canvas} width="75" height="75"> </canvas>
					<img ref="knobImageEl"   style={imgRotationStyle} src="images/knob-type-1.png" onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} onMouseMove={this.handleMouseMove.bind(this)}/>
				</div>

				<RangeInput ref="rangeInput" name={name} min={min} max={max} increment={increment} value={value} onChange={this.handleRangeInputChange.bind(this)}/>
			</div>
		);
	}
	componentWillMount(){
		this.value = this.props.value || 100;
	}
	componentDidMount(){
		this.backgroundCanvas = ReactDom.findDOMNode(this.backgroundCanvas);
		this.drawCanvas();
	}
	handleKnobClick(e){//for midi learn
		if(this.props.onClick){
			this.props.onClick(e);
		}
	}

	drawCanvas(){
		var canvas = this.backgroundCanvas;
		var ctx = canvas.getContext('2d');
		var context = ctx;

		var height = Number(canvas.height);
		var width = Number(canvas.width);
		var centerX = width /2;
		var centerY = height/2;

		ctx.clearRect(0, 0, width, height);

		//draw the outline arc
		var outlineArcLineWidth = 9;
		var outlineShadowWidth = 10;
		var outlineArcRadius = (width/2) - ( (outlineShadowWidth + outlineArcLineWidth)/ 2);
		var outlineArcStartAngle =  0;
		var outlineArcEndAngle = 2 * Math.PI;


		var outlineGradient = context.createLinearGradient(0, 0, 0, height);
		outlineGradient.addColorStop(0, "#494949"); //lighter black
		outlineGradient.addColorStop(1, "#000000"); //black


		ctx.beginPath();
		ctx.arc(centerX, centerY, outlineArcRadius, outlineArcStartAngle, outlineArcEndAngle);
		ctx.strokeStyle = outlineGradient;//"black";
		ctx.lineWidth = outlineArcLineWidth;

		ctx.shadowColor = "black";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 1;
		ctx.shadowBlur = outlineShadowWidth;

		ctx.stroke();





		//highlight the current value
		var valueArcLineWidth = 4;
		var valueArcRadius = (width/2) - (valueArcLineWidth/2) - ( (outlineShadowWidth + outlineArcLineWidth) / 4) -2;
		var valueArcShadowWidth = 2;

		//get value percent, then multiply by radians (2pi)
		var valueArcStartAngle = 0.5 * Math.PI;  //0 is 3 oclock, 0.5 is 6 oclock, 1 is 9 oclock, 1.5 is 12 oclock
		var rotationPercentage = this.rotationDegree / 360;
		var valueArcEndAngle =  (2 * Math.PI * rotationPercentage) + valueArcStartAngle;

		var valueGradient = context.createLinearGradient(0, 0, 0, height);
		valueGradient.addColorStop(0, "#5085BF");
		valueGradient.addColorStop(1, "#446BA3");

		//draw the value arc.
		ctx.beginPath();
		ctx.arc(centerX, centerY, valueArcRadius, valueArcStartAngle, valueArcEndAngle);
		ctx.strokeStyle = valueGradient;//"green";
		ctx.lineWidth = valueArcLineWidth;
		ctx.lineJoin = "round";

		ctx.shadowColor = "#65A2F2";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = valueArcShadowWidth;

		ctx.stroke();
	}
	/**
	 * since we don't listen to signals like node paramChange, someone else will, and that someone else will need to update this component.
	 * @param newValue
	 */
	updateValue(newValue){
		if(this.value === newValue){return;} //useful so NodeParamRange can fire signal and listen, without having to worry about unnecessary updates.
		//this.props.value = newValue;
		//this.setState({value:newValue});
		this.value = newValue;
		this.forceUpdateImageBasedOnValue();
		this.refs.rangeInput.updateValue(newValue);
	}
	/**
	 * Triggered by the RangeInput control. we need to calc new rotation and repaint. trigger change
	 * @param newValue
	 */
	handleRangeInputChange(newValue){
		//this.setProps({value:newValue});
		this.value = newValue;
		if(this.props.onChange){
			this.props.onChange(this.value);
		}
		this.forceUpdateImageBasedOnValue();

	}
	setRotationDegreeBasedOnValue(){
		var param = this.props;
		var rangeStart = Number(param.min);
		var rangeEnd = Number(param.max);
		var totalRange = rangeEnd + Math.abs(rangeStart);
		var paramValue = Number(this.value);
		if(rangeStart < 0){
			paramValue += Math.abs(rangeStart);
		}
		var valuePercentage = paramValue / totalRange;

		this.rotationDegree = 360 * valuePercentage;

		console.log('Val: %s  min: %s   max: %s  valuePercentage: %s  rotationDegree: %s' , paramValue, rangeStart, rangeEnd, valuePercentage, this.rotationDegree);
	}
	setValueBasedOnRotationDegree(){
		//calc new value.
		var rotationPercentage = this.rotationDegree / 360;
		var param = this.props;
		var rangeStart = Number(param.min);
		var rangeEnd = Number(param.max);
		var totalRange = rangeEnd + Math.abs(rangeStart);
		var newValue = totalRange * rotationPercentage;
		if(rangeStart < 0){
			newValue = newValue - Math.abs(rangeStart);
		}
		newValue = Number(newValue.toPrecision(2));
		console.log('totalRange: %s  rotationPercentage: %s   new value: %s', totalRange, rotationPercentage, newValue);

		if(this.props.onChange){
			this.props.onChange(newValue);
		}

		this.updateValue(newValue);

		if(this.props.onChange){
			this.props.onChange(this.value);
		}
		//this.value = newValue;
		////this.setProps({value:newValue});
		//this.forceUpdateImageBasedOnValue();
		//repaint the image (set the style transform)
		//Let the Synthesizer know so it can change the value on the audioWeb node.
		//core.trigger(core.eventsConfig.node.modelChanged, {nodeModel: this.props.nodeModel, param: param});
	}
	forceUpdateImageBasedOnValue(){
		this.setRotationDegreeBasedOnValue();
		//rotate the image
		this.refs.knobImageEl.style = "transform: rotate(" + this.rotationDegree + "deg);";
		this.drawCanvas();
	}
	handleMouseDown(e){
		e.preventDefault();//don't let the image be dragged
		this.trackMovement = true;

	}
	handleMouseUp(e){
		this.trackMovement = false;
	}
	handleMouseMove(e){
		if(! this.trackMovement){return;}
		//get mouse x y
		var mouseX = e.clientX; //increases as you move right
		var mouseY = e.clientY; //increases as you move down

		//get image's top left x, y coordinate
		var imgX = this.refs.knobImageEl.x;
		var imgY = this.refs.knobImageEl.y;
		var imgHeight = this.refs.knobImageEl.height;
		var imgWidth = this.refs.knobImageEl.width;
		var imgCenterX = imgWidth/2 + imgX;
		var imgCenterY = imgHeight/2 + imgY;

		//we need to adjust mouse position
		var scrollTop = window.pageYOffset;//document.body.scrollTop;//bodyEl.scrollTop;
		var scrollLeft = window.pageXOffset;//document.body.scrollLeft;//bodyEl.scrollLeft;

		mouseY += scrollTop;
		mouseX += scrollLeft;

		console.log('scrollLeft: %s   scrollTop:%s  imgX: %s   imgY: %s   imgCenterX: %s  imgCenterY: %s  mouseX: %s   mouseY: %s', scrollLeft, scrollTop, imgX, imgY, imgCenterX, imgCenterY, mouseX, mouseY);

		// get normalised direction from joint to mouse
		var dx = mouseX - imgCenterX,
			dy = mouseY - imgCenterY;


		//degrees:
		//  0 points down
		//  -90 points left
		// -180 or 180 points up
		// 90 points right
		var angleRadians = Math.atan2(dx, dy);
		var angleDegrees = angleRadians * 180/Math.PI;

		//rotation
		// - rotate(90deg) points left
		// - rotate(180deg) points up
		// - rotate(270deg) points right
		// - rotate(360deg or 0deg) points down

		//convert angleDegrees to rotation of image degrees
		if(angleDegrees >= 0){
			this.rotationDegree = 360 - angleDegrees;  //.e.g.  to point left we need 270, which is 360 - 90(angleDegrees)
		}else{
			this.rotationDegree = Math.abs(angleDegrees);
		}

		console.log('angleRadians: %s    angleDegrees: %s   rotationDegree: %s', angleRadians, angleDegrees, this.rotationDegree);


		//repaint the image (set style) as this triggers a signal, and we paint on signal.
		this.setValueBasedOnRotationDegree();



	}
}
