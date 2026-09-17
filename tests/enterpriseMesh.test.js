const { describe, it, beforeEach } = require('node:test');
const assert = require('node:assert');
const quantumTopology = require('../quantumTopologyService');

describe('QuantumShield Enterprise Relational Topology & Batch Ingestion Suite', () => {
    beforeEach(() => {
        quantumTopology.resetTopologyDefaults();
    });

    it('1. should seed default substation nodes and verify schema integrity', () => {
        const nodes = quantumTopology.getAllNodes();
        assert.ok(Array.isArray(nodes));
        assert.strictEqual(nodes.length, 6);
        const central = quantumTopology.getNodeById('SUB-01-CENTRAL');
        assert.ok(central);
        assert.strictEqual(central.voltage, '765 kV');
        assert.strictEqual(central.pqcStatus, 'active');
    });

    it('2. should calculate live telemetry with quantum safe coverage and average fidelity', () => {
        const telemetry = quantumTopology.getTelemetry();
        assert.strictEqual(telemetry.totalNodes, 6);
        assert.strictEqual(telemetry.totalCorridors, 5);
        assert.strictEqual(telemetry.activeCorridors, 5);
        assert.strictEqual(telemetry.severedCorridors, 0);
        assert.ok(telemetry.avgFidelity > 0.98);
        assert.ok(telemetry.quantumSafeCoveragePercent > 80);
    });

    it('3. should provision a new quantum entanglement corridor and bind nodes', () => {
        const corridor = quantumTopology.createCorridor({
            id: 'Q-CORR-TEST-99',
            sourceNodeId: 'SUB-04-EAST',
            targetNodeId: 'SUB-06-NUCLEAR',
            protocol: 'NIST FIPS 203 ML-KEM-768',
            fidelity: 0.998,
            coherenceTimeUs: 310,
            entanglementRateEps: 7100,
            qberPercent: 0.38
        });
        assert.strictEqual(corridor.id, 'Q-CORR-TEST-99');
        assert.strictEqual(corridor.status, 'active');
        const telemetry = quantumTopology.getTelemetry();
        assert.strictEqual(telemetry.totalCorridors, 6);
    });

    it('4. should sever a quantum corridor with 1-click control and recalculate metrics', () => {
        const severed = quantumTopology.severCorridor('Q-CORR-101');
        assert.strictEqual(severed.status, 'severed');
        assert.ok(severed.severedAt);

        const telemetry = quantumTopology.getTelemetry();
        assert.strictEqual(telemetry.severedCorridors, 1);
        assert.strictEqual(telemetry.activeCorridors, 4);

        const restored = quantumTopology.restoreCorridor('Q-CORR-101');
        assert.strictEqual(restored.status, 'active');
        assert.strictEqual(quantumTopology.getTelemetry().severedCorridors, 0);
    });

    it('5. should delete single corridor and verify referential continuity', () => {
        const result = quantumTopology.deleteCorridor('Q-CORR-102');
        assert.strictEqual(result.deleted, true);
        assert.strictEqual(quantumTopology.getAllCorridors().length, 4);
    });

    it('6. should execute cascading deletion when a substation node is removed', () => {
        // SUB-01-CENTRAL is connected to Q-CORR-101, Q-CORR-102, Q-CORR-105
        const result = quantumTopology.deleteNode('SUB-01-CENTRAL');
        assert.strictEqual(result.deleted, true);
        assert.strictEqual(result.cascadedCorridorsRemoved, 3);
        assert.strictEqual(quantumTopology.getAllNodes().length, 5);
        assert.strictEqual(quantumTopology.getAllCorridors().length, 2);
    });

    it('7. should ingest corridors batch via RFC 4180 CSV format', () => {
        const csvData = `id,sourceNodeId,targetNodeId,protocol,fidelity,coherenceTimeUs,entanglementRateEps,qberPercent
Q-BATCH-01,SUB-02-NORTH,SUB-04-EAST,"NIST FIPS 203 ML-KEM-768",0.995,210,4300,0.95
Q-BATCH-02,SUB-03-TRANS,SUB-05-HYDRO,"BB84 Polarized QKD",0.989,175,3700,1.45`;

        const batch = quantumTopology.ingestCorridorsBatch(csvData, 'csv');
        assert.strictEqual(batch.success, true);
        assert.strictEqual(batch.ingestedCount, 2);
        assert.strictEqual(batch.errorCount, 0);
        assert.strictEqual(quantumTopology.getAllCorridors().length, 7);
    });

    it('8. should ingest substation nodes batch via structured JSON format', () => {
        const jsonData = JSON.stringify([
            {
                id: 'SUB-07-SOLAR',
                name: 'Mojave Solar Thermal Array Substation',
                voltage: '400 kV',
                zone: 'Desert Solar Alpha',
                pqcStatus: 'active',
                failoverMode: 'Quantum Mesh Reroute'
            },
            {
                id: 'SUB-08-GEOTHERM',
                name: 'Geothermal Deep Core Substation',
                voltage: '220 kV',
                zone: 'Tectonic Ridge Beta',
                pqcStatus: 'active',
                failoverMode: 'Local Hardening'
            }
        ]);

        const batch = quantumTopology.ingestNodesBatch(jsonData, 'json');
        assert.strictEqual(batch.success, true);
        assert.strictEqual(batch.ingestedCount, 2);
        assert.strictEqual(quantumTopology.getAllNodes().length, 8);
    });

    it('9. should safely reject malformed batch payloads with error feedback', () => {
        assert.throws(() => {
            quantumTopology.ingestCorridorsBatch('malformed,corrupt,row\n');
        });
    });

    it('10. should execute universal corridor purge and verify zero count', () => {
        const purgeResult = quantumTopology.purgeAllCorridors();
        assert.strictEqual(purgeResult.deletedCorridors, 5);
        assert.strictEqual(quantumTopology.getAllCorridors().length, 0);
        const telemetry = quantumTopology.getTelemetry();
        assert.strictEqual(telemetry.totalCorridors, 0);
        assert.strictEqual(telemetry.activeCorridors, 0);
    });

    it('11. should execute universal node purge with complete cascading purge', () => {
        const purgeResult = quantumTopology.purgeAllNodes();
        assert.strictEqual(purgeResult.deletedNodes, 6);
        assert.strictEqual(purgeResult.deletedCorridors, 5);
        assert.strictEqual(quantumTopology.getAllNodes().length, 0);
        assert.strictEqual(quantumTopology.getAllCorridors().length, 0);
    });
});
