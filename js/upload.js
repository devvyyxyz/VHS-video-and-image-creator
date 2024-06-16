document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const originalImage = document.getElementById('original-image').querySelector('img');
    const modifiedImage = document.getElementById('modified-image').querySelector('img');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                originalImage.src = e.target.result;
                modifiedImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Use default image if no image is uploaded
    if (!fileInput.files.length) {
        originalImage.src = 'default.png';
        modifiedImage.src = 'default.png';
    }
});