document.addEventListener('DOMContentLoaded', function () {
    const secoes = document.querySelectorAll(".section");
    const linksNavegacao = document.querySelectorAll(".nav-bar__list__item");
    const navBar = document.querySelector(".nav-bar");

    // Ativa o link da navbar com base no ID da seção visível
    function ativarLink(id) {
        linksNavegacao.forEach(item => {
            item.classList.remove("nav-bar__list__item--is-active");
        });

        const seletor = `.nav-bar__link[href="#${CSS.escape(id)}"]`;
        const linkAtivo = document.querySelector(seletor);

        if (linkAtivo) {
            const itemPai = linkAtivo.closest(".nav-bar__list__item");
            if (itemPai) {
                itemPai.classList.add("nav-bar__list__item--is-active");
            }

            linkAtivo.setAttribute('aria-current', 'location');
        }
    }

    // Observa a visibilidade das seções
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const id = entrada.target.getAttribute('id');
                ativarLink(id);
            }
        });
    }, {
        threshold: 0.6,
        rootMargin: '0px 0px -10% 0px'
    });

    secoes.forEach(secao => {
        observador.observe(secao);
    });

    // Ativa a seção visível logo ao carregar
    const secaoInicial = Array.from(secoes).find(secao => {
        const box = secao.getBoundingClientRect();
        return box.top >= 0 && box.top < window.innerHeight * 0.6;
    });

    if (secaoInicial) {
        ativarLink(secaoInicial.getAttribute('id'));
    }

    // ROLAGEM SUAVE COM OFFSET MANUAL
    navBar.addEventListener('click', function (e) {
        const link = e.target.closest('.nav-bar__link');
        if (!link) return;

        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const id = href.slice(1);
            const destino = document.getElementById(id);

            if (destino) {
                const alturaNavbar = navBar.offsetHeight || 100;
                const y = destino.getBoundingClientRect().top + window.pageYOffset - alturaNavbar;

                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });

                // Foco acessível
                setTimeout(() => {
                    destino.setAttribute('tabindex', '-1');
                    destino.focus();
                }, 1000);
            }
        }
    });
});
