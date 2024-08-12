class SpecialHeader extends HTMLElement {
    connectedCallback() {
        fetch(`/html/header.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                this.innerHTML = data;
            })
            .catch(err => {
                console.error('Error loading header:', err);
            });
    }
}

class SpecialFooter extends HTMLElement {
    connectedCallback() {
        fetch(`/html/footer.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                this.innerHTML = data;
                // Check if the footer needs updating
                if (window.location.pathname.includes('settings.html')) {
                    updateFooterForSettings();
                }
            })
            .catch(err => {
                console.error('Error loading footer:', err);
            });
    }
}

customElements.define('special-header', SpecialHeader);
customElements.define('special-footer', SpecialFooter);

// Handling clicks on links and loading pages
document.addEventListener('DOMContentLoaded', () => {
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
                // Clear the footer before adding new content
                const footer = document.querySelector('special-footer');
                footer.innerHTML = ''; // Ensure the footer is cleared
                if (url.includes('settings.html')) {
                    updateFooterForSettings();
                } else {
                    loadDefaultFooter();
                }
            })
            .catch(error => console.error('Error loading page:', error));
    }

    function loadDefaultFooter() {
        const footer = document.querySelector('special-footer');
        footer.innerHTML = ''; // Clear the footer
        fetch(`/html/footer.html`)
            .then(response => response.text())
            .then(data => {
                footer.innerHTML = data;
            })
            .catch(err => console.error('Error loading default footer:', err));
    }

    function updateFooterForSettings() {
        const footer = document.querySelector('special-footer');
        footer.innerHTML = ''; // Clear the footer

        const wrapperDiv = document.createElement('div');
        wrapperDiv.classList.add('footer-wrapper');

        const btnWrapper = document.createElement('span');
        btnWrapper.classList.add('btn_box');

        const button1 = document.createElement('button');
        button1.classList.add('footer_btn1');
        const img = document.createElement('img');
        img.src = '/images/save.svg';
        img.alt = 'Save Icon';
        button1.appendChild(img);
        button1.appendChild(document.createTextNode('Сохранить'));

        const button2 = document.createElement('button');
        button2.textContent = 'Отменить';
        button2.classList.add('footer_btn2');

        const footerText = document.createElement('span');
        footerText.textContent = 'ProfSostav 1996 - 2021';
        footerText.classList.add('text2_footer');

        wrapperDiv.appendChild(footerText);
        btnWrapper.appendChild(button1);
        btnWrapper.appendChild(button2);
        wrapperDiv.appendChild(btnWrapper);

        footer.appendChild(wrapperDiv);


        const footerDocDiv = document.createElement('div');
        footerDocDiv.classList.add('footer_doc1');
        const docImg = document.createElement('img');
        docImg.src = '/images/footer_file.svg';
        docImg.alt = 'doc';
        docImg.width = 17;
        docImg.height = 19;
        const docLink = document.createElement('a');
        docLink.href = '/';
        docLink.textContent = 'Документация';
        footerDocDiv.appendChild(docImg);
        footerDocDiv.appendChild(docLink);
        wrapperDiv.appendChild(footerDocDiv);
    }

    window.addEventListener('error', (event) => {
        console.error('JavaScript error:', event.message);
    });
});
/*forms*/
document.addEventListener('DOMContentLoaded', function() {
    const formAdd = document.getElementById('myFormAdd');
    const formCreate = document.getElementById('myFormCreate');


    const btnCreate = document.querySelector('.form_btn_add');
    btnCreate.addEventListener('click', function(event) {
        event.preventDefault();
        formAdd.style.display = 'none';
        formCreate.style.display = 'block';
    });
    const btnCancel = document.querySelector('.form_btn_cancel');
    btnCancel.addEventListener('click', function(event) {
        event.preventDefault();
        formCreate.style.display = 'none';
        formAdd.style.display = 'block';
    });

    const btnDelete = document.querySelector('.form_btn_delete');
    btnDelete.addEventListener('click', function(event) {
        event.preventDefault();
        formCreate.style.display = 'none';
        formAdd.style.display = 'block';
    });
});
