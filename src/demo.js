$(document).ready(function () {
	var grid = $(".container").gridster({
		widget_selector: ".box",
		widget_margins: [10, 10],
		widget_base_dimensions: [100, 60],
	}).data('gridster');
});