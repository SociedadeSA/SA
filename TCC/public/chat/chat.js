let mediaRecorder;
let audioChunks = [];
let isRecording = false;

// Função para enviar mensagens
function sendMessage() {
    const messageText = document.getElementById("message-text").value.trim();
    if (!messageText) {
        alert("A mensagem não pode estar vazia!");
        return;
    }

    const chatContent = document.getElementById("chat-content");
    const messageElement = document.createElement("div");
    messageElement.textContent = messageText;
    chatContent.appendChild(messageElement);
    document.getElementById("message-text").value = "";
    chatContent.scrollTop = chatContent.scrollHeight; // Rolar para baixo
}

// Função para abrir chat
function openChat(contactName) {
    document.getElementById("chat-name").textContent = contactName;
    document.getElementById("chat-content").innerHTML = ""; // Limpa o conteúdo do chat
}

// Função para abrir o modal de adicionar grupo
function openAddGroupModal() {
    document.getElementById("add-group-modal").classList.remove("hidden");
}

// Função para fechar o modal de adicionar grupo
function closeAddGroupModal() {
    document.getElementById("add-group-modal").classList.add("hidden");
}

// Função para adicionar grupo e exibi-lo na lista de contatos
function addGroup() {
    const groupName = document.getElementById("group-name").value.trim();
    const groupMembers = document.getElementById("group-members").value;
    const groupImage = document.getElementById("group-image").files[0];

    if (!groupName || !groupMembers) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const contactList = document.getElementById("contact-list");

    // Criando novo elemento de grupo
    const newGroup = document.createElement("div");
    newGroup.className = "contact";
    newGroup.onclick = function () {
        openChat(groupName);
    };

    newGroup.innerHTML = `
        <img src="${groupImage ? URL.createObjectURL(groupImage) : '/public/images/imagem.png'}" alt="Avatar" class="contact-avatar">
        ${groupName}
        <div class="options">
            <span class="dots">...</span>
            <div class="dropdown hidden">
                <button onclick="shareLink('${groupName}')">Compartilhar Link</button>
                <button onclick="showRoleOptions('${groupName}')">Adicionar Funções</button>
            </div>
        </div>
    `;

    contactList.appendChild(newGroup);
    closeAddGroupModal();
}

// Função para mostrar opções de função
function showRoleOptions(contactName) {
    document.getElementById("overlay-role").classList.remove("hidden");
    document.getElementById("overlay-role").dataset.contact = contactName;
}

// Função para fechar a sobreposição
function closeOverlay() {
    document.getElementById("overlay-role").classList.add("hidden");
}

// Função para atribuir função
function addRole() {
    const role = document.getElementById("role-selection").value;
    const userId = document.getElementById("user-id").value;
    const contactName = document.getElementById("overlay-role").dataset.contact;

    if (!userId) {
        alert("Por favor, insira o ID do usuário.");
        return;
    }

    const chatContent = document.getElementById("chat-content");
    const roleMessage = document.createElement("div");
    roleMessage.textContent = `${userId} recebeu a função de ${role} no grupo ${contactName}`;
    chatContent.appendChild(roleMessage);
    closeOverlay();
}

// Função para solicitar permissão e fazer upload de arquivo
function requestFilePermission() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*, video/*, audio/*";
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Arquivo selecionado:", file);
            // Aqui você pode adicionar a lógica para enviar o arquivo
        }
    };
    input.click();
}

// Função para iniciar a gravação de áudio
function startRecording() {
    if (isRecording) return;
    isRecording = true;

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audioMessage = document.createElement("audio");
                audioMessage.controls = true;
                audioMessage.src = audioUrl;
                document.getElementById("chat-content").appendChild(audioMessage);
                audioChunks = [];
            };

            document.getElementById("mic-icon").style.display = "none";
            document.getElementById("stop-icon").style.display = "block";
        })
        .catch((err) => console.error("Erro ao acessar o microfone:", err));
}

// Função para parar a gravação de áudio
function stopRecording() {
    if (!isRecording) return;
    isRecording = false;

    mediaRecorder.stop();
    document.getElementById("mic-icon").style.display = "block";
    document.getElementById("stop-icon").style.display = "none";
}

// Função para compartilhar link
function shareLink(chatName) {
    const link = `https://chatapp.com/${chatName}`;
    navigator.clipboard.writeText(link)
        .then(() => alert(`Link copiado: ${link}`))
        .catch((err) => console.error("Erro ao copiar o link:", err));
}

// Função para pré-visualizar a imagem ao adicionar grupo
function previewImage(event) {
    const imagePreview = document.getElementById("image-preview");
    imagePreview.src = URL.createObjectURL(event.target.files[0]);
    imagePreview.style.display = "block";
}

// Função para ir para a página inicial
function goToHomePage() {
    window.location.href = "/"; // Ajuste para a sua URL
}
