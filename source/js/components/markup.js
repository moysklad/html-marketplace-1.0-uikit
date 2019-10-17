(function () {
    let examples = document.querySelectorAll('.js-example');

    Array.prototype.forEach.call(examples, function (example) {
        let markup = example.querySelector('.js-example-markup').innerHTML;
        let text = example.querySelector('.js-example-text');

        text.insertAdjacentHTML('beforeend', '<pre><code class="xml"></code></pre>');
        text.querySelector('.xml').insertAdjacentText('beforeend', markup);
    });

    hljs.initHighlightingOnLoad();
})();
