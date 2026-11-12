/* ============================================================
   Paginas legais (LGPD e Politica de Privacidade)
   - Cada pagina tem chave propria de armazenamento (conteudos separados).
   - O conteudo salvo no editor (localStorage) substitui o padrao do HTML.
   - Texto sempre inserido via textContent (sem HTML injetado).
   Formato: linha em branco separa paragrafos; linha iniciada com "## " vira subtitulo.
   ============================================================ */
(function () {
  "use strict";

  var PREFIX = "on_legal_v1:";

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
      var h = document.createElement("h1");
      h.className = "t2 legal-h";
      h.textContent = data.title;
      container.appendChild(h);
      String(data.body).replace(/\r\n/g, "\n").split(/\n{2,}/).forEach(function (blk) {
        blk = blk.trim();
        if (!blk) return;
        var el;
        if (blk.indexOf("## ") === 0) { el = document.createElement("h2"); el.textContent = blk.slice(3); }
        else { el = document.createElement("p"); el.textContent = blk; }
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
      document.title = saved.title + " | ON Solutions Brasil";
    }
  }
})();
