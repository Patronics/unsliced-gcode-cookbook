import "./gcodeblock.css"

function GCodeBLock({gcode = ";GCODE GOES HERE"}){


	return (
		<>
			<div className="gcodeBlock orange" draggable={true}>
				{gcode}
			</div>
		</>
	)
}

export {GCodeBLock}