$(document).ready(function () {
    $('#registerForm').submit(function (event) {
        event.preventDefault();

        const username = $("input[name='username']").val();
        const password = $("input[name='password']").val();
        const repeatPassword = $("input[name='repeat-password']").val();

        if (password != repeatPassword) {
            flashMessage($('#errorNotification'), 'Password is different with the repeat password', 2000);
            return;
        } 
        
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/register',
            data: { username: username, password: password },
            cache: false
        }).done(function (response) {
            const responseJson = JSON.parse(response);
            if (responseJson.auth) {
                flashMessage($('#successNotification'), responseJson.message, 2000);
                window.localStorage.setItem('authToken', responseJson.token);
                window.location.replace('http://localhost:3000/index.html');
            } else {
                flashMessage($('#errorNotification'), responseJson.message ? responseJson.message : 'Register error', 2000);
            }
        }).fail(function (err) {
            console.error(err);
        });
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
