export const getFocusStyle = (isInvalid: boolean) => {
  return {
    outline: 'none',
    borderColor: isInvalid ? 'red.500' : 'primary',
  };
};
