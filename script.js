document.addEventListener('DOMContentLoaded', () => {
    // Gallery functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.slide-btn.prev');
    const nextBtn = document.querySelector('.slide-btn.next');
    
    let currentIndex = 0;

    function updateActiveThumbnail(index) {
        thumbnails.forEach(t => t.classList.remove('active'));
        if (thumbnails[index]) {
            thumbnails[index].classList.add('active');
        }
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateActiveThumbnail(currentIndex);
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
            updateActiveThumbnail(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
            updateActiveThumbnail(currentIndex);
        });
    }

    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                accordionItems.forEach(i => {
                    i.classList.remove('active');
                    const icon = i.querySelector('.fa-solid');
                    if(icon) {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    const icon = item.querySelector('.fa-solid');
                    if(icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                }
            });
        }
    });

    // Process Tabs
    const processTabs = document.querySelectorAll('.process-tabs .tab');
    processTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            processTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Search Toggle
    const searchTrigger = document.querySelector('.search-trigger');
    if (searchTrigger) {
        searchTrigger.addEventListener('click', () => {
            // Placeholder for future search functionality
        });
    }

    // Modal Functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeModalBtn = document.getElementById('closeModal');
    const modalOverlayEl = document.getElementById('modalOverlay');

    modalTriggers.forEach(trigger => {
        trigger.onclick = (e) => {
            e.preventDefault();
            if (modalOverlayEl) {
                modalOverlayEl.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };
    });

    if (closeModalBtn && modalOverlayEl) {
        closeModalBtn.onclick = () => {
            modalOverlayEl.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
    }

    if (modalOverlayEl) {
        modalOverlayEl.onclick = (e) => {
            if (e.target === modalOverlayEl) {
                modalOverlayEl.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        };
    }

    // Download Modal Functionality
    const openDownloadModalBtn = document.getElementById('openDownloadModal');
    const closeDownloadModalBtn = document.getElementById('closeDownloadModal');
    const downloadModalOverlayEl = document.getElementById('downloadModalOverlay');

    if (openDownloadModalBtn && downloadModalOverlayEl) {
        openDownloadModalBtn.onclick = (e) => {
            e.preventDefault();
            downloadModalOverlayEl.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
    }

    if (closeDownloadModalBtn && downloadModalOverlayEl) {
        closeDownloadModalBtn.onclick = () => {
            downloadModalOverlayEl.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
    }

    if (downloadModalOverlayEl) {
        downloadModalOverlayEl.onclick = (e) => {
            if (e.target === downloadModalOverlayEl) {
                downloadModalOverlayEl.classList.remove('active');
                document.body.style.overflow = 'auto';
    // Testimonial Carousel - Drag to Scroll
    const testCarousel = document.querySelector('.test-carousel');
    const testTrack = document.querySelector('.test-track');
    const testPrev = document.querySelector('.test-prev');
    const testNext = document.querySelector('.test-next');
    
    if (testTrack && testCarousel) {
        let isDragging = false;
        let startX;
        let scrollLeft;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;
        let currentIndex = 0;

        const cardWidth = () => document.querySelector('.test-card').offsetWidth + 24;
        const visibleItems = () => Math.floor(testCarousel.offsetWidth / cardWidth()) || 1;
        const maxIndex = () => testTrack.children.length - visibleItems();

        // Update Slider Position
        const setSliderPosition = () => {
            testTrack.style.transform = `translateX(${currentTranslate}px)`;
        };

        const animation = () => {
            setSliderPosition();
            if (isDragging) requestAnimationFrame(animation);
        };

        // Mouse Events
        testCarousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - testCarousel.offsetLeft;
            testCarousel.style.cursor = 'grabbing';
            testTrack.style.transition = 'none';
            prevTranslate = currentTranslate;
            requestAnimationFrame(animation);
        });

        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            testCarousel.style.cursor = 'grab';
            testTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Snap to nearest card
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -100 && currentIndex < maxIndex()) currentIndex += 1;
            if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
            
            currentTranslate = -currentIndex * cardWidth();
            setSliderPosition();
        });

        testCarousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - testCarousel.offsetLeft;
            const walk = (x - startX) * 1.5; // Drag sensitivity
            currentTranslate = prevTranslate + walk;
            
            // Constraints
            const limit = -maxIndex() * cardWidth();
            if (currentTranslate > 0) currentTranslate = 0;
            if (currentTranslate < limit) currentTranslate = limit;
        });

        // Button Click Logic (Integrated with Drag)
        testNext.onclick = () => {
            if (currentIndex < maxIndex()) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            currentTranslate = -currentIndex * cardWidth();
            testTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setSliderPosition();
        };

        testPrev.onclick = () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIndex();
            }
            currentTranslate = -currentIndex * cardWidth();
            testTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setSliderPosition();
        }

        // Touch Events (For Mobile)
        testCarousel.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - testCarousel.offsetLeft;
            testTrack.style.transition = 'none';
            prevTranslate = currentTranslate;
        });

        testCarousel.addEventListener('touchend', () => {
            isDragging = false;
            testTrack.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            const movedBy = currentTranslate - prevTranslate;
            if (movedBy < -50 && currentIndex < maxIndex()) currentIndex += 1;
            if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;
            currentTranslate = -currentIndex * cardWidth();
            setSliderPosition();
        });

        testCarousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - testCarousel.offsetLeft;
            const walk = (x - startX);
            currentTranslate = prevTranslate + walk;
            const limit = -maxIndex() * cardWidth();
            if (currentTranslate > 0) currentTranslate = 0;
            if (currentTranslate < limit) currentTranslate = limit;
            setSliderPosition();
        });
    }
});
