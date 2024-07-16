export const generateRandomChar = (length: number): string => {
  const char: string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";

  let result: string = "";
  for (let i: number = 0; i < length; i++) {
    result += char.charAt(Math.random() * char.length);
  }

  return result;
}

export const generateRandomNumber = (length: number): string => {
  const number: string = "0123456789";

  let result: string = "";

  for (let i: number = 0; i < length; i++) {
    result += number.charAt(Math.random() * number.length);
  }

  return result;
}