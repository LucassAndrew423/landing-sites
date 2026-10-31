import { FormControl } from '@angular/forms';

import { notBlankValidator } from '@core/utils/form-validators.util';

describe('notBlankValidator', () => {
  it('should flag a value made only of spaces', () => {
    expect(notBlankValidator(new FormControl('   '))).toEqual({ notBlank: true });
  });

  it('should accept text and leave empty values to Validators.required', () => {
    expect(notBlankValidator(new FormControl('Maria'))).toBeNull();
    expect(notBlankValidator(new FormControl(''))).toBeNull();
  });
});
