/**
 * Retrieves the current value from the specified input element.
 *
 * @param {HTMLInputElement} element - The input element from which to get the value.
 * @returns {string} The value of the input element.
 */
export function getInputValue(element) {
    return element.value;
}

/**
 * Displays an error message in the specified HTML element.
 *
 * @param {string} message - The error message to display. If an empty string is provided, the error will be cleared.
 * @param {string} id - The ID of the HTML element where the error message will be displayed.
 */
export function displayError(message, id) {
    const errorElement = document.getElementById(id);

    if (!message) {
        errorElement.innerHTML = '';
        return;
    }

    const p = document.createElement('p');
    p.textContent = message;
    p.classList.add('error-message');

    errorElement.innerHTML = '';
    errorElement.appendChild(p);
}
