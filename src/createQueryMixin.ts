import compose, { ComposeFactory } from 'dojo-compose/compose';
import Promise from 'dojo-shim/Promise';
import { Query, CountOptions, AggregationPipeline } from './interfaces';
import createAggregationPipeline from './createAggregationPipeline';
import createConditionalExpression from './createConditionalExpression';

/*
	aggregate(): AggregationPipeline<T>;
	aggregate<U>(pipeline: AggregationOperator[], options?: any): QueryMixin<U>;

	count(options?: CountOptions): Promise<number>;

	find(): ConditionalExpression<T>;

	distinct(field: string): Observable<FieldValue>;

	group<U extends FieldValueObject>(options: GroupKeyOptions<T, U> | GroupKeyFunctionOptions<T, U>): QueryMixin<U>;

	mapReduce<U extends FieldValueObject>(map: Function, reduce: Function, options?: any): QueryMixin<U>;

	observe(): Observable<T>;

	text(search: string, language?: string, caseSensitive?: boolean, diacriticSensitive?: boolean): this;

	then<U>(onFulfilled?: (value?: T[]) => U | Thenable<U>, onRejected?: (error?: any) => U | Thenable<U>): QueryMixin<U>;
	then<U>(onFulfilled?: (value?: T[]) => U | Thenable<U>, onRejected?: (error?: any) => void): QueryMixin<U>;

	where(condition: ((this: T) => boolean) | string): this;
 */

interface QueryMixinOptions {}

interface QueryMixinFactory extends ComposeFactory<Query<any>, QueryMixinOptions> {
	<T>(options?: QueryMixinOptions): Query<T>;
}

/**
 * Create an instance of a query mixin
 */
const createQueryMixin = compose({
	aggregate(this: Query<any>): AggregationPipeline<any> {
		return createAggregationPipeline({ query: this });
	},
	count(options?: CountOptions): Promise<number> {
		return Promise.resolve(0);
	},
	find(this: Query<any>) {
		return createConditionalExpression({ query: this });
	}
}) as QueryMixinFactory;

export default createQueryMixin;
