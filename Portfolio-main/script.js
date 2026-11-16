const themeToggleBtn = document.getElementById('theme-toggle');
const langToggleBtn = document.getElementById('lang-toggle');
const bodyElement = document.body;
const htmlElement = document.documentElement;
const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
const skillCards = document.querySelectorAll('.skill-card');

let currentLang = localStorage.getItem('portfolio_lang') || 'en';

const translations = {
    en: {
        nav_about: "About",
        nav_skills: "Skills",
        nav_projects: "Projects",
        nav_hobbies: "Hobbies",
        nav_contact: "Contact",

        hero_greeting: "Hello, I'm",
        hero_name: "Ramez Anwar Abu Ramadan",
        hero_title: "Software Engineering Student",
        hero_bio: "I am a passionate Software Engineering student at The World Islamic Sciences and Education University (WISE) in Amman, Jordan. I thrive on solving algorithmic challenges, designing robust system architectures, and building clean, responsive web applications from scratch.",
        btn_work: "View My Work",
        btn_contact: "Get In Touch",

        skills_title: "Technical Skills",
        what_i_do: "What I Do:",

        skill1_title: "Frontend Web",
        skill1_stack: "<strong>Core Stack:</strong> HTML5, Semantic Markup, CSS3, Flexbox, Responsive Design, JavaScript",
        skill1_item1: "Build clean, responsive user interfaces that adapt smoothly across desktop and mobile devices.",
        skill1_item2: "Structure accessible, semantic HTML5 documents and modern CSS3/Flexbox layouts.",
        skill1_item3: "Create interactive client-side experiences, dynamic DOM updates, and custom theme toggles using vanilla JavaScript.",

        skill2_title: "Programming & Backend",
        skill2_stack: "<strong>Core Stack:</strong> C, C++, Java, Python, PHP, SQL",
        skill2_item1: "Develop server-side web logic and connect applications to relational MySQL databases using PHP and SQL.",
        skill2_item2: "Write efficient, memory-safe low-level programs in C/C++ and object-oriented applications in Java and Python.",
        skill2_item3: "Solve complex algorithmic and data-structure challenges under competitive constraints.",

        skill3_title: "Tools & Environment",
        skill3_stack: "<strong>Core Stack:</strong> Linux / Unix Shell, Git & GitHub, VS Code, XAMPP, Jira, MySQL Workbench",
        skill3_item1: "Navigate Linux/Unix environments, manage file permissions, and write Bash scripts to automate workflows.",
        skill3_item2: "Manage source code repositories, branching, and team collaboration cleanly with Git and GitHub.",
        skill3_item3: "Configure local development servers (XAMPP), design schemas in MySQL Workbench, and organize agile sprints in Jira.",

        skill4_title: "Software Engineering",
        skill4_stack: "<strong>Core Stack:</strong> System Architecture, SRS Documentation, UML / DFD Modeling (Visual Paradigm), Problem Solving",
        skill4_item1: "Analyze project requirements and write complete Software Requirements Specification (SRS) documents.",
        skill4_item2: "Design system architectures, Use Case diagrams, Activity diagrams, and Data Flow Diagrams (DFDs) in Visual Paradigm.",
        skill4_item3: "Plan end-to-end database schemas and translate real-world problems into structured technical solutions.",

        projects_title: "Project Showcase",
        proj1_tag: "42 Amman • Intensive Bootcamp",
        proj1_desc: `Completed the intensive 26-day coding bootcamp based on peer-to-peer learning and timed exams:<br>
            <strong>• Unix &amp; Git:</strong> Linux CLI navigation, Bash scripting, file permissions, and Git workflows.<br>
            <strong>• Low-Level C:</strong> Built standard C library functions from scratch under strict Norminette rules.<br>
            <strong>• Memory &amp; Pointers:</strong> Mastered pointer arithmetic, dynamic memory allocation (<code>malloc</code>/<code>free</code>), and structs.<br>
            <strong>• Algorithms &amp; Rushes:</strong> Implemented recursion, sorting algorithms, Makefiles, and team Rush projects.`,

        proj2_tag: "Project 42PiscineCyber",
        proj2_desc: `<strong>• Project 00 (Shell &amp; Git):</strong> Linux CLI navigation, file permissions, shell scripting, and Git workflows.<br>
            <strong>• Project 01 (Semantic HTML):</strong> Structured forms, tables, and accessible document hierarchy.<br>
            <strong>• Project 02 (Modern CSS):</strong> Responsive layouts using CSS3, Flexbox, and custom properties.<br>
            <strong>• Project 03 (JavaScript &amp; DOM):</strong> Client-side interactivity, event listeners, and dynamic DOM manipulation.`,

        proj3_tag: "Featured Project",
        proj3_title: "CampusConnect Platform",
        proj3_desc: "A comprehensive web platform for managing university events, featuring student registration, event tracking, and relational database integration.",

        hobbies_title: "Hobbies & Interests",
        hobby1_title: "🏍️ Motorcycling",
        hobby1_desc: "Riding my sport motorcycle across Jordan, enjoying the focus, freedom, and mechanical precision of the road.",
        hobby2_title: "📱 Tech Content Creation",
        hobby2_desc: "Running \"Life with a Software Engineer\", sharing daily coding routines, university life, and tech insights.",
        hobby3_title: "🎮 Competitive Gaming & CTFs",
        hobby3_desc: "Solving cybersecurity CTF challenges, competing in coding marathons, and playing tactical and racing games.",

        contact_title: "Contact Me",
        contact_subtitle: "Have a question or want to collaborate on a project? Send me a message!",
        form_name_label: "Full Name",
        form_name_placeholder: "Your Name",
        form_email_label: "Email Address",
        form_message_label: "Message",
        form_message_placeholder: "Write your message here...",
        form_submit_btn: "Send Message",

        footer_copy: "&copy; 2026 Ramez Anwar Abu Ramadan.",
        footer_top: "Back to Top ↑",

        theme_light: "☀️ Light Mode",
        theme_dark: "🌙 Dark Mode",
        form_success: (name) => `Thank you, ${name}! Your message has been sent successfully.`,
        form_error: "Oops! There was a problem submitting your form.",
        form_network_error: "Oops! There was a network error. Please try again."
    },
    ar: {
        nav_about: "نبذة عني",
        nav_skills: "المهارات",
        nav_projects: "المشاريع",
        nav_hobbies: "الهوايات",
        nav_contact: "تواصل معي",

        hero_greeting: "مرحباً، أنا",
        hero_name: "رامز أنور أبو رمضان",
        hero_title: "طالب هندسة برمجيات",
        hero_bio: "أنا طالب شغوف بهندسة البرمجيات في جامعة العلوم الإسلامية العالمية (WISE) في عمّان، الأردن. أستمتع بحل التحديات الخوارزمية، وتصميم معماريات الأنظمة القوية، وبناء تطبيقات ويب متجاوبة ومنظمة من الصفر.",
        btn_work: "استعرض أعمالي",
        btn_contact: "تواصل معي",

        skills_title: "المهارات التقنية",
        what_i_do: "ما الذي أقدمه:",

        skill1_title: "تطوير الواجهات الأمامية (Frontend)",
        skill1_stack: "<strong>التقنيات الأساسية:</strong> HTML5, Semantic Markup, CSS3, Flexbox, Responsive Design, JavaScript",
        skill1_item1: "بناء واجهات مستخدم نظيفة ومتجاوبة تتكيف بسلاسة مع أجهزة سطح المكتب والهواتف المحمولة.",
        skill1_item2: "هيكلة صفحات ويب متوافقة مع معايير الوصول باستخدام Semantic HTML5 وتصميم تخطيطات حديثة عبر CSS3 و Flexbox.",
        skill1_item3: "إنشاء تجارب تفاعلية للمستخدم، وتحديثات ديناميكية لـ DOM، وأزرار تبديل المظهر المخصصة باستخدام Vanilla JavaScript.",

        skill2_title: "البرمجة وتطوير الواجهات الخلفية (Backend)",
        skill2_stack: "<strong>التقنيات الأساسية:</strong> C, C++, Java, Python, PHP, SQL",
        skill2_item1: "تطوير منطق الخادم (Server-Side) وربط التطبيقات بقواعد بيانات MySQL العلائقية باستخدام PHP و SQL.",
        skill2_item2: "كتابة برامج منخفضة المستوى عالية الكفاءة وآمنة للذاكرة بلغات C/C++، وتطبيقات كائنية التوجه (OOP) بلغات Java و Python.",
        skill2_item3: "حل التحديات المعقدة في الخوارزميات وهياكل البيانات (Data Structures) ضمن قيود البرمجة التنافسية.",

        skill3_title: "الأدوات وبيئة العمل",
        skill3_stack: "<strong>التقنيات الأساسية:</strong> Linux / Unix Shell, Git & GitHub, VS Code, XAMPP, Jira, MySQL Workbench",
        skill3_item1: "التعامل مع بيئات Linux/Unix، وإدارة صلاحيات الملفات، وكتابة سكربتات Bash لأتمتة مهام العمل.",
        skill3_item2: "إدارة مستودعات الأكواد البرمجية، والفروع (Branches)، والتعاون الجماعي بكفاءة باستخدام Git و GitHub.",
        skill3_item3: "إعداد خوادم التطوير المحلية (XAMPP)، وتصميم مخططات قواعد البيانات في MySQL Workbench، وتنظيم مهام Agile Sprints عبر Jira.",

        skill4_title: "هندسة البرمجيات",
        skill4_stack: "<strong>التقنيات الأساسية:</strong> System Architecture, SRS Documentation, UML / DFD Modeling (Visual Paradigm), Problem Solving",
        skill4_item1: "تحليل متطلبات المشاريع وكتابة وثائق مواصفات متطلبات البرمجيات (SRS) بشكل متكامل.",
        skill4_item2: "تصميم معمارية الأنظمة، ومخططات Use Case، ومخططات Activity، ومخططات تدفق البيانات (DFDs) باستخدام Visual Paradigm.",
        skill4_item3: "تخطيط هيكلية قواعد البيانات الشاملة وتحويل المشكلات الواقعية إلى حلول تقنية منظمة.",

        projects_title: "معرض المشاريع",
        proj1_tag: "42 Amman • معسكر برمجي مكثف",
        proj1_desc: `إتمام المعسكر البرمجي المكثف لمدة 26 يوماً القائم على التعلم التشاركي والاختبارات المحددة بوقت:<br>
            <strong>• Unix &amp; Git:</strong> التنقل عبر سطر أوامر Linux CLI، وكتابة سكربتات Bash، وإدارة صلاحيات الملفات، وسير عمل Git.<br>
            <strong>• Low-Level C:</strong> بناء دوال مكتبة C القياسية من الصفر وفق قواعد Norminette الصارمة.<br>
            <strong>• Memory &amp; Pointers:</strong> إتقان التعامل مع المؤشرات (Pointers)، وتخصيص الذاكرة الديناميكي (<code>malloc</code>/<code>free</code>)، والهياكل (Structs).<br>
            <strong>• Algorithms &amp; Rushes:</strong> تطبيق الاستدعاء الذاتي (Recursion)، وخوارزميات الترتيب، وملفات Makefiles، ومشاريع Rush الجماعية.`,

        proj2_tag: "مشروع 42PiscineCyber",
        proj2_desc: `<strong>• Project 00 (Shell &amp; Git):</strong> التنقل عبر Linux CLI، وصلاحيات الملفات، وكتابة سكربتات Shell، وسير عمل Git.<br>
            <strong>• Project 01 (Semantic HTML):</strong> هيكلة النماذج، والجداول، والتدرج الهرمي المتوافق مع معايير الوصول.<br>
            <strong>• Project 02 (Modern CSS):</strong> تصميم واجهات متجاوبة باستخدام CSS3، و Flexbox، والمتغيرات المخصصة.<br>
            <strong>• Project 03 (JavaScript &amp; DOM):</strong> التفاعل من جهة المستخدم (Client-Side)، ومستمعات الأحداث (Event Listeners)، والتلاعب الديناميكي بـ DOM.`,

        proj3_tag: "مشروع مميز",
        proj3_title: "منصة CampusConnect",
        proj3_desc: "منصة ويب شاملة لإدارة الفعاليات الجامعية، تتضمن تسجيل الطلبة، وتتبع الفعاليات، والربط المتكامل مع قواعد البيانات العلائقية.",

        hobbies_title: "الهوايات والاهتمامات",
        hobby1_title: "🏍️ قيادة الدراجات النارية",
        hobby1_desc: "قيادة دراجتي النارية الرياضية في أنحاء الأردن، والاستمتاع بالتركيز والحرية والدقة الميكانيكية على الطريق.",
        hobby2_title: "📱 صناعة المحتوى التقني",
        hobby2_desc: "إدارة صفحة \"Life with a Software Engineer\" لمشاركة الروتين البرمجي اليومي، والحياة الجامعية، والأفكار التقنية.",
        hobby3_title: "🎮 الألعاب التنافسية وتحديات الـ CTF",
        hobby3_desc: "حل تحديات الأمن السيبراني (CTF)، والمشاركة في مسابقات البرمجة التنافسية، ولعب الألعاب التكتيكية وألعاب السباقات.",

        contact_title: "تواصل معي",
        contact_subtitle: "هل لديك سؤال أو ترغب في التعاون في مشروع؟ أرسل لي رسالة!",
        form_name_label: "الاسم الكامل",
        form_name_placeholder: "أدخل اسمك",
        form_email_label: "البريد الإلكتروني",
        form_message_label: "الرسالة",
        form_message_placeholder: "اكتب رسالتك هنا...",
        form_submit_btn: "إرسال الرسالة",

        footer_copy: "&copy; 2026 رامز أنور أبو رمضان.",
        footer_top: "العودة للأعلى ↑",

        theme_light: "☀️ الوضع النهاري",
        theme_dark: "🌙 الوضع الليلي",
        form_success: (name) => `شكراً لك يا ${name}! تم إرسال رسالتك بنجاح.`,
        form_error: "عذراً! حدثت مشكلة أثناء إرسال الرسالة.",
        form_network_error: "عذراً! حدث خطأ في الاتصال بالشبكة. يرجى المحاولة مرة أخرى."
    }
};

function updateThemeButtonText() {
    const isLightMode = bodyElement.classList.contains('light-theme');
    themeToggleBtn.textContent = isLightMode
        ? translations[currentLang].theme_dark
        : translations[currentLang].theme_light;
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);

    htmlElement.lang = lang;
    htmlElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    langToggleBtn.textContent = lang === 'ar' ? '🌐 EN' : '🌐 AR';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    updateThemeButtonText();
}

themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('light-theme');
    updateThemeButtonText();
});

langToggleBtn.addEventListener('click', () => {
    const nextLang = currentLang === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
});

skillCards.forEach((card) => {
    card.addEventListener('click', () => {
        card.classList.toggle('active-plan');
    });
});

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        return;
    }

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formFeedback.textContent = translations[currentLang].form_success(name);
            contactForm.reset();
        } else {
            formFeedback.textContent = translations[currentLang].form_error;
        }
    } catch (error) {
        formFeedback.textContent = translations[currentLang].form_network_error;
    }
});

// Initialize language on page load
setLanguage(currentLang);
