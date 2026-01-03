


import streamlit as st
import requests
import plotly.express as px


# ================== CUSTOM CSS (UI ONLY) ==================
st.markdown("""
    <style>
        .main {
            background-color: #101522;
            color: #ececec;
        }
        .block-container {
            padding-top: 2rem;
        }
        .title h1 {
            color: #00d67a;
            letter-spacing: 0.04em;
        }
        .subtitle {
            color: #b4b4b5;
            font-size: 1.1rem;
            margin-bottom: 2.3rem;
        }
        .section-header {
            color: #13d0eb;
            margin-bottom: 0.4rem;
            font-size: 1.18rem;
            letter-spacing: 0.01em;
            font-weight: 600;
        }
        .section-container {
            background: #1a2236;
            border-radius: 0.85rem;
            padding: 1.3rem 1.6rem 1.2rem 1.6rem;
            margin-bottom: 2.1rem;
            box-shadow: 0 2px 9px rgba(20,70,100,0.10);
        }
        .confidence-label {
            font-size: 0.97rem;
            color: #b4b4b5;
            margin-bottom: 0.2rem;
        }
        .safebadge {
            background: linear-gradient(90deg, #19bc78 30%, #37ef85 100%);
            color: white;
            border-radius: 8px;
            padding: 0.22em 1.4em;
            font-size: 1.01rem;
            display: inline-block;
            margin-left: 1em;
            font-weight: 600;
        }
        .riskbadge {
            background: linear-gradient(90deg, #ea5936 25%, #ff834c 100%);
            color: white;
            border-radius: 8px;
            padding: 0.22em 1.4em;
            font-size: 1.01rem;
            display: inline-block;
            margin-left: 1em;
            font-weight: 600;
        }
        hr {
            border: 0;
            border-top: 1px solid #2b3348;
            margin: 2.1rem 0;
        }
    </style>
""", unsafe_allow_html=True)

# ================== HEADER ==================
st.markdown("<div class='title'><h1>🛡️ Quantum Shield Dashboard</h1></div>", unsafe_allow_html=True)
st.markdown(
    "<div class='subtitle'>Enterprise SOC dashboard for real-time quantum threat detection and quantum-safe status monitoring.</div>",
    unsafe_allow_html=True
)
st.markdown("<hr />", unsafe_allow_html=True)

# ================== EXISTING LOGIC (UNCHANGED) ==================

# Real-time threat data
st.title("🛡️ Quantum Shield Dashboard")




# Real-time threat data
response = requests.post("http://localhost:8000/scan/threat", 
                        json={"data": "Sample network traffic analysis"})
threat_data = response.json()

if "confidence" in threat_data:
    st.metric("Threat Confidence", f"{threat_data['confidence']:.1%}")
    st.success(
        "Quantum Safe" if threat_data.get("quantum_safe") else "⚠️ Vulnerable"
    )
else:
    st.error("Backend response invalid")
    st.json(threat_data)


if st.button("Generate Quantum Key"):
    key_data = requests.get("http://localhost:8000/quantum/keygen").json()
    st.code(key_data["quantum_key"])