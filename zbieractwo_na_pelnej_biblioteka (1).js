// Disclaimer
// By uploading a user-generated mod for use with Tribal Wars, the creator grants InnoGames a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, reproduce, distribute, publicly display, modify, and create derivative works of the mod. This license permits InnoGames to incorporate the mod into any aspect of the game and its related services, including promotional and commercial endeavors, without any requirement for compensation or attribution to the uploader. The uploader represents and warrants that they have the legal right to grant this license and that the mod does not infringe upon any third-party rights. German law applies.
//
// author: Desunia
// version: 1
// Zbieractwo na pelnej / Full Scavenging
// Jezyk: polski na swiatach .plemiona.pl i przy locale pl_*, angielski gdzie indziej.
// Language: Polish on .plemiona.pl worlds and pl_* locales, English everywhere else.
// Skrypt nie wykonuje zadnych polaczen na zewnatrz - wszystko zostaje w pamieci lokalnej przegladarki.
// The script makes no outside connections - everything stays in the browser's local storage.

// ==UserScript==
// @name         Zbieractwo na pelnej
// @namespace    https://plemiona.pl/
// @version      1
// @description  Planer zbieractwa: liczy podzial wojska wzorem gry, wypelnia formularz i pilnuje czasow powrotu ze wszystkich wiosek. Start klika gracz.
// @author       Desunia
// @match        https://*.plemiona.pl/game.php*
// @match        https://*.tribalwars.net/game.php*
// @match        https://*.tribalwars.works/game.php*
// @match        https://*.tribalwars.us/game.php*
// @match        https://*.tribalwars.com.br/game.php*
// @match        https://*.tribalwars.com.pt/game.php*
// @match        https://*.tribalwars.nl/game.php*
// @match        https://*.tribalwars.se/game.php*
// @match        https://*.tribalwars.asia/game.php*
// @match        https://*.die-staemme.de/game.php*
// @match        https://*.divokekmeny.cz/game.php*
// @match        https://*.divoke-kmene.sk/game.php*
// @match        https://*.guerretribale.fr/game.php*
// @match        https://*.guerrastribale.it/game.php*
// @match        https://*.fyletikesmaxes.gr/game.php*
// @match        https://*.klanhaboru.hu/game.php*
// @match        https://*.triburile.ro/game.php*
// @match        https://*.vojnaplemen.si/game.php*
// @match        https://*.tribalwars.works/*
// @include      /^https?:\/\/[a-z0-9-]+\.(tribalwars|plemiona|die-staemme)\.[a-z.]+\/game\.php/
// @icon         data:image/png;base64,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
// @grant        none
// @noframes
// @run-at       document-idle
// ==/UserScript==

/*
 *  CO ROBI        : liczy podzial, wpisuje jednostki w formularz, zapamietuje czasy powrotu, mass zbierak
 *  CZEGO NIE ROBI : nie klika wyslij, nie wysyla zadan do serwera
 *
 *  MATEMATYKA (stale z klienta gry, wspolczynnik potwierdzony na pl230):
 *    lup   L = pojemnosc * LF,  LF = [0.10, 0.25, 0.50, 0.75]
 *    czas  t = (K * L^0.9 + 1800) * df,  K = 100^0.45,  df = predkosc^-0.55
 *    Najkrotszy mozliwy bieg to 1800 * df (przy L -> 0).
 */

(function () {
    'use strict';
    if (window.top !== window.self) return;

    /* ================================================================= STALE */

    const LF  = [0.10, 0.25, 0.50, 0.75];
    const DIS = 1800;
    const K   = Math.pow(100, 0.45);
    const EXP = 0.9;

    const LOGO_BIG = 'data:image/png;base64,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';
    const LOGO = 'data:image/png;base64,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';

    const CARRY_FALLBACK = {
        spear: 25, sword: 15, axe: 10, archer: 10,
        light: 80, marcher: 50, heavy: 50, knight: 100,
        spy: 0, ram: 0, catapult: 0, snob: 0
    };
    // skroty uzywane na polskich serwerach
    const UNIT_PL = {
        spear: 'pik', sword: 'miecz', axe: 'top', archer: '\u0142uk',
        light: 'LK', marcher: '\u0141K', heavy: 'CK', knight: 'rycerz', spy: 'zwiad'
    };

    const CFG_KEY = 'desunia_zbieractwo_cfg_v3';
    const RET_KEY = 'desunia_zbieractwo_powroty_v3';

    const DEFAULTS = {
        mode: 'optimum', order: 'asc', skipLevel1: false, skipL1Below: 350, skipL1Min: 0,
        maxMinutes: 0, reserve: {}, enabled: {}, autoAdvance: true, miniPos: null, dfOverride: 0, speedOverride: 0, secOpen: {}, webFonts: false, budzikLuz: 15, massMinGroup: 1, massProg: 3, massCarry: 1, massMaxGroups: 3, massSkipL1Min: 0,
        open: true, tab: 'planer', pos: null
    };

    let cfg = loadCfg();
    function loadCfg() {
        let s = {};
        try { s = JSON.parse(localStorage.getItem(CFG_KEY) || '{}'); } catch (e) {}
        const c = Object.assign({}, DEFAULTS, s);
        c.reserve = Object.assign({}, s.reserve || {});
        c.enabled = Object.assign({}, s.enabled || {});
        c.secOpen = Object.assign({}, s.secOpen || {});
        return c;
    }
    function saveCfg() { try { localStorage.setItem(CFG_KEY, JSON.stringify(cfg)); } catch (e) {} }

    /* ======================================================== ODCZYT Z GRY */

    const onScav = () => /screen=place/.test(location.href) && /mode=scavenge(?!_mass)/.test(location.href);
    const scr = () => document.querySelector('#scavenge_screen') || document.body;

    /*  SONDA STRONY - v3.3
     *  game_data i ScavengeScreen to zmienne strony. Jezeli menedzer skryptow
     *  trzyma nas w piaskownicy, sa niewidoczne i wszystkie odczyty zwracaja
     *  wartosci domyslne (stad uparte df 1.0000 i x1.00). Wstrzykniety <script>
     *  wykonuje sie w kontekscie strony i przekazuje dane atrybutem na <html>.  */
    let PROBE = {};
    function readPage() {
        try {
            const code =
                '(function(){var o={};try{' +
                'if(window.game_data){o.speed=parseFloat(game_data.speed);o.units=game_data.units;' +
                'if(game_data.village){o.vid=String(game_data.village.id);o.vname=game_data.village.name;' +
                'o.vx=game_data.village.x;o.vy=game_data.village.y;}}' +
                'if(window.ScavengeScreen){var v=ScavengeScreen.village||{};' +
                'o.df=parseFloat(v.duration_factor||ScavengeScreen.duration_factor);' +
                'if(!(o.df>0)&&v.options){for(var k in v.options){var d=parseFloat(v.options[k].duration_factor);' +
                'if(d>0){o.df=d;break;}}}' +
                'o.carry=v.unit_carry_capacities||ScavengeScreen.unit_carry_capacities||null;}' +
                '}catch(e){o.err=String(e);}' +
                'document.documentElement.setAttribute("data-znp",JSON.stringify(o));})();';
            const sc = document.createElement('script');
            sc.textContent = code;
            (document.head || document.documentElement).appendChild(sc);
            sc.remove();
            const raw = document.documentElement.getAttribute('data-znp');
            document.documentElement.removeAttribute('data-znp');
            PROBE = raw ? JSON.parse(raw) : {};
        } catch (e) { PROBE = { err: String(e) }; }
        return PROBE;
    }

    function worldSpeed() {
        const man = parseFloat(cfg.speedOverride);
        if (man > 0 && isFinite(man)) return man;
        if (PROBE.speed > 0 && isFinite(PROBE.speed)) return PROBE.speed;
        try { if (window.game_data && window.game_data.speed) return parseFloat(window.game_data.speed); } catch (e) {}
        return 0;
    }
    /*  WSPOLCZYNNIK CZASU - v3.2
     *  v3.1 opieral sie na game_data.speed i przy pl230 wychodzilo 1.0 zamiast 1.6,
     *  wiec wszystkie czasy i sur/h byly policzone dla zlego swiata. Teraz
     *  najpewniejszym zrodlem jest sama gra: bierzemy z ekranu wyswietlony lup
     *  i wyswietlony czas dowolnego poziomu i odwracamy wzor. To dziala niezaleznie
     *  od tego, czy game_data jest dostepne i czy nazwy pol sie nie zmienily.     */
    /*  POPRAWKA v4.0 - pomiar TYLKO z kart wolnych.
     *  Karta, na ktorej trwa misja, pokazuje licznik czasu POZOSTALEGO, a nie
     *  pelnego czasu biegu, oraz lup juz wyslanego wojska. Wczesniej bralem je
     *  do pomiaru i wychodzily z tego sprzeczne wspolczynniki (0,29 i 0,36 na
     *  tym samym swiecie) oraz absurdalna predkosc x6,52.
     *  Dodatkowo wymagamy, zeby iloraz lupu i wpisanej pojemnosci trafial w jeden
     *  ze wspolczynnikow poziomu - to potwierdza, ze karta pokazuje podglad
     *  dla NASZEGO wojska, a nie dane trwajacej juz misji.                      */
    /*  POMIAR df ? v4.0
     *  Karta, ktora JEST W TRAKCIE misji, pokazuje lup calej wysylki, ale czas
     *  POZOSTALY do powrotu, a nie czas jej trwania. Odwrocenie wzoru na takich
     *  danych daje wynik bez sensu (na pl232 wychodzilo x6,5 zamiast x1,25).
     *  Mierzymy wiec wylacznie z kart WOLNYCH i dodatkowo sprawdzamy, czy lup
     *  odpowiada wpisanej pojemnosci pomnozonej przez wspolczynnik poziomu.    */
    function dfFromScreen() {
        const C = enteredCapacity();
        if (!(C > 0)) return null;
        // na ekranie masowym karty tez podaja lup i czas - korzystamy z nich
        const vals = [];
        options().forEach(el => {
            if (optionState(el) !== 'free') return;      // tylko karty wolne
            const inf = optionInfo(el);
            if (!inf.loot || !inf.sec) return;
            const r = inf.loot / C;
            const ok = LF.some(f => Math.abs(r - f) <= 0.02);
            if (!ok) return;                             // lup nie pasuje do wpisanego wojska
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

    /*  Wspolczynnik czasu da sie zmierzyc tylko na ekranie POJEDYNCZEJ wioski -
     *  na masowym karty poziomow pokazuja zera. Dlatego raz zmierzona wartosc
     *  jest zapamietywana; bez tego skrypt spadal na 1,0 i czasy powrotow
     *  wychodzily o ok. 30% za dlugie (09:45 zamiast 09:26).                  */
    /*  Wspolczynnik czasu jest w ZRODLE strony zbieractwa masowego - gra
     *  wstawia tam blok konfiguracyjny ScavengeMassScreen z polami
     *  duration_factor / duration_exponent / duration_initial_seconds.
     *  Odczyt jest darmowy (zadnego zapytania) i dziala od razu, bez proszenia
     *  gracza o cokolwiek. To ten odczyt wypadl przy przebudowie na DOM.      */
    function dfZeZrodla() {
        const sc = document.querySelectorAll('script');
        for (let i = 0; i < sc.length; i++) {
            const txt = sc[i].textContent || '';
            if (txt.indexOf('duration_factor') < 0) continue;
            const m = txt.match(/"duration_factor"\s*:\s*"?([\d.]+)"?/);
            if (m) { const v = parseFloat(m[1]); if (v > 0 && isFinite(v)) return v; }
        }
        // zapasowo: pelne obiekty JSON w blokach ScavengeMassScreen / ScavengeScreen
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
    // predkosc odtworzona ze wspolczynnika - do pokazania w interfejsie
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

    /*  MAPOWANIE KART NA POZIOMY - v3.5, przyczyna sekwencji 4->2->3->1.
     *  Do tej pory zakladalismy, ze n-ta karta .scavenge-option w DOM to n-ty
     *  poziom zbieractwa. Gdy gra renderuje je w innej kolejnosci (albo selektor
     *  lapie dodatkowy element), cale przyporzadkowanie przesuwa sie o stala
     *  wartosc - stad zawsze ta sama zla sekwencja w kazdej wiosce.
     *  Teraz poziom karty wyliczamy z tego, co gra sama pokazuje: iloraz
     *  wyswietlonego lupu i wpisanej pojemnosci daje wprost wspolczynnik
     *  poziomu (0.10 / 0.25 / 0.50 / 0.75), wiec mapowanie jest niezalezne
     *  od kolejnosci i nazw w DOM.                                            */
    let LVLMAP = null;

    /*  ODCZYT KARTY - v3.6
     *  Poprzednia wersja parsowala textContent calej karty i dzielila po spacjach.
     *  Gdy gra trzyma kazda liczbe w osobnym elemencie bez odstepu, textContent
     *  skleja je w jeden ciag ("181817") i nie da sie ich rozdzielic. Dlatego
     *  chodzimy teraz po wezlach tekstowych - kazda liczba jest wlasnym wezlem.  */
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
        } catch (e) { /* brak TreeWalker - zostaje pusty odczyt */ }
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
            if (optionState(els[i]) !== 'free') continue;   // biegnace i zablokowane pomijamy
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

    /* ============================================================ MATEMATYKA */

    const runTime = L => L <= 0 ? 0 : (K * Math.pow(L, EXP) + DIS) * DF;
    const gPrime  = L => { const p = K * Math.pow(L, EXP); return (0.1 * p + DIS) / Math.pow(p + DIS, 2); };

    /*  ODWROCENIE g'(L) = mu ROZWIAZANE ANALITYCZNIE.
     *  Podstawiajac u = K*L^0.9 warunek g'(L) = mu sprowadza sie do rownania
     *  kwadratowego:  mu*u^2 + (3600mu - 0.1)*u + (3240000mu - 1800) = 0.
     *  v3.1 szukal tego bisekcja (120 iteracji na kazde wywolanie, a wywolan
     *  byly dziesiatki tysiecy na jedno przeliczenie) - stad zamulanie.        */
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

    /*  TRYBY A LIMIT CZASU - wyjasnienie, bo v3.1 mialo to odwrotnie.
     *
     *  OPTIMUM maksymalizuje surowce na godzine przy DWOCH ograniczeniach:
     *  wielkosci armii i maksymalnym czasie biegu. Gdy armia jest duza, a limit
     *  ciasny, rozwiazaniem tego zadania jest wypelnienie KAZDEGO poziomu do
     *  sufitu limitu - czyli dokladnie rowne czasy. Optimum i rowny czas daja
     *  wtedy ten sam wynik i to jest poprawne, a nie zepsute.
     *
     *  v3.1 zamiast tego skalowal cala pule w dol, az najdluzszy bieg zmiescil
     *  sie w limicie. Krotsze biegi konczyly sie dlugo przed sufitem i marnowaly
     *  przydzial - dlatego "optimum" wychodzilo GORSZE od rownego czasu.
     *
     *  Teraz: optimum przycina poziomy do sufitu (rozwiazanie zadania z limitem),
     *  a dwa tryby o narzuconym ksztalcie skaluja pule, bo ich ksztalt jest
     *  z definicji sztywny.                                                     */
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

    /* ====================================================== JEDNOSTKI / PLAN */

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

    /*  POPRAWKA v3 - udzialy liczone wzgledem CALEJ puli, nie wzgledem sumy
     *  przydzielonych pojemnosci. Dzieki temu limit czasu realnie zostawia
     *  nadwyzke wojska w wiosce zamiast rozpychac ja po poziomach.          */
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
        // druga regula, analogicznie do masowego: pomijaj, gdy bieg bylby krotszy niz prog
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
        const levels = freeLevels();
        const warn = [];
        if (!levels.length) return { error: 'Brak wolnych poziom\u00f3w zbieractwa.' };
        if (total <= 0)     return { error: 'Brak dost\u0119pnego wojska (sprawd\u017a rezerwy).' };

        let maxSec = (parseInt(cfg.maxMinutes, 10) || 0) * 60;
        if (capTooLow(maxSec)) {
            warn.push('Limit ' + fmtHM(cfg.maxMinutes) + ' jest niewykonalny \u2014 najkr\u00f3tszy bieg na tym \u015bwiecie trwa ' +
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
        // zaokraglanie do calych jednostek moze minimalnie przekroczyc limit - dociskamy
        for (let g = 0; maxSec > 0 && g < 8; g++) {
            if (!steps.some(s => s.time > maxSec + 1)) break;
            caps = caps.map(c => c * 0.98);
            steps = mk(caps);
        }
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
                   '|' + cfg.maxMinutes + '|' + DF.toFixed(6);
        if (cmpKey === kp && cmpCache) return cmpCache;
        cmpKey = kp; cmpCache = compareCalc();
        return cmpCache;
    }
    function compareCalc() {
        const p = pool();
        const total = p.reduce((s, u) => s + u.usable * u.cap, 0);
        const levels = freeLevels();
        let maxSec = (parseInt(cfg.maxMinutes, 10) || 0) * 60;
        if (capTooLow(maxSec)) maxSec = 0;
        if (!levels.length || total <= 0) return null;
        const o = {};
        ['optimum', 'equaltime', 'equal'].forEach(m => { o[m] = rateOf(computeSplit(m, total, levels, maxSec), levels); });
        return o;
    }

    /* ============================================== WYPELNIANIE FORMULARZA */

    /*  v4.1 - ograniczenie ruchu.
     *  Wczesniej kazde pole bylo nadpisywane i dostawalo trzy zdarzenia (input,
     *  change, keyup), nawet gdy juz mialo wlasciwa wartosc. Przy osmiu polach,
     *  czyszczonych i wypelnianych osobno, dawalo to 48 zdarzen na jedno
     *  wypelnienie planu. Obsluga tych zdarzen po stronie gry moze odpytywac
     *  serwer, wiec teraz dotykamy wylacznie pol, ktore faktycznie sie zmieniaja.  */
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
        // jedno przejscie po polach: wartosc docelowa albo puste, bez podwojnego zapisu
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
        catch (e) { try { el.scrollIntoView(); } catch (e2) { /* brak wsparcia - pomijamy */ } }
    }
    function apply(fresh) {
        if (fresh || !plan || plan.error) plan = buildPlan();
        if (plan.error) return;
        const s = nextStep();
        if (s) fillStep(s); else clearInputs();
    }
    /*  POPRAWKA v3.4 - KRYTYCZNA.
     *  Wczesniej auto-przejscie przesuwalo wskaznik licznikiem (pointer++), bez
     *  sprawdzania, ktory poziom faktycznie zostal wyslany. Klikniecie Start przy
     *  innym poziomie niz podswietlony powodowalo, ze skrypt wpisywal wojsko
     *  przeznaczone dla zupelnie innego poziomu - z paczka liczona na inny czas
     *  biegu. Teraz kolejny krok wybieramy po STANIE POZIOMOW odczytanym z gry,
     *  a wyslane poziomy oznaczamy jawnie.                                      */
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
            if (plan.sent[s.level]) continue;              // juz wyslany w tym cyklu
            if (stateOfLevel(s.level) !== 'free') continue; // zajety albo zablokowany
            plan.pointer = i;
            return s;
        }
        return null;
    }

    function advance() {
        if (!plan || plan.error) { apply(true); render(); return; }
        const s = nextStep();
        if (s) { fillStep(s); render(); return; }
        // wszystkie zaplanowane poziomy wyslane - przeliczamy na tym, co zostalo
        plan = buildPlan();
        const s2 = nextStep();
        if (s2) fillStep(s2); else clearInputs();
        render();
    }

    /* ============================================= MONITOR POWROTOW (WIOSKI) */

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

    /* ================================================================ FORMAT */

    const fmtClock = ts => new Date(ts).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    function fmtLeft(ms) {
        if (ms <= 0) return 'teraz';
        let s = Math.round(ms / 1000), h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60);
        if (m === 60) { h++; m = 0; }                    // bylo "1 h 60 min"
        return h > 0 ? (m ? h + ' h ' + m + ' min' : h + ' h') : m + ' min';
    }
    function fmtDur(sec) {
        sec = Math.round(sec);
        const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
        return (h ? h + ':' : '') + String(m).padStart(h ? 2 : 1, '0') + ':' + String(s).padStart(2, '0');
    }
    const fmtNum = n => Math.round(n).toLocaleString('pl-PL');
    // g:mm  (0 -> "brak")
    function fmtHM(min) {
        min = parseInt(min, 10) || 0;
        if (min <= 0) return 'brak';
        return Math.floor(min / 60) + ':' + String(min % 60).padStart(2, '0');
    }
    // "1:30" -> 90 ;  "45" -> 45 ;  "" -> 0
    function parseHM(txt) {
        if (!txt) return 0;
        const t = String(txt).trim().replace(',', ':').replace('.', ':');
        if (!t || /^(brak|0)$/i.test(t)) return 0;
        const m = t.match(/^(\d+):(\d{1,2})$/);
        if (m) return (+m[1]) * 60 + (+m[2]);
        const n = parseInt(t, 10);
        return isFinite(n) && n > 0 ? n : 0;
    }

    /* ================================================================== STYL */

    function injectCSS() {
        if (document.getElementById('znp-css')) return;
        // kroje z sieci sa opcjonalne i domyslnie wylaczone - zero polaczen na zewnatrz
        if (cfg.webFonts && !document.getElementById('znp-fonts')) {
            const lk = document.createElement('link');
            lk.rel = 'stylesheet'; lk.id = 'znp-fonts';
            lk.href = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800' +
                      '&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap';
            document.head.appendChild(lk);
        }
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
#znp-mini{position:fixed;top:60px;right:12px;z-index:99999;cursor:pointer;
 width:72px;height:72px;padding:0;border-radius:50%;border:none;background:transparent;
 filter:drop-shadow(0 0 10px rgba(255,251,235,.95)) drop-shadow(0 0 22px rgba(255,244,214,.65))
        drop-shadow(0 6px 14px rgba(90,68,32,.45));
 transition:transform .15s ease, filter .15s ease}
#znp-mini:hover{transform:scale(1.06);
 filter:drop-shadow(0 0 14px rgba(255,255,255,1)) drop-shadow(0 0 30px rgba(255,246,220,.9))
        drop-shadow(0 8px 18px rgba(90,68,32,.5))}
#znp-mini img{width:100%;height:100%;display:block;border-radius:50%}
.znp-pulse{animation:znpP 1.05s ease-in-out infinite;outline:2px solid #d9679a!important;outline-offset:1px}
@keyframes znpP{0%{box-shadow:0 0 0 0 rgba(217,103,154,.8)}70%{box-shadow:0 0 0 10px rgba(217,103,154,0)}100%{box-shadow:0 0 0 0 rgba(217,103,154,0)}}
`;
        document.head.appendChild(st);
    }


    /* ==================================================================
     *  ZBIERACTWO MASOWE - v5.0
     *
     *  ZASADA: zero dodatkowych zadan do serwera. Komplet danych (wojsko
     *  w kazdej wiosce, ktore poziomy sa wolne, parametry czasu) jest juz
     *  w zrodle strony zbieractwa masowego. Skrypt tylko je czyta,
     *  wypelnia pola jednostek i zaznacza checkboxy. Przycisk Wyslij
     *  klika gracz - i to gra, nie skrypt, wysyla do wielu wiosek naraz.
     *
     *  GRUPOWANIE: przy rownym czasie kazdy poziom potrzebuje pojemnosci
     *  w stalej proporcji 10 : 4 : 2 : 1,33. Wioska ma wiec swoj naturalny
     *  czas biegu - taki, przy ktorym cala jej pojemnosc idzie w ruch.
     *  Wioski o zblizonym czasie laczymy w grupe; grupa dostaje czas
     *  najslabszej z nich, nadwyzka zostaje w domu. Liczbe grup dobiera
     *  programowanie dynamiczne: dokladamy grupe tak dlugo, jak zysk
     *  przekracza prog, i nigdy nie tworzymy grupy mniejszej niz minimum.
     * ================================================================== */

    /* ==================================================================
     *  ZBIERACTWO MASOWE - v5.1
     *
     *  DWA ZRODLA, ZERO DODATKOWYCH ZADAN:
     *   KROK 1  Przeglad -> Wojska (mode=units, type=there)
     *           Skrypt czyta z tabeli, ile wojska stoi w kazdej wiosce,
     *           i zapamietuje to w przegladarce.
     *   KROK 2  Plac -> Zbieractwo masowe
     *           Skrypt czyta z DOM, ktore poziomy sa wolne w kazdej wiosce
     *           (tr#scavenge_village_<id>, td.option-<n>), laczy to z danymi
     *           z kroku 1, liczy grupy, wypelnia pola i zaznacza checkboxy.
     *
     *  Obie strony otwiera gracz. Skrypt niczego nie pobiera i nie wysyla.
     * ================================================================== */

    const MASS_KEY = 'desunia_zbieractwo_masowe_v1';
    const onMass  = () => /screen=place/.test(location.href) && /mode=scavenge_mass/.test(location.href);
    const onUnits = () => /screen=overview_villages/.test(location.href) && /mode=units/.test(location.href);

    function loadMass() { try { return JSON.parse(localStorage.getItem(MASS_KEY) || '{}'); } catch (e) { return {}; } }
    function saveMass(d) { try { localStorage.setItem(MASS_KEY, JSON.stringify(d)); } catch (e) {} }

    // --- KROK 1: przeglad wojsk --------------------------------------

    /*  Przeglad -> Wojska (type=there).
     *  Kazda wioska to osobny <tbody>, a liczby siedza w <td class="unit-item">,
     *  przy czym jednostki nieobecne na swiecie maja dodatkowo klase "hidden",
     *  ale ZAJMUJA kolumne. Kolejnosc kolumn odpowiada game_data.units, wiec
     *  mapujemy po indeksie. Zapasowo probujemy odczytac ikony z naglowka.    */
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

    function collectUnits() {
        if (!onUnits()) return { ile: 0 };
        const order = unitOrder();
        if (!order.length) return { ile: 0, err: 'Nie znam kolejnosci jednostek na tym swiecie.' };

        /*  POPRAWKA v6.7 - kluczowa.
         *  Kazda wioska ma w przegladzie kilka wierszy: "w wiosce", "poza wioska",
         *  "w drodze", "obrona". Wszystkie maja komorki td.unit-item. Wczesniej
         *  bralem pierwsze 13 komorek z calego <tbody>, wiec trafialem w niewlasciwy
         *  wiersz i liczby wychodzily zawyzone - skrypt wpisywal sklad, ktorego
         *  wioski nie mialy, a gra oznaczala je czerwonym zakazem.
         *  Teraz szukamy wiersza opisanego "w wiosce" i czytamy TYLKO jego.       */
        const wWiosce = tr => {
            const td = tr.children;
            for (let i = 0; i < td.length && i < 4; i++) {
                const t = (td[i].textContent || '').trim().toLowerCase();
                if (t === 'w wiosce' || t === 'in village' || t === 'im dorf') return true;
            }
            return false;
        };

        const store = loadMass();
        const widziane = {};
        let ile = 0, trybWiersza = 0;
        const trs = document.querySelectorAll('tr');
        for (let i = 0; i < trs.length; i++) {
            const tr = trs[i];
            const cells = tr.querySelectorAll('td.unit-item');
            if (!cells.length) continue;
            // wiersz musi byc tym o wojsku stacjonujacym w wiosce
            const pasuje = wWiosce(tr);
            if (!pasuje) continue;
            trybWiersza = 1;
            const box = tr.closest('tbody') || tr;
            const a = box.querySelector('a[href*="village="]') || tr.querySelector('a[href*="village="]');
            if (!a) continue;
            const mm = (a.getAttribute('href') || '').match(/village=(\d+)/);
            if (!mm) continue;
            const id = mm[1];
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
            store[id] = { id: id, name: (a.textContent || '').trim() || ('wioska ' + id),
                          units: units, free: prev.free || [], unitsTs: Date.now(), freeTs: prev.freeTs || 0 };
            ile++;
        }
        saveMass(store);
        return { ile: ile, kolumn: order.length, tryb: trybWiersza ? 'wiersz "w wiosce"' : 'nie znaleziono wiersza "w wiosce"' };
    }

    // --- KROK 2: stan poziomow z ekranu masowego ---------------------

    /*  Komorka poziomu: <td class="option option-N option-inactive" data-id="N">.
     *  Gra nie uzywa tam zwyklego <input type=checkbox> tylko wlasnego widgetu,
     *  wiec stan czytamy z klas, a zaznaczamy klinieciem - dokladnie tak, jak
     *  zrobilby to gracz myszka. Wariant z prawdziwym inputem tez obslugujemy,
     *  gdyby gra go gdzies jednak uzywala.                                    */
    /*  Budowa komorki poziomu (potwierdzona inspektorem):
     *    <td class="option option-N option-inactive" data-id="N">
     *       <input type="checkbox" class="status-inactive">
     *       <img class="status-active" src="report_scavenging.png">
     *       <img class="status-unavailable" src="block_icon.png">
     *       <a  class="status-locked">
     *       <img class="status-unlocking" src="unlock_mini.png">
     *    </td>
     *  KOMPLET tych elementow jest w KAZDEJ komorce - gra pokazuje wlasciwy
     *  przez CSS, sterujac klasa komorki. Dlatego stanu NIE WOLNO zgadywac po
     *  zawartosci (v5.3 szukalo klodki i trafialo zawsze, bo "unlock_mini.png"
     *  zawiera slowo lock). Stan czytamy wylacznie z klasy komorki.           */
    function optState(td) {
        const cl = ' ' + (td.className || '') + ' ';
        const box = td.querySelector('input[type=checkbox]');
        /*  UWAGA: gra trzyma checkboxy WYLACZONE, dopoki w polach jednostek nie ma
         *  wpisanego wojska. Stanu poziomu NIE WOLNO wiec wiazac z atrybutem
         *  disabled - to byl powod, dla ktorego wszystkie 124 komorki wypadaly
         *  jako nierozpoznane. Poziom wolny poznajemy po klasie komorki.        */
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
        if (st.box.disabled) return false;          // gra jeszcze nie odblokowala pola
        if (st.box.checked !== chce) {
            // klikamy w checkbox, zeby uruchomic wlasna obsluge gry
            try { st.box.click(); }
            catch (e) {
                st.box.checked = chce;
                st.box.dispatchEvent(new Event('change', { bubbles: true }));
            }
            if (st.box.checked !== chce) {          // gdyby klik nie zadzialal
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
            /*  Stan poziomu bierzemy WYLACZNIE z gry. W v6.3 dokladalem tu warunek
             *  "nie ma zapisanego przyszlego powrotu" - i stare, blednie zapisane
             *  powroty (nominalny czas grupy zamiast rzeczywistego) maskowaly
             *  poziomy jako zajete na godziny, przez co wioski z pelna armia
             *  wypadaly z planu. Pamiec skryptu nie moze nadpisywac stanu gry.  */
            v.free = [1, 2, 3, 4].filter(l => r.opt[l] && r.opt[l].wolny);
            v.freeTs = Date.now();
            store[r.id] = v;
        });
        saveMass(store);
        return rows.length;
    }

    // --- matematyka ---------------------------------------------------

    const invSum = free => free.reduce((s, i) => s + 1 / LF[i - 1], 0);
    const massTime = L => runTime(L);                       // ten sam wzor co w planerze
    const massLootForTime = T => lootCap(T);

    function massCapacity(v) {
        const carry = parseFloat(cfg.massCarry) || 1;
        const un = (v && v.units) || {};
        let c = 0;
        for (const n in un) {
            const base = CARRY_FALLBACK[n];
            if (!base) continue;
            const en = cfg.enabled[n] !== undefined ? cfg.enabled[n] : true;
            if (!en) continue;
            const res = parseInt(cfg.reserve[n], 10) || 0;
            c += Math.max(0, (un[n] || 0) - res) * base * carry;
        }
        return c;
    }

    // ile jednostek danego typu wioska ma realnie do dyspozycji (po rezerwie)
    function dostepne(v, n) {
        const res = parseInt(cfg.reserve[n], 10) || 0;
        const en = cfg.enabled[n] !== undefined ? cfg.enabled[n] : true;
        if (!en) return 0;
        return Math.max(0, ((v.units || {})[n] || 0) - res);
    }

    /*  GRUPOWANIE PO WSPOLNYM MIANOWNIKU - v7.0
     *
     *  Gra wysyla JEDEN sklad do wszystkich zaznaczonych wiosek, wiec o wartosci
     *  grupy decyduje nie suma jej pojemnosci, tylko to, co maja WSPOLNEGO:
     *    - wektor jednostek: minimum po wioskach dla kazdego typu,
     *    - poziomy: przeciecie wolnych poziomow.
     *  Wczesniej grupy powstawaly wylacznie po pojemnosci, a czesc wspolna byla
     *  dopiero skutkiem ubocznym - stad grupy, w ktorych sklad schodzil do zera.
     *  Teraz koszt kazdego mozliwego podzialu liczony jest wprost z jego czesci
     *  wspolnej, a programowanie dynamiczne wybiera podzial najlepszy.         */

    function massPlan() {
        const store = loadMass();
        const list = [];
        const odpad = { wszystkie: 0, brakPoziomow: 0, brakDanych: 0, brakWojska: 0, wPlanie: 0, szczegoly: [] };

        // stan poziomow czytamy na zywo z ekranu
        const zywe = {};
        if (onMass()) massRows().forEach(r => {
            zywe[r.id] = [1, 2, 3, 4].filter(l => r.opt[l] && r.opt[l].wolny);
        });
        const wolnePoziomy = v => (onMass() && zywe[v.id]) ? zywe[v.id] : (v.free || []);
        const typy = Object.keys(CARRY_FALLBACK).filter(n => CARRY_FALLBACK[n] > 0);
        const carry = parseFloat(cfg.massCarry) || 1;

        for (const id in store) {
            const v = store[id];
            if (onMass() && MASS_SEEN && !MASS_SEEN[id]) continue;
            odpad.wszystkie++;
            if (MASS_BLOK[id]) {
                odpad.brakDanych++;
                odpad.szczegoly.push({ n: v.name, p: 'gra odm\u00f3wi\u0142a \u2014 nieaktualny stan wojska' });
                continue;
            }
            let fr = wolnePoziomy(v);
            /*  Masowe NIE uzywa progu w pikach z planera - tam decyduje czas
             *  grupy (ustawienie "pomijaj poziom 1, gdy szedlby ponizej X min"),
             *  stosowane pozniej, przy wycenie grupy.                          */
            if (fr.indexOf(1) >= 0 && cfg.skipLevel1) fr = fr.filter(l => l !== 1);
            /*  Regula wylacznie dla masowego: jesli wioska jest tak mala, ze przy
             *  wszystkich wolnych poziomach bieg zszedlby ponizej progu czasowego,
             *  poziom 1 tylko rozciaga sklad - lepiej go pominac i dolaczyc wioske
             *  do grupy o dluzszym biegu.                                       */
            const progMin = parseInt(cfg.massSkipL1Min, 10) || 0;
            if (progMin > 0 && fr.indexOf(1) >= 0 && fr.length > 1) {
                let capTmp = 0;
                Object.keys(CARRY_FALLBACK).forEach(n => {
                    if (CARRY_FALLBACK[n] > 0) capTmp += dostepne(v, n) * CARRY_FALLBACK[n] * carry;
                });
                if (capTmp > 0 && runTime(capTmp / invSum(fr)) < progMin * 60) fr = fr.filter(l => l !== 1);
            }
            if (!fr.length) { odpad.brakPoziomow++;
                odpad.szczegoly.push({ n: v.name, p: 'brak wolnych poziom\u00f3w' }); continue; }
            if (!v.unitsTs) { odpad.brakDanych++;
                odpad.szczegoly.push({ n: v.name, p: 'brak danych o wojsku' }); continue; }
            const av = {}; let cap = 0;
            typy.forEach(n => { const d = dostepne(v, n); if (d > 0) { av[n] = d; cap += d * CARRY_FALLBACK[n] * carry; } });
            if (cap <= 0) { odpad.brakWojska++;
                odpad.szczegoly.push({ n: v.name, p: 'brak wojska po odj\u0119ciu rezerwy' }); continue; }
            odpad.wPlanie++;
            list.push({ v: v, cap: cap, free: fr, av: av });
        }
        if (!list.length) return { odpad: odpad, error: 'Brak wiosek z wolnym poziomem i dost\u0119pnym wojskiem.' };

        /*  Kolejnosc ma znaczenie, bo grupy powstaja z SASIADUJACYCH wiosek.
         *  Samo sortowanie po pojemnosci mieszalo wioski offowe z deffowymi -
         *  ich czesc wspolna byla znikoma, wiec offy dostawaly krotkie biegi
         *  zamiast wlasnej grupy. Teraz najpierw grupujemy po dominujacej
         *  jednostce (profilu wioski), a dopiero w jej obrebie po pojemnosci.  */
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
        const lim = (parseInt(cfg.maxMinutes, 10) || 0) * 60;

        // wartosc pojedynczej wioski, gdyby wysylala sama (gorna granica)
        const sam = m => {
            const L0 = m.cap / invSum(m.free);
            let T = runTime(L0);
            if (lim > 0 && T > lim) { T = lim; }
            const L = Math.min(L0, lootCap(T));
            return m.free.length * L / runTime(L) * 3600;
        };
        const ideal = list.reduce((s, m) => s + sam(m), 0);

        /*  Czesc wspolna odcinka [i..j]: wektor min i przeciecie poziomow.     */
        /*  Poziomy grupy to SUMA poziomow wolnych u jej wiosek, nie ich przeciecie.
         *  Wymaganie przeciecia bylo bledne: wystarczylo, ze jedna wioska miala
         *  wolny tylko poziom 1, a inna tylko 2-4, i caly podzial uznawalem za
         *  niemozliwy ("nie da sie ulozyc grupy o wspolnym skladzie").
         *  Wysylka na dany poziom obejmuje po prostu te wioski, ktore go maja.
         *  Pojemnosc dzielimy wedlug sumy poziomow, wiec wioska o najwiekszej
         *  liczbie wolnych poziomow te\u017c sie w niej miesci.                     */
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
            const szt = w.lvls.reduce((a, l) => a + w.ile[l], 0);   // ile wysylek faktycznie obejmie
            const val = szt * L / runTime(L) * 3600;
            return { val: val, w: w, L: L, T: runTime(L) };
        };

        const minG = Math.max(1, parseInt(cfg.massMinGroup, 10) || 3);
        const prog = parseFloat(cfg.massProg) || 3;
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

        /*  Liczbe grup ogranicza gracz, bo to ona przeklada sie wprost na liczbe
         *  klikniec (4 wysylki na grupe). Wewnetrznie i tak nie dokladamy grupy,
         *  ktora poprawia wynik o mniej niz 1% - zeby nie mnozyc klikania
         *  za darmo.                                                          */
        const maxG = Math.max(1, Math.min(8, parseInt(cfg.massMaxGroups, 10) || 3));
        let best = null, bk = 1;
        for (let k = 1; k <= maxG; k++) {
            const r = dp(k);
            if (!r) continue;
            if (best === null) { best = r; bk = k; continue; }
            if ((best.strata - r.strata) / ideal * 100 < 1) break;
            best = r; bk = k;
        }
        if (!best) return { odpad: odpad, error: 'Nie da si\u0119 u\u0142o\u017cy\u0107 grupy o wsp\u00f3lnym sk\u0142adzie (spr\u00f3buj min. wiosek = 1).' };

        /*  ODCHUDZANIE GRUPY.
         *  Podzial na sasiadujace odcinki potrafi wrzucic do jednej grupy wioske
         *  z 5737 toporami i wioske, ktora ma ich 17. Wspolny mianownik spada
         *  wtedy do 17 i cala grupa wysyla sladowe ilosci. Dlatego po podziale
         *  wyrzucamy najslabszego czlonka tak dlugo, jak zysk calej reszty jest
         *  wiekszy niz to, co ta wioska moglaby dac sama.                      */
        const wartoscCzl = cz => {
            const mn = {}; typy.forEach(n => { mn[n] = Infinity; });
            const ile = { 1: 0, 2: 0, 3: 0, 4: 0 };
            cz.forEach(m => {
                typy.forEach(n => { mn[n] = Math.min(mn[n], m.av[n] || 0); });
                m.free.forEach(l => { ile[l]++; });
            });
            let lv = [1, 2, 3, 4].filter(l => ile[l] > 0);
            let cap = 0;
            typy.forEach(n => { if (mn[n] > 0 && isFinite(mn[n])) cap += mn[n] * CARRY_FALLBACK[n] * carry; else mn[n] = 0; });
            if (!lv.length || cap <= 0) return { val: 0, mn: mn, lvls: lv, cap: 0, L: 0, T: 0 };
            const licz = w => {
                let L0 = cap / invSum(w), T0 = runTime(L0);
                if (lim > 0 && T0 > lim) { T0 = lim; L0 = lootCap(T0); }
                return { L: L0, T: runTime(L0) };
            };
            let r0 = licz(lv);
            /*  Prog liczymy na CZASIE GRUPY, nie na wlasnym czasie wioski.
             *  Wioska o naturalnym czasie dwoch godzin trafia do grupy biegnacej
             *  23 minuty, bo wspolny mianownik jest mniejszy - i to czas grupy
             *  decyduje, czy poziom 1 ma sens.                                  */
            const pMin = parseInt(cfg.massSkipL1Min, 10) || 0;
            if (pMin > 0 && lv.length > 1 && lv.indexOf(1) >= 0 && r0.T < pMin * 60) {
                const lv2 = lv.filter(l => l !== 1);
                lv = lv2; r0 = licz(lv);
            }
            const szt = lv.reduce((a, l) => a + ile[l], 0);
            return { val: szt * r0.L / r0.T * 3600, mn: mn, lvls: lv, cap: cap, L: r0.L, T: r0.T };
        };

        const odrzuceni = [];
        const grupyCz = best.gr.map(par => {
            let cz = list.slice(par[0], par[1] + 1);
            /*  Usuwamy tego czlonka, ktorego usuniecie NAJBARDZIEJ podnosi wartosc
             *  grupy - a nie tego o najmniejszej lacznej pojemnosci. Grupe dusi
             *  wioska majaca najmniej KONKRETNEJ jednostki (np. jeden topornik
             *  przy sasiadach z tysiacami), a jej laczna pojemnosc bywa spora.  */
            for (let krok = 0; krok < 12 && cz.length > 1; krok++) {
                const teraz = wartoscCzl(cz).val;
                let naj = -1, najVal = teraz;
                for (let i = 0; i < cz.length; i++) {
                    const bez = cz.slice(0, i).concat(cz.slice(i + 1));
                    const v = wartoscCzl(bez).val;
                    if (v > najVal) { naj = i; najVal = v; }
                }
                /*  Prog wzgledny: usuwamy, gdy jeden czlonek kosztuje grupe ponad
                 *  20% jej potencjalu. Nie odejmujemy jego wlasnego potencjalu,
                 *  bo usunieta wioska nie przepada - trafia do grupy resztek.   */
                if (naj < 0 || najVal < teraz * 1.25) break;
                odrzuceni.push(cz[naj]);
                cz = cz.slice(0, naj).concat(cz.slice(naj + 1));
            }
            return cz;
        }).filter(cz => cz.length);

        /*  WYPYCHANIE MARNOWANYCH.
         *  Odchudzanie wyzej usuwa karla duszacego grupe. Osobny przypadek to
         *  olbrzym, ktoremu grupa nie szkodzi, ale ktory sam dostaje w niej
         *  ulamek tego, co wyslalby solo (wspolny sklad jest mniejszy od jego
         *  wlasnego zapasu). Takie wioski tez wypychamy do puli resztek.       */
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

        // odrzucone wioski probujemy zebrac w osobne grupy, zamiast je traci\u0107
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

        const groups = grupyCz.map((czlon, gi) => {
            const r = wartoscCzl(czlon);
            return { nr: gi + 1, T: r.T, L: r.L, lvls: r.lvls, common: r.mn, members: czlon,
                     idle: Math.max(0, czlon.reduce((s, m) => s + (m.cap - r.cap), 0)) };
        });
        const osiagniete = groups.reduce((a, g) => a + wartoscCzl(g.members).val, 0);
        return { groups: groups, ideal: ideal, strata: Math.max(0, ideal - osiagniete),
                 k: groups.length, total: list.length, odpad: odpad };
    }

    function massCompositions(group) {
        const carry = parseFloat(cfg.massCarry) || 1;
        const pula = {};
        Object.keys(group.common).forEach(n => { if (group.common[n] > 0) pula[n] = group.common[n]; });
        // najpierw jednostka, ktorej wspolny zapas daje najwiecej pojemnosci
        const order = Object.keys(pula).sort((x, y) =>
            pula[y] * CARRY_FALLBACK[y] - pula[x] * CARRY_FALLBACK[x]);
        const lvls = group.lvls.slice().sort((x, y) => LF[x - 1] - LF[y - 1]);
        const out = {};
        lvls.forEach(l => {
            const target = group.L / LF[l - 1];
            const alloc = {}; let got = 0;
            order.forEach(n => {
                if (got >= target || !pula[n]) return;
                const per = CARRY_FALLBACK[n] * carry;
                const take = Math.min(Math.floor((target - got) / per), pula[n]);
                if (take > 0) { alloc[n] = take; got += take * per; pula[n] -= take; }
            });
            const maja = group.members.filter(m => m.free.indexOf(l) >= 0);
            out[l] = { alloc: alloc, cap: got, target: target,
                       villages: maja.map(m => m.v.id), pominiete: 0 };
        });
        return out;
    }

    function massComposition(group, level) {
        const all = massCompositions(group);
        return all[level] || null;
    }

    let LAST_MASS = null;
    // Postep nie jest juz pamietany recznie: po wyslaniu poziom robi sie zajety
    // i sam znika z planu, wiec nastepny krok to zawsze pierwsza pozycja listy.
    let MASS_SEEN = null;
    let MASS_BLOK = {};
    let MASS_ARM = null;       // przycisk czekajacy na drugie klikniecie (wyslij)        // wioski, ktorym gra odmowila - maja nieaktualny stan wojska
    let MASS_PLAN = null;      // plan zamrozony: liczony raz, wykonywany w calosci
    let MASS_DONE = {};        // ktore wysylki z tego planu juz poszly
    /*  Dlaczego plan jest zamrazany:
     *  cztery wysylki jednej grupy dziela WSPOLNA pule wojska i maja miec ROWNY
     *  czas biegu. Jesli przeliczac plan po kazdej wysylce, kolejny poziom
     *  dostaje mniej wojska i inny czas, a poziomy niewyslane do wszystkich
     *  wiosek wracaja jako nowa grupa - stad powtarzajace sie poziomy
     *  i czasy 1:14 / 1:21 / 1:00 zamiast czterech rownych.                   */
    function przeliczPlan() { MASS_PLAN = massPlan(); MASS_DONE = {}; return MASS_PLAN; }      // wioski widziane na tym ekranie (respektuje grupe wiosek)        // klucz "g<nr>-l<poziom>" -> wyslane w tej rundzie

    /*  Kolejnosc klikania ma znaczenie: sklady licza sie ze wspolnej puli od
     *  poziomu o najwiekszym zapotrzebowaniu. Skrypt buduje wiec kolejke krokow
     *  i podswietla ten, ktory ma byc teraz.                                  */
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

        // KOLEJNOSC MA ZNACZENIE: dopoki pola jednostek sa puste, gra trzyma
        // checkboxy wiosek wylaczone. Najpierw wiec wpisujemy wojsko.
        const inp = unitInputs();
        for (const n in inp) setVal(inp[n], comp.alloc[n] ? comp.alloc[n] : '');

        const chce = {};
        comp.villages.forEach(id => { chce[String(id)] = true; });

        const zaznacz = () => {
            let zazn = 0, widziane = 0, zablokowane = 0;
            massRows().forEach(r => {
                const o = r.opt[level];
                if (!o) return;
                widziane++;
                const want = !!chce[r.id] && o.wolny;
                const ok = optSet(o.td, want);
                if (want && ok) { zazn++; if (LAST_MASS) LAST_MASS.villages.push(r.id); }
                if (want && !ok && o.box && o.box.disabled) { zablokowane++; MASS_BLOK[r.id] = true; }
            });
            return { zazn: zazn, rows: widziane, zablokowane: zablokowane };
        };

        // czas biegu wynika z tego, co naprawde wpisujemy - sklad bywa przeskalowany,
        // wiec nominalny czas grupy bylby zawyzony
        const Treal = runTime(comp.cap * LF[level - 1]);
        LAST_MASS = { level: level, grupa: group.nr, T: Treal, alloc: comp.alloc, villages: [] };
        const r1 = zaznacz();
        if (LAST_MASS) LAST_MASS.villages = LAST_MASS.villages.filter((x, i, a) => a.indexOf(x) === i);
        // wczesniej szlo tu przeliczPlan() - zamrozony plan znikal i cala tabela
        // grup sie sypala. Teraz tylko odswiezamy widok tego samego planu.
        if (r1.zablokowane) setTimeout(render, 30);
        if (r1.zablokowane && !r1.zazn) {
            const inf0 = document.getElementById('znp-m-info');
            if (inf0) inf0.insertAdjacentHTML('beforeend',
                '<div class="znp-warn">Gra odm\u00f3wi\u0142a zaznaczenia \u2014 te wioski maj\u0105 mniej wojska, ni\u017c ' +
                'skrypt pami\u0119ta (np. wys\u0142a\u0142a\u015b z nich r\u0119cznie). Wypad\u0142y z planu, reszta liczy si\u0119 dalej. ' +
                'Pe\u0142ne dane odzyskasz wchodz\u0105c w <b>Przegl\u0105d \u2192 Wojska</b>.</div>');
        }
        if (r1.zablokowane) {
            // gra odblokowuje pola po przeliczeniu skladu - dajemy jej chwile i ponawiamy
            setTimeout(() => {
                const r2 = zaznacz();
                const info = document.getElementById('znp-m-info');
                if (info && r2.zazn > r1.zazn)
                    info.insertAdjacentHTML('beforeend',
                        '<div class="znp-note">Po odblokowaniu p\u00f3l zaznaczono \u0142\u0105cznie <b>' + r2.zazn + '</b> wiosek.</div>');
            }, 300);
        }
        return { comp: comp, zazn: r1.zazn, rows: r1.rows, zablokowane: r1.zablokowane };
    }

    /*  Po kliknieciu przycisku Wyslij w grze zapisujemy spodziewane powroty:
     *  znamy czas biegu grupy i liste wiosek, ktore wlasnie zaznaczylismy.    */
    /*  Na ekranie masowym gra buduje tabele wiosek dopiero po zaladowaniu
     *  strony. Panel potrafil sie odrysowac wczesniej i widzial zero wierszy
     *  (diagnostyka: "wierszy wiosek na stronie: 0"), przez co plan wychodzil
     *  pusty. Czekamy wiec na pojawienie sie wierszy i wtedy liczymy plan.    */
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
            if (!onMass() || !LAST_MASS) return;
            const t = e.target;
            if (!t || !t.closest) return;
            /*  Przycisk wysylki rozpoznajemy po KLASIE, nie po napisie.
             *  Napis zalezy od jezyka swiata ("Wyslij" / "Send" / "Senden"),
             *  wiec dopasowanie tekstem dzialalo tylko na polskich Plemionach -
             *  na pozostalych skrypt nie wiedzial, ze wysylka nastapila,
             *  przez co nie odhaczal kroku ani nie zapisywal powrotow.        */
            const btn = t.closest('a.btn-send, .btn-send, .send-row a.btn, .send-row input, .send-row button');
            if (!btn) return;
            const kl = ' ' + (btn.className || '') + ' ';
            if (/btn-send-premium|btn-pp/.test(kl)) return;         // wariant za punkty
            if (!/btn-send/.test(kl)) {
                const txt = ((btn.value || '') + ' ' + (btn.textContent || '')).trim();
                if (!/wy\u015blij|send|senden|envoyer|enviar|invia/i.test(txt)) return;
            }
            /*  Czas biegu czytamy z karty poziomu, ktora gra wlasnie przeliczyla
             *  dla wpisanego skladu - to najpewniejsze zrodlo. Dopiero gdy karty
             *  nie da sie odczytac, liczymy wzorem. Przy okazji, jesli karta
             *  podaje lup i czas, odswiezamy wspolczynnik czasu i zapamietujemy
             *  go - to on powodowal czasy zawyzone o okolo 30%.               */
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

            /*  Wojsko wlasnie wyszlo z wiosek - pomniejszamy zapamietany stan,
             *  inaczej kolejne poziomy licza sie z armii, ktorej juz nie ma.   */
            const mag = loadMass();
            LAST_MASS.villages.forEach(id => {
                const v = mag[id];
                if (!v || !v.units) return;
                for (const n in LAST_MASS.alloc) v.units[n] = Math.max(0, (v.units[n] || 0) - LAST_MASS.alloc[n]);
                v.unitsTs = Date.now();
            });
            saveMass(mag);
            const info = document.getElementById('znp-m-info');
            if (info) info.insertAdjacentHTML('beforeend',
                '<div class="znp-note">Zapisano spodziewane powroty dla <b>' + LAST_MASS.villages.length +
                '</b> wiosek (poziom ' + LAST_MASS.level + ', za ' + fmtDur(LAST_MASS.T) + ').</div>');
            LAST_MASS = null;
            render();                 // od razu: ptaszek na wys\u0142anym, pod\u015bwietlenie nast\u0119pnego
            setTimeout(render, 400);  // i jeszcze raz, gdy gra zaktualizuje wiersze
        }, true);
    }

    // przycisk Wyslij nalezacy do gry - klikamy go dopiero na wyrazne polecenie gracza
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

    function massClearChecks() {
        massRows().forEach(r => {
            for (let l = 1; l <= 4; l++) if (r.opt[l]) optSet(r.opt[l].td, false);
        });
    }

    /* ------------------------------------------------------ ZAKLADKA MASOWE */

    function myVillage() {
        if (PROBE.vid) return PROBE.vid;
        const m = location.href.match(/village=(\d+)/);
        return m ? m[1] : '';
    }
    const urlUnits = () => '/game.php?village=' + myVillage() + '&screen=overview_villages&mode=units&type=there';
    const urlScav  = () => '/game.php?village=' + myVillage() + '&screen=place&mode=scavenge';
    const urlMass  = () => '/game.php?village=' + myVillage() + '&screen=place&mode=scavenge_mass';

    function htmlMass() {
        if (onUnits()) collectUnits();
        if (onMass())  collectMass();
        const store = loadMass();
        const zUnits = Object.keys(store).filter(k => store[k].unitsTs).length;
        const zFree  = Object.keys(store).filter(k => store[k].free && store[k].free.length).length;

        let h = `<div class="znp-sec"><h4>Dane <em>${zUnits} wiosek z wojskiem \u00b7 ${zFree} ze stanem poziom\u00f3w</em></h4>
          <table>
            <tr><td class="znp-l">Krok 1 \u2014 Przegl\u0105d \u2192 Wojska</td>
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
          <div class="znp-note">Przy kilku stronach wiosek przejd\u017a po nich \u2014 dane si\u0119 dok\u0142adaj\u0105.</div>`;
        h += htmlRezerwa();

        if (onUnits()) {
            const r = { ile: zUnits, kolumn: (PROBE.units || []).length };
            h += `<div class="znp-warn">Odczytano wojsko z <b>${r.ile}</b> wiosek${r.kolumn ? ' (' + r.kolumn + ' kolumn, ' + (r.tryb || '') + ')' : ''}${r.err ? ' \u2014 ' + r.err : ''}.
                  Teraz przejd\u017a na Plac \u2192 Zbieractwo masowe.</div>`;
        }
        h += `</div>`;

        /*  BEZ WSPOLCZYNNIKA CZASU NIE LICZYMY NIC.
         *  Nie chodzi tylko o wyswietlane godziny powrotu: to on decyduje, jaki
         *  lup miesci sie w limicie czasu, a wiec ile wojska trafia do skladu
         *  i jak wioski dziela sie na grupy. Przy wartosci zastepczej 1,0 skrypt
         *  uwaza, ze bieg trwa 3 h, gdy naprawde trwa 2:20 - i niedoladowuje
         *  wioski, zostawiajac wojsko w domu.                                 */
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
              pr\u0119dko\u015b\u0107 \u015bwiata w USTAWIENIACH (pl230 to 1.6, pl232 to 1.25).
              \u0179r\u00f3d\u0142o teraz: ${DF_SRC}.</div></div>`;
        }
        if (!onMass()) {
        h += `<div class="znp-sec"><h4>Plan</h4><div class="znp-note">Grupy policz\u0119 na ekranie
                  <b>Plac \u2192 Zbieractwo masowe</b>.</div></div>`;
            return h + massDiag();
        }

        const plan = (MASS_PLAN && !MASS_PLAN.error) ? MASS_PLAN : przeliczPlan();
        h += fold('ugrup', 'Ustawienia grup', `
          <div class="znp-row2">
            <div><label>Min. wiosek w grupie</label><input type="number" id="znp-m-min" min="1" step="1"></div>
            <div><label>Maks. grup</label><input type="number" id="znp-m-max" min="1" max="8" step="1"></div>
          </div>
          <label>Pomijaj poziom 1, gdy szed\u0142by poni\u017cej [minut] \u2014 0 wy\u0142\u0105cza t\u0119 opcj\u0119</label>
          <input type="number" id="znp-m-skip" min="0" step="10">

          <div class="znp-note">Na ka\u017cd\u0105 grup\u0119 przypadaj\u0105 max. cztery wysy\u0142ki. Wi\u0119cej grup to lepszy
          zbierak, ale wi\u0119cej klikania i cz\u0119stsza wysy\u0142ka... pod rozwag\u0119...</div>`,
          cfg.massMinGroup + '\u2013' + cfg.massMaxGroups);

        if (plan.error) return h + `<div class="znp-sec"><h4>Plan</h4><div class="znp-err">${plan.error}</div></div>`
               + htmlOdpad(plan.odpad) + massDiag();

        const seq = massSeq(plan);
        const nast = massNext(plan);

        h += `<div class="znp-sec"><h4>Grupy <em>${plan.k} grup \u00b7 ${plan.total} wiosek \u00b7 ${(100 - plan.strata / plan.ideal * 100).toFixed(0)}% wykorzystania</em></h4>
          <div class="znp-krok">${nast
              ? `Krok <b>${seq.filter(x => MASS_DONE[massKey(x.g, x.l)]).length + 1}</b> z <b>${seq.length}</b> \u2014
                 <b>grupa ${nast.g}, poziom ${nast.l}</b>`
              : '<button class="znp-btn znp-pulse" id="znp-m-reszta">PRZELICZ POZOSTA\u0141E</button>'}</div>
          <table><tr><th>GR</th><th>CZAS</th><th>WIOSEK</th><th>BEZCZYNNE</th><th>POZIOMY</th></tr>`;
        plan.groups.forEach(g => {
            /*  Idziemy po poziomach GRUPY (g.lvls), a nie po sztywnym 1-4.
             *  Przycisk poziomu 1 potrafil sie pokazac nawet wtedy, gdy regula
             *  progu czasowego wyrzucila ten poziom ze zbioru poziomow grupy -
             *  kolejnosc krokow juz go pomijala, wiec widok klamal.            */
            const poz = (cfg.order === 'desc' ? [4, 3, 2, 1] : [1, 2, 3, 4])
              .filter(l => g.lvls.indexOf(l) >= 0).map(l => {
                const n = g.members.filter(m => m.free.indexOf(l) >= 0).length;
                if (!n) return '';
                const k = massKey(g.nr, l);
                const cls = MASS_DONE[k] ? 'znp-mbtn znp-mbtn-done'
                          : (nast && nast.g === g.nr && nast.l === l) ? 'znp-mbtn znp-mbtn-next' : 'znp-mbtn';
                const arm = MASS_ARM && MASS_ARM.g === g.nr && MASS_ARM.l === l;
                const tresc = MASS_DONE[k] ? '\u2713' : (arm ? 'WY\u015aLIJ' : l);
                const dis = MASS_DONE[k] ? ' disabled' : '';
                return `<button class="${cls}${arm ? ' znp-mbtn-armed' : ''}"${dis} data-g="${g.nr}" data-l="${l}">${tresc}<sub>${n}</sub></button>`;
            }).join(' ');
            const wszystkie = g.lvls.every(l => MASS_DONE[massKey(g.nr, l)]);
            h += `<tr class="${wszystkie ? 'znp-gr-done' : ''}"><td>${g.nr}</td><td>${fmtDur(g.T)}</td>
                  <td>${g.members.length}</td><td>${fmtNum(g.idle)}</td>
                  <td class="znp-poz">${wszystkie ? '<span class="znp-gr-ok">wys\u0142ana</span>' : (poz || '\u2014')}</td></tr>`;
        });
        h += `</table>
<div id="znp-m-info"></div></div>
          ${htmlOdpad(plan.odpad)}
          <button class="znp-btn znp-alt" id="znp-m-pow">WYCZY\u015a\u0106 ZAPISANE POWROTY</button>
          <button class="znp-btn znp-alt" id="znp-m-clear">ODZNACZ WSZYSTKIE WIOSKI</button>`;
        return h + massDiag();
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
            <tr class="znp-tot"><td class="znp-l">w planie</td><td>${o.wPlanie} z ${o.wszystkie}</td></tr>
          </table>
          <table style="margin-top:6px">${lista}</table>
          <div class="znp-note">Najcz\u0119stsza przyczyna: rezerwa zjada armi\u0119 ma\u0142ych wiosek.</div>`,
          poza + ' poza planem');
    }

    function htmlPula(plan) {
        if (!plan || plan.error || !plan.groups || !plan.groups.length) return '';
        const g = plan.groups[0];
        const typy = Object.keys(CARRY_FALLBACK).filter(n => CARRY_FALLBACK[n] > 0);
        const w = typy.map(n => {
            let mn = Infinity, kto = '';
            g.members.forEach(m => { const d = dostepne(m.v, n); if (d < mn) { mn = d; kto = m.v.name; } });
            return { n: n, mn: mn, kto: kto, cap: mn * CARRY_FALLBACK[n] };
        }).filter(x => isFinite(x.mn)).sort((a, b) => b.cap - a.cap);
        return fold('pula', 'Pula grupy 1', `<table>
            <tr><th>JEDN.</th><th>WSP\u00d3LNY ZAPAS</th><th>POJEMNO\u015a\u0106</th><th>OGRANICZA</th></tr>
            ${w.map(x => `<tr><td class="znp-l">${UNIT_PL[x.n] || x.n}</td><td>${fmtNum(x.mn)}</td>
                          <td>${fmtNum(x.cap)}</td><td style="font-size:9px">${x.kto}</td></tr>`).join('')}
          </table>
          <div class="znp-note">Wsp\u00f3lny zapas to najmniejsza liczba danej jednostki w\u015br\u00f3d wiosek grupy \u2014
          sk\u0142ad nie mo\u017ce jej przekroczy\u0107, bo gra wysy\u0142a ten sam sk\u0142ad do wszystkich zaznaczonych.
          Kolumna OGRANICZA m\u00f3wi, kt\u00f3ra wioska ustala ten limit.</div>`,
          g.members.length + ' wiosek');
    }

    function massDiag() {
        const rows = onMass() ? massRows() : [];
        const pierwszy = rows.length ? rows[0] : null;
        return fold('mdiag', 'Diagnostyka masowa', `<table>
            <tr><td class="znp-l">wierszy wiosek na stronie</td><td>${rows.length}</td></tr>
            <tr><td class="znp-l">poziom\u00f3w w pierwszym wierszu</td><td>${pierwszy ? Object.keys(pierwszy.opt).length : '\u2014'}</td></tr>
            <tr><td class="znp-l">wolnych w pierwszym wierszu</td><td>${pierwszy ? [1,2,3,4].filter(l => pierwszy.opt[l] && pierwszy.opt[l].wolny).join(',') || 'brak' : '\u2014'}</td></tr>
            <tr><td class="znp-l">wsp\u00f3\u0142czynnik czasu (df)</td><td>${DF.toFixed(5)}</td></tr>
          </table>
          <table style="margin-top:8px"><tr><th colspan="2">ODCZYTANE WOJSKO (pierwsze 3 wioski)</th></tr>
          ${(() => { const st = loadMass(); const ids = Object.keys(st).filter(k => st[k].unitsTs).slice(0, 3);
              if (!ids.length) return '<tr><td colspan="2">brak danych</td></tr>';
              return ids.map(k => { const v = st[k];
                  const op = Object.keys(v.units || {}).filter(n => v.units[n] > 0)
                      .map(n => v.units[n] + '\u00d7' + (UNIT_PL[n] || n)).join(' ') || 'brak';
                  return `<tr><td class="znp-l">${v.name}</td><td style="text-align:left;font-size:9px">${op}</td></tr>`;
              }).join(''); })()}
          </table>
          
          <table style="margin-top:8px"><tr><th colspan="2">PIERWSZY WIERSZ \u2014 KOM\u00d3RKI POZIOM\u00d3W</th></tr>
          ${pierwszy ? [1,2,3,4].map(l => {
              const o = pierwszy.opt[l];
              if (!o) return `<tr><td class="znp-l">poz. ${l}</td><td>brak kom\u00f3rki</td></tr>`;
              return `<tr><td class="znp-l">poz. ${l}</td><td>${o.stan}${o.box ? '' : ' (brak pola)'}</td></tr>`;
          }).join('') : '<tr><td colspan="2">brak wierszy</td></tr>'}
          </table>
          `,
          rows.length ? rows.length + ' wierszy' : 'BRAK WIERSZY');
    }

    function bindMass() {
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
        const pw = document.getElementById('znp-m-pow');
        if (pw) pw.addEventListener('click', () => { saveReturns({}); render(); });
        const rn = document.getElementById('znp-m-run');
        if (rn) rn.addEventListener('click', () => {
            MASS_BLOK = {};
            if (onUnits()) collectUnits(); if (onMass()) collectMass(); przeliczPlan(); render(); });
        const cl = document.getElementById('znp-m-clear');
        if (cl) cl.addEventListener('click', () => { massClearChecks();
            const i = document.getElementById('znp-m-info');
            if (i) i.innerHTML = '<div class="znp-note">Odznaczono wszystkie wioski.</div>'; });
        const rb = document.getElementById('znp-m-reszta');
        if (rb) rb.addEventListener('click', () => {
            MASS_DONE = {}; MASS_ARM = null; MASS_BLOK = {};
            collectMass(); przeliczPlan(); render();
        });
        document.querySelectorAll('#znp .znp-mbtn').forEach(b => b.addEventListener('click', () => {
            if (b.disabled) return;
            const plan = MASS_PLAN;          // ten sam plan, ktory jest na ekranie
            if (!plan || plan.error) return;
            const g = plan.groups[parseInt(b.dataset.g, 10) - 1];
            const l = parseInt(b.dataset.l, 10);
            if (MASS_ARM && MASS_ARM.g === g.nr && MASS_ARM.l === l) {
                // drugie klikniecie w ten sam przycisk = wysylka
                const btn = szukajWyslij();
                MASS_ARM = null;
                if (btn) { btn.click(); }
                else {
                    const i2 = document.getElementById('znp-m-info');
                    if (i2) i2.innerHTML = '<div class="znp-warn">Nie znalaz\u0142em przycisku wysy\u0142ki \u2014 kliknij go w grze.</div>';
                }
                return;
            }
            const r = massApply(g, l);
            MASS_ARM = { g: g.nr, l: l };
            // zmieniamy sam przycisk, bez przerysowania panelu - komunikat ma zostac
            document.querySelectorAll('#znp .znp-mbtn-armed').forEach(x => {
                x.classList.remove('znp-mbtn-armed');
                const sb0 = x.querySelector('sub');
                x.innerHTML = x.dataset.l + (sb0 ? sb0.outerHTML : '');
            });
            const sb1 = b.querySelector('sub');
            b.classList.add('znp-mbtn-armed');
            b.innerHTML = 'WY\u015aLIJ' + (sb1 ? sb1.outerHTML : '');
            const info = document.getElementById('znp-m-info');
            if (!info) return;
            const nast = massNext(plan);
            if (nast && (nast.g !== g.nr || nast.l !== l))
                info.innerHTML = `<div class="znp-warn">Uwaga: to nie jest nast\u0119pny krok w kolejce
                  (powinna by\u0107 grupa ${nast.g}, poziom ${nast.l}). Sk\u0142ady licz\u0105 si\u0119 ze wsp\u00f3lnej puli,
                  wi\u0119c klikanie poza kolejno\u015bci\u0105 mo\u017ce zostawi\u0107 wojsko w domu.</div>`;
            else info.innerHTML = '';
            if (r.err) { info.innerHTML = `<div class="znp-warn">${r.err}</div>`; return; }
            info.insertAdjacentHTML('beforeend', '');
            const opis = Object.keys(r.comp.alloc).map(n => r.comp.alloc[n] + '\u00d7' + (UNIT_PL[n] || n)).join(' ');
            if (!Object.keys(r.comp.alloc).length) {
                const braki = {};
                g.members.forEach(m => Object.keys(CARRY_FALLBACK).forEach(n => {
                    if (CARRY_FALLBACK[n] > 0) braki[n] = Math.min(braki[n] === undefined ? Infinity : braki[n], dostepne(m.v, n));
                }));
                const lista = Object.keys(braki).filter(n => braki[n] === 0).map(n => UNIT_PL[n] || n).join(', ');
                info.insertAdjacentHTML('beforeend', `<div class="znp-warn">
                  Sk\u0142ad wyszed\u0142 pusty. W tej grupie jest wioska, kt\u00f3ra ma <b>0</b> sztuk
                  ka\u017cdego u\u017cywanego typu po odj\u0119ciu rezerwy${lista ? ' (' + lista + ')' : ''}.
                  Spr\u00f3buj zmniejszy\u0107 rezerw\u0119, ustawi\u0107 <b>min. wiosek w grupie</b> na 1
                  albo wy\u0142\u0105czy\u0107 typy jednostek, kt\u00f3rych te wioski nie maj\u0105.</div>`);
                return;
            }
            info.insertAdjacentHTML('beforeend', `<div class="znp-warn">Grupa ${g.nr}, poziom ${l}: wpisano <b>${opis || 'nic'}</b>
              (${fmtNum(r.comp.cap)} z ${fmtNum(r.comp.target)} poj.), zaznaczono <b>${r.zazn}</b> z ${r.rows} wiosek${r.comp.pominiete ? ', ' + r.comp.pominiete + ' pomini\u0119tych (za ma\u0142o jednostek)' : ''}${r.zablokowane ? ', ' + r.zablokowane + ' p\u00f3l zablokowanych' : ''}.
              <br>Kliknij ten sam przycisk ponownie, \u017ceby wys\u0142a\u0107.</div>`);

        }));
    }

    /* ==================================================================== UI */

    let root = null;

    function buildUI() {
        injectCSS();
        if (document.getElementById('znp')) return;
        root = document.createElement('div');
        root.id = 'znp';
        root.innerHTML = tr(
`<div class="znp-hd">
   <img src="${LOGO}" alt="">
   <div class="znp-tt"><div class="znp-t1">Zbieractwo na pe\u0142nej</div><div class="znp-t2">by Desunia \u00b7 v10.2</div></div>
   <span class="znp-x" title="Zwi\u0144">&#9866;</span>
 </div>
 <div class="znp-tabs">
   <div class="znp-tab" data-tab="planer">PLANER</div>
   <div class="znp-tab" data-tab="powroty">POWROTY</div>
   <div class="znp-tab" data-tab="masowe">MASOWE</div>
   <div class="znp-tab" data-tab="ustawienia">USTAWIENIA</div>
 </div>
 <div class="znp-body"></div>`);
        document.body.appendChild(root);
        if (cfg.pos) { root.style.left = cfg.pos.l + 'px'; root.style.top = cfg.pos.t + 'px'; root.style.right = 'auto'; }
        root.querySelector('.znp-x').addEventListener('click', () => { cfg.open = false; saveCfg(); render(); });
        root.querySelectorAll('.znp-tab').forEach(t => t.addEventListener('click', () => { cfg.tab = t.dataset.tab; saveCfg(); render(); }));
        drag(root, root.querySelector('.znp-hd'));
        render();
    }

    function drag(box, handle) {
        let dx = 0, dy = 0, on = false;
        handle.addEventListener('mousedown', e => {
            if (e.target.classList.contains('znp-x')) return;
            on = true; const r = box.getBoundingClientRect();
            dx = e.clientX - r.left; dy = e.clientY - r.top; e.preventDefault();
        });
        document.addEventListener('mousemove', e => {
            if (!on) return;
            box.style.left = (e.clientX - dx) + 'px'; box.style.top = (e.clientY - dy) + 'px'; box.style.right = 'auto';
        });
        document.addEventListener('mouseup', () => {
            if (!on) return; on = false;
            const r = box.getBoundingClientRect();
            cfg.pos = { l: Math.round(r.left), t: Math.round(r.top) }; saveCfg();
        });
    }

    function render() {
        let mini = document.getElementById('znp-mini');
        if (!cfg.open) {
            if (root) root.style.display = 'none';
            if (!mini) {
                mini = document.createElement('div');
                mini.id = 'znp-mini';
                mini.innerHTML = `<img src="${LOGO_BIG}" alt="Zbieractwo na pe\u0142nej" title="Zbieractwo na pe\u0142nej">`;
                document.body.appendChild(mini);
                if (cfg.miniPos) {
                    mini.style.left = cfg.miniPos.l + 'px';
                    mini.style.top = cfg.miniPos.t + 'px';
                    mini.style.right = 'auto';
                }
                // przeciaganie z progiem 4 px - ponizej progu traktujemy jako klikniecie
                let dx = 0, dy = 0, down = false, moved = false;
                mini.addEventListener('mousedown', e => {
                    down = true; moved = false;
                    const r = mini.getBoundingClientRect();
                    dx = e.clientX - r.left; dy = e.clientY - r.top;
                    e.preventDefault();
                });
                document.addEventListener('mousemove', e => {
                    if (!down) return;
                    if (Math.abs(e.clientX - dx - mini.offsetLeft) > 4 ||
                        Math.abs(e.clientY - dy - mini.offsetTop) > 4) moved = true;
                    mini.style.left = (e.clientX - dx) + 'px';
                    mini.style.top = (e.clientY - dy) + 'px';
                    mini.style.right = 'auto';
                });
                document.addEventListener('mouseup', () => {
                    if (!down) return;
                    down = false;
                    if (moved) {
                        const r = mini.getBoundingClientRect();
                        cfg.miniPos = { l: Math.round(r.left), t: Math.round(r.top) };
                        saveCfg();
                    } else {
                        cfg.open = true; saveCfg(); render();
                    }
                });
            }
            return;
        }
        if (mini) mini.remove();
        if (!root) return;
        root.style.display = 'flex';
        root.querySelectorAll('.znp-tab').forEach(t => t.classList.toggle('znp-on', t.dataset.tab === cfg.tab));
        const b = root.querySelector('.znp-body');
        if (!b) return;
        // kazdy widok osobno w try/catch - awaria ma byc widoczna, a nie pusta
        const safe = (build, bind) => {
            try { b.innerHTML = tr(build()); } catch (e) {
                b.innerHTML = '<div class="znp-sec"><h4>B\u0142\u0105d widoku</h4><div class="znp-err">' +
                    String(e && e.message) + '</div><div class="znp-note">' +
                    String(e && e.stack || '').split('\n').slice(0, 3).join('<br>') + '</div></div>';
                return;
            }
            try { bind(); } catch (e) {
                b.insertAdjacentHTML('beforeend',
                    '<div class="znp-warn">B\u0142\u0105d podpi\u0119cia kontrolek: ' + String(e && e.message) + '</div>');
            }
        };
        const bindSpeed = () => {
            const b = document.getElementById('znp-df-ok'), i = document.getElementById('znp-df-speed');
            if (!b || !i) return;
            b.addEventListener('click', () => {
                const v = parseFloat(i.value);
                if (!(v > 0)) return;
                cfg.speedOverride = v; saveCfg(); detectDF(); przeliczPlan(); render();
            });
            i.addEventListener('keydown', e => { if (e.key === 'Enter') b.click(); });
        };
        /*  Karty rozwijamy przez przelaczenie klasy, a nie przez przerysowanie
         *  panelu. Przerysowanie bywalo wyscigiem z innymi odswiezeniami i karta
         *  raz sie otwierala, a raz nie. Teraz reakcja jest natychmiastowa.    */
        const bindFolds = () => document.querySelectorAll('#znp .znp-fold>h4').forEach(hh =>
            hh.addEventListener('click', e => {
                e.preventDefault(); e.stopPropagation();
                const box = hh.parentElement, id = box.dataset.sec;
                const open = box.classList.toggle('znp-open');
                cfg.secOpen[id] = open; saveCfg();
            }));
        const safeF = (build, bind) => { safe(build, bind); bindFolds(); bindSpeed(); bindRezerwa(); bindWspolne(); };
        if (cfg.tab === 'masowe')           safeF(htmlMass, bindMass);
        else if (cfg.tab === 'powroty')     safeF(htmlReturns, bindReturns);
        else if (cfg.tab === 'ustawienia')  safeF(htmlSettings, bindSettings);
        else                                safeF(htmlPlanner, bindPlanner);
    }

    /* ------------------------------------------------- TLUMACZENIE */
    /*  Polski na swiatach .plemiona.pl i przy locale pl_*, angielski
     *  wszedzie indziej. Tlumaczymy gotowy HTML, fraza po frazie, od
     *  najdluzszej - dzieki temu teksty w kodzie zostaja po polsku, a
     *  slownik jest w jednym miejscu i latwo go uzupelnic.              */
    const jestPL = () => {
        const l = ((window.game_data && window.game_data.locale) || '').toLowerCase();
        if (l) return l.indexOf('pl') === 0;
        return /\.plemiona\.pl$/i.test(location.hostname);
    };
    const SLOWNIK = [
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
        ['Skrypt nie wykonuje \u017cadnych po\u0142\u0105cze\u0144 na zewn\u0105trz ani nie wysy\u0142a zdarze\u0144 do p\u00f3l gry', 'The script makes no outside connections and sends no events to game fields'],
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
        ['Skrypt nie wykonuje \u017cadnych po\u0142\u0105cze\u0144 na zewn\u0105trz', 'The script makes no outside connections'],
        ['ani nie wysy\u0142a zdarze\u0144 do p\u00f3l gry', 'and sends no events to game fields'],
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
        ['W fazie ci\u0105g\u0142ej rekrutacji r\u00f3wny podzia\u0142 zyskuje dodatkowo\n          ok. 2\u20133%, bo paczki wracaj\u0105 w r\u00f3\u017cnych momentach i \u015bwie\u017ce piki\n          kr\u00f3cej stoj\u0105 bezczynnie.', 'During continuous recruitment the equal split gains another 2\u20133%, because the packs return at different moments and fresh spears stay idle for less time.'],
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
        ['WY\u015aLIJ', 'SEND'],
        ['Zwi\u0144', 'Collapse'],
        ['Tryb podzia\u0142u', 'Split mode'],
        ['Optimum', 'Optimum'],
        ['R\u00f3wny czas 2:1', 'Equal time 2:1'],
        ['R\u00f3wny podzia\u0142 wojska', 'Equal troop split'],
        ['R\u00f3wny podzia\u0142', 'Equal split'],
        ['Kolejno\u015b\u0107 wype\u0142niania', 'Fill order'],
        ['Kolejno\u015b\u0107 poziom\u00f3w', 'Level order'],
        ['Od najwy\u017cszego', 'From highest'],
        ['Od najni\u017cszego', 'From lowest'],
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
        ['Klinij ten sam przycisk ponownie, \u017ceby wys\u0142a\u0107.', 'Click the same button again to send.'],
        ['Kliknij ten sam przycisk ponownie, \u017ceby wys\u0142a\u0107.', 'Click the same button again to send.'],
        ['Nie znalaz\u0142em przycisku wysy\u0142ki \u2014 kliknij go w grze.', 'Send button not found \u2014 click it in the game.'],
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
        ['Pe\u0142ne dane odzyskasz wchodz\u0105c w', 'You can restore full data by visiting'],
        ['Najcz\u0119stsza przyczyna: rezerwa zjada armi\u0119 ma\u0142ych wiosek.', 'Most common cause: the reserve eats up small villages\' armies.'],
    ].sort((a, b) => b[0].length - a[0].length);
    /*  Dluzsze zdania w kodzie sa lamane na kilka linii z wcieciem, wiec
     *  dopasowujemy je z tolerancja na dowolne biale znaki miedzy slowami. */
    const RE = SLOWNIK.map(par => {
        const wzor = par[0].trim().split(/\s+/)
            .map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');
        /*  Granice slowa, inaczej krotki wpis typu "POZ" podmienilby sie
         *  w srodku wyrazu "POZIOMOW".                                     */
        const L = '[A-Za-z0-9\\u00c0-\\u024f]';
        return [new RegExp('(^|(?!' + L + ').)' + wzor + '(?!' + L + ')', 'g'),
                par[1].replace(/\$/g, '$$$$')];
    });
    const tr = html => {
        if (jestPL()) return html;
        let out = html;
        for (let i = 0; i < RE.length; i++) out = out.replace(RE[i][0], '$1' + RE[i][1]);
        return out;
    };

    /* ------------------------------------------------------------- PLANER */

    /*  Kompaktowa rezerwa: jeden wiersz na typ jednostki, bez tabeli na pol ekranu.
     *  Skroty jednostek w naglowku, pod nimi pole liczbowe; wylaczenie typu
     *  robi sie przez kliknieciu w skrot.                                      */
    /*  Te same ustawienia co w PLANERZE - maksymalny czas biegu, kolejnosc
     *  poziomow i pomijanie poziomu 1. Trzymaja sie tych samych pol konfiguracji,
     *  wiec zmiana w jednej zakladce dziala w obu.                             */
    function htmlWspolne() {
        return fold('wspolne', 'Czas i kolejno\u015b\u0107', `
          <div class="znp-row2">
            <div><label>Maks. czas biegu \u00b7 min. ${fmtHM(minMinutes())}</label>
                 <input type="text" id="znp-w-max" value="${cfg.maxMinutes ? fmtHM(cfg.maxMinutes) : ''}" placeholder="np. 3:00"></div>
            <div><label>Kolejno\u015b\u0107 poziom\u00f3w</label>
                 <select id="znp-w-ord">
                   <option value="asc" ${cfg.order === 'asc' ? 'selected' : ''}>1 \u2192 4</option>
                   <option value="desc" ${cfg.order === 'desc' ? 'selected' : ''}>4 \u2192 1</option>
                 </select></div>
          </div>
`,
          (cfg.maxMinutes ? fmtHM(cfg.maxMinutes) : 'bez limitu') + ' \u00b7 ' + (cfg.order === 'desc' ? '4\u21921' : '1\u21924'));
    }

    function bindWspolne() {
        const mx = document.getElementById('znp-w-max');
        if (mx) mx.addEventListener('change', e => {
            const v = parseHM(e.target.value);
            cfg.maxMinutes = (v && v >= minMinutes()) ? v : 0; saveCfg();
            if (typeof przeliczPlan === 'function') przeliczPlan(); render();
        });
        const od = document.getElementById('znp-w-ord');
        if (od) od.addEventListener('change', e => { cfg.order = e.target.value; saveCfg(); render(); });
    }

    // ikona jednostki: najpierw ta, ktorej uzywa sama gra, potem adres z CDN
    const IKONA_CDN = 'https://dspl.innogamescdn.com/asset/45436e33/graphic/unit/unit_';
    function ikonaJedn(u) {
        const a = document.querySelector('.unit_link[data-unit="' + u + '"] img, img[src*="unit_' + u + '.png"]');
        const src = a ? a.getAttribute('src') : (IKONA_CDN + u + '.png');
        return '<img src="' + src + '" alt="' + u + '" title="' + (UNIT_PL[u] || u) + '">';
    }

    /*  Rezerwa: kafelek na jednostke - ikona, checkbox "\u015blij" i pole rezerwy.
     *  Checkbox odznaczony = tego typu nie wysylamy wcale.                     */
    function htmlRezerwa() {
        const p = pool();
        if (!p.length) return '';
        const kom = p.map(u => {
            const en = cfg.enabled[u.name] !== undefined ? cfg.enabled[u.name] : true;
            return `<div class="znp-rez ${en ? '' : 'znp-rez-off'}" data-u="${u.name}">
                      <div class="znp-rez-i">${ikonaJedn(u.name)}</div>
                      <input type="checkbox" data-e="${u.name}" ${en ? 'checked' : ''} title="wysy\u0142a\u0107 ten typ">
                      <input type="number" min="0" step="10" value="${cfg.reserve[u.name] || 0}" data-r="${u.name}">
                      <span class="znp-rez-a">${fmtNum(u.avail)}</span>
                    </div>`;
        }).join('');
        const ile = p.filter(u => (cfg.reserve[u.name] || 0) > 0 ||
                                  (cfg.enabled[u.name] !== undefined && !cfg.enabled[u.name])).length;
        return fold('rezerwa', 'Jednostki i rezerwa', `<div class="znp-rezwrap">${kom}</div>
          <div class="znp-note">Zaznaczony checkbox potwierdza, \u017ce skrypt b\u0119dzie wysy\u0142a\u0142 dany rodzaj
          jednostki. Wpisana liczba to rezerwa, kt\u00f3ra ma zosta\u0107 w wiosce.${onScav() ?
          ' Pod spodem aktualny stan wojsk w wiosce.' : ''}</div>`,
          ile ? ile + ' z limitem' : 'wszystkie');
    }

    function bindRezerwa() {
        document.querySelectorAll('#znp .znp-rez input[data-r]').forEach(i =>
            i.addEventListener('change', e => {
                cfg.reserve[e.target.dataset.r] = parseInt(e.target.value, 10) || 0;
                saveCfg(); if (typeof przeliczPlan === 'function') przeliczPlan(); render();
            }));
        document.querySelectorAll('#znp .znp-rez input[data-e]').forEach(c =>
            c.addEventListener('change', e => {
                cfg.enabled[e.target.dataset.e] = e.target.checked;
                saveCfg(); if (typeof przeliczPlan === 'function') przeliczPlan(); render();
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
            <div><label>Maks. czas biegu \u00b7 min. ${fmtHM(minMinutes())}</label>
              <input type="text" id="znp-max" placeholder="np. 1:30 \u2014 puste = brak"></div>
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
            h += htmlRezerwa();
        h += `<div class="znp-sec"><h4>Plan</h4><div class="znp-err">${plan.error}</div></div>`;
        } else {
            h += htmlRezerwa();
        h += `<div class="znp-sec"><h4>Plan <em>${fmtNum(plan.rate)} sur/h \u00b7 ${fmtNum(plan.rate * 24)} /dob\u0119</em></h4>
              <table><tr><th>POZ</th><th>WOJSKO</th><th>CZAS</th><th>SUR/H</th></tr>`;
            plan.steps.forEach((s, i) => {
                const tr = Object.keys(s.alloc).map(n => s.alloc[n] + '\u00d7' + (UNIT_PL[n] || n)).join(' ') || '\u2014';
                h += `<tr class="${i === plan.pointer ? 'znp-cur' : ''}"><td>${s.level + 1}</td>
                      <td class="znp-l">${tr}</td><td>${fmtDur(s.time)}</td><td>${fmtNum(s.rate)}</td></tr>`;
            });
            h += `<tr class="znp-tot"><td>\u03a3</td><td class="znp-l">${fmtNum(plan.used)} z ${fmtNum(plan.total)} poj.</td>
                  <td>\u2014</td><td>${fmtNum(plan.rate)}</td></tr></table>`;
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
                h += `</table><div class="znp-note">W fazie ci\u0105g\u0142ej rekrutacji r\u00f3wny podzia\u0142 zyskuje dodatkowo
                      ok. 2\u20133%, bo paczki wracaj\u0105 w r\u00f3\u017cnych momentach i \u015bwie\u017ce piki kr\u00f3cej stoj\u0105 bezczynnie.</div></div>`;
            }
        }
        h += `<button class="znp-btn" id="znp-run">PRZELICZ I WYPE\u0141NIJ</button>`;
        return h;
    }

    function bindPlanner() {
        const m = document.getElementById('znp-mode'); if (!m) return;
        m.value = cfg.mode;
        document.getElementById('znp-order').value = cfg.order;
        document.getElementById('znp-max').value = cfg.maxMinutes > 0 ? fmtHM(cfg.maxMinutes) : '';
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
        const commit = () => { cfg.maxMinutes = parseHM(mx.value); saveCfg(); rerun(); };
        mx.addEventListener('change', commit);
        mx.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); commit(); } });
        document.getElementById('znp-run').addEventListener('click', rerun);
    }

    /* ------------------------------------------------------------ POWROTY */

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
        // wioski wedlug najblizszego powrotu, a w kazdej poziomy wedlug czasu
        const kolej = Object.keys(byV).sort((a, b) => byV[a].items[0].ts - byV[b].items[0].ts);

        h += `<div class="znp-sec"><h4>Wioski <em>${kolej.length}</em></h4>`;
        for (let qi = 0; qi < kolej.length; qi++) {
            const vid = kolej[qi];
            const v = byV[vid];
            v.items.sort((a, b) => a.ts - b.ts);
            h += `<table style="margin-bottom:9px">
                    <tr><th colspan="3" style="text-align:left;border-radius:5px 5px 0 0">${v.name} \u00b7 ${v.coord}
                      <span class="znp-pill znp-on" style="float:right">${fmtClock(v.items[0].ts)}</span></th></tr>`;
            v.items.forEach(i => {
                h += `<tr><td>poz. ${i.lv + 1}</td><td>${fmtClock(i.ts)}</td><td>za ${fmtLeft(i.ts - now)}</td></tr>`;
            });
            h += `</table>`;
        }
        h += `</div><div class="znp-sec"><h4>Wszystkie powroty</h4>
              <table><tr><th>GODZ.</th><th>WIOSKA</th><th>POZ</th><th>ZA</th></tr>`;
        rows.forEach(r => {
            h += `<tr><td>${fmtClock(r.ts)}</td><td class="znp-l">${r.coord}</td><td>${r.lv + 1}</td>
                  <td>${fmtLeft(r.ts - now)}</td></tr>`;
        });
        h += `</table><div class="znp-note">Wpis znika sam po powrocie wojska. Od\u015bwie\u017canie co 30 sekund.</div></div>
              <button class="znp-btn znp-alt" id="znp-clr">WYCZY\u015a\u0106 HISTORI\u0118 POWROT\u00d3W</button>`;
        return h;
    }
    /*  Propozycje budzikow: powroty zbierane sa w paczki. Nowa paczka zaczyna
     *  sie, gdy czekanie na kolejny powrot przekroczyloby zadany luz - dzieki
     *  temu jedno wstanie obsluguje kilka wiosek, a wojsko nie stoi za dlugo.  */
    function htmlBudziki(rows, now) {
        const luz = (parseInt(cfg.budzikLuz, 10) || 15) * 60000;
        const przyszle = rows.filter(r => r.ts > now).sort((a, b) => a.ts - b.ts);
        if (!przyszle.length) return '';
        const paczki = [];
        let biez = [przyszle[0]];
        for (let i = 1; i < przyszle.length; i++) {
            if (przyszle[i].ts - biez[0].ts <= luz) biez.push(przyszle[i]);
            else { paczki.push(biez); biez = [przyszle[i]]; }
        }
        paczki.push(biez);
        const wiersze = paczki.slice(0, 8).map(pk => {
            const t = pk[pk.length - 1].ts;
            const wiosek = {}; pk.forEach(x => { wiosek[x.vid] = true; });
            const postoj = Math.round((t - pk[0].ts) / 60000);
            return `<tr><td><b>${fmtClock(t)}</b></td><td>${fmtLeft(t - now)}</td>
                    <td>${Object.keys(wiosek).length} wiosek</td><td>${pk.length} wysy\u0142ek</td>
                    <td>${postoj} min</td></tr>`;
        }).join('');
        return `<div class="znp-sec"><h4>Propozycje budzik\u00f3w <em>post\u00f3j do ${luz / 60000} min</em></h4>
          <table><tr><th>GODZ.</th><th>ZA</th><th>WIOSKI</th><th>WYSY\u0141KI</th><th>POST\u00d3J</th></tr>${wiersze}</table>
          <label>Dopuszczalny post\u00f3j [min]</label>
          <input type="number" id="znp-luz" min="0" max="120" step="5" value="${parseInt(cfg.budzikLuz, 10) || 15}">
          <div class="znp-note">Jeden wiersz to jedna propozycja budzika, \u017ceby wys\u0142a\u0107 jak najwi\u0119cej
          przy jak najkr\u00f3tszym postoju.</div></div>`;
    }

    function bindReturns() {
        const lz = document.getElementById('znp-luz');
        if (lz) lz.addEventListener('change', e => { cfg.budzikLuz = parseInt(e.target.value, 10) || 15; saveCfg(); render(); });
        const b = document.getElementById('znp-clr');
        if (b) b.addEventListener('click', () => { saveReturns({}); render(); });
    }

    /* --------------------------------------------------------- USTAWIENIA */

    // sekcja zwijana - stan zapamietywany w ustawieniach
    function fold(id, title, inner, badge) {
        const open = !!cfg.secOpen[id];
        return `<div class="znp-sec znp-fold ${open ? 'znp-open' : ''}" data-sec="${id}">
                  <h4><span>${title} <span class="znp-arrow">&#9656;</span></span>
                      <em>${badge || ''}</em></h4>
                  <div class="znp-secbody">${inner}</div>
                </div>`;
    }

    function htmlSettings() {
        let h = '';


        if (onScav()) {
            let ju = `<table><tr><th>JEDN.</th><th>DOST\u0118PNE</th><th>REZERWA</th><th>\u015aLIJ</th></tr>`;
            pool().forEach(u => {
                ju += `<tr><td class="znp-l">${UNIT_PL[u.name] || u.name}</td><td>${fmtNum(u.avail)}</td>
                       <td><input class="znp-res" type="number" min="0" data-u="${u.name}" value="${u.reserve}"></td>
                       <td><input type="checkbox" data-e="${u.name}" ${u.enabled ? 'checked' : ''}></td></tr>`;
            });
            ju += `</table><div class="znp-note">Rezerwa zostaje w wiosce \u2014 np. pod bie\u017c\u0105ce farmienie barb.</div>`;
            h += `<div class="znp-sec"><h4>Jednostki</h4>${ju}</div>`;
        }

        /* --- trzy sekcje zwijane, rzadko potrzebne --- */

        h += fold('swiat', 'Ten \u015bwiat', `<table>
            <tr><td class="znp-l">Wsp\u00f3\u0142czynnik czasu (df)</td><td>${DF.toFixed(5)}</td></tr>
            <tr><td class="znp-l">Pr\u0119dko\u015b\u0107 odtworzona z df</td><td>x${speedFromDF().toFixed(3)}</td></tr>
            <tr><td class="znp-l">Najkr\u00f3tszy mo\u017cliwy bieg</td><td>${fmtHM(minMinutes())}</td></tr>
          </table>
          <label>Pr\u0119dko\u015b\u0107 \u015bwiata r\u0119cznie (0 = wykryj sam) \u2014 pl230 to 1.6, pl232 to 1.25</label>
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
            <tr><td class="znp-l">po\u0142\u0105cze\u0144 na zewn\u0105trz</td><td>${cfg.webFonts ? 'kroje pisma' : '0'}</td></tr>
          </table>
          <div class="znp-chk"><input type="checkbox" id="znp-fonts-chk" ${cfg.webFonts ? 'checked' : ''}>
            Pobieraj kroje pisma z sieci (Google Fonts)</div>
          <div class="znp-note">Kolejno\u015b\u0107 \u017ar\u00f3de\u0142: warto\u015b\u0107 r\u0119czna, potem pomiar z ekranu gry
          (\u0142up i czas dowolnego poziomu odwr\u00f3cone wzorem), potem konfiguracja gry, na ko\u0144cu
          pr\u0119dko\u015b\u0107^-0,55. Pomiar z ekranu jest najpewniejszy, bo nie zale\u017cy od nazw p\u00f3l w game_data.</div>`,
          DF_SRC);

        const karty = options();
        h += fold('karty', 'Karty w DOM', `<table>
            <tr><th>KARTA</th><th>WYKRYTY POZIOM</th><th>\u0141UP / POJ.</th><th>STAN</th></tr>
            ${karty.map((el, i) => {
                const inf = optionInfo(el), C = enteredCapacity();
                const r = (inf.loot && C) ? (inf.loot / C).toFixed(3) : '\u2014';
                return `<tr><td>${i + 1}</td><td>${LVLMAP ? (levelOf(i) + 1) : '(pozycyjnie ' + (i + 1) + ')'}</td>
                        <td>${r}</td><td>${optionState(el)}</td></tr>`;
            }).join('')}
          </table>
          <div class="znp-note">Poziom karty wyliczany jest z ilorazu wy\u015bwietlonego \u0142upu i wpisanej
          pojemno\u015bci \u2014 powinien wynosi\u0107 0,100 / 0,250 / 0,500 / 0,750. Je\u017celi w kolumnie
          \u201ewykryty poziom\u201d widnieje \u201epozycyjnie\u201d, mapowanie nie uda\u0142o si\u0119 zmierzy\u0107 i skrypt
          dzia\u0142a na kolejno\u015bci z DOM.</div>`,
          LVLMAP ? 'zmierzone' : 'pozycyjnie');

        h += `<button class="znp-btn znp-alt" id="znp-reset">RESET USTAWIE\u0143</button>`;
        return h;
    }
    function bindSettings() {
        const s1 = document.getElementById('znp-skip1');
        if (s1) { s1.checked = !!cfg.skipLevel1;
            s1.addEventListener('change', e => { cfg.skipLevel1 = e.target.checked; saveCfg(); apply(true); }); }
        const bl = document.getElementById('znp-below');
        if (bl) { bl.value = cfg.skipL1Below;
            bl.addEventListener('change', e => { cfg.skipL1Below = parseInt(e.target.value, 10) || 0; saveCfg(); apply(true); }); }
        document.querySelectorAll('#znp .znp-res').forEach(i => i.addEventListener('change', e => {
            cfg.reserve[e.target.dataset.u] = parseInt(e.target.value, 10) || 0; saveCfg(); apply(true);
        }));
        document.querySelectorAll('#znp [data-e]').forEach(i => i.addEventListener('change', e => {
            cfg.enabled[e.target.dataset.e] = e.target.checked; saveCfg(); apply(true);
        }));
        const fch = document.getElementById('znp-fonts-chk');
        if (fch) fch.addEventListener('change', e => {
            cfg.webFonts = e.target.checked; saveCfg();
            const l = document.getElementById('znp-fonts'); if (l) l.remove();
            const c = document.getElementById('znp-css'); if (c) c.remove();
            injectCSS(); render();
        });
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

    /* ============================================================== NASLUCH */

    function hookStart() {
        document.addEventListener('click', e => {
            const b = e.target.closest ? e.target.closest('.free_send_button') : null;
            if (!b) return;
            const card = b.closest('.scavenge-option');
            const idx = card ? options().indexOf(card) : -1;
            markSent(idx >= 0 ? levelOf(idx) : -1);   // oznacz DOKLADNIE ten poziom
            // szybciej przechodzimy do kolejnego poziomu; powtarzamy, bo gra
            // aktualizuje karty z lekkim opoznieniem
            [300, 900, 1800].forEach(ms => setTimeout(() => {
                syncReturns(); if (cfg.autoAdvance) advance(); else render();
            }, ms));
        }, true);
    }

    function init() {
        detectDF();
        buildUI();
        hookStart();
        hookMassSend();
        czekajNaTabele();
        syncReturns();
        if (onScav()) {
            if (!options().length) { setTimeout(init, 800); return; }
            apply(true);
            // gra przelicza lupy i czasy dopiero po wypelnieniu formularza,
            // wiec kalibracje ponawiamy kilka razy, az zmierzy sie z ekranu
            [900, 3000].forEach(ms => setTimeout(() => {
                if (DF_SRC === 'zmierzony z ekranu gry' || DF_SRC === 'ustawiony r\u0119cznie') return;
                const b = DF; detectDF();
                if (Math.abs(DF - b) > 1e-4) { apply(true); render(); }
            }, ms));
            render();
        }
        setInterval(() => { syncReturns(); if (cfg.open && cfg.tab === 'powroty') render(); }, 30000);
    }

    init();
})();
