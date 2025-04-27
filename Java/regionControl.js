(function () {
    // Insert basic loading spinner
    document.body.innerHTML = `
    <style>
      body {
        margin: 0;
        background: #111;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      .spinner {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #3498db;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
    <div class="spinner"></div>
  `;

    async function checkRegionAndBots() {
        let allowAccess = false; // Default to not allow

        // Detect potential bots based on User-Agent or other headers
        if (isBot()) {
            allowAccess = false;
        }

        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 3000);

            const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
            clearTimeout(timeout);

            if (!response.ok) throw new Error('API response error');

            const data = await response.json();
            const countryCode = data.country;

            console.log('Region Check:', countryCode); // Safe log

            // Allow access if not from Russia
            if (countryCode && countryCode !== 'RU') {
                allowAccess = true;
            }
        } catch (error) {
            console.error('Region check failed:', error);
        }

        if (!allowAccess) {
            document.body.innerHTML = `
        <style>
          body {
            margin: 0;
            background: #111;
            color: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-family: sans-serif;
            text-align: center;
          }
        </style>
        <h1>Content Unavailable</h1>
        <p>This page is currently unavailable in your region.</p>
      `;
        } else {
            document.body.innerHTML = ''; // Clear spinner
            document.documentElement.style.display = '';
            initializeSite();
        }
    }

    function isBot() {
        // Simple bot detection based on common user-agents
        const userAgent = navigator.userAgent.toLowerCase();
        const bots = [
            'bot', 'crawl', 'spider', 'slurp', 'googlebot', 'bingbot', 'baiduspider', 'yandexbot', 'duckduckbot'
        ];

        return bots.some(bot => userAgent.includes(bot));
    }

    function initializeSite() {
        // Load Google Analytics
        const gtagScript = document.createElement('script');
        gtagScript.async = true;
        gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-MW6PG5PVGY';
        document.head.appendChild(gtagScript);

        gtagScript.onload = function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-MW6PG5PVGY');
        };

        // Load AdSense
        const adsenseScript = document.createElement('script');
        adsenseScript.async = true;
        adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6760354428989736';
        adsenseScript.crossOrigin = 'anonymous';
        document.head.appendChild(adsenseScript);
    }

    checkRegionAndBots();
})();
