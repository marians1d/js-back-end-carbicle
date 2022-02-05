document.getElementById('cars').addEventListener('click', (ev) => {
    const btn = ev.target;
    if (btn.classList.contains('more')) {
        const description = btn.parentElement.querySelector('.description');

        if (description.style.display == 'block') {
            description.style.display = '';
            btn.textContent = 'Show more';
        } else {
            description.style.display = 'block';
            btn.textContent = 'Hide info';
        }
    }
});