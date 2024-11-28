const axios = require('axios');

async function translateText(text) {
    const apiKey = 'YOUR_API_KEY';
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await axios.post(url, {
        q: text,
        target: 'fa', // Farsi language code
    });

    return response.data.data.translations[0].translatedText;
}

// Example usage
translateText('Hello, how are you?').then(translated => {
    console.log(translated); // Outputs: سلام، حال شما چطور است؟
});
