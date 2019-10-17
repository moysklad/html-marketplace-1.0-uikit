(function () {
    let buttons = document.querySelectorAll('.js-popup-open');
    let popups = document.querySelectorAll('.js-popup-window');

    Array.prototype.forEach.call(buttons, function (button) {
        let name = button.getAttribute('data-name');

        button.addEventListener('click', function () {
            var popup = document.querySelector('.js-popup-window[data-name="' + name + '"]');
            popup.classList.remove('b-hide');
        });
    });

    Array.prototype.forEach.call(popups, function (popup) {
        let buttons = popup.querySelectorAll('.js-popup-close');

            Array.prototype.forEach.call(buttons, function (button) {
                button.addEventListener('click', function () {
                    popup.classList.add('b-hide');
                });
            });
        }
    )
    ;
})();