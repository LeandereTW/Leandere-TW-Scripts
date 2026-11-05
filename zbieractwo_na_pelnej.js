// Disclaimer
// By uploading a user-generated mod for use with Tribal Wars, the creator grants InnoGames a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, reproduce, distribute, publicly display, modify, and create derivative works of the mod. This license permits InnoGames to incorporate the mod into any aspect of the game and its related services, including promotional and commercial endeavors, without any requirement for compensation or attribution to the uploader. The uploader represents and warrants that they have the legal right to grant this license and that the mod does not infringe upon any third-party rights. German law applies.
//
// author: Desunia
// version: 1.0
// Zbieractwo na pelnej / Full Scavenging

(function () {
    'use strict';

    const ZNP_ID = 'znp' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    const HTML = document.documentElement;
    HTML.setAttribute('data-znp-inst', ZNP_ID);
    const aktywna = () => HTML.getAttribute('data-znp-inst') === ZNP_ID;

    const armTs = v => { if (v !== undefined) HTML.setAttribute('data-znp-arm', String(v));
                         return parseInt(HTML.getAttribute('data-znp-arm'), 10) || 0; };

    const LF  = [0.10, 0.25, 0.50, 0.75];
    const MIN_MIEJSC = 10;
    const POP = { spear: 1, sword: 1, axe: 1, archer: 1, spy: 2, light: 4, marcher: 5, heavy: 6,
                  ram: 5, catapult: 8, knight: 10, snob: 100 };
    const miejsca = a => Object.keys(a).reduce((s, n) => s + (a[n] || 0) * (POP[n] || 1), 0);
    const DIS = 1800;
    const K   = Math.pow(100, 0.45);
    const EXP = 0.9;

    const LOGO = 'data:image/png;base64,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';

    const CARRY_FALLBACK = {
        spear: 25, sword: 15, axe: 10, archer: 10,
        light: 80, marcher: 50, heavy: 50, knight: 100,
        spy: 0, ram: 0, catapult: 0, snob: 0
    };

    const UNIT_PL = {
        spear: 'pik', sword: 'miecz', axe: 'top', archer: '\u0142uk',
        light: 'LK', marcher: '\u0141K', heavy: 'CK', knight: 'rycerz', spy: 'zwiad'
    };

    const CFG_KEY = 'desunia_zbieractwo_cfg_v3';
    const RET_KEY = 'desunia_zbieractwo_powroty_v3';

    const DEFAULTS = {
        mode: 'optimum', order: 'asc', skipLevel1: false, skipL1Below: 350, skipL1Min: 0,
        maxMinutes: 0, reserve: {}, enabled: {}, autoAdvance: true, dfOverride: 0, speedOverride: 0, secOpen: {}, budzikLuz: 15, massMinGroup: 1, massProg: 3, massCarry: 1, massMaxGroups: 3, massSkipL1Min: 0, massMaxMinutes: 0, maxClock: '', massMaxClock: '', massExcl: {}, massReserve: {}, massEnabled: {},
        open: true, tab: 'planer'
    };

    let cfg = loadCfg();
    function loadCfg() {
        let s = {};
        try { s = JSON.parse(localStorage.getItem(CFG_KEY) || '{}'); } catch (e) {}
        const c = Object.assign({}, DEFAULTS, s);
        c.reserve = Object.assign({}, s.reserve || {});
        c.enabled = Object.assign({}, s.enabled || {});
        c.secOpen = Object.assign({}, s.secOpen || {});
        c.massExcl = Object.assign({}, s.massExcl || {});

        c.massReserve = Object.assign({}, s.massReserve !== undefined ? s.massReserve : (s.reserve || {}));
        c.massEnabled = Object.assign({}, s.massEnabled !== undefined ? s.massEnabled : (s.enabled || {}));

        if (s.massMaxMinutes === undefined) c.massMaxMinutes = parseInt(s.maxMinutes, 10) || 0;
        return c;
    }

    const rezerwaZ = (tryb, n) => parseInt((tryb === 'mass' ? cfg.massReserve : cfg.reserve)[n], 10) || 0;
    const wlaczonyZ = (tryb, n) => { const e = (tryb === 'mass' ? cfg.massEnabled : cfg.enabled)[n]; return e !== undefined ? !!e : true; };

    function saveCfg() { try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch (e) {} }

    const gd = () => { try { return window.game_data || {}; } catch (e) { return {}; } };
    const ekran = () => (gd().screen || (location.href.match(/[?&]screen=([a-z_]+)/) || [])[1] || '');
    const tryb  = () => ((location.href.match(/[?&]mode=([a-z_]+)/) || [])[1] || gd().mode || '');
    const onScav = () => (ekran() === 'place' && tryb() === 'scavenge') ||
        (!!document.getElementById('scavenge_screen') && !document.getElementById('scavenge_mass_screen'));
    const scr = () => document.querySelector('#scavenge_screen') || document.body;

    let PROBE = {};
    function readPage() {
        const o = {};
        try {
            const gd = window.game_data;
            if (gd) {
                o.speed = parseFloat(gd.speed); o.units = gd.units;
                if (gd.village) { o.vid = String(gd.village.id); o.vname = gd.village.name; o.vx = gd.village.x; o.vy = gd.village.y; }
            }
            const S = window.ScavengeScreen;
            if (S) {
                const v = S.village || {};
                o.df = parseFloat(v.duration_factor || S.duration_factor);
                if (!(o.df > 0) && v.options) {
                    for (const k in v.options) { const d = parseFloat(v.options[k].duration_factor); if (d > 0) { o.df = d; break; } }
                }
                o.carry = v.unit_carry_capacities || S.unit_carry_capacities || null;
            }
        } catch (e) { o.err = String(e); }
        PROBE = o;
        return PROBE;
    }

    function worldSpeed() {
        const man = parseFloat(cfg.speedOverride);
        if (man > 0 && isFinite(man)) return man;
        if (PROBE.speed > 0 && isFinite(PROBE.speed)) return PROBE.speed;
        try { if (window.game_data && window.game_data.speed) return parseFloat(window.game_data.speed); } catch (e) {}
        return 0;
    }

    function dfFromScreen() {
        const C = enteredCapacity();
        if (!(C > 0)) return null;

        const vals = [];
        options().forEach(el => {
            if (optionState(el) !== 'free') return;
            const inf = optionInfo(el);
            if (!inf.loot || !inf.sec) return;
            const r = inf.loot / C;
            const ok = LF.some(f => Math.abs(r - f) <= 0.02);
            if (!ok) return;
            const df = inf.sec / (K * Math.pow(inf.loot, EXP) + DIS);
            if (df > 0.15 && df < 3) vals.push(df);
        });
        if (!vals.length) return null;
        vals.sort((x, y) => x - y);
        return vals[Math.floor(vals.length / 2)];
    }

    function dfFromGame() {
        const direct = [
            () => window.ScavengeScreen.village.duration_factor,
            () => window.ScavengeScreen.duration_factor
        ];
        for (const f of direct) {
            try { const v = parseFloat(f()); if (v > 0 && isFinite(v)) return v; } catch (e) {}
        }
        try {
            const o = window.ScavengeScreen.village.options;
            for (const k in o) {
                const v = parseFloat(o[k].duration_factor);
                if (v > 0 && isFinite(v)) return v;
            }
        } catch (e) {}
        return null;
    }

    let DF = 1, DF_SRC = 'domy\u015blny', DF_OK = false;

    function dfZeZrodla() {
        const sc = document.querySelectorAll('script');
        for (let i = 0; i < sc.length; i++) {
            const txt = sc[i].textContent || '';
            if (txt.indexOf('duration_factor') < 0) continue;
            const m = txt.match(/"duration_factor"\s*:\s*"?([\d.]+)"?/);
            if (m) { const v = parseFloat(m[1]); if (v > 0 && isFinite(v)) return v; }
        }

        for (let i = 0; i < sc.length; i++) {
            const txt = sc[i].textContent || '';
            if (!/Scavenge(Mass)?Screen/.test(txt)) continue;
            const frag = txt.match(/\{.*\:\{.*\:.*\}\}/g);
            if (!frag) continue;
            for (let j = 0; j < frag.length; j++) {
                try {
                    const o = JSON.parse(frag[j]);
                    for (const k in o) {
                        const v = parseFloat(o[k] && o[k].duration_factor);
                        if (v > 0 && isFinite(v)) return v;
                    }
                } catch (e) {}
            }
        }
        return 0;
    }

    const DF_KEY = 'desunia_zbieractwo_df_v1';
    function zapiszDF(v) { try { localStorage.setItem(DF_KEY, String(v)); } catch (e) {} }
    function odczytDF() { const v = parseFloat(localStorage.getItem(DF_KEY)); return (v > 0 && isFinite(v)) ? v : 0; }

    function detectDF() {
        DF_OK = false;
        readPage();
        const man = parseFloat(cfg.dfOverride);
        if (man > 0 && isFinite(man)) { DF = man; DF_SRC = 'df wpisany r\u0119cznie'; DF_OK = true; return; }
        const msp = parseFloat(cfg.speedOverride);
        if (msp > 0 && isFinite(msp)) { DF = Math.pow(msp, -0.55); DF_SRC = 'pr\u0119dko\u015b\u0107 wpisana r\u0119cznie (x' + msp + ')'; DF_OK = true; return; }
        if (PROBE.df > 0 && isFinite(PROBE.df)) { DF = PROBE.df; DF_SRC = 'z gry (sonda strony)'; DF_OK = true; zapiszDF(PROBE.df); return; }
        const zz = dfZeZrodla();
        if (zz) { DF = zz; DF_SRC = 'z konfiguracji w \u017ar\u00f3dle strony'; DF_OK = true; zapiszDF(zz); return; }
        const m = dfFromScreen();
        if (m) { DF = m; DF_SRC = 'zmierzony z ekranu gry'; DF_OK = true; zapiszDF(m); return; }
        const zap = odczytDF();
        if (zap) { DF = zap; DF_SRC = 'zmierzony wcze\u015bniej (zapami\u0119tany)'; DF_OK = true; return; }
        const g = dfFromGame();
        if (g) { DF = g; DF_SRC = 'z konfiguracji gry'; DF_OK = true; return; }
        const sp = worldSpeed();
        if (sp > 0) { DF = Math.pow(sp, -0.55); DF_SRC = 'z pr\u0119dko\u015bci \u015bwiata (x' + sp + ')'; DF_OK = true; return; }
        DF = 1; DF_SRC = 'NIEZNANY \u2014 wpisz pr\u0119dko\u015b\u0107 w ustawieniach'; DF_OK = false;
    }

    const speedFromDF = () => Math.pow(DF, -1 / 0.55);

    function carryCaps() {
        if (PROBE.carry && typeof PROBE.carry === 'object' && Object.keys(PROBE.carry).length) {
            const o = {}; for (const k in PROBE.carry) o[k] = parseInt(PROBE.carry[k], 10) || 0; return o;
        }
        const t = [
            () => window.ScavengeScreen.village.unit_carry_capacities,
            () => window.ScavengeScreen.unit_carry_capacities,
            () => window.game_data.units_carry
        ];
        for (const f of t) {
            try {
                const v = f();
                if (v && typeof v === 'object' && Object.keys(v).length) {
                    const o = {}; for (const k in v) o[k] = parseInt(v[k], 10) || 0; return o;
                }
            } catch (e) {}
        }
        return Object.assign({}, CARRY_FALLBACK);
    }

    function unitInputs() {
        const root = scr(), map = {};
        const sels = ['.candidate-squad-widget input[name]', '.squad-widget input[name]',
                      'input.unitsInput[name]', 'table.candidate-squad-widget input[name]'];
        for (const s of sels) {
            root.querySelectorAll(s).forEach(i => {
                const n = i.getAttribute('name');
                if (n && CARRY_FALLBACK[n] !== undefined && !map[n]) map[n] = i;
            });
            if (Object.keys(map).length) break;
        }
        return map;
    }
    function availableFor(name, input) {
        if (input) {
            const cell = input.closest('td') || input.parentElement;
            if (cell) {
                const a = cell.querySelector('.units-entry-all, a[data-all-count]');
                if (a) {
                    const d = a.getAttribute('data-all-count');
                    if (d !== null && d !== '') return parseInt(d, 10) || 0;
                    const m = (a.textContent || '').match(/\d+/);
                    if (m) return parseInt(m[0], 10) || 0;
                }
            }
        }
        const t = [() => window.ScavengeScreen.village.unit_counts[name],
                   () => window.ScavengeScreen.unit_counts[name]];
        for (const f of t) { try { const v = f(); if (v != null) return parseInt(v, 10) || 0; } catch (e) {} }
        return 0;
    }
    function options() {
        let o = Array.from(scr().querySelectorAll('.scavenge-option'));
        if (!o.length) o = Array.from(document.querySelectorAll('.scavenge-option'));
        return o;
    }
    const startBtn = el => el ? el.querySelector('.free_send_button') : null;

    let LVLMAP = null;

    function optionInfo(el) {
        const nums = [];
        let sec = null;
        try {
            const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
            let n;
            while ((n = w.nextNode())) {
                const t = (n.nodeValue || '').replace(/\u00a0/g, ' ').trim();
                if (!t) continue;
                const tm = t.match(/(\d+):(\d{2}):(\d{2})/);
                if (tm) { sec = (+tm[1]) * 3600 + (+tm[2]) * 60 + (+tm[3]); break; }
                if (/^\d[\d. ]*$/.test(t)) {
                    const v = parseInt(t.replace(/[. ]/g, ''), 10);
                    if (isFinite(v) && v >= 0) nums.push(v);
                }
            }
        } catch (e) {  }
        let loot = 0;
        if (nums.length >= 3) {
            const three = nums.slice(-3);
            if (Math.max.apply(null, three) <= Math.min.apply(null, three) * 1.35)
                loot = three.reduce((a, b) => a + b, 0);
        }
        return { loot: loot, sec: sec };
    }

    function enteredCapacity() {
        const inp = unitInputs(), cap = carryCaps();
        let c = 0;
        for (const n in inp) {
            const v = parseInt(inp[n].value, 10) || 0;
            c += v * (cap[n] !== undefined ? cap[n] : (CARRY_FALLBACK[n] || 0));
        }
        return c;
    }

    function detectLevelMap() {
        const els = options();
        const C = enteredCapacity();
        if (els.length < 2 || C <= 0) return null;
        const out = new Array(els.length).fill(null);
        const uzyte = {};
        for (let i = 0; i < els.length; i++) {
            if (optionState(els[i]) !== 'free') continue;
            const inf = optionInfo(els[i]);
            if (!inf.loot) continue;
            const r = inf.loot / C;
            let best = -1, bd = 1e9;
            LF.forEach((f, j) => { const d = Math.abs(r - f); if (d < bd) { bd = d; best = j; } });
            if (bd > 0.045 || uzyte[best]) continue;
            out[i] = best; uzyte[best] = true;
        }
        if (!Object.keys(uzyte).length) return null;
        const wolne = [];
        for (let j = 0; j < LF.length; j++) if (!uzyte[j]) wolne.push(j);
        for (let i = 0; i < out.length; i++) if (out[i] === null) out[i] = wolne.shift();
        for (let i = 0; i < out.length; i++) if (out[i] === undefined || out[i] === null) return null;
        return out;
    }
    function refreshLevelMap() { const m = detectLevelMap(); if (m) LVLMAP = m; return LVLMAP; }

    const levelOf  = idx => (LVLMAP && LVLMAP[idx] !== undefined) ? LVLMAP[idx] : idx;
    const idxOf    = lv  => { if (!LVLMAP) return lv; const i = LVLMAP.indexOf(lv); return i < 0 ? lv : i; };
    const elForLevel = lv => options()[idxOf(lv)];
    function stateOfLevel(lv) { const el = elForLevel(lv); return el ? optionState(el) : 'locked'; }

    function countdownSeconds(el) {
        if (!el) return null;
        const n = el.querySelector('.return-countdown, .countdown, .scavenge-timer, [data-endtime]');
        if (!n) return null;
        const e = n.getAttribute && n.getAttribute('data-endtime');
        if (e) { const s = parseInt(e, 10) - Math.floor(Date.now() / 1000); if (isFinite(s)) return Math.max(0, s); }
        const m = (n.textContent || '').match(/(\d+):(\d{2}):(\d{2})/);
        if (m) return (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]);
        const m2 = (n.textContent || '').match(/(\d+):(\d{2})/);
        if (m2) return (+m2[1]) * 60 + (+m2[2]);
        return null;
    }
    function optionState(el) {
        if (!el) return 'locked';
        if (el.querySelector('.unlock-button, .lock, .locked')) return 'locked';
        const b = startBtn(el);
        if (b) {
            const d = b.classList.contains('btn-disabled') || b.classList.contains('disabled') || b.hasAttribute('disabled');
            if (!d && b.offsetParent !== null) return 'free';
        }
        return countdownSeconds(el) != null ? 'busy' : 'locked';
    }
    function villageInfo() {
        if (PROBE.vid) return { id: PROBE.vid, name: PROBE.vname || PROBE.vid, coord: PROBE.vx + '|' + PROBE.vy };
        try { const v = window.game_data.village; return { id: String(v.id), name: v.name, coord: v.x + '|' + v.y }; }
        catch (e) {}
        const m = location.href.match(/village=(\d+)/);
        return m ? { id: m[1], name: 'wioska ' + m[1], coord: '?' } : null;
    }

    const runTime = L => L <= 0 ? 0 : (K * Math.pow(L, EXP) + DIS) * DF;

    function solveLoot(mu) {
        if (!(mu > 0) || mu >= 1 / DIS) return 0;
        const a = mu, b = 3600 * mu - 0.1, c = 3240000 * mu - 1800;
        const d = b * b - 4 * a * c;
        if (d < 0) return 0;
        const u = (-b + Math.sqrt(d)) / (2 * a);
        if (!(u > 0)) return 0;
        return Math.pow(u / K, 1 / EXP);
    }
    function lootCap(maxSec) {
        if (!maxSec || maxSec <= 0) return Infinity;
        const inner = maxSec / DF - DIS;
        return inner <= 0 ? Infinity : Math.pow(inner / K, 1 / EXP);
    }
    const capTooLow = s => s > 0 && (s / DF - DIS) <= 0;
    const minMinutes = () => Math.ceil(DIS * DF / 60);

    function splitOptimum(total, levels, maxSec) {
        const Lmax = lootCap(maxSec);
        const capsFor = lam => levels.map(i => Math.min(solveLoot(lam * DF / LF[i]), Lmax) / LF[i]);
        const sum = a => a.reduce((x, y) => x + y, 0);
        if (isFinite(Lmax)) {
            const maxTotal = levels.reduce((s, i) => s + Lmax / LF[i], 0);
            if (total >= maxTotal) return levels.map(i => Lmax / LF[i]);
        }
        let lo = 1e-12, hi = 1e-3, g = 0;
        while (sum(capsFor(hi)) > total && g++ < 200) hi *= 2;
        for (let i = 0; i < 70; i++) { const m = (lo + hi) / 2; if (sum(capsFor(m)) > total) lo = m; else hi = m; }
        return capsFor((lo + hi) / 2);
    }
    const shapeEqualTime = (total, lv) => {
        const w = lv.map(i => 1 / LF[i]), s = w.reduce((a, b) => a + b, 0);
        return w.map(x => total * x / s);
    };
    const shapeEqual = (total, lv) => lv.map(() => total / lv.length);
    const longestRun = (caps, levels) =>
        caps.reduce((m, c, j) => Math.max(m, runTime(c * LF[levels[j]])), 0);

    function splitFixedShape(shapeFn, total, levels, maxSec) {
        const full = shapeFn(total, levels);
        if (!maxSec || maxSec <= 0 || longestRun(full, levels) <= maxSec) return full;
        let lo = 0, hi = total;
        for (let i = 0; i < 60; i++) {
            const m = (lo + hi) / 2;
            if (longestRun(shapeFn(m, levels), levels) > maxSec) hi = m; else lo = m;
        }
        return shapeFn(lo, levels);
    }

    function computeSplit(mode, total, levels, maxSec) {
        if (!levels.length || total <= 0) return levels.map(() => 0);
        if (mode === 'equaltime') return splitFixedShape(shapeEqualTime, total, levels, maxSec);
        if (mode === 'equal')     return splitFixedShape(shapeEqual, total, levels, maxSec);
        return splitOptimum(total, levels, maxSec);
    }
    function rateOf(caps, levels) {
        let r = 0;
        caps.forEach((c, j) => { if (c > 0) { const L = c * LF[levels[j]]; r += L / runTime(L) * 3600; } });
        return r;
    }

    function pool() {
        const inp = unitInputs(), cap = carryCaps(), out = [];
        for (const n in inp) {
            const c = cap[n] !== undefined ? cap[n] : (CARRY_FALLBACK[n] || 0);
            if (c <= 0) continue;
            const en = cfg.enabled[n] !== undefined ? cfg.enabled[n] : true;
            const av = availableFor(n, inp[n]);
            const rs = parseInt(cfg.reserve[n], 10) || 0;
            out.push({ name: n, cap: c, avail: av, reserve: rs, enabled: en,
                       usable: en ? Math.max(0, av - rs) : 0, input: inp[n] });
        }
        return out;
    }

    function allocate(p, caps) {
        const totalPool = p.reduce((s, u) => s + u.usable * u.cap, 0);
        const alloc = caps.map(() => ({}));
        if (totalPool <= 0) return alloc;
        const sh = caps.map(c => Math.max(0, Math.min(1, c / totalPool)));
        const shSum = sh.reduce((a, b) => a + b, 0);
        p.forEach(u => {
            if (u.usable <= 0) return;
            const raw = sh.map(s => u.usable * s);
            const base = raw.map(Math.floor);
            let target = Math.min(u.usable, Math.round(u.usable * shSum));
            let rest = target - base.reduce((a, b) => a + b, 0);
            const ord = raw.map((x, i) => ({ i, f: x - Math.floor(x) })).sort((a, b) => b.f - a.f);
            let k = 0;
            while (rest > 0 && ord.length) { base[ord[k % ord.length].i]++; rest--; k++; }
            base.forEach((n, i) => { if (n > 0) alloc[i][u.name] = n; });
        });
        return alloc;
    }
    const allocCap = (a, p) => p.reduce((s, u) => s + (a[u.name] ? a[u.name] * u.cap : 0), 0);

    function freeLevels() {
        refreshLevelMap();
        const free = [];
        options().forEach((el, i) => { if (optionState(el) === 'free') free.push(levelOf(i)); });
        let lv = free.slice();
        let skip = cfg.skipLevel1;

        const pm = parseInt(cfg.skipL1Min, 10) || 0;
        if (!skip && pm > 0) {
            const lvAll = options().map((el, i) => optionState(el) === 'free' ? levelOf(i) + 1 : 0).filter(Boolean);
            const capAll = pool().reduce((a, u) => a + u.usable * u.cap, 0);
            const inv = lvAll.reduce((a, l) => a + 1 / LF[l - 1], 0);
            if (capAll > 0 && inv > 0 && runTime(capAll / inv) < pm * 60) skip = true;
        }
        if (!skip && cfg.skipL1Below > 0) {
            const sp = pool().find(u => u.name === 'spear');
            if ((sp ? sp.usable : 0) < cfg.skipL1Below) skip = true;
        }
        if (skip && lv.length > 1) lv = lv.filter(i => i !== 0);
        return lv.sort((a, b) => a - b);
    }

    let plan = null;

    function buildPlan() {
        const p = pool();
        const total = p.reduce((s, u) => s + u.usable * u.cap, 0);
        let levels = freeLevels();
        const warn = [];
        if (!levels.length) return { error: 'Brak wolnych poziom\u00f3w zbieractwa.' };
        if (total <= 0)     return { error: 'Brak dost\u0119pnego wojska (sprawd\u017a rezerwy).' };

        let maxSec = limitPlaner() * 60;
        if (capTooLow(maxSec)) {
            warn.push('Limit ' + fmtHM(limitPlaner()) + ' jest niewykonalny \u2014 najkr\u00f3tszy bieg na tym \u015bwiecie trwa ' +
                      fmtHM(minMinutes()) + '. Limit pomini\u0119ty.');
            maxSec = 0;
        }

        const mk = caps => {
            const alloc = allocate(p, caps);
            const steps = levels.map((lv, j) => {
                const rc = allocCap(alloc[j], p), L = rc * LF[lv];
                return { level: lv, alloc: alloc[j], cap: rc, time: runTime(L), rate: L > 0 ? L / runTime(L) * 3600 : 0 };
            });
            return steps;
        };

        let caps = computeSplit(cfg.mode, total, levels, maxSec);
        let steps = mk(caps);

        for (let g = 0; maxSec > 0 && g < 8; g++) {
            if (!steps.some(s => s.time > maxSec + 1)) break;
            caps = caps.map(c => c * 0.98);
            steps = mk(caps);
        }

        const pomin = [];
        for (let k = 0; k < 4 && levels.length; k++) {
            const male = steps.filter(s => miejsca(s.alloc) < MIN_MIEJSC).map(s => s.level);
            if (!male.length) break;
            const przyLimicie = maxSec > 0 && steps.some(s => s.time >= maxSec - 60);
            const nowe = przyLimicie ? levels.filter(l => male.indexOf(l) < 0) : levels.slice(1);
            levels.filter(l => nowe.indexOf(l) < 0).forEach(l => pomin.push(l + 1));
            levels = nowe;
            if (!levels.length) break;
            caps = computeSplit(cfg.mode, total, levels, maxSec);
            steps = mk(caps);
            for (let g = 0; maxSec > 0 && g < 8; g++) {
                if (!steps.some(s => s.time > maxSec + 1)) break;
                caps = caps.map(c => c * 0.98);
                steps = mk(caps);
            }
        }
        if (!levels.length) return { error: 'Za ma\u0142o wojska: ka\u017cdy poziom musi zaj\u0105\u0107 co najmniej 10 miejsc w zagrodzie (np. 10 pik\u00f3w albo 3 LK).' };
        if (pomin.length) warn.push('Pomini\u0119to poz. ' + pomin.sort().join(', ') +
            ' \u2014 przy tym wojsku poziom zaj\u0105\u0142by mniej ni\u017c 10 miejsc w zagrodzie, a takiego sk\u0142adu gra nie wy\u015ble.');
        steps.sort((a, b) => cfg.order === 'desc' ? b.level - a.level : a.level - b.level);

        const used = steps.reduce((s, x) => s + x.cap, 0);
        if (total - used > 1)
            warn.push('Limit czasu zostawia w wiosce ' + fmtNum(total - used) + ' pojemno\u015bci (' +
                      Math.round((total - used) / total * 100) + '% wojska).');

        return { steps, pointer: 0, total, used, rate: steps.reduce((s, x) => s + x.rate, 0), warn };
    }

    let cmpCache = null, cmpKey = '';
    function compare() {
        const kp = pool().reduce((s, u) => s + u.usable * u.cap, 0) + '|' + freeLevels().join(',') +
                   '|' + limitPlaner() + '|' + DF.toFixed(6);
        if (cmpKey === kp && cmpCache) return cmpCache;
        cmpKey = kp; cmpCache = compareCalc();
        return cmpCache;
    }
    function compareCalc() {
        const p = pool();
        const total = p.reduce((s, u) => s + u.usable * u.cap, 0);
        const levels = freeLevels();
        let maxSec = limitPlaner() * 60;
        if (capTooLow(maxSec)) maxSec = 0;
        if (!levels.length || total <= 0) return null;
        const o = {};
        ['optimum', 'equaltime', 'equal'].forEach(m => { o[m] = rateOf(computeSplit(m, total, levels, maxSec), levels); });
        return o;
    }

    let EVENTS_SENT = 0;
    function setVal(input, v) {
        if (!input) return;
        const target = String(v);
        if (input.value === target) return;
        const d = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value');
        if (d && d.set) d.set.call(input, target); else input.value = target;
        ['input', 'change'].forEach(ev => { input.dispatchEvent(new Event(ev, { bubbles: true })); EVENTS_SENT++; });
    }
    const clearInputs = () => { const i = unitInputs(); for (const n in i) if (i[n].value !== '') setVal(i[n], ''); };

    function fillStep(step) {
        if (!step) { clearInputs(); return; }
        const el = elForLevel(step.level);
        if (el && optionState(el) !== 'free') { clearInputs(); return; }

        const inp = unitInputs();
        for (const n in inp) setVal(inp[n], step.alloc[n] ? step.alloc[n] : '');
        highlight(step.level);
    }
    function highlight(idx) {
        document.querySelectorAll('.znp-pulse').forEach(e => e.classList.remove('znp-pulse'));
        const el = elForLevel(idx);
        if (!el) return;
        const b = startBtn(el);
        if (b) b.classList.add('znp-pulse');
        try { if (el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
        catch (e) { try { el.scrollIntoView(); } catch (e2) {  } }
    }
    function apply(fresh) {
        if (fresh || !plan || plan.error) plan = buildPlan();
        if (plan.error) return;
        const s = nextStep();
        if (s) fillStep(s); else clearInputs();
    }

    function markSent(levelIdx) {
        if (!plan || plan.error) return;
        plan.sent = plan.sent || {};
        if (levelIdx != null && levelIdx >= 0) plan.sent[levelIdx] = true;
    }

    function nextStep() {
        if (!plan || plan.error) return null;
        plan.sent = plan.sent || {};
        for (let i = 0; i < plan.steps.length; i++) {
            const s = plan.steps[i];
            if (plan.sent[s.level]) continue;
            if (stateOfLevel(s.level) !== 'free') continue;
            plan.pointer = i;
            return s;
        }
        return null;
    }

    function advance() {
        if (!plan || plan.error) { apply(true); render(); return; }
        const s = nextStep();
        if (s) { fillStep(s); render(); return; }

        plan = buildPlan();
        const s2 = nextStep();
        if (s2) fillStep(s2); else clearInputs();
        render();
    }

    function loadReturns() {
        let d = {};
        try { d = JSON.parse(localStorage.getItem(RET_KEY) || '{}'); } catch (e) {}
        const now = Date.now();
        for (const vid in d) {
            const v = d[vid];
            v.levels = v.levels || {};
            for (const lv in v.levels) if (v.levels[lv] < now - 60000) delete v.levels[lv];
            if (!Object.keys(v.levels).length && (now - (v.updated || 0)) > 86400000) delete d[vid];
        }
        return d;
    }
    const saveReturns = d => { try { localStorage.setItem(RET_KEY, JSON.stringify(d)); } catch (e) {} };

    function obiektyJSON(txt, klucz) {
        const out = [];
        for (let i = 0; i < txt.length; i++) {
            const c0 = txt[i];
            if (c0 !== '{' && c0 !== '[') continue;
            let d = 0, wStr = false, esc = false, j = i;
            for (; j < txt.length; j++) {
                const c = txt[j];
                if (wStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') wStr = false; continue; }
                if (c === '"') wStr = true;
                else if (c === '{' || c === '[') d++;
                else if (c === '}' || c === ']') { d--; if (!d) break; }
            }
            if (d) continue;
            const frag = txt.slice(i, j + 1);
            if (frag.indexOf(klucz) < 0) { i = j; continue; }

            try { out.push(JSON.parse(frag)); i = j; } catch (e) {}
        }
        return out;
    }
    function wioskiZeZrodla() {
        const wynik = {};
        const zbierz = o => {
            if (!o || typeof o !== 'object') return;
            if (Array.isArray(o)) { o.forEach(zbierz); return; }
            if (o.village_id !== undefined && o.options && typeof o.options === 'object') { wynik[String(o.village_id)] = o; return; }
            for (const k in o) zbierz(o[k]);
        };
        try {
            document.querySelectorAll('script').forEach(sc => {
                const txt = sc.textContent || '';
                if (txt.indexOf('scavenging_squad') < 0 && txt.indexOf('village_id') < 0) return;
                obiektyJSON(txt, 'village_id').forEach(zbierz);
            });
        } catch (e) {}
        return wynik;
    }
    let ZRODLO_WCZYTANE = false;
    function powrotyZeZrodla() {
        if (ZRODLO_WCZYTANE || !onMass()) return 0;
        ZRODLO_WCZYTANE = true;
        const wsi = wioskiZeZrodla(), ids = Object.keys(wsi);
        if (!ids.length) return 0;
        const store = loadReturns(), now = Date.now();
        let zalad = 0;
        try { zalad = performance.timeOrigin || (now - performance.now()); } catch (e) {}
        let ile = 0;
        ids.forEach(id => {
            const v = wsi[id], e = store[id] || { levels: {} };

            const swiezy = zalad && (e.updated || 0) > zalad;
            e.levels = e.levels || {};
            const nazwa = String(v.village_name || v.name || '').trim();
            const wsp = nazwa.match(/\((\d+\|\d+)\)/);
            if (nazwa) e.name = nazwa.replace(/\s*\(\d+\|\d+\).*$/, '').trim() || nazwa;
            if (wsp) e.coord = wsp[1];
            if (!e.name) e.name = 'wioska ' + id;
            e.coord = e.coord || '';
            for (let l = 1; l <= 4; l++) {
                const o = v.options[l] || v.options[String(l)] || (Array.isArray(v.options) ? v.options[l - 1] : null);
                if (!o) continue;
                const sq = o.scavenging_squad;
                const rt = sq && parseInt(sq.return_time, 10);
                if (rt && rt * 1000 > now) { e.levels[l - 1] = rt * 1000; ile++; }
                else if (!o.is_locked && !swiezy) delete e.levels[l - 1];
            }
            if (!swiezy) e.updated = now;
            store[id] = e;
        });
        saveReturns(store);
        return ile;
    }

    function syncReturns() {
        if (!onScav()) return;
        const v = villageInfo(); if (!v) return;
        const store = loadReturns();
        const e = store[v.id] || { levels: {} };
        e.name = v.name; e.coord = v.coord; e.updated = Date.now(); e.levels = e.levels || {};
        options().forEach((el, i) => {
            const s = countdownSeconds(el);
            const lv = levelOf(i);
            if (s != null && s > 0) e.levels[lv] = Date.now() + s * 1000;
            else if (optionState(el) === 'free') delete e.levels[lv];
        });
        store[v.id] = e;
        saveReturns(store);
    }

    const fmtClock = ts => new Date(ts).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    function fmtLeft(ms) {
        if (ms <= 0) return 'teraz';
        let s = Math.round(ms / 1000), h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
        if (m === 60) { h++; m = 0; }
        return h > 0 ? (m ? h + ' h ' + m + ' min' : h + ' h') : m + ' min';
    }
    function fmtDur(sec) {
        sec = Math.round(sec);
        const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
        return (h ? h + ':' : '') + String(m).padStart(h ? 2 : 1, '0') + ':' + String(s).padStart(2, '0');
    }
    const fmtNum = n => Math.round(n).toLocaleString('pl-PL');

    function fmtHM(min) {
        min = parseInt(min, 10) || 0;
        if (min <= 0) return 'brak';
        return Math.floor(min / 60) + ':' + String(min % 60).padStart(2, '0');
    }

    function parseZegar(txt) {
        const m = String(txt || '').trim().match(/^(?:@|o|at)\s*(\d{1,2})[:.,](\d{2})$/i);
        if (!m || +m[1] > 23 || +m[2] > 59) return '';
        return String(+m[1]).padStart(2, '0') + ':' + m[2];
    }
    function minutyDo(hhmm) {
        const m = String(hhmm || '').match(/^(\d{2}):(\d{2})$/);
        if (!m) return 0;
        const t = new Date(); t.setHours(+m[1], +m[2], 0, 0);
        if (t.getTime() <= Date.now()) t.setDate(t.getDate() + 1);
        return Math.floor((t.getTime() - Date.now()) / 60000);
    }

    const limitPlaner  = () => cfg.maxClock ? minutyDo(cfg.maxClock) : (parseInt(cfg.maxMinutes, 10) || 0);
    const limitMasowe  = () => cfg.massMaxClock ? minutyDo(cfg.massMaxClock) : (parseInt(cfg.massMaxMinutes, 10) || 0);

    function etykietaLimitu(zegar, lim) {
        if (!zegar) return 'Maks. czas biegu \u00b7 min. ' + fmtHM(minMinutes());
        if (lim < minMinutes()) return 'Powr\u00f3t o ' + zegar + ' \u00b7 za blisko, limit pomini\u0119ty';
        return 'Powr\u00f3t o ' + zegar + ' \u00b7 bieg \u2264 ' + fmtHM(lim);
    }

    function parseHM(txt) {
        if (!txt) return 0;
        const t = String(txt).trim().replace(',', ':').replace('.', ':');
        if (!t || /^(brak|0)$/i.test(t)) return 0;
        const m = t.match(/^(\d+):(\d{1,2})$/);
        if (m) return (+m[1]) * 60 + (+m[2]);
        const n = parseInt(t, 10);
        return isFinite(n) && n > 0 ? n : 0;
    }

    function injectCSS() {
        if (document.getElementById('znp-css')) return;
        const st = document.createElement('style');
        st.id = 'znp-css';
        st.textContent = `

#znp{--pap:#fdf6e6;--pap2:#f6ead0;--pap3:#efe0c0;--line:#dcc79c;--line2:#c9ad78;
 --ink:#4a3a22;--ink2:#7a6642;--dim:#9b8763;
 --wheat:#d9a441;--wheat2:#b8801f;--sage:#7d9a55;--terra:#c26a3c;--cream:#fffdf6;
 position:fixed;top:60px;right:12px;z-index:99999;width:440px;max-height:88vh;
 background:linear-gradient(170deg,var(--cream),var(--pap2));
 border:1px solid var(--line2);border-radius:10px;color:var(--ink);
 font-family:Inter,'Segoe UI',Verdana,sans-serif;font-size:12px;display:flex;flex-direction:column;
 box-shadow:0 10px 30px rgba(90,68,32,.22),inset 0 1px 0 rgba(255,255,255,.9);}
#znp *{box-sizing:border-box}
#znp .znp-hd{display:flex;align-items:center;gap:10px;padding:9px 12px;cursor:move;
 background:linear-gradient(180deg,#f3dfae,#e7cd91);border-bottom:1px solid var(--line2);
 border-radius:9px 9px 0 0;box-shadow:inset 0 1px 0 rgba(255,255,255,.75)}
#znp .znp-hd img{width:34px;height:34px;border-radius:50%;box-shadow:0 2px 6px rgba(90,68,32,.3)}
#znp .znp-znak{display:flex;align-items:center;justify-content:center;flex:0 0 auto;
 width:30px;height:30px;border-radius:50%;background:linear-gradient(180deg,#f0c469,#dca43f);
 border:1px solid var(--wheat2);color:#5a3f0f;font-family:'Baloo 2','Segoe UI',sans-serif;
 font-weight:800;font-size:16px;box-shadow:0 2px 5px rgba(90,68,32,.28)}
#znp.znp-pasek .znp-znak{width:26px;height:26px;font-size:14px}
#znp .znp-hd .znp-tt{flex:1;line-height:1.15}
#znp .znp-hd .znp-t1{font-family:'Baloo 2','Segoe UI',Verdana,sans-serif;font-weight:800;font-size:15px;color:#6b4d16;letter-spacing:.3px}
#znp .znp-hd .znp-t2{font-family:'JetBrains Mono',Consolas,'DejaVu Sans Mono',monospace;font-size:9px;color:#96793f}
#znp .znp-hd .znp-x{cursor:pointer;color:#8a6e33;font-size:17px;line-height:1;padding:0 4px}
#znp .znp-hd .znp-x:hover{color:var(--terra)}
#znp .znp-tabs{display:flex;background:var(--pap3);border-bottom:1px solid var(--line)}
#znp .znp-tab{flex:1;text-align:center;padding:7px 4px;cursor:pointer;font-family:'Baloo 2','Segoe UI',Verdana,sans-serif;
 font-weight:700;font-size:11.5px;letter-spacing:.4px;color:var(--ink2);border-bottom:2px solid transparent}
#znp .znp-tab:hover{background:rgba(255,255,255,.5)}
#znp .znp-tab.znp-on{color:#6b4d16;border-bottom-color:var(--wheat);background:var(--cream)}
#znp .znp-body{overflow-y:auto;padding:11px;flex:1}
#znp .znp-body::-webkit-scrollbar{width:9px}
#znp .znp-body::-webkit-scrollbar-track{background:var(--pap3)}
#znp .znp-body::-webkit-scrollbar-thumb{background:var(--line2);border-radius:5px}
#znp .znp-sec{background:var(--cream);border:1px solid var(--line);border-radius:8px;
 padding:10px 11px;margin-bottom:10px;box-shadow:0 2px 5px rgba(90,68,32,.07)}
#znp .znp-sec>h4{margin:0 0 8px;font-family:'Baloo 2','Segoe UI',Verdana,sans-serif;font-weight:700;font-size:12px;
 color:#7a5a1c;border-bottom:1px solid var(--line);padding-bottom:5px;
 display:flex;justify-content:space-between;align-items:baseline;gap:8px}
#znp .znp-sec>h4 em{font-style:normal;font-family:'JetBrains Mono',Consolas,'DejaVu Sans Mono',monospace;font-size:9.5px;color:var(--dim)}
#znp .znp-sec>h4{flex-wrap:wrap}
#znp .znp-sec>h4 em.znp-tip{flex:1 1 100%;min-width:0;white-space:normal;order:3;
 font-family:Inter,'Segoe UI',Verdana,sans-serif;font-size:9px;opacity:.85;text-align:left;
 line-height:1.4;margin-top:2px}
#znp label{display:block;margin:8px 0 3px;font-size:10.5px;color:var(--ink2);font-weight:500}
#znp select,#znp input[type=number],#znp input[type=text]{width:100%;padding:6px 8px;background:#fffdf7;
 color:var(--ink);border:1px solid var(--line2);border-radius:5px;
 font-family:'JetBrains Mono',Consolas,'DejaVu Sans Mono',monospace;font-size:11.5px}
#znp select:focus,#znp input:focus{outline:none;border-color:var(--wheat2);box-shadow:0 0 0 3px rgba(217,164,65,.2)}
#znp .znp-row2{display:grid;grid-template-columns:1fr 1fr;gap:9px}
#znp .znp-chk{display:flex;align-items:center;gap:7px;margin-top:8px;font-size:11px;color:var(--ink2);cursor:pointer}
#znp .znp-chk input{accent-color:var(--sage)}
#znp table{width:100%;border-collapse:collapse;font-family:'JetBrains Mono',Consolas,'DejaVu Sans Mono',monospace;font-size:10.5px}
#znp th{background:linear-gradient(180deg,#eeddb4,#e3cd9a);color:#6b4d16;font-weight:600;
 padding:5px;text-align:center;border-bottom:1px solid var(--line2);font-size:9.5px;letter-spacing:.4px}
#znp th:first-child{border-radius:5px 0 0 0}
#znp th:last-child{border-radius:0 5px 0 0}
#znp td{padding:5px;text-align:center;border-bottom:1px solid var(--pap3);color:var(--ink)}
#znp td.znp-l{text-align:left}
#znp tr.znp-cur td{background:rgba(125,154,85,.16);box-shadow:inset 3px 0 0 var(--sage);font-weight:600}
#znp tr.znp-tot td{background:rgba(217,164,65,.16);color:#6b4d16;font-weight:700}
#znp .znp-res{width:54px;padding:3px 5px;background:#fffdf7;color:var(--ink);border:1px solid var(--line2);
 border-radius:4px;font-family:'JetBrains Mono',Consolas,'DejaVu Sans Mono',monospace;font-size:10.5px;text-align:right}
#znp .znp-btn{width:100%;margin-top:9px;padding:9px;cursor:pointer;border-radius:7px;
 border:1px solid var(--wheat2);background:linear-gradient(180deg,#f0c469,#dca43f);
 color:#5a3f0f;font-family:'Baloo 2','Segoe UI',Verdana,sans-serif;font-weight:700;font-size:12.5px;letter-spacing:.4px;
 box-shadow:0 2px 5px rgba(120,88,26,.28),inset 0 1px 0 rgba(255,255,255,.55)}
#znp .znp-btn:hover{background:linear-gradient(180deg,#f6cf7e,#e3b053);box-shadow:0 3px 9px rgba(120,88,26,.35)}
#znp .znp-btn.znp-alt{border-color:var(--line2);background:linear-gradient(180deg,#f4ead2,#e8dab8);color:var(--ink2)}
#znp .znp-warn{margin-top:8px;padding:7px 9px;border-left:3px solid var(--terra);border-radius:0 5px 5px 0;
 background:rgba(194,106,60,.1);color:#8a4a24;font-size:10.5px;line-height:1.5}
#znp .znp-err{padding:9px;border-left:3px solid var(--terra);border-radius:0 5px 5px 0;
 background:rgba(194,106,60,.1);color:#8a4a24;font-size:11px}
#znp .znp-alarm{background:linear-gradient(165deg,#f7edd4,#eeddb4);border:1px solid var(--line2);
 border-radius:9px;padding:12px;text-align:center;margin-bottom:10px;
 box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 2px 6px rgba(90,68,32,.12)}
#znp .znp-alarm .znp-lab{font-family:'Baloo 2','Segoe UI',Verdana,sans-serif;font-weight:700;font-size:10.5px;letter-spacing:.6px;color:#8a6e33}
#znp .znp-alarm .znp-big{font-family:'Baloo 2','Segoe UI',Verdana,sans-serif;font-weight:800;font-size:32px;color:#6b4d16;line-height:1.2;margin:1px 0}
#znp .znp-alarm .znp-small{font-family:'JetBrains Mono',Consolas,'DejaVu Sans Mono',monospace;font-size:11px;color:var(--ink2)}
#znp .znp-fold>h4{cursor:pointer;user-select:none;margin-bottom:0}
#znp .znp-fold.znp-open>h4{margin-bottom:8px}
#znp .znp-fold>h4 .znp-arrow{font-size:11px;color:var(--wheat2);transition:transform .15s ease;display:inline-block}
#znp .znp-fold.znp-open>h4 .znp-arrow{transform:rotate(90deg)}
#znp .znp-fold>.znp-secbody{display:none}
#znp .znp-fold.znp-open>.znp-secbody{display:block}
#znp .znp-mbtn{margin:1px;padding:0;width:44px;height:34px;box-sizing:border-box;vertical-align:middle;border-radius:5px;border:1px solid var(--wheat2);
 background:linear-gradient(180deg,#f0c469,#dca43f);color:#5a3f0f;font-family:'JetBrains Mono',Consolas,monospace;
 font-size:10.5px;cursor:pointer}
#znp tr.znp-gr-done td{opacity:.45}
#znp td.znp-poz{white-space:nowrap;text-align:right}
#znp .znp-gr-ok{color:var(--sage);font-weight:700;font-size:10.5px}
#znp .znp-krok{margin:6px 0 10px;padding:9px 11px;font-size:12.5px;font-weight:600;border-radius:6px;background:rgba(125,154,85,.16);
 border-left:3px solid var(--sage);color:#4f6631;font-size:11px}
#znp .znp-mbtn-next{animation:znpNext 1.1s ease-in-out infinite;outline:2px solid #d9679a;outline-offset:1px}
@keyframes znpNext{0%{box-shadow:0 0 0 0 rgba(217,103,154,.75)}70%{box-shadow:0 0 0 8px rgba(217,103,154,0)}100%{box-shadow:0 0 0 0 rgba(217,103,154,0)}}
#znp .znp-mbtn:hover{background:linear-gradient(180deg,#f6cf7e,#e3b053)}
#znp .znp-mbtn sub{font-size:9px;opacity:.75}
#znp .znp-mbtn-armed{background:linear-gradient(180deg,#8fc06a,#6d9a46);color:#fff;border-color:#5b8039;
 font-weight:700;font-size:8.5px;letter-spacing:-.2px}
#znp a.znp-go{display:inline-block;padding:2px 9px;border-radius:5px;text-decoration:none;
 border:1px solid var(--wheat2);background:linear-gradient(180deg,#f0c469,#dca43f);color:#5a3f0f;
 font-family:'Baloo 2','Segoe UI',sans-serif;font-weight:700;font-size:10.5px}
#znp a.znp-go:hover{background:linear-gradient(180deg,#f6cf7e,#e3b053)}
#znp .znp-rezwrap{display:flex;flex-wrap:wrap;gap:4px}
#znp .znp-rez{display:flex;flex-direction:column;align-items:center;gap:1px;padding:3px 4px;border-radius:5px;
 background:var(--pap3);border:1px solid var(--line2);min-width:46px}
#znp .znp-rez-off{opacity:.4}
#znp input[type=number]{-moz-appearance:textfield}
#znp input[type=number]::-webkit-outer-spin-button,#znp input[type=number]::-webkit-inner-spin-button{
 -webkit-appearance:none;margin:0}
#znp .znp-rez-i img{width:18px;height:18px;display:block}
#znp .znp-rez input[type=checkbox]{margin:0}
#znp .znp-rez input{width:42px;padding:1px 3px;font-size:10px;text-align:center}
#znp .znp-rez-a{font-size:8.5px;color:var(--wheat2)}
#znp .znp-note{margin-top:7px;font-size:10px;color:var(--dim);line-height:1.55}
#znp .znp-pill{display:inline-block;padding:1px 7px;border-radius:9px;font-family:'JetBrains Mono',Consolas,'DejaVu Sans Mono',monospace;font-size:9px}
#znp .znp-pill.znp-on{background:rgba(125,154,85,.2);color:#4f6631;border:1px solid rgba(125,154,85,.5)}
/*  Tryb paskowy: panel siada nad trescia strony, wezszy i gestszy.         */
/*  Tryb paskowy: panel jest CZESCIA strony gry - stoi w kolumnie tresci,
 *  nie plywa nad nia, nie ma logo i nie da sie go przeciagac.             */
#znp.znp-pasek{position:static;width:auto;max-width:100%;max-height:none;margin:0 0 10px;
 top:auto;left:auto;right:auto;box-shadow:0 2px 6px rgba(90,68,32,.18)}
#znp.znp-pasek{font-size:10px;max-width:430px}
#znp.znp-pasek .znp-hd{padding:2px 7px;cursor:default;gap:6px}
#znp.znp-pasek .znp-hd img{display:block!important;width:30px!important;height:30px!important;flex:0 0 30px}
#znp.znp-pasek .znp-hd .znp-t1{font-size:11.5px}
#znp.znp-pasek .znp-hd .znp-t2{font-size:8px}
#znp.znp-pasek .znp-tab{padding:4px 2px;font-size:9.5px;letter-spacing:.2px}
#znp.znp-pasek .znp-body{padding:5px;max-height:none;overflow:visible}
#znp.znp-pasek .znp-sec{padding:5px 6px;margin-bottom:5px;border-radius:5px}
#znp.znp-pasek .znp-sec>h4{font-size:10px;margin-bottom:4px;padding-bottom:2px}
#znp.znp-pasek label{margin:4px 0 1px;font-size:8.5px}
#znp.znp-pasek select,#znp.znp-pasek input[type=number],#znp.znp-pasek input[type=text]{padding:2px 5px;font-size:9.5px}
#znp.znp-pasek table{font-size:9px}
#znp.znp-pasek th{padding:2px;font-size:8px}
#znp.znp-pasek td{padding:2px}
#znp.znp-pasek .znp-btn{margin-top:5px;padding:5px;font-size:10.5px;border-radius:5px}
#znp.znp-pasek .znp-note{margin-top:3px;font-size:8.5px;line-height:1.35}
#znp.znp-pasek .znp-krok{margin:3px 0 5px;padding:4px 7px;font-size:9.5px}
#znp.znp-pasek .znp-rez{min-width:34px;padding:1px 2px;gap:0}
#znp.znp-pasek .znp-rez input{width:30px;font-size:8.5px;padding:0 2px}
#znp.znp-pasek .znp-rez-i img{width:13px;height:13px}
#znp.znp-pasek .znp-mbtn{width:33px;height:25px;font-size:9px;margin:1px}
#znp.znp-pasek .znp-alarm{padding:5px;margin-bottom:5px}
#znp.znp-pasek .znp-alarm .znp-big{font-size:19px}
/*  Telefon i aplikacja: panel na pelna szerokosc, mniejsza ikona.          */
@media (max-width:760px){
 #znp{width:auto;left:6px;right:6px;top:6px;max-height:92vh;font-size:13px}
 #znp .znp-tab{font-size:12.5px;padding:9px 4px}
 #znp .znp-mbtn{width:52px;height:40px;font-size:12px}
 #znp .znp-rez{min-width:54px}
 #znp .znp-rez input{width:48px;height:26px;font-size:12px}
 #znp select,#znp input[type=number],#znp input[type=text]{padding:8px;font-size:13px}
 #znp .znp-btn{padding:12px;font-size:13.5px}
}
#znp-wys{max-width:460px;margin:10px auto;padding:10px 12px 9px;border:1px solid #c9ad78;border-radius:10px;
 background:linear-gradient(170deg,#fffdf6,#f6ead0);color:#4a3a22;font:12px Inter,'Segoe UI',Verdana,sans-serif;
 box-shadow:0 3px 10px rgba(90,68,32,.18);box-sizing:border-box;text-align:left}
#znp-wys *{box-sizing:border-box}
#znp-wys .znp-w-gora{display:flex;align-items:baseline;gap:8px;white-space:nowrap}
#znp-wys .znp-w-krok{flex:0 0 auto;font-size:10.5px;font-weight:700;letter-spacing:.8px;color:#9b8763}
#znp-wys .znp-w-cel{flex:0 1 auto;font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis}
#znp-wys .znp-w-gr{flex:0 0 auto;margin-left:auto;font-size:11px;font-weight:600;color:#b8801f;text-decoration:none}
#znp-wys .znp-w-post{height:4px;margin:7px 0 9px;border-radius:2px;background:#efe0c0;overflow:hidden}
#znp-wys .znp-w-post i{display:block;height:100%;background:linear-gradient(90deg,#d9a441,#b8801f)}
#znp-wys .znp-w-b{display:block;width:100%;height:46px;margin:0;padding:0 12px;border-radius:8px;cursor:pointer;
 border:1px solid #b8801f;background:linear-gradient(180deg,#f0c469,#dca43f);color:#5a3f0f;
 font-family:'Baloo 2','Segoe UI',Verdana,sans-serif;font-weight:700;font-size:14px;letter-spacing:.5px;
 box-shadow:0 2px 5px rgba(120,88,26,.28),inset 0 1px 0 rgba(255,255,255,.55);-webkit-tap-highlight-color:transparent}
#znp-wys .znp-w-b.znp-w-ok{border-color:#5b8039;background:linear-gradient(180deg,#8fc06a,#6d9a46);color:#fff}
#znp-wys .znp-w-b.znp-w-alt{border-color:#c9ad78;background:linear-gradient(180deg,#f4ead2,#e8dab8);color:#7a6642}
#znp-wys .znp-w-st{height:17px;margin-top:6px;font-size:11.5px;line-height:17px;color:#7a6642;
 white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#znp-wys .znp-w-st.znp-w-zle{color:#c26a3c}
#znp .znp-krok{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
#znp .znp-do-wys{margin-left:auto;padding:5px 10px;border-radius:6px;border:1px solid #b8801f;white-space:nowrap;
 background:linear-gradient(180deg,#f0c469,#dca43f);color:#5a3f0f;font-weight:700;font-size:11px;text-decoration:none}
@media (max-width:760px){#znp .znp-do-wys{padding:8px 10px;font-size:10.5px}}
.znp-pulse{animation:znpP 1.05s ease-in-out infinite;outline:2px solid #d9679a!important;outline-offset:1px}
@keyframes znpP{0%{box-shadow:0 0 0 0 rgba(217,103,154,.8)}70%{box-shadow:0 0 0 10px rgba(217,103,154,0)}100%{box-shadow:0 0 0 0 rgba(217,103,154,0)}}
`;
        document.head.appendChild(st);
    }

    const MASS_KEY = 'desunia_zbieractwo_masowe_v2';
    const onMass  = () => (ekran() === 'place' && tryb() === 'scavenge_mass') || !!document.getElementById('scavenge_mass_screen');
    const onUnits = () => ekran() === 'overview_villages' && tryb() === 'units';

    function loadMass() { try { return JSON.parse(localStorage.getItem(MASS_KEY) || '{}'); } catch (e) { return {}; } }
    function saveMass(d) { try { localStorage.setItem(MASS_KEY, JSON.stringify(d)); } catch (e) {} }

    function unitOrder() {
        if (PROBE.units && PROBE.units.length) return PROBE.units;
        const imgs = document.querySelectorAll('th img[src*="unit_"], thead img[src*="unit_"]');
        const out = [];
        for (let i = 0; i < imgs.length; i++) {
            const m = (imgs[i].getAttribute('src') || '').match(/unit_([a-z]+)\.(png|webp)/);
            if (m) out.push(m[1]);
        }
        return out;
    }

    function linkWioski(tr) {
        const z = el => {
            const qe = el.querySelector('.quickedit-vn');
            const cands = [];
            if (qe) cands.push(qe.querySelector('a[href*="village="]'));
            el.querySelectorAll('a[href*="village="]').forEach(x => cands.push(x));
            for (let i = 0; i < cands.length; i++) {
                const x = cands[i]; if (!x) continue;
                const href = x.getAttribute('href') || '';
                if (/overview_villages/.test(href)) continue;
                const nazwa = (x.textContent || '').replace(/\s+/g, ' ').trim();
                if (!/\(\d+\|\d+\)/.test(nazwa)) continue;
                const id = (qe && qe.getAttribute('data-id')) || (href.match(/[?&]village=(\d+)/) || [])[1];
                if (id) return { id: String(id), name: nazwa };
            }
            return null;
        };
        let r = z(tr);
        if (r) return r;

        let prev = tr.previousElementSibling;
        for (let k = 0; prev && k < 5; k++, prev = prev.previousElementSibling) {
            r = z(prev);
            if (r) return r;
        }
        return null;
    }

    function ileWiosekGracza() {
        try { const p = window.game_data && window.game_data.player;
            const n = p ? parseInt(p.villages, 10) : 0; return n > 0 ? n : 0; } catch (e) { return 0; }
    }
    function usunUtracone(store, wlasne) {
        const n = ileWiosekGracza();
        if (!n || Object.keys(wlasne).length !== n) return;
        Object.keys(store).forEach(id => { if (!wlasne[id]) delete store[id]; });
        const ret = loadReturns(); let zm = false;
        Object.keys(ret).forEach(id => { if (!wlasne[id]) { delete ret[id]; zm = true; } });
        if (zm) saveReturns(ret);
        let zmc = false;
        Object.keys(cfg.massExcl).forEach(id => { if (!wlasne[id]) { delete cfg.massExcl[id]; zmc = true; } });
        if (zmc) saveCfg();
    }

    function collectUnits() {
        if (!onUnits()) return { ile: 0 };
        const order = unitOrder();
        if (!order.length) return { ile: 0, err: 'Nie znam kolejnosci jednostek na tym swiecie.' };

        const typ = (location.href.match(/[?&]type=([a-z_]+)/) || [])[1] || '';
        const ETYKIETY = ['w\u0142asne', 'w\u0142asny', 'own', 'your own', 'eigene'];
        const INNE = ['w wiosce', 'in village', 'im dorf', 'poza wiosk\u0105', 'w drodze', 'razem', 'total', 'gesamt'];
        const etykieta = tr => {
            const td = tr.children;
            for (let i = 0; i < td.length && i < 4; i++) {
                if (td[i].classList && td[i].classList.contains('unit-item')) break;
                const t = (td[i].textContent || '').trim().toLowerCase();
                if (ETYKIETY.indexOf(t) >= 0) return 'wlasne';
                if (INNE.indexOf(t) >= 0) return 'inne';
            }
            return '';
        };

        const wWiosce = tr => {
            const e = etykieta(tr);
            if (typ === 'own_home') return e !== 'inne';
            return e === 'wlasne';
        };
        if (typ !== 'own_home' && typ !== 'complete')
            return { ile: 0, err: 'Otw\u00f3rz widok \u201eW\u0142asne\u201d \u2014 \u201eW wiosce\u201d wlicza wsparcie.' };

        const store = loadMass();
        const widziane = {};
        let ile = 0, trybWiersza = 0;
        const trs = document.querySelectorAll('tr');
        for (let i = 0; i < trs.length; i++) {
            const tr = trs[i];
            const cells = tr.querySelectorAll('td.unit-item');
            if (!cells.length) continue;

            const pasuje = wWiosce(tr);
            if (!pasuje) continue;
            trybWiersza = 1;

            const a = linkWioski(tr);
            if (!a) continue;
            const id = a.id;
            if (widziane[id]) continue;
            widziane[id] = true;
            const units = {};
            for (let c = 0; c < cells.length && c < order.length; c++) {
                const n = order[c];
                if (CARRY_FALLBACK[n] === undefined) continue;
                const v = parseInt((cells[c].textContent || '').replace(/[^\d]/g, ''), 10);
                units[n] = isFinite(v) ? v : 0;
            }
            const prev = store[id] || {};
            store[id] = { id: id, name: a.name,
                          units: units, src: 'own', free: prev.free || [], unitsTs: Date.now(), freeTs: prev.freeTs || 0 };
            ile++;
        }
        usunUtracone(store, widziane);
        saveMass(store);
        return { ile: ile, kolumn: order.length, tryb: trybWiersza ? 'wojsko w\u0142asne' : 'nie znaleziono wierszy wojska w\u0142asnego' };
    }

    function optState(td) {
        const cl = ' ' + (td.className || '') + ' ';
        const box = td.querySelector('input[type=checkbox]');

        const wolny = !!box && / option-inactive /.test(cl);
        return {
            box: box,
            zazn: !!(box && box.checked),
            wolny: wolny,
            stan: / option-active /.test(cl) ? 'zbiera'
                : / option-unavailable /.test(cl) ? 'niedostepny'
                : / option-locked /.test(cl) ? 'zablokowany'
                : wolny ? 'wolny' : 'inny'
        };
    }

    function optSet(td, chce) {
        const st = optState(td);
        if (!st.wolny || !st.box) return false;
        if (st.box.disabled) return false;
        if (st.box.checked !== chce) {

            try { st.box.click(); }
            catch (e) {
                st.box.checked = chce;
                st.box.dispatchEvent(new Event('change', { bubbles: true }));
            }
            if (st.box.checked !== chce) {
                st.box.checked = chce;
                st.box.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
        return true;
    }

    function massRows() {
        const out = [];
        const trs = document.querySelectorAll('tr[id^="scavenge_village_"], tr[data-id]');
        for (let i = 0; i < trs.length; i++) {
            const tr = trs[i];
            let id = tr.getAttribute('data-id');
            if (!id) { const m = (tr.id || '').match(/scavenge_village_(\d+)/); if (m) id = m[1]; }
            if (!id) continue;
            const opt = {};
            for (let l = 1; l <= 4; l++) {
                const td = tr.querySelector('td.option-' + l) ||
                           tr.querySelector('td.option[data-id="' + l + '"]');
                if (!td) continue;
                const st = optState(td);
                opt[l] = { td: td, box: st.box, wolny: st.wolny, zazn: st.zazn, stan: st.stan };
            }
            if (Object.keys(opt).length) out.push({ id: String(id), tr: tr, opt: opt });
        }
        return out;
    }

    function collectMass() {
        if (!onMass()) return 0;
        const store = loadMass(), rows = massRows();
        if (!MASS_SEEN) MASS_SEEN = {};
        rows.forEach(r => {
            MASS_SEEN[r.id] = true;
            const v = store[r.id] || { id: r.id, name: 'wioska ' + r.id, units: {}, unitsTs: 0 };

            v.free = [1, 2, 3, 4].filter(l => r.opt[l] && (r.opt[l].wolny || r.opt[l].stan === 'niedostepny'));
            v.freeTs = Date.now();
            store[r.id] = v;
        });
        usunUtracone(store, MASS_SEEN);
        saveMass(store);
        return rows.length;
    }

    const invSum = free => free.reduce((s, i) => s + 1 / LF[i - 1], 0);

    function dostepne(v, n) {
        if (!wlaczonyZ('mass', n)) return 0;
        return Math.max(0, ((v.units || {})[n] || 0) - rezerwaZ('mass', n));
    }

    function massPlan() {
        const store = loadMass();
        const list = [];
        const odpad = { wszystkie: 0, brakPoziomow: 0, brakDanych: 0, brakWojska: 0, wykluczone: 0, wPlanie: 0, szczegoly: [] };

        const zywe = {};
        if (onMass()) massRows().forEach(r => {
            zywe[r.id] = [1, 2, 3, 4].filter(l => r.opt[l] && (r.opt[l].wolny || r.opt[l].stan === 'niedostepny'));
        });
        const wolnePoziomy = v => (onMass() && zywe[v.id]) ? zywe[v.id] : (v.free || []);
        const typy = Object.keys(CARRY_FALLBACK).filter(n => CARRY_FALLBACK[n] > 0);
        const carry = parseFloat(cfg.massCarry) || 1;

        for (const id in store) {
            const v = store[id];
            if (onMass() && MASS_SEEN && !MASS_SEEN[id]) continue;
            odpad.wszystkie++;
            if (cfg.massExcl[id]) {
                odpad.wykluczone++;
                odpad.szczegoly.push({ n: v.name, p: 'wykluczona' });
                continue;
            }
            if (MASS_BLOK[id]) {
                odpad.brakDanych++;
                odpad.szczegoly.push({ n: v.name, p: 'gra odm\u00f3wi\u0142a \u2014 nieaktualny stan wojska' });
                continue;
            }
            let fr = wolnePoziomy(v);

            const progMin = parseInt(cfg.massSkipL1Min, 10) || 0;

            let pom1 = false;
            if (progMin > 0 && fr.indexOf(1) >= 0) {
                let capTmp = 0;
                Object.keys(CARRY_FALLBACK).forEach(n => {
                    if (CARRY_FALLBACK[n] > 0) capTmp += dostepne(v, n) * CARRY_FALLBACK[n] * carry;
                });
                const limV = (limitMasowe() >= minMinutes() ? limitMasowe() : 0) * 60;
                let tV = capTmp > 0 ? runTime(capTmp / invSum(fr)) : 0;
                if (limV > 0 && tV > limV) tV = limV;
                if (capTmp > 0 && tV < progMin * 60) { fr = fr.filter(l => l !== 1); pom1 = true; }
            }
            if (!fr.length) { odpad.brakPoziomow++;
                odpad.szczegoly.push({ n: v.name, p: pom1 ? 'poz. 1 poni\u017cej ' + progMin + ' min' : 'brak wolnych poziom\u00f3w' }); continue; }
            if (!v.unitsTs || v.src !== 'own') { odpad.brakDanych++;
                odpad.szczegoly.push({ n: v.name, p: 'brak danych o wojsku' }); continue; }
            const av = {}; let cap = 0;
            typy.forEach(n => { const d = dostepne(v, n); if (d > 0) { av[n] = d; cap += d * CARRY_FALLBACK[n] * carry; } });
            if (cap <= 0) { odpad.brakWojska++;
                odpad.szczegoly.push({ n: v.name, p: 'brak wojska po odj\u0119ciu rezerwy' }); continue; }

            if (miejsca(av) < MIN_MIEJSC) { odpad.brakWojska++;
                odpad.szczegoly.push({ n: v.name, p: 'za ma\u0142o wojska (min. 10 miejsc w zagrodzie na poziom)' }); continue; }
            odpad.wPlanie++;
            list.push({ v: v, cap: cap, free: fr, av: av });
        }
        if (!list.length) return { odpad: odpad, error: 'Brak wiosek z wolnym poziomem i dost\u0119pnym wojskiem.' };

        const profil = m => {
            let best = '', bc = -1;
            Object.keys(m.av).forEach(n => {
                const c = m.av[n] * CARRY_FALLBACK[n];
                if (c > bc) { bc = c; best = n; }
            });
            return best;
        };
        list.forEach(m => { m.prof = profil(m); });
        list.sort((x, y) => x.prof === y.prof ? x.cap - y.cap : (x.prof < y.prof ? -1 : 1));
        const limM = limitMasowe();
        const lim = (limM >= minMinutes() ? limM : 0) * 60;

        const sam = m => {
            const L0 = m.cap / invSum(m.free);
            let T = runTime(L0);
            if (lim > 0 && T > lim) { T = lim; }
            const L = Math.min(L0, lootCap(T));
            return m.free.length * L / runTime(L) * 3600;
        };
        const ideal = list.reduce((s, m) => s + sam(m), 0);

        const wspolna = (i, j) => {
            const mn = {}; typy.forEach(n => { mn[n] = Infinity; });
            const ile = { 1: 0, 2: 0, 3: 0, 4: 0 };
            for (let x = i; x <= j; x++) {
                typy.forEach(n => { mn[n] = Math.min(mn[n], list[x].av[n] || 0); });
                list[x].free.forEach(l => { ile[l]++; });
            }
            const lv = [1, 2, 3, 4].filter(l => ile[l] > 0);
            let cap = 0;
            typy.forEach(n => { if (mn[n] > 0 && isFinite(mn[n])) cap += mn[n] * CARRY_FALLBACK[n] * carry; else mn[n] = 0; });
            return { mn: mn, lvls: lv, cap: cap, ile: ile };
        };

        const wartosc = (i, j) => {
            const w = wspolna(i, j);
            if (!w.lvls.length || w.cap <= 0) return { val: 0, w: w, L: 0, T: 0 };
            let L = w.cap / invSum(w.lvls);
            let T = runTime(L);
            if (lim > 0 && T > lim) { T = lim; L = lootCap(T); }
            const szt = w.lvls.reduce((a, l) => a + w.ile[l], 0);
            const val = szt * L / runTime(L) * 3600;
            return { val: val, w: w, L: L, T: runTime(L) };
        };

        const minG = Math.max(1, parseInt(cfg.massMinGroup, 10) || 3);
        const n = list.length, INF = 1e18;
        const cache = {};
        const koszt = (i, j) => {
            const k = i + '_' + j;
            if (cache[k] !== undefined) return cache[k];
            const r = wartosc(i, j);
            let s = 0; for (let x = i; x <= j; x++) s += sam(list[x]);
            cache[k] = s - r.val;
            return cache[k];
        };

        function dp(k) {
            const d = [], p = [];
            for (let g = 0; g <= k; g++) { d.push(new Array(n + 1).fill(INF)); p.push(new Array(n + 1).fill(-1)); }
            d[0][0] = 0;
            for (let g = 1; g <= k; g++)
                for (let j = minG * g; j <= n; j++)
                    for (let i = minG * (g - 1); i <= j - minG; i++) {
                        if (d[g - 1][i] >= INF) continue;
                        const c = koszt(i, j - 1);
                        if (d[g - 1][i] + c < d[g][j]) { d[g][j] = d[g - 1][i] + c; p[g][j] = i; }
                    }
            if (d[k][n] >= INF) return null;
            const gr = []; let j = n;
            for (let g = k; g >= 1; g--) { const i = p[g][j]; gr.unshift([i, j - 1]); j = i; }
            return { strata: d[k][n], gr: gr };
        }

        const maxG = Math.max(1, Math.min(8, parseInt(cfg.massMaxGroups, 10) || 3));
        let best = null;
        for (let k = 1; k <= maxG; k++) {
            const r = dp(k);
            if (!r) continue;
            if (best === null) { best = r; continue; }
            if ((best.strata - r.strata) / ideal * 100 < 1) break;
            best = r;
        }
        if (!best) return { odpad: odpad, error: 'Nie da si\u0119 u\u0142o\u017cy\u0107 grupy o wsp\u00f3lnym sk\u0142adzie (spr\u00f3buj min. wiosek = 1).' };

        const wartoscCzl = cz => {
            const mn = {}; typy.forEach(n => { mn[n] = Infinity; });
            const ile = { 1: 0, 2: 0, 3: 0, 4: 0 };
            cz.forEach(m => {
                typy.forEach(n => { mn[n] = Math.min(mn[n], m.av[n] || 0); });
                m.free.forEach(l => { ile[l]++; });
            });
            return wartoscZ(mn, ile);
        };

        const jednNaPoziom = (mn, lv, L) => {
            const pula = {};
            typy.forEach(n => { if (mn[n] > 0 && isFinite(mn[n])) pula[n] = mn[n]; });
            const order = Object.keys(pula).sort((x, y) => pula[y] * CARRY_FALLBACK[y] - pula[x] * CARRY_FALLBACK[x]);
            const out = {};
            lv.slice().sort((x, y) => LF[x - 1] - LF[y - 1]).forEach(l => {
                out[l] = skladPoziomu(pula, L / LF[l - 1], carry, order).pop;
            });
            return out;
        };

        const wartoscZ = (mn0, ile) => {
            const mn = {}; typy.forEach(n => { mn[n] = mn0[n]; });
            let lv = [1, 2, 3, 4].filter(l => ile[l] > 0);
            let cap = 0;
            typy.forEach(n => { if (mn[n] > 0 && isFinite(mn[n])) cap += mn[n] * CARRY_FALLBACK[n] * carry; else mn[n] = 0; });
            if (!lv.length || cap <= 0) return { val: 0, mn: mn, lvls: lv, cap: 0, L: 0, T: 0 };
            const licz = w => {
                let L0 = cap / invSum(w), T0 = runTime(L0), ogr = false;
                if (lim > 0 && T0 > lim) { T0 = lim; L0 = lootCap(T0); ogr = true; }
                return { L: L0, T: runTime(L0), lim: ogr };
            };
            let r0 = licz(lv);

            const pMin = parseInt(cfg.massSkipL1Min, 10) || 0;
            if (pMin > 0 && lv.indexOf(1) >= 0 && r0.T < pMin * 60) {
                lv = lv.filter(l => l !== 1);
                if (!lv.length) return { val: 0, mn: mn, lvls: lv, cap: cap, L: 0, T: 0 };
                r0 = licz(lv);
            }

            let zaMalo = false;
            for (let k = 0; k < 4 && lv.length; k++) {
                const u = jednNaPoziom(mn, lv, r0.L);
                const male = lv.filter(l => u[l] < MIN_MIEJSC);
                if (!male.length) break;
                zaMalo = true;
                lv = r0.lim ? lv.filter(l => male.indexOf(l) < 0) : lv.slice(1);
                if (lv.length) r0 = licz(lv);
            }
            if (!lv.length) return { val: 0, mn: mn, lvls: [], cap: cap, L: 0, T: 0, zaMalo: true };
            const szt = lv.reduce((a, l) => a + ile[l], 0);
            return { val: szt * r0.L / r0.T * 3600, mn: mn, lvls: lv, cap: cap, L: r0.L, T: r0.T, zaMalo: zaMalo };
        };

        const odrzuceni = [];
        const grupyCz = best.gr.map(par => {
            let cz = list.slice(par[0], par[1] + 1);

            for (let krok = 0; krok < 12 && cz.length > 1; krok++) {
                const teraz = wartoscCzl(cz).val;
                let naj = -1, najVal = teraz;
                for (let i = 0; i < cz.length; i++) {
                    const bez = cz.slice(0, i).concat(cz.slice(i + 1));
                    const v = wartoscCzl(bez).val;
                    if (v > najVal) { naj = i; najVal = v; }
                }

                if (naj < 0 || najVal < teraz * 1.25) break;
                odrzuceni.push(cz[naj]);
                cz = cz.slice(0, naj).concat(cz.slice(naj + 1));
            }
            return cz;
        }).filter(cz => cz.length);

        grupyCz.forEach((cz, gi) => {
            if (cz.length < 2) return;
            const r = wartoscCzl(cz);
            if (!r.lvls.length || !r.T) return;
            const udzial = m => r.lvls.filter(l => m.free.indexOf(l) >= 0).length * r.L / r.T * 3600;
            for (let i = cz.length - 1; i >= 0 && cz.length > 1; i--) {
                if (udzial(cz[i]) < sam(cz[i]) * 0.8) { odrzuceni.push(cz[i]); cz.splice(i, 1); }
            }
            grupyCz[gi] = cz;
        });

        if (odrzuceni.length) {
            odrzuceni.sort((a, b) => a.cap - b.cap);
            let bufor = [];
            const dodaj = () => { if (bufor.length) { grupyCz.push(bufor); bufor = []; } };
            odrzuceni.forEach(m => {
                if (!bufor.length) { bufor.push(m); return; }
                const prob = bufor.concat([m]);
                if (wartoscCzl(prob).val >= wartoscCzl(bufor).val + sam(m) * 0.6) bufor.push(m);
                else { dodaj(); bufor = [m]; }
            });
            dodaj();
        }

        const wolne = [];
        const doWolnych = (cz, pow) => cz.forEach(m => { m.pow = pow; wolne.push(m); });

        let nastId = 0;
        const gId = grupyCz.map(() => nastId++), wPam = {};
        const wGr = i => {
            const k = 's' + gId[i];
            if (wPam[k] === undefined) wPam[k] = wartoscCzl(grupyCz[i]).val;
            return wPam[k];
        };
        const wPara = (i, j) => {
            const k = Math.min(gId[i], gId[j]) + '_' + Math.max(gId[i], gId[j]);
            if (wPam[k] === undefined) wPam[k] = wartoscCzl(grupyCz[i].concat(grupyCz[j])).val;
            return wPam[k];
        };
        while (grupyCz.length > maxG) {
            let teraz = 0;
            for (let i = 0; i < grupyCz.length; i++) teraz += wGr(i);

            let scal = -1, scal2 = -1, poScal = -1;
            for (let i = 0; i < grupyCz.length; i++)
                for (let j = i + 1; j < grupyCz.length; j++) {
                    const v = teraz - wGr(i) - wGr(j) + wPara(i, j);
                    if (v > poScal) { poScal = v; scal = i; scal2 = j; }
                }

            let slaba = 0, slabaVal = Infinity;
            for (let i = 0; i < grupyCz.length; i++) { const v = wGr(i); if (v < slabaVal) { slabaVal = v; slaba = i; } }
            const poUsun = teraz - slabaVal;
            if (scal >= 0 && poScal >= poUsun) {
                const nowa = wPara(scal, scal2);
                grupyCz[scal] = grupyCz[scal].concat(grupyCz[scal2]);
                gId[scal] = nastId++; wPam['s' + gId[scal]] = nowa;
                grupyCz.splice(scal2, 1); gId.splice(scal2, 1);
            } else {
                doWolnych(grupyCz[slaba], 'poza limitem grup \u2014 wy\u015blij pojedynczo');
                grupyCz.splice(slaba, 1); gId.splice(slaba, 1);
            }
        }

        if (minG > 1 && list.length >= minG) {
            for (let i = grupyCz.length - 1; i >= 0; i--) {
                if (grupyCz[i].length >= minG) continue;
                let cel = -1, celVal = -1;
                for (let j = 0; j < grupyCz.length; j++) {
                    if (j === i) continue;
                    const v = wartoscCzl(grupyCz[i].concat(grupyCz[j])).val;
                    if (v > celVal) { celVal = v; cel = j; }
                }
                if (cel < 0) continue;
                const osobno = wartoscCzl(grupyCz[i]).val + wartoscCzl(grupyCz[cel]).val;
                if (celVal >= osobno * 0.9) {
                    grupyCz[cel] = grupyCz[cel].concat(grupyCz[i]);
                } else {
                    doWolnych(grupyCz[i], 'za ma\u0142o wiosek na grup\u0119 \u2014 wy\u015blij pojedynczo');
                }
                grupyCz.splice(i, 1);
            }
        }

        const minCzW = (minG > 1 && list.length >= minG) ? minG : 1;
        const dolozWolne = ms => {
            const t0 = Date.now();
            for (let it = 0; it < 200 && wolne.length && Date.now() - t0 < ms; it++) {
                const wart = grupyCz.map(g => wartoscCzl(g).val);
                let ruch = null, zysk = 1e-9;
                wolne.forEach((m, wi) => grupyCz.forEach((g, gi) => {
                    const z = wartoscCzl(g.concat([m])).val - wart[gi];
                    if (z > zysk) { zysk = z; ruch = { t: 'w', wi: wi, gi: gi }; }
                }));
                let slaba = -1, slabaVal = 0;
                if (grupyCz.length >= maxG) {
                    slabaVal = Infinity;
                    wart.forEach((v, i) => { if (v < slabaVal) { slabaVal = v; slaba = i; } });
                }
                const czasMinal = () => Date.now() - t0 > ms;
                wolne.forEach(s0 => {
                    if (czasMinal()) return;
                    let cz = [s0], v = wartoscCzl(cz).val;
                    for (;;) {
                        let nm = null, nv = v;
                        wolne.forEach(m => {
                            if (cz.indexOf(m) >= 0) return;
                            const x = wartoscCzl(cz.concat([m])).val;
                            if (x > nv) { nv = x; nm = m; }
                        });
                        if (!nm) break;
                        cz = cz.concat([nm]); v = nv;
                        if (czasMinal()) break;
                    }
                    if (cz.length < minCzW) return;
                    if (v - slabaVal > zysk) { zysk = v - slabaVal; ruch = { t: 'n', cz: cz }; }
                });
                if (wolne.length <= 40)
                    for (let a = 0; a < wolne.length && !czasMinal(); a++)
                        for (let b = a + 1; b < wolne.length; b++)
                            grupyCz.forEach((g, gi) => {
                                const z = wartoscCzl(g.concat([wolne[a], wolne[b]])).val - wart[gi];
                                if (z > zysk) { zysk = z; ruch = { t: 'd', a: a, b: b, gi: gi }; }
                            });
                grupyCz.forEach((g, gi) => {
                    if (g.length - 1 < minCzW) return;
                    for (let i = 0; i < g.length; i++) {
                        const z = wartoscCzl(g.slice(0, i).concat(g.slice(i + 1))).val - wart[gi];
                        if (z > zysk) { zysk = z; ruch = { t: 'x', gi: gi, i: i }; }
                    }
                });
                if (!ruch) break;
                if (ruch.t === 'w') {
                    grupyCz[ruch.gi] = grupyCz[ruch.gi].concat([wolne[ruch.wi]]);
                    wolne.splice(ruch.wi, 1);
                } else if (ruch.t === 'd') {
                    grupyCz[ruch.gi] = grupyCz[ruch.gi].concat([wolne[ruch.a], wolne[ruch.b]]);
                    wolne.splice(ruch.b, 1); wolne.splice(ruch.a, 1);
                } else if (ruch.t === 'x') {
                    const g = grupyCz[ruch.gi];
                    doWolnych([g[ruch.i]], 'poza limitem grup \u2014 wy\u015blij pojedynczo');
                    grupyCz[ruch.gi] = g.slice(0, ruch.i).concat(g.slice(ruch.i + 1));
                } else {
                    ruch.cz.forEach(m => wolne.splice(wolne.indexOf(m), 1));
                    if (slaba >= 0) { doWolnych(grupyCz[slaba], 'poza limitem grup \u2014 wy\u015blij pojedynczo'); grupyCz.splice(slaba, 1); }
                    grupyCz.push(ruch.cz);
                }
            }
        };
        dolozWolne(ZAL_TRYB ? 30 : 150);

        if (grupyCz.length > 1) {
            const minCz = (minG > 1 && list.length >= minG) ? minG : 1;
            const INFm = () => { const o = {}; typy.forEach(n => { o[n] = Infinity; }); return o; };

            const opis = cz => {
                const pre = [], suf = new Array(cz.length), ile = { 1: 0, 2: 0, 3: 0, 4: 0 };
                let a = INFm();
                cz.forEach((m, k) => {
                    const b = {}; typy.forEach(n => { b[n] = Math.min(a[n], m.av[n] || 0); });
                    pre.push(b); a = b; m.free.forEach(l => { ile[l]++; });
                });
                a = INFm();
                for (let k = cz.length - 1; k >= 0; k--) {
                    const b = {}; typy.forEach(n => { b[n] = Math.min(a[n], cz[k].av[n] || 0); });
                    suf[k] = b; a = b;
                }
                return { pre: pre, suf: suf, ile: ile, mn: cz.length ? pre[cz.length - 1] : INFm(),
                         val: cz.length ? wartoscZ(pre[cz.length - 1], ile).val : 0 };
            };
            const bez = (o, k) => {
                const r = {}; typy.forEach(n => {
                    r[n] = Math.min(k > 0 ? o.pre[k - 1][n] : Infinity, k + 1 < o.suf.length ? o.suf[k + 1][n] : Infinity);
                }); return r;
            };
            const zm = (mn, m) => { const r = {}; typy.forEach(n => { r[n] = Math.min(mn[n], m.av[n] || 0); }); return r; };
            const ileZm = (ile, minus, plus) => {
                const r = { 1: ile[1], 2: ile[2], 3: ile[3], 4: ile[4] };
                if (minus) minus.free.forEach(l => { r[l]--; });
                if (plus) plus.free.forEach(l => { r[l]++; });
                return r;
            };
            const wyc = (mn, ile, len) => len ? wartoscZ(mn, ile).val : 0;
            let op = grupyCz.map(opis);
            const start = Date.now();
            for (let iter = 0; iter < 300 && Date.now() - start < (ZAL_TRYB ? 60 : 300); iter++) {
                const suma = op.reduce((a, o) => a + o.val, 0);
                let ruch = null, zysk = suma * 0.0005;
                for (let a = 0; a < grupyCz.length; a++) {
                    const A = grupyCz[a], oA = op[a];
                    for (let i = 0; i < A.length; i++) {
                        const m = A[i], mnBezA = bez(oA, i), ileBezA = ileZm(oA.ile, m, null);
                        const vBezA = A.length - 1 >= minCz ? wyc(mnBezA, ileBezA, A.length - 1) : null;
                        for (let b = 0; b < grupyCz.length; b++) {
                            if (b === a) continue;
                            const B = grupyCz[b], oB = op[b];
                            if (vBezA !== null) {
                                const g = vBezA + wyc(zm(oB.mn, m), ileZm(oB.ile, null, m), B.length + 1) - oA.val - oB.val;
                                if (g > zysk) { zysk = g; ruch = { t: 'p', a: a, i: i, b: b }; }
                            }
                            if (b < a) continue;
                            for (let j = 0; j < B.length; j++) {
                                const q = B[j];
                                const vA = wyc(zm(mnBezA, q), ileZm(oA.ile, m, q), A.length);
                                const vB = wyc(zm(bez(oB, j), m), ileZm(oB.ile, q, m), B.length);
                                const g = vA + vB - oA.val - oB.val;
                                if (g > zysk) { zysk = g; ruch = { t: 'z', a: a, i: i, b: b, j: j }; }
                            }
                        }
                    }
                }
                if (!ruch) break;
                const A = grupyCz[ruch.a], B = grupyCz[ruch.b], m = A[ruch.i];
                if (ruch.t === 'p') {
                    grupyCz[ruch.a] = A.slice(0, ruch.i).concat(A.slice(ruch.i + 1));
                    grupyCz[ruch.b] = B.concat([m]);
                } else {
                    const q = B[ruch.j];
                    grupyCz[ruch.a] = A.slice(0, ruch.i).concat(A.slice(ruch.i + 1)).concat([q]);
                    grupyCz[ruch.b] = B.slice(0, ruch.j).concat(B.slice(ruch.j + 1)).concat([m]);
                }
                op[ruch.a] = opis(grupyCz[ruch.a]); op[ruch.b] = opis(grupyCz[ruch.b]);
            }
        }

        dolozWolne(ZAL_TRYB ? 20 : 100);
        wolne.forEach(m => {
            odpad.wPlanie--; odpad.brakWojska++;
            odpad.szczegoly.push({ n: m.v.name, p: m.pow });
        });

        for (let i = grupyCz.length - 1; i >= 0; i--) {
            const wg = wartoscCzl(grupyCz[i]);
            if (wg.lvls.length) continue;
            const pow = wg.zaMalo ? 'za ma\u0142o wojska (min. 10 miejsc w zagrodzie na poziom)'
                                  : 'poz. 1 poni\u017cej ' + (parseInt(cfg.massSkipL1Min, 10) || 0) + ' min';
            grupyCz[i].forEach(m => { odpad.wPlanie--; odpad.brakPoziomow++;
                odpad.szczegoly.push({ n: m.v.name, p: pow }); });
            grupyCz.splice(i, 1);
        }
        if (!grupyCz.length) return { odpad: odpad, error: jestPL()
            ? 'Nic do wys\u0142ania: zosta\u0142 tylko poziom 1, a jego bieg by\u0142by kr\u00f3tszy ni\u017c ustawiony pr\u00f3g pomijania.'
            : 'Nothing to send: only level 1 is left and its run would be shorter than the skip threshold.' };
        const groups = grupyCz.map((czlon, gi) => {
            const r = wartoscCzl(czlon);
            return { nr: gi + 1, T: r.T, L: r.L, lvls: r.lvls, common: r.mn, members: czlon,
                     idle: Math.max(0, czlon.reduce((s, m) => s + (m.cap - r.cap), 0)) };
        });
        const osiagniete = groups.reduce((a, g) => a + wartoscCzl(g.members).val, 0);
        return { groups: groups, ideal: ideal, strata: Math.max(0, ideal - osiagniete),
                 k: groups.length, total: list.length, odpad: odpad };
    }

    function skladPoziomu(pula, target, carry, order) {
        const zrob = kol => {
            const a = {}, zost = Object.assign({}, pula);
            let got = 0, pop = 0;
            kol.forEach(n => {
                if (got >= target || !zost[n]) return;
                const per = CARRY_FALLBACK[n] * carry;
                const take = Math.min(Math.floor((target - got) / per), zost[n]);
                if (take > 0) { a[n] = take; got += take * per; zost[n] -= take; pop += take * (POP[n] || 1); }
            });
            return { alloc: a, got: got, pop: pop, zost: zost };
        };
        let r = zrob(order);
        if (r.pop < MIN_MIEJSC) {
            const r2 = zrob(Object.keys(pula).filter(n => pula[n] > 0)
                .sort((x, y) => CARRY_FALLBACK[x] / (POP[x] || 1) - CARRY_FALLBACK[y] / (POP[y] || 1)));
            if (r2.pop > r.pop) r = r2;
        }
        Object.keys(pula).forEach(n => { pula[n] = r.zost[n]; });
        return r;
    }

    function massCompositions(group) {
        const carry = parseFloat(cfg.massCarry) || 1;
        const pula = {};
        Object.keys(group.common).forEach(n => { if (group.common[n] > 0) pula[n] = group.common[n]; });

        const order = Object.keys(pula).sort((x, y) =>
            pula[y] * CARRY_FALLBACK[y] - pula[x] * CARRY_FALLBACK[x]);
        const lvls = group.lvls.slice().sort((x, y) => LF[x - 1] - LF[y - 1]);
        const out = {};
        lvls.forEach(l => {
            const target = group.L / LF[l - 1];
            const sk = skladPoziomu(pula, target, carry, order);
            const alloc = sk.alloc, got = sk.got;
            const maja = group.members.filter(m => m.free.indexOf(l) >= 0);
            out[l] = { alloc: alloc, cap: got, target: target,
                       villages: maja.map(m => m.v.id) };
        });
        return out;
    }

    function massComposition(group, level) {
        const all = massCompositions(group);
        return all[level] || null;
    }

    let LAST_MASS = null;

    let MASS_SEEN = null;
    let MASS_BLOK = {};
    let MASS_ARM = null;

    let MASS_OSTRZ = '';
    let MASS_ZAL = null;
    let ZAL_TRYB = false;
    function planDla(k, minG) {
        const a = cfg.massMaxGroups, b = cfg.massMinGroup;
        cfg.massMaxGroups = k; cfg.massMinGroup = minG; ZAL_TRYB = true;
        try { return massPlan(); } finally { cfg.massMaxGroups = a; cfg.massMinGroup = b; ZAL_TRYB = false; }
    }
    const wysylekPlanu = p => p.groups.reduce((a, g) =>
        a + g.lvls.filter(l => g.members.some(m => m.free.indexOf(l) >= 0)).length, 0);
    function liczZalecenie() {
        if (MASS_ZAL !== null || !MASS_PLAN || MASS_PLAN.error) return;
        MASS_ZAL = 'licze';
        const minTeraz = Math.max(1, parseInt(cfg.massMinGroup, 10) || 1);
        const warianty = minTeraz > 1 ? [minTeraz, 1] : [1];
        const wyn = [];
        let wi = 0, k = 1, poprzK = 0;
        const krok = () => {
            if (MASS_ZAL !== 'licze') return;
            if (wi >= warianty.length) return koniec();
            const mg = warianty[wi], p = planDla(k, mg);
            if (p && !p.error && p.ideal > 0 && p.k > poprzK) {
                wyn.push({ k: p.k, min: mg, proc: (p.ideal - p.strata) / p.ideal * 100, wys: wysylekPlanu(p) });
                poprzK = p.k;
            }

            if (k >= 8 || (p && !p.error && p.k < k)) { wi++; k = 1; poprzK = 0; } else k++;
            setTimeout(krok, 0);
        };
        const koniec = () => {
            if (!wyn.length) { MASS_ZAL = { brak: true }; return render(); }

            const PROG = 3;
            const kolano = lst => {
                for (let i = 0; i < lst.length; i++) {
                    if (lst.slice(i + 1).every(w => (w.proc - lst[i].proc) / (w.k - lst[i].k) < PROG)) return lst[i];
                }
                return lst[lst.length - 1];
            };
            const kand = warianty.map(mg => kolano(wyn.filter(w => w.min === mg)))
                .filter(Boolean)
                .sort((a, b) => (b.proc - a.proc > 0.5 ? 1 : a.proc - b.proc > 0.5 ? -1 : 0)
                                || a.wys - b.wys || (b.min === minTeraz) - (a.min === minTeraz));
            MASS_ZAL = { zal: kand[0], lista: wyn };
            render();
        };
        setTimeout(krok, 30);
    }
    function htmlZalecenie(plan) {
        const pl = jestPL();
        if (!MASS_ZAL || MASS_ZAL === 'licze')
            return pl ? 'Licz\u0119 zalecane ustawienie\u2026' : 'Calculating recommended setting\u2026';
        if (MASS_ZAL.brak) return '';
        const z = MASS_ZAL.zal;
        const teraz = { proc: 100 - plan.strata / plan.ideal * 100, wys: wysylekPlanu(plan), k: plan.k };
        let tip = MASS_ZAL.lista.map(w => w.k + (pl ? ' gr.' : ' gr.') + ' / min ' + w.min + ': ' +
            w.proc.toFixed(0) + '%, ' + w.wys + (pl ? ' wysy\u0142ek' : ' sends')).join('\n');
        const zgodne = z.k === teraz.k && z.min === Math.max(1, parseInt(cfg.massMinGroup, 10) || 1)
                       && Math.abs(z.proc - teraz.proc) < 0.5;
        const opis = (pl ? 'grup: ' : 'groups: ') + '<b>' + z.k + '</b> \u00b7 min. <b>' + z.min + '</b> \u2014 ' +
            z.proc.toFixed(0) + '%, ' + z.wys + (pl ? ' wysy\u0142ek' : ' sends');
        const regula = pl ? '\n\nZalecane = najmniej grup, po kt\u00f3rych ka\u017cda kolejna daje < 3 pkt %.'
                          : '\n\nRecommended = fewest groups after which each further group adds < 3 pp.';
        tip += regula;
        if (zgodne) return `<span title="${tip}">${pl ? 'Obecne ustawienie jest zalecane' : 'Current setting is recommended'} (${opis}).</span>`;
        return `<span title="${tip}">${pl ? 'Zalecane' : 'Recommended'}: ${opis}
          (${pl ? 'teraz' : 'now'} ${teraz.proc.toFixed(0)}%, ${teraz.wys}).</span>
          <a href="#" id="znp-m-zal-ustaw" data-k="${z.k}" data-min="${z.min}">${pl ? 'USTAW' : 'APPLY'}</a>`;
    }
    let MASS_PLAN = null;
    let MASS_DONE = {};

    function przeliczPlan() { MASS_PLAN = massPlan(); MASS_DONE = {}; MASS_ARM = null; MASS_ZAL = null; podswietlWyslij(false); return MASS_PLAN; }

    function massSeq(plan) {
        const seq = [];
        if (!plan || plan.error) return seq;
        const kol = cfg.order === 'desc' ? [4, 3, 2, 1] : [1, 2, 3, 4];
        plan.groups.forEach(g => {
            kol.forEach(l => { if (g.lvls.indexOf(l) >= 0) seq.push({ g: g.nr, l: l }); });
        });
        return seq;
    }
    const massKey = (g, l) => 'g' + g + '-l' + l;
    function massNext(plan) {
        const seq = massSeq(plan);
        for (let i = 0; i < seq.length; i++) if (!MASS_DONE[massKey(seq[i].g, seq[i].l)]) return seq[i];
        return null;
    }

    function massApply(group, level) {
        const comp = massComposition(group, level);
        if (!comp) return { err: 'Brak wiosek z wolnym poziomem ' + level + ' w tej grupie.' };

        const inp = unitInputs();
        for (const n in inp) setVal(inp[n], comp.alloc[n] ? comp.alloc[n] : '');

        const chce = {};
        comp.villages.forEach(id => { chce[String(id)] = true; });

        const zaznacz = () => {
            let zazn = 0, widziane = 0, czeka = 0;
            const czerwone = [];
            massRows().forEach(r => {

                for (let x = 1; x <= 4; x++) if (x !== level && r.opt[x]) odznacz(r.opt[x].td);
                const o = r.opt[level];
                if (!o) return;
                widziane++;
                if (!chce[r.id]) { optSet(o.td, false); return; }
                if (o.stan === 'niedostepny') { czerwone.push(r.id); return; }
                if (!o.wolny) return;
                if (optSet(o.td, true)) {
                    zazn++;
                    if (LAST_MASS && LAST_MASS.villages.indexOf(r.id) < 0) LAST_MASS.villages.push(r.id);
                } else czeka++;
            });
            return { zazn: zazn, rows: widziane, czeka: czeka, czerwone: czerwone };
        };

        const Treal = runTime(comp.cap * LF[level - 1]);
        LAST_MASS = { level: level, grupa: group.nr, T: Treal, alloc: comp.alloc, villages: [] };
        const moj = LAST_MASS;
        const r1 = zaznacz();

        const koniec = r => {
            if (LAST_MASS !== moj) return;
            const lz = document.getElementById('znp-m-zazn');
            if (lz) lz.textContent = String(r.zazn);
            r.czerwone.forEach(id => { MASS_BLOK[id] = true; });
            if (!r.zazn && r.czerwone.length) {

                MASS_OSTRZ = '<div class="znp-warn">Gra odm\u00f3wi\u0142a zaznaczenia (czerwony zakaz) \u2014 te wioski maj\u0105 mniej wojska, ni\u017c ' +
                    'skrypt pami\u0119ta (np. wys\u0142a\u0142a\u015b z nich r\u0119cznie). Wypad\u0142y z planu, plan przeliczony. ' +
                    'Pe\u0142ne dane odzyskasz wchodz\u0105c w <b>Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne</b>.</div>';
                przeliczPlan(); render();
                return;
            }
            const info = document.getElementById('znp-m-info');
            if (!info) return;
            if (!r.zazn && r.czeka)
                info.insertAdjacentHTML('beforeend', tr('<div class="znp-warn">Gra nie odblokowa\u0142a p\u00f3l wiosek \u2014 ' +
                    'kliknij kafelek jeszcze raz.</div>'));
            else if (r.czerwone.length)
                info.insertAdjacentHTML('beforeend', tr('<div class="znp-note">' + r.czerwone.length +
                    ' wiosek bez wpisanego wojska (czerwony zakaz) pomini\u0119to \u2014 przy nast\u0119pnym przeliczeniu wypadn\u0105 z planu.</div>'));
        };

        const ponow = n => setTimeout(() => {
            if (LAST_MASS !== moj) return;
            const r = zaznacz();
            if (r.czeka && n < 12) ponow(n + 1); else koniec(r);
        }, 150);
        if (r1.czeka) ponow(1); else setTimeout(() => koniec(r1), 0);
        return { comp: comp, zazn: r1.zazn, rows: r1.rows, czeka: r1.czeka };
    }

    function czekajNaTabele() {
        if (!onMass()) return;
        let prob = 0;
        const sprawdz = () => {
            if (massRows().length) { collectMass(); przeliczPlan(); render(); return true; }
            return false;
        };
        if (sprawdz()) return;
        const t = setInterval(() => {
            if (sprawdz() || ++prob > 20) clearInterval(t);
        }, 400);
        try {
            const cel = document.querySelector('.villages-container, #scavenge_mass_screen') || document.body;
            const mo = new MutationObserver(() => { if (sprawdz()) mo.disconnect(); });
            mo.observe(cel, { childList: true, subtree: true });
            setTimeout(() => mo.disconnect(), 12000);
        } catch (e) {}
    }

    function hookMassSend() {
        document.addEventListener('click', e => {
            const t = e.target;
            if (!t || !t.closest) return;
            if (!aktywna() || !onMass() || !LAST_MASS) return;

            const btn = t.closest('a.btn-send, .btn-send, .send-row a.btn, .send-row input, .send-row button');
            if (!btn) return;
            const kl = ' ' + (btn.className || '') + ' ';
            if (/btn-send-premium|btn-pp/.test(kl)) return;
            if (!/btn-send/.test(kl)) {
                const txt = ((btn.value || '') + ' ' + (btn.textContent || '')).trim();
                if (!/wy\u015blij|send|senden|envoyer|enviar|invia/i.test(txt)) return;
            }

            const zm = dfFromScreen();
            if (zm) { DF = zm; DF_SRC = 'zmierzony z ekranu gry'; zapiszDF(zm); }
            const karta = options()[LAST_MASS.level - 1];
            if (karta) {
                const inf = optionInfo(karta);
                if (inf && inf.sec > 0) LAST_MASS.T = inf.sec;
            }
            const store = loadReturns(), now = Date.now();
            const mag0 = loadMass();
            LAST_MASS.villages.forEach(id => {
                const e2 = store[id] || { levels: {} };
                const pelna = (mag0[id] && mag0[id].name) ? mag0[id].name : '';
                const wsp = pelna.match(/\((\d+\|\d+)\)/);
                if (pelna) e2.name = pelna.replace(/\s*\(\d+\|\d+\).*$/, '').trim() || pelna;
                if (!e2.name) e2.name = 'wioska ' + id;
                if (wsp) e2.coord = wsp[1];
                e2.coord = e2.coord || '';
                e2.levels = e2.levels || {};
                e2.levels[LAST_MASS.level - 1] = now + LAST_MASS.T * 1000;
                e2.updated = now;
                store[id] = e2;
            });
            saveReturns(store);
            MASS_DONE[massKey(LAST_MASS.grupa, LAST_MASS.level)] = true;
            MASS_ARM = null;
            podswietlWyslij(false);

            const mag = loadMass();
            LAST_MASS.villages.forEach(id => {
                const v = mag[id];
                if (!v || !v.units) return;
                for (const n in LAST_MASS.alloc) v.units[n] = Math.max(0, (v.units[n] || 0) - LAST_MASS.alloc[n]);
                v.unitsTs = Date.now();
            });
            saveMass(mag);
            const info = document.getElementById('znp-m-info');
            if (info) info.insertAdjacentHTML('beforeend', tr(
                '<div class="znp-note">Zapisano spodziewane powroty dla <b>' + LAST_MASS.villages.length +
                '</b> wiosek (poziom ' + LAST_MASS.level + ', za ' + fmtDur(LAST_MASS.T) + ').</div>'));
            LAST_MASS = null;
            trzymajPasek(render);
            setTimeout(() => trzymajPasek(render), 400);
        }, true);
    }

    function podswietlWyslij(wl) {
        document.querySelectorAll('.znp-pulse-wys').forEach(e => e.classList.remove('znp-pulse', 'znp-pulse-wys'));
        if (!wl) return;
        const btn = szukajWyslij();
        if (btn) btn.classList.add('znp-pulse', 'znp-pulse-wys');
    }

    function szukajWyslij() {
        const bezp = document.querySelector('#scavenge_mass_screen a.btn-send, .send-row a.btn-send, .buttons-container a.btn-send');
        if (bezp) return bezp;
        const kand = document.querySelectorAll('#scavenge_mass_screen a.btn, #scavenge_mass_screen input[type=button], #scavenge_mass_screen button, .send-row a, .send-row input, .send-row button');
        for (let i = 0; i < kand.length; i++) {
            const t = ((kand[i].value || '') + ' ' + (kand[i].textContent || '')).toLowerCase();
            if (/wy\u015blij|send|senden|envoyer|enviar|invia/.test(t) && !/premium|\+20/.test(t)) return kand[i];
        }
        return null;
    }

    function odznacz(td) {
        const box = td && td.querySelector('input[type=checkbox]');
        if (!box || !box.checked) return;
        if (!box.disabled) { try { box.click(); } catch (e) {} }
        if (box.checked) { box.checked = false; box.dispatchEvent(new Event('change', { bubbles: true })); }
    }

    function massClearChecks() {
        massRows().forEach(r => {
            for (let l = 1; l <= 4; l++) if (r.opt[l]) optSet(r.opt[l].td, false);
        });
    }

    function myVillage() {
        if (PROBE.vid) return PROBE.vid;
        const m = location.href.match(/village=(\d+)/);
        return m ? m[1] : '';
    }
    const tZast = () => { try { const p = window.game_data && window.game_data.player;
        return p && parseInt(p.sitter, 10) > 0 ? '&t=' + p.id : ''; } catch (e) { return ''; } };
    const urlUnits = () => '/game.php?village=' + myVillage() + tZast() + '&screen=overview_villages&type=own_home&mode=units&group=0';
    const urlScav  = () => '/game.php?village=' + myVillage() + tZast() + '&screen=place&mode=scavenge';
    const urlMass  = () => '/game.php?village=' + myVillage() + tZast() + '&screen=place&mode=scavenge_mass';

    function htmlMass() {
        const odczyt = onUnits() ? collectUnits() : null;
        if (onMass())  collectMass();
        const store = loadMass();
        const zUnits = Object.keys(store).filter(k => store[k].unitsTs && store[k].src === 'own').length;
        const zFree  = Object.keys(store).filter(k => store[k].free && store[k].free.length).length;

        let h = `<div class="znp-sec"><h4>Dane <em>${zUnits} wiosek z wojskiem \u00b7 ${zFree} ze stanem poziom\u00f3w</em></h4>
          <table>
            <tr><td class="znp-l">Krok 1 \u2014 Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne</td>
                <td>${onUnits() ? '<b>jeste\u015b tu</b>' : (zUnits ? zUnits + ' wiosek' : 'brak danych')}</td>
                <td>${onUnits() ? '' : '<a class="znp-go" href="' + urlUnits() + '">przejd\u017a</a>'}</td></tr>
            <tr><td class="znp-l">Krok 2 \u2014 Plac \u2192 Zbieractwo masowe</td>
                <td>${onMass() ? '<b>jeste\u015b tu</b>' : (zFree ? zFree + ' wiosek' : '\u2014')}</td>
                <td>${onMass() ? '' : '<a class="znp-go" href="' + urlMass() + '">przejd\u017a</a>'}</td></tr>
          </table>
          ${onMass() ? (() => {
              const st = { wolny: 0, zbiera: 0, niedostepny: 0, zablokowany: 0, inny: 0 };
              massRows().forEach(r => { for (let l = 1; l <= 4; l++) if (r.opt[l]) st[r.opt[l].stan] = (st[r.opt[l].stan] || 0) + 1; });
              let t = `<table style="margin-top:6px"><tr><th>WOLNE</th><th>ZBIERA</th><th>NIEDOST.</th><th>NIEROZPOZN.</th></tr>` +
                      `<tr><td>${st.wolny}</td><td>${st.zbiera}</td><td>${st.niedostepny}</td><td>${st.zablokowany + st.inny}</td></tr></table>`;
              if (!st.wolny && !st.zbiera && !st.niedostepny) {
                  const r0 = massRows()[0];
                  const td0 = r0 && r0.opt[1] ? r0.opt[1].td : null;
                  const esc = x => String(x).replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));
                  if (td0) {
                      const b = td0.querySelector('input');
                      let vis = '-';
                      try { vis = b ? (b.offsetParent !== null ? 'widoczny' : 'ukryty (offsetParent null)') : 'brak'; } catch (e) { vis = 'blad'; }
                      t += `<div class="znp-warn" style="font-size:10px;line-height:1.5">
                        <b>Nic nie rozpoznano jako wolne. Oto co widzi skrypt w pierwszej kom\u00f3rce:</b><br>
                        klasa td: <code>${esc(td0.className)}</code><br>
                        input: ${b ? '<code>' + esc(b.outerHTML).slice(0, 120) + '</code>' : '<b>NIE ZNALEZIONO</b>'}<br>
                        widoczno\u015b\u0107: ${vis}<br>
                        dzieci td: ${td0.children.length} (${Array.prototype.map.call(td0.children, c => c.tagName.toLowerCase() + '.' + (c.className || '?')).join(', ').slice(0, 160)})
                      </div>`;
                  }
              }
              return t;
          })() : ''}
          <button class="znp-btn" id="znp-m-run">ODCZYTAJ I PRZELICZ</button>
`;
        h += htmlRezerwa('mass');

        if (onUnits()) {
            const r = { ile: zUnits, kolumn: (PROBE.units || []).length,
                        tryb: odczyt && odczyt.tryb, err: odczyt && odczyt.err };
            if (r.err) h += `<div class="znp-warn">${r.err}</div>`;
            else h += `<div class="znp-warn">Odczytano wojsko z <b>${r.ile}</b> wiosek${r.kolumn ? ' (' + r.kolumn + ' kolumn' + (r.tryb ? ', ' + r.tryb : '') + ')' : ''}.
                  Teraz przejd\u017a na Plac \u2192 Zbieractwo masowe.</div>`;
        }
        h += `</div>`;

        const dfPewny = DF_OK;
        if (!dfPewny) {
            return h + `<div class="znp-sec"><h4>Brak wsp\u00f3\u0142czynnika czasu \u2014 nie licz\u0119 planu</h4>
              <div class="znp-err">Ta warto\u015b\u0107 decyduje nie tylko o godzinach powrotu, ale te\u017c o tym,
              <b>ile wojska wpisa\u0107</b> i <b>jak podzieli\u0107 wioski na grupy</b>. Bez niej plan by\u0142by b\u0142\u0119dny,
              wi\u0119c go nie pokazuj\u0119.</div>
              <div style="margin-top:8px"><a class="znp-go" href="${urlScav()}">PRZEJD\u0179 DO ZBIERACTWA WIOSKI</a></div>
              <label style="margin-top:10px">albo wpisz tu pr\u0119dko\u015b\u0107 \u015bwiata i gotowe</label>
              <div class="znp-row2">
                <div><input type="number" id="znp-df-speed" min="0.1" max="10" step="0.05" placeholder="np. 1.25"></div>
                <div><button class="znp-btn" id="znp-df-ok">ZAPISZ</button></div>
              </div>
              <div class="znp-note">Wystarczy raz wej\u015b\u0107 na ekran zbieractwa dowolnej wioski \u2014 skrypt
              zmierzy warto\u015b\u0107 z karty poziomu i zapami\u0119ta j\u0105 na sta\u0142e. Alternatywnie wpisz
              pr\u0119dko\u015b\u0107 \u015bwiata w USTAWIENIACH.
              \u0179r\u00f3d\u0142o teraz: ${DF_SRC}.</div></div>`;
        }
        if (!onMass()) {
        h += `<div class="znp-sec"><h4>Plan</h4><div class="znp-note">Grupy policz\u0119 na ekranie
                  <b>Plac \u2192 Zbieractwo masowe</b>.</div></div>`;
            return h;
        }

        const plan = (MASS_PLAN && !MASS_PLAN.error) ? MASS_PLAN : przeliczPlan();
        h += fold('ugrup', 'Ustawienia grup', `
          <div class="znp-row2">
            <div><label>Min. wiosek w grupie</label><input type="number" id="znp-m-min" min="1" step="1"></div>
            <div><label>Maks. grup</label><input type="number" id="znp-m-max" min="1" max="8" step="1"></div>
          </div>
          <div class="znp-row2">
            <div><label>Pomijaj poz. 1 poni\u017cej [min] \u00b7 0 = wy\u0142.</label><input type="number" id="znp-m-skip" min="0" step="10"></div>
            <div><label>${etykietaLimitu(cfg.massMaxClock, limitMasowe())}</label><input type="text" id="znp-m-czas" placeholder="3:00 \u00b7 @7:30"></div>
          </div>
          <div class="znp-note" id="znp-m-zal">${plan.error ? '' : htmlZalecenie(plan)}</div>

`,
          cfg.massMinGroup + '\u2013' + cfg.massMaxGroups,
          'Na ka\u017cd\u0105 grup\u0119 przypadaj\u0105 max. cztery wysy\u0142ki. Wi\u0119cej grup to lepszy zbierak, ' +
          'ale wi\u0119cej klikania i cz\u0119stsza wysy\u0142ka... pod rozwag\u0119...');

        h += htmlWykluczone();

        if (plan.error) return h + `<div class="znp-sec"><h4>Plan</h4>${MASS_OSTRZ}<div class="znp-err">${plan.error}</div></div>`
               + htmlOdpad(plan.odpad);

        const seq = massSeq(plan);
        const nast = massNext(plan);

        h += `<div class="znp-sec"><h4>Grupy <em>${plan.k} grup \u00b7 ${plan.total} wiosek \u00b7 ${(100 - plan.strata / plan.ideal * 100).toFixed(0)}% wykorzystania</em></h4>
          <div class="znp-krok">${nast
              ? `<span>Krok <b>${seq.filter(x => MASS_DONE[massKey(x.g, x.l)]).length + 1}</b> z <b>${seq.length}</b> \u2014
                 <b>grupa ${nast.g}, poziom ${nast.l}</b></span>${onMass() ? '<a href="#" class="znp-do-wys">DO WYSY\u0141KI \u2193</a>' : ''}`
              : '<button class="znp-btn znp-pulse" id="znp-m-reszta">PRZELICZ POZOSTA\u0141E</button>'}</div>
          <table><tr><th>GR</th><th>CZAS</th><th>WIOSEK</th><th>BEZCZYNNE</th><th>POZIOMY</th></tr>`;
        plan.groups.forEach(g => {

            const poz = (cfg.order === 'desc' ? [4, 3, 2, 1] : [1, 2, 3, 4])
              .filter(l => g.lvls.indexOf(l) >= 0).map(l => {
                const n = g.members.filter(m => m.free.indexOf(l) >= 0).length;
                if (!n) return '';
                const k = massKey(g.nr, l);
                const cls = MASS_DONE[k] ? 'znp-mbtn znp-mbtn-done'
                          : (nast && nast.g === g.nr && nast.l === l) ? 'znp-mbtn znp-mbtn-next' : 'znp-mbtn';
                const arm = MASS_ARM && MASS_ARM.g === g.nr && MASS_ARM.l === l;
                const tresc = MASS_DONE[k] ? '\u2713' : l;
                const dis = MASS_DONE[k] ? ' disabled' : '';
                return `<button class="${cls}${arm ? ' znp-mbtn-armed' : ''}"${dis} data-g="${g.nr}" data-l="${l}">${tresc}<sub>${n}</sub></button>`;
            }).join(' ');
            const wszystkie = g.lvls.every(l => MASS_DONE[massKey(g.nr, l)]);
            h += `<tr class="${wszystkie ? 'znp-gr-done' : ''}"><td>${g.nr}</td><td>${fmtDur(g.T)}</td>
                  <td>${g.members.length}</td><td>${fmtNum(g.idle)}</td>
                  <td class="znp-poz">${wszystkie ? '<span class="znp-gr-ok">wys\u0142ana</span>' : (poz || '\u2014')}</td></tr>`;
        });
        h += `</table>
<div id="znp-m-info">${MASS_OSTRZ}</div></div>
          ${htmlOdpad(plan.odpad)}
          <div class="znp-row2"><button class="znp-btn znp-alt" id="znp-m-pow">WYCZY\u015a\u0106 POWROTY</button>
          <button class="znp-btn znp-alt" id="znp-m-clear">ODZNACZ WIOSKI</button></div>`;
        return h;
    }

    let WYKL_FILTR = '';
    function wioskiDoListy() {
        const store = loadMass(), m = {};
        Object.keys(store).forEach(id => { m[id] = store[id].name || ''; });
        if (onMass()) massRows().forEach(r => {
            if (m[r.id] && !/^wioska \d+$/.test(m[r.id])) return;
            const a = r.tr.querySelector('a[href*="village="]');
            const t = a ? (a.textContent || '').replace(/\s+/g, ' ').trim() : '';
            m[r.id] = t || m[r.id] || ('wioska ' + r.id);
        });
        Object.keys(cfg.massExcl).forEach(id => { if (!m[id]) m[id] = String(cfg.massExcl[id]); });
        return Object.keys(m).map(id => ({ id: id, name: m[id] || ('wioska ' + id), wyk: !!cfg.massExcl[id] }))
            .sort((a, b) => (b.wyk - a.wyk) || a.name.localeCompare(b.name, 'pl'));
    }
    function htmlWykluczone() {
        const lista = wioskiDoListy();
        const ile = lista.filter(x => x.wyk).length;
        const esc = x => String(x).replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));
        const wiersze = lista.map(x => `<label class="znp-chk znp-wyk" data-txt="${esc(x.name.toLowerCase())}" style="margin-top:3px">
              <input type="checkbox" data-wyk="${esc(x.id)}" data-nazwa="${esc(x.name)}" ${x.wyk ? 'checked' : ''}> ${esc(x.name)}</label>`).join('');
        return fold('mwykl', 'Wykluczone wioski', lista.length ? `
          <input type="text" id="znp-m-wfil" placeholder="Szukaj (nazwa lub wsp\u00f3\u0142rz\u0119dne)" value="${esc(WYKL_FILTR)}">
          <div style="max-height:220px;overflow-y:auto;margin-top:4px">${wiersze}</div>
          <div class="znp-note">Zaznaczona = nie wysy\u0142a. Plan przelicza si\u0119 od razu.</div>`
          : '<div class="znp-note">Brak wiosek \u2014 najpierw Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne albo ekran masowego.</div>',
          ile ? ile + ' wykluczone' : 'brak');
    }
    function bindWykluczone() {
        const f = document.getElementById('znp-m-wfil');
        const filtruj = () => {
            const q = WYKL_FILTR.trim().toLowerCase();
            (root || document).querySelectorAll('#znp .znp-wyk').forEach(el => {
                el.style.display = !q || (el.dataset.txt || '').indexOf(q) >= 0 ? '' : 'none';
            });
        };
        if (f) f.addEventListener('input', () => { WYKL_FILTR = f.value; filtruj(); });
        filtruj();
        (root || document).querySelectorAll('#znp input[data-wyk]').forEach(c => c.addEventListener('change', () => {
            if (c.checked) cfg.massExcl[c.dataset.wyk] = c.dataset.nazwa || ('wioska ' + c.dataset.wyk);
            else delete cfg.massExcl[c.dataset.wyk];
            saveCfg(); przeliczPlan(); render();
        }));
    }

    function htmlOdpad(o) {
        if (!o || !o.wszystkie) return '';
        const poza = o.wszystkie - o.wPlanie;
        if (!poza) return `<div class="znp-note">Wszystkie <b>${o.wszystkie}</b> wiosek z tego ekranu s\u0105 w planie.</div>`;
        const lista = o.szczegoly.slice(0, 25)
            .map(x => `<tr><td class="znp-l">${x.n}</td><td style="text-align:right">${x.p}</td></tr>`).join('');
        return fold('odpad', 'Wioski poza planem', `<table>
            <tr><th>POW\u00d3D</th><th>ILE</th></tr>
            <tr><td class="znp-l">wszystkie poziomy zaj\u0119te lub niedost\u0119pne</td><td>${o.brakPoziomow}</td></tr>
            <tr><td class="znp-l">brak wojska po odj\u0119ciu rezerwy</td><td>${o.brakWojska}</td></tr>
            <tr><td class="znp-l">brak danych o wojsku</td><td>${o.brakDanych}</td></tr>
            ${o.wykluczone ? `<tr><td class="znp-l">wykluczone przez Ciebie</td><td>${o.wykluczone}</td></tr>` : ''}
            <tr class="znp-tot"><td class="znp-l">w planie</td><td>${o.wPlanie} z ${o.wszystkie}</td></tr>
          </table>
          <table style="margin-top:6px">${lista}</table>`,
          poza + ' poza planem');
    }

    function bindMass() {
        bindWykluczone();
        const mn = document.getElementById('znp-m-min');
        if (mn) { mn.value = cfg.massMinGroup;
            mn.addEventListener('change', e => { cfg.massMinGroup = parseInt(e.target.value, 10) || 1; saveCfg(); przeliczPlan(); render(); }); }
        const pr = document.getElementById('znp-m-max');
        if (pr) { pr.value = cfg.massMaxGroups;
            pr.addEventListener('change', e => { cfg.massMaxGroups = parseInt(e.target.value, 10) || 3; saveCfg(); przeliczPlan(); render(); }); }
        const sk1 = document.getElementById('znp-m-skip');
        if (sk1) { sk1.value = cfg.massSkipL1Min || 0;
            sk1.addEventListener('change', e => { cfg.massSkipL1Min = parseInt(e.target.value, 10) || 0;
                saveCfg(); przeliczPlan(); render(); }); }
        const zu = document.getElementById('znp-m-zal-ustaw');
        if (zu) zu.addEventListener('click', e => { e.preventDefault();
            cfg.massMaxGroups = parseInt(zu.dataset.k, 10); cfg.massMinGroup = parseInt(zu.dataset.min, 10);
            saveCfg(); przeliczPlan(); render(); });

        if (MASS_ZAL === null && cfg.secOpen.ugrup) liczZalecenie();
        const cz = document.getElementById('znp-m-czas');
        if (cz) { cz.value = cfg.massMaxClock ? '@' + cfg.massMaxClock : (cfg.massMaxMinutes ? fmtHM(cfg.massMaxMinutes) : '');
            cz.addEventListener('change', e => {
                const z = parseZegar(e.target.value), v = z ? 0 : parseHM(e.target.value);
                cfg.massMaxClock = z; cfg.massMaxMinutes = (v && v >= minMinutes()) ? v : 0;
                saveCfg(); przeliczPlan(); render(); }); }
        const pw = document.getElementById('znp-m-pow');
        if (pw) pw.addEventListener('click', () => { saveReturns({}); render(); });
        const rn = document.getElementById('znp-m-run');
        if (rn) rn.addEventListener('click', () => {
            MASS_BLOK = {};
            if (onUnits()) collectUnits(); if (onMass()) collectMass(); przeliczPlan(); render(); });
        const cl = document.getElementById('znp-m-clear');
        if (cl) cl.addEventListener('click', () => { massClearChecks(); podswietlWyslij(false); MASS_ARM = null;
            (root || document).querySelectorAll('#znp .znp-mbtn-armed').forEach(x => x.classList.remove('znp-mbtn-armed'));
            const i = document.getElementById('znp-m-info');
            if (i) i.innerHTML = tr('<div class="znp-note">Odznaczono wszystkie wioski.</div>'); });
        const rb = document.getElementById('znp-m-reszta');
        if (rb) rb.addEventListener('click', przeliczPozostale);
        const dw = document.querySelector('#znp .znp-do-wys');
        if (dw) dw.addEventListener('click', e => {
            e.preventDefault();
            const bar = document.getElementById('znp-wys');
            if (bar) try { bar.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e2) { bar.scrollIntoView(); }
        });
        (root || document).querySelectorAll('#znp .znp-mbtn').forEach(b => b.addEventListener('click', () => obsluzKafelek(b)));
    }

    function obsluzKafelek(b) {
        kafelek(b);
        pasekWysylki();
    }

    function kafelek(b) {
        if (!aktywna() || b.disabled) return;
        const plan = MASS_PLAN;
        if (!plan || plan.error) return;
        const g = plan.groups[parseInt(b.dataset.g, 10) - 1];
        const l = parseInt(b.dataset.l, 10);

        const powod = () => {
            if (!LAST_MASS || LAST_MASS.grupa !== g.nr || LAST_MASS.level !== l) return 'inny kafelek uzbrojony';
            if (!LAST_MASS.villages.length) return 'gra nie da\u0142a zaznaczy\u0107 \u017cadnej wioski';
            const inp = unitInputs();
            for (const n in inp) {
                const jest = parseInt(inp[n].value, 10) || 0, ma = LAST_MASS.alloc[n] || 0;
                if (jest !== ma) return 'pole ' + (UNIT_PL[n] || n) + ': ' + jest + ' zamiast ' + ma;
            }
            const mam = [];
            for (const r of massRows()) for (let x = 1; x <= 4; x++) {
                const o = r.opt[x];
                if (!o || !o.zazn || !(o.wolny || o.stan === 'niedostepny')) continue;
                if (x !== l) return 'zaznaczony inny poziom (' + x + ')';
                mam.push(r.id);
            }
            const a = mam.sort().join(','), b = LAST_MASS.villages.slice().sort().join(',');
            return a === b ? '' : 'zaznaczone wioski: ' + mam.length + ' zamiast ' + LAST_MASS.villages.length;
        };
        const gotowe = () => !powod();

        const ZNP_DWUKLIK_MS = 200;
        const odUzbr = Date.now() - armTs();
        if (MASS_ARM && MASS_ARM.g === g.nr && MASS_ARM.l === l && odUzbr < ZNP_DWUKLIK_MS) return;
        if (MASS_ARM && MASS_ARM.g === g.nr && MASS_ARM.l === l && gotowe()) {
            try { b.blur(); } catch (e) {}
            podswietlWyslij(true);
            const i2 = document.getElementById('znp-m-info');
            if (i2 && !i2.querySelector('.znp-gotowe')) i2.insertAdjacentHTML('beforeend',
                tr('<div class="znp-note znp-gotowe">Formularz jest gotowy \u2014 kliknij w grze przycisk \u201eWy\u015blij\u201d.</div>'));
            return;
        }
        if (odUzbr < ZNP_DWUKLIK_MS) return;
        MASS_OSTRZ = '';
        podswietlWyslij(false);
        const r = massApply(g, l);
        MASS_ARM = { g: g.nr, l: l };
        armTs(Date.now());
        try { b.blur(); } catch (e) {}

        (root || document).querySelectorAll('#znp .znp-mbtn-armed').forEach(x => x.classList.remove('znp-mbtn-armed'));
        b.classList.add('znp-mbtn-armed');
        const info = document.getElementById('znp-m-info');
        if (!info) return;
        const nast = massNext(plan);
        if (nast && (nast.g !== g.nr || nast.l !== l))
            info.innerHTML = tr(`<div class="znp-warn">Uwaga: to nie jest nast\u0119pny krok w kolejce
              (powinna by\u0107 grupa ${nast.g}, poziom ${nast.l}). Sk\u0142ady licz\u0105 si\u0119 ze wsp\u00f3lnej puli,
              wi\u0119c klikanie poza kolejno\u015bci\u0105 mo\u017ce zostawi\u0107 wojsko w domu.</div>`);
        else info.innerHTML = '';
        if (r.err) { info.innerHTML = tr(`<div class="znp-warn">${r.err}</div>`); return; }
        info.insertAdjacentHTML('beforeend', '');
        const opis = Object.keys(r.comp.alloc).map(n => r.comp.alloc[n] + '\u00d7' + (UNIT_PL[n] || n)).join(' ');
        if (!Object.keys(r.comp.alloc).length) {
            const braki = {};
            g.members.forEach(m => Object.keys(CARRY_FALLBACK).forEach(n => {
                if (CARRY_FALLBACK[n] > 0) braki[n] = Math.min(braki[n] === undefined ? Infinity : braki[n], dostepne(m.v, n));
            }));
            const lista = Object.keys(braki).filter(n => braki[n] === 0).map(n => UNIT_PL[n] || n).join(', ');
            info.insertAdjacentHTML('beforeend', tr(`<div class="znp-warn">
              Sk\u0142ad wyszed\u0142 pusty. W tej grupie jest wioska, kt\u00f3ra ma <b>0</b> sztuk
              ka\u017cdego u\u017cywanego typu po odj\u0119ciu rezerwy${lista ? ' (' + lista + ')' : ''}.
              Spr\u00f3buj zmniejszy\u0107 rezerw\u0119, ustawi\u0107 <b>min. wiosek w grupie</b> na 1
              albo wy\u0142\u0105czy\u0107 typy jednostek, kt\u00f3rych te wioski nie maj\u0105.</div>`));
            return;
        }
        info.insertAdjacentHTML('beforeend', tr(`<div class="znp-warn">Grupa ${g.nr}, poziom ${l}: wpisano <b>${opis || 'nic'}</b>
          (${fmtNum(r.comp.cap)} z ${fmtNum(r.comp.target)} poj.), zaznaczono <b id="znp-m-zazn">${r.zazn}</b> z ${r.rows} wiosek.
          <br>Teraz kliknij w grze przycisk \u201eWy\u015blij\u201d.</div>`));
        if (r.zazn) podswietlWyslij(true);

    }

    function przeliczPozostale() {
        MASS_DONE = {}; MASS_ARM = null; MASS_BLOK = {};
        collectMass(); przeliczPlan(); render();
    }

    function przewijalny(el) {
        for (let p = el && el.parentElement; p; p = p.parentElement) {
            const st = window.getComputedStyle(p);
            if (/(auto|scroll)/.test(st.overflowY) && p.scrollHeight > p.clientHeight) return p;
        }
        return document.scrollingElement || document.documentElement;
    }
    function trzymajPasek(fn) {
        const bar = document.getElementById('znp-wys');
        const h = window.innerHeight || document.documentElement.clientHeight;
        const t0 = bar ? bar.getBoundingClientRect().top : null;
        fn();
        if (t0 === null || t0 < 0 || t0 > h) return;
        const bar2 = document.getElementById('znp-wys');
        if (!bar2) return;
        const d = bar2.getBoundingClientRect().top - t0;
        if (Math.abs(d) < 1) return;
        try { przewijalny(bar2).scrollTop += d; } catch (e) {  }
    }

    function pasekWysylki() {
        let bar = document.getElementById('znp-wys');
        const plan = MASS_PLAN;
        const btn = (aktywna() && root && onMass() && cfg.tab === 'masowe' && plan && !plan.error) ? szukajWyslij() : null;
        if (!btn) { if (bar) bar.remove(); return; }
        const kont = btn.closest('.buttons-container, .send-row') || btn;
        if (!bar || bar.nextElementSibling !== kont) {
            if (bar) bar.remove();
            bar = document.createElement('div');
            bar.id = 'znp-wys';
            kont.parentNode.insertBefore(bar, kont);
        }
        const seq = massSeq(plan), nast = massNext(plan), cel = MASS_ARM || nast;
        const zrobione = seq.filter(x => MASS_DONE[massKey(x.g, x.l)]).length;
        const proc = seq.length ? Math.round(zrobione / seq.length * 100) : 0;
        let krok, opis, przycisk, klasa = '', stan, zle = false;
        if (!cel) {
            krok = 'GOTOWE'; opis = 'Wszystkie kroki wys\u0142ane \u2713';
            przycisk = 'PRZELICZ POZOSTA\u0141E'; klasa = ' znp-w-alt';
            stan = 'przelicza plan z wojska, kt\u00f3re zosta\u0142o';
        } else {
            const g = plan.groups[cel.g - 1];
            const ile = g ? g.members.filter(m => m.free.indexOf(cel.l) >= 0).length : 0;
            krok = 'KROK ' + (zrobione + 1) + ' / ' + seq.length;
            opis = 'grupa ' + cel.g + ' \u00b7 poziom ' + cel.l;
            const wpisane = MASS_ARM && LAST_MASS && LAST_MASS.grupa === cel.g && LAST_MASS.level === cel.l;
            if (wpisane && LAST_MASS.villages.length) {
                przycisk = '\u2713 WPISANE'; klasa = ' znp-w-ok';
                stan = 'zaznaczono ' + LAST_MASS.villages.length + ' z ' + ile + ' wiosek \u2014 kliknij \u201eWy\u015blij\u201d poni\u017cej';
            } else if (MASS_ARM) {
                przycisk = 'UZUPE\u0141NIJ'; zle = true;
                stan = 'nie uda\u0142o si\u0119 \u2014 szczeg\u00f3\u0142y w panelu u g\u00f3ry';
            } else {
                przycisk = 'UZUPE\u0141NIJ';
                stan = ile + ' wiosek \u00b7 bieg ' + (g ? fmtDur(g.T) : '\u2014');
            }
        }
        bar.innerHTML = tr(`<div class="znp-w-gora"><span class="znp-w-krok">${krok}</span>
            <span class="znp-w-cel">${opis}</span><a href="#" class="znp-w-gr">\u2191 grupy</a></div>
            <div class="znp-w-post"><i style="width:${proc}%"></i></div>
            <button type="button" class="znp-w-b${klasa}">${przycisk}</button>
            <div class="znp-w-st${zle ? ' znp-w-zle' : ''}">${stan}</div>`);
        const kb = bar.querySelector('.znp-w-b');
        if (kb) kb.addEventListener('click', () => {
            try { kb.blur(); } catch (e) {  }
            if (!cel) { trzymajPasek(przeliczPozostale); return; }
            const t = document.querySelector(`#znp .znp-mbtn[data-g="${cel.g}"][data-l="${cel.l}"]`);
            if (t && !t.disabled) trzymajPasek(() => obsluzKafelek(t));
        });
        const gr = bar.querySelector('.znp-w-gr');
        if (gr) gr.addEventListener('click', e => {
            e.preventDefault();
            if (root) try { root.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e2) { root.scrollIntoView(); }
        });
    }

    let root = null;

    function kotwicaGry() {
        const sel = ['#mobileContent', '#contentContainer .maincell', '#content_value',
                     '.maincell', '#contentContainer', '#main_layout'];
        for (let i = 0; i < sel.length; i++) {
            const el = document.querySelector(sel[i]);
            if (el) return el;
        }
        return document.body;
    }

    function buildUI() {
        injectCSS();
        const st0 = document.getElementById('znp'); if (st0) st0.remove();
        root = null;
        cfg.open = true;
        root = document.createElement('div');
        root.id = 'znp';
        root.className = 'znp-pasek';
        root.innerHTML = tr(
`<div class="znp-hd">
   <img data-znp-logo="1" alt="">
   <div class="znp-tt"><div class="znp-t1">Zbieractwo na pe\u0142nej</div><div class="znp-t2">by Desunia \u00b7 v1.0</div></div>
   <span class="znp-x" title="Zamknij">&#10005;</span>
 </div>
 <div class="znp-tabs">
   <div class="znp-tab" data-tab="planer">PLANER</div>
   <div class="znp-tab" data-tab="powroty">POWROTY</div>
   <div class="znp-tab" data-tab="masowe">MASOWE</div>
   <div class="znp-tab" data-tab="ustawienia">USTAWIENIA</div>
 </div>
 <div class="znp-body"></div>`);
        const kot = kotwicaGry();
        kot.insertBefore(root, kot.firstChild);
        root.querySelector('.znp-x').addEventListener('click', () => { podswietlWyslij(false); root.remove(); root = null; pasekWysylki(); });
        root.querySelectorAll('.znp-tab').forEach(t => t.addEventListener('click', () => { cfg.tab = t.dataset.tab; saveCfg(); render(); }));

        const ikona = root.querySelector('.znp-hd img');

        if (ikona) ikona.setAttribute('src', LOGO);
        if (ikona) ikona.addEventListener('error', () => {
            const z = document.createElement('span');
            z.className = 'znp-znak';
            z.textContent = 'Z';
            if (ikona.parentNode) ikona.parentNode.replaceChild(z, ikona);
        });
        render();
    }

    function render() {
        if (!aktywna()) return;
        if (!root) return;
        root.style.display = 'flex';
        root.querySelectorAll('.znp-tab').forEach(t => t.classList.toggle('znp-on', t.dataset.tab === cfg.tab));
        const b = root.querySelector('.znp-body');
        if (!b) return;

        const safe = (build, bind) => {
            try { b.innerHTML = tr(build()); } catch (e) {
                b.innerHTML = '<div class="znp-sec"><h4>' + tr('B\u0142\u0105d widoku') + '</h4><div class="znp-err">' +
                    String(e && e.message) + '</div><div class="znp-note">' +
                    String(e && e.stack || '').split('\n').slice(0, 3).join('<br>') + '</div></div>';
                return;
            }
            try { bind(); } catch (e) {
                b.insertAdjacentHTML('beforeend',
                    '<div class="znp-warn">' + tr('B\u0142\u0105d podpi\u0119cia kontrolek:') + ' ' + String(e && e.message) + '</div>');
            }
        };
        const bindSpeed = () => {
            const b = document.getElementById('znp-df-ok'), i = document.getElementById('znp-df-speed');
            if (!b || !i) return;
            const zatw = () => {
                const v = parseFloat(i.value);
                if (!(v > 0)) return;
                cfg.speedOverride = v; saveCfg(); detectDF(); przeliczPlan(); render();
            };
            b.addEventListener('click', zatw);
            i.addEventListener('keydown', e => { if (e.key === 'Enter') zatw(); });
        };

        const bindFolds = () => (root || document).querySelectorAll('#znp .znp-fold>h4').forEach(hh =>
            hh.addEventListener('click', e => {
                e.preventDefault(); e.stopPropagation();
                const box = hh.parentElement, id = box.dataset.sec;
                const open = box.classList.toggle('znp-open');
                cfg.secOpen[id] = open; saveCfg();
                if (id === 'ugrup' && open && MASS_ZAL === null && cfg.tab === 'masowe') liczZalecenie();
            }));
        const safeF = (build, bind) => { safe(build, bind); bindFolds(); bindSpeed(); bindRezerwa(); };
        if (cfg.tab === 'masowe')           safeF(htmlMass, bindMass);
        else if (cfg.tab === 'powroty')     safeF(htmlReturns, bindReturns);
        else if (cfg.tab === 'ustawienia')  safeF(htmlSettings, bindSettings);
        else                                safeF(htmlPlanner, bindPlanner);
        pasekWysylki();
    }

    const jestPL = () => {
        const l = ((window.game_data && window.game_data.locale) || '').toLowerCase();
        if (l) return l.indexOf('pl') === 0;
        return /\.plemiona\.pl$/i.test(location.hostname);
    };
    const SLOWNIK = [
        ['Najbli\u017cszy powr\u00f3t ka\u017cdej wioski w nag\u0142\u00f3wku jej tabeli.', 'Each village\'s next return is shown in its table header.'],
        ['wysy\u0142ek', 'sends'],
        ['wolny', 'free'],
        ['zablokowany', 'locked'],
        ['niedostepny', 'unavailable'],
        ['niedost\u0119pny', 'unavailable'],
        ['zbiera', 'busy'],
        ['inny', 'other'],
        ['grupa', 'group'],
        ['WYKRYTY POZIOM', 'DETECTED LEVEL'],
        ['Karty w DOM', 'Cards in DOM'],
        ['kroje pisma', 'web fonts'],
        ['Pobieraj kroje pisma z sieci (Google Fonts)', 'Load web fonts (Google Fonts)'],
        ['z', 'of'],
        ['WYCZY\u015a\u0106 POWROTY', 'CLEAR RETURNS'],
        ['ODZNACZ WIOSKI', 'UNCHECK VILLAGES'],
        ['Pr\u0119dko\u015b\u0107 \u015bwiata r\u0119cznie (0 = wykryj sam)', 'World speed, set manually (0 = detect it)'],
        ['pr\u0119dko\u015b\u0107 \u015bwiata w USTAWIENIACH.', 'the world speed in SETTINGS.'],
        ['np. 1:30 \u2014 puste = brak', 'e.g. 1:30 \u2014 empty = none'],
        ['wysy\u0142a\u0107 ten typ', 'send this unit type'],
        ['brak danych', 'no data'],
        ['Wszystkie', 'All'],
        ['z limitem', 'with a limit'],
        ['wszystkie', 'all'],
        ['wierszy', 'rows'],
        ['BRAK WIERSZY', 'NO ROWS'],
        ['za', 'in'],
        ['brak', 'none'],
        ['teraz', 'now'],
        ['Odznaczono wszystkie wioski.', 'All villages unchecked.'],
        ['Zapisano spodziewane powroty dla', 'Saved expected returns for'],
        ['wiosek (poziom', 'villages (level'],
        ['za', 'in'],
        ['wysy\u0142ek', 'sends'],
        ['wysy\u0142ka', 'send'],
        ['Jednostki', 'Units'],
        ['Karty w DOM', 'Cards in DOM'],
        ['KARTA', 'CARD'],
        ['STAN', 'STATE'],
        ['zmierzone', 'measured'],
        ['Pobieraj kroje pisma z sieci (Google Fonts)', 'Load web fonts (Google Fonts)'],
        ['sonda: df', 'probe: df'],
        ['sonda: wioska', 'probe: village'],
        ['pomiar z ekranu', 'screen measurement'],
        ['Albo wprost df (0 = wykryj sam)', 'Or the df value directly (0 = detect it)'],
        ['Na tamtym ekranie zmierz\u0119 j\u0105 z karty poziomu i zapami\u0119tam.', 'On that screen I will measure it from a level card and remember it.'],
        ['Nie mog\u0119 policzy\u0107 podzia\u0142u \u2014 ta warto\u015b\u0107 decyduje o d\u0142ugo\u015bci biegu i o tym, ile wojska wpisa\u0107.', 'I cannot compute the split \u2014 this value decides the run length and how many troops to fill in.'],
        ['Wszystkie powroty', 'All returns'],
        ['WIOSKA', 'VILLAGE'],
        ['ZAPISZ', 'SAVE'],
        ['Planer', 'Planner'],
        ['pik', 'spear'],
        ['miecz', 'sword'],
        ['top', 'axe'],
        ['\u0142uk', 'archer'],
        ['LK', 'LC'],
        ['\u0141K', 'MA'],
        ['CK', 'HC'],
        ['rycerz', 'knight'],
        ['zwiad', 'scout'],
        ['Pr\u0119dko\u015b\u0107 \u015bwiata r\u0119cznie (0 = wykryj sam) \u2014 pl230 to 1.6, pl232 to 1.25', 'World speed, set manually (0 = detect it) \u2014 pl230 is 1.6, pl232 is 1.25'],
        ['sonda: pr\u0119dko\u015b\u0107', 'probe: speed'],
        ['zdarze\u0144 do p\u00f3l gry', 'events sent to game fields'],
        ['po\u0142\u0105cze\u0144 na zewn\u0105trz', 'outside connections'],
        ['Poziom karty wyliczany jest z ilorazu wy\u015bwietlonego \u0142upu i wpisanej pojemno\u015bci \u2014 powinien wynosi\u0107 0,100 / 0,250 / 0,500 / 0,750. Je\u017celi w kolumnie \u201ewykryty poziom\u201d widnieje \u201epozycyjnie\u201d, mapowanie nie uda\u0142o si\u0119 zmierzy\u0107 i skrypt dzia\u0142a na kolejno\u015bci z DOM.', 'The card\'s level is derived from the displayed loot divided by the capacity entered \u2014 it should be 0.100 / 0.250 / 0.500 / 0.750. If the \u201edetected level\u201d column says \u201epositional\u201d, the mapping could not be measured and the script falls back to the DOM order.'],
        ['skrypt odczyta liczniki z gry i zapami\u0119ta czasy powrotu. Godziny w czasie lokalnym przegl\u0105darki.', 'the script reads the game timers and remembers the return times. Times are in the browser\'s local time.'],
        ['(Plac \u2192 Zbieractwo). Zak\u0142adka POWROTY dzia\u0142a na ka\u017cdym ekranie gry.', '(Rally point \u2192 Scavenging). The RETURNS tab works on every game screen.'],
        ['Zak\u0142adka POWROTY dzia\u0142a na ka\u017cdym ekranie gry.', 'The RETURNS tab works on every game screen.'],
        ['Plac \u2192 Zbieractwo', 'Rally point \u2192 Scavenging'],
        ['wykryty poziom', 'detected level'],
        ['pozycyjnie', 'positional'],
        ['Kolejno\u015b\u0107 \u017ar\u00f3de\u0142: warto\u015b\u0107 r\u0119czna, potem pomiar z ekranu gry (\u0142up i czas dowolnego poziomu odwr\u00f3cone wzorem), potem konfiguracja gry, na ko\u0144cu pr\u0119dko\u015b\u0107^-0,55. Pomiar z ekranu jest najpewniejszy, bo nie zale\u017cy od nazw p\u00f3l w game_data.', 'Source order: manual value, then a measurement from the game screen (loot and time of any level inverted with the formula), then the game config, finally speed^-0.55. The screen measurement is the most reliable one, because it does not depend on field names in game_data.'],
        ['Wystarczy raz wej\u015b\u0107 na ekran zbieractwa dowolnej wioski \u2014 skrypt zmierzy warto\u015b\u0107 z karty poziomu i zapami\u0119ta j\u0105 na sta\u0142e. Alternatywnie wpisz pr\u0119dko\u015b\u0107 \u015bwiata w USTAWIENIACH', 'It is enough to visit any village\'s scavenging screen once \u2014 the script will measure the value from a level card and remember it for good. Alternatively enter the world speed in SETTINGS'],
        ['Pr\u0119dko\u015b\u0107 \u015bwiata \u2014 wpisz r\u0119cznie', 'World speed \u2014 enter manually'],
        ['wpisz r\u0119cznie', 'enter manually'],
        ['zapami\u0119ta ich czasy', 'remembers their times'],
        ['wierszy wiosek na stronie', 'village rows on page'],
        ['poziom\u00f3w w pierwszym wierszu', 'levels in first row'],
        ['wolnych w pierwszym wierszu', 'free in first row'],
        ['wsp\u00f3\u0142czynnik czasu (df)', 'time factor (df)'],
        ['ODCZYTANE WOJSKO (pierwsze 3 wioski)', 'TROOPS READ (first 3 villages)'],
        ['PIERWSZY WIERSZ \u2014 KOM\u00d3RKI POZIOM\u00d3W', 'FIRST ROW \u2014 LEVEL CELLS'],
        ['brak wierszy', 'no rows'],
        ['brak kom\u00f3rki', 'no cell'],
        ['widoczno\u015b\u0107:', 'visibility:'],
        ['ukryty', 'hidden'],
        ['dzieci td:', 'td children:'],
        ['klasa td:', 'td class:'],
        ['Nic nie rozpoznano jako wolne. Oto co widzi skrypt w pierwszej kom\u00f3rce:', 'Nothing recognised as free. Here is what the script sees in the first cell:'],
        ['Pr\u0119dko\u015b\u0107 \u015bwiata', 'World speed'],
        ['Wsp\u00f3\u0142czynnik czasu (df) \u2014 wpisz r\u0119cznie', 'Time factor (df) \u2014 enter manually'],
        ['Najkr\u00f3tszy mo\u017cliwy bieg', 'Shortest possible run'],
        ['Czcionki z sieci', 'Web fonts'],
        ['Wszystko zostaje w pami\u0119ci lokalnej przegl\u0105darki.', 'Everything stays in the browser\'s local storage.'],
        ['Kolejno\u015b\u0107 \u017ar\u00f3de\u0142: warto\u015b\u0107 r\u0119czna, potem pomiar z ekranu gry', 'Source order: manual value, then measurement from the game screen'],
        ['z konfiguracji w \u017ar\u00f3dle strony', 'from the page source config'],
        ['konfiguracja gry, na ko\u0144cu pr\u0119dko\u015b\u0107 \u015bwiata', 'game config, finally world speed'],
        ['Ta warto\u015b\u0107 decyduje nie tylko o godzinach powrotu, ale te\u017c o tym, ile wojska wpisa\u0107.', 'This value decides not only the return times but also how many troops to fill in.'],
        ['Rezerwa zostaje w wiosce \u2014 np. pod bie\u017c\u0105ce farmienie barb.', 'The reserve stays in the village \u2014 e.g. for current barbarian farming.'],
        ['Wsp\u00f3lny zapas to najmniejsza liczba danej jednostki w\u015br\u00f3d wiosek grupy', 'Common stock is the smallest count of a given unit among the group\'s villages'],
        ['Kolumna OGRANICZA m\u00f3wi, kt\u00f3ra wioska ustala ten limit.', 'The LIMITED BY column shows which village sets that limit.'],
        ['sk\u0142ad nie mo\u017ce jej przekroczy\u0107, bo gra wysy\u0142a ten sam sk\u0142ad do wszystkich', 'the squad cannot exceed it, because the game sends the same squad to all'],
        ['Wejd\u017a na ekran zbieractwa w ka\u017cdej wiosce po wys\u0142aniu wojska', 'Visit the scavenging screen in each village after sending troops'],
        ['skrypt odczyta liczniki z gry i zapami\u0119ta czasy powrotu. Godziny w czasie lokalnym.', 'the script reads the game timers and remembers the return times. Times are local.'],
        ['Wpis znika sam po powrocie wojska. Od\u015bwie\u017canie co 30 sekund.', 'An entry disappears by itself once the troops are back. Refreshed every 30 seconds.'],
        ['Wystarczy raz wej\u015b\u0107 na ekran zbieractwa dowolnej wioski \u2014 skrypt', 'It is enough to visit any village\'s scavenging screen once \u2014 the script'],
        ['zmierzy warto\u015b\u0107 z karty poziomu i zapami\u0119ta j\u0105 na sta\u0142e. Alternatywnie', 'will measure the value from a level card and remember it. Alternatively'],
        ['albo wpisz tu pr\u0119dko\u015b\u0107 \u015bwiata i gotowe', 'just enter the world speed here and you are done'],
        ['prawdopodobnie', 'probably'],
        ['Limit pomini\u0119ty.', 'Limit skipped.'],
        ['Optimum (max sur/h)', 'Optimum (max res/h)'],
        ['R\u00f3wny czas (2:1)', 'Equal time (2:1)'],
        ['R\u00f3wny czas', 'Equal time'],
        ['sur/h', 'res/h'],
        ['Zbieractwo na pe\u0142nej', 'Full Scavenging'],
        ['PLANER', 'PLANNER'],
        ['POWROTY', 'RETURNS'],
        ['MASOWE', 'MASS'],
        ['USTAWIENIA', 'SETTINGS'],
        ['PRZELICZ I WYPE\u0141NIJ', 'CALCULATE AND FILL'],
        ['ODCZYTAJ I PRZELICZ', 'READ AND CALCULATE'],
        ['PRZELICZ POZOSTA\u0141E', 'CALCULATE THE REST'],
        ['PRZEJD\u0179 DO ZBIERACTWA WIOSKI', 'GO TO VILLAGE SCAVENGING'],
        ['WYCZY\u015a\u0106 ZAPISANE POWROTY', 'CLEAR SAVED RETURNS'],
        ['WYCZY\u015a\u0106 HISTORI\u0118 POWROT\u00d3W', 'CLEAR RETURN HISTORY'],
        ['ODZNACZ WSZYSTKIE WIOSKI', 'UNCHECK ALL VILLAGES'],
        ['RESET USTAWIE\u0143', 'RESET SETTINGS'],
        ['Zamknij', 'Close'],
        ['Tryb podzia\u0142u', 'Split mode'],
        ['Optimum', 'Optimum'],
        ['R\u00f3wny czas 2:1', 'Equal time 2:1'],
        ['R\u00f3wny podzia\u0142 wojska', 'Equal troop split'],
        ['R\u00f3wny podzia\u0142', 'Equal split'],
        ['Kolejno\u015b\u0107 wype\u0142niania', 'Fill order'],
        ['Kolejno\u015b\u0107 poziom\u00f3w', 'Level order'],
        ['Od najwy\u017cszego', 'From highest'],
        ['Od najni\u017cszego', 'From lowest'],
        ['Pomijaj poz. 1 poni\u017cej [min] \u00b7 0 = wy\u0142.', 'Skip lvl 1 below [min] \u00b7 0 = off'],
        ['to budzik, kt\u00f3ry przy tym postoju obs\u0142u\u017cy najwi\u0119cej wysy\u0142ek.\n          Kolejne wiersze to najlepsze terminy dla pozosta\u0142ych powrot\u00f3w.', 'is the alarm that covers the most sends within this idle time. Further rows are the best times for the remaining returns.'],
        ['za blisko, limit pomini\u0119ty', 'too soon, limit ignored'],
        ['Powr\u00f3t o', 'Return by'],
        ['bieg \u2264', 'run \u2264'],
        ['Maks. czas biegu', 'Max run time'],
        ['Auto-przej\u015bcie po klikni\u0119ciu Start', 'Auto-advance after clicking Start'],
        ['Pomijaj poz. 1 poni\u017cej (pik\u00f3w)', 'Skip level 1 below (spears)'],
        ['Zawsze pomijaj poz. 1', 'Always skip level 1'],
        ['Por\u00f3wnanie tryb\u00f3w', 'Mode comparison'],
        ['Czas i kolejno\u015b\u0107', 'Time and order'],
        ['Plan', 'Plan'],
        ['Dane', 'Data'],
        ['Grupy', 'Groups'],
        ['Wioski', 'Villages'],
        ['Krok', 'Step'],
        ['POZ', 'LV'],
        ['WOJSKO', 'TROOPS'],
        ['CZAS', 'TIME'],
        ['SUR/H', 'RES/H'],
        ['TRYB', 'MODE'],
        ['DOB\u0118', 'DAY'],
        ['dob\u0119', 'day'],
        ['wi\u0119cej', 'more'],
        ['NAJBLI\u017bSZY POWR\u00d3T', 'NEXT RETURN'],
        ['Propozycje budzik\u00f3w', 'Alarm suggestions'],
        ['Dopuszczalny post\u00f3j [min]', 'Allowed idle time [min]'],
        ['post\u00f3j do', 'idle up to'],
        ['POST\u00d3J', 'IDLE'],
        ['WYSY\u0141KI', 'SENDS'],
        ['GODZ.', 'TIME'],
        ['ZA', 'IN'],
        ['poz.', 'lv.'],
        ['brak zapisanych wys\u0142ek', 'no saved sends'],
        ['brak zapisanych wysy\u0142ek', 'no saved sends'],
        ['Jeden wiersz to jedna propozycja budzika, \u017ceby wys\u0142a\u0107 jak najwi\u0119cej\n          przy jak najkr\u00f3tszym postoju.', 'One row is one alarm suggestion \u2014 to send as much as possible with the shortest idle time.'],
        ['Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne', 'Overview \u2192 Troops \u2192 Own'],
        ['Krok 1 \u2014 Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne', 'Step 1 \u2014 Overview \u2192 Troops \u2192 Own'],
        ['Otw\u00f3rz widok \u201eW\u0142asne\u201d \u2014 \u201eW wiosce\u201d wlicza wsparcie.', 'Open the \u201cOwn\u201d view \u2014 \u201cIn village\u201d includes support.'],
        ['nie znaleziono wierszy wojska w\u0142asnego', 'no own-troop rows found'],
        ['wojsko w\u0142asne', 'own troops'],
        ['Krok 1 \u2014 Przegl\u0105d \u2192 Wojska', 'Step 1 \u2014 Overview \u2192 Troops'],
        ['Krok 2 \u2014 Plac \u2192 Zbieractwo masowe', 'Step 2 \u2014 Rally point \u2192 Mass scavenging'],
        ['Przegl\u0105d \u2192 Wojska', 'Overview \u2192 Troops'],
        ['Plac \u2192 Zbieractwo masowe', 'Rally point \u2192 Mass scavenging'],
        ['jeste\u015b tu', 'you are here'],
        ['przejd\u017a', 'go'],
        ['wiosek z wojskiem', 'villages with troops'],
        ['ze stanem poziom\u00f3w', 'with level status'],
        ['WOLNE', 'FREE'],
        ['ZBIERA', 'BUSY'],
        ['NIEDOST.', 'LOCKED'],
        ['NIEROZPOZN.', 'UNKNOWN'],
        ['Jednostki i rezerwa', 'Units and reserve'],
        ['Rezerwa w wiosce', 'Reserve in village'],
        ['Ustawienia grup', 'Group settings'],
        ['Min. wiosek w grupie', 'Min. villages per group'],
        ['Maks. grup', 'Max. groups'],
        ['Pomijaj poziom 1, gdy szed\u0142by poni\u017cej [minut] \u2014 0 wy\u0142\u0105cza t\u0119 opcj\u0119', 'Skip level 1 when it would run under [minutes] \u2014 0 disables this'],
        ['Wioski poza planem', 'Villages outside the plan'],
        ['Wykluczone wioski', 'Excluded villages'],
        ['wykluczone przez Ciebie', 'excluded by you'],
        ['wykluczone', 'excluded'],
        ['wykluczona', 'excluded'],
        ['Szukaj (nazwa lub wsp\u00f3\u0142rz\u0119dne)', 'Search (name or coordinates)'],
        ['Zaznaczona = nie wysy\u0142a. Plan przelicza si\u0119 od razu.', 'Ticked = does not send. The plan recalculates immediately.'],
        ['Brak wiosek \u2014 najpierw Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne albo ekran masowego.', 'No villages yet \u2014 first Overview \u2192 Troops \u2192 Own or the mass screen.'],
        ['Diagnostyka masowa', 'Mass diagnostics'],
        ['Diagnostyka \u017ar\u00f3de\u0142', 'Source diagnostics'],
        ['Pula grupy', 'Group pool'],
        ['GR', 'GR'],
        ['WIOSEK', 'VILL.'],
        ['BEZCZYNNE', 'IDLE'],
        ['POZIOMY', 'LEVELS'],
        ['POW\u00d3D', 'REASON'],
        ['ILE', 'COUNT'],
        ['JEDN.', 'UNIT'],
        ['WSP\u00d3LNY ZAPAS', 'COMMON STOCK'],
        ['POJEMNO\u015a\u0106', 'CAPACITY'],
        ['OGRANICZA', 'LIMITED BY'],
        ['DOST\u0118PNE', 'AVAILABLE'],
        ['\u0141UP / POJ.', 'LOOT / CAP.'],
        ['wys\u0142ana', 'sent'],
        ['w planie', 'in plan'],
        ['poza planem', 'outside plan'],
        ['wiosek z tego ekranu s\u0105 w planie.', 'villages from this screen are in the plan.'],
        ['wszystkie poziomy zaj\u0119te lub niedost\u0119pne', 'all levels busy or locked'],
        ['brak wojska po odj\u0119ciu rezerwy', 'no troops left after reserve'],
        ['brak danych o wojsku', 'no troop data'],
        ['brak wolnych poziom\u00f3w', 'no free levels'],
        ['gra odm\u00f3wi\u0142a \u2014 nieaktualny stan wojska', 'game refused \u2014 stale troop data'],
        ['wykorzystania', 'utilisation'],
        ['grup', 'groups'],
        ['wiosek', 'villages'],
        ['Grupy policz\u0119 na ekranie', 'I will compute groups on'],
        ['Brak wiosek z wolnym poziomem i dost\u0119pnym wojskiem.', 'No villages with a free level and available troops.'],
        ['Brak wolnych poziom\u00f3w zbieractwa.', 'No free scavenging levels.'],
        ['Teraz kliknij w grze przycisk \u201eWy\u015blij\u201d.', 'Now click the game\u2019s \u201cSend\u201d button.'],
        ['Formularz jest gotowy \u2014 kliknij w grze przycisk \u201eWy\u015blij\u201d.', 'The form is ready \u2014 click the game\u2019s \u201cSend\u201d button.'],
        ['Teraz przejd\u017a na Plac \u2192 Zbieractwo masowe.', 'Now go to Rally point \u2192 Mass scavenging.'],
        ['pola zablokowanych', 'fields blocked'],
        ['p\u00f3l zablokowanych', 'fields blocked'],
        ['Po odblokowaniu p\u00f3l zaznaczono \u0142\u0105cznie', 'After unlocking, total checked'],
        ['wpisano', 'filled'],
        ['zaznaczono', 'checked'],
        ['poj.', 'cap.'],
        ['Grupa', 'Group'],
        ['poziom', 'level'],
        ['Wsp\u00f3\u0142czynnik czasu', 'Time factor'],
        ['Brak wsp\u00f3\u0142czynnika czasu', 'No time factor'],
        ['\u0179r\u00f3d\u0142o teraz:', 'Current source:'],
        ['Ten \u015bwiat', 'This world'],
        ['domy\u015blny', 'default'],
        ['ustawiony r\u0119cznie', 'set manually'],
        ['df wpisany r\u0119cznie', 'df entered manually'],
        ['Pr\u0119dko\u015b\u0107 odtworzona z df', 'Speed derived from df'],
        ['NIEZNANY \u2014 wpisz pr\u0119dko\u015b\u0107 w ustawieniach', 'UNKNOWN \u2014 enter world speed in settings'],
        ['B\u0142\u0105d widoku', 'View error'],
        ['B\u0142\u0105d podpi\u0119cia kontrolek:', 'Control binding error:'],
        ['Planer dzia\u0142a na ekranie zbieractwa', 'The planner works on the scavenging screen'],
        ['Zaznaczony checkbox potwierdza, \u017ce skrypt b\u0119dzie wysy\u0142a\u0142 dany rodzaj\n          jednostki. Wpisana liczba to rezerwa, kt\u00f3ra ma zosta\u0107 w wiosce.', 'A ticked checkbox confirms the script will send that unit type. The number is the reserve that stays in the village.'],
        [' Pod spodem aktualny stan wojsk w wiosce.', ' Below is the current troop count in the village.'],
        ['Na ka\u017cd\u0105 grup\u0119 przypadaj\u0105 max. cztery wysy\u0142ki. Wi\u0119cej grup to lepszy\n          zbierak, ale wi\u0119cej klikania i cz\u0119stsza wysy\u0142ka... pod rozwag\u0119...', 'Each group means max. four sends. More groups scavenge better, but mean more clicking and more frequent sends... your call...'],
        ['Przy kilku stronach wiosek przejd\u017a po nich \u2014 dane si\u0119 dok\u0142adaj\u0105.', 'With several village pages, visit them all \u2014 the data adds up.'],
        ['Gra odm\u00f3wi\u0142a zaznaczenia \u2014 te wioski maj\u0105 mniej wojska, ni\u017c', 'The game refused \u2014 these villages have fewer troops than'],
        ['skrypt pami\u0119ta (np. wys\u0142a\u0142a\u015b z nich r\u0119cznie). Wypad\u0142y z planu, reszta liczy si\u0119 dalej.', 'the script remembers (e.g. you sent from them manually). They dropped out of the plan; the rest still counts.'],
        ['Gra odm\u00f3wi\u0142a zaznaczenia (czerwony zakaz) \u2014 te wioski maj\u0105 mniej wojska, ni\u017c', 'The game refused (red block sign) \u2014 these villages have fewer troops than'],
        ['skrypt pami\u0119ta (np. wys\u0142a\u0142a\u015b z nich r\u0119cznie). Wypad\u0142y z planu, plan przeliczony.', 'the script remembers (e.g. you sent from them manually). They dropped out of the plan, the plan was recalculated.'],
        ['Gra nie odblokowa\u0142a p\u00f3l wiosek \u2014 kliknij kafelek jeszcze raz.', 'The game did not unlock the village boxes \u2014 click the tile again.'],
        ['wiosek bez wpisanego wojska (czerwony zakaz) pomini\u0119to \u2014 przy nast\u0119pnym przeliczeniu wypadn\u0105 z planu.', 'villages without the entered troops (red block sign) were skipped \u2014 they will drop out at the next recalculation.'],
        ['Za ma\u0142o wojska: ka\u017cdy poziom musi zaj\u0105\u0107 co najmniej 10 miejsc w zagrodzie (np. 10 pik\u00f3w albo 3 LK).', 'Not enough troops: every level needs at least 10 population (e.g. 10 spears or 3 light cavalry).'],
        ['przy tym wojsku poziom zaj\u0105\u0142by mniej ni\u017c 10 miejsc w zagrodzie, a takiego sk\u0142adu gra nie wy\u015ble.', 'with these troops the level would use less than 10 population, and the game will not send such a squad.'],
        ['Pomini\u0119to poz.', 'Skipped lvl'],
        ['za ma\u0142o wojska (min. 10 miejsc w zagrodzie na poziom)', 'not enough troops (min. 10 population per level)'],
        ['Pe\u0142ne dane odzyskasz wchodz\u0105c w', 'You can restore full data by visiting'],
        ['Uwaga: to nie jest nast\u0119pny krok w kolejce', 'Note: this is not the next step in the queue'],
        ['powinna by\u0107 grupa', 'it should be group'],
        ['Sk\u0142ady licz\u0105 si\u0119 ze wsp\u00f3lnej puli, wi\u0119c klikanie poza kolejno\u015bci\u0105 mo\u017ce zostawi\u0107 wojsko w domu.', 'Squads are calculated from a common pool, so clicking out of order may leave troops at home.'],
        ['Sk\u0142ad wyszed\u0142 pusty. W tej grupie jest wioska, kt\u00f3ra ma', 'The squad came out empty. This group has a village with'],
        ['sztuk ka\u017cdego u\u017cywanego typu po odj\u0119ciu rezerwy', 'units of every used type after the reserve'],
        ['Spr\u00f3buj zmniejszy\u0107 rezerw\u0119, ustawi\u0107', 'Try lowering the reserve, setting'],
        ['min. wiosek w grupie', 'min. villages per group'],
        ['na 1 albo wy\u0142\u0105czy\u0107 typy jednostek, kt\u00f3rych te wioski nie maj\u0105.', 'to 1 or turning off unit types these villages do not have.'],
        ['Brak wiosek z wolnym poziomem', 'No villages with free level'],
        ['w tej grupie.', 'in this group.'],
        ['pr\u0119dko\u015b\u0107 wpisana r\u0119cznie', 'world speed entered manually'],
        ['z gry (sonda strony)', 'from the game (page probe)'],
        ['zmierzony z ekranu gry', 'measured on the game screen'],
        ['zmierzony wcze\u015bniej (zapami\u0119tany)', 'measured earlier (remembered)'],
        ['z konfiguracji gry', 'from the game config'],
        ['z pr\u0119dko\u015bci \u015bwiata', 'from world speed'],
        ['Brak dost\u0119pnego wojska (sprawd\u017a rezerwy).', 'No troops available (check the reserves).'],
        ['jest niewykonalny \u2014 najkr\u00f3tszy bieg na tym \u015bwiecie trwa', 'is not achievable \u2014 the shortest run on this world takes'],
        ['Limit czasu zostawia w wiosce', 'The time limit leaves in the village'],
        ['pojemno\u015bci', 'capacity'],
        ['wojska).', 'of the troops).'],
        ['Nie znam kolejnosci jednostek na tym swiecie.', 'Unit order on this world is unknown.'],
        ['poni\u017cej', 'below'],
        ['Nie da si\u0119 u\u0142o\u017cy\u0107 grupy o wsp\u00f3lnym sk\u0142adzie (spr\u00f3buj min. wiosek = 1).', 'Cannot build a group with a common squad (try min. villages = 1).'],
        ['poza limitem grup \u2014 wy\u015blij pojedynczo', 'over the group limit \u2014 send individually'],
        ['za ma\u0142o wiosek na grup\u0119 \u2014 wy\u015blij pojedynczo', 'too few villages for a group \u2014 send individually'],
        ['Odczytano wojsko z', 'Troops read from'],
        ['kolumn', 'columns'],
        ['Brak wsp\u00f3\u0142czynnika czasu \u2014 nie licz\u0119 planu', 'No time factor \u2014 the plan is not calculated'],
        ['Ta warto\u015b\u0107 decyduje nie tylko o godzinach powrotu, ale te\u017c o tym,', 'This value decides not only the return times, but also'],
        ['<b>ile wojska wpisa\u0107</b> i <b>jak podzieli\u0107 wioski na grupy</b>.', '<b>how many troops to fill in</b> and <b>how to split the villages into groups</b>.'],
        ['Bez niej plan by\u0142by b\u0142\u0119dny, wi\u0119c go nie pokazuj\u0119.', 'Without it the plan would be wrong, so it is not shown.'],
        ['Wsp\u00f3\u0142czynnik czasu nie zosta\u0142 zmierzony \u2014', 'The time factor has not been measured \u2014'],
        ['czasy poni\u017cej mog\u0105 by\u0107 zawy\u017cone. Wejd\u017a raz na', 'the times below may be too long. Visit'],
        ['zbieractwo pojedynczej wioski', 'single-village scavenging'],
        ['WIOSKI', 'VILLAGES'],
        ['wioska', 'village'],
        ['UZUPE\u0141NIJ', 'FILL IN'],
        ['Wszystkie kroki wys\u0142ane', 'All steps sent'],
        ['GOTOWE', 'DONE'],
        ['KROK', 'STEP'],
        ['\u2191 grupy', '\u2191 groups'],
        ['\u2713 WPISANE', '\u2713 FILLED IN'],
        ['kliknij \u201eWy\u015blij\u201d poni\u017cej', 'click \u201cSend\u201d below'],
        ['nie uda\u0142o si\u0119 \u2014 szczeg\u00f3\u0142y w panelu u g\u00f3ry', 'failed \u2014 details in the panel above'],
        ['przelicza plan z wojska, kt\u00f3re zosta\u0142o', 'recalculates the plan from the remaining troops'],
        ['bieg', 'run'],
        ['DO WYSY\u0141KI \u2193', 'GO TO SENDING \u2193'],
    ].sort((a, b) => b[0].length - a[0].length);

    const RE = SLOWNIK.map(par => {
        const wzor = par[0].trim().split(/\s+/)
            .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');

        const L = '[A-Za-z0-9\\u00c0-\\u00d6\\u00d8-\\u00f6\\u00f8-\\u024f]';
        return [new RegExp('(^|(?!' + L + ').)' + wzor + '(?!' + L + ')', 'g'),
                par[1].replace(/\$/g, '$$$$')];
    });
    const tr = html => {
        if (jestPL()) return html;
        let out = html;
        for (let i = 0; i < RE.length; i++) out = out.replace(RE[i][0], '$1' + RE[i][1]);
        return out;
    };

    function ikonaJedn(u) {
        const a = document.querySelector('.unit_link[data-unit="' + u + '"] img, img[src*="unit_' + u + '.png"]');
        const baza = (typeof window.image_base === 'string' && window.image_base) ? window.image_base : '/graphic/';
        const src = a ? a.getAttribute('src') : (baza + 'unit/unit_' + u + '.png');
        return '<img src="' + src + '" alt="' + u + '" title="' + (UNIT_PL[u] || u) + '">';
    }

    function htmlRezerwa(tryb) {
        tryb = tryb === 'mass' ? 'mass' : 'plan';
        const p = pool();
        if (!p.length) return '';
        const kom = p.map(u => {
            const en = wlaczonyZ(tryb, u.name);
            return `<div class="znp-rez ${en ? '' : 'znp-rez-off'}" data-u="${u.name}">
                      <div class="znp-rez-i">${ikonaJedn(u.name)}</div>
                      <input type="checkbox" data-e="${u.name}" data-tryb="${tryb}" ${en ? 'checked' : ''} title="wysy\u0142a\u0107 ten typ">
                      <input type="number" min="0" step="10" value="${rezerwaZ(tryb, u.name)}" data-r="${u.name}" data-tryb="${tryb}">
                      ${tryb === 'mass' ? '' : '<span class="znp-rez-a">' + fmtNum(u.avail) + '</span>'}
                    </div>`;
        }).join('');
        const ile = p.filter(u => rezerwaZ(tryb, u.name) > 0 || !wlaczonyZ(tryb, u.name)).length;
        return fold('rezerwa', 'Jednostki i rezerwa', `<div class="znp-rezwrap">${kom}</div>
`,
          ile ? ile + ' z limitem' : 'wszystkie',
          'Zaznaczony checkbox potwierdza, \u017ce skrypt b\u0119dzie wysy\u0142a\u0142 dany rodzaj jednostki. ' +
          'Wpisana liczba to rezerwa, kt\u00f3ra ma zosta\u0107 w wiosce.' +
          (onScav() ? ' Pod spodem aktualny stan wojsk w wiosce.' : ''));
    }

    function poZmianieRezerwy(tryb) {
        saveCfg();
        if (tryb === 'mass') { if (typeof przeliczPlan === 'function') przeliczPlan(); }
        else if (onScav()) apply(true);
        render();
    }
    function bindRezerwa() {
        (root || document).querySelectorAll('#znp .znp-rez input[data-r]').forEach(i =>
            i.addEventListener('change', e => {
                const t = e.target.dataset.tryb === 'mass' ? 'mass' : 'plan';
                (t === 'mass' ? cfg.massReserve : cfg.reserve)[e.target.dataset.r] = parseInt(e.target.value, 10) || 0;
                poZmianieRezerwy(t);
            }));
        (root || document).querySelectorAll('#znp .znp-rez input[data-e]').forEach(c =>
            c.addEventListener('change', e => {
                const t = e.target.dataset.tryb === 'mass' ? 'mass' : 'plan';
                (t === 'mass' ? cfg.massEnabled : cfg.enabled)[e.target.dataset.e] = e.target.checked;
                poZmianieRezerwy(t);
            }));
    }

    function htmlPlanner() {
        if (!DF_OK && !onScav())
            return `<div class="znp-sec"><h4>Brak wsp\u00f3\u0142czynnika czasu</h4>
              <div class="znp-err">Nie mog\u0119 policzy\u0107 podzia\u0142u \u2014 ta warto\u015b\u0107 decyduje o d\u0142ugo\u015bci biegu
              i o tym, ile wojska wpisa\u0107.</div>
              <div style="margin-top:8px"><a class="znp-go" href="${urlScav()}">PRZEJD\u0179 DO ZBIERACTWA WIOSKI</a></div>
              <label style="margin-top:10px">albo wpisz tu pr\u0119dko\u015b\u0107 \u015bwiata i gotowe</label>
              <div class="znp-row2">
                <div><input type="number" id="znp-df-speed" min="0.1" max="10" step="0.05" placeholder="np. 1.25"></div>
                <div><button class="znp-btn" id="znp-df-ok">ZAPISZ</button></div>
              </div>
              <div class="znp-note">Na tamtym ekranie zmierz\u0119 j\u0105 z karty poziomu i zapami\u0119tam.</div></div>`;
        if (!onScav())
            return `<div class="znp-sec"><h4>Planer</h4><div class="znp-note">Planer dzia\u0142a na ekranie zbieractwa
              (Plac \u2192 Zbieractwo). Zak\u0142adka POWROTY dzia\u0142a na ka\u017cdym ekranie gry.</div></div>`;

        if (!plan) plan = buildPlan();
        let h = `<div class="znp-sec"><h4>Tryb podzia\u0142u <em title="${DF_SRC}">df ${DF.toFixed(4)} \u00b7 x${speedFromDF().toFixed(2)}</em></h4>
          <select id="znp-mode">
            <option value="optimum">Optimum (max sur/h)</option>
            <option value="equaltime">R\u00f3wny czas (2:1)</option>
            <option value="equal">R\u00f3wny podzia\u0142 wojska</option>
          </select>
          <div class="znp-row2">
            <div><label>Kolejno\u015b\u0107 wype\u0142niania</label>
              <select id="znp-order">
                <option value="asc">Od najni\u017cszego (1 \u2192 4)</option>
                <option value="desc">Od najwy\u017cszego (4 \u2192 1)</option>
              </select></div>
            <div><label>${etykietaLimitu(cfg.maxClock, limitPlaner())}</label>
              <input type="text" id="znp-max" placeholder="1:30 \u00b7 @7:30"></div>
          </div>
          <div class="znp-chk"><input type="checkbox" id="znp-auto"> Auto-przej\u015bcie po klikni\u0119ciu Start</div>
          <div class="znp-row2" style="margin-top:6px">
            <div><label>Pomijaj poz. 1 poni\u017cej (pik\u00f3w)</label>
              <input type="number" id="znp-below" min="0" step="10"></div>
            <div style="display:flex;align-items:flex-end;padding-bottom:6px">
              <div class="znp-chk" style="margin:0"><input type="checkbox" id="znp-skip1"> Zawsze pomijaj poz. 1</div>
            </div>
          </div>
        </div>`;

        if (plan.error) {
            h += htmlRezerwa('plan');
        h += `<div class="znp-sec"><h4>Plan</h4><div class="znp-err">${plan.error}</div></div>`;
        } else {
            h += htmlRezerwa('plan');
        h += `<div class="znp-sec"><h4>Plan <em>${fmtNum(plan.rate)} sur/h \u00b7 ${fmtNum(plan.rate * 24)} /dob\u0119</em></h4>
              <table><tr><th>POZ</th><th>WOJSKO</th><th>CZAS</th><th>SUR/H</th></tr>`;
            plan.steps.forEach((s, i) => {
                const tr = Object.keys(s.alloc).map(n => s.alloc[n] + '\u00d7' + (UNIT_PL[n] || n)).join(' ') || '\u2014';
                h += `<tr class="${i === plan.pointer ? 'znp-cur' : ''}"><td>${s.level + 1}</td>
                      <td class="znp-l">${tr}</td><td>${fmtDur(s.time)}</td><td>${fmtNum(s.rate)}</td></tr>`;
            });
            h += `</table>`;
            (plan.warn || []).forEach(w => { h += `<div class="znp-warn">${w}</div>`; });
            h += `</div>`;

            const c = compare();
            if (c) {
                h += `<div class="znp-sec"><h4>Por\u00f3wnanie tryb\u00f3w</h4>
                  <table><tr><th>TRYB</th><th>SUR/H</th><th>/DOB\u0118</th></tr>`;
                [['optimum', 'Optimum'], ['equaltime', 'R\u00f3wny czas 2:1'], ['equal', 'R\u00f3wny podzia\u0142']].forEach(([k, l]) => {
                    h += `<tr class="${k === cfg.mode ? 'znp-cur' : ''}"><td class="znp-l">${l}</td>
                          <td>${fmtNum(c[k])}</td><td>${fmtNum(c[k] * 24)}</td></tr>`;
                });
                h += `</table></div>`;
            }
        }
        h += `<button class="znp-btn" id="znp-run">PRZELICZ I WYPE\u0141NIJ</button>`;
        return h;
    }

    function bindPlanner() {
        const m = document.getElementById('znp-mode'); if (!m) return;
        m.value = cfg.mode;
        document.getElementById('znp-order').value = cfg.order;
        document.getElementById('znp-max').value = cfg.maxClock ? '@' + cfg.maxClock : (cfg.maxMinutes > 0 ? fmtHM(cfg.maxMinutes) : '');
        document.getElementById('znp-auto').checked = !!cfg.autoAdvance;
        document.getElementById('znp-below').value = cfg.skipL1Below;
        document.getElementById('znp-skip1').checked = !!cfg.skipLevel1;

        const rerun = () => { apply(true); render(); };
        document.getElementById('znp-mode').addEventListener('change', e => { cfg.mode = e.target.value; saveCfg(); rerun(); });
        document.getElementById('znp-order').addEventListener('change', e => { cfg.order = e.target.value; saveCfg(); rerun(); });
        document.getElementById('znp-auto').addEventListener('change', e => { cfg.autoAdvance = e.target.checked; saveCfg(); });
        document.getElementById('znp-below').addEventListener('change', e => {
            cfg.skipL1Below = parseInt(e.target.value, 10) || 0; saveCfg(); rerun();
        });
        document.getElementById('znp-skip1').addEventListener('change', e => {
            cfg.skipLevel1 = e.target.checked; saveCfg(); rerun();
        });
        const mx = document.getElementById('znp-max');
        const commit = () => {
            const z = parseZegar(mx.value);
            cfg.maxClock = z; cfg.maxMinutes = z ? 0 : parseHM(mx.value);
            saveCfg(); rerun();
        };
        mx.addEventListener('change', commit);
        mx.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); commit(); } });
        document.getElementById('znp-run').addEventListener('click', rerun);
    }

    function htmlReturns() {
        if (!DF_OK)
            var ostrzez = `<div class="znp-warn">Wsp\u00f3\u0142czynnik czasu nie zosta\u0142 zmierzony \u2014
              czasy poni\u017cej mog\u0105 by\u0107 zawy\u017cone. Wejd\u017a raz na
              <a class="znp-go" href="${urlScav()}">zbieractwo pojedynczej wioski</a>.</div>`;
        const store = loadReturns(), now = Date.now(), rows = [];
        for (const vid in store) {
            const v = store[vid];
            for (const lv in v.levels) rows.push({ vid, name: v.name, coord: v.coord, lv: +lv, ts: v.levels[lv] });
        }
        rows.sort((a, b) => a.ts - b.ts);

        if (!rows.length)
            return `<div class="znp-alarm"><div class="znp-lab">NAJBLI\u017bSZY POWR\u00d3T</div><div class="znp-big">\u2014</div>
              <div class="znp-small">brak zapisanych wysy\u0142ek</div></div>
              <div class="znp-note">Wejd\u017a na ekran zbieractwa w ka\u017cdej wiosce po wys\u0142aniu wojska \u2014 skrypt odczyta
              liczniki z gry i zapami\u0119ta czasy powrotu. Godziny w czasie lokalnym przegl\u0105darki.</div>`;

        const nx = rows[0];
        let h = `<div class="znp-alarm"><div class="znp-lab">NAJBLI\u017bSZY POWR\u00d3T</div>
                   <div class="znp-big">${fmtClock(nx.ts)}</div>
                   <div class="znp-small">${nx.name} (${nx.coord}) \u00b7 poz. ${nx.lv + 1} \u00b7 za ${fmtLeft(nx.ts - now)}</div>
                 </div>`;

        if (typeof ostrzez === 'string') h += ostrzez;
        h += htmlBudziki(rows, now);

        const byV = {};
        rows.forEach(r => { (byV[r.vid] = byV[r.vid] || { name: r.name, coord: r.coord, items: [] }).items.push(r); });

        const kolej = Object.keys(byV).sort((a, b) => byV[a].items[0].ts - byV[b].items[0].ts);

        let wiosHtml = '';
        for (let qi = 0; qi < kolej.length; qi++) {
            const vid = kolej[qi];
            const v = byV[vid];
            v.items.sort((a, b) => a.ts - b.ts);
            wiosHtml += `<table style="margin-bottom:9px">
                    <tr><th colspan="3" style="text-align:left;border-radius:5px 5px 0 0">${v.name} \u00b7 ${v.coord}
                      <span class="znp-pill znp-on" style="float:right">${fmtClock(v.items[0].ts)}</span></th></tr>`;
            v.items.forEach(i => {
                wiosHtml += `<tr><td>poz. ${i.lv + 1}</td><td>${fmtClock(i.ts)}</td><td>za ${fmtLeft(i.ts - now)}</td></tr>`;
            });
            wiosHtml += `</table>`;
        }
        h += fold('powwio', 'Wioski', wiosHtml, kolej.length + ' wiosek',
                  'Najbli\u017cszy powr\u00f3t ka\u017cdej wioski w nag\u0142\u00f3wku jej tabeli.');
        let wszHtml = `<table><tr><th>GODZ.</th><th>WIOSKA</th><th>POZ</th><th>ZA</th></tr>`;
        rows.forEach(r => {
            wszHtml += `<tr><td>${fmtClock(r.ts)}</td><td class="znp-l">${r.coord}</td><td>${r.lv + 1}</td>
                  <td>${fmtLeft(r.ts - now)}</td></tr>`;
        });
        wszHtml += `</table>`;
        h += fold('powwsz', 'Wszystkie powroty', wszHtml, rows.length + ' wysy\u0142ek',
                  'Wpis znika sam po powrocie wojska. Od\u015bwie\u017canie co 30 sekund.');
        h += `<button class="znp-btn znp-alt" id="znp-clr">WYCZY\u015a\u0106 HISTORI\u0118 POWROT\u00d3W</button>`;
        return h;
    }

    function htmlBudziki(rows, now) {
        const lzMin = parseInt(cfg.budzikLuz, 10);
        const luzMin = isFinite(lzMin) && lzMin >= 0 ? lzMin : 15;
        const luz = luzMin * 60000;
        let zostalo = rows.filter(r => r.ts > now).sort((a, b) => a.ts - b.ts);
        if (!zostalo.length) return '';
        const okna = [];
        while (zostalo.length && okna.length < 3) {
            let best = null;
            for (let j = 0; j < zostalo.length; j++) {
                const t = zostalo[j].ts;
                const pk = zostalo.filter(x => x.ts <= t && x.ts >= t - luz);
                if (!best || pk.length > best.pk.length) best = { t: t, pk: pk };
            }
            okna.push(best);
            zostalo = zostalo.filter(x => best.pk.indexOf(x) < 0);
        }
        const wiersze = okna.map((o, k) => {
            const wiosek = {}; o.pk.forEach(x => { wiosek[x.vid] = true; });
            const postoj = Math.round((o.t - o.pk[0].ts) / 60000);
            const st = k === 0 ? ' style="font-weight:700"' : '';
            return `<tr${st}><td><b>${k === 0 ? '\u2605 ' : ''}${fmtClock(o.t)}</b></td><td>${fmtLeft(o.t - now)}</td>
                    <td>${Object.keys(wiosek).length} wiosek</td><td>${o.pk.length} wysy\u0142ek</td>
                    <td>${postoj} min</td></tr>`;
        }).join('');
        return `<div class="znp-sec"><h4>Propozycje budzik\u00f3w <em>post\u00f3j do ${luzMin} min</em></h4>
          <table><tr><th>GODZ.</th><th>ZA</th><th>WIOSKI</th><th>WYSY\u0141KI</th><th>POST\u00d3J</th></tr>${wiersze}</table>
          <label>Dopuszczalny post\u00f3j [min]</label>
          <input type="number" id="znp-luz" min="0" max="120" step="5" value="${luzMin}">
          <div class="znp-note">\u2605 to budzik, kt\u00f3ry przy tym postoju obs\u0142u\u017cy najwi\u0119cej wysy\u0142ek.
          Kolejne wiersze to najlepsze terminy dla pozosta\u0142ych powrot\u00f3w.</div></div>`;
    }

    function bindReturns() {
        const lz = document.getElementById('znp-luz');
        if (lz) lz.addEventListener('change', e => { const v = parseInt(e.target.value, 10); cfg.budzikLuz = isFinite(v) && v >= 0 ? v : 15; saveCfg(); render(); });
        const b = document.getElementById('znp-clr');
        if (b) b.addEventListener('click', () => { saveReturns({}); render(); });
    }

    function fold(id, title, inner, badge, tip) {
        const open = !!cfg.secOpen[id];
        return `<div class="znp-sec znp-fold ${open ? 'znp-open' : ''}" data-sec="${id}"${tip ? ' title="' + tip.replace(/"/g, '') + '"' : ''}>
                  <h4><span>${title} <span class="znp-arrow">&#9656;</span></span>
                      ${tip ? '<em class="znp-tip">' + tip + '</em>' : ''}
                      <em>${badge || ''}</em></h4>
                  <div class="znp-secbody">${inner}</div>
                </div>`;
    }

    function htmlSettings() {
        let h = '';

        h += fold('swiat', 'Ten \u015bwiat', `<table>
            <tr><td class="znp-l">Wsp\u00f3\u0142czynnik czasu (df)</td><td>${DF.toFixed(5)}</td></tr>
            <tr><td class="znp-l">Pr\u0119dko\u015b\u0107 odtworzona z df</td><td>x${speedFromDF().toFixed(3)}</td></tr>
            <tr><td class="znp-l">Najkr\u00f3tszy mo\u017cliwy bieg</td><td>${fmtHM(minMinutes())}</td></tr>
          </table>
          <label>Pr\u0119dko\u015b\u0107 \u015bwiata r\u0119cznie (0 = wykryj sam)</label>
          <input type="number" id="znp-speed" min="0" step="0.05" value="${cfg.speedOverride || 0}">
          <label>Albo wprost df (0 = wykryj sam)</label>
          <input type="number" id="znp-df" min="0" step="0.0001" value="${cfg.dfOverride || 0}">`,
          'x' + speedFromDF().toFixed(2));

        h += fold('diag', 'Diagnostyka \u017ar\u00f3de\u0142', `<table>
            <tr><td class="znp-l">sonda: pr\u0119dko\u015b\u0107</td><td>${PROBE.speed !== undefined && PROBE.speed !== null ? PROBE.speed : 'brak'}</td></tr>
            <tr><td class="znp-l">sonda: df</td><td>${PROBE.df !== undefined && PROBE.df !== null ? PROBE.df : 'brak'}</td></tr>
            <tr><td class="znp-l">sonda: wioska</td><td>${PROBE.vid || 'brak'}</td></tr>
            <tr><td class="znp-l">pomiar z ekranu</td><td>${(dfFromScreen() || 'brak')}</td></tr>
            <tr><td class="znp-l">game_data.speed</td><td>${worldSpeed() || 'brak'}</td></tr>
            <tr><td class="znp-l">window.game_data</td><td>${(typeof window.game_data !== 'undefined') ? 'widoczne' : 'NIEWIDOCZNE'}</td></tr>
            <tr><td class="znp-l">zdarze\u0144 do p\u00f3l gry</td><td>${EVENTS_SENT}</td></tr>
            <tr><td class="znp-l">po\u0142\u0105cze\u0144 na zewn\u0105trz</td><td>0</td></tr>
          </table>
          <div class="znp-note">Kolejno\u015b\u0107 \u017ar\u00f3de\u0142: warto\u015b\u0107 r\u0119czna, potem pomiar z ekranu gry
          (\u0142up i czas dowolnego poziomu odwr\u00f3cone wzorem), potem konfiguracja gry, na ko\u0144cu
          pr\u0119dko\u015b\u0107^-0,55. Pomiar z ekranu jest najpewniejszy, bo nie zale\u017cy od nazw p\u00f3l w game_data.</div>`,
          DF_SRC);

        h += `<button class="znp-btn znp-alt" id="znp-reset">RESET USTAWIE\u0143</button>`;
        return h;
    }
    function bindSettings() {
        const spi = document.getElementById('znp-speed');
        if (spi) spi.addEventListener('change', e => {
            cfg.speedOverride = parseFloat(e.target.value) || 0; saveCfg(); detectDF(); apply(true); render();
        });
        const dfi = document.getElementById('znp-df');
        if (dfi) dfi.addEventListener('change', e => {
            cfg.dfOverride = parseFloat(e.target.value) || 0; saveCfg(); detectDF(); apply(true); render();
        });
        const r = document.getElementById('znp-reset');
        if (r) r.addEventListener('click', () => {
            localStorage.removeItem(CFG_KEY); cfg = loadCfg();
            if (root) { root.remove(); root = null; }
            buildUI(); apply(true);
        });
    }

    function hookStart() {
        document.addEventListener('click', e => {
            if (!aktywna()) return;
            const b = e.target.closest ? e.target.closest('.free_send_button') : null;
            if (!b) return;
            const card = b.closest('.scavenge-option');
            const idx = card ? options().indexOf(card) : -1;
            markSent(idx >= 0 ? levelOf(idx) : -1);

            [300, 900, 1800].forEach(ms => setTimeout(() => {
                syncReturns(); if (cfg.autoAdvance) advance(); else render();
            }, ms));
        }, true);
    }

    function adresZbieractwa() {
        try {
            if (window.TribalWars && window.TribalWars.buildURL)
                return window.TribalWars.buildURL('GET', 'place', { mode: 'scavenge' });
        } catch (e) {}
        try {
            if (window.game_data && window.game_data.link_base_pure)
                return window.game_data.link_base_pure + 'place&mode=scavenge';
        } catch (e) {}
        return '/game.php?screen=place&mode=scavenge';
    }

    function komunikat(pl, en) {
        try { if (window.UI && window.UI.InfoMessage) window.UI.InfoMessage(jestPL() ? pl : en); } catch (e) {}
    }
    function komunikatMasowy() {
        if (cfg.tab !== 'masowe') return;
        if (onUnits()) {
            const typ = (location.href.match(/[?&]type=([a-z_]+)/) || [])[1] || '';
            if (typ !== 'own_home' && typ !== 'complete')
                komunikat('Ten widok wlicza wsparcie \u2014 przejd\u017a na Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne (odno\u015bnik w panelu).',
                          'This view includes support \u2014 go to Overview \u2192 Troops \u2192 Own (link in the panel).');
            else komunikat('Wojsko odczytane \u2014 teraz Plac \u2192 Zbieractwo masowe (odno\u015bnik w panelu).',
                           'Troops read \u2014 now Rally point \u2192 Mass scavenging (link in the panel).');
            return;
        }
        const store = loadMass();
        const ts = Object.keys(store).map(k => store[k]).filter(v => v && v.src === 'own').map(v => v.unitsTs || 0);
        const ost = ts.length ? Math.max.apply(null, ts) : 0;
        if (onMass()) {
            if (!ost) komunikat('Brak danych o wojsku \u2014 najpierw Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne (odno\u015bnik w panelu).',
                                'No troop data \u2014 first Overview \u2192 Troops \u2192 Own (link in the panel).');
            else komunikat('Wojsko odczytane ' + fmtLeft(Date.now() - ost) + ' temu. \u015awie\u017ce dane: Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne (odno\u015bnik w panelu).',
                           'Troops read ' + fmtLeft(Date.now() - ost) + ' ago. Fresh data: Overview \u2192 Troops \u2192 Own (link in the panel).');
            return;
        }
        komunikat('Zbieractwo masowe: 1) Przegl\u0105d \u2192 Wojska \u2192 W\u0142asne, 2) Plac \u2192 Zbieractwo masowe \u2014 odno\u015bniki w panelu.',
                  'Mass scavenging: 1) Overview \u2192 Troops \u2192 Own, 2) Rally point \u2192 Mass scavenging \u2014 links in the panel.');
    }

    function przeniesJesliTrzeba() {
        if (onScav() || onMass() || onUnits()) return false;
        if (cfg.tab && cfg.tab !== 'planer') return false;
        const cel = adresZbieractwa();
        komunikat('Skrypt dzia\u0142a na ekranie zbieractwa \u2014 przenosz\u0119.',
                  'The script works on the scavenging screen \u2014 redirecting.');
        try { location.href = cel; } catch (e) { setTimeout(() => { location.href = cel; }, 200); }
        return true;
    }

    function init() {
        if (przeniesJesliTrzeba()) return;

        const tabEkranu = onScav() ? 'planer' : (onMass() || onUnits()) ? 'masowe' : '';
        if (tabEkranu && cfg.tab !== tabEkranu) { cfg.tab = tabEkranu; saveCfg(); }
        try { powrotyZeZrodla(); } catch (e) {}
        komunikatMasowy();
        detectDF();
        buildUI();
        hookStart();
        hookMassSend();
        czekajNaTabele();
        syncReturns();
        if (onScav()) {
            if (!options().length) { setTimeout(init, 800); return; }
            apply(true);

            [900, 3000].forEach(ms => setTimeout(() => {
                if (DF_SRC === 'zmierzony z ekranu gry' || DF_SRC === 'ustawiony r\u0119cznie') return;
                const b = DF; detectDF();
                if (Math.abs(DF - b) > 1e-4) { apply(true); render(); }
            }, ms));
            render();
        }
        setInterval(() => { syncReturns(); if (cfg.open && cfg.tab === 'powroty') render(); }, 30000);
    }

    try { init(); } catch (e) {
        const msg = 'Zbieractwo na pe\u0142nej: ' + String(e && e.message) + ' @ ' +
                    String(e && e.stack || '').split('\n').slice(1, 2).join('').trim();
        try { if (window.UI && window.UI.ErrorMessage) window.UI.ErrorMessage(msg, 15000); } catch (e2) {}
        try {
            const box = document.createElement('div');
            box.style.cssText = 'background:#fff3e0;border:2px solid #c0392b;padding:8px;margin:6px;font:12px monospace;color:#600';
            box.textContent = msg + ' | ' + location.href.replace(/^https?:\/\/[^/]+/, '') + ' | ' + navigator.userAgent;
            const k = document.querySelector('#mobileContent, #content_value, .maincell') || document.body;
            k.insertBefore(box, k.firstChild);
        } catch (e3) {}
    }
})();
