"use client"
import "./gcodeblock.css"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

function GCodeBLock({gcode = ";GCODE GOES HERE", comment="", suffixBox=false, suffixDefault=""}){
	const [suffixContent, setSuffixContent] = useState("")
	useEffect(() => {
		setSuffixContent(suffixDefault)


	}, [suffixDefault])

	return (
		<>
			<div className="gcodeBlock orange" draggable={true}>
				{comment? comment +": ": ""}{gcode}{suffixBox? (<input type="text" className="suffixBox" role="input" defaultValue={suffixContent} onChange={e => handleChangeAndSize(e, setSuffixContent)}></input>):""}
			</div>
		</>
	)
}

   const handleChangeAndSize = (ev: ChangeEvent<HTMLInputElement>, handleChange: Dispatch<SetStateAction<string>>) => {
      const target = ev.target;
      target.style.width = '1em';
      target.style.width = `${target.scrollWidth}px`;

      handleChange(ev.target.value);
   };

export {GCodeBLock}