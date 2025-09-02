/**
 * Format message count for display (e.g., 99+ for counts over 99)
 * @param {number} count - The message count
 * @returns {string} - Formatted count string
 */
export const formatMessageCount = (count) => {
  if (typeof count !== 'number' || count < 0) return '0';
  if (count > 99) return '99+';
  return count.toString();
};

/**
 * Generate initials from a name
 * @param {string} name - The name to generate initials from
 * @param {number} maxLength - Maximum number of initials (default: 2)
 * @returns {string} - Generated initials
 */
export const getInitials = (name, maxLength = 2) => {
  if (!name || typeof name !== 'string') return '?';

  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, maxLength)
    .join('');
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Validate file type and size for uploads
 * @param {File} file - File to validate
 * @param {object} options - Validation options
 * @returns {object} - Validation result
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  } = options;

  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`,
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type must be one of: ${allowedTypes.join(', ')}`,
    };
  }

  return { isValid: true, error: null };
};

/**
 * Create a file preview URL
 * @param {File} file - File to create preview for
 * @returns {Promise<string>} - Preview URL
 */
export const createFilePreview = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Deep merge objects
 * @param {object} target - Target object
 * @param {object} source - Source object
 * @returns {object} - Merged object
 */
export const deepMerge = (target, source) => {
  const result = { ...target };

  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
};
