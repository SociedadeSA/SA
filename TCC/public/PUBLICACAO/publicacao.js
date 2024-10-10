// Função para abrir o modal de publicação
document.getElementById('publicarBtn').onclick = function() {
    document.getElementById('publicacaoModal').style.display = 'flex';
}

// Função para fechar o modal
document.querySelector('.close').onclick = function() {
    document.getElementById('publicacaoModal').style.display = 'none';
}

// Função para exibir o formulário dinâmico baseado no tipo de publicação
document.querySelectorAll('.option-btn').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        showForm(type);
    });
});

// Função para exibir o formulário correto baseado na escolha do tipo de publicação
function showForm(type) {
    const formContainer = document.getElementById('publicationForm');
    formContainer.innerHTML = ''; // Limpa o formulário anterior

    let formContent = '';

    switch(type) {
        case 'texto':
            formContent = `
                <textarea placeholder="Escreva seu texto aqui..." rows="5" id="postContent"></textarea>
                <button class="btn" onclick="publishPost('texto')">Publicar Texto</button>
            `;
            break;
        case 'enquete':
            formContent = `
                <input type="text" placeholder="Pergunta da enquete" id="postContent">
                <input type="text" placeholder="Opção 1">
                <input type="text" placeholder="Opção 2">
                <button class="btn" onclick="publishPost('enquete')">Publicar Enquete</button>
            `;
            break;
        case 'foto':
            formContent = `
                <input type="file" accept="image/*" id="postContent">
                <button class="btn" onclick="publishPost('foto')">Publicar Foto</button>
            `;
            break;
        case 'video':
            formContent = `
                <input type="file" accept="video/*" id="postContent">
                <button class="btn" onclick="publishPost('video')">Publicar Vídeo</button>
            `;
            break;
        case 'gif':
            formContent = `
                <input type="file" accept="image/gif" id="postContent">
                <button class="btn" onclick="publishPost('gif')">Publicar GIF</button>
            `;
            break;
    }

    formContainer.innerHTML = formContent;
}

// Função para publicar o conteúdo no feed
function publishPost(type) {
    const content = document.getElementById('postContent').value || document.getElementById('postContent').files[0].name;
    const feed = document.querySelector('.feed');
    
    let newPost = document.createElement('div');
    newPost.classList.add('post');

    if (type === 'texto' || type === 'enquete') {
        newPost.innerHTML = `
            <h3>Usuário Anônimo</h3>
            <p>${content}</p>
            <div class="reactions">
                <span class="reaction-btn" data-reaction="👍">👍 0</span>
                <span class="reaction-btn" data-reaction="❤️">❤️ 0</span>
                <span class="reaction-btn" data-reaction="😂">😂 0</span>
            </div>
        `;
    } else {
        let fileType = type === 'foto' ? 'img' : type === 'video' ? 'video' : 'img';
        newPost.innerHTML = `
            <h3>Usuário Anônimo</h3>
            <${fileType} src="${URL.createObjectURL(document.getElementById('postContent').files[0])}" alt="Publicação de ${type}" controls></${fileType}>
            <div class="reactions">
                <span class="reaction-btn" data-reaction="👍">👍 0</span>
                <span class="reaction-btn" data-reaction="❤️">❤️ 0</span>
                <span class="reaction-btn" data-reaction="😂">😂 0</span>
            </div>
        `;
    }

    feed.insertBefore(newPost, feed.firstChild);
    document.getElementById('publicacaoModal').style.display = 'none';

    // Adiciona eventos de clique para as novas reações criadas
    addReactionListeners(newPost);
}

// Função para adicionar e remover reações
function toggleReaction(event) {
    const reactionBtn = event.target;
    let currentCount = parseInt(reactionBtn.textContent.split(' ')[1]);

    // Se a reação já foi clicada, subtrai, senão, adiciona
    if (reactionBtn.classList.contains('reacted')) {
        currentCount--;
        reactionBtn.classList.remove('reacted');
    } else {
        currentCount++;
        reactionBtn.classList.add('reacted');
    }

    // Atualiza o contador da reação
    reactionBtn.textContent = `${reactionBtn.getAttribute('data-reaction')} ${currentCount}`;
}

// Função para adicionar eventos de clique às reações
function addReactionListeners(postElement) {
    const reactionButtons = postElement.querySelectorAll('.reaction-btn');
    reactionButtons.forEach(button => {
        button.addEventListener('click', toggleReaction);
    });
}

// Inicializa as reações para os posts existentes
document.querySelectorAll('.post').forEach(post => {
    addReactionListeners(post);
});
