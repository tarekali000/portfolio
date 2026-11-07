/**
 * Tarek Mahmoud Ali — Software Engineer Portfolio
 * Interactive Architecture, Dynamic JSON Loaders, and Animation Engine
 */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// State management
let currentLang = 'en';
let projectsData = [];
let certificatesData = [];
let activeFilter = 'all';

// Fallback data in case JSON fetch fails under file:// protocol
const FALLBACK_PROJECTS = [
  {
    id: "auth-backend",
    title: "NestJS Authentication API",
    title_ar: "نظام مصادقة وتفويض متكامل بـ NestJS",
    category: "public",
    category_label: "PUBLIC REPOSITORY",
    category_label_ar: "مستودع عام",
    shortDescription: "JWT authentication backend with registration, login, dual token refresh cycle, protected routes, and Swagger.",
    shortDescription_ar: "نظام مصادقة متكامل مبني بـ NestJS يدعم توكنات الوصول والتحديث، حماية المسارات، وصلاحيات الأدوار مع توثيق Swagger.",
    fullDescription: "A production-grade authentication and authorization service built with NestJS, TypeScript, and MongoDB. Implements security best practices including Argon2 hashing, dual-token strategy (short-lived access tokens + rotatable HTTP-only refresh tokens), IP & rate-limiting guards, and role-based access control (RBAC). Comes with full Swagger documentation and automated tests.",
    fullDescription_ar: "خدمة مصادقة وتفويض جاهزة للبيئات الإنتاجية مبنية بـ NestJS و TypeScript و MongoDB. تطبق أعلى المعايير الأمنية بما في ذلك تشفير كلمات المرور بـ Argon2، وإدارة التوكن المزدوج (Access & Refresh Tokens)، وحماية الـ Rate Limiting، وصلاحيات الأدوار (RBAC)، مع توثيق تفاعلي كامل عبر Swagger.",
    features: [
      "Secure dual-token authentication (Access & Refresh tokens)",
      "Role-Based Access Control (RBAC) with granular decorators",
      "Automatic payload validation and sanitization using DTOs",
      "Rate limiting and brute force protection against credential attacks",
      "Interactive Swagger OpenAPI specification with sandbox testing"
    ],
    features_ar: [
      "نظام مصادقة متقدم بالتوكن المزدوج (Access & Refresh tokens)",
      "نظام صلاحيات متعدد المستويات (RBAC) باستخدام Decorators مخصصة",
      "تحقق وتطهير تلقائي للمدخلات عبر Data Transfer Objects (DTOs)",
      "حماية ضد هجمات القوة الغاشمة ومعدل الطلبات (Rate Limiting)",
      "واجهة Swagger OpenAPI تفاعلية لتجربة وفحص نقاط النهاية"
    ],
    stack: ["NestJS", "TypeScript", "MongoDB", "JWT", "Swagger", "Docker"],
    github: "https://github.com/tarekali000/auth-backend",
    demo: "https://github.com/tarekali000/auth-backend",
    media: {
      images: [
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
      ],
      video: ""
    }
  },
  {
    id: "url-short-backend",
    title: "NestJS URL Shortener API",
    title_ar: "واجهة برمجة تقصير الروابط الذكية بـ NestJS",
    category: "public",
    category_label: "PUBLIC REPOSITORY",
    category_label_ar: "مستودع عام",
    shortDescription: "High-throughput short-link service with custom vanity aliases, expiration, analytics tracking, and atomic counter updates.",
    shortDescription_ar: "نظام تقصير روابط عالي الكفاءة يتيح الأسماء المخصصة، تواريخ الانتهاء، وتحليلات فورية لعدد الزيارات.",
    fullDescription: "A scalable URL shortening and analytics engine built with NestJS, Prisma ORM, and SQLite/PostgreSQL. Supports custom vanity codes, auto-generated base62 hashes, link expiration dates, redirect caching, detailed click tracking (timestamps, user-agents, referrers), and atomic counter updates to prevent race conditions under load.",
    fullDescription_ar: "محرك تقصير الروابط والتحليلات الإحصائية المتقدم، تم بناؤه باستخدام NestJS و Prisma ORM. يتيح إنشاء روابط مخصصة (Vanity URLs) أو تشفير Base62 التلقائي، تحديد فترات الصلاحية، تخزين مؤقت للتحويل، وتتبع النقرات والمعلومات الإحصائية بدقة مع معالجة التزامن العالي.",
    features: [
      "Base62 hash collision resolution and custom alias validation",
      "Time-based link expiration with automated cleanup",
      "Detailed access analytics: click metrics, referrers, and device types",
      "Atomic database operations preventing race conditions",
      "Prisma schema with relational indexing for sub-millisecond lookup"
    ],
    features_ar: [
      "توليد أكواد Base62 فائقة السرعة مع منع التعارض والأسماء المخصصة",
      "إمكانية تعيين تاريخ انتهاء صلاحية للروابط مع معالجة ذكية",
      "تحليلات دقيقة: عدد النقرات، مصادر الزيارات، وأنواع الأجهزة",
      "عمليات ذرية (Atomic operations) لمنع تعارض البيانات تحت الضغط العالي",
      "فهرسة متطورة في قواعد البيانات تضمن استجابة بأجزاء من الثانية"
    ],
    stack: ["NestJS", "TypeScript", "Prisma", "SQLite", "REST APIs"],
    github: "https://github.com/tarekali000/url-short-backend",
    demo: "https://github.com/tarekali000/url-short-backend",
    media: {
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
      ],
      video: ""
    }
  },
  {
    id: "nestjs-file-storage-api",
    title: "NestJS File Storage API",
    title_ar: "نظام إدارة وتخزين الملفات الآمن بـ NestJS",
    category: "public",
    category_label: "PUBLIC REPOSITORY",
    category_label_ar: "مستودع عام",
    shortDescription: "User-scoped file storage with streaming downloads, SHA-256 checksum integrity, metadata tracking, and quotas.",
    shortDescription_ar: "نظام تخزين وإدارة ملفات آمن لكل مستخدم، يدعم التدفق المباشر (Streaming)، والتحقق من التجزئة SHA-256 وحساب المساحات.",
    fullDescription: "A robust storage microservice handling multi-part file uploads, MIME type validation, file sanitization, and SHA-256 integrity verification. Offers chunked streaming for large file downloads without consuming host memory, user storage quota calculations, and tokenized presigned download links.",
    fullDescription_ar: "خدمة مصغرة لتخزين وإدارة الملفات المتعددة، تشمل فحص نوع الملف (MIME Type)، تنقية الملفات المشبوهة، والتحقق التام من سلامة البيانات عبر تشفير SHA-256. توفر تنزيل الملفات عبر البث التدفقي (Chunked Streaming) لتوفير الذاكرة، مع حساب مساحات المستخدمين وتوليد روابط تنزيل مؤقتة وآمنة.",
    features: [
      "Chunked file streaming to handle large payloads efficiently",
      "SHA-256 checksum generation for duplicate detection and tamper prevention",
      "Strict MIME-type sniffing and file size enforcement",
      "User-scoped storage quotas and detailed space consumption metrics",
      "JWT-authenticated endpoints with granular download permissions"
    ],
    features_ar: [
      "بث الملفات الكبيرة بنظام الـ Chunks لعدم استهلاك ذاكرة الخادم",
      "توليد هاش SHA-256 لاكتشاف التكرارات وضمان سلامة الملفات",
      "فحص عميق لنوع الملف ومنع رفع الملفات الخبيثة أو المخالفة",
      "إدارة حصص التخزين لكل مستخدم وإحصائيات فورية للمساحة",
      "روابط تحميل محمية بنظام التوكن والصلاحيات المحددة"
    ],
    stack: ["NestJS", "TypeScript", "Prisma", "SQLite", "JWT", "Streams"],
    github: "https://github.com/tarekali000/nestjs-file-storage-api",
    demo: "https://github.com/tarekali000/nestjs-file-storage-api",
    media: {
      images: [
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
      ],
      video: ""
    }
  },
  {
    id: "arabic-nlp-ai",
    title: "Arabic Grammatical Analysis AI",
    title_ar: "نموذج الذكاء الاصطناعي للإعراب والتحليل النحوي العربي",
    category: "independent",
    category_label: "INDEPENDENT PROJECT",
    category_label_ar: "مشروع مستقل",
    shortDescription: "Transformer-based Arabic NLP model for word-level and sentence-level syntactic parsing and diacritization.",
    shortDescription_ar: "نموذج ذكاء اصطناعي يعتمد على المحولات (Transformers) للتحليل النحوي، الإعراب التفصيلي، والتشكيل التلقائي.",
    fullDescription: "A specialized Natural Language Processing system trained on Arabic grammatical corpuses. Leverages state-of-the-art transformer architectures fine-tuned with PyTorch and Hugging Face. Capable of parsing complex classical and modern Arabic sentences, identifying grammatical roles (I'rab), root extraction, and contextual tashkeel (diacritization).",
    fullDescription_ar: "نظام معالجة لغات طبيعية (NLP) متخصص ومدرّب على معاجم ومدونات النحو والإعراب العربي. تم بناؤه باستخدام بنيات Transformers الحديثة وتطويعها عبر PyTorch و Hugging Face. يقوم بإعراب الكلمات وتحديد موقعها الإعرابي، استخراج الجذور، والتشكيل الدقيق للسياق اللغوي العربي المعاصر والتراثي.",
    features: [
      "Fine-tuned Transformer pipeline for Arabic morpho-syntactic parsing",
      "Contextual sentence diacritization (Tashkeel) with high accuracy",
      "Word root and lemma extraction module",
      "RESTful inference endpoint for integration with web applications",
      "Benchmarked on complex Arabic linguistic test sets"
    ],
    features_ar: [
      "نموذج Transformer مدرب خصيصًا للإعراب والتحليل الصرفي والنحوي",
      "تشكيل النصوص التلقائي بدقة سياقية عالية مع مراعاة الحركات الإعرابية",
      "استخراج الجذور والوزن الصرفي للكلمات بدقة",
      "واجهة استدلال API لتوصيل النموذج بالتطبيقات والمنصات الخارجية",
      "تقييم واختبار النموذج على نصوص عربية كلاسيكية وحديثة معقدة"
    ],
    stack: ["Python", "PyTorch", "Hugging Face", "Transformers", "Qwen", "NLP"],
    github: "",
    demo: "",
    media: {
      images: [
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
      ],
      video: ""
    }
  },
  {
    id: "discord-codegen-ai",
    title: "Discord.js Code Generation Model",
    title_ar: "نموذج توليد أكواد بوتات Discord المتخصص",
    category: "independent",
    category_label: "INDEPENDENT PROJECT",
    category_label_ar: "مشروع مستقل",
    shortDescription: "Domain-specific language model fine-tuned for building Discord.js v14 bots with slash commands and event handlers.",
    shortDescription_ar: "نموذج ذكاء اصطناعي متخصص تم تدريبه لتوليد أكواد وبرمجيات بوتات Discord.js v14 مع معالجة الأحداث والأوامر.",
    fullDescription: "A domain-specialized LLM fine-tuned to generate accurate, idiomatically sound TypeScript and JavaScript code for Discord.js v14+. The training dataset was curated from official documentation, verified open-source bots, and custom synthetic instruction pairs to eliminate deprecated patterns and hallucinations.",
    fullDescription_ar: "نموذج لغوي مدرب على مهام محددة لتوليد أكواد TypeScript و JavaScript احترافية لمكتبة Discord.js v14 وما بعدها. تم إعداد بيانات التدريب وتنقيحها بعناية من التوثيق الرسمي ومشاريع البوتات المفتوحة المصدر للقضاء على الأنماط القديمة وإنتاج كود نظيف وسليم 100%.",
    features: [
      "Generates production-ready Discord slash commands and modal interactions",
      "Eliminates deprecated Discord.js v12/v13 syntax through curated training",
      "Understands rate limits, guild permissions, and voice channel gateways",
      "Integrates with TypeScript interfaces for type safety"
    ],
    features_ar: [
      "توليد أوامر سلاش (Slash Commands) ونوافذ التفاعل (Modals) بطريقة احترافية",
      "تجنب الأكواد القديمة وغير المدعومة من الإصدارات السابقة",
      "فهم كامل لآليات الـ Rate Limits وصلاحيات السيرفرات وإدارة القنوات الصوتية",
      "التوافق التام مع TypeScript للحصول على أكواد منيعة وخالية من الأخطاء"
    ],
    stack: ["Python", "PyTorch", "Transformers", "Code Generation", "TypeScript"],
    github: "",
    demo: "",
    media: {
      images: [
        "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
      ],
      video: ""
    }
  },
  {
    id: "pos-store-management",
    title: "POS & Store Management System",
    title_ar: "نظام إدارة نقاط البيع والمتاجر المتكامل (POS)",
    category: "independent",
    category_label: "INDEPENDENT PROJECT",
    category_label_ar: "مشروع مستقل",
    shortDescription: "Retail solution with inventory tracking, barcode/SKU scanning, invoicing, returns, and role-based permissions.",
    shortDescription_ar: "حل شامل للمبيعات والمخازن مع دعم قارئ الباركود، الفواتير الإلكترونية، المرتجعات، وإدارة الصلاحيات.",
    fullDescription: "A complete retail management and point-of-sale platform. Provides real-time inventory management with low-stock alerts, fast barcode scanning, multi-tier cashier and manager roles, thermal receipt printing, tax calculations, daily sales shifts, and detailed revenue reporting.",
    fullDescription_ar: "نظام متكامل لنقاط البيع وإدارة المتاجر والمخازن. يقدم إدارة فورية للمخزون مع تنبيهات عند اقتراب نفاد المنتجات، دعم قارئ الباركود السريع، فواتير إلكترونية متوافقة مع الطباعة الحرارية، ورديات الكاشير، وتقارير أرباح ومبيعات تفصيلية.",
    features: [
      "Sub-second barcode/SKU lookup and cart calculation",
      "Automated stock level deduction with low-inventory warnings",
      "Thermal printer invoice generation with customizable headers",
      "End-of-day shift reconciliation and cashier handover reporting",
      "Role-based permissions separating cashier actions from manager overrides"
    ],
    features_ar: [
      "بحث فوري عن المنتجات بالباركود وحساب الفواتير بسرعة فائقة",
      "خصم تلقائي من المخزن وتنبيهات فورية بالحد الأدنى للمخزون",
      "طباعة فواتير فورية متوافقة مع الطابعات الحرارية والـ QR Code",
      "إقفال ورديات الكاشير وتقارير تسوية الصندوق والمبيعات اليومية",
      "صلاحيات دقيقة تفصل بين مهام الكاشير وصلاحيات المدير والمشرف"
    ],
    stack: ["NestJS", "Prisma", "React", "MySQL", "TailwindCSS"],
    github: "",
    demo: "",
    media: {
      images: [
        "https://images.unsplash.com/photo-1556742049-0a67e557224d?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1200&q=80"
      ],
      video: ""
    }
  },
  {
    id: "electronic-library-platform",
    title: "Electronic Library Platform",
    title_ar: "منصة المكتبة الإلكترونية والوسائط المتعددة",
    category: "independent",
    category_label: "INDEPENDENT PROJECT",
    category_label_ar: "مشروع مستقل",
    shortDescription: "Digital content platform for indexing, streaming, and managing audiobooks, video lectures, and PDF resources.",
    shortDescription_ar: "منصة رقمية لتنظيم ومشاركة الكتب الإلكترونية، المقاطع الصوتية، والمحاضرات المرئية مع بحث متقدم.",
    fullDescription: "An interactive digital learning and content distribution platform. Supports categorized browsing of digital books, in-browser PDF reading, audio streaming with playback position memory, video chapter navigation, user bookmarks, and search indexed by metadata and authors.",
    fullDescription_ar: "منصة تعليمية ورقمية لإدارة وتوزيع المحتوى الثقافي والأكاديمي. تدعم قراءة الكتب والملفات مباشرة في المتصفح، الاستماع للكتب الصوتية مع حفظ موضع التشغيل، تصفح فصول المحاضرات المرئية، إضافة الإشارات المرجعية، ونظام بحث فوري حسب الكاتب والتصنيف.",
    features: [
      "In-browser responsive PDF viewer with page bookmarking",
      "Media streaming with resume-playback memory across sessions",
      "Instant fuzzy search across book titles, authors, and topics",
      "Admin dashboard for bulk file uploads and category management"
    ],
    features_ar: [
      "قارئ PDF مدمج ومتجاوب مع حفظ الصفحات والعلامات المرجعية",
      "مشغل وسائط صوتية ومرئية يحفظ آخر دقيقة تم التوقف عندها",
      "محرك بحث فوري وسلس عبر العناوين، أسماء المؤلفين، والتصنيفات",
      "لوحة تحكم إدارية لرفع الملفات وتنظيم الأقسام والمحتوى"
    ],
    stack: ["Node.js", "Express", "React", "MongoDB", "Cloud Storage"],
    github: "",
    demo: "",
    media: {
      images: [
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80"
      ],
      video: ""
    }
  },
  {
    id: "discord-ai-bot",
    title: "Discord.js AI Assistant Bot",
    title_ar: "بوت ديسكورد الذكي بالذكاء الاصطناعي",
    category: "independent",
    category_label: "INDEPENDENT PROJECT",
    category_label_ar: "مشروع مستقل",
    shortDescription: "AI Discord bot with prompt engineering, conversation memory, retries, and database synchronization.",
    shortDescription_ar: "بوت ذكاء اصطناعي تفاعلي على Discord يتميز بحفظ سياق المحادثة، معالجة الأخطاء الذكية، وربط قواعد البيانات.",
    fullDescription: "A feature-rich Discord bot built using TypeScript and Discord.js v14. Integrates with modern LLM APIs to deliver context-aware conversational assistance, automatic moderation, code snippet formatting, persistent user settings, and asynchronous background tasks.",
    fullDescription_ar: "بوت متطور لمنصة Discord مبني بأحدث إصدارات Discord.js و TypeScript. يتصل بنماذج الذكاء الاصطناعي لتقديم محادثات ذكية مع تذكر السياق، إدارة المحتوى الآلية، تنسيق وشرح الأكواد البرمجية، وحفظ إعدادات المستخدمين في MongoDB.",
    features: [
      "Sliding-window context memory for multi-turn conversations",
      "Exponential backoff and retry logic for API resilience",
      "Slash command handlers with ephemeral response options",
      "MongoDB persistence for user profiles, history, and guild configurations"
    ],
    features_ar: [
      "ذاكرة محادثة ذكية تحتفظ بسياق النقاش متعدد الردود",
      "معالجة متقدمة للأخطاء وإعادة المحاولة التلقائية عند انقطاع الاتصال",
      "أوامر سلاش حديثة مع استجابات خاصة ومؤقتة (Ephemeral Messages)",
      "تخزين بيانات السيرفرات والمستخدمين في MongoDB بأعلى كفاءة"
    ],
    stack: ["TypeScript", "Node.js", "Discord.js", "MongoDB", "Gemini API"],
    github: "",
    demo: "",
    media: {
      images: [
        "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
      ],
      video: ""
    }
  }
];

const FALLBACK_CERTIFICATES = [
  {
    id: "meta-backend-cert",
    title: "Meta Back-End Developer Professional Certificate",
    title_ar: "الشهادة الاحترافية لمطوّر الـ Back-End من Meta",
    issuer: "Meta / Coursera",
    issuer_ar: "شركة ميتا / كورسيرا",
    date: "2024",
    date_ar: "٢٠٢٤",
    credentialId: "META-BE-78921",
    credentialUrl: "https://coursera.org",
    badge: "★ Verified",
    badge_ar: "★ معتمدة",
    skills: ["Python", "Django", "APIs", "Git", "MySQL", "Data Structures"],
    description: "Comprehensive 9-course program covering Python, relational databases, REST APIs, microservices, containerization, and backend architecture.",
    description_ar: "برنامج تخصصي شامل من 9 دورات متقدمة يغطي بايثون، قواعد البيانات العلائقية، بناء الـ APIs، المعمارية الموزعة، وأفضل ممارسات هندسة البرمجيات.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "deeplearning-nlp-cert",
    title: "Natural Language Processing & Transformers Specialization",
    title_ar: "تخصص معالجة اللغات الطبيعية ونماذج المحولات (Transformers)",
    issuer: "DeepLearning.AI",
    issuer_ar: "معهد DeepLearning.AI",
    date: "2024",
    date_ar: "٢٠٢٤",
    credentialId: "DLAI-NLP-45019",
    credentialUrl: "https://deeplearning.ai",
    badge: "★ Verified",
    badge_ar: "★ معتمدة",
    skills: ["PyTorch", "Hugging Face", "Attention", "Transformers", "LLMs"],
    description: "Advanced training in sequence-to-sequence modeling, attention mechanisms, fine-tuning large language models, and tokenization techniques.",
    description_ar: "تدريب متقدم في نماذج تسلسل النصوص، آليات الانتباه (Attention Mechanisms)، التجهيز الدقيق لنماذج اللغات الكبيرة، وتطوير أنظمة الذكاء الاصطناعي اللغوية.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "nestjs-enterprise-cert",
    title: "NestJS Enterprise Microservices & Architecture",
    title_ar: "معمارية الأنظمة الموزعة والـ Microservices باستخدام NestJS",
    issuer: "NestJS Official",
    issuer_ar: "الأكاديمية الرسمية لـ NestJS",
    date: "2024",
    date_ar: "٢٠٢٤",
    credentialId: "NEST-ARCH-99201",
    credentialUrl: "https://courses.nestjs.com",
    badge: "★ Certified",
    badge_ar: "★ معتمدة",
    skills: ["NestJS", "TypeScript", "Microservices", "RabbitMQ", "Redis", "Prisma"],
    description: "Enterprise-level architecture covering domain-driven design, message brokers, caching strategies, CQRS patterns, and security best practices.",
    description_ar: "تخصص هندسي معتمد في تصميم الأنظمة واسعة النطاق، وسائط الرسائل السريعة، استراتيجيات التخزين المؤقت، وأنماط التصميم المتقدمة.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "fullstack-cert",
    title: "Full-Stack Development with TypeScript & React",
    title_ar: "تطوير الويب الشامل بـ TypeScript و React",
    issuer: "FreeCodeCamp & Open Source",
    issuer_ar: "منظمة FreeCodeCamp",
    date: "2023",
    date_ar: "٢٠٢٣",
    credentialId: "FCC-FULLSTACK-3312",
    credentialUrl: "https://freecodecamp.org",
    badge: "★ Verified",
    badge_ar: "★ معتمدة",
    skills: ["TypeScript", "React", "Node.js", "Express", "RESTful APIs"],
    description: "Mastery of end-to-end full-stack development, modern component lifecycles, state management, and production deployment workflows.",
    description_ar: "إتقان بناء تطبيقات الويب المتكاملة من الواجهات الأمامية التفاعلية إلى الخوادم السريعة وإدارة قواعد البيانات ونشر التطبيقات.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "algorithms-cert",
    title: "Data Structures & Advanced Problem Solving",
    title_ar: "تراكيب البيانات وحل المشكلات البرمجية المتقدمة",
    issuer: "HackerRank / LeetCode",
    issuer_ar: "منصة HackerRank العالمية",
    date: "2023",
    date_ar: "٢٠٢٣",
    credentialId: "HR-ALGO-GOLD",
    credentialUrl: "https://hackerrank.com",
    badge: "★ Gold Badge",
    badge_ar: "★ الشارة الذهبية",
    skills: ["Algorithms", "Data Structures", "Dynamic Programming", "Graphs", "Complexity"],
    description: "Certification validating high proficiency in graph algorithms, dynamic programming, tree traversals, and optimal space-time complexity analysis.",
    description_ar: "شهادة تثبت الكفاءة العالية في خوارزميات الرسوم البيانية، البرمجة الديناميكية، وتحليل الكفاءة الزمنية والمكانية للخوارزميات المعقدة.",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "docker-devops-cert",
    title: "Docker, Containerization & CI/CD Pipelines",
    title_ar: "الحاويات الافتراضية بـ Docker وخطوط النشر المؤتمت CI/CD",
    issuer: "Linux Foundation & DevOps Institute",
    issuer_ar: "مؤسسة لينكس و DevOps Institute",
    date: "2023",
    date_ar: "٢٠٢٣",
    credentialId: "DKR-OPS-1149",
    credentialUrl: "https://docker.com",
    badge: "★ Verified",
    badge_ar: "★ معتمدة",
    skills: ["Docker", "Docker Compose", "CI/CD", "GitHub Actions", "Nginx"],
    description: "Containerizing multi-tier applications, composing multi-container microservice environments, and automating test and deploy pipelines.",
    description_ar: "بناء وتشغيل حاويات التطبيقات المتعددة عبر Docker، إعداد شبكات الخوادم، وأتمتة عمليات الفحص والنشر التلقائي عبر GitHub Actions.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80"
  }
];

// ==========================================================================
// 1. Boot Screen Terminal Sequence
// ==========================================================================
const boot = $('#bootScreen');
const shell = $('#siteShell');
const bar = $('#progressBar');
const pct = $('#bootPercent');
const statusElem = $('#bootStatus');
const line = $('#bootLine');

const bootLines = [
  'Loading profile components...',
  'Connecting GitHub public API...',
  'Loading projects and verified credentials...',
  'Compiling interface and animations...'
];

let progress = 0;
let lineIndex = 0;

const bootTimer = setInterval(() => {
  progress = Math.min(100, progress + Math.ceil(Math.random() * 11));

  if (bar) bar.style.width = progress + '%';
  if (pct) pct.textContent = String(progress).padStart(2, '0') + '%';

  if (progress > 24 && lineIndex === 0) {
    lineIndex = 1;
    if (line) line.textContent = bootLines[1];
  }

  if (progress > 52 && lineIndex === 1) {
    lineIndex = 2;
    if (line) line.textContent = bootLines[2];
  }

  if (progress > 78 && lineIndex === 2) {
    lineIndex = 3;
    if (line) line.textContent = bootLines[3];
  }

  if (progress >= 100) {
    clearInterval(bootTimer);
    if (statusElem) statusElem.textContent = 'READY';

    setTimeout(() => {
      if (boot) boot.classList.add('done');
      if (shell) shell.classList.add('ready');
      startTyping();
      initScrollCounters();
    }, 300);
  }
}, 90);

// ==========================================================================
// 2. Typing Animation
// ==========================================================================
const roles = [
  'Backend Software Engineer',
  'API Architect & Microservices',
  'Full-Stack Developer',
  'AI / ML & NLP Developer'
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function startTyping() {
  const target = $('#typedRole');
  if (!target) return;

  function tick() {
    const word = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    target.textContent = word.slice(0, charIndex);

    let delay = deleting ? 30 : 65;

    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1600;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(tick, delay);
  }

  tick();
}

// Year in footer
const yearElem = $('#year');
if (yearElem) {
  yearElem.textContent = new Date().getFullYear();
}

// ==========================================================================
// 3. Theme Toggle
// ==========================================================================
const themeToggle = $('#themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.dataset.theme !== 'light';
    document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
    themeToggle.textContent = isLight ? '☀' : '◐';
  });
}

// ==========================================================================
// 4. Mobile Menu Navigation
// ==========================================================================
const menuToggle = $('#menuToggle');
const nav = $('#nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

$$('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (nav) nav.classList.remove('open');
  });
});

// ==========================================================================
// 5. Language Switching (English / Arabic)
// ==========================================================================
const langToggle = $('#langToggle');

function updateLanguage(newLang) {
  currentLang = newLang;
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

  if (langToggle) {
    langToggle.textContent = currentLang === 'en' ? 'AR' : 'EN';
  }

  $$('[data-en]').forEach((el) => {
    const translation = el.dataset[currentLang];
    if (translation !== undefined) {
      el.innerHTML = translation;
    }
  });

  // Re-render projects and certificates with new language
  renderProjects();
  renderCertificates();
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    updateLanguage(currentLang === 'en' ? 'ar' : 'en');
  });
}

// ==========================================================================
// 6. Data Fetching from JSON
// ==========================================================================
async function loadData() {
  try {
    const [pRes, cRes] = await Promise.all([
      fetch('data/projects.json'),
      fetch('data/certificates.json')
    ]);

    if (pRes.ok) {
      projectsData = await pRes.json();
    } else {
      projectsData = FALLBACK_PROJECTS;
    }

    if (cRes.ok) {
      certificatesData = await cRes.json();
    } else {
      certificatesData = FALLBACK_CERTIFICATES;
    }
  } catch (err) {
    console.warn('Loading fallback data due to local/fetch error:', err);
    projectsData = FALLBACK_PROJECTS;
    certificatesData = FALLBACK_CERTIFICATES;
  }

  renderProjects();
  renderCertificates();
  initTiltCards();
  observeVisibleElements();
}

// ==========================================================================
// 7. Render Projects & Filter Logic
// ==========================================================================
const projectsGrid = $('#projectsGrid');

function renderProjects() {
  if (!projectsGrid) return;
  projectsGrid.innerHTML = '';

  const isAr = currentLang === 'ar';

  const filtered = projectsData.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  filtered.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card tilt-card';
    card.dataset.kind = project.category;
    card.dataset.id = project.id;
    card.style.animationDelay = `${index * 0.08}s`;

    const title = isAr && project.title_ar ? project.title_ar : project.title;
    const catLabel = isAr && project.category_label_ar ? project.category_label_ar : project.category_label;
    const shortDesc = isAr && project.shortDescription_ar ? project.shortDescription_ar : project.shortDescription;
    const detailsBtnText = isAr ? 'تفاصيل ومعاينة ↗' : 'View Details ↗';
    const repoBtnText = isAr ? 'الكود ↗' : 'Repo ↗';

    card.innerHTML = `
      <div class="project-top">
        <span class="project-type">${catLabel}</span>
        <span class="project-expand-icon" title="View details">⤢</span>
      </div>
      <h3>${title}</h3>
      <p>${shortDesc}</p>
      <div class="project-stack">${project.stack.slice(0, 4).join(' · ')}</div>
      <div class="project-card-footer">
        <button class="card-action-btn" type="button">${detailsBtnText}</button>
        ${project.github ? `<a class="card-repo-link" href="${project.github}" target="_blank" rel="noreferrer" onclick="event.stopPropagation()">${repoBtnText}</a>` : ''}
      </div>
    `;

    // Click anywhere on the card to open details modal
    card.addEventListener('click', () => {
      openProjectModal(project);
    });

    projectsGrid.appendChild(card);
  });

  initTiltCards();
  observeVisibleElements();
}

// Setup Project Filters
$$('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    $$('.filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    activeFilter = button.dataset.filter;
    renderProjects();
  });
});

// ==========================================================================
// 8. Render Certificates
// ==========================================================================
const certificatesGrid = $('#certificatesGrid');
const certCountElem = $('#certCount');

function renderCertificates() {
  if (!certificatesGrid) return;
  certificatesGrid.innerHTML = '';

  const isAr = currentLang === 'ar';
  if (certCountElem) certCountElem.textContent = certificatesData.length;

  certificatesData.forEach((cert, index) => {
    const card = document.createElement('article');
    card.className = 'cert-card tilt-card';
    card.style.animationDelay = `${index * 0.08}s`;

    const title = isAr && cert.title_ar ? cert.title_ar : cert.title;
    const issuer = isAr && cert.issuer_ar ? cert.issuer_ar : cert.issuer;
    const desc = isAr && cert.description_ar ? cert.description_ar : cert.description;
    const badge = isAr && cert.badge_ar ? cert.badge_ar : cert.badge;
    const date = isAr && cert.date_ar ? cert.date_ar : cert.date;
    const verifyText = isAr ? 'التحقق من الشهادة ↗' : 'Verify Credential ↗';

    card.innerHTML = `
      <div class="cert-header">
        <span class="cert-badge">${badge}</span>
        <span class="cert-year">${date}</span>
      </div>
      <div class="cert-issuer-row">
        <div class="cert-issuer-icon">◈</div>
        <span class="cert-issuer-name">${issuer}</span>
      </div>
      <h3>${title}</h3>
      <p class="cert-desc">${desc}</p>
      <div class="tags cert-skills">
        ${cert.skills.map((s) => `<span>${s}</span>`).join('')}
      </div>
      <div class="cert-footer">
        <a class="cert-verify-btn" href="${cert.credentialUrl}" target="_blank" rel="noreferrer">
          ${verifyText}
        </a>
        <span class="cert-id-tag">ID: ${cert.credentialId}</span>
      </div>
    `;

    certificatesGrid.appendChild(card);
  });

  initTiltCards();
  observeVisibleElements();
}

// ==========================================================================
// 9. Project Details Modal (with Media, Video & Features)
// ==========================================================================
const modal = $('#projectModal');
const modalBackdrop = $('#modalBackdrop');
const modalClose = $('#modalClose');
const modalCategory = $('#modalCategory');
const modalIdTag = $('#modalIdTag');
const modalTitle = $('#modalTitle');
const modalSubtitle = $('#modalSubtitle');
const modalMediaWrapper = $('#modalMediaWrapper');
const modalFullDesc = $('#modalFullDesc');
const modalFeaturesList = $('#modalFeaturesList');
const modalStackTags = $('#modalStackTags');
const modalRepoBtn = $('#modalRepoBtn');
const modalDemoBtn = $('#modalDemoBtn');

function openProjectModal(project) {
  if (!modal) return;

  const isAr = currentLang === 'ar';

  const title = isAr && project.title_ar ? project.title_ar : project.title;
  const categoryLabel = isAr && project.category_label_ar ? project.category_label_ar : project.category_label;
  const shortDesc = isAr && project.shortDescription_ar ? project.shortDescription_ar : project.shortDescription;
  const fullDesc = isAr && project.fullDescription_ar ? project.fullDescription_ar : project.fullDescription;
  const features = isAr && project.features_ar ? project.features_ar : project.features;

  if (modalCategory) modalCategory.textContent = categoryLabel;
  if (modalIdTag) modalIdTag.textContent = `#${project.id}`;
  if (modalTitle) modalTitle.textContent = title;
  if (modalSubtitle) modalSubtitle.textContent = shortDesc;
  if (modalFullDesc) modalFullDesc.textContent = fullDesc;

  // Features list
  if (modalFeaturesList) {
    modalFeaturesList.innerHTML = '';
    if (features && features.length > 0) {
      features.forEach((feat) => {
        const li = document.createElement('li');
        li.textContent = feat;
        modalFeaturesList.appendChild(li);
      });
    }
  }

  // Tech stack
  if (modalStackTags) {
    modalStackTags.innerHTML = '';
    project.stack.forEach((tech) => {
      const tag = document.createElement('span');
      tag.textContent = tech;
      modalStackTags.appendChild(tag);
    });
  }

  // Media rendering: Video or Image Gallery
  if (modalMediaWrapper) {
    modalMediaWrapper.innerHTML = '';

    if (project.media && project.media.video) {
      // Video display
      const isYouTube = project.media.video.includes('youtube.com') || project.media.video.includes('youtu.be');
      if (isYouTube) {
        modalMediaWrapper.innerHTML = `
          <div class="media-video-container">
            <iframe src="${project.media.video}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        `;
      } else {
        modalMediaWrapper.innerHTML = `
          <div class="media-video-container">
            <video controls autoplay muted playsinline poster="${project.media.images ? project.media.images[0] : ''}">
              <source src="${project.media.video}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        `;
      }
    } else if (project.media && project.media.images && project.media.images.length > 0) {
      // Image gallery
      const mainImg = document.createElement('img');
      mainImg.className = 'media-gallery-main';
      mainImg.src = project.media.images[0];
      mainImg.alt = title;

      modalMediaWrapper.appendChild(mainImg);

      if (project.media.images.length > 1) {
        const thumbsContainer = document.createElement('div');
        thumbsContainer.className = 'media-gallery-thumbs';

        project.media.images.forEach((imgUrl, idx) => {
          const thumb = document.createElement('img');
          thumb.className = `media-thumb ${idx === 0 ? 'active' : ''}`;
          thumb.src = imgUrl;
          thumb.alt = `Screenshot ${idx + 1}`;

          thumb.addEventListener('click', () => {
            mainImg.src = imgUrl;
            thumbsContainer.querySelectorAll('.media-thumb').forEach((t) => t.classList.remove('active'));
            thumb.classList.add('active');
          });

          thumbsContainer.appendChild(thumb);
        });

        modalMediaWrapper.appendChild(thumbsContainer);
      }
    } else {
      modalMediaWrapper.style.display = 'none';
    }
  }

  // Action buttons
  if (modalRepoBtn) {
    if (project.github) {
      modalRepoBtn.href = project.github;
      modalRepoBtn.style.display = 'inline-flex';
    } else {
      modalRepoBtn.style.display = 'none';
    }
  }

  if (modalDemoBtn) {
    if (project.demo && project.demo !== project.github) {
      modalDemoBtn.href = project.demo;
      modalDemoBtn.style.display = 'inline-flex';
    } else {
      modalDemoBtn.style.display = 'none';
    }
  }

  // Open modal with smooth spring
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  // Stop video playback if any
  if (modalMediaWrapper) {
    const video = modalMediaWrapper.querySelector('video');
    if (video) video.pause();
    const iframe = modalMediaWrapper.querySelector('iframe');
    if (iframe) iframe.src = iframe.src;
  }
}

if (modalClose) modalClose.addEventListener('click', closeProjectModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeProjectModal();
  }
});

// ==========================================================================
// 10. ANIMATIONS ENGINE (Particle Canvas, 3D Tilt, Ripple, Glow)
// ==========================================================================

// A. Ambient Interactive Particle Canvas
const canvas = $('#ambientCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 42;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.15;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(141, 255, 189, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(105, 215, 255, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();
}

// B. Cursor Spotlight Glow Follower
const cursorGlow = $('#cursorGlow');
if (cursorGlow) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursorGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    cursorGlow.style.left = `${currentX}px`;
    cursorGlow.style.top = `${currentY}px`;
    requestAnimationFrame(renderCursorGlow);
  }
  renderCursorGlow();
}

// C. 3D Tilt Effect on Cards
function initTiltCards() {
  const cards = $$('.tilt-card');
  cards.forEach((card) => {
    card.removeEventListener('mousemove', handleCardMouseMove);
    card.removeEventListener('mouseleave', handleCardMouseLeave);

    card.addEventListener('mousemove', handleCardMouseMove);
    card.addEventListener('mouseleave', handleCardMouseLeave);
  });
}

function handleCardMouseMove(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -7;
  const rotateY = ((x - centerX) / centerX) * 7;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
}

function handleCardMouseLeave(e) {
  const card = e.currentTarget;
  card.style.transform = '';
}

// D. Animated Number Counters
let countersTriggered = false;
function initScrollCounters() {
  const stats = $$('[data-counter]');
  if (stats.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !countersTriggered) {
        countersTriggered = true;
        stats.forEach((counter) => {
          const target = parseInt(counter.dataset.counter, 10);
          if (isNaN(target)) return;

          let count = 0;
          const duration = 1500;
          const step = Math.max(1, Math.floor(target / (duration / 30)));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = count;
            }
          }, 30);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = $('.stats-grid');
  if (statsSection) observer.observe(statsSection);
}

// E. Scroll Stagger Reveal
function observeVisibleElements() {
  if (!('IntersectionObserver' in window)) return;

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  $$('.skill-card, .project-card, .cert-card, .stat').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s, box-shadow 0.25s';
    revealObserver.observe(el);
  });
}

// Global style for visible class
const style = document.createElement('style');
style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// ==========================================================================
// 11. Live GitHub API Integration
// ==========================================================================
async function loadGithub() {
  const note = $('#apiNote');
  const avatar = $('#githubAvatar');
  const repoCount = $('#repoCount');
  const followerCount = $('#followerCount');

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch('https://api.github.com/users/tarekali000'),
      fetch('https://api.github.com/users/tarekali000/repos?per_page=100&sort=updated')
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error('GitHub API unavailable');
    }

    const user = await userResponse.json();
    const repos = await reposResponse.json();

    if (avatar && user.avatar_url) {
      avatar.src = user.avatar_url;
    }

    if (repoCount && user.public_repos !== undefined) {
      repoCount.textContent = user.public_repos;
      repoCount.dataset.counter = user.public_repos;
    }

    if (followerCount && user.followers !== undefined) {
      followerCount.textContent = user.followers;
      followerCount.dataset.counter = user.followers;
    }

    if (note) {
      note.innerHTML =
        '<span class="status-dot"></span> Live GitHub data loaded · ' +
        repos.length +
        ' public repositories retrieved.';
    }
  } catch (error) {
    console.error('GitHub API error:', error);
    if (note) {
      note.innerHTML =
        '<span class="status-dot"></span> GitHub live data is temporarily unavailable. Profile links and verified projects remain accessible.';
    }
  }
}

// Initialize on page load
loadData();
loadGithub();
