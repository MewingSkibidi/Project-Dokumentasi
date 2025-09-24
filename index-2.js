const postsHTML = posts.map(post => `
                    <article class="post-card">
                        <a href="/post/${post.id}" class="post-title">${post.title}</a>
                        <div class="post-meta">
                            <span>📅 ${formatDate(post.date)}</span> • 
                            <span>👤 ${post.author}</span> • 
                            <span>📂 ${post.category}</span>
                        </div>
                        <p class="post-excerpt">${post.excerpt}</p>
                        <div class="post-tags">
                            ${post.tags.map(tag => `<a href="/tag/${tag.toLowerCase()}" class="tag">${tag}</a>`).join('')}
                        </div>
                    </article>
                `).join('');