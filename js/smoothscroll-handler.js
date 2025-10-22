/**
 * Smooth Scroll Compatibility Handler
 * -----------------------------------
 * This script ensures smooth scrolling works across all browsers by layering support:
 *
 * 1. ✅ Native Support:
 *    - If the browser supports `scrollBehavior: 'smooth'`, use it directly.
 *
 * 2. 🌐 CDN Polyfill:
 *    - If native support is missing, attempt to load the smoothscroll polyfill from a CDN.
 *    - CDN: https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
 *
 * 3. 📁 Local Polyfill:
 *    - If the CDN fails (ex. offline, blocked), fall back to a locally hosted version:
 *      js/smoothscroll.min.js
 *
 * 4. 🧱 Final Fallback:
 *    - If both polyfill sources fail, define `scrollToTop()` using instant scroll (no smooth behavior).
 *
 * 5. 🧪 Debugging:
 *    - Logs each step to the console for visibility and testing across devices.
 *
 * Usage:
 * - Call `scrollToTop()` to scroll to the top of the page using the best available method.
 * - Example: <button onclick="scrollToTop()">Back to Top</button>
 *
 */

function loadScript(src, onSuccess, onFailure) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = onSuccess;
  script.onerror = onFailure;
  document.head.appendChild(script);
}

document.addEventListener('DOMContentLoaded', function () {
  if ('scrollBehavior' in document.documentElement.style) {
    console.log("✅ Native smooth scroll supported");
    window.scrollToTop = function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return;
  }

  console.log("⚠️ Native smooth scroll NOT supported. Trying CDN polyfill...");

  loadScript(
    "https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js",
    function () {
      console.log("✅ Smooth Scroll Polyfill loaded from CDN");
      smoothscroll.polyfill();
      window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    },
    function () {
      console.log("❌ CDN failed. Trying local polyfill...");

      loadScript(
        "js/smoothscroll.min.js",
        function () {
          console.log("✅ Smooth Scroll Polyfill loaded from local file");
          smoothscroll.polyfill();
          window.scrollToTop = function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          };
        },
        function () {
          console.log("❌ Local polyfill failed. Using instant scroll fallback");
          window.scrollToTop = function () {
            window.scrollTo(0, 0);
          };
        }
      );
    }
  );
});
