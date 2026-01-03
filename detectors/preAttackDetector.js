// detectors/preAttackDetector.js

function analyzeRequest(payload) {
    let score = 0;

    const rules = [
        /quantum/i,
        /rsa[-_ ]?4096/i,
        /shor/i,
        /key[-_ ]?extract/i,
        /dark[-_ ]?web/i,
        /payload/i,
        /exploit/i
    ];

    rules.forEach(rule => {
        if (rule.test(JSON.stringify(payload))) {
            score += 15;
        }
    });

    return {
        detected: score >= 45,
        riskScore: score,
        decision: score >= 45 ? "BLOCK" : "ALLOW"
    };
}

module.exports = { analyzeRequest };
