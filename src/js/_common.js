import Cube from './cube/_cube';

$(document).ready(function() {

	new Cube({
		section: '.js-cube',
		slide: '.js-cube-slide',
		prev: '.js-prev',
		next: '.js-next'
	});

});