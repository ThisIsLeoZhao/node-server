$(document).ready(function () {
    const loginForm = $('#loginForm');
    const registerForm = $('#registerForm');

    if (window.location.pathname === '/login') {
        loginForm.show();
        registerForm.hide();
    } else if (window.location.pathname === '/register') {
        loginForm.hide();
        registerForm.show();
    }

    loginForm.submit(function (event) {
        const username = loginForm("input[name='username']").val();
        const password = loginForm("input[name='password']").val();

        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/login',
            data: { username: username, password: password },
            cache: false
        }).done(function (response) {
            const responseJson = JSON.parse(response);
            if (responseJson.auth) {
                flashMessage($('#successNotification'), responseJson.message, 2000);
                window.localStorage.setItem('authToken', responseJson.token);
                window.location.replace('http://localhost:3000/index.html');
            } else {
                flashMessage($('#errorNotification'), responseJson.message ? responseJson.message : 'Login error', 2000);
            }
        }).fail(function (err) {
            console.error(err);
        });

        event.preventDefault();
    });

    registerForm.submit(function (event) {
        event.preventDefault();

        const username = registerForm.find("input[name='username']").val();
        const password = registerForm.find("input[name='password']").val();
        const repeatPassword = registerForm.find("input[name='repeat-password']").val();

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