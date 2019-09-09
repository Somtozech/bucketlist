export const formatDate = function(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formatTime = function(date) {
  const options = { hour: 'numeric', minute: 'numeric' };
  return new Date(date).toLocaleTimeString('en-US', options);
};
