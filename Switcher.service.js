export const getTogglePosition = (value) => {
  if (value === false) return '3px';
  if (value === true) return 'calc(100% - 31px)';
  return 'calc(50% - 14px)';
};

export const getActiveToggleClass = (value) => {
  if (value === false) return 'activeToggleNo';
  if (value === true) return 'activeToggleYes';
  return '';
};
