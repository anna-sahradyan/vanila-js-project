class SpecialHeader extends HTMLElement {
    connectedCallback() {
        fetch(`/html/header.html`).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.text();
        }).then(data => {
            this.innerHTML = data;
        }).catch(err => {
            console.error('Error loading header:', err)
        })
    }

}

class SpecialFooter extends HTMLElement {
    connectedCallback() {
        fetch(`/html/footer.html`).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.text();
        }).then(data => {
            this.innerHTML = data
        }).catch(err => {
            console.error('Error loading header:', err)
        })
    }
}

customElements.define('special-header', SpecialHeader);
customElements.define('special-footer', SpecialFooter);
/*main part routing*/

document.addEventListener('DOMContentLoaded', () => {
    // Обработка кликов на ссылки
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const href = link.getAttribute('href');
            loadPage(href);
        });
    });

    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.querySelector('#main-page').innerHTML = html;
            })
            .catch(error => console.error('Error loading page:', error));
    }
});
