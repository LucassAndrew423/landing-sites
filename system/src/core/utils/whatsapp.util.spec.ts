import { buildWhatsappUrl } from '@core/utils/whatsapp.util';

describe('buildWhatsappUrl', () => {
  it('should encode the message in the wa.me link', () => {
    const url = buildWhatsappUrl({ phone: '5511999998888', message: 'Olá mundo\nTudo bem?' });

    expect(url).toBe('https://wa.me/5511999998888?text=Ol%C3%A1%20mundo%0ATudo%20bem%3F');
  });
});
