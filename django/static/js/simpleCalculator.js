document.addEventListener("DOMContentLoaded", () => {
    const calcInput = document.querySelector('.calculator input');

    calcInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            try {
                // Safely evaluate with math.js
                const result = math.evaluate(calcInput.value);
                calcInput.value = result;
            } catch {
                calcInput.value = 'Error';
            }
        }
    });
});