import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const notBlankValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const value: unknown = control.value;
  return typeof value === 'string' && value.length > 0 && value.trim().length === 0 ? { notBlank: true } : null;
};
