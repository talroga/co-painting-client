import { useState } from "react";
import "./DrawSelector.css";
import CircleDrawMenu from "../CircleDrawMenu/CircleDrawMenu";
import { DrawEventHandler } from "../CoPainting/CoPaintingLogic";
import { DrawMenu } from "../DrawMenu/DrawMenuI";
import { CoPaintingWebSocket } from "../../../Utils/CoPaintingWebSocket/CoPaintingWebSocket";
import { draw } from "../../../Utils/Types/DrawActionFactory";
import BrushDrawMenu from "../BrushDrawMenu/BrushDrawMenu";


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
        'Circle': CircleDrawMenu,
        'Brush': BrushDrawMenu
    }

    const selection = (drawSelectionString: string) => {
        switch(drawSelection) {
            case 'Circle':
                return <CircleDrawMenu canvas={props.canvas} coPaintingWebsocket={props.coPaintingWebsocket} />
            case 'Brush':
                return <BrushDrawMenu canvas={props.canvas} coPaintingWebsocket={props.coPaintingWebsocket} />
        }
    }

    return (
        <div className="DrawSelector">
            <div onChange={handleSelectionChange}>
                <input type={'radio'} value={'Circle'} checked={drawSelection === 'Circle'}/> Circle
                <input type={'radio'} value={'Brush'} checked={drawSelection === 'Brush'}/> Brush
            </div>
            {selection(drawSelection)}
        </div>
    );
}

export default DrawSelector;
