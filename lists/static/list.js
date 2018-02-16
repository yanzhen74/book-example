window.Superlists = {};

window.Superlists.updateItems = function (url) {

    console.log(url)
    $.get(url).done(function (response) {
        var rows = '';
        for (var i = 0; i < response.items.length; i++) {
            var item = response.items[i];
            rows += '\n<tr><td>' + (i + 1) + ': ' + item.text + '</td></tr>';
        }
        $('#id_list_table').html(rows);
    });
};

window.Superlists.initialize = function (params) {
    $('input[name="text"]').on('keypress', function () {
        $('.has-error').hide();
    });

    if (params) {
        window.Superlists.updateItems(params.listApiUrl);

        var form = $('#id_item_form');
        form.on('submit', function (event) {
            console.log(params.itemsApiUrl)
            event.preventDefault();
            $.post(params.itemsApiUrl, {
                'list': params.listId,
                'text': form.find('input[name="text"]').val(),
                'csrfmiddlewaretoken': form.find('input[name="csrfmiddlewaretoken"]').val(),
            }).done(function () {
                $('.has-error').hide();
                window.Superlists.updateItems(params.listApiUrl);
            }).fail(function (xhr) {
                $('.has-error').show();
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    $('.has-error .help-block').text(xhr.responseJSON.error);
                } else {
                    $('.has-error .help-block').text('Error talking to server. Please try again.');
                }
            });
        });
    }
};

