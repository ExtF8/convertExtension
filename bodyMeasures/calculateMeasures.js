const ONE_CM_EQUAL_TO_INCH = 0.3937007874;
const ONE_INCH_EQUAL_TO_CM = 2.54;

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

function convertCmToInches(cm) {
    return (cm * ONE_CM_EQUAL_TO_INCH).toFixed(2);
}

function convertInchesToCm(inch) {
    return (inch * ONE_INCH_EQUAL_TO_CM).toFixed(2);
}
