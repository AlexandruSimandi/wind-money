$(document).ready(function(){
	var money = 5;
	var column = ['stock value', money];

	var chart = c3.generate({
    data: {
        columns: [
            column
        ]
    }
	});

	var interval;

	$('#btn-start').on('click', function(){
		clearInterval(interval);
		interval = setInterval(function(){
			var seed = Math.random() / 10 - 0.05;
			money *= seed + 1;
			//$('#money-value').html(money);
			column.push(money);
			chart.load({
				columns: [
					column
				]
			});
		}, 500);
	});
});
