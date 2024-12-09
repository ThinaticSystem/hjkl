import { describe, expect, it, vi } from 'vitest';
import { withReadonly } from './with_readonly';

describe('withReadonly', () => {
	it('OK', () => {
		const key = 'key';
		const value = { a: 1, b: { c: 2 } };
		const mockFreezer = vi.fn((_object) => 'FROZEN');

		const result = withReadonly('key', value, mockFreezer);

		expect(result[key]).toBe(value);
		expect(result[`_${key}`]).toBe('FROZEN');
		expect(mockFreezer).toBeCalledWith(value);
	});
});
