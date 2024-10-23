const measureContainer = document.querySelector('.measures-input-container');
const draggableContainers = document.querySelectorAll('.measures-input-container > div');

// Add dragstart and dragend event listeners to each container
draggableContainers.forEach(container => {
    container.addEventListener('dragstart', handleDragStart);
    container.addEventListener('dragend', handleDragEnd);
});

// Add event listeners for dragover and drop on the parent container
const parentContainer = document.querySelector('.measures-input-container');
parentContainer.addEventListener('dragover', handleDragOver);
parentContainer.addEventListener('drop', handleDragDrop);

// Variables to track the dragged element
let draggedItem = null;

function handleDragStart(event) {
    draggedItem = event.target; // Use event.target instead of this
    setTimeout(() => draggedItem.classList.add('dragging'), 0);
}

function handleDragEnd() {
    this.classList.remove('dragging');
    draggedItem = null;
    saveOrder();
}

function handleDragOver(event) {
    event.preventDefault();
    const afterElement = getDragAfterElement(parentContainer, event.clientY);
    if (afterElement === null) {
        parentContainer.appendChild(draggedItem);
    } else {
        parentContainer.insertBefore(draggedItem, afterElement);
    }
}

function handleDragDrop(event) {
    // No additional logic needed here
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('div:not(.dragging)')];

    return draggableElements.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        { offset: Number.NEGATIVE_INFINITY }
    ).element;
}

function saveOrder() {
    const order = [...measureContainer.querySelectorAll('.measure-item')].map(item =>
        item.getAttribute('data-type')
    );
    localStorage.setItem('measureOrder', JSON.stringify(order));
}

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

// Ensure each item is draggable
document.querySelectorAll('.measure-item').forEach(item => {
    item.setAttribute('draggable', true);
});

// Restore order on page load
window.addEventListener('DOMContentLoaded', restoreOrder);
