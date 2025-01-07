import {describe, expect, it} from 'vitest';

import {foo} from '../src';

describe('foo', () => {
  it('should be bar', () => {
    expect(foo).toBe('bar');
  });
});
