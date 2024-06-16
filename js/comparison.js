document.getElementById('download-btn').addEventListener('click', () => {
    const modifiedImageCanvas = document.getElementById('image-canvas');

    const link = document.createElement('a');
    link.href = modifiedImageCanvas.toDataURL('image/png');
    link.download = 'updated-image.png';
    link.click();
});