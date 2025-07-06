// Utility to generate and store an anonymous user ID in localStorage

function generateUUID() {
  // Simple UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getOrCreateUserId(): string {
  if (typeof window === 'undefined') return '';
  let userId = localStorage.getItem('anonUserId');
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem('anonUserId', userId);
  }
  return userId;
} 