document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    if (sidebar.classList.contains('active')) {
                        toggleSidebar();
                    }
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.classList.toggle('scrolled', window.scrollY > 100);
        });

        // Sidebar toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const sidebar = document.querySelector('.sidebar');
        const closeSidebar = document.querySelector('.close-sidebar');
        const overlay = document.querySelector('.overlay');

        function toggleSidebar() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
        }

        mobileMenu.addEventListener('click', toggleSidebar);
        closeSidebar.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const reason = formData.get('reason');
            
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${reason}`);
            const mailtoLink = `mailto:jaisaaditya11@gmail.com?subject=${subject}&body=${body}`;
            
            window.location.href = mailtoLink;
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#10B981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
                this.reset();
            }, 3000);
        });

        // Typing effect for hero section
        const heroText = document.querySelector('.hero p');
        const text = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        setTimeout(typeWriter, 1500);

        // Particle effect for hero section
        function createParticles() {
            const hero = document.querySelector('.hero');
            const particlesContainer = document.createElement('div');
            particlesContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
            `;
            hero.appendChild(particlesContainer);
            
            for (let i = 0; i < 60; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: float ${3 + Math.random() * 5}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                `;
                particlesContainer.appendChild(particle);
            }
        }
        window.addEventListener('load', createParticles);

        // Skill tags hover effect
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse 0.5s ease-in-out';
            });
            tag.addEventListener('animationend', function() {
                this.style.animation = '';
            });
        });

        // Project carousel functionality
        document.querySelectorAll('.project-carousel').forEach(carousel => {
            const images = carousel.querySelectorAll('.project-image');
            const dots = carousel.querySelectorAll('.carousel-dot');
            let currentIndex = 0;
            const totalImages = images.length;

            function showImage(index) {
                images.forEach((img, i) => {
                    img.classList.toggle('active', i === index);
                });
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === index);
                });
            }

            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    showImage(currentIndex);
                });
            });

            // Auto-scroll carousel every 5 seconds
            setInterval(() => {
                currentIndex = (currentIndex + 1) % totalImages;
                showImage(currentIndex);
            }, 5000);
        });

        // Project cards 3D tilt effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });