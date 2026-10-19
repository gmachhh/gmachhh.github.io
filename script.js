document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const EMAIL = "erick2006mach@gmail.com";

    const projects = [
        {
            id: 5,
            name: { pt: "Almoxarifado Digital", en: "Digital Stockroom" },
            category: ["web"],
            type: { pt: "Aplicação Web • Em uso real", en: "Web App • In real-world use" },
            icon: '<i class="fa-solid fa-boxes-stacked"></i>',
            visual: "project-stock",
            image: "img/almoxarifado.png",
            label: "Apps Script + Sheets",
            description: {
                pt: "App mobile que substituiu as anotações em papel do almoxarifado da SINALVIDA: retiradas com assinatura digital na tela, estoque atualizado em tempo real, etiquetas com QR Code, controle de ferramentas em posse e relatórios em PDF/planilha com e-mails automáticos — sem servidor e sem custo de licença.",
                en: "Mobile app that replaced the paper logs of SINALVIDA's stockroom: withdrawals with on-screen digital signatures, real-time inventory, QR Code labels, tracking of tools in use and PDF/spreadsheet reports with automated emails — no server and no license costs."
            },
            technologies: ["Google Apps Script", "JavaScript", "HTML", "CSS", { pt: "Google Planilhas", en: "Google Sheets" }, "QR Code"],
            github: "https://github.com/gmachhh/almoxarifado-digital",
            demo: "#"
        },
        {
            id: 6,
            name: { pt: "Gerenciador de Tarefas", en: "Task Manager" },
            category: ["backend"],
            type: { pt: "Backend • Projeto pessoal", en: "Backend • Personal project" },
            icon: '<i class="fa-solid fa-list-check"></i>',
            visual: "project-tasks",
            image: "img/gerenciador-tarefas.png",
            label: "Java 17",
            description: {
                pt: "Aplicação em Java com arquitetura em camadas (model, service, repository, ui) para criar, filtrar e priorizar tarefas, com detecção de atrasos, painel de estatísticas, salvamento seguro em CSV, testes automatizados com JUnit e CI no GitHub Actions.",
                en: "Java application with a layered architecture (model, service, repository, ui) to create, filter and prioritize tasks, featuring overdue detection, a statistics panel, safe CSV persistence, automated tests with JUnit and CI on GitHub Actions."
            },
            technologies: ["Java 17", { pt: "POO", en: "OOP" }, "Maven", "JUnit", "Streams", "GitHub Actions"],
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
            name: { pt: "Controle Financeiro", en: "Personal Finance Manager" },
            category: ["backend", "web"],
            type: { pt: "Sistema Web • Projeto de formação", en: "Web System • Training project" },
            icon: '<i class="fa-solid fa-wallet"></i>',
            visual: "project-csharp",
            image: "img/controle-financeiro.png",
            label: "ASP.NET Core MVC",
            description: {
                pt: "Sistema web de controle financeiro pessoal com dashboard, gráficos de receitas x despesas, filtros por período e categoria e cálculo automático de saldo. Arquitetura MVC com Controllers, Services, Interfaces e ViewModels, injeção de dependência e persistência com Entity Framework Core e migrations.",
                en: "Personal finance web system with a dashboard, income vs. expense charts, filters by period and category and automatic balance calculation. MVC architecture with Controllers, Services, Interfaces and ViewModels, dependency injection and persistence with Entity Framework Core and migrations."
            },
            technologies: ["C#", "ASP.NET Core MVC", "Entity Framework Core", "MySQL", "LINQ", { pt: "Injeção de Dependência", en: "Dependency Injection" }],
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

    /* ---------- Idioma (PT / EN) ---------- */

    const LANGS = window.I18N || { pt: {} };
    const LANG_KEY = "portfolio-lang";

    function detectLanguage() {
        try {
            const saved = localStorage.getItem(LANG_KEY);
            if (saved && LANGS[saved]) return saved;
        } catch {
            // Sem acesso ao armazenamento: segue para o idioma do navegador.
        }

        const browserLang = (navigator.language || "pt").toLowerCase();
        return browserLang.startsWith("pt") || !LANGS.en ? "pt" : "en";
    }

    let lang = detectLanguage();

    // Texto da chave no idioma atual (cai para o português se faltar).
    const t = key => LANGS[lang]?.[key] ?? LANGS.pt[key] ?? key;

    // Campo bilíngue { pt, en } ou texto simples.
    const tr = value =>
        value && typeof value === "object" && !Array.isArray(value)
            ? value[lang] ?? value.pt
            : value;

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
            showToast(t("toast.copied"));
        } else {
            showToast(`${t("toast.copyFailed")} ${text}`, "error");
        }
    }

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    function updateMenuLabel() {
        const isOpen = nav?.classList.contains("open");
        menuToggle?.setAttribute("aria-label", t(isOpen ? "header.menuClose" : "header.menuOpen"));
    }

    function closeMenu() {
        nav?.classList.remove("open");
        document.body.classList.remove("menu-open");
        menuToggle?.setAttribute("aria-expanded", "false");
        updateMenuLabel();

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
        updateMenuLabel();

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
            // scaleX não força o navegador a recalcular o layout a cada rolagem.
            progressBar.style.transform = `scaleX(${progress / 100})`;
        }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    // Rolagem suave própria: não depende do navegador e não "trava" com o tempo.
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrollAnimation = null;
    let isAutoScrolling = false;

    function stopScrollAnimation() {
        if (scrollAnimation) {
            cancelAnimationFrame(scrollAnimation);
            scrollAnimation = null;
        }

        if (isAutoScrolling) {
            onScrollEnd = null;
            finishScroll();
        }
    }

    const root = document.documentElement;
    let onScrollEnd = null;

    function finishScroll() {
        root.style.scrollBehavior = "";
        isAutoScrolling = false;

        const callback = onScrollEnd;
        onScrollEnd = null;
        callback?.();
    }

    // getTargetY é uma função: o destino é recalculado a cada quadro,
    // então a rolagem chega no lugar certo mesmo se algo mudar de tamanho no caminho.
    function smoothScrollTo(getTargetY, done) {
        stopScrollAnimation();

        const clamp = y => Math.max(0, Math.min(y, root.scrollHeight - window.innerHeight));
        const startY = window.scrollY;
        const distance = Math.abs(clamp(getTargetY()) - startY);

        onScrollEnd = done || null;

        // O CSS "scroll-behavior: smooth" brigaria com a animação quadro a quadro.
        root.style.scrollBehavior = "auto";
        isAutoScrolling = true;

        if (prefersReducedMotion.matches || distance < 2) {
            window.scrollTo(0, clamp(getTargetY()));
            finishScroll();
            return;
        }

        // Duração proporcional à distância, entre 550ms e 1200ms.
        const duration = Math.min(1200, Math.max(550, distance * 0.4));
        const easeInOutQuart = t => (t < 0.5 ? 8 * t ** 4 : 1 - Math.pow(-2 * t + 2, 4) / 2);
        let startTime = null;

        function step(now) {
            if (startTime === null) startTime = now;

            const progress = Math.min((now - startTime) / duration, 1);
            const endY = clamp(getTargetY());

            window.scrollTo(0, startY + (endY - startY) * easeInOutQuart(progress));

            if (progress < 1) {
                scrollAnimation = requestAnimationFrame(step);
            } else {
                scrollAnimation = null;
                finishScroll();
            }
        }

        scrollAnimation = requestAnimationFrame(step);
    }

    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
    }

    function scrollToSection(selector) {
        const target = $(selector);

        if (!target) return;

        // Marca o destino no menu na hora, em vez de "piscar" por todas as seções do caminho.
        if (target.id) setActiveLink(target.id);

        smoothScrollTo(() => {
            if (target.id === "home") return 0;

            const headerOffset = (header?.offsetHeight || 76) + 10;
            return target.getBoundingClientRect().top + window.scrollY - headerOffset;
        }, () => {
            // Leva o foco para a seção (acessibilidade) sem provocar um novo salto.
            target.setAttribute("tabindex", "-1");
            target.focus({ preventScroll: true });
        });
    }

    // Se a pessoa girar a rodinha ou tocar na tela, ela assume o controle.
    ["wheel", "touchstart"].forEach(type => {
        window.addEventListener(type, stopScrollAnimation, { passive: true });
    });

    const scrollKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];

    window.addEventListener("keydown", event => {
        if (scrollKeys.includes(event.key)) stopScrollAnimation();
    });

    document.addEventListener("click", event => {
        const link = event.target.closest('a[href^="#"]');

        if (!link) return;

        const hash = link.getAttribute("href");

        if (hash.length < 2 || !$(hash)) return;

        event.preventDefault();
        scrollToSection(hash);
        history.replaceState(null, "", hash);
    });

    backToTop?.addEventListener("click", () => {
        scrollToSection("#home");
        history.replaceState(null, "", "#home");
    });
    // Recomeça o texto animado (usado ao trocar de idioma).
    let resetTyping = () => {};

    if (typingElement) {
        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        resetTyping = () => {
            wordIndex = 0;
            charIndex = 0;
            deleting = false;
        };

        function type() {
            const words = t("hero.typing");
            const word = words[wordIndex % words.length];

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
                    wordIndex = (wordIndex + 1) % t("hero.typing").length;
                }
            }

            setTimeout(type, deleting ? 45 : 85);
        }

        type();
    }

    // Elementos irmãos entram em cascata (um logo depois do outro).
    function setRevealDelay(element) {
        const siblings = [...element.parentElement.children].filter(el => el.classList.contains("reveal"));
        const index = Math.max(0, siblings.indexOf(element));

        element.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 90}ms`);
    }

    // Terminada a entrada, a classe sai: assim o efeito de hover/inclinação
    // volta a ser rápido, sem herdar a transição lenta da animação.
    function cleanupReveal(element) {
        element.addEventListener("transitionend", function done(event) {
            if (event.target !== element || event.propertyName !== "opacity") return;

            element.removeEventListener("transitionend", done);
            element.classList.remove("reveal", "visible");
            element.style.removeProperty("--reveal-delay");
        });
    }

    const revealObserver = "IntersectionObserver" in window
        ? new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    cleanupReveal(entry.target);
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        )
        : null;

    function observeReveal(element) {
        if (!revealObserver || prefersReducedMotion.matches) {
            element.classList.remove("reveal");
            return;
        }

        setRevealDelay(element);
        revealObserver.observe(element);
    }

    $$(".reveal").forEach(observeReveal);

    const sections = $$("main section[id]");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                // Durante a rolagem automática, o menu já mostra o destino.
                if (isAutoScrolling) return;

                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveLink(entry.target.id);
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
            t(isLight ? "theme.toDark" : "theme.toLight")
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

        showToast(t(isLight ? "toast.light" : "toast.dark"));
    });

    let currentFilter = "all";

    function renderProjects(filter = currentFilter, { animate = true } = {}) {
        currentFilter = filter;

        const filteredProjects = projects.filter(project => {
            return filter === "all" || project.category.includes(filter);
        });

        if (!filteredProjects.length) {
            projectsGrid.innerHTML = `<p class="projects-empty">${escapeHtml(t("projects.empty"))}</p>`;
            return;
        }

        projectsGrid.innerHTML = filteredProjects.map(project => `
            <article class="project-card spotlight ${animate ? "reveal" : ""}"
                     data-project-id="${project.id}">
                <div class="project-visual ${project.visual} ${project.image ? "has-image" : ""}">
                    ${project.image
                        ? `<img class="project-shot" src="${project.image}" alt="${escapeHtml(`${t("projects.screenshot")} ${tr(project.name)}`)}" loading="lazy">`
                        : `<span class="project-icon">${project.icon}</span>`}
                    <span class="project-label">${escapeHtml(tr(project.label))}</span>
                </div>

                <div class="project-body">
                    <span class="project-type">${escapeHtml(tr(project.type))}</span>

                    <h3>${escapeHtml(tr(project.name))}</h3>

                    <p>${escapeHtml(tr(project.description))}</p>

                    <div class="project-tags">
                        ${project.technologies.map(tag =>
                            `<span>${escapeHtml(tr(tag))}</span>`
                        ).join("")}
                    </div>

                    <div class="project-actions">
                        <button type="button"
                                class="open-project"
                                data-project-id="${project.id}">
                            ${escapeHtml(t("projects.details"))}
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

        if (animate) $$(".project-card", projectsGrid).forEach(observeReveal);
        initCardTilt();
    }

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
            modalImage.alt = `${t("projects.screenshot")} ${tr(project.name)}`;
        }

        modalType.textContent = tr(project.type);
        modalTitle.textContent = tr(project.name);
        modalDescription.textContent = tr(project.description);

        modalTags.innerHTML = project.technologies
            .map(tag => `<span>${escapeHtml(tr(tag))}</span>`)
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
            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

            const hovering = Boolean(event.target.closest(interactive));

            // Só mexe nas classes do <body> quando algo muda de fato.
            if (!document.body.classList.contains("cursor-active")) {
                document.body.classList.add("cursor-active");
            }

            if (hovering !== document.body.classList.contains("cursor-hover")) {
                document.body.classList.toggle("cursor-hover", hovering);
            }
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
        // O loop "dorme" quando o mouse para, para não gastar processamento à toa.
        let followFrame = null;

        function followCursor() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;

            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;

            const settled =
                Math.abs(mouseX - ringX) < 0.1 && Math.abs(mouseY - ringY) < 0.1 &&
                Math.abs(mouseX - glowX) < 0.1 && Math.abs(mouseY - glowY) < 0.1;

            followFrame = settled ? null : requestAnimationFrame(followCursor);
        }

        function wakeCursor() {
            if (!followFrame) followFrame = requestAnimationFrame(followCursor);
        }

        document.addEventListener("mousemove", wakeCursor, { passive: true });
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
            setFieldError("name", t("contact.errorName"));
            valid = false;
        }

        if (!validateEmail(email)) {
            setFieldError("email", t("contact.errorEmail"));
            valid = false;
        }

        if (subject.length < 3) {
            setFieldError("subject", t("contact.errorSubject"));
            valid = false;
        }

        if (message.length < 10) {
            setFieldError("message", t("contact.errorMessage"));
            valid = false;
        }

        if (!valid) {
            showToast(t("contact.review"), "error");
            return;
        }

        const mailto =
            `mailto:${EMAIL}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(
                `${t("contact.mailGreeting")}\n\n` +
                `${t("contact.mailName")} ${name}.\n` +
                `${t("contact.mailEmail")} ${email}\n\n` +
                `${message}`
            )}`;

        window.location.href = mailto;

        showToast(t("contact.opening"));
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
            smoothScrollTo(0);
        }

        if (key === "p") {
            scrollToSection("#projects");
        }

        if (key === "c") {
            scrollToSection("#contact");
        }
    });

    /* ---------- Aplicar idioma ---------- */

    const langButtons = $$(".lang-switch [data-lang]");

    function applyLanguage({ initial = false } = {}) {
        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
        document.title = t("meta.title");
        $('meta[name="description"]')?.setAttribute("content", t("meta.description"));

        $$("[data-i18n]").forEach(el => {
            el.textContent = t(el.dataset.i18n);
        });

        // Só usado com textos do próprio i18n.js (conteúdo confiável).
        $$("[data-i18n-html]").forEach(el => {
            el.innerHTML = t(el.dataset.i18nHtml);
        });

        // Formato: data-i18n-attr="atributo:chave;outro-atributo:outra-chave"
        $$("[data-i18n-attr]").forEach(el => {
            el.dataset.i18nAttr.split(";").forEach(pair => {
                const [attr, key] = pair.split(":").map(part => part.trim());
                if (attr && key) el.setAttribute(attr, t(key));
            });
        });

        langButtons.forEach(button => {
            button.setAttribute("aria-pressed", String(button.dataset.lang === lang));
        });

        updateThemeIcon();
        updateMenuLabel();
        updateClock();
        clearErrors();
        renderProjects(currentFilter, { animate: initial });

        if (!initial) {
            resetTyping();
        }
    }

    langButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (button.dataset.lang === lang) return;

            lang = button.dataset.lang;

            try {
                localStorage.setItem(LANG_KEY, lang);
            } catch {
                // Sem armazenamento: o idioma vale só para esta visita.
            }

            applyLanguage();
        });
    });

    /* ---------- Relógio de São Paulo ---------- */

    const localTime = $("#localTime");

    function updateClock() {
        if (!localTime) return;

        const now = new Date();

        localTime.textContent = new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Sao_Paulo"
        }).format(now);

        localTime.setAttribute("datetime", now.toISOString());
    }

    // Atualiza na virada de cada minuto, e depois a cada 60s.
    setTimeout(() => {
        updateClock();
        setInterval(updateClock, 60_000);
    }, 60_000 - (Date.now() % 60_000));

    /* ---------- Brilho que segue o mouse dentro dos cards ---------- */

    $$(".skill-group, .highlight-card, .stat-card, .timeline-card").forEach(card => {
        card.classList.add("spotlight");
    });

    if (finePointer) {
        document.addEventListener("pointermove", event => {
            const card = event.target.closest(".spotlight");

            if (!card) return;

            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
            card.style.setProperty("--my", `${event.clientY - rect.top}px`);
        }, { passive: true });
    }

    applyLanguage({ initial: true });

    console.log(
        "%cOlá, recrutador! 👋",
        "font-size: 20px; font-weight: bold;"
    );

    console.log(
        "%cSe você está olhando o código, provavelmente encontrou uma parte interessante do portfólio. Espero que tenha gostado do código :)",
        "font-size: 13px;"
    );
});
