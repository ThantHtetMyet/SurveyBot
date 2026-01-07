import API_CONFIG from '../config/apiConfig';

/**
 * UserComment API Service
 * Handles all user comment-related API calls
 */

/**
 * Create a new user comment
 * @param {Object} userCommentData - User comment data object
 * @returns {Promise} API response
 */
export const createUserComment = async (userCommentData) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_COMMENT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCommentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating user comment:', error);
    throw error;
  }
};

/**
 * Get all user comments
 * @returns {Promise} API response
 */
export const getAllUserComments = async () => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_COMMENT}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user comments:', error);
    throw error;
  }
};

/**
 * Get user comment by ID
 * @param {string} userCommentId - User comment ID
 * @returns {Promise} API response
 */
export const getUserCommentById = async (userCommentId) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_COMMENT}/${userCommentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user comment:', error);
    throw error;
  }
};

/**
 * Update user comment
 * @param {string} userCommentId - User comment ID
 * @param {Object} userCommentData - Updated user comment data
 * @returns {Promise} API response
 */
export const updateUserComment = async (userCommentId, userCommentData) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_COMMENT}/${userCommentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCommentData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.status === 204 ? { success: true } : await response.json();
  } catch (error) {
    console.error('Error updating user comment:', error);
    throw error;
  }
};

/**
 * Delete user comment
 * @param {string} userCommentId - User comment ID
 * @returns {Promise} API response
 */
export const deleteUserComment = async (userCommentId) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER_COMMENT}/${userCommentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.status === 204 ? { success: true } : await response.json();
  } catch (error) {
    console.error('Error deleting user comment:', error);
    throw error;
  }
};

