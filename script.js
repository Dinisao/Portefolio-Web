// 1. Controle de Tema
const toggle = document.getElementById("toggleMode");
const body = document.body;
const themeIcon = document.getElementById("theme-icon");

toggle.addEventListener("change", () => {
    const isLight = toggle.checked;
    body.classList.toggle("light", isLight);
    themeIcon.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
    toggle.checked = true;
    body.classList.add("light");
    themeIcon.textContent = "☀️";
}

// 2. GSAP - Animações de Entrada
gsap.from(".glitch-text", { duration: 1, y: -50, opacity: 0, ease: "back.out" });
gsap.from(".bio-expanded", { duration: 1.2, delay: 0.3, opacity: 0, x: -30, ease: "power2.out" });

// 3. Scroll Progress
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const bar = document.getElementById("scroll-progress");
    if(bar) bar.style.width = scrolled + "%";
});

// 4. Vídeos e Mute
document.querySelectorAll('.video-box').forEach(box => {
    const video = box.querySelector('video');
    const muteBtn = box.querySelector('.mute-btn');

    box.addEventListener('mouseenter', () => video && video.play());
    box.addEventListener('mouseleave', () => {
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    });

    if (muteBtn && video) {
        muteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            video.muted = !video.muted;
            muteBtn.textContent = video.muted ? "🔇" : "🔊";
            muteBtn.classList.toggle("is-playing", !video.muted);
            gsap.to(muteBtn, { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1 });
        });
    }
});

// 5. Tilt das Cartas (Desktop)
const isMobile = window.matchMedia("(max-width: 768px)").matches;
if (!isMobile) {
    document.querySelectorAll(".card-stack").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
                duration: 0.5,
                rotateY: x * 15,
                rotateX: y * -15,
                transformPerspective: 1000,
                ease: "power2.out"
            });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { duration: 0.5, rotateY: 0, rotateX: 0, ease: "power2.out" });
        });
    });
}

// 6. Dados dos Projetos com Imagem
const projectData = {
    intempo: {
        title: "InTempo",
        description: "Foco no design de mecânicas, Level design do level 2 (e partes de outros).<br><br>Ideia Chave: Rails",
        role: "Game Designer, Level Designer",
        engine: "Unity",
        image: "Rail.png" // SUBSTITUA PELO SEU FICHEIRO
    },
    geozoo: {
        title: "GeoZoo",
        description: "Gestão completa da produção. Desenvolvimento de sistemas de economia e geolocalização.",
        role: "Programmer",
        engine: "Unity",
        image: "geozoo_preview.jpg" // SUBSTITUA PELO SEU FICHEIRO
    }
};

const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-modal');

function openDetails(id) {
    const data = projectData[id];
    modalBody.innerHTML = `
        <h2 style="font-family: 'Orbitron'; color: var(--accent); margin-bottom: 25px;">${data.title}</h2>
        
        <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 25px;">
            <div class="blue-badge">Role: ${data.role}</div>
            <div class="blue-badge">Engine: ${data.engine}</div>
        </div>

        <p style="line-height: 1.8; font-size: 16px; color: var(--text); opacity: 0.9; margin-bottom: 25px;">${data.description}</p>

        <div class="modal-image-container">
            <img src="${data.image}" alt="${data.title}" class="modal-project-img">
        </div>
    `;
    modal.style.display = 'flex';
    gsap.from(".modal-content", { duration: 0.4, scale: 0.8, opacity: 0, ease: "back.out" });
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (e) => { if(e.target == modal) modal.style.display = 'none'; }
window.addEventListener('keydown', (e) => { if(e.key === "Escape") modal.style.display = 'none'; });

// Badges iniciais
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".overlay-info").forEach(info => {
        const badges = info.querySelectorAll(".badge");
        let html = "";
        badges.forEach(b => {
            html += `<div class="blue-badge">${b.textContent}</div>`;
        });
        html += `<p class="click-hint">(Clique para detalhes)</p>`;
        info.innerHTML = html;
    });
});