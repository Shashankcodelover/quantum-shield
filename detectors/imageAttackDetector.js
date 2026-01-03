// detectors/imageAttackDetector.js

function analyzeImage(file) {
    let score = 0;

    // Rule 1: Suspicious filename
    if (/sql|script|payload|exploit|hack/i.test(file.originalname)) {
        score += 40;
    }

    // Rule 2: Fake image types
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
        score += 50;
    }

    // Rule 3: Very large image (possible payload)
    if (file.size > 3 * 1024 * 1024) {
        score += 30;
    }

    return {
        detected: score >= 50,
        riskScore: score,
        decision: score >= 50 ? "BLOCK" : "ALLOW"
    };
}

module.exports = { analyzeImage };
