import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { Reveal } from '@core/directives/reveal.directive';

@Component({
  imports: [Reveal],
  template: `<p appReveal="120" revealVariant="left">Olá</p>`,
})
class HostComponent {}

describe('Reveal', () => {
  it('should reveal right away when IntersectionObserver is not available', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const paragraph = (fixture.nativeElement as HTMLElement).querySelector('p');

    expect(paragraph?.classList.contains('reveal')).toBe(true);
    expect(paragraph?.classList.contains('reveal--in')).toBe(true);
    expect(paragraph?.getAttribute('data-variant')).toBe('left');
    expect(paragraph?.style.getPropertyValue('--reveal-delay')).toBe('120ms');
  });
});
