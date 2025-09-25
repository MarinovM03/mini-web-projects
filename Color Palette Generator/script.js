const generateBtn = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');

generateBtn.addEventListener('click', generatePalette);

function generatePalette() {
    const colors = [];

    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor());
    }
}

