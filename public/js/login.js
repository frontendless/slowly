$(function() {

    $.get('/partials/modal.html').then(function( modal ) {
        $('body').append(modal);
    })
    var interval;
    function startLoadingIndicator(target) {
         $('#loadingmodal').modal({backdrop: true});
         var start = new Date().getTime();
         var timer = 4000;
         interval = setInterval(function() {
            var current = new Date().getTime() - start;
            $('.progress-bar').css('width',
                (Math.round((current / timer) * 100 ) ) + '%' );
        }, 40);
    }
    function stopLoadingIndicator(target) {
         $('#loadingmodal').modal('hide');
         clearInterval(interval);
    }

    $('#loginform').on('submit', function(event) {
        event.preventDefault();
        var form = event.target;

        var errorField = $('#error', form);
        errorField.empty();

       startLoadingIndicator(form);

        $.post('/login',  $(form).serialize()).then(function(data) {

            stopLoadingIndicator(form);

            if(data.error) {
                var html = $('<div class="alert alert-danger" role="alert"></div>').text(data.error);
                errorField.append(html);
            }

            if(data.redirect) {
                location.href = data.redirect;
            }

        });
    });
});