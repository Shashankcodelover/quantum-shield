const express = require('express');
const path = require('path');
const multer = require('multer');

const preAttackDetector = require('./detectors/preAttackDetector');
const imageDetector = require('./detectors/imageAttackDetector');

const app = express();

/* =========================
   STATIC FILES
========================= */
app.use(express.static(path.join(__dirname, '.')));

/* =========================
   IMAGE UPLOAD (MUST COME FIRST)
========================= */
const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    const analysis = imageDetector.analyzeImage(req.file);

    if (analysis.detected) {
        console.log('🛑 IMAGE ATTACK BLOCKED:', analysis);

        return res.status(403).json({
            blocked: true,
            riskScore: analysis.riskScore,
            decision: analysis.decision
        });
    }

    res.json({
        allowed: true,
        message: 'Image is safe',
        size: req.file.size,
        type: req.file.mimetype
    });
});

/* =========================
   JSON PARSER (AFTER UPLOAD)
========================= */
app.use(express.json({ limit: '10mb' }));

/* =========================
   PRE-ATTACK JSON DETECTOR
========================= */
app.use((req, res, next) => {

    // Only inspect JSON POST requests
    if (
        req.method !== 'POST' ||
        !req.is('application/json')
    ) {
        return next();
    }

    // Skip internal API
    if (req.path === '/azure-ai-foundry') {
        return next();
    }

    const analysis = preAttackDetector.analyzeRequest(req.body || {});

    if (analysis.detected) {
        console.log('🛑 PRE-ATTACK BLOCKED:', analysis);

        return res.status(403).json({
            blocked: true,
            riskScore: analysis.riskScore,
            decision: analysis.decision
        });
    }

    next();
});

/* =========================
   INTERNAL API
========================= */
app.post('/azure-ai-foundry', (req, res) => {
    res.json({
        allowed: true,
        system: 'QuantumShield Pre-Detection Active'
    });
});

app.post('/temporal-isolation', (req, res) => {
    res.json({
        isolation: true,
        window: "10s",
        predictedLoss: "<1%",
        message: "Attack surface frozen in advance"
    });
});


/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 QuantumShield LIVE on port ${PORT}`);
});
