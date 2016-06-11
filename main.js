$(document).ready(function(){
	var cash = 100;
	var stock_count = 0;

	var today = new Date();
	var days = [today.toJSON().slice(0,10)];


	var stock_unit = 5;
	var column = ['stock value', stock_unit];

	var chart = c3.generate({
		data: {
			columns: [
				column
			]
		},
		axis: {
			x: {
				type: 'category',
				categories: days
			}
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
				days.splice(1, 1);
			}
			var seed = Math.random() / 10 - 0.05;
			stock_unit *= seed + 1;
			stock_unit = Math.round(stock_unit * 10000) / 10000
			$('#stock-unit').html('Stock unit value: ' + stock_unit);
			today.setDate(today.getDate() + 1)
			days.push(today.toJSON().slice(0,10));
			column.push(stock_unit);
			chart.load({
				columns: [
					column
				]
			});
		}, 1500);
	});
});
