/**
 * Parses a restaurant URL format like "o9001/s17/t7" into its components
 * @param {string} url - URL in format "o[outletCode]/s[sectionId]/t[tableId]"
 * @returns {Object} Parsed components or null if invalid
 */
export const parseRestoUrl = (url) => {
  try {
    // Basic format validation
    if (!url || typeof url !== 'string') {
      throw new Error('URL must be a non-empty string');
    }

    // Split the URL into parts
    const parts = url.split('/');
    
    // Validate we have all required parts
    if (parts.length !== 3) {
      throw new Error('URL must have outlet, section, and table components');
    }

    // Extract and validate each component
    const outletMatch = parts[0].match(/^o(\d+)$/);
    const sectionMatch = parts[1].match(/^s(\d+)$/);
    const tableMatch = parts[2].match(/^t(\d+)$/);

    if (!outletMatch || !sectionMatch || !tableMatch) {
      throw new Error('Invalid component format');
    }

    // Remove the 'o', 's', 't' prefixes for the route
    return {
      outletCode: outletMatch[1], // Just return the number without 'o'
      sectionId: sectionMatch[1], // Just return the number without 's'
      tableId: tableMatch[1], // Just return the number without 't'
      isValid: true
    };
  } catch (error) {
    console.error('Invalid resto URL format:', url, error.message);
    return {
      outletCode: null,
      sectionId: null,
      tableId: null,
      isValid: false,
      error: error.message
    };
  }
}; 