import Base from './_base';
import View from './_view';

export default class Cube {

	constructor(config) {
		
		let options = {
			section: config.section,
			slide: config.slide,
			prev: config.prev,
			next: config.next,
			attributes: {
				state: 'data-state',
				direction: 'data-direction'
			},
			states: {
				prev: 'prev',
				next: 'next',
				active: 'active'
			}
		};

		let base = new Base(options);
		let view = new View(base);

	}

}
