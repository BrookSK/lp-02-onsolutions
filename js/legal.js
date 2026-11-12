/* ============================================================
   Paginas legais (LGPD e Politica de Privacidade)
   - Cada pagina tem chave propria de armazenamento (conteudos separados).
   - O conteudo salvo no editor (localStorage) substitui o padrao do HTML.
   - Texto sempre inserido via DOM/textContent (sem HTML injetado).
   Formato:
     linha em branco separa blocos
     "## Titulo"            -> subtitulo
     linhas "- item"        -> lista
     "Ultima atualizacao: " -> selo de data
     **texto**              -> negrito
     quebra de linha simples dentro do bloco -> <br>
   ============================================================ */
(function () {
  "use strict";

  var PREFIX = "on_legal_v1:";
  var CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>';

  // Insere texto com **negrito** e quebras de linha, sempre via nos de texto
  function inline(el, text) {
    text.split("\n").forEach(function (line, i) {
      if (i) el.appendChild(document.createElement("br"));
      line.split("**").forEach(function (part, j) {
        if (!part) return;
        if (j % 2) { var s = document.createElement("strong"); s.textContent = part; el.appendChild(s); }
        else el.appendChild(document.createTextNode(part));
      });
    });
  }

  window.ONLegal = {
    key: function (page) { return PREFIX + page; },
    load: function (page) {
      try {
        var raw = window.localStorage.getItem(PREFIX + page);
        return raw ? JSON.parse(raw) : null;
      } catch (e) { return null; }
    },
    save: function (page, data) {
      window.localStorage.setItem(PREFIX + page, JSON.stringify({
        title: String(data.title || ""),
        body: String(data.body || ""),
        updated: new Date().toISOString()
      }));
    },
    reset: function (page) { window.localStorage.removeItem(PREFIX + page); },
    render: function (container, data) {
      container.textContent = "";
      String(data.body).replace(/\r\n/g, "\n").split(/\n{2,}/).forEach(function (blk) {
        blk = blk.trim();
        if (!blk) return;
        var el, lines = blk.split("\n");
        if (blk.indexOf("## ") === 0) { el = document.createElement("h2"); inline(el, blk.slice(3)); }
        else if (/^Última atualização:/i.test(blk)) {
          el = document.createElement("div"); el.className = "upd";
          el.innerHTML = CAL; // constante interna, sem dados do usuario
          el.appendChild(document.createTextNode(blk));
        }
        else if (lines.every(function (l) { return l.indexOf("- ") === 0; })) {
          el = document.createElement("ul");
          lines.forEach(function (l) { var li = document.createElement("li"); inline(li, l.slice(2)); el.appendChild(li); });
        }
        else { el = document.createElement("p"); inline(el, blk); }
        container.appendChild(el);
      });
    }
  };

  // Pagina publica: aplica o conteudo salvo, se existir
  var box = document.querySelector("[data-legal]");
  if (box) {
    var page = box.getAttribute("data-legal");
    var saved = window.ONLegal.load(page);
    if (saved && saved.title && saved.body) {
      window.ONLegal.render(box, saved);
      document.querySelectorAll("[data-legal-title]").forEach(function (n) { n.textContent = saved.title; });
      document.title = saved.title + " | ON Solutions Brasil";
    }
  }
})();
