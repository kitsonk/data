// import { Observable } from 'rxjs/Observable';
// import { Thenable } from 'dojo-shim/interfaces';
import Promise from 'dojo-shim/Promise';

export interface FieldValueObject {
	[field: string]: FieldValue;
}

export type FieldValue = string | number | boolean | FieldValueObject | null | undefined
	| (string | number | boolean | FieldValueObject | null | undefined)[];

export const enum BSONType {
	double = 1,
	string = 2,
	object = 3,
	array = 4,
	binData = 5,
	'undefined' = 6,
	objectId = 7,
	bool = 8,
	data = 9,
	'null' = 10,
	regex = 11,
	dbPointer = 12,
	javascript = 13,
	symbol = 14,
	javascriptWithScope = 15,
	int = 16,
	timestamp = 17,
	long = 18,
	minkey = -1,
	maxkey = 127
}

export interface QueryOperator {
	$eq?: FieldValue;
	$gt?: FieldValue;
	$gte?: FieldValue;
	$lt?: FieldValue;
	$lte?: FieldValue;
	$ne?: FieldValue;
	$in?: FieldValue[];
	$nin?: FieldValue[];
	$exists?: boolean;
	$type?: BSONType;
	$mod?: [ number, number ];
	$regex?: RegExp | string;
	$options?: string;
	$all?: FieldValue[];
	$elemMatch?: QueryOperator;
	$size?: number;
	$bitsAllSet?: number | number[];
	$bitsAnySet?: number | number[];
	$bitsAllClear?: number | number[];
	$bitsAnyClear?: number | number[];
}

export interface QueryTextSearch {
	$search: string;
	$language?: string;
	$caseSensitive?: boolean;
	$diacriticSensitive?: boolean;
}

export interface QueryExpression<T> {
	[field: string]: FieldValue | QueryOperator;
	$or?: QueryExpression<T>[];
	$and?: QueryExpression<T>[];
	$not?: QueryExpression<T>[];
	$nor?: QueryExpression<T>[];
	$text?: QueryTextSearch;
	$where?: ((this: T) => boolean) | string;
}

export interface GeoNearSpecification {
	spherical: boolean;
	limit?: number;
	num?: number;
	maxDistance?: number;
	query?: QueryExpression<any>;
	distanceMultiplier?: number;
	uniqueDocs?: boolean;
	near: any;
	distanceField: string;
	includeLocs?: string;
	minDistance?: number;
}

export type Expression = string | number | boolean | null | undefined | {
	$and?: Expression[];
	$or?: Expression[];
	$not?: Expression[];

	$setEquals?: Expression[];
	$setIntersection?: Expression[];
	$setUnion?: Expression[];
	$setDifference?: [ Expression, Expression ];
	$setSubset?: [ Expression, Expression ];
	$anyElementTrue?: [ Expression ];
	$allElementsTrue?: [ Expression ];

	$cmp?: [ Expression, Expression ];
	$eq?: [ Expression, Expression ];
	$gt?: [ Expression, Expression ];
	$gte?: [ Expression, Expression ];
	$lt?: [ Expression, Expression ];
	$lte?: [ Expression, Expression ];
	$ne?: [ Expression, Expression ];

	$abs?: Expression;
	$add?: Expression[];
	$ceil?: Expression;
	$divide?: [ Expression, Expression ];
	$exp?: Expression;
	$floor?: Expression;
	$log?: [ Expression, Expression ];
	$log10?: Expression;
	$mod?: [ Expression, Expression ];
	$multiply?: Expression[];
	$pow?: [ Expression, Expression ];
	$sqrt?: Expression;
	$subtract?: [ Expression, Expression ];
	$trunc?: Expression;

	$concat?: Expression[];
	$substr?: [ Expression, Expression, Expression ];
	$toLower?: Expression;
	$toUpper?: Expression;
	$strcasecmp?: [ Expression, Expression ];
	$meta?: 'textScore';

	$arrayElemAt?: [ Expression, Expression ];
	$concatArrays?: Expression[];
	$filter?: {
		input: Expression;
		as: string;
		cond: Expression;
	};
	$isArray?: [ Expression ];
	$size?: Expression;
	$slice?: [ Expression, Expression ] | [ Expression, Expression, Expression ];

	$map?: {
		input: Expression;
		as: string;
		in: Expression;
	};
	$let?: {
		vars: {
			[ name: string ]: Expression
		};
		in: Expression;
	};
	$literal?: FieldValue;

	$dayOfYear?: Expression;
	$dayOfMonth?: Expression;
	$dayOfWeek?: Expression;
	$year?: Expression;
	$month?: Expression;
	$week?: Expression;
	$hour?: Expression;
	$minute?: Expression;
	$second?: Expression;
	$millisecond?: Expression;
	$dateToString?: Expression;

	$cond?: [ Expression, Expression, Expression ] | {
		if: Expression;
		then: Expression;
		else: Expression;
	};
	$ifNull?: [ Expression, Expression ];

	$sum?: Expression | Expression[];
	$avg?: Expression | Expression[];
	$first?: Expression;
	$last?: Expression;
	$max?: Expression | Expression[];
	$min?: Expression | Expression[];
	$push?: Expression;
	$addToSet?: Expression;
	$stdDevPop?: Expression | Expression[];
	$stdDevSamp?: Expression | Expression[];
}

export interface AccumulatorOperator {
	$sum?: Expression;
	$avg?: Expression;
	$first?: Expression;
	$last?: Expression;
	$max?: Expression;
	$min?: Expression;
	$push?: Expression;
	$addToSet?: Expression;
	$stdDevPop?: Expression;
	$stdDevDamp?: Expression;
}

export interface GroupSpecification {
	_id: Expression;
	[field: string]: AccumulatorOperator | Expression;
}

export interface Specification {
	[field: string]: Expression;
}

export interface UnwindSpecification {
	path: string;
	includeArrayIndex: string;
	preserveNullAndEmptyArrays: boolean;
}

export interface SortSpecification {
	[field: string]: 1 | -1 | { $meta: 'textScore' };
}

export interface LookupSpecification {
	from: string;
	localField: string;
	foreignField: string;
	as: string;
}

export interface AggregationOperator {
	$project?: Specification;
	$match?: QueryExpression<any>;
	$redact?: Expression;
	$limit?: number;
	$skip?: number;
	$unwind?: string | UnwindSpecification;
	$group?: GroupSpecification;
	$sample?: { size: number; };
	$sort?: SortSpecification;
	$geoNear?: GeoNearSpecification;
	$lookup?: LookupSpecification;
	$out?: string;
	$indexStats?: any;
}

export interface AggregationPipeline<T> {
	exec(): Query<T>;
	// geoNear(specfication: GeoNearSpecification): this;
	// group<U>(specification: GroupSpecification): AggregationPipeline<U>;
	// match(query: QueryExpression<T>): this;
	// limit(count: number): this;
	// lookup(specfication: LookupSpecification): this;
	// project<U>(specification: Specification): AggregationPipeline<U>;
	redact(expression: Expression): this;
	// sample(size: number): this;
	// skip(count: number): this;
	// sort(specification: SortSpecification): this;
	// unwind(field: string | UnwindSpecification): this;
}

export interface CountOptions {
	limit?: number;
	skip?: number;
	hint?: string;
	maxTimeMs?: number;
	readConcern?: 'local' | 'majority';
}

export interface ConditionalExpression<T> {
	equals(field: string, value: FieldValue): ConditionalQuery<T>;
	// greaterThan(field: string, value: FieldValue): ConditionalQuery<T>;
	// greaterThanOrEquals(field: string, value: FieldValue): ConditionalQuery<T>;
	// lessThan(field: string, value: FieldValue): ConditionalQuery<T>;
	// lessThanOrEquals(field: string, value: FieldValue): ConditionalQuery<T>;
	// notEquals(field: string, value: FieldValue): ConditionalQuery<T>;
	// in(field: string, values: FieldValue[]): ConditionalQuery<T>;
	// notIn(field: string, values: FieldValue[]): ConditionalQuery<T>;
	// exists(field: string, exists?: boolean): ConditionalQuery<T>;
	// type(field: string, type: BSONType): ConditionalQuery<T>;
	// modulus(field: string, value: [ number, number ]): ConditionalQuery<T>;
	// regex(field: string, value: RegExp | string, options?: string): ConditionalQuery<T>;
	// all(field: string, values: FieldValue[]): ConditionalQuery<T>;
	// elemMatch(field: string): ConditionalExpression<T>;
	// size(field: string, value: number): ConditionalQuery<T>;
	// bitsAllSet(field: string, value: number | number[]): ConditionalQuery<T>;
	// bitsAnySet(field: string, value: number | number[]): ConditionalQuery<T>;
	// bitsAllClear(field: string, value: number | number[]): ConditionalQuery<T>;
	// bitsAnyClear(field: string, value: number | number[]): ConditionalQuery<T>;
}

export interface ConditionalQuery<T> extends Query<T> {
	or(): ConditionalExpression<T>;
	and(): ConditionalExpression<T>;
	not(): ConditionalExpression<T>;
	nor(): ConditionalExpression<T>;
}

export interface GroupKeyOptions<T, U extends FieldValueObject> {
	key: FieldValueObject;
	reduce: (current: T, result: U) => void;
	initial: U;
	cond?: QueryExpression<T>;
	finialize?: (result: U) => never;
}

export interface GroupKeyFunctionOptions<T, U extends FieldValueObject> {
	keyf: (doc: T) => U;
	reduce: (current: T, result: U) => void;
	initial: U;
	cond?: QueryExpression<T>;
	finialize?: (result: U) => never;
}

export interface Query<T> {

	aggregate(): AggregationPipeline<T>;
	aggregate<U>(pipeline: AggregationOperator[], options?: any): Query<U>;

	count(options?: CountOptions): Promise<number>;

	find(): ConditionalExpression<T>;

	// distinct(field: string): Observable<FieldValue>;

	// group<U extends FieldValueObject>(options: GroupKeyOptions<T, U> | GroupKeyFunctionOptions<T, U>): Query<U>;

	// mapReduce<U extends FieldValueObject>(map: Function, reduce: Function, options?: any): Query<U>;

	// observe(): Observable<T>;

	// text(search: string, language?: string, caseSensitive?: boolean, diacriticSensitive?: boolean): this;

	// then<U>(onFulfilled?: (value?: T[]) => U | Thenable<U>, onRejected?: (error?: any) => U | Thenable<U>): Query<U>;
	// then<U>(onFulfilled?: (value?: T[]) => U | Thenable<U>, onRejected?: (error?: any) => void): Query<U>;

	// where(condition: ((this: T) => boolean) | string): this;
}
