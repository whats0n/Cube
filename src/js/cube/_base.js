export default class Base {

	constructor(config) {

		this.slideName = config.slide;
		//scene
		this.section = $(config.section);
		//sides
		this.slide = this.section.find(this.slideName);
		//navigation
		this.navigation = {
			prev: config.prev,
			next: config.next
		};

		/////////////////////////////////////////////////////
		this.options = {
			amount: this.slide.length,
			currentNumber: 0,
			last: this.slide.length - 1,
			first: 0,
			states: config.states,
			attributes: {
				state: config.attributes.state,
				direction: config.attributes.direction
			}
		};

		/////////////////////////////////////////////////////
		this.init(config);
	}

	init(config) {
		this.setPerspective();
	}

	setPerspective() {
		this.slide.css('perspective', `${this.options.amount*100}vh`)
	}

	updateSlides() {
		this.slide = this.section.find(this.slideName);
	}

}