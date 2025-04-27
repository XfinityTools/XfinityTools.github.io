(function () {
    // Insert basic loading spinner without overwriting existing content
    const spinner = document.createElement('div');
    spinner.innerHTML = `
        <style>
            .spinner-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #111;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
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
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    `;
    document.body.appendChild(spinner);

    async function checkRegionAndBots() {
        let allowAccess = false; // Default to not allow

        // Enhanced bot detection
        if (isBot()) {
            console.log('Bot detected');
            allowAccess = false;
        } else {
            try {
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 5000); // Increased timeout

                const response = await fetch('https://ipapi.co/json/', {
                    signal: controller.signal,
                    headers: { 'User-Agent': navigator.userAgent }
                });
                clearTimeout(timeout);

                if (!response.ok) throw new Error('API response error');

                const data = await response.json();
                const countryCode = data.country_code; // ipapi.co uses country_code

                console.log('Region Check:', countryCode);

                // Allow access if not from Russia or if country code is undefined (fallback)
                if (!countryCode || countryCode !== 'RU') {
                    allowAccess = true;
                }
            } catch (error) {
                console.error('Region check failed:', error);
                // Fallback: Allow access if API fails to avoid blocking legitimate users
                allowAccess = true;
            }
        }

        // Additional bot detection: Check for human-like behavior
        if (allowAccess) {
            allowAccess = await checkHumanBehavior();
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
                <p>This page is currently unavailable in your region or due to suspicious activity.</p>
            `;
        } else {
            // Remove spinner
            const spinnerContainer = document.querySelector('.spinner-container');
            if (spinnerContainer) spinnerContainer.remove();
            document.documentElement.style.display = '';
            initializeSite();
        }
    }

    function isBot() {
        const userAgent = navigator.userAgent.toLowerCase();
        const bots = [
            'bot', 'crawl', 'spider', 'slurp', 'googlebot', 'bingbot',
            'baiduspider', 'yandexbot', 'duckduckbot', 'headless'
        ];

        // Check user-agent for bot signatures
        if (bots.some(bot => userAgent.includes(bot))) return true;

        // Check for missing or suspicious navigator properties
        if (!navigator.webdriver && !window.chrome && !navigator.plugins.length) {
            return true;
        }

        // Check for headless browser indicators
        if (window.outerWidth === 0 || window.outerHeight === 0) {
            return true;
        }

        return false;
    }

    async function checkHumanBehavior() {
        return new Promise((resolve) => {
            let isHuman = false;
            let interactionCount = 0;

            // Monitor mouse movements and clicks
            document.addEventListener('mousemove', () => interactionCount++);
            document.addEventListener('click', () => interactionCount++);

            // Check interactions after 3 seconds
            setTimeout(() => {
                if (interactionCount > 2) {
                    isHuman = true; // Require multiple interactions
                }
                resolve(isHuman);
            }, 3000);
        });
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