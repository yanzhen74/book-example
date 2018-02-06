// var initialize = function () {
//     console.log('initialize caled');
//     $('input[name="text"]').on('keypress', function () {
//         console.log('in keypress handler');
//         $('.has-error').hide();
//     });
// };
//
// console.log('list.js loaded');

window.Superlists = {};

window.Superlists.updateItems = function (url) {
    $.get(url).done(function (response) {
        var rows = '';
        for (var i = 0; i < response.length; i++) {
            var item = response[i];
            rows += '\n<tr><td>' + (i + 1) + ': ' + item.text + '</td></tr>';
        }
        $('#id_list_table').html(rows);
    });
};

window.Superlists.initialize = function (url) {
    $('input[name="text"]').on('keypress', function () {
        $('.has-error').hide();
    });

    if (url) {
        $.get(url).done(function (response) {
            var rows = '';
            for (var i = 0; i < response.length; i++) {
                var item = response[i];
                rows += '\n<tr><td>' + (i + 1) + ': ' + item.text + '</td></tr>';
            }
            $('#id_list_table').html(rows);
        });

        var form = $('#id_item_form');
        form.on('submit', function (event) {
            event.preventDefault();
            $.post(url, {
                'text': form.find('input[name="text"]').val(),
                'csrfmiddlewaretoken': form.find('input[name="csrfmiddlewaretoken"]').val(),
            }).done(function () {
                window.Superlists.updateItems(url);
            });

        });
    }
};


