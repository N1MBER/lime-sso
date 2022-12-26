import { addDays, addHours, addMinutes } from 'date-fns';

export const getDelayedDate = (params: {
  days?: number;
  hours?: number;
  minutes?: number;
}) => {
  const { days = 0, hours = 0, minutes = 0 } = params;
  const currentDate = new Date();
  return addDays(addHours(addMinutes(currentDate, minutes), hours), days);
};
