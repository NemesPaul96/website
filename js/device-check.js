/*
Logs full environment info in the console for every visitor
Shows fallback message if IntersectionObserver is missing
Injects device, OS, browser and version into the fallback message
*/


//* 
UNIVERSAL DEVICE DATA COLLECTOR - ES5 Compatible
Runs on ALL devices to collect environment data for analytics and fallback
*/

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

// Initialize environment data immediately
window.env = detectEnv();

// Log for analytics and debugging
console.log("📊 Device Environment Data:", window.env);

// Send to analytics (future implementation)
function sendToAnalytics(envData) {
  // This can be extended to send data to your analytics service
  console.log("📈 Analytics Data:", envData);
  
  // Example: Send to Google Analytics
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', 'device_info', envData);
  // }
  
  // Example: Send to your backend
  // fetch('/api/analytics/device-info', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(envData)
  // });
}

// Send analytics data
sendToAnalytics(window.env);

// Update visual display if on main page
document.addEventListener("DOMContentLoaded", function () {
  var envDeviceElement = document.getElementById("env-device");
  if (envDeviceElement) {
    document.getElementById("env-device").textContent = window.env.device;
    document.getElementById("env-os").textContent = window.env.os + (window.env.osVersion !== "Unknown" ? " " + window.env.osVersion : "");
    document.getElementById("env-browser").textContent = window.env.browser;
    document.getElementById("env-version").textContent = window.env.version;
  }
});