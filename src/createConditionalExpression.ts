import compose, { ComposeFactory } from 'dojo-compose/compose';
import { ConditionalExpression, ConditionalQuery, FieldValue, Query } from './interfaces';
import WeakMap from 'dojo-shim/WeakMap';

export interface ConditionalExpressionOptions<T> {
	query: Query<T>;
}

export interface ConditionalExpressionFactory extends ComposeFactory<ConditionalExpression<any>, ConditionalExpressionOptions<any>> {
	<T>(options?: ConditionalExpressionOptions<T>): ConditionalExpression<T>;
}

function decorateQuery<T>(query: Query<T>): ConditionalQuery<T> {
	/* TODO: Yeah, this will be bad at runtime */
	return query as ConditionalQuery<T>;
}

/*
	equals(field: string, value: FieldValue): ConditionalQuery<T>;
	greaterThan(field: string, value: FieldValue): ConditionalQuery<T>;
	greaterThanOrEquals(field: string, value: FieldValue): ConditionalQuery<T>;
	lessThan(field: string, value: FieldValue): ConditionalQuery<T>;
	lessThanOrEquals(field: string, value: FieldValue): ConditionalQuery<T>;
	notEquals(field: string, value: FieldValue): ConditionalQuery<T>;
	in(field: string, values: FieldValue[]): ConditionalQuery<T>;
	notIn(field: string, values: FieldValue[]): ConditionalQuery<T>;
	exists(field: string, exists?: boolean): ConditionalQuery<T>;
	type(field: string, type: BSONType): ConditionalQuery<T>;
	modulus(field: string, value: [ number, number ]): ConditionalQuery<T>;
	regex(field: string, value: RegExp | string, options?: string): ConditionalQuery<T>;
	all(field: string, values: FieldValue[]): ConditionalQuery<T>;
	elemMatch(field: string): ConditionalExpression<T>;
	size(field: string, value: number): ConditionalQuery<T>;
	bitsAllSet(field: string, value: number | number[]): ConditionalQuery<T>;
	bitsAnySet(field: string, value: number | number[]): ConditionalQuery<T>;
	bitsAllClear(field: string, value: number | number[]): ConditionalQuery<T>;
	bitsAnyClear(field: string, value: number | number[]): ConditionalQuery<T>;
*/

const queryMap = new WeakMap<ConditionalExpression<any>, Query<any>>();

const createConditionalExpression: ConditionalExpressionFactory = compose({
	equals(this: ConditionalExpression<any>, field: string, value: FieldValue) {
		return decorateQuery(queryMap.get(this));
	}
}, (instance: ConditionalExpression<any>, options?: ConditionalExpressionOptions<any>) => {
	if (options) {
		const { query } = options;
		queryMap.set(instance, query);
	}
	else {
		throw new Error('Missing factory options');
	}
});

export default createConditionalExpression;
