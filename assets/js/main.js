document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Sidebar & Menu Functionality
    // ==========================================
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if (!sidebar || !overlay) return;

        if (menuBtn) menuBtn.classList.toggle('open');

        const isHidden = sidebar.classList.contains('translate-x-full');

        if (isHidden) {
            // Open Sidebar
            sidebar.classList.remove('translate-x-full');
            overlay.classList.remove('hidden');
            setTimeout(() => overlay.classList.remove('opacity-0'), 10);
            document.body.classList.add('overflow-hidden');
        } else {
            // Close Sidebar
            sidebar.classList.add('translate-x-full');
            overlay.classList.add('opacity-0');
            setTimeout(() => overlay.classList.add('hidden'), 300);
            document.body.classList.remove('overflow-hidden');
        }
    }

    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar && !sidebar.classList.contains('translate-x-full')) {
                toggleMenu();
            }
        });
    });


    // ==========================================
    // 2. Cost Estimator Interactive Logic
    // ==========================================
    let baseCost = 120;
    let urgencyMultiplier = 1;

    const baseCostButtons = document.querySelectorAll('.estimator-opt');
    const urgencyButtons = document.querySelectorAll('.urgency-opt');
    const totalPriceDisplay = document.getElementById('total-price');

    function updateTotal() {
        if (!totalPriceDisplay) return;
        const total = Math.round(baseCost * urgencyMultiplier);
        totalPriceDisplay.textContent = `$${total}`;
    }

    baseCostButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget;
            baseCostButtons.forEach(b => b.classList.remove('active-opt'));
            target.classList.add('active-opt');
            baseCost = parseFloat(target.dataset.cost) || 120;
            updateTotal();
        });
    });

    urgencyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.currentTarget;
            urgencyButtons.forEach(b => b.classList.remove('active-urgency'));
            target.classList.add('active-urgency');
            urgencyMultiplier = parseFloat(target.dataset.multiplier) || 1;
            updateTotal();
        });
    });


    // ==========================================
    // 3. ZIP Code Checker Script
    // ==========================================
    const zipForm = document.getElementById('zip-checker-form');
    const zipMessage = document.getElementById('zip-message');

    if (zipForm && zipMessage) {
        zipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            zipMessage.classList.remove('hidden');
            zipMessage.className = "mt-4 text-sm font-semibold text-emerald-400";
            zipMessage.textContent = "✅ Great news! Technicians are available in your area for same-day service.";
        });
    }


    // ==========================================
    // 4. Initialize Review Swiper Slider
    // ==========================================
    if (document.querySelector('.reviewSwiper')) {
        new Swiper('.reviewSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
            },
        });
    }


    // ==========================================
    // 5. FAQ Accordion Functionality
    // ==========================================
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const faqItem = toggle.parentElement;
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');

            const isOpen = faqItem.classList.contains('active');

            // Close all other active items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                const itemContent = item.querySelector('.faq-content');
                const itemIcon = item.querySelector('i');

                if (itemContent) itemContent.style.maxHeight = null;
                if (itemIcon) {
                    itemIcon.classList.replace('fa-minus', 'fa-plus');
                    itemIcon.style.transform = 'rotate(0deg)';
                }
            });

            if (!isOpen) {
                faqItem.classList.add('active');
                if (content) content.style.maxHeight = content.scrollHeight + "px";
                if (icon) {
                    icon.classList.replace('fa-plus', 'fa-minus');
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });


    window.addEventListener('DOMContentLoaded', function () {
        var hasRun = false;

        function startCounting() {
            var counters = document.querySelectorAll('.num-counter');
            counters.forEach(function (counter) {
                var target = parseInt(counter.getAttribute('data-target'), 10) || 0;
                var current = 0;
                var duration = 1500;
                var stepTime = Math.max(Math.floor(duration / target), 20);

                var timer = setInterval(function () {
                    current += 1;
                    counter.textContent = current;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    }
                }, stepTime);
            });
        }

        function checkScroll() {
            if (hasRun) return;
            var statsBox = document.getElementById('stats-box');
            if (!statsBox) return;

            var rect = statsBox.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.85) {
                hasRun = true;
                startCounting();
                window.removeEventListener('scroll', checkScroll);
            }
        }

        window.addEventListener('scroll', checkScroll);
        checkScroll();
    });









});