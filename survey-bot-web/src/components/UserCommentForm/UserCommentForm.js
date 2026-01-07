import React, { useState, useEffect } from 'react';
import { createUserComment } from '../../api/userCommentApi';
import cheersIcon from '../../resources/cheers.png';
import surveyResultsIcon from '../../resources/survey-results.png';
import MultiSelect from './MultiSelect';
import './UserCommentForm.css';

const UserCommentForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    usageWithoutAttachment: '',
    usageWithAttachment: '',
    department: '',
    section: '',
    remark: '',
  });

  // Multi-select dropdown options
  const usageWithoutAttachmentOptions = [
    'Troubleshooting technical issues',
    'Analyzing system errors and logs',
    'Investigating performance or usage issues',
    'Providing technical guidance and solutions',
    'Preparing incident analysis and reports'
  ];

  const usageWithAttachmentOptions = [
    'Document type conversion (e.g., PDF ↔ Word)',
    'Generate abstract / summary',
    'Translate document',
    'Extract key information (tables, figures, text)',
    'Generate report from data file',
    'Compare documents (diff / changes)'
  ];

  const [selectedUsageWithoutAttachment, setSelectedUsageWithoutAttachment] = useState([]);
  const [selectedUsageWithAttachment, setSelectedUsageWithAttachment] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showClearModal, setShowClearModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPreSurveyModal, setShowPreSurveyModal] = useState(true); // Start with true to show on mount

  // Show pre-survey modal every time component mounts
  useEffect(() => {
    setShowPreSurveyModal(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear messages when user types
    if (error) setError('');
  };

  const handleMultiSelectChange = (field, selectedArray) => {
    if (field === 'usageWithoutAttachment') {
      setSelectedUsageWithoutAttachment(selectedArray);
    } else if (field === 'usageWithAttachment') {
      setSelectedUsageWithAttachment(selectedArray);
    }
    // Clear messages when user changes selection
    if (error) setError('');
  };


  const handleClearClick = () => {
    setShowClearModal(true);
  };

  const handleConfirmClear = () => {
    setFormData({
      userName: '',
      email: '',
      usageWithoutAttachment: '',
      usageWithAttachment: '',
      department: '',
      section: '',
      remark: '',
    });
    setError('');
    setShowClearModal(false);
  };

  const handleCancelClear = () => {
    setShowClearModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleClosePreSurveyModal = () => {
    setShowPreSurveyModal(false);
  };

  const validateForm = () => {
    if (!formData.userName.trim()) {
      setError('User Name is required');
      return false;
    }

    if (formData.userName.length > 200) {
      setError('User Name must not exceed 200 characters');
      return false;
    }

    if (formData.email && formData.email.trim()) {
      if (formData.email.length > 200) {
        setError('Email must not exceed 200 characters');
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        setError('Please enter a valid email address');
        return false;
      }
    }

    if (!formData.department.trim()) {
      setError('Department is required');
      return false;
    }

    if (formData.department.length > 500) {
      setError('Department must not exceed 500 characters');
      return false;
    }

    if (formData.section && formData.section.length > 500) {
      setError('Section must not exceed 500 characters');
      return false;
    }


    if (formData.remark && formData.remark.length > 200) {
      setError('Remark must not exceed 200 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Combine dropdown selections with textarea content
      const dropdownWithoutAttachment = selectedUsageWithoutAttachment.length > 0 
        ? selectedUsageWithoutAttachment.join(', ') 
        : '';
      const textareaWithoutAttachment = formData.usageWithoutAttachment.trim();
      const usageWithoutAttachmentValue = [dropdownWithoutAttachment, textareaWithoutAttachment]
        .filter(Boolean)
        .join('; ') || null;

      const dropdownWithAttachment = selectedUsageWithAttachment.length > 0 
        ? selectedUsageWithAttachment.join(', ') 
        : '';
      const textareaWithAttachment = formData.usageWithAttachment.trim();
      const usageWithAttachmentValue = [dropdownWithAttachment, textareaWithAttachment]
        .filter(Boolean)
        .join('; ') || null;

      const userCommentPayload = {
        userName: formData.userName.trim(),
        email: formData.email.trim() || null,
        usageWithoutAttachment: usageWithoutAttachmentValue,
        usageWithAttachment: usageWithAttachmentValue,
        department: formData.department.trim(),
        section: formData.section.trim() || null,
        remark: formData.remark.trim() || null,
      };

      await createUserComment(userCommentPayload);
      
      // Reset form
      setFormData({
        userName: '',
        email: '',
        usageWithoutAttachment: '',
        usageWithAttachment: '',
        department: '',
        section: '',
        remark: '',
      });
      setSelectedUsageWithoutAttachment([]);
      setSelectedUsageWithAttachment([]);
      
      // Show success modal
      setShowSuccessModal(true);
    } catch (err) {
      setError(err.message || 'Failed to create user comment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-comment-form-container">
      {/* Random geometric shapes in background */}
      <div className="bg-shape bg-shape-1"></div>
      <div className="bg-shape bg-shape-2"></div>
      <div className="bg-shape bg-shape-3"></div>
      <div className="bg-shape bg-shape-4"></div>
      <div className="bg-shape bg-shape-5"></div>
      <div className="bg-shape bg-shape-6"></div>
      <div className="bg-shape bg-shape-7"></div>
      <div className="bg-shape bg-shape-8"></div>
      <div className="bg-shape bg-shape-9"></div>
      <div className="bg-shape bg-shape-10"></div>
      <div className="bg-shape bg-shape-11"></div>
      <div className="bg-shape bg-shape-12"></div>
      <div className="bg-shape bg-shape-13"></div>
      <div className="bg-shape bg-shape-14"></div>
      
      <div className="user-comment-form-card">

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className={`user-comment-form ${showPreSurveyModal ? 'form-disabled' : ''}`}>
          {/* User Information */}
          <div className="form-section">
            <h3 className="section-title">User Information</h3>

            <div className="form-group">
              <label htmlFor="userName" className="form-label">
                User Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter user name"
                maxLength={200}
                required
              />
              <span className="char-count">{formData.userName.length}/200</span>
            </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter email address"
                    maxLength={200}
                  />
                  <span className="char-count">{formData.email.length}/200</span>
                </div>

            <div className="form-group">
              <label htmlFor="department" className="form-label">
                Department <span className="required">*</span>
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter department"
                maxLength={500}
                required
              />
              <span className="char-count">{formData.department.length}/500</span>
            </div>

            <div className="form-group">
              <label htmlFor="section" className="form-label">
                Section
              </label>
              <input
                type="text"
                id="section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter section"
                maxLength={500}
              />
              <span className="char-count">{formData.section.length}/500</span>
            </div>
          </div>

          {/* Usage Information */}
          <div className="form-section">
            <h3 className="section-title">Usage Information</h3>

            <div className="form-group">
              <label htmlFor="usageWithoutAttachment" className="form-label">
                Usage Without Attachment
                <span className="info-icon-wrapper">
                  <span className="info-icon">i</span>
                  <span className="info-tooltip">
                   For which purposes do you use chatbot systems (ChatGPT, Grok, Perplexity, Gemini, DeepSeek, etc.) when no file upload is required?
                  </span>
                </span>
              </label>
              <MultiSelect
                options={usageWithoutAttachmentOptions}
                selectedValues={selectedUsageWithoutAttachment}
                onChange={(selected) => handleMultiSelectChange('usageWithoutAttachment', selected)}
                placeholder="Type to search and select options..."
              />
              <textarea
                id="usageWithoutAttachment"
                name="usageWithoutAttachment"
                value={formData.usageWithoutAttachment}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Type any additional information here (optional)"
                rows="4"
                style={{ marginTop: '1rem' }}
              />
              <span className="char-count">{formData.usageWithoutAttachment.length} characters</span>
            </div>

            <div className="form-group">
              <label htmlFor="usageWithAttachment" className="form-label">
                Usage With Attachment
                <span className="info-icon-wrapper">
                  <span className="info-icon">i</span>
                  <span className="info-tooltip">
                   For which purposes do you use chatbot systems (ChatGPT, Grok, Perplexity, Gemini, DeepSeek, etc.) when file upload is required?
                  </span>
                </span>
              </label>
              <MultiSelect
                options={usageWithAttachmentOptions}
                selectedValues={selectedUsageWithAttachment}
                onChange={(selected) => handleMultiSelectChange('usageWithAttachment', selected)}
                placeholder="Type to search and select options..."
              />
              <textarea
                id="usageWithAttachment"
                name="usageWithAttachment"
                value={formData.usageWithAttachment}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Type any additional information here (optional)"
                rows="4"
                style={{ marginTop: '1rem' }}
              />
              <span className="char-count">{formData.usageWithAttachment.length} characters</span>
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3 className="section-title">Additional Information</h3>

            <div className="form-group">
              <label htmlFor="remark" className="form-label">
                Remark
              </label>
              <textarea
                id="remark"
                name="remark"
                value={formData.remark}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Enter remark"
                rows="3"
                maxLength={200}
              />
              <span className="char-count">{formData.remark.length}/200</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-clear" 
              onClick={handleClearClick}
              disabled={loading}
            >
              Clear
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

        {/* Clear Confirmation Modal */}
        {showClearModal && (
          <div className="modal-overlay" onClick={handleCancelClear}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Clear Form</h3>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to clear all filled data? This action cannot be undone.</p>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-modal-cancel" 
                  onClick={handleCancelClear}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-modal-confirm" 
                  onClick={handleConfirmClear}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Modal */}
        {loading && (
          <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Processing</h3>
              </div>
              <div className="modal-body">
                <div className="loading-spinner-container">
                  <div className="loading-spinner"></div>
                  <p>Creating user comment, please wait...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pre-Survey Information Modal */}
        {showPreSurveyModal && (
          <div className="modal-overlay pre-survey-modal-overlay" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content pre-survey-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Pre-Survey Information</h3>
              </div>
              <div className="modal-body">
                <div className="pre-survey-content">
                  <div className="survey-icon-container">
                    <img src={surveyResultsIcon} alt="Survey" className="survey-icon" />
                  </div>
                  <div className="pre-survey-message">
                    <h4 className="pre-survey-title">Survey Purpose: Understanding AI Chatbot Usage in Office Work</h4>
                    <p className="pre-survey-intro">Thank you for participating in this short pre-survey!</p>
                    <p>Our organization is exploring the implementation of an AI-powered chatbot system to support daily office tasks. To ensure the tool meets real needs and is adopted effectively, we need to understand how employees currently use (or would like to use) AI chatbots in their work.</p>
                    <p className="pre-survey-subtitle">This survey collects:</p>
                    <ul className="pre-survey-list">
                      <li><strong>Basic identification details</strong> (name, email, department, section) for internal follow-up and to tailor the AI system to different teams.</li>
                      <li><strong>Your experiences and reasons for using AI chatbots in two scenarios:</strong>
                        <ul className="pre-survey-sublist">
                          <li><strong>Without attachments:</strong> For quick questions, brainstorming, drafting text, or general information lookup.</li>
                          <li><strong>With attachments:</strong> For analyzing documents, extracting data from files, summarizing reports, or answering questions based on uploaded content.</li>
                        </ul>
                      </li>
                      <li><strong>Any additional remarks or suggestions.</strong></li>
                    </ul>
                    <p>All responses will be kept confidential and used solely to improve the AI chatbot system for office productivity. The survey takes less than 5 minutes to complete.</p>
                    <p className="pre-survey-closing"><strong>Your input is valuable in shaping a tool that saves time and enhances efficiency!</strong></p>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-modal-confirm" 
                  onClick={handleClosePreSurveyModal}
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="modal-overlay" onClick={handleCloseSuccessModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Thank You!</h3>
              </div>
              <div className="modal-body">
                <div className="success-content">
                  <div className="cheer-icon-container">
                    <img src={cheersIcon} alt="Cheers" className="cheer-icon" />
                  </div>
                  <p className="success-message">Thank you for your submission! Your comment has been created successfully.</p>
                </div>
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-modal-confirm" 
                  onClick={handleCloseSuccessModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCommentForm;

