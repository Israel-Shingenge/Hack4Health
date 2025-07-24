import React from 'react';
import NewClaimSubmission from './components/claimDetails/NewClaimSubmission';

function App() {
  const handleSave = () => {
    alert('Claim submitted successfully!');
  };
  const handleClose = () => {
    alert('Claim submission canceled');
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans antialiased">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">Methealth Claim Submission</h1>
      <NewClaimSubmission onSave={handleSave} onClose={handleClose} />
    </div>
  );
}

export default App;
