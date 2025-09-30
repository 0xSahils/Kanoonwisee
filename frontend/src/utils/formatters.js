/**
 * Format currency amount
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'INR')
 * @param {string} locale - Locale for formatting (default: 'en-IN')
 */
export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  if (typeof amount !== 'number') {
    return '₹0';
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    // Fallback for unsupported locale/currency
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};

/**
 * Format amount in paise to rupees
 * @param {number} paiseAmount - Amount in paise
 */
export const formatPaiseToRupees = (paiseAmount) => {
  const rupees = paiseAmount / 100;
  return formatCurrency(rupees);
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'en-IN')
 */
export const formatDate = (date, locale = 'en-IN') => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
};

/**
 * Format date and time to readable string
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'en-IN')
 */
export const formatDateTime = (date, locale = 'en-IN') => {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
};

/**
 * Format duration in days to readable string
 * @param {number} days - Number of days
 */
export const formatDuration = (days) => {
  if (!days || days <= 0) return '';
  
  if (days === 1) return '1 day';
  if (days < 30) return `${days} days`;
  if (days === 30) return '1 month';
  if (days < 365) {
    const months = Math.floor(days / 30);
    const remainingDays = days % 30;
    let result = `${months} month${months > 1 ? 's' : ''}`;
    if (remainingDays > 0) {
      result += ` ${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
    }
    return result;
  }
  
  const years = Math.floor(days / 365);
  const remainingDays = days % 365;
  let result = `${years} year${years > 1 ? 's' : ''}`;
  if (remainingDays > 0) {
    const months = Math.floor(remainingDays / 30);
    if (months > 0) {
      result += ` ${months} month${months > 1 ? 's' : ''}`;
    }
  }
  return result;
};