import { format } from 'date-fns';

export const getShortDate = (date) => {
  return format(new Date(date), 'dd-MM-yyyy');
};
