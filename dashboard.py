dashboard.py

python
import streamlit as st
import requests
import plotly.express as px

st.title("🛡️ Quantum Shield Dashboard")

# Real-time threat data
response = requests.post("http://localhost:8000/scan/threat", 
                        json={"data": "Sample network traffic analysis"})
threat_data = response.json()

st.metric("Threat Confidence", f"{threat_data['confidence']:.1%}")
st.success("Quantum Safe" if threat_data['quantum_safe'] else "⚠️ Vulnerable")

if st.button("Generate Quantum Key"):
    key_data = requests.get("http://localhost:8000/quantum/keygen").json()
    st.code(key_data["quantum_key"])