/* ============================================================
   Landing Page 02 — ERP Sob Medida | ON Solutions Brasil
   Comportamentos: WhatsApp dinamico, origem de anuncios,
   selecao de desafios, header on-scroll, carrossel e tracking.
   ============================================================ */
(function () {
  "use strict";

  // ---- WhatsApp ----
  var WA_NUMBER = "5511972243329";
  function waLink(t) { return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(t); }

  // ---- Configuracao de rastreamento (preencha para ativar; vazio = nada e carregado) ----
  var ON_TRACKING = { gtmId: "", ga4Id: "", gadsId: "", gadsConversionLabel: "" };
  var ON_APPEND_ORIGIN = true; // true = acrescenta termo e campanha do anuncio na mensagem do WhatsApp

  // Origem do clique (parametros do anuncio) para o time comercial
  (function () {
    var qs = new URLSearchParams(window.location.search);
    var term = qs.get("utm_term") || qs.get("kw") || "";
    var camp = qs.get("utm_campaign") || "";
    var gclid = qs.get("gclid") || "";
    window.ON_ORIGIN = (ON_APPEND_ORIGIN && (term || camp || gclid))
      ? "\nOrigem: anuncio" + (term ? " | Termo: " + term : "") + (camp ? " | Campanha: " + camp : "") : "";
  })();

  // Aplica o link inicial em todos os CTAs com data-wa
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waLink(a.getAttribute("data-wa") + (window.ON_ORIGIN || ""));
    a.target = "_blank"; a.rel = "noopener";
  });

  // ---- Carregamento opcional de GTM / GA4 / Google Ads ----
  (function () {
    var T = ON_TRACKING;
    window.dataLayer = window.dataLayer || [];
    if (T.gtmId) {
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0], j = d.createElement(s);
        j.async = true; j.src = "https://www.googletagmanager.com/gtm.js?id=" + i; f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", T.gtmId);
    }
    var gid = T.ga4Id || T.gadsId;
    if (gid) {
      var s = document.createElement("script"); s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + gid; document.head.appendChild(s);
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      if (T.ga4Id) window.gtag("config", T.ga4Id);
      if (T.gadsId) window.gtag("config", T.gadsId);
    }
  })();

  // ---- Conversao: clique para o WhatsApp (botoes, links e formulario) ----
  window.onWhatsAppClick = function (pos) {
    var v = document.querySelector(".view:not([hidden])");
    var svc = v ? (v.getAttribute("data-service") || "") : "";
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "whatsapp_click", service: svc, position: pos });
    if (typeof window.gtag === "function") {
      if (ON_TRACKING.gadsId && ON_TRACKING.gadsConversionLabel) {
        window.gtag("event", "conversion", { send_to: ON_TRACKING.gadsId + "/" + ON_TRACKING.gadsConversionLabel });
      }
      window.gtag("event", "generate_lead", { service: svc, position: pos });
    }
  };
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="https://wa.me/"]') : null;
    if (a) window.onWhatsAppClick(a.getAttribute("data-pos") || "link");
  }, true);

  // ---- Topo: esconde ao rolar para baixo e volta ao rolar para cima ----
  (function () {
    var topBar = document.querySelector(".top");
    if (!topBar) return;
    var lastY = window.scrollY, acc = 0, ticking = false;
    function onScroll() {
      var y = window.scrollY, d = y - lastY;
      lastY = y; ticking = false;
      if (y < 80) { topBar.classList.remove("hide"); acc = 0; return; }
      if ((d > 0 && acc < 0) || (d < 0 && acc > 0)) acc = 0;
      acc += d;
      if (acc > 24) topBar.classList.add("hide");
      else if (acc < -24) topBar.classList.remove("hide");
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); } }, { passive: true });
    topBar.addEventListener("focusin", function () { topBar.classList.remove("hide"); });
  })();

  // ---- Desafios: cada toque marca ou desmarca; a mensagem dos botoes fixos e a previa somam tudo o que foi marcado ----
  (function () {
    function baseMsg(view) {
      var svc = view.getAttribute("data-service") || "";
      return svc ? "Olá, vim do site e gostaria de saber mais sobre os serviços de " + svc + "."
                 : "Olá, vim do site e gostaria de saber mais sobre os serviços da ON Solutions.";
    }
    function apply(view, msg) {
      document.querySelectorAll("[data-wa-main]").forEach(function (a) {
        a.setAttribute("data-wa", msg);
        a.href = waLink(msg + (window.ON_ORIGIN || ""));
      });
      var b = view.querySelector("[data-bubble]");
      if (b) b.textContent = msg;
    }
    function sync(view) {
      var sel = [].slice.call(view.querySelectorAll(".pain[aria-pressed=true]")).map(function (p) { return p.getAttribute("data-q").replace(/[.!?]+$/, ""); });
      var msg = baseMsg(view);
      if (sel.length) {
        msg += (sel.length > 1 ? " Meus maiores desafios hoje: " : " Meu maior desafio hoje: ") + sel.join("; ") + ".";
      }
      apply(view, msg);
      var hint = view.querySelector("[data-hint]");
      if (hint) hint.textContent = sel.length === 0 ? "" : (sel.length === 1
        ? "Pronto! Agora toque em \u201cPedir orçamento no WhatsApp\u201d para enviar."
        : "Você marcou " + sel.length + ". Isso tem solução: toque em \u201cPedir orçamento no WhatsApp\u201d para enviar.");
    }
    document.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".pain") : null;
      if (!btn) return;
      var view = btn.closest(".view");
      if (!view) return;
      btn.setAttribute("aria-pressed", String(btn.getAttribute("aria-pressed") !== "true"));
      sync(view);
    });
    window.addEventListener("hashchange", function () {
      document.querySelectorAll(".pain[aria-pressed=true]").forEach(function (p) { p.setAttribute("aria-pressed", "false"); });
      document.querySelectorAll("[data-hint]").forEach(function (h) { h.textContent = ""; });
    });
  })();

  // ---- Carrossel infinito de clientes ----
  (function () {
    var homeTrack = document.getElementById("cases-track");
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.querySelectorAll(".marquee[data-marquee]").forEach(function (mq) {
      var track = mq.querySelector("[data-track]");
      if (!track.children.length && homeTrack) {
        [].slice.call(homeTrack.children).filter(function (c) { return !c.hasAttribute("aria-hidden"); })
          .forEach(function (c) { track.appendChild(c.cloneNode(true)); });
      }
      if (reduce) return;
      var originals = [].slice.call(track.children);
      var SPEED = 40; // px por segundo (constante em qualquer largura)
      var lastW = 0;
      // Largura exata de um conjunto completo (inclui espacamento de cada logotipo)
      function setWidth() {
        var first = originals[0], last = originals[originals.length - 1];
        var cs = window.getComputedStyle(last);
        return last.offsetLeft + last.offsetWidth + (parseFloat(cs.marginRight) || 0) - first.offsetLeft;
      }
      // Clona o conjunto o suficiente para cobrir a tela + 1 conjunto, e anima exatamente 1 conjunto
      function build() {
        var w = setWidth();
        if (!(w > 0)) return;
        var need = Math.ceil(mq.clientWidth / w) + 1;
        [].slice.call(track.querySelectorAll("[aria-hidden]")).forEach(function (n) { track.removeChild(n); });
        for (var i = 0; i < need; i++) {
          originals.forEach(function (c) {
            var k = c.cloneNode(true); k.setAttribute("aria-hidden", "true"); track.appendChild(k);
          });
        }
        mq.style.setProperty("--shift", w + "px");
        mq.style.setProperty("--dur", (w / SPEED) + "s");
        lastW = mq.clientWidth;
      }
      build();
      var rt;
      window.addEventListener("resize", function () {
        clearTimeout(rt);
        rt = setTimeout(function () { if (mq.clientWidth !== lastW) build(); }, 150);
      });
      mq.classList.add("is-looping");
      var t;
      mq.addEventListener("touchstart", function () { clearTimeout(t); mq.classList.add("is-paused"); }, { passive: true });
      mq.addEventListener("touchend", function () { t = setTimeout(function () { mq.classList.remove("is-paused"); }, 1500); }, { passive: true });
    });
  })();

})();
