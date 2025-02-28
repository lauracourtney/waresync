// Email validation regex
export const validEmailFormat =
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Phone validation regex (10-15 digits only, numeric)
export const validPhoneFormat = /^\+\d{1,3} \(\d{3}\) \d{3}[-\s]?\d{4}$/;

// Status formatting (uppercase)
export const formatStatus = (status) => {
  return status ? status.toUpperCase() : "";
};
