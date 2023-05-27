import { Color } from "./Color"
import { Point } from "./Draw"

export type draw = (canvas: HTMLCanvasElement) => void

export interface ActionData {
    type: string
    data: any
}

export interface IAction {
    timestamp: EpochTimeStamp
    draw: draw
    toObject: () => any
}

export class CircleAction implements IAction {
    timestamp: EpochTimeStamp
    radius: number
    color: Color
    center: Point

    constructor(timestamp: EpochTimeStamp, data: {radius: number, color: Color, center: Point}) {
        this.timestamp = timestamp
        this.radius = data.radius
        this.color = data.color
        this.center = data.center
    }

    draw(canvas: HTMLCanvasElement) {
        const context = canvas.getContext("2d")
        if(context != null) {
            context.beginPath()
            console.log([this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false])
            context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false)
            context.fillStyle = this.color
            context.fill()
        }
    }

    toObject() {
        return {
            type: 'Circle',
            data: {
                radius: this.radius,
                color: this.color,
                center: this.center
            }
        }
    }
}

const nameActionConversion: {[key: string]: any} = {
    'Circle': CircleAction
}

export function parseAction(actionString: any): IAction {
    const actionJSON = actionString
    try {
        return new nameActionConversion[actionJSON['type']](actionJSON['timestamp'], actionJSON['data'])
    } catch (error) {
        throw error
    }
}