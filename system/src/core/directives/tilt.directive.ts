import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input, numberAttribute } from '@angular/core';
import { gsap } from 'gsap';

import { TILT_MAX_DEG, TILT_PERSPECTIVE_PX, TILT_TWEEN_VARS } from '@core/constants/motion.const';
import type { PointerPosition } from '@core/interfaces/motion.interface';
import { prefersReducedMotion } from '@core/utils/motion.util';

type QuickSetter = ReturnType<typeof gsap.quickTo>;

/**
 * Inclina o elemento em 3D seguindo o mouse e expõe --mx/--my para o brilho (spotlight) em CSS.
 * Os listeners são nativos e passivos (fora do ciclo de detecção do Angular) e processados no máximo uma vez por quadro.
 */
@Directive({
  selector: '[appTilt]',
  host: { class: 'tilt' },
})
export class Tilt {
  public readonly tiltMax = input<number, number | string>(TILT_MAX_DEG, {
    transform: (value) => numberAttribute(value, TILT_MAX_DEG),
  });

  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly _destroyRef = inject(DestroyRef);

  private _rotateX: QuickSetter | undefined;
  private _rotateY: QuickSetter | undefined;
  private _pointer: PointerPosition | undefined;
  private _frame: number | undefined;

  constructor() {
    afterNextRender(() => {
      if (prefersReducedMotion()) {
        return;
      }
      gsap.set(this._element, { transformPerspective: TILT_PERSPECTIVE_PX });
      this._rotateX = gsap.quickTo(this._element, 'rotationX', TILT_TWEEN_VARS);
      this._rotateY = gsap.quickTo(this._element, 'rotationY', TILT_TWEEN_VARS);

      const onMove = (event: PointerEvent): void => this._queueMove(event);
      const onLeave = (): void => this._reset();
      this._element.addEventListener('pointermove', onMove, { passive: true });
      this._element.addEventListener('pointerleave', onLeave, { passive: true });
      this._destroyRef.onDestroy(() => {
        this._element.removeEventListener('pointermove', onMove);
        this._element.removeEventListener('pointerleave', onLeave);
        this._cancelFrame();
      });
    });
  }

  private _queueMove(event: PointerEvent): void {
    if (event.pointerType === 'touch') {
      return;
    }
    this._pointer = { x: event.clientX, y: event.clientY };
    if (this._frame !== undefined) {
      return;
    }
    this._frame = requestAnimationFrame(() => {
      this._frame = undefined;
      this._applyTilt();
    });
  }

  private _applyTilt(): void {
    if (!this._pointer) {
      return;
    }
    const rect = this._element.getBoundingClientRect();
    const x = this._pointer.x - rect.left;
    const y = this._pointer.y - rect.top;
    const max = this.tiltMax();
    this._element.style.setProperty('--mx', `${x}px`);
    this._element.style.setProperty('--my', `${y}px`);
    this._rotateY?.((x / rect.width - 0.5) * 2 * max);
    this._rotateX?.(-(y / rect.height - 0.5) * 2 * max);
  }

  private _reset(): void {
    this._cancelFrame();
    this._pointer = undefined;
    this._rotateX?.(0);
    this._rotateY?.(0);
  }

  private _cancelFrame(): void {
    if (this._frame !== undefined) {
      cancelAnimationFrame(this._frame);
      this._frame = undefined;
    }
  }
}
