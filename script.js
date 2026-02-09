// 1. Controle de Tema (Slider)
const toggle = document.getElementById("toggleMode");
const body = document.body;
const themeIcon = document.getElementById("theme-icon");

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        body.classList.add("light");
        themeIcon.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light");
        themeIcon.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

if (localStorage.getItem("theme") === "light") {
    toggle.checked = true;
    body.classList.add("light");
    themeIcon.textContent = "☀️";
}

// 2. Scroll Progress
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("scroll-progress");
    if(bar) bar.style.width = scrolled + "%";
});

// Seleciona todas as caixas de vídeo do portfólio
document.querySelectorAll('.video-box').forEach(box => {
    const video = box.querySelector('video');
    const muteBtn = box.querySelector('.mute-btn');

    // 1. Play ao passar o rato (Hover) apenas na área do vídeo
    box.addEventListener('mouseenter', () => {
        if (video) video.play();
    });

    // 2. Pause e Reset ao retirar o rato
    box.addEventListener('mouseleave', () => {
        if (video) {
            video.pause();
            video.currentTime = 0; // Opcional: volta ao início do vídeo
        }
    });

    // 3. Controlo de Som (Mute/Unmute)
    if (muteBtn && video) {
        muteBtn.addEventListener('click', (e) => {
            // Evita que o clique no botão ative o Modal do card pai
            e.preventDefault();
            e.stopPropagation(); 
            
            video.muted = !video.muted;
            
            // Atualiza o estado visual do botão
            if (video.muted) {
                muteBtn.textContent = "🔇";
                muteBtn.classList.remove("is-playing");
                muteBtn.style.background = "rgba(0, 210, 255, 0.1)";
                muteBtn.style.color = "var(--accent)";
            } else {
                muteBtn.textContent = "🔊";
                muteBtn.classList.add("is-playing"); // Ativa a animação de pulsação CSS
                muteBtn.style.background = "var(--accent)";
                muteBtn.style.color = "#000";
            }
        });
    }
});
// 4. Sistema de Modal (Detalhes dos Projetos)
const projectData = {
    intempo: {
        title: "InTempo",
        description: "Neste projeto, foquei-me no design de mecânicas de manipulação temporal e na criação de puzzles complexos. Responsável pela progressão de dificuldade e integração de assets no Unity.",
        role: "Game Designer",
        engine: "Unity (C#)"
    },
    geozoo: {
        title: "GeoZoo",
        description: "Gestão completa da produção e equipa. Desenvolvi o sistema de economia do jogo e as mecânicas de geolocalização para dispositivos móveis.",
        role: "Producer",
        engine: "Web / Godot"
    }
};

const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-modal');

function openDetails(id) {
    const data = projectData[id];
    modalBody.innerHTML = `
        <h2 style="font-family: 'Orbitron'; color: var(--accent); margin-bottom: 20px;">${data.title}</h2>
        <div style="margin-bottom: 20px;">
            <span style="background:var(--border); padding:5px 10px; border-radius:5px; font-size:12px; margin-right:10px;">${data.role}</span>
            <span style="background:var(--border); padding:5px 10px; border-radius:5px; font-size:12px;">${data.engine}</span>
        </div>
        <p style="line-height: 1.8; font-size: 16px; color: var(--text); opacity: 0.9;">${data.description}</p>
    `;
    modal.style.display = 'flex';
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; }

// 5. Tilt das Cartas (Otimizado)
document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".card-stack").forEach(card => {
        const rect = card.getBoundingClientRect();
        const isInCard = (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
        
        if (isInCard) {
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
        } else {
            card.style.transform = `perspective(1200px) rotateY(0deg) rotateX(0deg)`;
        }
    });
});