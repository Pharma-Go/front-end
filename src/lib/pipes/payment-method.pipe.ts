import { PaymentMethod } from "../models";

export function formatPaymentMethod(value: any) {
  switch (value) {
    case PaymentMethod.CREDIT_CARD:
      return "Crédito";
    case PaymentMethod.DEBIT_CARD:
      return "Débito";
    default:
      return "Erro";
  }
}
