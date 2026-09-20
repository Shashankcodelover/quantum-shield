# 🛡️ QuantumShield: Basic Cryptography Simulator UI

This project is a Node.js Express server that simulates basic quantum algorithms and mock post-quantum cryptography concepts.

## Features

- **Cryptography Simulator (`quantum_engine.js`)**: 
  - Simulates Shor's algorithm (using classical order finding).
  - Simulates Grover's algorithm (by printing expected probabilities).
  - Simulates BB84 protocol (basic random bit transmission).
  - Provides a mock endpoint for "ML-KEM-768" that generates and returns random bytes.
- **Topology API (`quantumTopologyService.js`)**: An in-memory store providing CRUD operations for mock "substation" nodes and "entanglement corridors".
- **Basic Dashboard**: Serves a static HTML dashboard to interact with the mock data.

## 🚀 Quickstart

```bash
# Install dependencies
npm install

# Run automated tests
node --test tests/enterpriseMesh.test.js

# Launch server
node server.js
# Open http://localhost:5020
```
