document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink);

  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
  // AI Chat
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');
  const chatHistory = document.getElementById('chatHistory');
  const newChatBtn = document.getElementById('newChatBtn');

  const aiResponses = {
    'react': "React is a JavaScript library for building user interfaces. It uses a component-based architecture where you break your UI into reusable pieces.\n\nKey concepts:\n- <code>useState</code> for state management\n- <code>useEffect</code> for side effects\n- <code>useContext</code> for global state\n- Virtual DOM for efficient updates\n\nHooks let you use state and lifecycle features in function components without writing classes.",
    'python': "Here's a Python function to sort a list:\n\n<code>def sort_list(items, reverse=False):\n    return sorted(items, key=lambda x: x, reverse=reverse)</code>\n\nYou can also use:\n- <code>list.sort()</code> — sorts in place\n- <code>sorted(list)</code> — returns a new sorted list\n- Custom key functions for complex sorting",
    'css': "Best practices for CSS:\n\n1. **Use CSS Custom Properties** for theming and consistency\n2. **Mobile-first approach** — start with base styles, add complexity\n3. **BEM naming** — <code>block__element--modifier</code>\n4. **Flexbox/Grid** for layouts — avoid floats\n5. **Avoid !important** — use specificity instead\n6. **Use rem/em</code> over px for scalability\n7. **Minimize reflows** — batch DOM reads before writes",
    'hello': "Hello! I'm Junaid Bhatti's AI assistant demo. I'm here to showcase the chat interface I built. Try asking about React, Python, or CSS!",
    'who': "I'm a demo AI assistant built by Junaid Bhatti, a web developer from Lahore, Pakistan. This chat interface is one of his portfolio projects showcasing modern UI design.",
    'default': "That's a great question! As a demo AI assistant, I can help with:\n\n- **Web Development** — React, CSS, JavaScript\n- **Programming** — Python, algorithms, data structures\n- **Design** — UI/UX principles, responsive design\n\nTry asking me about a specific topic for a more detailed response!"
  };

  function getAIResponse(msg) {
    const lower = msg.toLowerCase();
    if (lower.includes('react') || lower.includes('hook')) return aiResponses.react;
    if (lower.includes('python') || lower.includes('sort') || lower.includes('function')) return aiResponses.python;
    if (lower.includes('css') || lower.includes('style') || lower.includes('best practice')) return aiResponses.css;
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return aiResponses.hello;
    if (lower.includes('who') || lower.includes('about you') || lower.includes('your')) return aiResponses.who;
    return aiResponses.default;
  }

  function addMessage(text, type) {
    const welcome = chatMessages.querySelector('.chat-welcome');
    if (welcome) welcome.remove();

    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;

    const icon = document.createElement('div');
    icon.className = 'chat-msg-icon';
    icon.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'chat-msg-bubble';
    bubble.innerHTML = text.replace(/\n/g, '<br>');

    msg.appendChild(icon);
    msg.appendChild(bubble);
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTyping() {
    const msg = document.createElement('div');
    msg.className = 'chat-msg ai';
    msg.id = 'typing-indicator';

    const icon = document.createElement('div');
    icon.className = 'chat-msg-icon';
    icon.innerHTML = '<i class="fas fa-robot"></i>';

    const bubble = document.createElement('div');
    bubble.className = 'chat-msg-bubble';
    bubble.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';

    msg.appendChild(icon);
    msg.appendChild(bubble);
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    chatInput.value = '';
    chatInput.style.height = 'auto';

    showTyping();
    setTimeout(() => {
      removeTyping();
      addMessage(getAIResponse(text), 'ai');
    }, 1000 + Math.random() * 1000);
  }

  chatSend.addEventListener('click', () => sendMessage(chatInput.value));

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(chatInput.value);
    }
  });

  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
  });

  document.querySelectorAll('.chat-suggestion').forEach(btn => {
    btn.addEventListener('click', () => sendMessage(btn.dataset.msg));
  });

  newChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = `
      <div class="chat-welcome">
        <div class="chat-welcome-icon"><i class="fas fa-robot"></i></div>
        <h3>How can I help you today?</h3>
        <div class="chat-suggestions">
          <button class="chat-suggestion" data-msg="Explain how React hooks work">Explain how React hooks work</button>
          <button class="chat-suggestion" data-msg="Write a Python function to sort a list">Write a Python function to sort a list</button>
          <button class="chat-suggestion" data-msg="What are the best practices for CSS?">What are the best practices for CSS?</button>
        </div>
      </div>
    `;
    document.querySelectorAll('.chat-suggestion').forEach(btn => {
      btn.addEventListener('click', () => sendMessage(btn.dataset.msg));
    });
  });
    });
  });

  // Contact form
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) valid = false;
    });
    if (!valid) {
      alert('Please fill in all fields.');
      return;
    }
    const btn = form.querySelector('button');
    const orig = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      alert('Thanks! I\'ll get back to you soon.');
      form.reset();
      btn.textContent = orig;
      btn.disabled = false;
    }, 1200);
  });

});