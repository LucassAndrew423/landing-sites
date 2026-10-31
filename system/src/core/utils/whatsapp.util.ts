import { WHATSAPP_BASE_URL } from '@core/constants/site.const';
import type { WhatsappUrlParams } from '@core/interfaces/whatsapp.interface';

export function buildWhatsappUrl({ phone, message }: WhatsappUrlParams): string {
  return `${WHATSAPP_BASE_URL}/${phone}?text=${encodeURIComponent(message)}`;
}
