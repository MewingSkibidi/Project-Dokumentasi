 // Theme Management
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;

        // Load saved theme or default to dark
        const savedTheme = 'dark'; 
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            themeIcon.textContent = theme === 'dark' ? '😎' : '🤓';
        }

        // Simulasi Database Backend
        const blogData = {
            posts: [
                {
                    id: 1,
                    title: "CSS Grid Layout - Panduan Lengkap untuk Pemula",
                    excerpt: "Pelajari cara menggunakan CSS Grid Layout untuk membuat tata letak web yang responsif dan modern. Tutorial lengkap dengan contoh praktis.",
                    content: "CSS Grid Layout adalah sistem tata letak dua dimensi yang powerful...",
                    category: "CSS",
                    tags: ["CSS", "Grid", "Layout", "Responsive"],
                    date: "2024-01-15",
                    author: "SabilSigma"
                },
                {
                    id: 2,
                    title: "Flexbox CSS - Mengatur Layout dengan Mudah",
                    excerpt: "Menguasai CSS Flexbox untuk membuat layout yang fleksibel dan responsif. Dari dasar hingga teknik advanced.",
                    content: "CSS Flexbox adalah metode layout satu dimensi yang sangat berguna...",
                    category: "CSS",
                    tags: ["CSS", "Flexbox", "Layout"],
                    date: "2024-01-14",
                    author: "SabilSigma"
                },
                {
                    id: 3,
                    title: "CSS Animation - Membuat Animasi Web yang Menarik",
                    excerpt: "Tutorial lengkap CSS Animation dan Transition untuk membuat website yang interaktif dan menarik.",
                    content: "CSS Animation memungkinkan kita membuat efek visual yang menarik...",
                    category: "CSS",
                    tags: ["CSS", "Animation", "Transition"],
                    date: "2024-01-13",
                    author: "SabilSigma"
                },
                {
                    id: 4,
                    title: "CSS Selectors - Memilih Element dengan Tepat",
                    excerpt: "Panduan lengkap CSS Selectors dari basic hingga advanced. Pelajari cara memilih element HTML dengan efisien.",
                    content: "CSS Selectors adalah cara kita memilih element HTML untuk diberi style...",
                    category: "CSS",
                    tags: ["CSS", "Selectors", "HTML"],
                    date: "2024-01-12",
                    author: "SabilSigma"
                },
                {
                    id: 5,
                    title: "Responsive Web Design dengan CSS Media Queries",
                    excerpt: "Belajar membuat website yang responsif menggunakan CSS Media Queries. Teknik dan best practices.",
                    content: "Media Queries adalah fitur CSS yang memungkinkan kita menerapkan style berbeda...",
                    category: "CSS",
                    tags: ["CSS", "Responsive", "Media Queries"],
                    date: "2024-01-11",
                    author: "SabilSigma"
                },
                {
                    id: 6,
                    title: "CSS Variables - Menggunakan Custom Properties",
                    excerpt: "Pelajari cara menggunakan CSS Variables atau Custom Properties untuk menulis CSS yang lebih maintainable.",
                    content: "CSS Variables memungkinkan kita menyimpan nilai yang dapat digunakan berulang...",
                    category: "CSS",
                    tags: ["CSS", "Variables", "Custom Properties"],
                    date: "2024-01-10",
                    author: "SabilSigma"
                },
                {
                    id: 7,
                    title: "Portofolio - Website",
                    excerpt: "Membuat portofolio online yang menarik dengan HTML, CSS, dan JavaScript. Contoh dan tips untuk menampilkan karya Anda.",
                    content: "Dalam tutorial ini, kita akan membahas cara membuat portofolio online yang menarik...",
                    category: "Web Development",
                    tags: ["HTML", "CSS", "JavaScript", "Portofolio"],
                    date: "2025-06-21",
                    author: "SabilSigma"
                },
                {
                    id: 8,
                    title: "Margin - Mengatur Ruang di Sekitar Elemen",
                    excerpt: "Pelajari cara menggunakan margin dalam CSS untuk mengatur ruang di sekitar elemen.",
                    content: "Margin adalah ruang di luar batas elemen. Dalam tutorial ini, kita akan membahas cara menggunakan margin...",
                    category: "CSS",
                    tags: ["CSS", "Margin"],
                    date: "2025-09-03",
                    author: "SabilSigma"
                }
            ],
            categories: [
                { name: "CSS", count: 6, slug: "css" },
                { name: "HTML", count: 2, slug: "html" },
                { name: "JavaScript", count: 1, slug: "javascript" },
                { name: "Responsive Design", count: 2, slug: "responsive" },
                { name: "Web Development", count: 0, slug: "webdev" },
                { name: "Portofolio Website", count: 1, slug: "portofolio" },
                { name: "Margin", count: 1, slug: "margin" }
            ],
            tags: ["CSS", "HTML", "JavaScript", "Responsive", "Grid", "Flexbox", "Animation", "Layout", "Selectors", "Variables", "Media Queries", "Portofolio", "Margin"]
        };

        // State Management
        let currentPosts = [...blogData.posts];
        let currentCategory = 'css';
        let searchQuery = '';

        // DOM Elements
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const postsContainer = document.getElementById('postsContainer');
        const categoryList = document.getElementById('categoryList');
        const recentPosts = document.getElementById('recentPosts');
        const popularTags = document.getElementById('popularTags');
        const loading = document.getElementById('loading');
        const noResults = document.getElementById('noResults');

        // Event Listeners
        hamburger.addEventListener('click', toggleMobileMenu);
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performSearch();
        });

        // Initialize App
        document.addEventListener('DOMContentLoaded', function() {
            loadPosts();
            loadCategories();
            loadRecentPosts();
            loadPopularTags();
        });

        // Functions
        function toggleMobileMenu() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        }

        function showLoading() {
            loading.style.display = 'block';
            postsContainer.innerHTML = '';
            noResults.style.display = 'none';
        }

        function hideLoading() {
            loading.style.display = 'none';
        }

    function loadPosts(posts = currentPosts) {
    showLoading();

    setTimeout(() => {
        hideLoading();

        if (posts.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        const customLinks = {
            "CSS Grid Layout - Panduan Lengkap untuk Pemula": "2.html",
            "Flexbox CSS - Mengatur Layout dengan Mudah": "3.html",
            "CSS Selectors - Memilih Element dengan Tepat": "selector.html",
            "CSS Animation - Membuat Animasi Web yang Menarik": "animation.html",
            "Portofolio - Website": "portofolio.html",
            "Responsive Web Design dengan CSS Media Queries": "responsive.html",
            "CSS Variables - Menggunakan Custom Properties": "variables.html",
            "CSS Margin - Mengatur Ruang di Sekitar Elemen": "margin.html"
        };

        const postsHTML = posts.map(post => {
            const customHref = customLinks[post.title];
            const link = customHref
                ? `<a href="${customHref}" class="post-title">${post.title}</a>`
                : `<a href="/post/${post.id}" class="post-title">${post.title}</a>`;

            return `
                <article class="post-card">
                    ${link}
                    <div class="post-meta">
                        <span><i class='bx bxs-calendar' style='color:#ffffff' ></i>${formatDate(post.date)}</span> • 
                        <span><i class='bx bx-user' style='color:#ffffff' ></i>${post.author}</span> • 
                        <span><i class='bx bx-folder' style='color:#ffffff' ></i>${post.category}</span>
                    </div>
                    <p class="post-excerpt">${post.excerpt}</p>
                    <div class="post-tags">
                        ${post.tags.map(tag => `<a href="/tag/${tag.toLowerCase()}" class="tag">${tag}</a>`).join('')}
                    </div>
                </article>
            `;
        }).join('');

        postsContainer.innerHTML = postsHTML;
    }, 500);
}


        function loadCategories() {
            const categoriesHTML = blogData.categories.map(category => `
                <li>
                    <a href="/category/${category.slug}" onclick="filterByCategory('${category.slug}'); return false;">
                        ${category.name}
                        <span class="post-count">${category.count}</span>
                    </a>
                </li>
            `).join('');
            categoryList.innerHTML = categoriesHTML;
        }

        function loadRecentPosts() {
            const recentPostsHTML = blogData.posts.slice(0, 5).map(post => `
                <li>
                    <a href="/post/${post.id}" style="justify-content: flex-start;">
                        ${post.title.substring(0, 50)}${post.title.length > 50 ? '...' : ''}
                    </a>
                </li>
            `).join('');
            recentPosts.innerHTML = recentPostsHTML;
        }

        function loadPopularTags() {
            const tagsHTML = blogData.tags.map(tag => `
                <a href="/tag/${tag.toLowerCase()}" class="tag" onclick="filterByTag('${tag}'); return false;">${tag}</a>
            `).join('');
            popularTags.innerHTML = tagsHTML;
        }

        function performSearch() {
            searchQuery = searchInput.value.trim().toLowerCase();
            
            if (searchQuery === '') {
                currentPosts = [...blogData.posts];
            } else {
                currentPosts = blogData.posts.filter(post => 
                    post.title.toLowerCase().includes(searchQuery) ||
                    post.excerpt.toLowerCase().includes(searchQuery) ||
                    post.tags.some(tag => tag.toLowerCase().includes(searchQuery))
                );
            }
            
            loadPosts(currentPosts);
            
            // Update page title
            const pageTitle = document.querySelector('.page-title');
            if (searchQuery) {
                pageTitle.textContent = `Hasil pencarian: "${searchQuery}"`;
            } else {
                pageTitle.textContent = 'Tutorial CSS';
            }
        }

        function filterByCategory(categorySlug) {
            currentCategory = categorySlug;
            
            if (categorySlug === 'css') {
                currentPosts = blogData.posts.filter(post => 
                    post.category.toLowerCase() === 'css'
                );
            } else {
                // Simulasi filter kategori lain
                currentPosts = blogData.posts.filter(post => 
                    post.tags.some(tag => tag.toLowerCase().includes(categorySlug))
                );
            }
            
            loadPosts(currentPosts);
            
            // Update page title
            const pageTitle = document.querySelector('.page-title');
            const categoryName = blogData.categories.find(cat => cat.slug === categorySlug)?.name || categorySlug;
            pageTitle.textContent = `Tutorial ${categoryName}`;
            
            // Close mobile menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }

        function filterByTag(tag) {
            currentPosts = blogData.posts.filter(post => 
                post.tags.includes(tag)
            );
            
            loadPosts(currentPosts);
            
            // Update page title
            const pageTitle = document.querySelector('.page-title');
            pageTitle.textContent = `Tutorial dengan tag: ${tag}`;
        }

        function formatDate(dateString) {
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            };
            return new Date(dateString).toLocaleDateString('id-ID', options);
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        // Smooth scroll for internal links
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });