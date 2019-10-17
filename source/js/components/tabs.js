(function () {
    let tabs = document.querySelectorAll('.js-tabs');

    Array.prototype.forEach.call(tabs, function (tab) {
        let buttons = tab.querySelectorAll('.js-tabs-button');
        let items = tab.querySelectorAll('.js-tabs-item');

        Array.prototype.forEach.call(buttons, function (button) {
            button.addEventListener('click', function (e) {
                let el = e.currentTarget;

                Array.prototype.forEach.call(buttons, function (button, i) {
                    if (button !== el) {
                        button.classList.remove('b-active');
                        if (items[i]) {
                            items[i].classList.remove('b-active');
                        }
                    } else {
                        button.classList.add('b-active');
                        if (items[i]) {
                            items[i].classList.add('b-active');
                        }
                    }
                });
            });
        });
    });
})();