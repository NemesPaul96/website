// BASIC MODE SCRIPT 

(function() {
    // Check if extremely basic mode is active FIRST
    var isExtremelyBasicMode = window.location.search.includes('extremelyBasic=true') || 
                              sessionStorage.getItem('forceExtremelyBasicMode') === 'true';
    if (isExtremelyBasicMode) {
        console.log('🚫 Extremely basic mode active - skipping basic mode');
        return; // Don't run basic mode if extremely basic mode is active
    }
    
    // Check if basic mode is requested
    var isBasicMode = window.location.search.includes('basic=true') || 
                     sessionStorage.getItem('forceBasicMode') === 'true';
    
    if (isBasicMode) {
        console.log('🚀 Activating basic compatibility mode');
        
        // Set session storage to persist basic mode
        try {
            sessionStorage.setItem('forceBasicMode', 'true');
        } catch (e) {
            console.log('Session storage not available');
        }
        
        // Add basic-mode class to body (for potential CSS targeting)
        document.body.classList.add('basic-mode');
        
        // Remove any fallback redirect messages
        var redirectMessage = document.getElementById('compatibility-redirect-message');
        if (redirectMessage) {
            redirectMessage.style.display = 'none';
            redirectMessage.remove();
        }
        
        // Remove animation classes to ensure content is visible
        function removeAnimationClasses() {
            var allElements = document.querySelectorAll('*');
            for (var i = 0; i < allElements.length; i++) {
                var element = allElements[i];
                var classes = element.className;
                
                if (typeof classes === 'string' && classes.includes('animate')) {
                    // Remove animation-related classes but keep other classes
                    var newClasses = classes.split(' ').filter(function(className) {
                        return !className.includes('animate');
                    }).join(' ');
                    
                    element.className = newClasses;
                }
                
                // Remove inline hiding styles
                if (element.style.opacity === '0') element.style.opacity = '';
                if (element.style.visibility === 'hidden') element.style.visibility = '';
            }
        }
        
        // BASIC MODE BANNER FUNCTIONALITY
        function setupBasicModeBanner() {
            var banner = document.getElementById('basic-mode-banner');
            var closeButton = document.getElementById('close-banner');
            
            if (banner && closeButton) {
                // Show the banner WITHOUT animation
                banner.style.display = 'block';
                banner.style.animation = 'none';
                banner.style.transform = 'translateY(0)';
                
                // Close button functionality
                closeButton.addEventListener('click', function() {
                    banner.style.display = 'none';
                    document.body.classList.remove('banner-visible');
                    document.body.style.marginTop = '0';
                    document.querySelector('main').style.marginTop = '0';
                });
                
                document.body.classList.add('banner-visible');
                
                console.log('✅ Basic mode banner activated');
            } else {
                console.log('❌ Basic mode banner elements not found');
            }
        }
        
        // Initialize everything
        function init() {
            removeAnimationClasses();
            setupBasicModeBanner();
        }
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            // DOM is already ready
            init();
        }
        
        console.log('✅ Basic compatibility mode activated');
    }
})();
