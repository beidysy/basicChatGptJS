require('dotenv').config();

const url = 'https://api.openai.com/v1/chat/completion';
console.log(process.env.api);

const form = document.querySelector('form');
const promptInput = document.querySelector('#prompt');
const chatLog = document.querySelector('.chat-log');   

form.addEventListener('submit', e => {
    e.preventDefault();
    let value = promptInput.value;
    if (value !== ''){
        createMessageInstance(value);
        askChatGPT(value);
        handleScroll();
        promptInput.value = '';
    }
});


function createMessageInstance(prompt) {
    chatLog.innerHTML +=
    `
    <div class="content">
    <div class="message-image"></div>
    <p>${prompt}</p>
</div>
</div>
<div class="message ai-message">
<div class="content">
    <div class="message-image">
        <img src="./images/chatgpt-icon.png" alt="">
    </div>
    <p class="thinking">Thinking 🚀</p>
</div>   
</div>
</div>
    
    `
}

function askChatGPT(prompt) {
    fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    roles: 'user',
                    content: prompt
                }
            ],
            max_tokens: 200,
        })
    })
    .then(res => res.json())
    .then(data => updateMessage(data))
}

// scrolls the chatLog to the bottom
function handleScroll() {
    chatLog.ScrollTop = chatLog.scrollHeight;
}
function updateMessage(message){
    const p = document.querySelector(',thinking');
    p.textContent = message.choices[0].message.content;
    p.classList.remove('thinking');
    handleScroll();
}