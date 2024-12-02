import { expect, test } from 'vitest';
import { orThrow } from './null';

test('not nullish, return same object', () => {
	const notNullish = {};
	const result = orThrow(notNullish);
	expect(result).toBe(notNullish);
});

const defaultMessage = 'Expect not nullish';

test.for([
	['undefined', undefined],
	['null', null],
] as const)('%s, throw (default message)', ([_tag, nullish]) => {
	expect(() => orThrow(nullish)).toThrowError(defaultMessage);
});

test.for([
	['undefined', undefined],
	['null', null],
] as const)('%s, throw (given message)', ([_tag, nullish]) => {
	const givenMessage = 'ぬるこまる';
	expect(() => orThrow(nullish, givenMessage)).toThrowError(givenMessage);
});
