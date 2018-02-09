/*global flashMessage*/

const host = 'http://localhost:3000';
let pagePosts = [];

$(document).ready(function () {
    $('#postSection').hide();
    $('#loginSection').hide();

    const token = window.localStorage.getItem('authToken');
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
        url: host + '/posts',
        cache: false,
        headers: {
            'x-access-token': token
        }
    }).done(function (response) {
        pagePosts = JSON.parse(response).posts ? JSON.parse(response).posts : [];
        populatePosts(pagePosts);
    }).fail(function (err) {
        console.error(err);
    });
});



function populatePosts(posts) {
    const postContainer = $('.container .row');
    postContainer.empty();

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        const postElement = $('<div>', { class: 'col-md-4' });
        const head = $('<h2><a href=/u/' + post.username + '>' + post.username + '</a> say</h2>');
        const time = $('<p><small>' + post.time + '</small></p>');
        const content = $('<p>' + post.content + '</p>');
        postElement.prepend(head, time, content);
        postContainer.prepend(postElement);
    }

    postContainer.find('a').click(function (event) {
        const target = event.target;
        console.log(target + ' clicked');
        if (target.href && event.button == 0 && target.origin == window.location.origin) {
            if (target.pathname !== window.location.pathname) {
                history.pushState(null, '', target.pathname);

                const username = target.innerHTML;
                filterPosts(username);
            }
            event.preventDefault();
        }
    });

    if (postContainer.html() === '') {
        postContainer.prepend('<p>No post found</p>');
    }
}

function filterPosts(username) {
    populatePosts(pagePosts.filter(function (post) {
        return post.username === username;
    }));
}

window.onpopstate = function (event) {
    populatePosts(pagePosts);
    event.preventDefault();
};