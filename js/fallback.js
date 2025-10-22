// SIMPLE FALLBACK REDIRECT - ES3/ES5 Compatible
// This will work on even the oldest browsers

/*
COMPATIBILITY CHECKER - ES5 Compatible
Checks if device can run website features, redirects incompatible devices
Uses window.env from device-check.js
*/

/*
BULLETPROOF FALLBACK REDIRECT - ES5 Compatible
Redirects based on KNOWN problematic devices/versions, not unreliable feature detection
*/

// UPDATED FALLBACK.JS - RESPECTS BASIC MODE
// This will work on even the oldest browsers

function shouldRedirectToFallback() {
  console.log("🔍 Running bulletproof compatibility check...");
  
  // FIRST CHECK: If basic mode is requested, don't redirect
  if (window.location.search.includes('basic=true')) {
    console.log("✅ Basic mode requested - skipping fallback redirect");
    return {
      incompatible: false,
      reasons: ["Basic mode enabled"]
    };
  }
  
  if (window.location.search.includes('extremelyBasic=true')) {
    console.log("✅ Extremely basic mode requested - skipping fallback redirect");
    return {
        incompatible: false,
        reasons: ["Extremely basic mode enabled"]
    };
	}
  
  var ua = navigator.userAgent.toLowerCase();
  var isIncompatible = false;
  var reasons = [];
  
  // DIRECT VERSION CHECKS - No unreliable feature detection
  
  // 1. Check Android Version
  if (/android/.test(ua)) {
    var androidMatch = ua.match(/android\s([0-9\.]+)/);
    if (androidMatch && androidMatch[1]) {
      var androidVersion = parseFloat(androidMatch[1]);
      console.log("Android version detected:", androidVersion);
      
      // Redirect ALL Android versions below 6.0
      if (androidVersion < 6.0) {
        isIncompatible = true;
        reasons.push("Android " + androidVersion + " is too old (needs 6.0+)");
      }
      
      // Also redirect specific problematic versions
      if (androidVersion >= 4.0 && androidVersion <= 5.1) {
        isIncompatible = true;
        reasons.push("Android " + androidVersion + " has known compatibility issues");
      }
    }
  }
  
  // 2. Check Chrome Version
  if (/chrome/.test(ua)) {
    var chromeMatch = ua.match(/chrome\/([0-9\.]+)/);
    if (chromeMatch && chromeMatch[1]) {
      var chromeVersion = parseInt(chromeMatch[1].split('.')[0]);
      console.log("Chrome version detected:", chromeVersion);
      
      // Redirect ALL Chrome versions below 50
      if (chromeVersion < 50) {
        isIncompatible = true;
        reasons.push("Chrome " + chromeVersion + " is too old (needs 50+)");
      }
    }
  }
  
  // 3. Check for specific problematic browsers
  if (/msie|trident/.test(ua)) {
    isIncompatible = true;
    reasons.push("Internet Explorer is not supported");
  }
  
  if (/safari/.test(ua) && !/chrome/.test(ua)) {
    var safariMatch = ua.match(/version\/([0-9\.]+)/);
    if (safariMatch && safariMatch[1]) {
      var safariVersion = parseInt(safariMatch[1].split('.')[0]);
      if (safariVersion < 10) {
        isIncompatible = true;
        reasons.push("Safari " + safariVersion + " is too old (needs 10+)");
      }
    }
  }
  
  // 4. Check for specific problematic devices
  var problematicDevices = [
    'huawei', 'samsung gt-', 'galaxy s3', 'galaxy s4', 'galaxy s5',
    'redmi note 3', 'redmi note 4', 'moto g', 'moto e'
  ];
  
  for (var i = 0; i < problematicDevices.length; i++) {
    if (ua.indexOf(problematicDevices[i]) !== -1) {
      isIncompatible = true;
      reasons.push("Your device model has known compatibility issues");
      break;
    }
  }
  
  console.log("Incompatible:", isIncompatible, "Reasons:", reasons);
  return {
    incompatible: isIncompatible,
    reasons: reasons
  };
}

function performImmediateRedirect() {
  // Don't redirect if we're already on fallback page
  if (window.location.pathname.indexOf('fallback-page.html') !== -1) {
    return;
  }
  
  var checkResult = shouldRedirectToFallback();
  
  if (checkResult.incompatible) {
    console.log("🚨 Device is incompatible - redirecting immediately");
    
    // Get basic device info for the fallback page
    var ua = navigator.userAgent;
    var deviceType = "Unknown";
    if (/mobile/i.test(ua)) deviceType = "Mobile";
    else if (/tablet/i.test(ua)) deviceType = "Tablet";
    else deviceType = "Desktop";
    
    var os = "Unknown";
    var osVersion = "Unknown";
    var browser = "Unknown";
    var version = "Unknown";
    
    // Extract OS info
    if (/android/i.test(ua)) {
      os = "Android";
      var androidMatch = ua.match(/android\s([0-9\.]+)/i);
      osVersion = androidMatch ? androidMatch[1] : "Unknown";
    }
    
    // Extract browser info
    if (/chrome/i.test(ua)) {
      browser = "Chrome";
      var chromeMatch = ua.match(/chrome\/([0-9\.]+)/i);
      version = chromeMatch ? chromeMatch[1] : "Unknown";
    }
    
    // Build redirect URL with device info
    var params = [
      'device=' + encodeURIComponent(deviceType),
      'os=' + encodeURIComponent(os),
      'osVersion=' + encodeURIComponent(osVersion),
      'browser=' + encodeURIComponent(browser),
      'version=' + encodeURIComponent(version),
      'reasons=' + encodeURIComponent(checkResult.reasons.join('|')),
      'ua=' + encodeURIComponent(ua)
    ].join('&');
    
    var fallbackUrl = 'fallback-page.html?' + params;
    
    // Show immediate visual feedback
    var redirectDiv = document.createElement('div');
    redirectDiv.id = 'compatibility-redirect-message';
    redirectDiv.innerHTML = 
      '<div style="' +
      'position:fixed;' +
      'top:0;' +
      'left:0;' +
      'width:100%;' +
      'background:linear-gradient(135deg, #ff6b6b, #ee5a24);' + 
      'color:white;' +
      'padding:15px;' +
      'font-family:Arial, sans-serif;' +
      'z-index:99999;' +
      'text-align:center;' +
      'font-size:18px;' +
      'font-weight:bold;' +
      'box-shadow:0 4px 12px rgba(0,0,0,0.3);' +
      '">' +
      '⚠️ Your device is not fully supported. Redirecting to compatibility information...' +
      '</div>';
    
    document.body.appendChild(redirectDiv);
    
    // Force redirect after short delay - don't rely on anything else
    setTimeout(function() {
      console.log("🔀 Performing forced redirect to:", fallbackUrl);
      window.location.href = fallbackUrl;
    }, 5000);
    
  } else {
    console.log("✅ Device appears compatible - no redirect needed");
  }
}

// RUN IMMEDIATELY when script loads - don't wait for anything
console.log("🚀 Fallback script starting immediate check...");
try {
  performImmediateRedirect();
} catch (error) {
  console.error("❌ Fallback script error:", error);
  // If even our basic check fails, definitely redirect
  setTimeout(function() {
    window.location.href = 'fallback-page.html?error=script_failed';
  }, 1000);
}