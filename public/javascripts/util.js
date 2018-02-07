function flashMessage(element, message, duration) {
    element.html(message);
    element.removeClass('hide');
    setTimeout(() => {
        element.html('');
        element.addClass('hide');
    }, duration);
}
