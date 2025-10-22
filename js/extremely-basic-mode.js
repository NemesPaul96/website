// EXTREMELY BASIC MODE - SIMPLE VERSION
(function() {
    // Check if extremely basic mode is requested
    var isExtremelyBasicMode = window.location.search.includes('extremelyBasic=true') || 
                              sessionStorage.getItem('forceExtremelyBasicMode') === 'true';
    
    if (isExtremelyBasicMode) {
        console.log('🚀 Activating extremely basic compatibility mode');
        
        // Set session storage
        try {
            sessionStorage.setItem('forceExtremelyBasicMode', 'true');
            sessionStorage.setItem('forceBasicMode', 'true');
        } catch (e) {
            console.log('Session storage not available');
        }
        
        // Add class to body
        document.body.classList.add('extremely-basic-mode');
        
        // Remove existing stylesheet and add extremely basic CSS
        function replaceCSS() {
            var existingCSS = document.querySelector('link[href="style.css"]');
            if (existingCSS) {
                existingCSS.remove();
            }
            
            // Add extremely basic CSS
            var basicCSS = document.createElement('link');
            basicCSS.rel = 'stylesheet';
            basicCSS.href = 'extremely-basic.css';
            document.head.appendChild(basicCSS);
        }
        
        // Show the banner (using the same one as basic mode)
        function setupBanner() {
            var banner = document.getElementById('basic-mode-banner');
            if (banner) {
                // Update banner text for extremely basic mode
                var bannerText = banner.querySelector('.banner-text');
                if (bannerText) {
                    bannerText.innerHTML = 'You are viewing the EXTREMELY basic version of this website. <a href="fallback-page.html" class="banner-link">Switch to Basic Mode</a>';
                }
                
                // Show the banner
                banner.style.display = 'block';
            }
        }
        
        // Remove animations and ensure content is visible
        function removeAnimations() {
            var allElements = document.querySelectorAll('*');
            for (var i = 0; i < allElements.length; i++) {
                var element = allElements[i];
                element.style.animation = 'none';
                element.style.transition = 'none';
                element.style.opacity = '1';
                element.style.visibility = 'visible';
                element.style.transform = 'none';
            }
        }
        
        // Initialize
        function init() {
            replaceCSS();
            removeAnimations();
            setupBanner();
        }
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }
})();