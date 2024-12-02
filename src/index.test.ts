import { expect, test } from 'vitest';
import { buildHotoana } from '.';

const scope = <T, R>(value: T, process: (value: T) => R) => process(value);

test('playground', () => {
	const hotoana = buildHotoana({ honi: { v1: 1 }, punyu: { v2: 2 } }, 'honi');
	expect(hotoana.union).toStrictEqual({
		_kind: 'honi',
		v1: 1,
	});

	const toResult = hotoana.to('punyu');
	expect(toResult).toBe(hotoana); // Same object reference (for method chaining)
	expect(toResult.union).toStrictEqual({
		_kind: 'punyu',
		v2: 2,
	});

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
