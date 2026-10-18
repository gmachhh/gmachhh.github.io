document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const EMAIL = "erick2006mach@gmail.com";

    const projects = [
        {
            id: 5,
            name: "Almoxarifado Digital",
            category: ["web"],
            type: "Aplicação Web • Em uso real",
            icon: '<i class="fa-solid fa-boxes-stacked"></i>',
            visual: "project-stock",
            image: "img/almoxarifado.png",
            label: "Apps Script + Sheets",
            description:
                "App mobile que substituiu as anotações em papel do almoxarifado da SINALVIDA: retiradas com assinatura digital na tela, estoque atualizado em tempo real, etiquetas com QR Code, controle de ferramentas em posse e relatórios em PDF/planilha com e-mails automáticos — sem servidor e sem custo de licença.",
            technologies: ["Google Apps Script", "JavaScript", "HTML", "CSS", "Google Planilhas", "QR Code"],
            github: "https://github.com/gmachhh/almoxarifado-digital",
            demo: "#"
        },
        {
            id: 6,
            name: "Gerenciador de Tarefas",
            category: ["backend"],
            type: "Backend • Projeto pessoal",
            icon: '<i class="fa-solid fa-list-check"></i>',
            visual: "project-tasks",
            image: "img/gerenciador-tarefas.png",
            label: "Java 17",
            description:
                "Aplicação em Java com arquitetura em camadas (model, service, repository, ui) para criar, filtrar e priorizar tarefas, com detecção de atrasos, painel de estatísticas, salvamento seguro em CSV, testes automatizados com JUnit e CI no GitHub Actions.",
            technologies: ["Java 17", "POO", "Maven", "JUnit", "Streams", "GitHub Actions"],
            github: "https://github.com/gmachhh/gerenciador-de-tarefas",
            demo: "#"
        },
        /*{
            id: 1,
            name: "Sistema Bancário",
            category: ["backend"],
            type: "Backend • Em desenvolvimento",
            icon: '<i class="fa-brands fa-java"></i>',
            visual: "project-java",
            label: "Java 21",
            description:
                "Sistema orientado a objetos para clientes, contas, depósitos, saques, transferências, extratos e histórico de transações.",
            technologies: ["Java 21", "POO", "JUnit", "Collections", "Exceptions"],
            github: "SEU_GITHUB_SISTEMA_BANCARIO",
            demo: "#"
        },*/
        {
            id: 2,
            name: "Controle Financeiro",
            category: ["backend", "web"],
            type: "Sistema Web • Projeto de formação",
            icon: '<i class="fa-solid fa-wallet"></i>',
            visual: "project-csharp",
            image: "img/controle-financeiro.png",
            label: "ASP.NET Core MVC",
            description:
                "Sistema web de controle financeiro pessoal com dashboard, gráficos de receitas x despesas, filtros por período e categoria e cálculo automático de saldo. Arquitetura MVC com Controllers, Services, Interfaces e ViewModels, injeção de dependência e persistência com Entity Framework Core e migrations.",
            technologies: ["C#", "ASP.NET Core MVC", "Entity Framework Core", "MySQL", "LINQ", "Injeção de Dependência"],
            github: "https://github.com/gmachhh/ControleFinanceiroV2",
            demo: "https://github.com/gmachhh/ControleFinanceiroV2"
        },
        /*{
            id: 3,
            name: "Forma-E",
            category: ["web"],
            type: "Frontend • Projeto de formação",
            icon: '<i class="fa-solid fa-globe"></i>',
            visual: "project-web",
            label: "HTML + CSS + JS",
            description:
                "Plataforma web voltada para instituições e cursos, com foco em apresentação de conteúdo e experiência do usuário.",
            technologies: ["HTML", "CSS", "JavaScript", "UX"],
            github: "SEU_GITHUB_FORMA_E",
            demo: "#"
        },*/
        /*{
            id: 4,
            name: "Sharp Budget",
            category: ["web"],
            type: "Projeto de estudo",
            icon: '<i class="fa-solid fa-chart-line"></i>',
            visual: "project-data",
            label: "Finanças",
            description:
                "Conceito de aplicação para apoiar a organização financeira, com foco em uma experiência simples, acessível e orientada a dados.",
            technologies: ["Finanças", "UX", "Dados", "JavaScript"],
            github: "SEU_GITHUB_SHARP_BUDGET",
            demo: "#"
        }*/
    ];

    const $ = (selector, parent = document) => parent.querySelector(selector);
    const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

    const header = $("#header");
    const menuToggle = $(".menu-toggle");
    const nav = $(".nav");
    const navLinks = $$(".nav-link");
    const backToTop = $(".back-to-top");
    const typingElement = $(".typing");
    const yearElement = $("#year");
    const themeToggle = $("#themeToggle");
    const progressBar = $("#scrollProgress");
    const projectsGrid = $("#projectsGrid");
    const filterButtons = $$(".filter-btn");
    const modal = $("#projectModal");
    const modalTitle = $("#modalTitle");
    const modalIcon = $("#modalIcon");
    const modalImage = $("#modalImage");
    const modalType = $("#modalType");
    const modalDescription = $("#modalDescription");
    const modalTags = $("#modalTags");
    const modalGithub = $("#modalGithub");
    const modalDemo = $("#modalDemo");
    const toastContainer = $("#toastContainer");

    const escapeHtml = (value) => {
        const div = document.createElement("div");
        div.textContent = value;
        return div.innerHTML;
    };

    function showToast(message, type = "success") {
        const toast = document.createElement("div");
        toast.className = `toast ${type === "error" ? "error" : ""}`;

        toast.innerHTML = `
            <i class="fa-solid ${type === "error" ? "fa-circle-exclamation" : "fa-circle-check"}"></i>
            <span>${escapeHtml(message)}</span>
        `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("hide");

            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    function legacyCopy(text) {
        const input = document.createElement("textarea");
        input.value = text;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.focus();
        input.select();
        const ok = document.execCommand("copy");
        input.remove();
        return ok;
    }

    async function copyToClipboard(text) {
        let copied = false;

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                copied = true;
            }
        } catch {
            // Permissão negada: tenta o método alternativo abaixo.
        }

        if (!copied) {
            try {
                copied = legacyCopy(text);
            } catch {
                copied = false;
            }
        }

        if (copied) {
            showToast("E-mail copiado para a área de transferência.");
        } else {
            showToast(`Não foi possível copiar. Meu e-mail: ${text}`, "error");
        }
    }

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    function closeMenu() {
        nav?.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuToggle?.setAttribute("aria-expanded", "false");

        const icon = $("i", menuToggle);

        if (icon) {
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        }
    }

    function toggleMenu() {
        const isOpen = nav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        document.body.classList.toggle("menu-open", isOpen);

        const icon = $("i", menuToggle);

        if (icon) {
            icon.classList.toggle("fa-bars", !isOpen);
            icon.classList.toggle("fa-xmark", isOpen);
        }
    }

    menuToggle?.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (
            nav?.classList.contains("open") &&
            !nav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });

    function handleScroll() {
        const scrollTop = window.scrollY;

        header?.classList.toggle("scrolled", scrollTop > 30);
        backToTop?.classList.toggle("show", scrollTop > 500);

        const maxScroll =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    backToTop?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    if (typingElement) {
        const words = [
            "Java",
            "JavaScript",
            "Backend",
            "Desenvolvimento Web",
            "Testes automatizados"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function type() {
            const word = words[wordIndex];

            typingElement.textContent = deleting
                ? word.substring(0, charIndex - 1)
                : word.substring(0, charIndex + 1);

            if (!deleting) {
                charIndex++;

                if (charIndex === word.length) {
                    deleting = true;
                    setTimeout(type, 1600);
                    return;
                }
            } else {
                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(type, deleting ? 45 : 85);
        }

        type();
    }

    const revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add("visible"));
    }

    const sections = $$("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${currentId}`
                        );
                    });
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach(section => sectionObserver.observe(section));
    }

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.documentElement.classList.add("light-theme");
    }

    function updateThemeIcon() {
        const isLight = document.documentElement.classList.contains("light-theme");
        const icon = $("i", themeToggle);

        if (icon) {
            icon.className = isLight
                ? "fa-solid fa-moon"
                : "fa-solid fa-sun";
        }

        themeToggle?.setAttribute(
            "aria-label",
            isLight ? "Ativar tema escuro" : "Ativar tema claro"
        );
    }

    updateThemeIcon();

    themeToggle?.addEventListener("click", () => {
        const isLight = document.documentElement.classList.toggle("light-theme");

        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );

        updateThemeIcon();

        showToast(
            isLight
                ? "Tema claro ativado."
                : "Tema escuro ativado."
        );
    });

    function renderProjects(filter = "all") {
        const filteredProjects = projects.filter(project => {
            return filter === "all" || project.category.includes(filter);
        });

        if (!filteredProjects.length) {
            projectsGrid.innerHTML = `<p class="projects-empty">Em breve, novos projetos nesta categoria.</p>`;
            return;
        }

        projectsGrid.innerHTML = filteredProjects.map(project => `
            <article class="project-card reveal visible"
                     data-project-id="${project.id}">
                <div class="project-visual ${project.visual} ${project.image ? "has-image" : ""}">
                    ${project.image
                        ? `<img class="project-shot" src="${project.image}" alt="Tela do projeto ${escapeHtml(project.name)}" loading="lazy">`
                        : `<span class="project-icon">${project.icon}</span>`}
                    <span class="project-label">${escapeHtml(project.label)}</span>
                </div>

                <div class="project-body">
                    <span class="project-type">${escapeHtml(project.type)}</span>

                    <h3>${escapeHtml(project.name)}</h3>

                    <p>${escapeHtml(project.description)}</p>

                    <div class="project-tags">
                        ${project.technologies.map(tag =>
                            `<span>${escapeHtml(tag)}</span>`
                        ).join("")}
                    </div>

                    <div class="project-actions">
                        <button type="button"
                                class="open-project"
                                data-project-id="${project.id}">
                            Detalhes
                            <i class="fa-solid fa-arrow-right"></i>
                        </button>

                        <a href="${project.github}"
                           target="_blank"
                           rel="noopener">
                            GitHub
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            </article>
        `).join("");

        initCardTilt();
    }

    renderProjects();

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => {
                btn.classList.toggle("active", btn === button);
                btn.setAttribute("aria-pressed", String(btn === button));
            });

            renderProjects(button.dataset.filter);
        });
    });

    function openProject(projectId) {
        const project = projects.find(item => item.id === Number(projectId));

        if (!project) return;

        modalIcon.innerHTML = project.icon;
        modalIcon.hidden = Boolean(project.image);
        modalImage.hidden = !project.image;

        if (project.image) {
            modalImage.src = project.image;
            modalImage.alt = `Tela do projeto ${project.name}`;
        }

        modalType.textContent = project.type;
        modalTitle.textContent = project.name;
        modalDescription.textContent = project.description;

        modalTags.innerHTML = project.technologies
            .map(tag => `<span>${escapeHtml(tag)}</span>`)
            .join("");

        modalGithub.href = project.github;
        const hasDemo = project.demo && project.demo !== "#" && project.demo !== project.github;
        modalDemo.href = hasDemo ? project.demo : "#";
        modalDemo.hidden = !hasDemo;

        lastFocused = document.activeElement;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        modalCloseButton?.focus();
    }

    let lastFocused = null;

    function closeModal() {
        if (!modal.classList.contains("open")) return;

        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");

        // Devolve o foco ao botão que abriu o modal.
        lastFocused?.focus();
    }

    // Mantém o Tab dentro do modal enquanto ele estiver aberto.
    modal.addEventListener("keydown", event => {
        if (event.key !== "Tab") return;

        const focusable = $$("a[href]:not([hidden]), button:not([hidden])", modal)
            .filter(el => el.offsetParent !== null);

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    const modalCloseButton = $(".modal-close");

    document.addEventListener("click", event => {
        const openButton = event.target.closest(".open-project");

        if (openButton) {
            openProject(openButton.dataset.projectId);
        }

        if (event.target.closest("[data-close-modal]")) {
            closeModal();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
            closeMenu();
        }
    });

    function initCardTilt() {
        const cards = $$(".project-card, .highlight-card, .skill-group");

        cards.forEach(card => {
            if (card.dataset.tiltReady === "true") return;

            card.dataset.tiltReady = "true";

            card.addEventListener("mousemove", event => {
                if (window.innerWidth < 768) return;

                const rect = card.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3;
                const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3;

                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    initCardTilt();

    const counters = $$(".counter");
    let countersStarted = false;

    function animateCounters() {
        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(counter => {
            const target = Number(counter.dataset.target);
            const suffix = counter.dataset.suffix || "";

            let current = 0;
            const duration = 1200;
            const start = performance.now();

            function update(now) {
                const progress = Math.min((now - start) / duration, 1);

                const eased = 1 - Math.pow(1 - progress, 3);

                current = Math.floor(target * eased);

                counter.textContent = current + suffix;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + suffix;
                }
            }

            requestAnimationFrame(update);
        });
    }

    const statsSection = $("#stats");

    if ("IntersectionObserver" in window && statsSection) {
        const counterObserver = new IntersectionObserver(
            entries => {
                if (entries.some(entry => entry.isIntersecting)) {
                    animateCounters();
                    counterObserver.disconnect();
                }
            },
            { threshold: .3 }
        );

        counterObserver.observe(statsSection);
    }

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (finePointer && !reducedMotion) {
        const dot = document.createElement("div");
        const ring = document.createElement("div");
        const glow = document.createElement("div");

        dot.className = "cursor-dot";
        ring.className = "cursor-ring";
        glow.className = "cursor-glow";
        document.body.append(glow, ring, dot);

        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let glowX = 0;
        let glowY = 0;

        const interactive = "a, button, .project-card, .filter-btn, input, textarea";

        document.addEventListener("mousemove", event => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            document.body.classList.add("cursor-active");
            document.body.classList.toggle(
                "cursor-hover",
                Boolean(event.target.closest(interactive))
            );
        });

        document.addEventListener("mouseleave", () => {
            document.body.classList.remove("cursor-active");
        });

        document.addEventListener("mousedown", () => document.body.classList.add("cursor-down"));
        document.addEventListener("mouseup", () => document.body.classList.remove("cursor-down"));

        // Pequena explosão de partículas a cada clique.
        document.addEventListener("click", event => {
            for (let i = 0; i < 8; i++) {
                const spark = document.createElement("span");
                const angle = (Math.PI * 2 * i) / 8;
                const distance = 22 + Math.random() * 14;

                spark.className = "cursor-spark";
                spark.style.left = `${event.clientX}px`;
                spark.style.top = `${event.clientY}px`;
                spark.style.background = i % 2 ? "var(--accent)" : "var(--accent-2)";
                spark.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
                spark.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
                document.body.appendChild(spark);
                spark.addEventListener("animationend", () => spark.remove());
            }
        });

        // O anel e o brilho seguem o mouse com atraso suave.
        function followCursor() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;

            ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
            glow.style.transform = `translate(${glowX}px, ${glowY}px)`;

            requestAnimationFrame(followCursor);
        }

        followCursor();
    }

    /*Aqui copia E-mail*/

    $$("[data-copy-email]").forEach(button => {
        button.addEventListener("click", () => {
            const email = button.dataset.copyEmail || EMAIL;

            copyToClipboard(email);
        });
    });

    const contactForm = $("#contactForm");

    function setFieldError(name, message) {
        const error = $(`[data-error-for="${name}"]`);

        if (error) {
            error.textContent = message;
        }
    }

    function clearErrors() {
        $$(".field-error").forEach(error => {
            error.textContent = "";
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    contactForm?.addEventListener("submit", event => {
        event.preventDefault();

        clearErrors();

        const name = $("#contactName").value.trim();
        const email = $("#contactEmail").value.trim();
        const subject = $("#contactSubject").value.trim();
        const message = $("#contactMessage").value.trim();

        let valid = true;

        if (name.length < 2) {
            setFieldError("name", "Informe seu nome.");
            valid = false;
        }

        if (!validateEmail(email)) {
            setFieldError("email", "Informe um e-mail válido.");
            valid = false;
        }

        if (subject.length < 3) {
            setFieldError("subject", "Informe um assunto.");
            valid = false;
        }

        if (message.length < 10) {
            setFieldError("message", "A mensagem precisa ter pelo menos 10 caracteres.");
            valid = false;
        }

        if (!valid) {
            showToast("Revise os campos destacados.", "error");
            return;
        }

        const mailto =
            `mailto:${EMAIL}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(
                `Olá Erick,\n\n` +
                `Meu nome é ${name}.\n` +
                `Meu e-mail: ${email}\n\n` +
                `${message}`
            )}`;

        window.location.href = mailto;

        showToast("Abrindo seu aplicativo de e-mail...");
    });

    function isTypingField() {
        const active = document.activeElement;

        return (
            active &&
            ["INPUT", "TEXTAREA", "SELECT"].includes(active.tagName)
        );
    }

    document.addEventListener("keydown", event => {
        if (isTypingField()) return;

        const key = event.key.toLowerCase();

        if (event.ctrlKey || event.metaKey || event.altKey) return;

        if (key === "h") {
            $("#home")?.scrollIntoView({ behavior: "smooth" });
        }

        if (key === "p") {
            $("#projects")?.scrollIntoView({ behavior: "smooth" });
        }

        if (key === "c") {
            $("#contact")?.scrollIntoView({ behavior: "smooth" });
        }
    });

    console.log(
        "%cOlá, recrutador! 👋",
        "font-size: 20px; font-weight: bold;"
    );

    console.log(
        "%cSe você está olhando o código, provavelmente encontrou uma parte interessante do portfólio. Espero que tenha gostado do código :)",
        "font-size: 13px;"
    );
});
