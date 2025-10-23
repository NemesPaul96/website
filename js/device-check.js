/*
COMPLETE DEVICE DATA COLLECTOR WITH GOOGLE SHEETS INTEGRATION
*/

// Your existing basic detection
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

// =========================================================================
// ADVANCED DEVICE DETECTION (From your fallback page)
// =========================================================================

function getDeviceType() {
  var ua = navigator.userAgent.toLowerCase();
  var width = screen.width;

  // First check user agent for obvious device types
  if (/tablet|ipad/i.test(ua)) return 'tablet';
  if (/mobile|android|iphone/i.test(ua)) return 'mobile';
  
  // Fallback: use screen size for more accurate detection
  if (width < 768) return 'mobile';
  if (width >= 768 && width < 1024) return 'tablet';
  if (width >= 1024 && width < 1280) return 'laptop';
  
  return 'desktop';
}

function getOSName() {
  var ua = navigator.userAgent;
  if (/android/i.test(ua)) return 'android';
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
  if (/windows/i.test(ua)) return 'windows';
  if (/mac os/i.test(ua)) return 'macos';
  if (/linux/i.test(ua)) return 'linux';
  if (/cros/i.test(ua)) return 'chromeos';
  if (/Windows Phone/i.test(ua)) return 'windowsphone';
  return 'unknown';
}

function getBrowserName() {
  var ua = navigator.userAgent.toLowerCase();
  // Check in order of specificity (most specific first)
  if (/samsungbrowser/i.test(ua)) return 'samsung';
  if (/chrome/i.test(ua) && !/edg/i.test(ua)) return 'chrome';
  if (/firefox/i.test(ua)) return 'firefox';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'safari';
  if (/edg/i.test(ua)) return 'edge';
  if (/opera|opr/i.test(ua)) return 'opera';
  if (/trident|msie/i.test(ua)) return 'ie';
  if (/ucbrowser/i.test(ua)) return 'ucbrowser';
  if (/brave/i.test(ua)) return 'brave';
  if (/vivaldi/i.test(ua)) return 'vivaldi';
  return 'unknown';
}

function getBrowserVersion() {
  var ua = navigator.userAgent;
  var version = "Unknown";
  
  var match = ua.match(/(Chrome|Firefox|Safari|Edg|Opera|OPR|SamsungBrowser|UCBrowser|Brave|Vivaldi)\/([0-9.]+)/);
  
  if (!match) {
    match = ua.match(/Chrome\/([0-9.]+)/) || 
            ua.match(/Firefox\/([0-9.]+)/) || 
            ua.match(/Version\/([0-9.]+).*Safari/) || 
            ua.match(/Edg\/([0-9.]+)/) ||
            ua.match(/SamsungBrowser\/([0-9.]+)/) ||
            ua.match(/UCBrowser\/([0-9.]+)/) ||
            ua.match(/Brave\/([0-9.]+)/) ||
            ua.match(/Vivaldi\/([0-9.]+)/);
  }
  
  if (match) {
    version = match[match.length - 1];
    var parts = version.split('.');
    version = parts[0] + (parts[1] ? '.' + parts[1] : '');
  }
  return version;
}

function getOSVersion() {
  var ua = navigator.userAgent;
  var version = "Unknown";
  
  // ANDROID VERSION DETECTION
  var match = ua.match(/Android\s+([0-9.]+)/);
  if (match) {
    version = match[1];
  }
  // iOS VERSION DETECTION
  else if (match = ua.match(/OS\s+([0-9_.]+)\s+like/)) {
    version = match[1].replace(/_/g, '.');
  }
  // WINDOWS VERSION DETECTION
  else if (/Windows NT 10.0/.test(ua)) {
    version = "10/11";
  } else if (/Windows NT 6.3/.test(ua)) {
    version = "8.1";
  } else if (/Windows NT 6.2/.test(ua)) {
    version = "8";
  } else if (/Windows NT 6.1/.test(ua)) {
    version = "7";
  } else if (/Windows NT 6.0/.test(ua)) {
    version = "Vista";
  } else if (/Windows NT 5.1/.test(ua)) {
    version = "XP";
  } else if (/Windows NT 5.0/.test(ua)) {
    version = "2000";
  }
  // macOS VERSION DETECTION
  else if (match = ua.match(/Mac OS X ([0-9_.]+)/)) {
    version = match[1].replace(/_/g, '.');
    var versionMap = {
      '10.15': 'Catalina', '10.14': 'Mojave', '10.13': 'High Sierra',
      '10.12': 'Sierra', '10.11': 'El Capitan', '10.10': 'Yosemite',
      '10.9': 'Mavericks', '10.8': 'Mountain Lion', '10.7': 'Lion',
      '10.6': 'Snow Leopard', '10.5': 'Leopard', '11': 'Big Sur',
      '12': 'Monterey', '13': 'Ventura', '14': 'Sonoma'
    };
    if (versionMap[version]) {
      version = versionMap[version];
    }
  }
  
  if (version !== "Unknown") {
    var parts = version.split('.');
    version = parts[0] + (parts[1] ? '.' + parts[1] : '');
  }
  
  return version;
}

function getDeviceModel() {
  var ua = navigator.userAgent;
  var osType = getOSName();

  // SPECIAL CASES FIRST
  if (/Nest Hub/i.test(ua)) {
    if (/Nest Hub Max/i.test(ua)) return 'Google Nest Hub Max';
    else return 'Google Nest Hub';
  }
  if (/iPad/i.test(ua)) {
    if (/iPad Mini/i.test(ua)) return 'iPad Mini';
    else if (/iPad Air/i.test(ua)) return 'iPad Air';
    else if (/iPad Pro/i.test(ua)) return 'iPad Pro';
    else return 'iPad';
  }
  if (/Windows Phone/i.test(ua) || /Lumia/i.test(ua)) {
    return 'Windows Phone';
  }

  // GENERAL MODEL EXTRACTION
  try {
    var match = ua.match(/; ([^;)]+)\)/);
    if (match && match[1]) {
      var rawModel = match[1];
      var cleanedModel = cleanModelName(rawModel);
      
      // Try to get friendly name
      var friendlyName = getFriendlyDeviceName(cleanedModel);
      if (friendlyName) return friendlyName;
      
      // Try brand-specific naming
      return getBrandSpecificName(cleanedModel, osType);
    }
  } catch (e) {
    console.log('Device model detection error:', e);
  }

  return getFallbackName(osType);
}

function cleanModelName(rawModel) {
  return rawModel
    .replace(/Build/g, '')
    .replace(/; wv/g, '')
    .replace(/Android/g, '')
    .replace(/Linux/g, '')
    .replace(/X11/g, '')
    .replace(/U;/g, '')
    .trim();
}

function getFriendlyDeviceName(model) {
  var modelMappings = {
    // SAMSUNG DEVICES
    'SM-G950F': 'Samsung Galaxy S8', 'SM-G955F': 'Samsung Galaxy S8+',
    'SM-G960F': 'Samsung Galaxy S9', 'SM-G965F': 'Samsung Galaxy S9+',
    'SM-G973F': 'Samsung Galaxy S10', 'SM-G975F': 'Samsung Galaxy S10+',
    'SM-G980F': 'Samsung Galaxy S20', 'SM-G981B': 'Samsung Galaxy S20 5G',
    // SAMSUNG GALAXY NOTE
    'SM-N950F': 'Samsung Galaxy Note 8', 'SM-N960F': 'Samsung Galaxy Note 9',
    'SM-N970F': 'Samsung Galaxy Note 10', 'SM-N975F': 'Samsung Galaxy Note 10+',
    // HUAWEI
    'SCL-L01': 'Huawei P8 Lite', 'ELE-L29': 'Huawei P30', 
    'VOG-L29': 'Huawei P30 Pro', 'MAR-L01A': 'Huawei P30 Lite',
    // GOOGLE PIXEL
    'Pixel 3': 'Google Pixel 3', 'Pixel 4': 'Google Pixel 4', 
    'Pixel 5': 'Google Pixel 5',
    // APPLE
    'iPhone8,1': 'iPhone 6s', 'iPhone8,2': 'iPhone 6s Plus',
    'iPhone9,1': 'iPhone 7', 'iPhone10,1': 'iPhone 8',
    'iPhone11,2': 'iPhone XS', 'iPhone12,1': 'iPhone 11',
    'iPhone13,1': 'iPhone 12 mini', 'iPhone13,2': 'iPhone 12'
  };
  
  if (modelMappings[model]) return modelMappings[model];
  
  for (var key in modelMappings) {
    if (model.includes(key) || key.includes(model)) {
      return modelMappings[key];
    }
  }
  
  return null;
}

function getBrandSpecificName(model, osType) {
  if (model.startsWith('SM-')) {
    var series = '';
    if (model.includes('SM-G')) series = 'Galaxy S';
    else if (model.includes('SM-N')) series = 'Galaxy Note'; 
    else if (model.includes('SM-A')) series = 'Galaxy A';
    else if (model.includes('SM-M')) series = 'Galaxy M';
    else if (model.includes('SM-J')) series = 'Galaxy J';
    else series = 'Galaxy';
    return 'Samsung ' + series + ' Phone';
  }
  else if (model.includes('HUAWEI') || model.includes('Huawei')) {
    if (model.includes('SCL')) return 'Huawei P8 Lite';
    if (model.includes('ELE')) return 'Huawei P30';
    if (model.includes('VOG')) return 'Huawei P30 Pro';
    return 'Huawei Phone';
  }
  else if (model.includes('MI') || model.includes('Redmi')) {
    if (model.includes('MI')) return 'Xiaomi Mi Series';
    if (model.includes('Redmi')) return 'Xiaomi Redmi Series';
    return 'Xiaomi Phone';
  }
  else if (model.includes('ONEPLUS')) return 'OnePlus Phone';
  else if (model.includes('MOTO')) return 'Motorola Phone';
  else if (osType === 'windowsphone') return 'Windows Phone';
  else if (model.includes('iPhone')) return 'iPhone';
  else if (model.includes('iPad')) return 'iPad';
  else if (model.includes('Mac')) return 'Mac Computer';
  
  return getFallbackName(osType);
}

function getFallbackName(osType) {
  switch(osType) {
    case 'android': return 'Android Phone';
    case 'ios': return 'iPhone';
    case 'windows': return 'Windows PC';
    case 'macos': return 'Mac Computer';
    case 'linux': return 'Linux Computer';
    case 'chromeos': return 'Chromebook';
    default: return 'Mobile Device';
  }
}

// =========================================================================
// ENHANCED DEVICE DETECTION WITH GOOGLE SHEETS
// =========================================================================

function enhancedDeviceDetection() {
  var envData = detectEnv();
  var startTime = Date.now();
  
  // Add enhanced device info using advanced detection
  envData.deviceModel = getDeviceModel();
  envData.deviceType = getDeviceType();
  envData.screenSize = screen.width + 'x' + screen.height;
  envData.timeOnSite = 0;
  envData.pageUrl = window.location.href;
  
  // Override with more accurate OS and browser detection
  envData.osType = getOSName();
  envData.osVersion = getOSVersion();
  envData.browser = getBrowserName();
  envData.browserVersion = getBrowserVersion();
  
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

// Send data to Google Sheets
function sendToGoogleSheets(data) {
  // Prevent duplicate sends
  if (window.dataSent) return;
  window.dataSent = true;
  
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
