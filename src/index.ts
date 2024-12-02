import { orThrow } from './util/null';

type Kind = string | number | symbol;
interface HotoanaCase<K extends Kind> {
	_kind: K;
}
type HotoanaConfig<K extends Kind> = Record<
	K,
	Record<string | number | symbol, unknown>
>;
type Tansu<K extends Kind, Cfg extends HotoanaConfig<K>> = Map<
	K,
	Cfg[K] & HotoanaCase<K>
>;

const putInTansu = <K extends Kind, Cfg extends HotoanaConfig<K>>(
	config: Readonly<Cfg>,
): Tansu<K, Cfg> =>
	new Map(
		Object.entries(config).map(([kind, contents]) => [
			kind as K,
			{
				_kind: kind as K,
				...(contents as Record<string | number | symbol, unknown> as Cfg[K]),
			},
		]),
	);

export const buildHotoana = <Cfg extends HotoanaConfig<Kind>>(
	config: Readonly<Cfg>,
	initialCase: keyof Cfg,
) => {
	const tansu = putInTansu(config);
	const states: {
		currentCase: Cfg[keyof Cfg] & HotoanaCase<keyof Cfg>;
	} = {
		currentCase: orThrow(tansu.get(initialCase)),
	};

	const api = {
		to: <MK extends keyof Cfg>(kind: MK) => {
			const newCase = tansu.get(kind) as Cfg[MK] & HotoanaCase<MK>;
			states.currentCase = newCase;
			return api;
		},

		with: (
			process: (currentCase: Cfg[keyof Cfg] & HotoanaCase<keyof Cfg>) => void,
		) => {
			process(states.currentCase);
			return api;
		},

		match: <MK extends keyof Cfg>(
			kind: MK,
			process: (matchedCase: Cfg[MK] & HotoanaCase<MK>) => void,
		) => {
			if (states.currentCase._kind === kind) {
				process(states.currentCase as Cfg[MK] & HotoanaCase<MK>);
			}
			return api;
		},

		get union(): Cfg[keyof Cfg] & HotoanaCase<keyof Cfg> {
			return states.currentCase;
		},

		go: <MK extends keyof Cfg>(kind: MK): Cfg[MK] & HotoanaCase<MK> => {
			const newCase = tansu.get(kind) as Cfg[MK] & HotoanaCase<MK>;
			states.currentCase = newCase;
			return newCase;
		},
	};
	return api;
};
