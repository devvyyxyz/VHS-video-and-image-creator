// filters.js

// List of available filters
const filters = [
    { name: 'grayscale', label: 'Grayscale' },
    { name: 'sepia', label: 'Sepia' },
    { name: 'invert', label: 'Invert' },
    { name: 'noise', label: 'Noise' } // Added noise filter
];

// Function to initialize filter options
function initializeFilters() {
    const filterOptions = document.getElementById('filter-options');

    filters.forEach(filter => {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option', `${filter.name}-option`);

        const optionToggle = document.createElement('div');
        optionToggle.classList.add('option-toggle');

        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" class="toggle-filter" data-filter="${filter.name}"> ${filter.label}`;

        optionToggle.appendChild(label);
        optionDiv.appendChild(optionToggle);
        filterOptions.appendChild(optionDiv);
    });
}

// Initialize filters on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
});
