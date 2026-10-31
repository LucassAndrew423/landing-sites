import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';
import { gsap } from 'gsap';

import { MAGNETIC_STRENGTH, MAGNETIC_TWEEN_VARS } from '@core/constants/motion.const';
import type { PointerPosition } from '@core/interfaces/motion.interface';
import { prefersReducedMotion } from '@core/utils/motion.util';

type QuickSetter = ReturnType<typeof gsap.quickTo>;

/**
 * O elemento é "puxado" levemente na direção do cursor quando o mouse chega perto.
 * Os listeners são nativos e passivos (fora do ciclo de detecção do Angular) e processados no máximo uma vez por quadro.
 */
@Directive({ selector: '[appMagnetic]' })
export class Magnetic {
  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly _destroyRef = inject(DestroyRef);

  private _moveX: QuickSetter | undefined;
  private _moveY: QuickSetter | undefined;
  private _pointer: PointerPosition | undefined;
  private _frame: number | undefined;

  constructor() {
    afterNextRender(() => {
      if (prefersReducedMotion()) {
        return;
      }
      this._moveX = gsap.quickTo(this._element, 'x', MAGNETIC_TWEEN_VARS);
      this._moveY = gsap.quickTo(this._element, 'y', MAGNETIC_TWEEN_VARS);

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
      this._applyPull();
    });
  }

  private _applyPull(): void {
    if (!this._pointer) {
      return;
    }
    const rect = this._element.getBoundingClientRect();
    this._moveX?.((this._pointer.x - (rect.left + rect.width / 2)) * MAGNETIC_STRENGTH);
    this._moveY?.((this._pointer.y - (rect.top + rect.height / 2)) * MAGNETIC_STRENGTH);
  }

  private _reset(): void {
    this._cancelFrame();
    this._pointer = undefined;
    this._moveX?.(0);
    this._moveY?.(0);
  }

  private _cancelFrame(): void {
    if (this._frame !== undefined) {
      cancelAnimationFrame(this._frame);
      this._frame = undefined;
    }
  }
}
