export function validateDeliveryForm(data: {
  fullName: string;
  phone: string;
  address: string;
}): boolean {
  return (
    data.fullName.trim().length >= 2 &&
    data.phone.trim().length >= 7 &&
    data.address.trim().length >= 5
  );
}

export function estimateDeliveryTime(itemCount: number): number {
  const base = 25;
  const extra = Math.min(itemCount * 2, 15);
  return base + extra;
}
