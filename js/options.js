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

        // Add event listener for reset button
        const resetBtn = document.getElementById('reset-btn');
        resetBtn.addEventListener('click', resetImageAndFilters);
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
                    clearGrayscale(context);
                }
                break;
            case 'sepia':
                if (enabled) {
                    applySepia(context);
                } else {
                    clearSepia(context);
                }
                break;
            case 'invert':
                if (enabled) {
                    applyInvert(context);
                } else {
                    clearInvert(context);
                }
                break;
            case 'noise':
                if (enabled) {
                    applyNoise(context);
                } else {
                    clearNoise(context);
                }
                break;
            default:
                break;
        }
    }

    // Function to apply grayscale filter
    function applyGrayscale(context) {
        const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // Red
            data[i + 1] = avg; // Green
            data[i + 2] = avg; // Blue
        }

        context.putImageData(imageData, 0, 0);
    }

    // Function to clear grayscale filter
    function clearGrayscale(context) {
        const originalImage = document.getElementById('original-image').querySelector('img');
        if (!originalImage) return;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
    }

    // Function to apply sepia filter
    function applySepia(context) {
        const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const red = data[i];
            const green = data[i + 1];
            const blue = data[i + 2];

            data[i] = Math.min(255, red * 0.393 + green * 0.769 + blue * 0.189); // Red
            data[i + 1] = Math.min(255, red * 0.349 + green * 0.686 + blue * 0.168); // Green
            data[i + 2] = Math.min(255, red * 0.272 + green * 0.534 + blue * 0.131); // Blue
        }

        context.putImageData(imageData, 0, 0);
    }

    // Function to clear sepia filter
    function clearSepia(context) {
        const originalImage = document.getElementById('original-image').querySelector('img');
        if (!originalImage) return;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
    }

    // Function to apply invert filter
    function applyInvert(context) {
        const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i]; // Red
            data[i + 1] = 255 - data[i + 1]; // Green
            data[i + 2] = 255 - data[i + 2]; // Blue
        }

        context.putImageData(imageData, 0, 0);
    }

    // Function to clear invert filter
    function clearInvert(context) {
        const originalImage = document.getElementById('original-image').querySelector('img');
        if (!originalImage) return;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
    }

    // Function to apply noise filter
    function applyNoise(context) {
        const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
        const data = imageData.data;
        const intensity = 50; // Adjust intensity as needed

        for (let i = 0; i < data.length; i += 4) {
            const random = Math.random() * intensity;
            data[i] += random; // Red channel
            data[i + 1] += random; // Green channel
            data[i + 2] += random; // Blue channel
        }

        context.putImageData(imageData, 0, 0);
    }

    // Function to clear noise filter
    function clearNoise(context) {
        const originalImage = document.getElementById('original-image').querySelector('img');
        if (!originalImage) return;

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
    }

    // Function to reset image and all filters
    function resetImageAndFilters() {
        const canvas = document.getElementById('modified-canvas');
        const context = canvas.getContext('2d');

        // Clear canvas
        const originalImage = document.getElementById('original-image').querySelector('img');
        if (originalImage) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);
        }

        // Reset filter checkboxes
        const filterCheckboxes = document.querySelectorAll('.toggle-filter');
        filterCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Clear any applied filters
        clearGrayscale(context);
        clearSepia(context);
        clearInvert(context);
        clearNoise(context); // Include clear for noise filter if applicable
    }
