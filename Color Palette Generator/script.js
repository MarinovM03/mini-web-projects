const generateBtn = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');

generateBtn.addEventListener('click', generatePalette);

function generatePalette() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

generatePalette();