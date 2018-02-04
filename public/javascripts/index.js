const host = 'http://localhost:3000/';

$(document).ready(function () {
    $('#postSection').hide();
    $('#loginSection').hide();
    
    const token = window.localStorage.getItem('loginToken');
    if (token) {
        $('#postSection').show();
    } else {
        $('#loginSection').show();
    }

    $('#postSection').off('submit');
    $('#postSection').submit(function (event) {
        const postText = $(this).find('input').val();
        $.ajax({
            method: 'POST',
            url: 'http://localhost:3000/post',
            data: { post: postText },
            headers: {
                'x-access-token': token
            }
        }).done(function (response) {
            const responseJson = JSON.parse(response);
            if (responseJson.error) {
                flashMessage($('#errorNotification'), responseJson.error, 2000);
                window.location.replace('/login');
            } else {
                flashMessage($('#successNotification'), 'Post succeed', 2000);
                window.location.reload();
            }
        }).fail(function (err) {
            console.error(err);
        });

        event.preventDefault();
    });

    $.ajax({
        method: 'GET',
        url: host,
        cache: false,
        headers: {
            'x-access-token': token
        }
    }).done(function (response) {
        populatePosts(JSON.parse(response).posts);
    }).fail(function (err) {
        console.error(err);
    });
});

function populatePosts(posts) {
    const postContainer = $('.container .row');
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postElement = $('<div>', {class: 'col-md-4'});
        const head = $('<h2><a href=/u/' + post.username + '></a> say</h2>');
        const time = $('<p><small>' + post.time + '</small></p>');
        const content = $('<p>' + post.content + '</p>');
        postElement.prepend(head, time, content);
        postContainer.prepend(postElement);
    }

    if (postContainer.html() === '') {
        postContainer.prepend('<p>No post found</p>');
    }
}

function flashMessage(element, message, duration) {
    element.html(message);
    element.removeClass('hide');
    setTimeout(() => {
        element.html('');
        element.addClass('hide');
    }, duration);
}
