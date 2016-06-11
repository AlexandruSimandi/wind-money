$(document).ready(function(){
	var cash = 100;
	var stock_count = 0;


	var stock_unit = 5;
	var column = ['stock value', stock_unit];

	var chart = c3.generate({
		data: {
			columns: [
				column
			]
		}
	});

	var interval;

	$('#btn-buy').on('click', function(){
		if(cash > stock_unit){
			cash -= stock_unit;
			stock_count++;
			$('#cash').html('Cash: ' + cash);
			$('#stock-count').html('Personal stock count: ' + stock_count);
		}
	});

	$('#btn-sell').on('click', function(){
		if(stock_count > 0){
			cash += stock_unit;
			stock_count--;
			$('#cash').html('Cash: ' + cash);
			$('#stock-count').html('Personal stock count: ' + stock_count);
		}
	});

	$('#btn-start').on('click', function(){
		clearInterval(interval);
		interval = setInterval(function(){
			if(column.length > 20){
				column.splice(1, 1);
			}
			var seed = Math.random() / 10 - 0.05;
			stock_unit *= seed + 1;
			$('#stock-unit').html('Stock unit value: ' + stock_unit);
			column.push(stock_unit);
			chart.load({
				columns: [
					column
				]
			});
		}, 1500);
	});
});
