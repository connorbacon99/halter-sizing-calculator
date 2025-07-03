import React, { useState } from 'react';
import './App.css';

const SIZING_CHART = [
  { size: 'Foal', noseband: 17, cheek: 4 },
  { size: 'Weanling', noseband: 19, cheek: 6.5 },
  { size: 'Mini', noseband: 21, cheek: 6 },
  { size: 'Yearling', noseband: 21, cheek: 8 },
  { size: 'Arab', noseband: 21, cheek: 9 },
  { size: 'Small', noseband: 23, cheek: 9 },
  { size: 'Standard', noseband: 25, cheek: 10 },
  { size: 'Large', noseband: 27, cheek: 11 },
  { size: 'Mule', noseband: 28, cheek: 10 },
  { size: 'Draft', noseband: 28, cheek: 12 },
];

function findBestSize(noseband, cheek) {
  // Only return a size if both values exactly match a row in the chart.
  const match = SIZING_CHART.find(row => row.noseband === noseband && row.cheek === cheek);
  return match ? match.size : null;
}

function App() {
  const [noseband, setNoseband] = useState('');
  const [cheek, setCheek] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nb = parseFloat(noseband) + 2;
    const ch = parseFloat(cheek);
    if (isNaN(nb) || isNaN(ch)) {
      setResult('Please enter valid numbers for both measurements.');
      return;
    }
    const size = findBestSize(nb, ch);
    setResult(size ? `Recommended Size: ${size}` : 'Contact us for custom sizing.');
  };

  return (
    <div className="App symmetrical-app">
      <h1 className="symmetrical-title">Knotty Girlz Halter Sizing Calculator</h1>
      <div className="symmetrical-flex-row">
        <div className="symmetrical-col symmetrical-left">
          <div className="halter-diagram symmetrical-diagram desktop-img">
            <img
              src="/halter-diagram.jpg"
              alt="Diagram of horse halter parts"
              className="symmetrical-img"
            />
          </div>
        </div>
        <div className="symmetrical-col symmetrical-right">
          <div className="instructions symmetrical-instructions">
            <h2 className="instructions-header">How to Measure</h2>
            <ul className="symmetrical-list">
              <li>Measure around your horse's nose, just below the cheekbone and above the soft tissue on the nose.</li>
              <li>Measure from just below the cheekbone to just behind the ear (cheek piece).</li>
              <li>Enter both numbers below for a size recommendation.</li>
            </ul>
            <div className="symmetrical-note">Custom halters available if you're between sizes!</div>
          </div>
          <div className="form-result-row">
            <form className="sizing-form symmetrical-form" onSubmit={handleSubmit}>
              <label>
                Overall Noseband (in):
                <input
                  type="number"
                  step="0.5"
                  value={noseband}
                  onChange={e => setNoseband(e.target.value)}
                  required
                />
              </label>
              <label>
                Cheek (in):
                <input
                  type="number"
                  step="0.5"
                  value={cheek}
                  onChange={e => setCheek(e.target.value)}
                  required
                />
              </label>
              <button type="submit">Find My Size</button>
            </form>
            {result && (
              <div className="result symmetrical-result result-square">{result}</div>
            )}
          </div>
          <div className="halter-diagram symmetrical-diagram mobile-img">
            <img
              src="/halter-diagram.jpg"
              alt="Diagram of horse halter parts"
              className="symmetrical-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
