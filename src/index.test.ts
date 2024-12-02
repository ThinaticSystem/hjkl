import { describe, expect, it } from 'vitest';
import { buildHotoana } from '.';

const scope = <T, R>(value: T, process: (value: T) => R) => process(value);

describe('playground', () => {
	const hotoana = buildHotoana(
		{ honi: { v1: 1 }, punyu: { v2: 2 } } as const,
		'honi',
	);

	it('union', () => {
		expect(hotoana.union).toStrictEqual({
			_kind: 'honi',
			v1: 1,
		});
	});

	it('to', () => {
		const result = hotoana.to('punyu');
		expect(result.union).toStrictEqual({
			_kind: 'punyu',
			v2: 2,
		});
		expect(result).toBe(hotoana); // Same object reference (for method chaining)
	});

	it('with', () => {
		const result = hotoana.with((currentCase) => {
			expect(currentCase._kind).toBe('punyu');
		});
		expect(result).toBe(hotoana); // Same object reference (for method chaining)
	});

	describe('match', () => {
		it('matched', () => {
			const result = hotoana.match('punyu', (matchedCase) => {
				expect(matchedCase._kind).toBe('punyu');
			});
			expect(result).toBe(hotoana); // Same object reference (for method chaining)
		});

		it('not matched', () => {
			const result = hotoana.match('honi', (_matchedCase) => {
				expect.fail('Callback should not be called');
			});
			expect(result).toBe(hotoana); // Same object reference (for method chaining)
		});
	});

	it('go', () => {
		const newCase = hotoana.go('honi');
		scope(
			{
				_kind: 'honi',
				v1: 1,
			},
			(expectedNewCase) => {
				expect(newCase).toStrictEqual(expectedNewCase);
				expect(hotoana.union).toStrictEqual(expectedNewCase);
			},
		);
	});
});
