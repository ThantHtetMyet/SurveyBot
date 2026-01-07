import React, { useState, useEffect } from 'react';
import { getAllUserComments } from '../../api/userCommentApi';
import './UserCommentList.css';

const UserCommentList = ({ onSelectComment }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllUserComments();
      setComments(data);
    } catch (err) {
      setError(err.message || 'Failed to load user comments.');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="user-comment-list-container">
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
      <div className="user-comment-list-card">
        <h2 className="list-title">Survey List</h2>

        {error && <div className="alert alert-error">{error}</div>}

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {comments.length === 0 ? (
              <div className="empty-state">No user comments found.</div>
            ) : (
              <div className="comments-table">
                <table>
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Section</th>
                      <th>Created Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map((comment) => (
                      <tr 
                        key={comment.id || comment.ID}
                        onDoubleClick={() => onSelectComment && onSelectComment(comment.id || comment.ID)}
                        style={{ cursor: onSelectComment ? 'pointer' : 'default' }}
                      >
                        <td>{comment.userName}</td>
                        <td>{comment.email || 'N/A'}</td>
                        <td>{comment.department || 'N/A'}</td>
                        <td>{comment.section || 'N/A'}</td>
                        <td>{formatDate(comment.createdDate)}</td>
                        <td>
                          <button
                            className="btn-view-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectComment) {
                                onSelectComment(comment.id || comment.ID);
                              }
                            }}
                            title="View Details"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserCommentList;

