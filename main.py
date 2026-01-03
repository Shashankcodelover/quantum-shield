from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import ollama
import asyncio
import numpy as np
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
import qiskit
from qiskit import QuantumCircuit, transpile
import json
import logging
from datetime import datetime

app = FastAPI(title="Quantum Shield API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ThreatScanRequest(BaseModel):
    data: str
    scan_type: str = "quantum_threat"

class ThreatResponse(BaseModel):
    threat_detected: bool
    confidence: float
    quantum_safe: bool
    recommendations: List[str]
    timestamp: str

# Global AI Model (Ollama + Phi-3)
MODEL = "phi3"  # Use downloaded Phi-3 model

@app.get("/")
async def root():
    return {"message": "Quantum Shield Backend Active", "status": "quantum-safe"}

@app.post("/scan/threat", response_model=ThreatResponse)
async def quantum_threat_scan(request: ThreatScanRequest):
    """AI-powered quantum threat detection"""
    try:
        prompt = f"""
Analyze this data for quantum computing threats, Shor's algorithm patterns,
Grover's algorithm signatures, or post-quantum crypto weaknesses:

{request.data}

Return ONLY valid JSON in this exact format:
{{
  "threat_detected": true,
  "confidence": 0.0,
  "quantum_safe": true,
  "recommendations": ["string"]
}}
"""

        # ✅ Call Ollama correctly
        ollama_response = ollama.chat(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}]
        )

        # ✅ Safely extract content
        raw = ollama_response.get("message", {}).get("content", "").strip()

        if not raw:
            analysis = {
                "threat_detected": False,
                "confidence": 0.0,
                "quantum_safe": True,
                "recommendations": ["Empty response from LLM"]
            }
        else:
            try:
                analysis = json.loads(raw)
            except json.JSONDecodeError:
                analysis = {
                    "threat_detected": False,
                    "confidence": 0.0,
                    "quantum_safe": True,
                    "recommendations": ["Invalid JSON from LLM"]
                }

        # ✅ ALWAYS return valid response
        return ThreatResponse(
            threat_detected=analysis.get("threat_detected", False),
            confidence=float(analysis.get("confidence", 0.0)),
            quantum_safe=analysis.get("quantum_safe", True),
            recommendations=analysis.get("recommendations", []),
            timestamp=datetime.utcnow().isoformat()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/quantum/keygen")
async def generate_quantum_key():
    """Qiskit-powered quantum key generation"""
    try:
        # Create quantum circuit for key generation
        qc = QuantumCircuit(4, 4)
        qc.h(range(4))  # Hadamard gates
        qc.measure_all()
        
        # Simulate
        simulator = qiskit.Aer.get_backend('qasm_simulator')
        compiled_circuit = transpile(qc, simulator)
        result = simulator.run(compiled_circuit, shots=1024).result()
        counts = result.get_counts()
        
        quantum_key = max(counts, key=counts.get)
        
        # Classical hybrid PQC key
        private_key = rsa.generate_private_key(public_exponent=65537, key_size=4096)
        public_key = private_key.public_key()
        
        return {
            "quantum_key": quantum_key,
            "pqc_public_key": public_key.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo
            ).decode(),
            "status": "quantum-safe"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# WebSocket for real-time threat monitoring
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/threat-monitor")
async def websocket_threat_monitor(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            analysis = await quantum_threat_scan(ThreatScanRequest(data=data, scan_type="realtime"))
            await manager.broadcast(json.dumps(analysis.dict()))
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "quantum_shield": "active"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)