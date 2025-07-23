import React, { useState } from 'react';

import './claims_form.css';

const ClaimSubmissionForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    dateOfBirth: '',
    emailAddress: '',
    phonenumber: '',
    memberId: '',
    additionalNotes: '',
    serviceDate: '',
    procedureCode: '',
    diagnosisCode: '',
    itemCode: '',
    claimAmount: '0.00'
  });

  const [validation, setValidation] = useState({
    patientEligible: true,
    procedureCovered: true,
    priorAuthRequired: true
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError('');
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://localhost:5678/webhook-test/MetHealth-Hack-4-Health', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
        patientId: '',
        patientName: '',
        dateOfBirth: '',
        emailAddress: '',
        phonenumber: '',
        memberId: '',
        additionalNotes: '',
        serviceDate: '',
        procedureCode: '',
        diagnosisCode: '',
        itemCode: '',
        claimAmount: '0.00'
      });

     
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="claim-form-container">
      <div className="form-header">
        <h1 className="form-title">+ New Claim Submission</h1>
        <p className="form-subtitle">Submit a new medical claim with automatic validation and eligibility checking</p>
      </div>

      <form className="claim-form" onSubmit={handleSubmit}>
        <div className="form-sections">
          {/* Patient Information Section */}
          <div className="form-section">
            <h2 className="section-title">Patient Information</h2>
            
            <div className="form-group">
              <label htmlFor="patientId" className="form-label">Patient ID</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                className="form-input"
                placeholder="Enter patient ID"
                value={formData.patientId}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientName" className="form-label">Patient Name</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                className="form-input"
                placeholder="Enter patient name"
                value={formData.patientName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="form-input date-input"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress" className="form-label">Email Address</label>
              <input
                type="text"
                id="emailAddress"
                name="emailAddress"
                className="form-input"
                placeholder="Enter email address"
                value={formData.emailAddress}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="form-input"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="memberId" className="form-label">Member ID</label>
              <input
                type="text"
                id="memberId"
                name="memberId"
                className="form-input"
                placeholder="Medical aid member ID"
                value={formData.memberId}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="additionalNotes" className="form-label">Additional Notes</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                className="form-textarea"
                placeholder="Any additional information..."
                rows="4"
                value={formData.additionalNotes}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Claim Details Section */}
          <div className="form-section">
            <h2 className="section-title">Claim Details</h2>
            
            <div className="form-group">
              <label htmlFor="serviceDate" className="form-label">Service Date</label>
              <input
                type="date"
                id="serviceDate"
                name="serviceDate"
                className="form-input date-input"
                value={formData.serviceDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="procedureCode" className="form-label">Procedure Code</label>
              <select
                id="procedureCode"
                name="procedureCode"
                className="form-select"
                value={formData.procedureCode}
                onChange={handleInputChange}
              >
                <option value="">Select procedure</option>
                <option value="99213">Office Visit - Established Patient</option>
                <option value="99214">Office Visit - Detailed</option>
                <option value="99215">Office Visit - Comprehensive</option>
                <option value="87804">Lab Test - Comprehensive</option>
                <option value="73030">X-Ray - Shoulder</option>
                <option value="73060">X-Ray - Knee</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="diagnosisCode" className="form-label">Diagnosis Code (ICD-10)</label>
              <input
                type="text"
                id="diagnosisCode"
                name="diagnosisCode"
                className="form-input"
                placeholder="e.g. Z00.00"
                value={formData.diagnosisCode}
                onChange={handleInputChange}
              />
            </div>

            
            <div className="form-group">
              <label htmlFor="itemCode" className="form-label">Item Code (ICD-10)</label>
              <input
                type="text"
                id="itemCode"
                name="itemCode"
                className="form-input"
                placeholder="e.g. Z00.00"
                value={formData.itemCode}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="claimAmount" className="form-label">Claim Amount</label>
              <input
                type="number"
                id="claimAmount"
                name="claimAmount"
                className="form-input"
                step="0.01"
                min="0"
                value={formData.claimAmount}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Real-time Validation Section */}
        <div className="validation-section">
          <h3 className="validation-title">✓ Real-time Validation</h3>
          <div className="validation-items">
            <div className={`validation-item ${validation.patientEligible ? 'success' : 'error'}`}>
              <span className="validation-icon">✓</span>
              <span className="validation-text">Patient Eligible</span>
            </div>
            <div className={`validation-item ${validation.procedureCovered ? 'success' : 'error'}`}>
              <span className="validation-icon">✓</span>
              <span className="validation-text">Procedure Covered</span>
            </div>
            <div className={`validation-item ${validation.priorAuthRequired ? 'warning' : 'success'}`}>
              <span className="validation-icon">{validation.priorAuthRequired ? '!' : '✓'}</span>
              <span className="validation-text">
                {validation.priorAuthRequired ? 'Prior Auth Required' : 'No Prior Auth Required'}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Claim for Processing'}
        </button>
        {submitSuccess && (
          <div style={{ color: 'green', marginTop: '1rem', textAlign: 'center' }}>
            Claim submitted successfully!
          </div>
        )}
        {submitError && (
          <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>
            {submitError}
          </div>
        )}
      </form>
    </div>
  );
};

export default ClaimSubmissionForm;