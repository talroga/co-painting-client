import { IAction } from "../Types/DrawActionFactory"

class DrawManager {
    canvas: HTMLCanvasElement
    actions: IAction[]
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.actions = []
    }

    addAction(action: IAction) {
        this.actions.push(action)
        this.actions.sort((a, b) => a.timestamp - b.timestamp)

        // TO DO: Clean the array after adding a new action

        this.actions.forEach((action => {
            action.draw(this.canvas)
        }))
    }
}