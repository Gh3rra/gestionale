export function getDateFromExcel(serial: number) {
  const date = new Date(Math.round((serial - 25569) * 86400 * 1000));
  return date;
}
