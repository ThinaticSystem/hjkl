export const withReadonly = <K extends string, V extends object, FR>(
	key: K,
	value: V,
	freezer: (object: V) => FR,
) =>
	({
		[key]: value,
		[`_${key}`]: freezer(value),
	}) as { [_k in K]: V } & {
		[_k in `_${K}`]: FR;
	};
