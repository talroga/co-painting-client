import { useEffect, useState } from "react";
import "./CircleDrawMenu.css";
import { Color } from "../../../Utils/Types/Color";
import { Point } from "../../../Utils/Types/Draw";
import { HexColorPicker } from "react-colorful";
import { DrawEventHandler } from "../CoPainting/CoPaintingLogic";
import { draw, parseAction } from "../../../Utils/Types/DrawActionFactory";
import { CoPaintingWebSocket } from "../../../Utils/CoPaintingWebSocket/CoPaintingWebSocket";

interface CircleDrawMenuProperties {
    canvas: HTMLCanvasElement,
    coPaintingWebsocket: CoPaintingWebSocket | undefined
}

function getMousePos(canvas: HTMLCanvasElement, event: MouseEvent): Point {
    var rect = canvas.getBoundingClientRect()
    const point = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      }
    console.log(point)
    return point
}

function CircleDrawMenu(props: CircleDrawMenuProperties): JSX.Element {
    const [radius, setRadius] = useState(64)
    const [color, setColor] = useState('#2DE39F')

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if(props.coPaintingWebsocket !== undefined) {
                props.coPaintingWebsocket.sendActionData({type: 'Circle', data: {radius: radius, color: color, center: getMousePos(props.canvas, event)}})
            }
        }
        props.canvas.addEventListener('click', handleClick)
        return () => {
            props.canvas.removeEventListener('click', handleClick)
        }
    }, [radius, color, props])

    function onRadiusChange(e: React.FormEvent<HTMLInputElement>){
        let target = e.target as HTMLInputElement;
        const re = /^[0-9\b]+$/;
    
        // if value is not blank, then test the regex

        console.log(e.target)
    
        if (target.value === '' || re.test(target.value)) {
           setRadius(Number(target.value))
        }
        
    }

    return (
        <div className="CircleDrawMenu">
            <input type="text" value={radius} onChange={onRadiusChange}/>
            <HexColorPicker color={color} onChange={setColor}/>
        </div>
    );
}

export default CircleDrawMenu;
