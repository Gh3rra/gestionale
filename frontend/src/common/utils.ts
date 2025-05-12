export const formatAmount = (amount: number) => {
  const stringa = amount.toLocaleString();
  return stringa;
};

export const getFormattedTimestamp = (date: Date) => {
  const year = date.getFullYear();
  // getMonth() restituisce i mesi da 0 a 11, quindi sommiamo 1
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const checkValueNumber = (value: string) => {
  const val = value;
  value = val.replace(/[^\d]/g, "");
  return value;
};

export const checkValueDecimal = (value: string) => {
  let val = value;
  val = val.replace(".", ",");
  val = val.replace(/[^\d,]/g, "");
  const commaParts = val.split(",");
  if (commaParts.length > 2) {
    val = commaParts[0] + "," + commaParts[1];
  }
  if (commaParts.length === 2) {
    commaParts[1] = commaParts[1].slice(0, 2);
    val = commaParts[0] + "," + commaParts[1];
  }
  value = val;

  return val;
};
