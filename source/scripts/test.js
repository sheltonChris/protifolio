document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        getName();
    })
})

function getName() {

    const inputName = document.getElementById('name');
    const emails = document.getElementById('email');
    const tels = document.getElementById('tel');
    const discricao = document.getElementById('msg');

    const dados = {
        nome: inputName.value,
        email: emails.value,
        telefone: tels.value,
        disc: discricao.value
    };

    fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(res => res.json())
        .then(data => {
            alert(data.mensagem);
        })
        .catch(error => {
            console.error('Erro:', error);
        });

}
