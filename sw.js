/* Executive Pro — Service Worker
   - ไม่แคชข้อมูลบัญชี (Google Apps Script) เด็ดขาด
   - หน้าแอปใช้ "เครือข่ายก่อน" เสมอ เพื่อให้ได้เวอร์ชันล่าสุด แคชไว้ใช้เฉพาะตอนออฟไลน์ */
const CACHE = 'execpro-shell-v5.1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => null)); self.skipWaiting(); });
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
    const req = e.request; if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (/script\.google(usercontent)?\.com$/.test(url.hostname)) return;            // ข้อมูลจริง: ผ่านเครือข่ายเสมอ
    const sameOrigin = url.origin === self.location.origin;
    const lib = /^(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/.test(url.hostname);
    if (!sameOrigin && !lib) return;
    if (sameOrigin && url.searchParams.has('_chk')) return;                            // ตรวจเวอร์ชัน: ห้ามใช้แคช
    e.respondWith(fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(sameOrigin && req.mode === 'navigate' ? './index.html' : req, copy)).catch(() => null); }
        return res;
    }).catch(() => caches.match(sameOrigin && req.mode === 'navigate' ? './index.html' : req).then(r => r || caches.match('./index.html'))));
});
