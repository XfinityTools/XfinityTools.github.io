(function () {
    // Insert basic loading spinner
    const spinner = document.createElement('div');
    spinner.innerHTML = `
        <style>
            .spinner-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #000;
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
        let allowAccess = false;

        if (isBot()) {
            console.log('Bot detected');
            allowAccess = false;
        } else {
            try {
                const countryCode = await getCountryCode();
                console.log('Region Check:', countryCode);

                if (countryCode && countryCode !== 'RU') {
                    allowAccess = true;
                } else {
                    allowAccess = false;
                }
            } catch (error) {
                console.error('Region check failed:', error);
                allowAccess = false; // Default to block on API failure
            }
        }

        if (allowAccess) {
            allowAccess = await checkHumanBehavior();
        }

        if (!allowAccess) {
            document.body.innerHTML = `
                <style>
                    body {
                        margin: 0;
                        background: #000;
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
                <h1>Access Denied</h1>
                <p>This content is not available in your region or failed verification checks.</p>
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
            'baiduspider', 'yandexbot', 'duckduckbot', 'headless', 'phantomjs', 'selenium'
        ];

        if (bots.some(bot => userAgent.includes(bot))) return true;
        if (navigator.webdriver) return true;
        if (!navigator.plugins.length) return true;
        if (window.outerWidth === 0 || window.outerHeight === 0) return true;
        if (window.chrome === undefined && /headless/.test(userAgent)) return true;

        return false;
    }

    async function getCountryCode() {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
            clearTimeout(timeout);

            if (response.ok) {
                const data = await response.json();
                if (data && data.country_code) {
                    return data.country_code;
                }
            }
        } catch (error) {
            console.warn('IP API failed', error);
        }

        throw new Error('Unable to determine country');
    }


    async function checkHumanBehavior() {
        return new Promise((resolve) => {
            let interactionCount = 0;

            document.addEventListener('mousemove', () => interactionCount++);
            document.addEventListener('keydown', () => interactionCount++);
            document.addEventListener('scroll', () => interactionCount++);
            document.addEventListener('click', () => interactionCount++);

            setTimeout(() => {
                resolve(interactionCount > 5); // Require 5+ interactions within 5 seconds
            }, 5000);
        });
    }

    function initializeSite() {
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

        const adsenseScript = document.createElement('script');
        adsenseScript.async = true;
        adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6760354428989736';
        adsenseScript.crossOrigin = 'anonymous';
        document.head.appendChild(adsenseScript);
    }

    checkRegionAndBots();
})();
