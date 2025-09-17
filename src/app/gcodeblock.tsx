"use client"
import "./gcodeblock.css"

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface GCodeBlockProps {
	index?: number;
    gcode?: string;
    comment?: string;
    suffixBox?: boolean;
    suffixDefault?: string;
    onClick?: (gcode: string, comment: string, suffixBox: boolean, suffixContent: string, special?: string) => void;
	onChange?: (index:number, gcode: string, comment: string, suffixBox: boolean, suffixContent: string) => void;
	onRemove?: (index:number) => void;
	special?: string;
}
interface GCodeBlockData {
	gcode: string;
	comment: string;
	suffixBox: boolean;
	suffixDefault: string;
	special?: string
}

function GCodeBlock({index=-1, gcode = ";GCODE GOES HERE", comment="", suffixBox=false, suffixDefault="", onClick, onChange, onRemove, special}:GCodeBlockProps){
	const [suffixContent, setSuffixContent] = useState("")
	useEffect(() => {
		setSuffixContent(suffixDefault)
		const resizeTimer = setTimeout(() => {
			if (inputRef.current) {
				resizeInput(inputRef.current);
			}
		}, 50); // Delay to allow rendering, wait 50ms
		return () => clearTimeout(resizeTimer); // Cleanup the timer

	}, [suffixDefault])

	const inputRef = useRef<HTMLInputElement>(null);
	let color = "orange"
	if(special){
		color = "purple"
	}

	function handleClick() {
		if (onClick) {
			onClick(gcode, comment, suffixBox, suffixContent, special);
		}
	}

	function handleRemove() {
		onRemove!(index)
	}

	function handleChangeAndSize(ev: ChangeEvent<HTMLInputElement>, handleChange: Dispatch<SetStateAction<string>>) {
	const target = ev.target;
	resizeInput(target)
	if (onChange){
		onChange(index, gcode, comment, suffixBox, target.value)
	}
	handleChange(target.value);
};

	return (
		<>
			<div className={"gcodeBlock "+color} draggable={true} onClick={handleClick}>
				{comment? comment +": ": ""}<span className="font-mono">{gcode}{suffixBox? (<input ref={inputRef} type="text" className="suffixBox" role="input" defaultValue={suffixContent} onChange={e => handleChangeAndSize(e, setSuffixContent)} onClick={e => e.stopPropagation()}></input>):""}</span>
				{onRemove? (<span className="removeBlockBtn" onClick={e => {handleRemove()}}> ❌</span>): ""}
			</div>
		</>
	)
}


const resizeInput = (input: HTMLInputElement) => {
	input.style.width = '1em'; // Reset width to shrink
	input.style.width = `${input.scrollWidth}px`; // Set width to fit content
};

export {GCodeBlock}

export type {GCodeBlockData}