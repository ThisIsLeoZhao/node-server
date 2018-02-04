$(document).ready(function () {
    $('form').submit(function (event) {
        const username = $("input[name='username']").val();
        const password = $("input[name='password']").val();

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: { username: username, password: password },
            cache: false
        }).done(function (response) {
            const responseJson = JSON.parse(response);
            if (responseJson.login) {
                flashMessage($('#successNotification'), 'Login Succeed', 2000);
                window.localStorage.setItem('loginToken', responseJson.token);
                window.location.replace('http://localhost:3000/index.html');
            } else {
                flashMessage($('#errorNotification'), responseJson.message ? responseJson.message : 'Login error', 2000);
            }
        }).fail(function (err) {
            console.error(err);
        });

        event.preventDefault();
    });
});

function flashMessage(element, message, duration) {
    element.html(message);
    element.removeClass('hide');
    setTimeout(() => {
        element.html('');
        element.addClass('hide');
    }, duration);
}