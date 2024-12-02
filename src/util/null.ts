// biome-ignore lint/complexity/noBannedTypes: <explanation>
type NonNullishAny = {};

export const orThrow = <T extends NonNullishAny>(
	nullable: T | undefined | null,
	message = 'Expect not nullish',
) => {
	if (nullable == null) {
		throw new Error(message);
	}
	return nullable;
};
