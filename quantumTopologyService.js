// =========================================================================
// QuantumShield — Enterprise Quantum Relational Topology Mesh Service
// Manages: Entanglement Corridors, PQC Cryptographic Channels,
// Substation Digital Twin Nodes, Live Telemetry, Universal Cascading Deletion,
// and High-Throughput Batch Ingestion (RFC 4180 CSV & JSON).
// =========================================================================

const crypto = require('crypto');

class QuantumTopologyService {
    constructor() {
        this.resetTopologyDefaults();
    }

    resetTopologyDefaults() {
        this.nodes = [
            {
                id: 'SUB-01-CENTRAL',
                name: 'Central Metro Generation Core',
                voltage: '765 kV',
                zone: 'Metro Grid Alpha',
                pqcStatus: 'active',
                failoverMode: 'Autonomous Annealing',
                createdAt: new Date().toISOString()
            },
            {
                id: 'SUB-02-NORTH',
                name: 'Northern Hydro-Electric Intertie',
                voltage: '400 kV',
                zone: 'Northern Highlands',
                pqcStatus: 'active',
                failoverMode: 'Quantum Mesh Reroute',
                createdAt: new Date().toISOString()
            },
            {
                id: 'SUB-03-TRANS',
                name: 'Western Trans-Regional Switching',
                voltage: '765 kV',
                zone: 'Western Corridor',
                pqcStatus: 'active',
                failoverMode: 'Autonomous Annealing',
                createdAt: new Date().toISOString()
            },
            {
                id: 'SUB-04-EAST',
                name: 'Eastern Industrial Distribution Hub',
                voltage: '220 kV',
                zone: 'Eastern Maritime',
                pqcStatus: 'active',
                failoverMode: 'Local Hardening',
                createdAt: new Date().toISOString()
            },
            {
                id: 'SUB-05-HYDRO',
                name: 'Cascade Dam Quantum Relay',
                voltage: '400 kV',
                zone: 'Hydro Basin Gamma',
                pqcStatus: 'active',
                failoverMode: 'Quantum Mesh Reroute',
                createdAt: new Date().toISOString()
            },
            {
                id: 'SUB-06-NUCLEAR',
                name: 'Seaside Nuclear Power Substation',
                voltage: '765 kV',
                zone: 'Coastal Nuclear Sector',
                pqcStatus: 'active',
                failoverMode: 'Autonomous Annealing',
                createdAt: new Date().toISOString()
            }
        ];

        this.corridors = [
            {
                id: 'Q-CORR-101',
                sourceNodeId: 'SUB-01-CENTRAL',
                targetNodeId: 'SUB-02-NORTH',
                protocol: 'NIST FIPS 203 ML-KEM-768',
                fidelity: 0.994,
                coherenceTimeUs: 195,
                entanglementRateEps: 4800,
                qberPercent: 1.15,
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 'Q-CORR-102',
                sourceNodeId: 'SUB-01-CENTRAL',
                targetNodeId: 'SUB-03-TRANS',
                protocol: 'BB84 Polarized QKD',
                fidelity: 0.988,
                coherenceTimeUs: 165,
                entanglementRateEps: 3600,
                qberPercent: 1.85,
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 'Q-CORR-103',
                sourceNodeId: 'SUB-02-NORTH',
                targetNodeId: 'SUB-05-HYDRO',
                protocol: 'FIPS 204 ML-DSA-87',
                fidelity: 0.997,
                coherenceTimeUs: 230,
                entanglementRateEps: 5200,
                qberPercent: 0.82,
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 'Q-CORR-104',
                sourceNodeId: 'SUB-03-TRANS',
                targetNodeId: 'SUB-04-EAST',
                protocol: 'Falcon-512 Lattice',
                fidelity: 0.982,
                coherenceTimeUs: 140,
                entanglementRateEps: 2900,
                qberPercent: 2.10,
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: 'Q-CORR-105',
                sourceNodeId: 'SUB-06-NUCLEAR',
                targetNodeId: 'SUB-01-CENTRAL',
                protocol: 'NIST FIPS 203 ML-KEM-768',
                fidelity: 0.999,
                coherenceTimeUs: 280,
                entanglementRateEps: 6400,
                qberPercent: 0.45,
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
    }

    // Telemetry and Health Metrics
    getTelemetry() {
        const totalCorridors = this.corridors.length;
        const activeCorridors = this.corridors.filter(c => c.status === 'active').length;
        const severedCorridors = this.corridors.filter(c => c.status === 'severed').length;
        const avgFidelity = totalCorridors > 0
            ? Number((this.corridors.reduce((acc, c) => acc + (Number(c.fidelity) || 0), 0) / totalCorridors).toFixed(4))
            : 0;
        const globalQber = totalCorridors > 0
            ? Number((this.corridors.reduce((acc, c) => acc + (Number(c.qberPercent) || 0), 0) / totalCorridors).toFixed(2))
            : 0;
        const boundNodeIds = new Set();
        this.corridors.forEach(c => {
            boundNodeIds.add(c.sourceNodeId);
            boundNodeIds.add(c.targetNodeId);
        });
        const totalNodes = this.nodes.length;
        const quantumSafeCoveragePercent = totalNodes > 0
            ? Number(((boundNodeIds.size / totalNodes) * 100).toFixed(1))
            : 0;

        return {
            totalCorridors,
            activeCorridors,
            severedCorridors,
            avgFidelity,
            globalQber,
            totalNodes,
            boundNodesCount: boundNodeIds.size,
            quantumSafeCoveragePercent,
            timestamp: new Date().toISOString()
        };
    }

    // Node Operations
    getAllNodes() {
        return this.nodes;
    }

    getNodeById(id) {
        return this.nodes.find(n => n.id === id);
    }

    createNode(data) {
        if (!data || !data.id || !data.name) {
            throw new Error('Node id and name are required.');
        }
        if (this.nodes.some(n => n.id === data.id)) {
            throw new Error(`Node with ID "${data.id}" already exists.`);
        }
        const node = {
            id: String(data.id).trim(),
            name: String(data.name).trim(),
            voltage: data.voltage || '400 kV',
            zone: data.zone || 'Regional Intertie',
            pqcStatus: data.pqcStatus || 'active',
            failoverMode: data.failoverMode || 'Autonomous Annealing',
            createdAt: new Date().toISOString()
        };
        this.nodes.push(node);
        return node;
    }

    deleteNode(id) {
        const initialNodeCount = this.nodes.length;
        this.nodes = this.nodes.filter(n => n.id !== id);
        if (this.nodes.length === initialNodeCount) {
            return { deleted: false, message: `Node "${id}" not found.` };
        }
        // Cascading deletion: remove all corridors connected to this node
        const initialCorridorCount = this.corridors.length;
        this.corridors = this.corridors.filter(c => c.sourceNodeId !== id && c.targetNodeId !== id);
        const cascadedCorridors = initialCorridorCount - this.corridors.length;
        return {
            deleted: true,
            nodeId: id,
            cascadedCorridorsRemoved: cascadedCorridors,
            message: `Node ${id} and ${cascadedCorridors} connected corridors deleted cleanly.`
        };
    }

    purgeAllNodes() {
        const deletedNodes = this.nodes.length;
        const deletedCorridors = this.corridors.length;
        this.nodes = [];
        this.corridors = [];
        return {
            deletedNodes,
            deletedCorridors,
            message: `Universal purge executed: all ${deletedNodes} nodes and ${deletedCorridors} corridors eliminated.`
        };
    }

    // Corridor Operations
    getAllCorridors() {
        return this.corridors;
    }

    getCorridorById(id) {
        return this.corridors.find(c => c.id === id);
    }

    createCorridor(data) {
        if (!data || !data.sourceNodeId || !data.targetNodeId) {
            throw new Error('sourceNodeId and targetNodeId are required.');
        }
        const id = data.id || `Q-CORR-${Date.now().toString().slice(-4)}`;
        if (this.corridors.some(c => c.id === id)) {
            throw new Error(`Corridor with ID "${id}" already exists.`);
        }
        const corridor = {
            id: String(id).trim(),
            sourceNodeId: String(data.sourceNodeId).trim(),
            targetNodeId: String(data.targetNodeId).trim(),
            protocol: data.protocol || 'NIST FIPS 203 ML-KEM-768',
            fidelity: data.fidelity !== undefined ? Number(data.fidelity) : 0.995,
            coherenceTimeUs: data.coherenceTimeUs !== undefined ? Number(data.coherenceTimeUs) : 200,
            entanglementRateEps: data.entanglementRateEps !== undefined ? Number(data.entanglementRateEps) : 4000,
            qberPercent: data.qberPercent !== undefined ? Number(data.qberPercent) : 1.2,
            status: data.status === 'severed' ? 'severed' : 'active',
            createdAt: new Date().toISOString()
        };
        this.corridors.push(corridor);
        return corridor;
    }

    severCorridor(id) {
        const corridor = this.corridors.find(c => c.id === id);
        if (!corridor) throw new Error(`Corridor "${id}" not found.`);
        corridor.status = 'severed';
        corridor.severedAt = new Date().toISOString();
        return corridor;
    }

    restoreCorridor(id) {
        const corridor = this.corridors.find(c => c.id === id);
        if (!corridor) throw new Error(`Corridor "${id}" not found.`);
        corridor.status = 'active';
        delete corridor.severedAt;
        return corridor;
    }

    deleteCorridor(id) {
        const initialCount = this.corridors.length;
        this.corridors = this.corridors.filter(c => c.id !== id);
        return {
            deleted: this.corridors.length < initialCount,
            corridorId: id
        };
    }

    purgeAllCorridors() {
        const deletedCount = this.corridors.length;
        this.corridors = [];
        return {
            deletedCorridors: deletedCount,
            message: `Universal purge executed: ${deletedCount} corridors removed.`
        };
    }

    // Batch Ingestion (RFC 4180 CSV & JSON)
    parseRFC4180CSV(rawText) {
        const lines = rawText.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length === 0) return [];
        
        function parseLine(line) {
            const row = [];
            let inQuotes = false;
            let token = '';
            for (let i = 0; i < line.length; i++) {
                const ch = line[i];
                if (ch === '"') {
                    if (inQuotes && line[i + 1] === '"') {
                        token += '"';
                        i++;
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (ch === ',' && !inQuotes) {
                    row.push(token.trim());
                    token = '';
                } else {
                    token += ch;
                }
            }
            row.push(token.trim());
            return row;
        }

        const headers = parseLine(lines[0]).map(h => h.replace(/^"(.*)"$/, '$1').trim());
        const records = [];
        for (let i = 1; i < lines.length; i++) {
            const values = parseLine(lines[i]);
            if (values.length === headers.length) {
                const obj = {};
                headers.forEach((h, idx) => {
                    obj[h] = values[idx].replace(/^"(.*)"$/, '$1');
                });
                records.push(obj);
            }
        }
        return records;
    }

    ingestCorridorsBatch(payload, format = 'auto') {
        let items = [];
        let isJson = false;

        if (Array.isArray(payload)) {
            items = payload;
            isJson = true;
        } else if (typeof payload === 'string') {
            const trimmed = payload.trim();
            if (format === 'json' || (format === 'auto' && (trimmed.startsWith('[') || trimmed.startsWith('{')))) {
                try {
                    const parsed = JSON.parse(trimmed);
                    items = Array.isArray(parsed) ? parsed : [parsed];
                    isJson = true;
                } catch (e) {
                    throw new Error(`Invalid JSON batch format: ${e.message}`);
                }
            } else {
                items = this.parseRFC4180CSV(trimmed);
            }
        } else {
            throw new Error('Invalid payload: expected CSV string or JSON array.');
        }

        if (items.length === 0) {
            throw new Error('Batch payload contained 0 valid rows.');
        }

        const ingested = [];
        const errors = [];

        items.forEach((item, index) => {
            try {
                if (!item.sourceNodeId || !item.targetNodeId) {
                    throw new Error(`Row ${index + 1}: Missing sourceNodeId or targetNodeId`);
                }
                const created = this.createCorridor(item);
                ingested.push(created);
            } catch (err) {
                errors.push({ row: index + 1, error: err.message });
            }
        });

        return {
            success: true,
            totalProcessed: items.length,
            ingestedCount: ingested.length,
            errorCount: errors.length,
            ingested,
            errors,
            format: isJson ? 'JSON' : 'RFC4180_CSV'
        };
    }

    ingestNodesBatch(payload, format = 'auto') {
        let items = [];
        let isJson = false;

        if (Array.isArray(payload)) {
            items = payload;
            isJson = true;
        } else if (typeof payload === 'string') {
            const trimmed = payload.trim();
            if (format === 'json' || (format === 'auto' && (trimmed.startsWith('[') || trimmed.startsWith('{')))) {
                try {
                    const parsed = JSON.parse(trimmed);
                    items = Array.isArray(parsed) ? parsed : [parsed];
                    isJson = true;
                } catch (e) {
                    throw new Error(`Invalid JSON batch format: ${e.message}`);
                }
            } else {
                items = this.parseRFC4180CSV(trimmed);
            }
        } else {
            throw new Error('Invalid payload: expected CSV string or JSON array.');
        }

        if (items.length === 0) {
            throw new Error('Batch payload contained 0 valid rows.');
        }

        const ingested = [];
        const errors = [];

        items.forEach((item, index) => {
            try {
                if (!item.id || !item.name) {
                    throw new Error(`Row ${index + 1}: Missing id or name`);
                }
                const created = this.createNode(item);
                ingested.push(created);
            } catch (err) {
                errors.push({ row: index + 1, error: err.message });
            }
        });

        return {
            success: true,
            totalProcessed: items.length,
            ingestedCount: ingested.length,
            errorCount: errors.length,
            ingested,
            errors,
            format: isJson ? 'JSON' : 'RFC4180_CSV'
        };
    }
}

module.exports = new QuantumTopologyService();
