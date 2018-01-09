import { Effect } from "./Effect";
import { ColorEffects } from "../DrawingPrimitives/ColorEffects";

export class InverseColorEffect extends Effect {

    /**
     * Inverse the color of the current layer.
     *
     * @author Mathieu Fehr
     */
    apply() {

        // We check that there is a selected layer.
        if (this.workspace.drawingLayers.selectedLayer === null) {
            return;
        }

        // And we apply the effect
        let imageData = this.workspace.drawingLayers.selectedLayer.canvas.getImageData();
        ColorEffects.inverseColors(imageData);
        this.workspace.drawingLayers.selectedLayer.canvas.setImageData(imageData);
    }

}