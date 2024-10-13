export const formatDateNorwegian = (inputDate?: Date | string) => {
  if (!inputDate) return '';

  let date: Date;
  if (inputDate instanceof Date) {
    date = inputDate;
  } else {
    date = new Date(inputDate);
  }

  if (!date || isNaN(date.getTime())) {
    return 'Ugyldig dato';
  }

  const year = date.getUTCFullYear();
  const day = date.getUTCDate().toString().padStart(2, '0');
  const monthsNorwegian = [
    'jan',
    'feb',
    'mar',
    'apr',
    'mai',
    'jun',
    'jul',
    'aug',
    'sep',
    'okt',
    'nov',
    'des',
  ];
  const month = monthsNorwegian[date.getUTCMonth()];

  return `${day}. ${month} ${year}`;
};
