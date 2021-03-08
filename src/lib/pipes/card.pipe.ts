import { Card } from "../models";

export function cardDigits(card: Card): string {
  let cardNumber = "";

  const firstDigits = card.firstDigits || card["first_digits"];
  const lastDigits = card.lastDigits || card["last_digits"];

  if (card) {
    if (firstDigits) {
      cardNumber = firstDigits.substring(0, 4);
      cardNumber += "  ";
      cardNumber += firstDigits.substring(4, 6);
    }

    cardNumber += "** ****";

    if (lastDigits) {
      cardNumber += lastDigits;
    }
  }

  return cardNumber;
}
