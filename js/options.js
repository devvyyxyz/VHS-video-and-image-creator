document.querySelectorAll('.toggle-option input').forEach(toggle => {
  toggle.addEventListener('change', (event) => {
      const option = event.target.dataset.option;
      const subOptions = document.querySelector(`.${option}-options`);
      subOptions.style.display = event.target.checked ? 'block' : 'none';
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