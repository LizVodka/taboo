$(function() {
    let words = [];
    let n;
    let was = [];

    $.get('taboo-cards.csv', function(data) {
        words = data.split('\r\n');
        n = words.length
        new_card();
        timer();
    })
    function new_card() {
        do {
            x = Math.floor((Math.random() * n));
            valid = jQuery.inArray(x, was) == -1;
        } while (valid == false);
        card = words[x].split(';');
        output();
        add_to_was();
    }

    function output() {
        $('h2').html(card[1]);
        txt = '';
        for (let index = 2; index <= 6; index++) {
            txt += '<tr><td>'+card[index]+'</td></tr>';
        };
        $('tbody').html(txt);
    }

    function add_to_was() {
        was.push(x);
    }
    function timer(){
        $('#timer').on("click", function (e) {
            var i = 120;
            myInterval = setInterval(function() {
                $('#timer').html(i);
                if(i == 5) {
                    $('#timer').css('background-color', 'red');
                }
                i--;
                if(i == -1) {
                    clearInterval(myInterval);
                    $('#timer').off('click');
                }
            }, 1000)
    
        });
    }

    $('#next').click(function() {
        $('#timer').off('click');
        clearInterval(myInterval);
        new_card();
        $('#timer').html('Start');
        timer();
        $('#timer').css('background-color', 'yellowgreen');
    })
})