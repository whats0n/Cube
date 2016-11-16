export default class View {

	constructor(base) {
		this.base = base;
		this.animationClass = 'is-animation';

		this.init();
	}

	init() {
		this.setStates(this.base.options.currentNumber);
		this.changeStatesOnClick();
	}

	changeStatesOnClick() {
		document.addEventListener('click', (e) => {
			if (e.target.closest(this.base.navigation.prev)) this.showActiveSlide(this.base.options.states.prev);
			if (e.target.closest(this.base.navigation.next)) this.showActiveSlide(this.base.options.states.next);
		}, false);
	}

	showActiveSlide(direction) {

		if (this.rotatingEnding === false) return;
		this.rotatingEnding = false;

		switch(direction) {
			case this.base.options.states.prev:
				this.base.options.currentNumber--;
				let less = this.base.options.currentNumber < this.base.options.first;
				if (less) {
					this.base.slide
						.first()
						.before(this.base.slide
							.last()
							.attr(this.base.options.attributes.state, this.base.options.states.prev));
					this.base.updateSlides();
					this.base.options.currentNumber = this.base.options.first;
				}
				break;
			case this.base.options.states.next:
				this.base.options.currentNumber++;
				let more = this.base.options.currentNumber > this.base.options.last;
				if (more) {
					this.base.slide
						.last()
						.after(this.base.slide
							.first()
							.attr(this.base.options.attributes.state, this.base.options.states.next));
					this.base.updateSlides();
					this.base.options.currentNumber = this.base.options.last;
				}
				break;
		}

		////////////////////////////////////////////////////
		let index = this.base.options.currentNumber;
		setTimeout(() => {
			this.setActiveDirection(direction);
			this.setAnimationClass();
			this.setStates(index);
		}, 50);

		this.animationEnding()
			.then(() => {
				console.log('ending');
				this.removeAnimationClass();
				this.clearDirection();
				this.rotatingEnding = true;
			});
	}

	setActiveDirection(direction) {
		this.base.slide.attr(this.base.options.attributes.direction, direction);
	}

	clearDirection() {
		this.base.slide.removeAttr(this.base.options.attributes.direction);
	}

	setAnimationClass() {
		this.base.slide.addClass(this.animationClass);
	}

	removeAnimationClass() {
		this.base.slide.removeClass(this.animationClass);
	}

	animationEnding() {
		return new Promise((resolve, reject) => {
			this.base.slide.on('transitionend', (e) => {
				if ($(e.target).is(this.base.slide)) {
					resolve();
				}
			});
		});
	}

	setStates(number) {
		let attr = this.base.options.attributes.state;
		let prev = this.base.options.states.prev;
		let next = this.base.options.states.next;
		let active = this.base.options.states.active;

		this.base.slide.each(function(i, el) {
			if (i < number) {
				$(this).attr(attr, prev);
			} else if (i > number) {
				$(this).attr(attr, next);
			} else if (i === number) {
				$(this).attr(attr, active);
			}
		});
	}
}