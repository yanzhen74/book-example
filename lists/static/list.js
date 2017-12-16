$('input').on('keypress', function(e){
    if (e.keyCode != 13) {
        $('.has-error').hide();
    }
});
