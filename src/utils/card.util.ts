const generateCardNumber = (): [string, string, string, string] => {
  const parts: string[] = [];
  for (let i = 0; i < 4; i++) {
    const block = Math.floor(1000 + Math.random() * 9000); // ensures a 4-digit number
    parts.push(block.toString());
  }
  return parts as [string, string, string, string];
};

const generateExpiryDate = (): string => {
  const now = new Date();
  const futureYear = now.getFullYear() + Math.floor(Math.random() * 5) + 1;
  const month = Math.floor(Math.random() * 12) + 1;

  const formattedMonth = month.toString().padStart(2, '0');
  const formattedYear = futureYear.toString().slice(-2); // last 2 digits

  return `Thru: ${formattedMonth}/${formattedYear}`;
};

export {generateCardNumber, generateExpiryDate};
