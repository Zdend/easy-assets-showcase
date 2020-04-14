import moment from 'moment-timezone';

export const DEFAULT_TIMEZONE = 'Australia/Sydney';

export const formatFixedDate = (isoDate: string): string => {
  if (!isoDate) {
    return ''
  }
  try {
    return moment(isoDate).tz(DEFAULT_TIMEZONE).format('Do MMM YYYY');
  } catch (e) {
    return '';
  }
};
