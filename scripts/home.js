function initVideoHero() {
    const video = document.getElementById('hero-video');
    const source = document.createElement('source');
    
    // Check screen size
    if (window.innerWidth < 768) {
        source.src = 'assets/media/fireVideo.mp4';
    } else {
        source.src = 'assets/media/fireVideo.mp4';
    }
    
    source.type = 'video/mp4';
    video.appendChild(source);
    
    // Fallback if video fails
    video.addEventListener('error', () => {
        document.querySelector('.hero').style.background = `
            url('assets/images/self/banner.webp') center/cover no-repeat
        `;
        video.style.display = 'none';
    });
    
    // Update video source on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768 && !video.src.includes('mobile')) {
            video.src = 'assets/media/fireVideo.mp4';
        } else if (window.innerWidth >= 768 && !video.src.includes('desktop')) {
            video.src = 'assets/media/fireVideo.mp4';
        }
    });
}

// Initialize home page
document.addEventListener('DOMContentLoaded', initVideoHero);
