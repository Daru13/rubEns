import { DrawingTool } from "./DrawingTool";
import { Canvas } from "../Image/Canvas";
import { DrawingParameters } from "./DrawingParameters";
import { Point } from "../utils/Point";
import {Ellipse} from "../DrawingPrimitives/Ellipse";


/**
 * Tool used to draw ellipses.
 *
 * The user select two points, the first one being declared when the mouse button is clicked,
 * and the second one being declared when the mouse button is released.
 * The two points defines a rectangle, and the ellipse drawn is the circumscribed ellipse.
 */
export class EllipseTool extends DrawingTool {

    /**
     * The first point defining the rectangle
     */
    private firstPoint: Point;

    /**
     * The second point defining the rectangle
     */
    private secondPoint: Point;


    /**
     * The action made when the user click in the drawing canvas
     *
     * @param event The event
     *
     * @author Mathieu Fehr
     */
    onMouseDown(event: MouseEvent) {
        this.firstPoint = this.workingCanvas.getMouseEventCoordinates(event);
        this.firstPoint.x = Math.floor(this.firstPoint.x);
        this.firstPoint.y = Math.floor(this.firstPoint.y);
    }


    /**
     * The action made when the user release the mouse button in the drawing canvas
     *
     * @param event The event triggering this function
     *
     * @author Mathieu Fehr
     */
    onMouseUp(event: MouseEvent) {
        if(this.firstPoint === null) {
            return;
        }

        this.secondPoint = this.workingCanvas.getMouseEventCoordinates(event);
        this.secondPoint.x = Math.floor(this.secondPoint.x);
        this.secondPoint.y = Math.floor(this.secondPoint.y);
        this.apply(this.drawingCanvas, null);
        this.workingCanvas.clear();
        this.firstPoint = null;
        this.secondPoint = null;
    }


    /**
     * The action made when the user move the mouse in the drawing canvas
     *
     * @param event The event triggering this function
     *
     * @author Mathieu Fehr
     */
    onMouseMove(event: MouseEvent) {
        if(this.firstPoint === null) {
            return;
        }
        this.secondPoint = this.workingCanvas.getMouseEventCoordinates(event);
        this.secondPoint.x = Math.floor(this.secondPoint.x);
        this.secondPoint.y = Math.floor(this.secondPoint.y);
        this.workingCanvas.clear();
        this.apply(this.workingCanvas, null);
    }


    /**
     * Basic constructor
     *
     * @param workingCanvas The current working canvas
     * @param previewCanvas The current preview canvas
     *
     * @author Mathieu Fehr
     */
    constructor(workingCanvas: Canvas, previewCanvas: Canvas) {
        super(workingCanvas, previewCanvas);
        this.firstPoint = null;
        this.secondPoint = null;

        this.initEventHandlers();
    }


    /**
     * Setup the event handlers
     *
     * @author Mathieu Fehr
     */
    initEventHandlers() {
        // Add the event handlers to the event manager
        this.eventHandlers.push({
            eventTypes: ["mousedown"],
            selector: "canvas",
            callback: (event) => this.onMouseDown(<MouseEvent> event)

        });
        this.eventHandlers.push({
            eventTypes: ["mouseup"],
            selector: "body",
            callback: (event) => this.onMouseUp(<MouseEvent> event)

        });
        this.eventHandlers.push({
            eventTypes: ["mousemove"],
            selector: "body",
            callback: (event) => this.onMouseMove(<MouseEvent> event)

        });
    }


    /**
     * Apply the operation to the given canvas
     *
     * @param image         The image where the ellipse is drawn
     * @param parameters    The parameters used to draw the ellipse (the color, the thickness)
     */
    apply(image: Canvas, parameters: DrawingParameters) {
        let imageData = image.getImageData();
        Ellipse.drawFromBoundingRect(this.firstPoint, this.secondPoint, imageData);
        image.setImageData(imageData);
    }

}
