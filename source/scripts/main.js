document.addEventListener('DOMContentLoaded', function () {
    // Seleciona elementos
    const secoes = document.querySelectorAll(".section");
    const linksNavegacao = document.querySelectorAll(".nav-bar__list__item");
    const navBar = document.querySelector(".nav-bar");

    // Função para ativar o link da navbar correspondente ao ID da seção
    function ativarLink(id) {
        linksNavegacao.forEach(link => {
            link.classList.remove("nav-bar__list__item--is-active");
        });

        const seletor = `.nav-bar__link[href="#${CSS.escape(id)}"]`;
        const linkAtivo = document.querySelector(seletor);

        if (linkAtivo) {
            const itemPai = linkAtivo.closest(".nav-bar__list__item");
            if (itemPai) {
                itemPai.classList.add("nav-bar__list__item--is-active");
            }

            // Acessibilidade
            linkAtivo.setAttribute('aria-current', 'location');
        }
    }

    // Configura observador de interseção
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const id = entrada.target.getAttribute('id');
                ativarLink(id);
            }
        });
    }, {
        threshold: 0.6,
        rootMargin: '0px 0px -25% 0px' // melhora a ativação ao rolar
    });

    // Inicia observação das seções
    secoes.forEach(secao => {
        observador.observe(secao);
    });

    // Corrige destaque inicial ao carregar a página
    const secaoInicial = Array.from(secoes).find(secao => {
        const box = secao.getBoundingClientRect();
        return box.top >= 0 && box.top < window.innerHeight * 0.6;
    });

    if (secaoInicial) {
        ativarLink(secaoInicial.getAttribute('id'));
    }

    // Adiciona rolagem suave nos cliques da navbar
    navBar.addEventListener('click', function (e) {
        if (e.target.classList.contains('nav-bar__link')) {
            const link = e.target;
            const href = link.getAttribute('href');

            if (href.startsWith('#')) {
                e.preventDefault();

                const id = href.substring(1);
                const destino = document.getElementById(id);

                if (destino) {
                    destino.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Foco acessível após rolagem
                    setTimeout(() => {
                        destino.setAttribute('tabindex', '-1');
                        destino.focus();
                    }, 1000);
                }
            }
        }
    });
});
