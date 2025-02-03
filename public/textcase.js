function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+|_|\-|\b)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase())
        .replace(/\s+|_|\-/g, '');
}

function toSnakeCase(str) {
    return str.replace(/\s+/g, '_').toLowerCase();
}

function toKebabCase(str) {
    return str.replace(/\s+/g, '-').toLowerCase();
}

function toLowerCase(str) {
    return str.toLowerCase();
}

function toPascalCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+|\-|\_)/g, (match, index) => match.toUpperCase())
        .replace(/\s+|_|\-/g, '');
}

function toUpperCase(str) {
    return str.toUpperCase();
}

function toTitleCase(str) {
    return str
        .toLowerCase()
        .replace(/\b(\w)/g, function (match) {
            return match.toUpperCase();
        });
}

function toSentenceCase(str) {
    return str
        .toLowerCase()
        .replace(/^(\w)/, function (match) {
            return match.toUpperCase();
        });
}

function toConstantCase(str) {
    return str.replace(/\s+/g, '_').toUpperCase();
}

function toStudlyCase(str) {
    return str
        .split('')
        .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
        .join('');
}

function toggleConvertButton() {
    const selectElement = document.getElementById('caseOption');
    const inputText = document.querySelector('textarea').value.trim();
    const convertBtn = document.getElementById('convertBtn');

    if (selectElement.value === 'SELECT' || selectElement.value === '' || inputText === '') {
        convertBtn.disabled = true;
        convertBtn.classList.add('btn-disabled');
    } else {
        convertBtn.disabled = false;
        convertBtn.classList.remove('btn-disabled');
    }
}

function toggleCopyButton() {
    const outputText = document.getElementById('outputText').value.trim();
    const copyBtn = document.getElementById('copyBtn');

    if (outputText === '') {
        copyBtn.disabled = true;
        copyBtn.classList.add('btn-disabled');
    } else {
        copyBtn.disabled = false;
        copyBtn.classList.remove('btn-disabled');
    }
}

document.getElementById('convertBtn').addEventListener('click', function () {
    const inputText = document.querySelector('textarea').value.trim();
    const selectedOption = document.getElementById('caseOption').value;
    let outputText = '';

    if (selectedOption === 'SELECT' || selectedOption === '') {
        document.getElementById('outputText').value = '';
        return;
    }

    switch (selectedOption) {
        case 'camel':
            outputText = toCamelCase(inputText);
            break;
        case 'snake':
            outputText = toSnakeCase(inputText);
            break;
        case 'kebab':
            outputText = toKebabCase(inputText);
            break;
        case 'lower':
            outputText = toLowerCase(inputText);
            break;
        case 'pascal':
            outputText = toPascalCase(inputText);
            break;
        case 'upper':
            outputText = toUpperCase(inputText);
            break;
        case 'title':
            outputText = toTitleCase(inputText);
            break;
        case 'sentence':
            outputText = toSentenceCase(inputText);
            break;
        case 'constant':
            outputText = toConstantCase(inputText);
            break;
        case 'studly':
            outputText = toStudlyCase(inputText);
            break;
    }

    document.getElementById('outputText').value = outputText;

    toggleCopyButton();
});

document.getElementById('copyBtn').addEventListener('click', function () {
    const outputText = document.getElementById('outputText');
    outputText.select();
    document.execCommand('copy');

    const copyBtn = document.getElementById('copyBtn');
    const originalText = copyBtn.textContent;
    copyBtn.textContent = "COPIED";

    setTimeout(function () {
        copyBtn.textContent = originalText;
    }, 3000);
});

document.getElementById('caseOption').addEventListener('change', function () {
    toggleConvertButton();
    toggleCopyButton();
});

document.getElementById('outputText').addEventListener('input', toggleCopyButton);
document.querySelector('textarea').addEventListener('input', toggleConvertButton);

toggleConvertButton();
toggleCopyButton();