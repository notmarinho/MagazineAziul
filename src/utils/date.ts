import {format, isAfter, isBefore, isSameDay, parse} from 'date-fns';

export const formatStringDate = (date: string) => {
  const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
  return format(parsedDate, 'dd/MM/yyyy');
};

export const isBetweenDates = (
  date: Date,
  {start, end}: {start: Date; end: Date},
) => {
  const isAfterOrSameDay = isAfter(date, start) || isSameDay(date, start);
  const isBeforeOrSameDay = isBefore(date, end) || isSameDay(date, end);

  return isAfterOrSameDay && isBeforeOrSameDay;
};

export const isSameDayOrAfter = (date: Date, start: Date) =>
  isAfter(date, start) || isSameDay(date, start);

export const isSameDayOrBefore = (date: Date, end: Date) =>
  isBefore(date, end) || isSameDay(date, end);
