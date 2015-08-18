$(document).ready(function () {
	var grid = $(".container").gridster({
		widget_selector: ".box",
		widget_margins: [10, 10],
		widget_base_dimensions: [100, 60],
	}).data('gridster');

	var jsPlumbInstance = jsPlumb.getInstance();
	jsPlumbInstance.importDefaults({
            Anchors: ["Right", "Left"],
            Connector: ["Flowchart", { stub: 10, midpoint: 0.5, cornerRadius: 30 }],
            EndpointStyle: { fillStyle: "gray", radius: 0.1 },
            PaintStyle: { strokeStyle: "gray", lineWidth: 4 },
            HoverPaintStyle: { strokeStyle: "rgb(255,159,64)", lineWidth: 4 },
            Overlays: [["Arrow", { location: 1, width: 12, length: 10 }]]
        });

	function addBox () {
		var container = $(".container");
		container.off("click.newnode");		
		container.css("cursor", "crosshair");
		$('.box').css("cursor", "crosshair");
		var relativeXPosition, relativeYPosition;
        container.mousemove(function (e) {
            var parentOffset = container.parent().offset();
            relativeXPosition = (e.pageX + container.scrollLeft() - parentOffset.left);
            relativeYPosition = (e.pageY + container.scrollTop() - parentOffset.top);
        });
        container.on("click.newnode", function (event) {
            var pos = getCoords(relativeXPosition, relativeYPosition);
            var box = document.createElement('div');
			box.className = "box";
            grid.add_widget(box, 1, 1, pos.col, pos.row);
            $(box).css("cursor", "crosshair");
        });
	};

	function cancelAddBox () {
		var container = $(".container");
		container.css("cursor", "default");
		$('.box').css("cursor", "default");
		container.off("click.newnode");
		container.off("click.connector");
	};

	function getCoords (posX, posY) {
	    var col = Math.floor(posX / grid.min_widget_width) + 1,
			row = Math.floor(Math.abs(posY - 40) / grid.min_widget_height) + 1;
	    var pos = {
	        col: col,
	        row: row
	    };
	    return pos;
	};

	function addConnector () {		
		var container = $(".container");
		container.off("click.connector");
		container.css("cursor", "crosshair");
        $('.box').css("cursor", "crosshair");
        var target,
        	source,
        	numClick = 0;
        $('.box').on('click.connector', function (event) {
			numClick += 1;
			if (numClick == 1) {
				source = $(this);
			} else if (numClick == 2) {
				target = $(this);
				var c = jsPlumbInstance.connect({
            		source: source,
            		target: target,
            		container: container
        		});
        		numClick = 0;
			}

        });
	};

	$('#addBoxBtn').on('click', function () {
		addBox();
	});

	$('#addConnBtn').on('click', function () {
		addConnector();
	});

	$('#cancelBoxBtn').on('click', function () {
		cancelAddBox();
	});
});