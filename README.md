# 🛡️ QuantumShield: Post-Quantum Cyber Defense & Resilient Grid Digital Twin

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![NIST Standards](https://img.shields.io/badge/NIST-FIPS%20203%20ML--KEM--768-success)](https://csrc.nist.gov/pubs/fips/203/final)
[![Quantum Crypto](https://img.shields.io/badge/QKD-BB84%20Simulation-purple)](#quantum-cryptography-engine)
[![Playwright Verified](https://img.shields.io/badge/Playwright-E2E%20Verified-brightgreen)](tests)

> **Google Project of the Year Standard**: Next-generation Post-Quantum Cryptographic (PQC) threat simulation, autonomous defensive agent swarms, and physical-layer SCADA digital twin protection for critical national infrastructure.

---

## ⚡ Executive Summary

Classical asymmetric cryptography (RSA-2048, ECC P-256) faces mathematical obsolescence with the emergence of cryptanalytically relevant quantum computers running **Shor's Algorithm** and **Grover's Algorithm**. Critical infrastructure—such as national power distribution grids—is acutely vulnerable to *Harvest Now, Decrypt Later* (HNDL) state-sponsored campaigns.

**QuantumShield** bridges theoretical quantum physics and cyber-physical operations:
1. **Authentic Post-Quantum Cryptographic Primitives**: Implementing NIST FIPS 203 (ML-KEM-768 / Kyber lattice cryptography), BB84 Quantum Key Distribution with QBER anomaly detection, and Grover/Shor quantum attack modeling.
2. **35-Node Interactive Power Grid SCADA Digital Twin**: High-frequency telemetry monitoring active power (MW), reactive power (MVAr), bus voltage (kV), frequency (50.0 Hz), and phase angle across generation, transmission, and regional substations.
3. **Autonomous Quantum Defense Swarm**: Automated zero-trust isolation, PQC lattice re-keying, and dynamic load-rerouting preventing cascading grid blackout under multi-vector quantum attack waves.

---

## 🔬 Scientific & Algorithmic Architecture

### 1. Shor's Quantum Period-Finding Subroutine
Given a target composite public modulus $N = p \times q$ and coprime base $a$:
- Computes period $r$ of modular exponential state $f(x) = a^x \pmod N$.
- Analyzes circuit complexity: required logical qubits $n_{\text{qubits}} = 2\lceil\log_2 N\rceil + 3$ and Quantum Fourier Transform (QFT) gate depth $\mathcal{O}(L^2)$.
- Extracts non-trivial factors via $\gcd(a^{r/2} \pm 1, N)$.

### 2. BB84 Quantum Key Distribution (QKD) Engine
- Simulates Alice generating random quantum bitstrings encoded across Rectilinear ($\{|0\rangle, |90\rangle\}$) and Diagonal ($\{|45\rangle, |135\rangle\}$) photon polarization bases.
- Quantum measurement mechanics: Bob measures across arbitrary bases; non-matching bases yield 50% random collapse.
- Eve intercept-resend attack modeling: Eve eavesdropping collapses quantum states, injecting measurable **Quantum Bit Error Rate (QBER)**.
- Threshold evaluation: Keys with $\text{QBER} < 11\%$ proceed through privacy amplification; keys with $\text{QBER} \ge 11\%$ trigger abort and alarm.

### 3. Grover Amplitude Amplification
- Simulates quantum search acceleration over unstructured search spaces of size $N = 2^b$.
- Executes alternating unitary transformations: Oracle phase inversion $O_x = I - 2|x^*\rangle\langle x^*|$ and Grover diffusion operator $D = 2|s\rangle\langle s| - I$.
- Computes optimal iterations $R \approx \frac{\pi}{4}\sqrt{N}$, demonstrating quadratic speedup $\mathcal{O}(\sqrt{N})$ reducing AES-256 brute force to $2^{128}$ operations.

### 4. NIST FIPS 203 ML-KEM-768 (Module-LWE)
- Hardened Ring/Module Learning With Errors lattice problem over polynomial ring $R_q = \mathbb{Z}_q[X]/(X^{256} + 1)$ with modulus $q = 3329$.
- Encapsulates and decapsulates 256-bit symmetric cipher keys resistant to both Shor's and Grover's quantum attacks.

---

## 🖥️ System Architecture & Interfaces

### Web Dashboard & SCADA Console (`index.html` + `server.js`)
- **Port**: `5020`
- **Dynamic SCADA Canvas**: 35 interconnected nodes with live canvas particle beams, bus voltage alerts, and breaker trip telemetry.
- **Threat Simulation**: Multi-stage quantum attack injection (Shor RSA factor breach, Grover key search, SCADA substation tampering).
- **Automated PQC Swarm Defense**: Lattice re-keying, physical breaker quarantine, and islanding algorithms.
- **Live Quantum Lab**: Real-time interactive calculation tabs for Shor factorization, BB84 photon transmission, and Grover amplification iterations.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+ (for optional Streamlit console)

### Installation
```bash
git clone https://github.com/Shashankcodelover/quantum-shield.git
cd quantum-shield
npm install
```

### Launch Web Console
```bash
node server.js
# Access the web console at http://localhost:5020
```

### Run Python Analytics Console
```bash
pip install streamlit requests pandas plotly
streamlit run dashboard.py
```

---

## 🧪 E2E Verification & Testing

Validated end-to-end with Chromium Playwright:
- Nominal 35-node power grid verification
- Quantum Shor & Grover attack vector simulation and alert triggers
- Autonomous PQC defense mitigation and lattice key generation
- BB84 QKD photon generation and Shor period-finding execution

---

## 📜 License
MIT License. Open-source research and engineering prototype.
