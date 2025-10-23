/*
ENHANCED DEVICE DATA COLLECTOR WITH GOOGLE SHEETS INTEGRATION
*/

// Your existing detection function
function detectEnv() {
  var ua = navigator.userAgent;
  var platform = navigator.platform || "Unknown";
  var vendor = navigator.vendor || "";

  // Device detection
  var device = "Unknown";
  if (/mobile/i.test(ua)) device = "Mobile";
  else if (/tablet/i.test(ua) || /ipad/i.test(ua)) device = "Tablet";
  else if (/android/i.test(ua) && !/mobile/i.test(ua)) device = "Tablet";
  else if (/windows|mac|linux/i.test(platform)) device = "Desktop";

  // OS detection with versions
  var os = "Unknown";
  var osVersion = "Unknown";
  
  if (/android/i.test(ua)) {
    os = "Android";
    var androidMatch = ua.match(/android\s([0-9\.]+)/i);
    osVersion = androidMatch ? androidMatch[1] : "Unknown";
  }
  else if (/iphone|ipad|ipod/i.test(ua)) {
    os = "iOS";
    var iosMatch = ua.match(/os\s([0-9_]+)/i);
    osVersion = iosMatch ? iosMatch[1].replace(/_/g, '.') : "Unknown";
  }
  else if (/windows nt 10/i.test(ua)) {
    os = "Windows 10";
    osVersion = "10.0";
  }
  else if (/windows nt 6\.1/i.test(ua)) {
    os = "Windows 7";
    osVersion = "6.1";
  }
  else if (/mac os/i.test(ua)) {
    os = "macOS";
    var macMatch = ua.match(/mac os x ([0-9_]+)/i);
    osVersion = macMatch ? macMatch[1].replace(/_/g, '.') : "Unknown";
  }
  else if (/linux/i.test(ua)) {
    os = "Linux";
    osVersion = "Unknown";
  }

  // Browser detection with versions
  var browser = "Unknown";
  var version = "Unknown";
  
  if (/chrome|crios/i.test(ua) && !/edg/i.test(ua)) {
    browser = "Chrome";
    var chromeMatch = ua.match(/(chrome|crios)\/([0-9\.]+)/i);
    version = chromeMatch ? chromeMatch[2] : "Unknown";
  } 
  else if (/firefox|fxios/i.test(ua)) {
    browser = "Firefox";
    var firefoxMatch = ua.match(/(firefox|fxios)\/([0-9\.]+)/i);
    version = firefoxMatch ? firefoxMatch[2] : "Unknown";
  } 
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) {
    browser = "Safari";
    var safariMatch = ua.match(/version\/([0-9\.]+)/i);
    version = safariMatch ? safariMatch[1] : "Unknown";
  } 
  else if (/edg/i.test(ua)) {
    browser = "Edge";
    var edgeMatch = ua.match(/edg\/([0-9\.]+)/i);
    version = edgeMatch ? edgeMatch[1] : "Unknown";
  } 
  else if (/opera|opr/i.test(ua)) {
    browser = "Opera";
    var operaMatch = ua.match(/(opera|opr)\/([0-9\.]+)/i);
    version = operaMatch ? operaMatch[2] : "Unknown";
  } 
  else if (/msie|trident/i.test(ua)) {
    browser = "Internet Explorer";
    var ieMatch = ua.match(/(msie |rv:)([0-9\.]+)/i);
    version = ieMatch ? ieMatch[2] : "Unknown";
  }

  // Screen information
  var screenInfo = {
    width: screen.width,
    height: screen.height,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio || 1
  };

  // Language and timezone
  var language = navigator.language || "Unknown";
  var timezone = Intl ? Intl.DateTimeFormat().resolvedOptions().timeZone : "Unknown";

  return { 
    device: device, 
    os: os, 
    osVersion: osVersion,
    browser: browser, 
    version: version, 
    ua: ua,
    platform: platform,
    vendor: vendor,
    screen: screenInfo,
    language: language,
    timezone: timezone,
    timestamp: new Date().toISOString()
  };
}

// Enhanced device detection with Google Sheets integration
function enhancedDeviceDetection() {
  var envData = detectEnv();
  var startTime = Date.now();
  
  // Add enhanced device info (using functions from your fallback page)
  envData.deviceModel = getDeviceModel();
  envData.deviceType = getDeviceType();
  envData.screenSize = screen.width + 'x' + screen.height;
  envData.timeOnSite = 0;
  envData.pageUrl = window.location.href;
  
  // Send initial data after 3 seconds (for quick visits)
  setTimeout(function() {
    envData.timeOnSite = Math.round((Date.now() - startTime) / 1000);
    sendToGoogleSheets(envData);
  }, 3000);
  
  // Send final data when user leaves
  window.addEventListener('beforeunload', function() {
    var timeSpent = Math.round((Date.now() - startTime) / 1000);
    envData.timeOnSite = timeSpent;
    
    // Use synchronous request for beforeunload
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://script.google.com/macros/s/AKfycbzoP7yrucCzytbobaJxwCQk33WGBSor4KYEr1GHltdGobF__N7yxB21mU6Urp1XB0_C/exec', false);
    xhr.send(JSON.stringify(envData));
  });
  
  return envData;
}

// Simplified device model detection (add more from your fallback page as needed)
function getDeviceModel() {
  var ua = navigator.userAgent;
  
  // Simple device detection - expand this with your fallback page logic
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return 'Android Phone';
  if (/Windows Phone/i.test(ua)) return 'Windows Phone';
  if (/Macintosh/i.test(ua)) return 'Mac';
  if (/Windows/i.test(ua)) return 'Windows PC';
  if (/Linux/i.test(ua)) return 'Linux PC';
  
  return 'Unknown Device';
}

function getDeviceType() {
  var ua = navigator.userAgent.toLowerCase();
  var width = screen.width;

  if (/mobile/i.test(ua)) return 'mobile';
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (width < 768) return 'mobile';
  if (width >= 768 && width < 1024) return 'tablet';
  if (width >= 1024 && width < 1280) return 'laptop';
  return 'desktop';
}

// Send data to Google Sheets
function sendToGoogleSheets(data) {
  // Prevent duplicate sends
  if (window.dataSent) return;
  window.dataSent = true;
  
  // Use your Google Apps Script URL
  var webAppUrl = 'https://script.google.com/macros/s/AKfycbzoP7yrucCzytbobaJxwCQk33WGBSor4KYEr1GHltdGobF__N7yxB21mU6Urp1XB0_C/exec';
  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', webAppUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        console.log('📊 Data sent to Google Sheets successfully');
      } else {
        console.log('❌ Failed to send data to Google Sheets');
      }
    }
  };
  
  xhr.send(JSON.stringify(data));
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function() {
  console.log("📊 Starting device analytics...");
  window.env = enhancedDeviceDetection();
  console.log("📊 Device Environment Data:", window.env);
});
