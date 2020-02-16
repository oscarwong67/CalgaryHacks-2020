const fetch = require('node-fetch');

async function sentimentAnalysis(message) {
    // const body = {
    //     documents: [
    //         {
    //             'id': '1',
    //             'text': 'hello world'
    //         },
    //         {
    //             'id': '2',
    //             'text': "i've fallen and can't get up"
    //         },
    //         {
    //             'id': '3',
    //             'text': 'help me'
    //         }
    //     ]
    // }
    const body = {
        documents: [
            {
                'id': '1',
                'text': message
            },
        ]
    }
    const res = await fetch('https://canadacentral.api.cognitive.microsoft.com/text/analytics/v3.0-preview.1/sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '4628f4de10944049af4d35267d5c70f0'
        },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    const scoreObj = data.documents[0].documentScores;
    const score = scoreObj['positive'] - scoreObj['negative'];
    return score;
}

module.exports = sentimentAnalysis;