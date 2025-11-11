import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('prefer_not_to_say');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('mild');
  const [conditions, setConditions] = useState('');
  const [meds, setMeds] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [err, setErr] = useState(null);

  const input = {
    width: '100%', padding: '14px 16px', borderRadius: '14px', border: '1px solid #e5e7eb',
    marginBottom: '10px', fontFamily: '"Montserrat", sans-serif'
  };
  const label = { fontSize: 14, color: '#374151', marginBottom: 6, display: 'block' };
  const btn = {
    backgroundColor: '#82ABF8', border: 'none', borderRadius: '16px', padding: '12px 18px',
    cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'all .2s'
  };
  const card = { background: 'white', padding: 20, borderRadius: 20, boxShadow: '0 10px 25px rgba(0,0,0,.1)', maxWidth: 760, margin: '24px auto' };

  async function submit(e) {
    e.preventDefault();
    setErr(null); setResult(null);
    if (!age || !symptoms) { setErr('Please enter your age and symptoms.'); return; }
    try {
      setLoading(true);
      const res = await fetch(import.meta.env.VITE_BACKEND + 'api/ai/symptom-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: Number(age),
          sex, symptoms, duration, severity,
          conditions: conditions ? conditions.split(',').map(s => s.trim()).filter(Boolean) : [],
          meds: meds ? meds.split(',').map(s => s.trim()).filter(Boolean) : []
        })
      });
      const data = await res.json();
      setResult(data);
      if (!res.ok) setErr('Something went wrong.');
    } catch {
      setErr('Network error. Please try again.');
    } finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight:'100vh', background:'rgba(229,231,235,0.95)', padding:'20px', fontFamily:'"Montserrat", sans-serif' }}>
      <div style={card}>
        <h2 style={{ color:'#3A5FCF', marginTop:0 }}>AI Symptom Checker</h2>
        <form onSubmit={submit}>
          <label style={label}>Age</label>
          <input style={input} type="number" value={age} onChange={e=>setAge(e.target.value)} min="0" />

          <label style={label}>Sex</label>
          <select style={input} value={sex} onChange={e=>setSex(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>

          <label style={label}>Describe your symptoms</label>
          <textarea style={{...input, minHeight: 90}} value={symptoms} onChange={e=>setSymptoms(e.target.value)} placeholder="e.g., fever, sore throat, cough" />

          <label style={label}>Duration</label>
          <input style={input} value={duration} onChange={e=>setDuration(e.target.value)} placeholder="e.g., 2 days" />

          <label style={label}>Severity</label>
          <select style={input} value={severity} onChange={e=>setSeverity(e.target.value)}>
            <option>mild</option>
            <option>moderate</option>
            <option>severe</option>
          </select>

          <label style={label}>Existing conditions (comma-separated)</label>
          <input style={input} value={conditions} onChange={e=>setConditions(e.target.value)} placeholder="e.g., asthma, diabetes" />

          <label style={label}>Medications (comma-separated, optional)</label>
          <input style={input} value={meds} onChange={e=>setMeds(e.target.value)} placeholder="e.g., ibuprofen" />

          {err && <div style={{ color:'#b91c1c', marginBottom:10 }}>{err}</div>}

          <div style={{ display:'flex', gap:10 }}>
            <button type="button" style={{...btn, background:'#e5e7eb' }} onClick={()=>navigate('/dashboard')}>
              Back to Dashboard
            </button>
            <button type="submit" style={btn} disabled={loading}>
              {loading ? 'Checking...' : 'Check Symptoms'}
            </button>
          </div>
        </form>

        {result && (
          <div style={{ marginTop:16, padding:16, border:'1px solid #e5e7eb', borderRadius:12, background:'#f9fafb' }}>
            <div style={{ fontWeight:600, marginBottom:6 }}>Suggested disposition: {result.disposition}</div>
            <div style={{ marginBottom:8 }}>{result.summary}</div>
            {result.nextSteps?.length > 0 && (
              <>
                <div style={{ fontWeight:600 }}>Next steps</div>
                <ul>{result.nextSteps.map((s,i)=><li key={i}>{s}</li>)}</ul>
              </>
            )}
            {result.possibleCauses?.length > 0 && (
              <>
                <div style={{ fontWeight:600 }}>Possible causes (not a diagnosis)</div>
                <ul>{result.possibleCauses.map((s,i)=><li key={i}>{s}</li>)}</ul>
              </>
            )}
            <p style={{ color:'#6B7280', fontSize:12, marginTop:8 }}>{result.disclaimer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
