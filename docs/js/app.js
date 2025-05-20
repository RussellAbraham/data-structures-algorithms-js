// Description: A simple JavaScript utility library for DOM manipulation, event handling, and Bootstrap component activation.
(function (global) {
  'use strict';

  const App = {
    version: '1.0.0',
    
    // DOM Ready utility
    onReady(fn) {
      if (document.readyState !== 'loading') {
        fn();
      } else {
        document.addEventListener('DOMContentLoaded', fn);
      }
    },

    // Element selector shortcuts
    $: (selector, root = document) => root.querySelector(selector),
    $$: (selector, root = document) => Array.from(root.querySelectorAll(selector)),

    // Safe event binding
    on(el, event, selectorOrHandler, handler) {
      if (typeof selectorOrHandler === 'function') {
        el.addEventListener(event, selectorOrHandler);
      } else {
        el.addEventListener(event, e => {
          if (e.target.closest(selectorOrHandler)) handler(e);
        });
      }
    },

    // Bootstrap 5 component activator
    initBootstrapComponents() {
      if (window.bootstrap) {
        App.$$('.toast').forEach(el => new bootstrap.Toast(el));
        App.$$('.tooltip').forEach(el => new bootstrap.Tooltip(el));
        App.$$('.popover').forEach(el => new bootstrap.Popover(el));
      }
    },

    // Utility
    debounce(fn, delay = 300) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(...args), delay);
      };
    },

    throttle(fn, limit = 300) {
      let inThrottle;
      return function (...args) {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    }
  };

  // Auto-init
  App.onReady(() => {
    App.initBootstrapComponents();
    console.log(`App ready. v${App.version}`);
  });

  // Export for Node or browser
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
  } else {
    global.App = App;
  }

})(typeof window !== 'undefined' ? window : global);
