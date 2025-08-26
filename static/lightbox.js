// Lightbox functionality
(function() {
    'use strict';
    
    let currentImageIndex = 0;
    let images = [];
    let zoomLevel = 1;
    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let imagePosition = { x: 0, y: 0 };
    
    function setupImagePanning() {
        const lightboxImage = document.getElementById('lightbox-image');
        if (!lightboxImage) return;
        
        lightboxImage.addEventListener('mousedown', startDrag);
        lightboxImage.addEventListener('mousemove', drag);
        lightboxImage.addEventListener('mouseup', endDrag);
        lightboxImage.addEventListener('mouseleave', endDrag);
        lightboxImage.addEventListener('wheel', handleZoom);
        
        // Touch events for mobile
        lightboxImage.addEventListener('touchstart', startDrag);
        lightboxImage.addEventListener('touchmove', drag);
        lightboxImage.addEventListener('touchend', endDrag);
    }
    
    function startDrag(e) {
        if (zoomLevel <= 1) return;
        
        isDragging = true;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        dragStart.x = clientX - imagePosition.x;
        dragStart.y = clientY - imagePosition.y;
        
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging || zoomLevel <= 1) return;
        
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        imagePosition.x = clientX - dragStart.x;
        imagePosition.y = clientY - dragStart.y;
        
        updateImageTransform();
        e.preventDefault();
    }
    
    function endDrag() {
        isDragging = false;
    }
    
    function handleZoom(e) {
        // Only zoom if Ctrl key is held (standard browser zoom convention)
        // This allows natural scrolling with trackpad/touchpad
        if (!e.ctrlKey) {
            return; // Let natural scrolling happen
        }
        
        e.preventDefault();
        
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        zoomLevel = Math.max(0.5, Math.min(3, zoomLevel + delta));
        
        if (zoomLevel <= 1) {
            imagePosition = { x: 0, y: 0 };
        }
        
        updateImageTransform();
    }
    
    function updateImageTransform() {
        const lightboxImage = document.getElementById('lightbox-image');
        if (lightboxImage) {
            lightboxImage.style.transform = `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`;
            lightboxImage.classList.toggle('zoomed', zoomLevel > 1);
        }
    }
    
    function resetZoom() {
        zoomLevel = 1;
        imagePosition = { x: 0, y: 0 };
        updateImageTransform();
    }
    
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.id = 'lightbox';
        
        lightbox.innerHTML = `
            <span class="lightbox-close" id="lightbox-close">&times;</span>
            <div class="lightbox-nav lightbox-prev" id="lightbox-prev">&#10094;</div>
            <div class="lightbox-nav lightbox-next" id="lightbox-next">&#10095;</div>
            <div class="lightbox-zoom-controls">
                <button class="lightbox-zoom-btn" id="lightbox-zoom-in">+</button>
                <button class="lightbox-zoom-btn" id="lightbox-zoom-out">-</button>
                <button class="lightbox-zoom-btn" id="lightbox-zoom-reset">Reset</button>
            </div>
            <div class="lightbox-content">
                <img class="lightbox-image" id="lightbox-image" src="" alt="">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        setupImagePanning();
        return lightbox;
    }
    
    function openLightbox(imageSrc, imageIndex) {
        const lightbox = document.getElementById('lightbox') || createLightbox();
        const lightboxImage = document.getElementById('lightbox-image');
        
        currentImageIndex = imageIndex;
        
        // Reset zoom when opening new image
        resetZoom();
        
        // Get the original source - remove any size restrictions
        let originalSrc = imageSrc;
        
        // If the image has srcset, try to get the largest version
        const originalImg = images[imageIndex];
        if (originalImg.srcset) {
            const srcsetEntries = originalImg.srcset.split(',').map(entry => {
                const parts = entry.trim().split(' ');
                return {
                    src: parts[0],
                    width: parts[1] ? parseInt(parts[1]) : 0
                };
            });
            
            // Get the largest image from srcset
            const largest = srcsetEntries.reduce((max, current) => 
                current.width > max.width ? current : max
            );
            originalSrc = largest.src;
        }
        
        // Set the full-size image
        lightboxImage.src = originalSrc;
        lightbox.style.display = 'block';
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        updateNavigationVisibility();
    }
    
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    function updateNavigationVisibility() {
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        
        if (prevBtn && nextBtn) {
            prevBtn.style.display = images.length > 1 ? 'block' : 'none';
            nextBtn.style.display = images.length > 1 ? 'block' : 'none';
        }
    }
    
    function showPreviousImage() {
        if (images.length > 1) {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            const lightboxImage = document.getElementById('lightbox-image');
            
            // Reset zoom when changing images
            resetZoom();
            
            // Get original source for the new image
            let originalSrc = images[currentImageIndex].src;
            if (images[currentImageIndex].srcset) {
                const srcsetEntries = images[currentImageIndex].srcset.split(',').map(entry => {
                    const parts = entry.trim().split(' ');
                    return {
                        src: parts[0],
                        width: parts[1] ? parseInt(parts[1]) : 0
                    };
                });
                
                const largest = srcsetEntries.reduce((max, current) => 
                    current.width > max.width ? current : max
                );
                originalSrc = largest.src;
            }
            
            lightboxImage.src = originalSrc;
        }
    }
    
    function showNextImage() {
        if (images.length > 1) {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            const lightboxImage = document.getElementById('lightbox-image');
            
            // Reset zoom when changing images
            resetZoom();
            
            // Get original source for the new image
            let originalSrc = images[currentImageIndex].src;
            if (images[currentImageIndex].srcset) {
                const srcsetEntries = images[currentImageIndex].srcset.split(',').map(entry => {
                    const parts = entry.trim().split(' ');
                    return {
                        src: parts[0],
                        width: parts[1] ? parseInt(parts[1]) : 0
                    };
                });
                
                const largest = srcsetEntries.reduce((max, current) => 
                    current.width > max.width ? current : max
                );
                originalSrc = largest.src;
            }
            
            lightboxImage.src = originalSrc;
        }
    }
    
    function initializeLightbox() {
        // Find all images in the content area
        images = Array.from(document.querySelectorAll('.content img')).filter(img => {
            // Exclude very small images (likely icons)
            return img.naturalWidth > 100 && img.naturalHeight > 100;
        });
        
        // Add click handlers to images
        images.forEach((img, index) => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(this.src, index);
            });
            
            // Add a subtle visual indicator that image is clickable
            img.style.cursor = 'pointer';
            img.title = 'Click to enlarge';
        });
        
        // Event delegation for lightbox controls
        document.addEventListener('click', function(e) {
            if (e.target.id === 'lightbox-close' || e.target.id === 'lightbox') {
                closeLightbox();
            } else if (e.target.id === 'lightbox-prev') {
                showPreviousImage();
            } else if (e.target.id === 'lightbox-next') {
                showNextImage();
            } else if (e.target.id === 'lightbox-zoom-in') {
                zoomLevel = Math.min(3, zoomLevel + 0.2);
                updateImageTransform();
            } else if (e.target.id === 'lightbox-zoom-out') {
                zoomLevel = Math.max(0.5, zoomLevel - 0.2);
                if (zoomLevel <= 1) imagePosition = { x: 0, y: 0 };
                updateImageTransform();
            } else if (e.target.id === 'lightbox-zoom-reset') {
                resetZoom();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            const lightbox = document.getElementById('lightbox');
            if (lightbox && lightbox.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        closeLightbox();
                        break;
                    case 'ArrowLeft':
                        showPreviousImage();
                        break;
                    case 'ArrowRight':
                        showNextImage();
                        break;
                }
            }
        });
        
        // Prevent clicks on the image itself from closing the lightbox
        document.addEventListener('click', function(e) {
            if (e.target.id === 'lightbox-image') {
                e.stopPropagation();
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeLightbox);
    } else {
        initializeLightbox();
    }
    
    // Re-initialize if new content is loaded dynamically
    window.reinitializeLightbox = initializeLightbox;
})();
