document.addEventListener('DOMContentLoaded', function () {
    const textInput = document.getElementById('textInput');
    const morseOutput = document.getElementById('morseOutput');
    const convertToMorseBtn = document.getElementById('convertToMorseBtn');
    const copyToClipboardTextBtn = document.getElementById('copyToClipboardTextBtn');

    const morseCodeMap = {
        "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.", "G": "--.", "H": "....", "I": "..", "J": ".---", "K": "-.-",
        "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-", "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-",
        "W": ".--", "X": "-..-", "Y": "-.--", "Z": "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
        "6": "-....", "7": "--...", "8": "---..", "9": "----.", " ": "/"
    };

    const reverseMorseCodeMap = Object.fromEntries(Object.entries(morseCodeMap).map(([key, value]) => [value, key]));

    function textToMorse(text) {
        return text.toUpperCase().split('').map(char => morseCodeMap[char] || char).join(' ');
    }

    function morseToText(morse) {
        return morse.split(' ').map(code => reverseMorseCodeMap[code] || code).join('');
    }

    function toggleConvertButton() {
        const inputText = textInput.value.trim();
        if (inputText) {
            convertToMorseBtn.classList.remove('btn-disabled');
            convertToMorseBtn.classList.add('btn');
        } else {
            convertToMorseBtn.classList.add('btn-disabled');
            convertToMorseBtn.classList.remove('btn');
        }
    }

    function toggleConvertMorseButton() {
        const morseText = morseInput.value.trim();
        if (morseText) {
            convertToTextBtn.classList.remove('btn-disabled');
            convertToTextBtn.classList.add('btn');
        } else {
            convertToTextBtn.classList.add('btn-disabled');
            convertToTextBtn.classList.remove('btn');
        }
    }

    textInput.addEventListener('input', function () {
        toggleConvertButton();
    });

    morseInput.addEventListener('input', function () {
        toggleConvertMorseButton();
    });

    convertToMorseBtn.addEventListener('click', function () {
        const inputText = textInput.value.trim();
        if (inputText) {
            const morseText = textToMorse(inputText);
            morseOutput.value = morseText;
            copyToClipboardTextBtn.classList.remove('btn-disabled');
            copyToClipboardTextBtn.classList.add('btn');
        } else {
            morseOutput.value = '';
            copyToClipboardTextBtn.classList.add('btn-disabled');
            copyToClipboardTextBtn.classList.remove('btn');
        }
    });

    copyToClipboardTextBtn.addEventListener('click', function () {
        const morseText = morseOutput.value.trim();
        if (morseText) {
            navigator.clipboard.writeText(morseText).then(function () {
                copyToClipboardTextBtn.textContent = 'COPIED';
                setTimeout(function () {
                    copyToClipboardTextBtn.textContent = 'COPY';
                }, 3000);
            });
        }
    });

    convertToTextBtn.addEventListener('click', function () {
        const morseText = morseInput.value.trim();
        if (morseText) {
            const text = morseToText(morseText);
            textOutput.value = text;
            copyToClipboardMorseBtn.classList.remove('btn-disabled');
            copyToClipboardMorseBtn.classList.add('btn');
        } else {
            textOutput.value = '';
            copyToClipboardMorseBtn.classList.add('btn-disabled');
            copyToClipboardMorseBtn.classList.remove('btn');
        }
    });

    copyToClipboardMorseBtn.addEventListener('click', function () {
        const text = textOutput.value.trim();
        if (text) {
            navigator.clipboard.writeText(text).then(function () {
                copyToClipboardMorseBtn.textContent = 'COPIED';
                setTimeout(function () {
                    copyToClipboardMorseBtn.textContent = 'COPY';
                }, 3000);
            });
        }
    });
});