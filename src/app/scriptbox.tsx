import "./scriptbox.css"
import React, { useEffect, useState } from 'react';
import { GCodeBlock } from './gcodeblock';
import type {GCodeBlockData} from './gcodeblock'

interface ScriptBoxProps {
	contents: GCodeBlockData[];
	onUpdateContents: (contents: GCodeBlockData[]) => void;
}


function ScriptBox({contents, onUpdateContents}: ScriptBoxProps){
	const [gcodeBlocks, setGcodeBlocks] = useState<GCodeBlockData[]>(contents);

	const processedOutput:GCodeBlockData[] = []
	interface LoopStackItem {
		block: GCodeBlockData; // The starting block of the loop
		count: number;     // The number of times to repeat the loop
		items: GCodeBlockData[]; // The items collected for this loop
	}
	const loopStack: LoopStackItem[] = []; // Stack to manage nested loops

	gcodeBlocks.forEach((block, index) => {
		if (block.special === "loopStart"){
			// Extract loop count from suffixDefault
        	const match = block.suffixDefault.match(/C(\d+)/);
        	const loopCount = match ? parseInt(match[1], 10) : 1; // Default to 1 if not found
			loopStack.push({ block, count: loopCount, items: [] });
		} else if (block.special === "loopEnd") {
			if (loopStack.length > 0) {
				const poppedItem = loopStack.pop();
				if (poppedItem){
					const { block: startBlock, count, items } = poppedItem;
					// Add the start block to the output
					const explanatoryStartBlock = {...startBlock} //make clone of startblock
					explanatoryStartBlock.gcode = '; start loop: '
					processedOutput.push(explanatoryStartBlock);
					// Repeat the collected items based on the loop count
					for (let i = 0; i < count; i++) {
						processedOutput.push(...items);
					}
					// Add the start block to the output
					const explanatoryEndBlock = {...startBlock}
					explanatoryEndBlock.gcode = '; end loop: ' 
					processedOutput.push(explanatoryEndBlock);
				}
			}
        } else {
			if (loopStack.length > 0) {
				// If inside a loop, collect items for the current loop
				loopStack[loopStack.length - 1].items.push(block);
			} else {
				// Add regular items to output
				processedOutput.push(block);
			}
		}
	})

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

	function removeBlock(index:number){
		const newGcodeBlocks = [...gcodeBlocks.slice(0,index), ...gcodeBlocks.slice(index+1)]
		setGcodeBlocks(newGcodeBlocks)
		onUpdateContents(newGcodeBlocks)
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
					onRemove={removeBlock}
					special={block.special}
				/>
			))}
		</div>
		<div id="finalScriptBox" className="overflow-scroll bg-[#8888FF] w-[30vw] h-[80vh] absolute right-0 top-[10vh]">
			{processedOutput.map((block, index) => (<pre key={index}>{block.gcode+block.suffixDefault}<br></br></pre>))}
		</div>
	</>
    );

}

export {ScriptBox}