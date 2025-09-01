import "./scriptbox.css"

function ScriptBox({gcode = ";GCODE GOES HERE"}){


	return (
		<>
			<div className="scriptBox">
				{gcode}
			</div>
		</>
	)
}

export {ScriptBox}