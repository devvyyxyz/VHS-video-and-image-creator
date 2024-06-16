// options.js

document.addEventListener('DOMContentLoaded', () => {
    // Example: Load default filter values from variables
    const crtIntensitySlider = document.getElementById('crt-intensity-slider');
    crtIntensitySlider.value = 50; // Example default value for CRT intensity

    const noiseIntensitySlider = document.getElementById('noise-intensity-slider');
    noiseIntensitySlider.value = 50; // Example default value for noise intensity

    // Event listeners for sliders or other inputs to apply filters dynamically
    crtIntensitySlider.addEventListener('input', applyFilters);
    noiseIntensitySlider.addEventListener('input', applyFilters);
});

// Function to apply filters based on options
function applyFilters() {
    // Example: Get values from sliders and apply filters
    const crtIntensity = document.getElementById('crt-intensity-slider').value;
    const noiseIntensity = document.getElementById('noise-intensity-slider').value;

    const modifiedCanvas = document.getElementById('modified-canvas');
    const modifiedContext = modifiedCanvas.getContext('2d');

    // Example: Apply filters using imported functions from filters.js
    applyGrayscale(modifiedContext); // Example filter

    // Apply additional filters as needed
}
