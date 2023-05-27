import { useCallback, useEffect, useRef, useState } from "react";
import "./CoPainting.css";
import DrawSelector from "../DrawSelector/DrawSelector";
import { CoPaintingWebSocket, useRecv } from "../../../Utils/CoPaintingWebSocket/CoPaintingWebSocket";

interface CoPaintingProps {

}

function CoPainting(props: CoPaintingProps): JSX.Element {
    const [baseImage, setBaseImage] = useState<string>('')
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [coPaintingWebSocket, setCoPaintingWebSocket] = useState<CoPaintingWebSocket>(new CoPaintingWebSocket('ws://localhost:8765'))
    const draw = useRecv(coPaintingWebSocket, canvasRef.current)
    console.log(draw)

    useEffect(() => {
        if(canvasRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')
            if(context) {
                //Our first draw
                context.fillStyle = '#FFFFFF'
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)
            }
            setBaseImage(canvas.toDataURL("image/png"))
        }
    }, [])

    useEffect(() => {
        console.log(draw)
        if(canvasRef.current && draw) {
            const canvas = canvasRef.current
            draw()
        }
    }, [draw])
    
    const drawSelectorComponent = (
    canvasRef.current !== null ? <DrawSelector canvas={canvasRef.current} coPaintingWebsocket={coPaintingWebSocket} /> : <></>
    )
    
    return (
        <div className="CoPainting">
            <canvas ref={canvasRef} width={600} height={400}/>
            {drawSelectorComponent}
        </div>
    );
}

export default CoPainting;
