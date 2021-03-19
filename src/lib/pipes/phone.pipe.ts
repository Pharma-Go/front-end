export function formatPhone(phone: string) {
  if (phone.length !== 11) {
    return phone;
  }

  const ddd = `(${phone.substring(0, 2)})`;

  return `${ddd} ${phone.substring(2)}`;
}
