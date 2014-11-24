$(function() {
    $.get('/partials/modal.html').then(function(modal) {
        $.get('/partials/email.html').then(function(email) {
            $.get('/partials/password.html').then(function(password) {
                $.get('/partials/login.html').then(function(login) {
                    var form = $(login);
                    form.find('#items').append(email).append(password);
                    $('#login-placeholder').append(form);
                    $('body').append(modal);
                });
            });
        });
    });

    $('#loginform').on('submit', function(event) {
        event.preventDefault();
        var form = event.target;

        var errorField = $('#error', form);
        errorField.empty();

        $.post('/login',  $(form).serialize()).then(function(data) {

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