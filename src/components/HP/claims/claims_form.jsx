import React, { useState } from 'react';

import './claims_form.css';

const ClaimSubmissionForm = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        if (file.size <= 50 * 1024 * 1024) { // 50MB limit
          setPdfFile(file);
        } else {
          alert('File size must be less than 50MB');
        }
      } else {
        alert('Please upload a PDF file');
      }
    }
  };

  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    dateOfBirth: '',
    emailAddress: '',
    phoneNumber: '',
    memberId: '',
    patientAccount: '',
    patientAddress: '',
    medicalAidPlan: '',
    referringDoctor: '',
    referringDoctorId: '',
    authorizationNumber: '',
    facilityName: '',
    facilityAddress: '',
    isEmergency: false,
    diagnosisDescription: '',
    doctorName: '',
    doctorAddress: '',
    doctorPhone: '',
    nationalProviderId: '',
    serviceDate: new Date().toISOString().split('T')[0],
    placeOfService: '',
    diagnosisCode: '',
    tariffCode: '',
    description: '',
    claimAmount: '0.00',
    daysUnits: 1,
    diagnosisPointer: '',
    renderingProvider: '',
    additionalNotes: '',
    patientSignatureDate: new Date().toISOString().split('T')[0],
    providerSignatureDate: new Date().toISOString().split('T')[0],
    originalRefNumber: '',
    claimFrequencyCode: '',
  });

  const [validation] = useState({
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
        serviceDate: new Date().toISOString().split('T')[0],
        procedureCode: '',
        diagnosisCode: '',
        tariffCode: '',
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
        <h1 className="form-title">+ Claim Submission Form</h1>
        <p className="form-subtitle">Upload PDF claims forms for automated processing via AI</p>
      </div>

      <div className={`pdf-upload-section ${isDragging ? 'dragging' : ''}`}
           onDragOver={handleDragOver}
           onDragLeave={handleDragLeave}
           onDrop={handleDrop}>
        <div className="upload-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 15L12 12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="upload-title">Upload Claims Forms</h2>
        <p className="upload-subtitle">Drag and drop PDF files or click to browse. AI will automatically extract and validate claim data.</p>
        <input
          type="file"
          id="pdf-upload"
          className="file-input"
          accept=".pdf"
          onChange={handleFileSelect}
        />
        <label htmlFor="pdf-upload" className="upload-button">Choose PDF Files</label>
        <p className="upload-info">Supports multiple PDF uploads • Max 50MB per file</p>
        {pdfFile && (
          <div className="uploaded-file">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#4F46E5"/>
            </svg>
            <span>{pdfFile.name}</span>
            <button className="remove-file" onClick={() => setPdfFile(null)}>×</button>
          </div>
        )}
      </div>


      <div className="form-header">
        <h1 className="form-title">Extracted Claim Data</h1>
        <p className="form-subtitle">Review and verify automatically extracted information before submission</p>
      </div>

      <form className="claim-form" onSubmit={handleSubmit}>
        <div className="form-sections">
          {/* Patient Information Section */}
          <div className="form-section">
            <h2 className="section-title">Patient Information</h2>
            
            <div className="form-group">
              <label htmlFor="patientId" className="form-label">Patient ID *</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                className="form-input"
                placeholder="Enter patient ID"
                value={formData.patientId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientName" className="form-label">Patient Name *</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                className="form-input"
                placeholder="Enter patient name"
                value={formData.patientName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="form-input date-input"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress" className="form-label">Email Address</label>
              <input
                type="email"
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
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="form-input"
                placeholder="Enter phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="memberId" className="form-label">Medical Aid Member ID *</label>
              <input
                type="text"
                id="memberId"
                name="memberId"
                className="form-input"
                placeholder="Medical aid member ID"
                value={formData.memberId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientAccount" className="form-label">Patient Account Number *</label>
              <input
                type="text"
                id="patientAccount"
                name="patientAccount"
                className="form-input"
                placeholder="Enter patient account number"
                value={formData.patientAccount}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="patientAddress" className="form-label">Patient Address *</label>
              <textarea
                id="patientAddress"
                name="patientAddress"
                className="form-textarea"
                placeholder="Enter patient address"
                value={formData.patientAddress}
                onChange={handleInputChange}
                required
                rows="2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="medicalAidPlan" className="form-label">Medical Aid Plan Name *</label>
              <input
                type="text"
                id="medicalAidPlan"
                name="medicalAidPlan"
                className="form-input"
                placeholder="Enter medical aid plan"
                value={formData.medicalAidPlan}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Claim Details Section */}
          <div className="form-section">
            <h2 className="section-title">Claim Details</h2>
            
            <div className="form-group">
              <label htmlFor="referringDoctor" className="form-label">Name of Referring Doctor *</label>
              <input
                type="text"
                id="referringDoctor"
                name="referringDoctor"
                className="form-input"
                placeholder="Enter referring doctor name"
                value={formData.referringPhysician}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="referringDoctorId" className="form-label">Referring Doctor ID</label>
              <input
                type="text"
                id="referringDoctorId"
                name="referringDoctorId"
                className="form-input"
                placeholder="Enter referring doctor ID"
                value={formData.referringPhysicianId}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="authorizationNumber" className="form-label">Prior Authorization Number</label>
              <input
                type="text"
                id="authorizationNumber"
                name="authorizationNumber"
                className="form-input"
                placeholder="Enter authorization number"
                value={formData.authorizationNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="facilityName" className="form-label">Facility Name & Address *</label>
              <textarea
                id="facilityName"
                name="facilityName"
                className="form-textarea"
                placeholder="Enter facility name and address"
                value={formData.facilityName}
                onChange={handleInputChange}
                required
                rows="3"
              />
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="isEmergency"
                  name="isEmergency"
                  checked={formData.isEmergency}
                  onChange={(e) => handleInputChange({
                    target: {
                      name: 'isEmergency',
                      value: e.target.checked
                    }
                  })}
                />
                <label htmlFor="isEmergency">Emergency Case</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="diagnosisDescription" className="form-label">Diagnosis Description *</label>
              <textarea
                id="diagnosisDescription"
                name="diagnosisDescription"
                className="form-textarea"
                placeholder="Enter diagnosis details"
                value={formData.diagnosisDescription}
                onChange={handleInputChange}
                required
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctorName" className="form-label">Doctor's Name & Address *</label>
              <textarea
                id="doctorName"
                name="doctorName"
                className="form-textarea"
                placeholder="Enter doctor name and address"
                value={formData.physicianName}
                onChange={handleInputChange}
                required
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Billing Sheet Section */}
        <div className="form-section full-width">
          <h2 className="section-title">Billing Sheet</h2>
          <div className="billing-sheet-container">
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Account No.</th>
                  <th>Ref No.</th>
                  <th>Tariff</th>
                  <th>Modifier</th>
                  <th>ICD-10</th>
                  <th>NAPPI</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Auth No.</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="date"
                        className="form-input"
                        name={`serviceDate_${index}`}
                        defaultValue={index === 0 ? formData.serviceDate : ''}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        name={`accountNo_${index}`}
                        defaultValue={index === 0 ? formData.patientAccount : ''}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        name={`refNo_${index}`}
                        placeholder="Ref"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        name={`tariffCode_${index}`}
                        placeholder="Tariff"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input narrow-input"
                        name={`modifier_${index}`}
                        placeholder="Mod"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        name={`icdCode_${index}`}
                        placeholder="ICD-10"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        name={`nappiCode_${index}`}
                        placeholder="NAPPI"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input wide-input"
                        name={`description_${index}`}
                        placeholder="Description"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-input narrow-input"
                        name={`quantity_${index}`}
                        min="0"
                        step="1"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-input"
                        name={`amount_${index}`}
                        step="0.01"
                        min="0"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-input"
                        name={`authNo_${index}`}
                        placeholder="Auth #"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="8" className="text-right"><strong>Sub Total:</strong></td>
                  <td colSpan="3">
                    <input
                      type="number"
                      className="form-input"
                      name="subTotal"
                      step="0.01"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-right"><strong>VAT (if applicable):</strong></td>
                  <td colSpan="3">
                    <input
                      type="number"
                      className="form-input"
                      name="vat"
                      step="0.01"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan="8" className="text-right"><strong>Total Amount:</strong></td>
                  <td colSpan="3">
                    <input
                      type="number"
                      className="form-input"
                      name="totalAmount"
                      step="0.01"
                      readOnly
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Authorization Section */}
        <div className="form-section full-width">
          <h2 className="section-title">Authorization</h2>
          <div className="authorization-section">
            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="patientAuthorization"
                  name="patientAuthorization"
                  required
                />
                <label htmlFor="patientAuthorization">
                  I authorize the release of any medical information necessary to process this claim
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="patientSignatureDate" className="form-label">Patient/Guardian Signature Date *</label>
              <input
                type="date"
                id="patientSignatureDate"
                name="patientSignatureDate"
                className="form-input"
                value={formData.patientSignatureDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="providerSignatureDate" className="form-label">Provider Signature Date *</label>
              <input
                type="date"
                id="providerSignatureDate"
                name="providerSignatureDate"
                className="form-input"
                value={formData.providerSignatureDate}
                onChange={handleInputChange}
                required
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