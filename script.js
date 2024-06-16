document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const previewContainer = document.getElementById('previewContainer');
    previewContainer.innerHTML = ''; // Clear previous previews

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileType = file.type.split('/')[0];

            if (fileType === 'image') {
                createImagePreview(e.target.result);
            } else if (fileType === 'video') {
                createVideoPreview(e.target.result);
            }

            // Enable the apply effect button
            document.getElementById('applyEffectButton').disabled = false;
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById('applyEffectButton').addEventListener('click', function() {
    const previewContainer = document.getElementById('previewContainer');
    const canvas = previewContainer.querySelector('canvas');
    const video = previewContainer.querySelector('video');

    if (canvas) {
        const ctx = canvas.getContext('2d');
        applyVHSEffect(ctx, canvas.width, canvas.height);
    } else if (video) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        applyVHSEffect(ctx, canvas.width, canvas.height);
        previewContainer.removeChild(video);
        previewContainer.appendChild(canvas);
    }

    // Disable the button after applying effect (optional)
    this.disabled = true;
});

function createImagePreview(imageData) {
    const img = new Image();
    img.src = imageData;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;

    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const previewContainer = document.getElementById('previewContainer');
        previewContainer.appendChild(canvas);
    };
}

function createVideoPreview(videoData) {
    const video = document.createElement('video');
    video.src = videoData;
    video.controls = true;
    video.autoplay = true;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    video.addEventListener('loadedmetadata', function() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    });

    video.addEventListener('play', function() {
        const drawFrame = function() {
            if (video.paused || video.ended) return;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawFrame);
        };
        drawFrame();
    });

    const previewContainer = document.getElementById('previewContainer');
    previewContainer.appendChild(canvas);
    previewContainer.appendChild(video);
}

function applyVHSEffect(ctx, width, height) {
    // Apply VHS effect here (example: scanlines, color distortion, etc.)
    // Example: Adding scanlines
    ctx.globalAlpha = 0.2; // Adjust transparency for effect
    for (let y = 0; y < height; y += 2) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Adjust color and opacity
        ctx.fillRect(0, y, width, 1);
    }
}