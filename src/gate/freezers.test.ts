import { describe, expect, it } from 'vitest';
import { Freezers } from './freezers';

describe('Freezers', () => {
	describe('byType', () => {
		it('Runtime', () => {
			const object = { a: 'Top level', b: { c: '2nd level' } };

			const result = Freezers.byType(object);

			expect(result, 'Returns same object').toBe(object);
			expect(() => {
				// @ts-expect-error
				result.a = 'assignable';
			}, 'Can top level re-assignment').not.toThrow();
			expect(() => {
				result.b.c = 'assignable';
			}, 'Can 2nd level re-assignment').not.toThrow();
		});

		it('Type', { todo: true }); // TODO
	});

	describe('byTypeDeep', () => {
		it('Runtime', () => {
			const object = { a: 'Top level', b: { c: '2nd level' } };

			const result = Freezers.byTypeDeep(object);

			expect(result, 'Returns same object').toBe(object);
			expect(() => {
				// @ts-expect-error
				result.a = 'assignable';
			}, 'Can top level re-assignment').not.toThrow();
			expect(() => {
				// @ts-expect-error
				result.b.c = 'assignable';
			}, 'Can 2nd level re-assignment').not.toThrow();
		});

		it('Type', { todo: true }); // TODO
	});

	describe('byFreeze', () => {
		it('Runtime', () => {
			const object = { a: 'Top level', b: { c: '2nd level' } };

			const result = Freezers.byFreeze(object);

			expect(result, 'Returns another object').not.toBe(object);
			expect(() => {
				// @ts-expect-error
				result.a = 'NOT assignable';
			}, 'Cannot top level re-assignment').toThrow();
			expect(() => {
				result.b.c = 'assignable';
			}, 'Can 2nd level re-assignment').not.toThrow();
		});

		it('Type', { todo: true }); // TODO
	});

	describe('byFreezeDeep', () => {
		it('Runtime', () => {
			const object = { a: 'Top level', b: { c: '2nd level' } };

			const result = Freezers.byFreezeDeep(object);

			expect(result, 'Returns another object').not.toBe(object);
			expect(() => {
				// @ts-expect-error
				result.a = 'NOT assignable';
			}, 'Cannot top level re-assignment').toThrow();
			expect(() => {
				// @ts-expect-error
				result.b.c = 'NOT assignable';
			}, 'Cannot 2nd level re-assignment').toThrow();
		});

		it('Type', { todo: true }); // TODO
	});
});
