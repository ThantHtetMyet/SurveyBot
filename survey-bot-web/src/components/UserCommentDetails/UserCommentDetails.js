import React, { useState, useEffect, useCallback } from 'react';
import { getUserCommentById } from '../../api/userCommentApi';
import './UserCommentDetails.css';

const UserCommentDetails = ({ commentId, onBack }) => {
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadComment = useCallback(async () => {
    if (!commentId) return;
    
    setLoading(true);
    setError('');
    try {
      const data = await getUserCommentById(commentId);
      setComment(data);
    } catch (err) {
      setError(err.message || 'Failed to load user comment.');
    } finally {
      setLoading(false);
    }
  }, [commentId]);

  useEffect(() => {
    loadComment();
  }, [loadComment]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = {
      timeZone: 'Asia/Singapore',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-SG', options);
  };

  if (!commentId) {
    return (
      <div className="user-comment-details-container">
        <div className="user-comment-details-card">
          <div className="empty-state">Please select a comment from the list to view details.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="user-comment-details-container">
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
      <div className="user-comment-details-card">
        <div className="details-header">
          <h2 className="details-title">Survey Details</h2>
          {onBack && (
            <button className="btn-back" onClick={onBack}>
              ← Back to List
            </button>
          )}
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : comment ? (
          <div className="details-content">
            <div className="detail-section">
              <h3 className="section-title">User Information</h3>
              <div className="detail-row">
                <span className="detail-label">User Name:</span>
                <span className="detail-value">{comment.userName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{comment.email || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Department:</span>
                <span className="detail-value">{comment.department || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Section:</span>
                <span className="detail-value">{comment.section || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Created Date:</span>
                <span className="detail-value">{formatDate(comment.createdDate)}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3 className="section-title">Usage Information</h3>
              <div className="detail-row full-width">
                <span className="detail-label">Usage Without Attachment:</span>
                <div className="detail-textarea-value">
                  {comment.usageWithoutAttachment || 'N/A'}
                </div>
              </div>
              <div className="detail-row full-width">
                <span className="detail-label">Usage With Attachment:</span>
                <div className="detail-textarea-value">
                  {comment.usageWithAttachment || 'N/A'}
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3 className="section-title">Additional Information</h3>
              <div className="detail-row full-width">
                <span className="detail-label">Remark:</span>
                <div className="detail-textarea-value">
                  {comment.remark || 'N/A'}
                </div>
              </div>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserCommentDetails;

