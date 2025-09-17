"use client"
import { GCodeBlock } from "./gcodeblock";
import type { GCodeBlockData } from "./gcodeblock";
import { ScriptBox } from "./scriptbox";
import { useState } from "react";


export default function Home() {
  const [scriptBlocks, setScriptBlocks] = useState<GCodeBlockData[]>([]);


  const addGCodeBlock = (gcode: string, comment: string, suffixBox: boolean, suffixDefault: string) => {
    // Add a new GCodeBlock to the scriptBlocks state
    setScriptBlocks([...scriptBlocks, { gcode, comment, suffixBox, suffixDefault }]);
  };

  return (
    <div className="font-sans min-h-screen p-8 mt-1 pb-20 sm:p-20">
      <main className="">
        <div className="overflow-scroll flex flex-col gap-[12px] row-start-2 max-h-[80vh] bg-[#111111] w-[30vw]">
            Blocks:
          <h3>move</h3>
            <GCodeBlock gcode="G1 " comment="Linear Move" suffixBox={true} suffixDefault="Xn Yn Zn" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="G0 " comment="Fast Move" suffixBox={true} suffixDefault="Xn Yn Zn" onClick={addGCodeBlock}></GCodeBlock>
          <h3>coords</h3>
            <GCodeBlock gcode="G28 " comment="Home Axis" suffixBox={true} suffixDefault="X Y Z" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="G92 " comment="Zero Axis" suffixBox={true} suffixDefault="X0 Y0 Z0" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="G90" comment="Absolute Positioning" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="G91" comment="Relative Positioning" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="G53" comment="Machine Coords" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="G54" comment="Offset Coords 1" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="G55" comment="Offset Coords 2" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="G56" comment="Offset Coords 3" onClick={addGCodeBlock}></GCodeBlock>
          <h3>temps</h3>
            <GCodeBlock gcode="M140 S" comment="Set Bed Temp (fast)" suffixBox={true} suffixDefault="0" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="M190 " comment="Set Bed Temp and wait" suffixBox={true} suffixDefault="S0" onClick={addGCodeBlock}></GCodeBlock>

          <h3>misc</h3>
            <GCodeBlock gcode="G4 " comment="Wait" suffixBox={true} suffixDefault="P10" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="M300 " comment="Beep" suffixBox={true} suffixDefault="" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode="" comment="Custom" suffixBox={true} suffixDefault="" onClick={addGCodeBlock}></GCodeBlock>
            <GCodeBlock gcode=";" comment="Comment" suffixBox={true} suffixDefault="" onClick={addGCodeBlock}></GCodeBlock>
          <h3>advanced</h3>
          <GCodeBlock gcode="M203 " comment="Set Max Feedrate" suffixBox={true} suffixDefault="X300" onClick={addGCodeBlock}></GCodeBlock>
          <GCodeBlock gcode="M302 S" comment="Set Min Extrusion Temp" suffixBox={true} suffixDefault="0" onClick={addGCodeBlock}></GCodeBlock>
          <GCodeBlock gcode="M120" comment="Enable Endstops" onClick={addGCodeBlock}></GCodeBlock>
          <GCodeBlock gcode="M121" comment="Disable Endstops" onClick={addGCodeBlock}></GCodeBlock>
        </div>

        <ScriptBox contents={scriptBlocks} onUpdateContents={(contents) => setScriptBlocks(contents)}></ScriptBox>
        
        {/*<button className="absolute right-30 bg-[#888888]" onClick={processGcode}>Process</button>*/}
      </main>

    </div>
  );
}
