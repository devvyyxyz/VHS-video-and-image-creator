document.addEventListener('DOMContentLoaded', () => {
    const optionToggles = document.querySelectorAll('.toggle-option input');

    optionToggles.forEach(toggle => {
        const option = toggle.dataset.option;
        const subOptions = document.querySelectorAll(`.${option}-option .sub-option`);

        // Initial display setting based on the toggle state
        subOptions.forEach(subOption => {
            subOption.style.display = toggle.checked ? 'block' : 'none';
        });

        toggle.addEventListener('change', (event) => {
            subOptions.forEach(subOption => {
                subOption.style.display = event.target.checked ? 'block' : 'none';
            });
        });
    });

    document.querySelectorAll('.transparency-slider').forEach(slider => {
        slider.addEventListener('input', (event) => {
            const valueSpan = event.target.nextElementSibling;
            valueSpan.textContent = event.target.value;
        });
    });

    document.querySelectorAll('.intensity-slider').forEach(slider => {
        slider.addEventListener('input', (event) => {
            const valueSpan = event.target.nextElementSibling;
            valueSpan.textContent = event.target.value;
        });
    });
});