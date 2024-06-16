document.getElementById('download-btn').addEventListener('click', () => {
    const modifiedImage = document.getElementById('modified-image').querySelector('img');

    const link = document.createElement('a');
    link.href = modifiedImage.src;
    link.download = 'updated-image.png';
    link.click();
});