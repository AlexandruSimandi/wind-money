var gameModule = (function(){
    var _cash = 100;
    var _stock_count = 0;

    var _today = new Date();
    var _days = [_today.toJSON().slice(0,10)];

    var _stock_unit = 5;
    var _column = ['stock value', _stock_unit];

    var _interval;

    var _roundSpeed = 1500;

    return {
        initialize: function(){
            var chart = c3.generate({
                data: {
                    columns: [
                        _column
                    ]
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: _days
                    }
                },
                grid: {
                    y: {
                        lines: [
                            {
                                value: 5,
                                text: 'Initial'
                            }
                    ]
                    }
                }
            });

            $('#btn-buy').on('click', function(){
                if(_cash > _stock_unit){
                    _cash -= _stock_unit;
                    _stock_count++;
                    $('#cash').html('Cash: ' + _cash);
                    $('#stock-count').html('Personal stock count: ' + _stock_count);
                }
            });

            $('#btn-sell').on('click', function(){
                if(_stock_count > 0){
                    _cash += _stock_unit;
                    _stock_count--;
                    $('#cash').html('Cash: ' + _cash);
                    $('#stock-count').html('Personal stock count: ' + _stock_count);
                }
            });

            $('#btn-start').on('click', function(){
                $(this).hide();
                clearInterval(_interval);
                _interval = setInterval(function(){
                    if(_column.length > 20){
                        _column.splice(1, 1);
                        _days.splice(1, 1);
                    }
                    var seed = Math.random() / 10 - 0.05;
                    _stock_unit *= seed + 1;
                    _stock_unit = Math.round(_stock_unit * 10000) / 10000
                    $('#stock-unit').html('Stock unit value: ' + _stock_unit);
                    _today.setDate(_today.getDate() + 1)
                    _days.push(_today.toJSON().slice(0,10));
                    _column.push(_stock_unit);
                    chart.load({
                        columns: [
                            _column
                        ]
                    });
                }, _roundSpeed);
            });
        }
    };
})();

$(document).ready(function(){
    gameModule.initialize();
});
