const second = 1e3;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

export const daysPast = (timeStamp) => {
  const diff = Date.now() - timeStamp;

  return Math.ceil(diff / day);
}

export const searchObj = (obj, keys) => {
  for (const key of keys) {
    if (key in obj) return obj[key];
  }
}

export const getMonth = (timeStamp) => {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][new Date(timeStamp).getMonth()];
}

export const sensibleImg = (src) => `${src}&width=360&height=360&exact=true`
