import * as registerSuite from 'intern!object';
import * as assert from 'intern/chai!assert';
import createQueryMixin from 'src/createQueryMixin';

registerSuite({
	basic() {
		const q = createQueryMixin();
		assert(q.count());
	}
});
