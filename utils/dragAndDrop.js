/**
 * Selects the main container and all draggable measure items.
 */
const measureContainer = document.querySelector('.measures-input-container');
const draggableContainers = document.querySelectorAll('.measures-input-container > div');

/**
 * Dragstart and dragend event listeners to each measure item.
 */
draggableContainers.forEach(container => {
    container.addEventListener('dragstart', handleDragStart);
    container.addEventListener('dragend', handleDragEnd);
});

/**
 * Parent container listens for dragover and drop events to handle the reordering logic.
 */
const parentContainer = document.querySelector('.measures-input-container');
parentContainer.addEventListener('dragover', handleDragOver);

/**
 * Variable to track the currently dragged element.
 * @type {HTMLElement|null}
 */
let draggedItem = null;

/**
 * Handles the start of dragging an element.
 * Adds a 'dragging' class to the dragged element.
 * @param {DragEvent} event - The dragstart event object.
 */
function handleDragStart(event) {
    draggedItem = event.target;
    setTimeout(() => draggedItem.classList.add('dragging'), 0);
}

/**
 * Handles the end of dragging an element.
 * Removes a 'dragging' class to the dragged element.
 * Saves the new element order to local storage.
 */
function handleDragEnd() {
    this.classList.remove('dragging');
    draggedItem = null;

    saveOrder();
}

/**
 * Handles the element being dragged over other elements.
 * Determines where the dragged item should be inserted.
 * @param {DragEvent} event - The dragover event object.
 */
function handleDragOver(event) {
    event.preventDefault();
    const afterElement = getDragAfterElement(parentContainer, event.clientY);
    if (afterElement === null) {
        parentContainer.appendChild(draggedItem);
    } else {
        parentContainer.insertBefore(draggedItem, afterElement);
    }
}

/**
 * Determines the element that the dragged item is hovering over.
 * Finds the closest element after the current mouse position.
 * @param {HTMLDivElement} container - The container of all draggable elements.
 * @param {number} y - The current Y coordinate of the mouse.
 * @returns {HTMLElement|null} The element after which the dragged item should be inserted.
 */
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('div:not(.dragging)')];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > closest.offset) {
                return {
                    offset: offset,
                    element: child,
                };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

/**
 * Saves the order of measure items to local storage.
 * The order is saved based on the 'data-type' attribute of each item.
 */
function saveOrder() {
    const order = [...measureContainer.querySelectorAll('.measure-item')].map(item =>
        item.getAttribute('data-type')
    );

    localStorage.setItem('measureOrder', JSON.stringify(order));
}

/**
 * Restores the saved order of measure items from local storage.
 * Reorders the items in the container based on the saved 'data-type' attributes.
 */
function restoreOrder() {
    const savedOrder = JSON.parse(localStorage.getItem('measureOrder'));

    if (savedOrder) {
        savedOrder.forEach(type => {
            const item = document.querySelector(`.measure-item[data-type="${type}"]`);
            if (item) {
                measureContainer.appendChild(item);
            }
        });
    }
}

/**
 * Restores the order of measure items when the page is loaded.
 */
window.addEventListener('DOMContentLoaded', restoreOrder);
