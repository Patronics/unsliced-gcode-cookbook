import "./scriptbox.css"
import React, { useEffect, useState } from 'react';
import { GCodeBlock } from './gcodeblock';
import type {GCodeBlockData} from './gcodeblock'

interface ScriptBoxProps {
	contents: GCodeBlockData[]
}


function ScriptBox({contents}: ScriptBoxProps){
	const [gcodeBlocks, setGcodeBlocks] = useState<GCodeBlockData[]>(contents);

	useEffect(() => {
    setGcodeBlocks(prev => {
      const newBlocks = [...prev];
      // Add any new items that aren’t already in the array
      contents.forEach((c, i) => {
        if (!newBlocks[i]) newBlocks[i] = c;
      });
      return newBlocks;
    });
  }, [contents]);

	function updateOnBlockChange(index:number, gcode: string, comment: string, suffixBox: boolean, suffixContent: string){
		console.log("change detected")
		setGcodeBlocks(prev =>
			prev.map((b, i) => (i === index ? { ...b, suffixDefault: suffixContent } : b))
		);
	}

	return (
	<>
		<div className="scriptBox overflow-scroll">
			{gcodeBlocks.map((block, index) => (
				<GCodeBlock
					key={index}
					index={index}
					gcode={block.gcode}
					comment={block.comment}
					suffixBox={block.suffixBox}
					suffixDefault={block.suffixDefault}
					onChange={updateOnBlockChange}
				/>
			))}
		</div>
		<div id="finalScriptBox" className="overflow-scroll bg-[#8888FF] w-[30vw] h-[80vh] absolute right-0 top-[10vh]">
			{gcodeBlocks.map((block, index) => (<pre key={index}>{block.gcode+block.suffixDefault}<br></br></pre>))}
		</div>
	</>
    );

}

export {ScriptBox}