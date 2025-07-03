import React, { useState, useEffect } from 'react';
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
  // Only return a size if both values exactly match a row in the chart
  const match = SIZING_CHART.find(row => row.noseband === noseband && row.cheek === cheek);
  return match ? match.size : null;
}

function App() {
  useEffect(() => {
    function sendHeight() {
      window.parent.postMessage(
        { type: 'setHeight', height: document.documentElement.scrollHeight },
        '*'
      );
    }
    sendHeight();
    window.addEventListener('resize', sendHeight);
    // Also send height when images load
    const images = document.querySelectorAll('img');
    images.forEach(img => img.addEventListener('load', sendHeight));
    return () => {
      window.removeEventListener('resize', sendHeight);
      images.forEach(img => img.removeEventListener('load', sendHeight));
    };
  }, [result]);

  const [noseband, setNoseband] = useState('');
  const [cheek, setCheek] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add 2 inches to the noseband input for sizing
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
    <div className="App">
      <h1>Knotty Girlz Halter Sizing Calculator</h1>
      <div className="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/av7FoRSjH80"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="instructions">
        <h2 className="instructions-header">Instructions:</h2>
        <p>To size your horse's halter, you'll need two measurements: the noseband and the cheek piece.</p>
        <p>For the noseband, measure around your horse's nose, above the soft part and below the cheekbone. For the cheek piece, measure from just below the cheekbone to just behind the ear.</p>
        <p>Input these numbers into the calculator below, and it will give you a recommendation on sizing.</p>
        <p>If you're between sizes, we can create a custom halter for you!</p>
      </div>
      {result && <div className="result">{result}</div>}
      <h2 className="instructions-header" style={{ marginTop: '2.5rem', textAlign: 'center' }}>Enter your measurements below:</h2>
      <form className="sizing-form" onSubmit={handleSubmit}>
        <label>
          Overall Noseband (inches):
          <input
            type="number"
            step="0.5"
            value={noseband}
            onChange={e => setNoseband(e.target.value)}
            required
          />
        </label>
        <label>
          Cheek (inches):
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
      <div className="halter-diagram">
        <img
          src="/halter-diagram.jpg"
          alt="Diagram of horse halter parts"
          style={{ maxWidth: '100%', height: 'auto', marginTop: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}
        />
      </div>
    </div>
  );
}

export default App;
