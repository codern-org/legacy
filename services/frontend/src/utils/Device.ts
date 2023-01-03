export const isMacOs = () => {
  const userAgent = window.navigator.userAgent;
  return userAgent.includes('Mac OS');
};
