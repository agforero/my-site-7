export const ORDER_GOOGLE_FORM_BASE_URL =
  process.env.NEXT_PUBLIC_ORDER_GOOGLE_FORM_URL ??
  "https://docs.google.com/forms/d/e/1FAIpQLSf3UDHiMsM1ZNZbNgZlsb2iAIdm-K__gSm25y1IKJKkt_Zh7g/viewform";

export const ORDER_GOOGLE_FORM_PHOTO_ENTRY =
  process.env.NEXT_PUBLIC_ORDER_GOOGLE_FORM_PHOTO_ENTRY ?? "entry.713567092";

export function buildOrderFormUrl(imageUrl: string): string {
  const url = new URL(ORDER_GOOGLE_FORM_BASE_URL);
  url.searchParams.set("usp", "pp_url");
  url.searchParams.set(ORDER_GOOGLE_FORM_PHOTO_ENTRY, imageUrl);
  return url.toString();
}
