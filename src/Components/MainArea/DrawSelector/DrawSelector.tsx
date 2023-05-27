import { useState } from "react";
import "./DrawSelector.css";
import CircleDrawMenu from "../CircleDrawMenu/CircleDrawMenu";
import { DrawEventHandler } from "../CoPainting/CoPaintingLogic";
import { DrawMenu } from "../DrawMenu/DrawMenuI";
import { CoPaintingWebSocket } from "../../../Utils/CoPaintingWebSocket/CoPaintingWebSocket";
import { draw } from "../../../Utils/Types/DrawActionFactory";


const defaultSelection = 'Circle'

interface DrawSelectorProperties {
    canvas: HTMLCanvasElement
}

function DrawSelector(props: {canvas: HTMLCanvasElement, coPaintingWebsocket: CoPaintingWebSocket | undefined}): JSX.Element {
    const [drawSelection, setDrawselection] = useState('Circle')

    function handleSelectionChange(event: React.ChangeEvent<HTMLInputElement>) {
        setDrawselection(event.target.value)
    }

    const drawMenuSelectorMapping: {[key: string]: DrawMenu} = {
        'Circle': CircleDrawMenu
    }

    return (
        <div className="DrawSelector">
            <div onChange={handleSelectionChange}>
                <input type={'radio'} value={'Circle'} checked={drawSelection === 'Circle'}/> Circle
            </div>
            {drawMenuSelectorMapping['Circle']({canvas: props.canvas, coPaintingWebsocket: props.coPaintingWebsocket})}
        </div>
    );
}

export default DrawSelector;
