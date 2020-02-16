async function sentimentAnalysis(message) {
    const body = {
        documents: [
            {
                'id': '1',
                'text': 'hello world'
            },
            {
                'id': '2',
                'text': "i've fallen and can't get up"
            },
            {
                'id': '3',
                'text': 'help me'
            }
        ]
    }
    const res = await fetch('https://canadacentral.api.cognitive.microsoft.com/text/analytics/v3.0-preview.1/languages?showStats=true', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '4628f4de10944049af4d35267d5c70f0'
        },
        body
    });
    const data = await res.json();
    return data;
}

export default sentimentAnalysis;