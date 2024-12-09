import type { DeepReadonly } from '../util/type';

export const Freezers = (() => {
	const apis = {
		/**
		 * @returns with {@link Readonly}
		 */
		byType: <O extends object>(object: O): Readonly<O> => object,

		/**
		 * @returns with recursive {@link Readonly}
		 */
		byTypeDeep: <O extends object>(object: O): DeepReadonly<O> => object,

		/**
		 * @returns with {@link Object.freeze()}
		 */
		byFreeze: <O extends object>(object: O): Readonly<O> => {
			const copied = structuredClone(object);
			return Object.freeze(copied);
		},

		/**
		 * @returns with recursive {@link Object.freeze}
		 */
		byFreezeDeep: <O extends object>(object: O): DeepReadonly<O> => {
			const copied = structuredClone(object);
			const freeze = <FO extends object>(object: FO) => {
				const propNames = Reflect.ownKeys(object) as (keyof FO)[];

				for (const name of propNames) {
					const value = object[name];

					if (
						(value && typeof value === 'object') ||
						typeof value === 'function'
					) {
						freeze(value);
					}
				}

				return Object.freeze(object);
			};
			return freeze(copied);
		},
	} as const;

	return apis;
})();
