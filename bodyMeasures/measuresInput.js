import { getInputValue, displayError } from '../utils/utils.js';
import { calculateMeasures } from './calculateMeasures.js';

export class MeasuresConverter {
    constructor() {
        // Store measurements for each input type
        this.measures = {
            cm: {
                head_circ: null,
                neck_size: null,
                shoulder_width: null,
                bust_girth: null,
                under_bust: null,
                waist_size: null,
                arm_length: null,
                hip: null,
                hand_circ: null,
                leg_length: null,
                body_height: null,
            },
            inch: {
                head_circ: null,
                neck_size: null,
                shoulder_width: null,
                bust_girth: null,
                under_bust: null,
                waist_size: null,
                arm_length: null,
                hip: null,
                hand_circ: null,
                leg_length: null,
                body_height: null,
            },
        };
    }

    handleInputChanges(event) {
        displayError('', 'error-message-body');
        let value = getInputValue(event.target).toString();

        // Replace commas with dots for decimal input
        value = value.replace(',', '.');

        const inputType = event.target.getAttribute('data-input-type');
        const measureType = event.target.getAttribute('data-measure-type');

        // Convert value to a float and handle invalid input
        const floatValue = parseFloat(value);
        if (isNaN(floatValue)) {
            displayError(
                '*Invalid format. Please enter a valid decimal number.',
                'error-message-body'
            );
            return;
        }

        // Process the conversion based on the input
        this.processConversion(inputType, measureType, floatValue);
    }

    processConversion(inputType, measureType, floatValue) {
        // Calculate and update the measures for the given input type and measure type
        this.measures = calculateMeasures(inputType, measureType, floatValue, this.measures);
        this.updateOutputs(inputType);
    }

    updateOutputs(inputType) {
        // Find the cm and inch input elements based on inputType
        const cmElement = document.querySelector(
            `[data-input-type='${inputType}'][data-measure-type='cm']`
        );
        const inchElement = document.querySelector(
            `[data-input-type='${inputType}'][data-measure-type='inch']`
        );

        // Update the cm input value if present
        if (cmElement) {
            cmElement.value = this.measures.cm[inputType];
        }

        // Update the inch input value if present
        if (inchElement) {
            inchElement.value = this.measures.inch[inputType];
        }
    }
}
