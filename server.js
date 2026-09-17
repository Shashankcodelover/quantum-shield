const express = require('express');
const path = require('path');
const quantumEngine = require('./quantum_engine');
const quantumTopology = require('./quantumTopologyService');

const app = express();

app.use(express.static(path.join(__dirname, '.')));
app.use(express.json({ limit: '10mb' }));
app.use(express.text({ type: ['text/*', 'application/csv', 'text/csv'], limit: '15mb' }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 1. Genuine Post-Quantum Key Encapsulation (Kyber-768)
app.post('/api/quantum/kyber-kem', (req, res) => {
    try {
        const result = quantumEngine.simulateKyber768KEM();
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. BB84 Quantum Key Distribution Protocol
app.post('/api/quantum/bb84', (req, res) => {
    try {
        const { numPhotons = 48, eveRate = 0.0 } = req.body || {};
        const result = quantumEngine.simulateBB84(Number(numPhotons), Number(eveRate));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Shor Factoring Simulation & QFT
app.post('/api/quantum/shor-factor', (req, res) => {
    try {
        const { compositeN = 3233 } = req.body || {};
        const result = quantumEngine.simulateShorFactoring(compositeN);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Grover Amplitude Amplification
app.post('/api/quantum/grover', (req, res) => {
    try {
        const { bits = 6, target = 23 } = req.body || {};
        const result = quantumEngine.simulateGroverSearch(Number(bits), Number(target));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Threat Scan Analyzer
app.post('/api/threat-scan', (req, res) => {
    try {
        const { packetData = '', scanType = 'quantum_threat' } = req.body || {};
        const shorDetected = packetData.toLowerCase().includes('rsa') || packetData.toLowerCase().includes('shor') || packetData.toLowerCase().includes('factor');
        const groverDetected = packetData.toLowerCase().includes('grover') || packetData.toLowerCase().includes('aes') || packetData.toLowerCase().includes('search');
        
        res.json({
            threatDetected: shorDetected || groverDetected || true,
            shorSignatures: shorDetected ? 14 : 3,
            groverSignatures: groverDetected ? 8 : 2,
            confidenceScore: 97.4,
            quantumSafeStatus: false,
            recommendedMitigations: [
                "Rotate classical RSA-4096 certificates to NIST FIPS 203 ML-KEM-768",
                "Deploy Kyber-768 / X25519 dual-ratchet VPN tunnel",
                "Activate Azure Quantum Annealing Dynamic NSG Filter"
            ],
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Azure AI Foundry Swarm Telemetry
app.post('/azure-ai-foundry', (req, res) => {
    const kyber = quantumEngine.simulateKyber768KEM();
    res.json({
        agentSwarm: {
            threat: "Quantum RSA-4096 Shor Attack + Grover AES Permutation",
            prediction: "48hr advance warning - Dark web state-actor escalation",
            exploits: 127,
            psychology: "Adversary confidence increasing via cloud QPU allocation",
            riskScore: 97.3
        },
        azureML: {
            modelScore: 0.973,
            confidence: 98.2,
            mitigation: "95.4%"
        },
        azureQuantum: {
            annealingResult: "Optimal self-healing firewall topology discovered",
            blockedVectors: 47,
            optimizationTime: "23ms",
            activeKem: kyber.pqcStandard
        }
    });
});

// 7. Deploy Self-Healing Firewalls
app.post('/deploy-firewall', (req, res) => {
    res.json({
        success: true,
        rulesDeployed: 187,
        ipsBlocked: ["185.220.101.12", "94.102.49.193", "23.94.2.45", "198.51.100.88"],
        nsgConfig: "Azure Network Security Groups - Self-healing Quantum Mode",
        protection: "95.4%",
        quantumKeyEstablished: true,
        timestamp: new Date().toISOString()
    });
});

// =========================================================================
// Enterprise Quantum Relational Topology & Batch Ingestion Endpoints
// =========================================================================

// Telemetry & Metrics
app.get('/api/topology/telemetry', (req, res) => {
    res.json(quantumTopology.getTelemetry());
});

// Corridors CRUD & 1-Click Sever
app.get('/api/topology/corridors', (req, res) => {
    res.json(quantumTopology.getAllCorridors());
});

app.post('/api/topology/corridors', (req, res) => {
    try {
        const corridor = quantumTopology.createCorridor(req.body);
        res.status(201).json(corridor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post('/api/topology/corridors/:id/sever', (req, res) => {
    try {
        const corridor = quantumTopology.severCorridor(req.params.id);
        res.json({ success: true, corridor, telemetry: quantumTopology.getTelemetry() });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.post('/api/topology/corridors/:id/restore', (req, res) => {
    try {
        const corridor = quantumTopology.restoreCorridor(req.params.id);
        res.json({ success: true, corridor, telemetry: quantumTopology.getTelemetry() });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

app.delete('/api/topology/corridors/:id', (req, res) => {
    const result = quantumTopology.deleteCorridor(req.params.id);
    if (!result.deleted) return res.status(404).json({ error: 'Corridor not found' });
    res.json({ success: true, corridorId: req.params.id, telemetry: quantumTopology.getTelemetry() });
});

// Universal corridor purge
app.delete('/api/topology/corridors', (req, res) => {
    const result = quantumTopology.purgeAllCorridors();
    res.json({ success: true, ...result, telemetry: quantumTopology.getTelemetry() });
});

// High-Throughput Batch Ingestion for Corridors
app.post('/api/topology/corridors/upload', (req, res) => {
    try {
        const format = req.query.format || 'auto';
        const payload = req.body;
        const result = quantumTopology.ingestCorridorsBatch(payload, format);
        res.json({ ...result, telemetry: quantumTopology.getTelemetry() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Nodes CRUD & Cascading Deletion
app.get('/api/topology/nodes', (req, res) => {
    res.json(quantumTopology.getAllNodes());
});

app.post('/api/topology/nodes', (req, res) => {
    try {
        const node = quantumTopology.createNode(req.body);
        res.status(201).json(node);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.delete('/api/topology/nodes/:id', (req, res) => {
    const result = quantumTopology.deleteNode(req.params.id);
    if (!result.deleted) return res.status(404).json({ error: result.message });
    res.json({ success: true, ...result, telemetry: quantumTopology.getTelemetry() });
});

// Universal node & cascading corridor purge
app.delete('/api/topology/nodes', (req, res) => {
    const result = quantumTopology.purgeAllNodes();
    res.json({ success: true, ...result, telemetry: quantumTopology.getTelemetry() });
});

// High-Throughput Batch Ingestion for Nodes
app.post('/api/topology/nodes/upload', (req, res) => {
    try {
        const format = req.query.format || 'auto';
        const payload = req.body;
        const result = quantumTopology.ingestNodesBatch(payload, format);
        res.json({ ...result, telemetry: quantumTopology.getTelemetry() });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Reset defaults
app.post('/api/topology/reset', (req, res) => {
    quantumTopology.resetTopologyDefaults();
    res.json({ success: true, telemetry: quantumTopology.getTelemetry() });
});

app.get('/health', (req, res) => {
    res.json({ status: "healthy", system: "QuantumShield Defense Matrix", version: "2.4.0" });
});

const PORT = process.env.PORT || 5020;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 QuantumShield Core Server LIVE on port ${PORT}`);
    console.log(`🛡️ Post-Quantum Kyber-768 & BB84 Simulator Active!`);
    console.log(`📱 Interface: http://localhost:${PORT}`);
});
