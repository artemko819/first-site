import { CreatedTransactionStatus } from "../types/transaction";

export const generateRandomId = (size: number): string => {
  let length = size;
  let result = 'RM-';
  while (!!length) {
    result = result += Math.floor(Math.random() * 10)
    length -= 1;
  }
  return result;
};


export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
};

type ColorsType = { [key in CreatedTransactionStatus]: string };

export const getStatusColor = (status: CreatedTransactionStatus) => {
  const colors: ColorsType = {
    'waiting': "#ffc107",
    'deposited': "#11D3BC",
  };

  return colors[status];
}
// SUCCESS = "#11D3BC",
//   FAILED = "#dc3545",
//   WARNING = "#ffc107",
//   PRIMARY = "#0d6efd",
//   GRAY = "#6c757d",
//   PINK = "#a90de7",

export const getDomainName = () => window.location.hostname === "localhost"
  ? "hestiaexchange.com"
  : window.location.hostname;

export const isLocal = () => window.location.hostname === "localhost";
