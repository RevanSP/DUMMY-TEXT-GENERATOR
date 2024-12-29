const words = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
    'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
    'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
    'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
    'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
    'est', 'laborum'
];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const generateSentence = () => {
    const length = Math.floor(Math.random() * 8) + 8;
    let sentence = getRandomWord().charAt(0).toUpperCase() + getRandomWord().slice(1);

    for (let i = 1; i < length; i++) {
        sentence += ' ' + getRandomWord();
    }
    return sentence + '.';
};

const generateParagraph = () => {
    const length = Math.floor(Math.random() * 5) + 4;
    let paragraph = '';

    for (let i = 0; i < length; i++) {
        paragraph += generateSentence() + ' ';
    }
    return paragraph.trim();
};

const generateText = (type, amount) => {
    let result = '';
    amount = Math.min(Math.max(amount, 1), 256);

    switch (type) {
        case 'WORD':
            for (let i = 0; i < amount; i++) {
                result += getRandomWord() + ' ';
            }
            break;
        case 'SENTENCE':
            for (let i = 0; i < amount; i++) {
                result += generateSentence() + ' ';
            }
            break;
        case 'PARAGRAPH':
            for (let i = 0; i < amount; i++) {
                result += generateParagraph() + '\n\n';
            }
            break;
        default:
            result = 'Please select a valid text type';
    }
    return result.trim();
};

document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('select');
    const amountInput = document.getElementById('amount');
    const textarea = document.querySelector('textarea');
    const copyButton = document.getElementById('copyButton');

    const updateText = () => {
        if (select.value !== 'TEXT TYPE' && amountInput.value) {
            textarea.value = generateText(select.value, parseInt(amountInput.value));
            copyButton.disabled = false;
        } else {
            copyButton.disabled = true;
        }
    };

    amountInput.addEventListener('input', (e) => {
        let value = parseInt(e.target.value);
        if (value > 256) {
            e.target.value = 256;
        } else if (value < 1) {
            e.target.value = 1;
        }
        updateText();
    });

    select.addEventListener('change', updateText);

    copyButton.addEventListener('click', () => {
        if (textarea.value) {
            navigator.clipboard.writeText(textarea.value).then(() => {
                copyButton.textContent = 'COPIED';
                setTimeout(() => {
                    copyButton.textContent = 'COPY';
                }, 3000);
            });
        }
    });
});