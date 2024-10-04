export function getInputValue(element) {
    return element.value;
}

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
