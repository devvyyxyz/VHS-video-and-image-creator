// options.js

let currentNoiseData = null; // Store original image data to prevent cumulative noise
let currentVCRLinesData = null; // Store original image data for VCR lines filter

document.addEventListener('DOMContentLoaded', () => {
    // Initialize filter checkboxes to unchecked state
    const filterCheckboxes = document.querySelectorAll('.toggle-filter');
    filterCheckboxes.forEach(checkbox => {
        checkbox.checked = false; // Ensure filters are initially unchecked
        checkbox.addEventListener('change', () => {
            toggleFilter(checkbox.dataset.filter, checkbox.checked);
        });
    });

    // Initialize VCR lines intensity slider if available
    const vcrLinesIntensitySlider = document.getElementById('noise-intensity');
    if (vcrLinesIntensitySlider) {
        vcrLinesIntensitySlider.addEventListener('input', () => {
            applyNoiseWithIntensity(parseInt(vcrLinesIntensitySlider.value, 10));
        });
    }

    // Initialize noise intensity slider if available
    const noiseIntensitySlider = document.getElementById('vcr-lines-intensity');
    if (noiseIntensitySlider) {
        noiseIntensitySlider.addEventListener('input', () => {
            applyVCRLinesWithIntensity(parseInt(noiseIntensitySlider.value, 10));
        });
    }

    // Initialize JPEG compression intensity slider
    const jpegIntensitySlider = document.getElementById('jpeg-intensity');
    jpegIntensitySlider.addEventListener('input', () => {
        if (document.querySelector('.toggle-filter[data-filter="jpeg"]').checked) {
            applyJPEGCompression();
        }
    });

    // Add event listener for reset button if available
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetImageAndFilters);
    }
});

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
                applyNoiseWithIntensity(parseInt(document.getElementById('noise-intensity').value, 10));
            } else {
                clearNoise(context);
            }
            break;
        case 'vcrLines':
            if (enabled) {
                applyVCRLinesWithIntensity(parseInt(document.getElementById('vcr-lines-intensity').value, 10));
            } else {
                clearVCRLines(context);
            }
            break;
        case 'jpeg':
            if (enabled) {
                applyJPEGCompression();
            } else {
                clearJPEGCompression(context);
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

// Function to apply noise filter with intensity scale from slider
function applyNoiseWithIntensity(intensity) {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');

    // Check if original image data is stored
    if (!currentNoiseData) {
        currentNoiseData = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    const imageData = context.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    const factor = intensity / 100; // Convert intensity to a factor between 0 and 1

    for (let i = 0; i < data.length; i += 4) {
        const random = (Math.random() * 2 - 1) * factor * 255; // Random noise between -factor * 255 to +factor * 255
        data[i] = currentNoiseData.data[i] + random; // Red channel
        data[i + 1] = currentNoiseData.data[i + 1] + random; // Green channel
        data[i + 2] = currentNoiseData.data[i + 2] + random; // Blue channel
        data[i + 3] = 255; // Alpha channel
    }

    context.putImageData(imageData, 0, 0);
}

// Function to clear noise filter
function clearNoise(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);

    // Reset stored image data
    currentNoiseData = null;
}

// Function to apply VCR lines filter with intensity scale from slider
function applyVCRLinesWithIntensity(intensity) {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');

    // Check if original image data is stored
    if (!currentVCRLinesData) {
        currentVCRLinesData = context.getImageData(0, 0, canvas.width, canvas.height);
    }

    const imageData = context.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    const lineGap = Math.floor(canvas.height / intensity); // Calculate line gap based on intensity

    for (let y = 0; y < canvas.height; y++) {
        if (y % lineGap === 0) {
            for (let x = 0; x < canvas.width; x++) {
                const index = (y * canvas.width + x) * 4;
                data[index] = currentVCRLinesData.data[index] * 0.8; // Red channel
                data[index + 1] = currentVCRLinesData.data[index + 1] * 0.8; // Green channel
                data[index + 2] = currentVCRLinesData.data[index + 2] * 0.8; // Blue channel
                data[index + 3] = 255; // Alpha channel
            }
        }
    }

    context.putImageData(imageData, 0, 0);
}


// Function to clear VCR lines filter
function clearVCRLines(context) {
    const originalImage = document.getElementById('original-image').querySelector('img');
    if (!originalImage) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.drawImage(originalImage, 0, 0, context.canvas.width, context.canvas.height);

    // Reset stored image data
currentVCRLinesData = null;
}

// Function to apply JPEG compression filter
function applyJPEGCompression() {
    const canvas = document.getElementById('modified-canvas');
    const context = canvas.getContext('2d');
    const jpegIntensitySlider = document.getElementById('jpeg-intensity');
    const quality = jpegIntensitySlider.value / 100; // Convert slider value to a quality factor between 0 and 1

    // Convert the image data to JPEG format with specified quality
    const jpegImageData = canvas.toDataURL('image/jpeg', quality);

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the compressed JPEG image onto the canvas
    const img = new Image();
    img.onload = function () {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = jpegImageData;
}

// Function to clear JPEG compression (restore original image)
function clearJPEGCompression(context) {
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
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
clearNoise(context);
clearVCRLines(context);
}
