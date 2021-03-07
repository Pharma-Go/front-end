import { Card } from "../models";

export function cardDigits(card: Card): string {
  let cardNumber = "";

  if (card) {
    if (card.firstDigits) {
      cardNumber = card.firstDigits.substring(0, 4);
      cardNumber += "  ";
      cardNumber += card.firstDigits.substring(4, 6);
    }

    cardNumber += "** ****";

    if (card.lastDigits) {
      cardNumber += card.lastDigits;
    }
  }

  return cardNumber;
}
