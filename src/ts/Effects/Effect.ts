import { EventManager } from "../EventManager";
import { EventHandler } from "../EventHandler";
import { ImageWorkspace } from "../ImageWorkspace";


/**
 * Abstract type for a set of effect parameters.
 * This interface should be implemented by any set of parameters used by an effect.
 */
export interface EffectParameters {}


/**
 * A visual effect which can be applied on an image.
 * It must be extended by any actual visual effect.
 */
export abstract class Effect {

    /**
     * The name of the effect.
     * This information may for instance be used by the UI.
     */
    readonly name: string;

    /**
     * The list of event handlers.
     */
    protected eventHandlers: EventHandler[];

    /**
     * The image workspace where to apply the effect operations.
     */
    workspace: ImageWorkspace;

    /**
     * The set of parameters local to the effect.
     * It may be empty.
     */
    parameters: EffectParameters = {};


    /**
     * Basic constructor.
     *
     * @author Camille Gobert
     */
    constructor () {
        this.eventHandlers = [];
    }


    /**
     * Apply the effect on the image.
     * This abstract method must be implemented by every actual effect extending this class.
     *
     * @author Camille Gobert
     */
    abstract apply ();


    /**
     * Register all necessary events handlers required by the effect.
     * @param eventManager The related event manager.
     *
     * @author Mathieu Fehr
     */
    registerEvents(eventManager: EventManager) {
        for (let handler of this.eventHandlers) {
            eventManager.registerEventHandler(handler);
        }
    }


    /**
     * Unregister all necessary event handlers required by the effect.
     * @param eventManager The related event manager.
     *
     * @author Mathieu Fehr
     */
    unregisterEvents(eventManager: EventManager) {
        for (let handler of this.eventHandlers) {
            eventManager.unregisterEventHandler(handler);
        }
    }
}
