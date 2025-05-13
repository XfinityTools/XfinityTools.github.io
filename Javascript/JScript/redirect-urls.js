document.addEventListener("DOMContentLoaded", function () {
    const url = window.location.href;

    // Only run redirect on hosted site (not local file paths)
    if (url.startsWith("http") && url.endsWith(".html")) {
        const cleanUrl = url.replace(/\.html$/, "");
        window.location.replace(cleanUrl);
    }
});
