import { CoPaintingWebSocket } from "../../../Utils/CoPaintingWebSocket/CoPaintingWebSocket";
import { DrawEventHandler } from "../CoPainting/CoPaintingLogic";

export type DrawMenu = (props: {canvas: HTMLCanvasElement, coPaintingWebsocket: CoPaintingWebSocket | undefined}) => JSX.Element