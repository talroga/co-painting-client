import { useState } from "react"
import { ActionData, IAction, parseAction } from "../Types/DrawActionFactory"


export class CoPaintingWebSocket {
    ws: WebSocket
    constructor(url: string) {
        this.ws = new WebSocket('ws://localhost:8765')
    }

    sendAction(action: IAction) {
        this.ws.send(JSON.stringify(action.toObject()))
    }

    sendActionData(action: ActionData) {
        const actionJSON = JSON.stringify(action)
        this.ws.send(actionJSON)
    }

    onRecv(event: MessageEvent<any>) {
    }
}

export function useRecv(coPaintingWebSocket: CoPaintingWebSocket, canvas: HTMLCanvasElement | null) {
    const firstDraw = () => {}
    const [draw, setDraw] = useState<() => void>(() => {return firstDraw})
    coPaintingWebSocket.ws.onmessage = (event) => {
        setDraw(() => {
            console.log(canvas)
            const data = event.data
            const actionJSON = JSON.parse(data)
            const action = parseAction(actionJSON)

            if(canvas) {
                action.draw(canvas)
            }
        })
    }

    return draw
}