/**
 * Conversion factor for centimeters to inches.
 * @constant {number}
 */
const ONE_CM_EQUAL_TO_INCH = 0.3937007874;

/**
 * Conversion factor for inches to centimeters.
 * @constant {number}
 */
const ONE_INCH_EQUAL_TO_CM = 2.54;

/**
 * Calculates and updates measures in centimeters and inches.
 * Based on the given input type and measure type, it converts the value accordingly.
 * @param {string} inputType - The input type to specify the measure being converted.
 * @param {string} measureType - The measurement unit indicating the input's current unit.
 * @param {number} value - The input value to be converted.
 * @param {Object} measures - The measures object where the conversions are stored.
 * @returns {Object} - The updated measures object with both cm and inch values.
 */
export function calculateMeasures(inputType, measureType, value, measures) {
    if (measureType === 'cm') {
        measures.cm[inputType] = value;
        measures.inch[inputType] = convertCmToInches(value);
    } else if (measureType === 'inch') {
        measures.inch[inputType] = value;
        measures.cm[inputType] = convertInchesToCm(value);
    }

    return measures;
}

/**
 * Converts a value in centimeters to inches,
 * @param {number} cm - The value in centimeters to be converted.
 * @returns {string} - The converted value in inches, formatted to two decimal places.
 */
function convertCmToInches(cm) {
    return (cm * ONE_CM_EQUAL_TO_INCH).toFixed(2);
}

/**
 * Converts a value in inches to centimeters.
 * @param {number} inch - The value in inches to be converted.
 * @returns {string} - The converted value in centimeters, formatted to two decimal places.
 */
function convertInchesToCm(inch) {
    return (inch * ONE_INCH_EQUAL_TO_CM).toFixed(2);
}
