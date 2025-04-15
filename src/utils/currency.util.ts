export const formatCurrenyNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};
