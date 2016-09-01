import compose, { ComposeFactory } from 'dojo-compose/compose';
import { Query, AggregationPipeline } from './interfaces';
import WeakMap from 'dojo-shim/WeakMap';

export interface AggregationPipelineOptions<T> {
	query: Query<T>;
}

export interface AggregationPipelineFactory extends ComposeFactory<AggregationPipeline<any>, AggregationPipelineOptions<any>> {
	<T>(options?: AggregationPipelineOptions<T>): AggregationPipeline<T>;
}

const queryMap = new WeakMap<AggregationPipeline<any>, Query<any>>();

const createAggregationPipeline: AggregationPipelineFactory = compose({
	exec(this: AggregationPipeline<any>) {
		return queryMap.get(this);
	},

	redact(this: AggregationPipeline<any>) {
		return this;
	}
}, (instance: AggregationPipeline<any>, options?: AggregationPipelineOptions<any>) => {
	if (options) {
		const { query } = options;
		queryMap.set(instance, query);
	}
	else {
		throw new TypeError('Missing initilization options');
	}
});

export default createAggregationPipeline;
