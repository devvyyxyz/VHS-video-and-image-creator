// options.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize filter checkboxes to unchecked state
    const filterCheckboxes = document.querySelectorAll('.toggle-filter');
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false; // Ensure filters are initially unchecked
        checkbox.addEventListener('change', () => {
            toggleFilter(checkbox.dataset.filter, checkbox.checked);
        });
    });

    // Add event listeners for filter intensity sliders
    const intensitySliders = document.querySelectorAll('.intensity-slider');
    intensitySliders.forEach(slider => {
        slider.addEventListener('input', () => {
            updateFilterIntensity(slider.dataset.filter, slider.value);
        });
    });

    // Ensure canvas starts with original image
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');
    const originalImg = document.getElementById('original-image').querySelector('img');
    canvas.width = originalImg.width;
    canvas.height = originalImg.height;
    context.drawImage(originalImg, 0, 0, canvas.width, canvas.height);
});

// Function to toggle filter visibility
function toggleFilter(filterName, enabled) {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');

    switch (filterName) {
        case 'grayscale':
            if (enabled) {
                applyGrayscale(context);
            } else {
                clearFilters(context);
            }
            break;
        case 'sepia':
            if (enabled) {
                applySepia(context);
            } else {
                clearFilters(context);
            }
            break;
        case 'invert':
            if (enabled) {
                applyInvert(context);
            } else {
                clearFilters(context);
            }
            break;
        default:
            break;
    }
}

// Function to update filter intensity
function updateFilterIntensity(filterName, intensity) {
    // Implement intensity adjustments here if needed
}

// Function to clear filters
function clearFilters(context) {
    const canvas = document.getElementById('modified-canvas');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(document.getElementById('original-image').querySelector('img'), 0, 0, canvas.width, canvas.height);
}
