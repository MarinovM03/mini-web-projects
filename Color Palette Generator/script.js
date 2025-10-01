const generateBtn = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');
const copyBtn = document.querySelector('.copy-btn');

generateBtn.addEventListener('click', generatePalette);

paletteContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('copy-btn')) {
        const hexValue = e.target.previousElementSibling.textContent;

        navigator.clipboard.writeText(hexValue)
            .then(() => showCopySuccess())
            .catch(() => console.log(err))
    }
});

function showCopySuccess() {
    copyBtn.classList.remove('far', 'fa-copy');
    copyBtn.classList.add('fas', 'fa-check');

    copyBtn.style.color = '#48bb78';
}

function generatePalette() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }

    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll('.color-box');

    colorBoxes.forEach((box, index) => {
        const color = colors[index];
        const colorDiv = box.querySelector('.color');
        const hexValue = box.querySelector('.hex-value');

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}

// generatePalette();