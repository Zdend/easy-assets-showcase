export const handleEnter = (callback: Function) => (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.keyCode === 13) {
    callback(event);
  }
};
