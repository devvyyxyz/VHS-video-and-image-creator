document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const originalImage = document.getElementById('original-image').querySelector('img');
    const modifiedImageCanvas = document.getElementById('image-canvas');
    const context = modifiedImageCanvas.getContext('2d');
    let uploadedImage = new Image();

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                uploadedImage.src = e.target.result;
                uploadedImage.onload = () => {
                    originalImage.src = e.target.result;
                    drawImageWithNoise();
                };
            };
            reader.readAsDataURL(file);
        }
    });

    // Use default image if no image is uploaded
    if (!fileInput.files.length) {
        uploadedImage.src = 'default.png';
        uploadedImage.onload = () => {
            originalImage.src = 'default.png';
            drawImageWithNoise();
        };
    }

    const drawImageWithNoise = () => {
        modifiedImageCanvas.width = uploadedImage.width;
        modifiedImageCanvas.height = uploadedImage.height;
        context.drawImage(uploadedImage, 0, 0);
        applyImageNoise();
    };

    const applyImageNoise = () => {
        const noiseIntensitySlider = document.getElementById('noise-intensity-slider');
        const noiseIntensity = noiseIntensitySlider.value;

        const imageData = context.getImageData(0, 0, modifiedImageCanvas.width, modifiedImageCanvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const randomNoise = (Math.random() - 0.5) * noiseIntensity;
            data[i] = data[i] + randomNoise;     // Red
            data[i + 1] = data[i + 1] + randomNoise; // Green
            data[i + 2] = data[i + 2] + randomNoise; // Blue
        }

        context.putImageData(imageData, 0, 0);
    };

    document.getElementById('noise-intensity-slider').addEventListener('input', () => {
        drawImageWithNoise();
    });
});