document.addEventListener('DOMContentLoaded', () => {
    const formularioTarefa = document.getElementById('formulario-tarefa');
    const listaTarefas = document.getElementById('lista-tarefas');
    const membroSelect = document.getElementById('membro');


    const coresMembros = [
        'verde', 
        'azul', 
        'chocolate', 
        'orange', 
        'purple', 
        'red'
    ];
    let indexCor = 0;


    const primeiroMembro = 'Membro 1';
    const corPrimeiroMembro = coresMembros[indexCor++];
    adicionarMembroAoSelect(primeiroMembro, corPrimeiroMembro);


    const adicionarMembro = confirm('Deseja adicionar um novo membro?');

    if (adicionarMembro) {
        adicionarNovoMembro();
    }

    formularioTarefa.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const membro = membroSelect.value;
        const tarefaTexto = document.getElementById('tarefa').value;
        const dataHora = new Date().toLocaleString();


        const tarefasExistentes = Array.from(listaTarefas.children).map(li => li.querySelector('.descricao').textContent);
        if (tarefasExistentes.includes(tarefaTexto)) {
            alert('Esta tarefa já existe!');
            return;
        }

        const itemLista = document.createElement('li');
        itemLista.className = `tarefa ${membro}`;
        
        itemLista.innerHTML = `
            <input type="checkbox" class="checkbox-tarefa" aria-label="Marcar tarefa como concluída">
            <span class="descricao">${tarefaTexto} (Adicionada em: ${dataHora}) - ${membro}</span>
            <button class="editar">Editar</button>
            <button class="remover">Excluir</button>
        `;
        

        itemLista.style.borderLeft = `5px solid ${getCorMembro(membro)}`;

        listaTarefas.appendChild(itemLista);
        fadeIn(itemLista); 


        document.getElementById('tarefa').value = '';


        itemLista.querySelector('.remover').addEventListener('click', () => {
            fadeOut(itemLista, () => {
                listaTarefas.removeChild(itemLista);
            });
        });


        itemLista.querySelector('.editar').addEventListener('click', () => {
            const novaTarefa = prompt('Editar tarefa:', tarefaTexto);
            if (novaTarefa) {
                itemLista.querySelector('.descricao').textContent = `${novaTarefa} (Adicionada em: ${dataHora}) - ${membro}`;
            }
        });


        itemLista.querySelector('.checkbox-tarefa').addEventListener('change', (evento) => {
            if (evento.target.checked) {
                itemLista.classList.add('concluida');
                itemLista.style.opacity = '0.5'; 
                itemLista.querySelector('.descricao').style.textDecoration = 'line-through'; 
            } else {
                itemLista.classList.remove('concluida');
                itemLista.style.opacity = '1'; 
                itemLista.querySelector('.descricao').style.textDecoration = 'none'; 
            }
        });
    });

    document.getElementById('adicionar-membro').addEventListener('click', adicionarNovoMembro);

    function adicionarNovoMembro() {
        const nomeMembro = prompt('Digite o nome do novo membro:');
        if (nomeMembro) {
            const corMembro = coresMembros[indexCor % coresMembros.length]; 
            adicionarMembroAoSelect(nomeMembro, corMembro);
            indexCor++;
        }
    }

    function adicionarMembroAoSelect(nome, cor) {
        const option = document.createElement('option');
        option.value = nome;
        option.textContent = nome;
        option.style.color = cor; 
        membroSelect.appendChild(option);
        membroSelect.value = nome; 
    }

    function getCorMembro(nome) {
        if (nome === 'Membro 1') {
            return coresMembros[0]; 
        }
        const index = indexCor - 1;
        return coresMembros[index % coresMembros.length] || 'gray';
    }

    function fadeIn(element) {
        element.style.opacity = 0;
        let last = +new Date();
        const tick = () => {
            element.style.opacity = +element.style.opacity + (new Date() - last) / 400;
            last = +new Date();
            if (+element.style.opacity < 1) {
                requestAnimationFrame(tick);
            }
        };
        tick();
    }

    function fadeOut(element, callback) {
        element.style.opacity = 1;
        let last = +new Date();
        const tick = () => {
            element.style.opacity = +element.style.opacity - (new Date() - last) / 400;
            last = +new Date();
            if (+element.style.opacity > 0) {
                requestAnimationFrame(tick);
            } else {
                callback();
            }
        };
        tick();
    }
});
