// Builds the whole page from the files in /data. Normally you never edit this file.
(function () {
  var S = SITE, $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var chips = function (a) { return a.length ? '<div class="chips">' + a.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("") + "</div>" : ""; };
  var pills = function (a) { return a.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join(""); };
  var img = function (src, alt, extra) { return '<img src="' + encodeURI(src) + '" alt="' + esc(alt) + '" loading="lazy"' + (extra || "") + ' onerror="this.remove()">'; };
  var byOrder = function (a, b) { return a.order - b.order; };
  var facts = function (t, a) { return "<h3>" + t + "</h3>" + a.map(function (e) { return "<div><b>" + esc(e.title) + "</b><small>" + esc(e.place) + ", " + esc(e.period) + "</small></div>"; }).join(""); };
  var STAT = { completed: "Completed", ongoing: "Ongoing", upcoming: "Upcoming" };
  var ACH = ACHIEVEMENTS.slice().sort(byOrder);

  // "general-perception/tree/main/x" -> page "general-perception/x/"
  var pageOf = function (p) { return p.repo ? S.pagesBase + p.repo.replace("tree/main/", "").replace(/\/$/, "") + "/" : ""; };

  function card(p) {
    var page = pageOf(p);
    var t = page ? '<a href="' + page + '">' + esc(p.title) + "</a>" : esc(p.title);
    var pic = img("images/projects/" + p.image, p.title, p.pos ? ' style="object-position:' + esc(p.pos) + '"' : "");
    var links = page ? '<a href="' + page + '">Project page</a><a href="' + S.githubBase + p.repo + '">GitHub</a>' : '<span class="soon">Coming soon</span>';
    return '<article class="card"><div class="cover">' + pic + '</div><div class="body"><span class="st ' + p.status + '">' + STAT[p.status] + "</span><h3>" + t + "</h3><p>" + esc(p.summary) + "</p>" +
      chips(p.tags) + '<div class="links">' + links + "</div></div></article>";
  }

  function drawProjects(f) {
    $("#grid").innerHTML = PROJECTS.slice().sort(byOrder).filter(function (p) { return f === "all" || p.status === f; }).map(card).join("");
  }

  function build() {
    var L = S.links, nav = [["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["achievements", "Achievements"], ["certificates", "Certificates"], ["contact", "Contact"]];
    $("#nav").innerHTML = nav.map(function (n) { return '<a href="#' + n[0] + '">' + n[1] + "</a>"; }).join("");

    var cur = S.currently.map(function (c) {
      var inner = "<b>" + (c.active ? "Active build" : "In progress") + "</b><h3>" + esc(c.title) + "</h3><p>" + esc(c.text) + "</p>";
      var p = PROJECTS.filter(function (x) { return x.id === c.slug && x.repo; })[0];
      return p ? '<a class="box' + (c.active ? " on" : "") + '" href="' + pageOf(p) + '">' + inner + "</a>" : '<div class="box' + (c.active ? " on" : "") + '">' + inner + "</div>";
    }).join("");

    var ach = ACH.map(function (a, i) {
      var th = a.photos.map(function (f) { return img("images/achievements/" + f, "", ""); }).join("");
      return '<article class="ach" tabindex="0" role="button" data-i="' + i + '" aria-label="Open details: ' + esc(a.title) + '"><div class="chips"><span>' + esc(a.badge) + "</span></div><h3>" + esc(a.title) + '</h3><p class="sub">' + esc(a.summary) + "</p><ul>" +
        a.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul><em>" + esc(a.note) + '</em><div class="thumbs">' + th + '<span class="more">View photos and details</span></div></article>';
    }).join("");

    var certs = CERTIFICATES.slice().sort(byOrder).map(function (c) {
      return '<div class="cert"><div class="ph">' + (c.image ? img("images/certificates/" + c.image, c.title, "") : "") + "</div><b>" + esc(c.title) + "</b>" +
        (c.issuer ? "<span>" + esc(c.issuer) + "</span>" : "") + (c.text ? "<span>" + esc(c.text) + "</span>" : "") + "</div>";
    }).join("");

    var btns = '<a class="btn p" href="mailto:' + S.email + '">Email me</a><a class="btn" href="' + L.github + '">GitHub</a><a class="btn" href="' + L.linkedin + '">LinkedIn</a>' +
      (L.youtube ? '<a class="btn" href="' + L.youtube + '">YouTube</a>' : "") + (L.resume ? '<a class="btn" href="' + L.resume + '">Resume</a>' : "");

    $("#app").innerHTML =
      '<div class="w" id="top"><div class="hero"><div><h1>' + esc(S.name) + '</h1><div class="role">' + esc(S.role) + '</div><p class="tag">' + esc(S.tagline) + '</p><p class="stat">' + esc(S.status) + "</p>" +
      '<a class="btn p" href="#projects">View projects</a><a class="btn" href="#contact">Get in touch</a></div><div class="me">VG' + img("images/hero/me.jpg", S.name, "") + "</div></div>" +

      '<section id="about"><h2>About</h2><div class="about"><div>' + S.about.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
      '</div><div class="facts">' + facts("Education", S.education) + facts("Experience", S.experience) + "<h3>Languages</h3><div>" + esc(S.languages.join(", ")) + "</div></div></div></section>" +

      '<section id="skills"><h2>Skills</h2><div class="skills">' + pills(S.skills) + '</div><div class="sec3"><div><h3>Hardware</h3><div class="skills">' + pills(S.hardware) +
      '</div></div><div><h3>Robots worked on</h3><div class="skills">' + pills(S.robots) + "</div></div></div></section>" +

      '<section id="current"><h2>Currently working on</h2><div class="cur">' + cur + "</div></section>" +

      '<section id="projects"><h2>Projects</h2><div class="filt" id="filt">' +
      ["all"].concat(["completed", "ongoing", "upcoming"].filter(function (s) { return PROJECTS.some(function (p) { return p.status === s; }); })).map(function (f) { return '<button class="btn" data-f="' + f + '" aria-pressed="' + (f === "all") + '">' + (f === "all" ? "All" : STAT[f]) + "</button>"; }).join("") +
      '</div><div class="grid" id="grid"></div></section>' +

      '<section id="achievements"><h2>Achievements</h2>' + ach + "</section>" +
      '<section id="certificates"><h2>Certificates</h2><div class="certs">' + certs + "</div></section>" +
      '<section id="contact" class="contact"><h2>Contact</h2><p class="sub">' + esc(S.contactText) + "</p>" + btns +
      '<p class="sub" style="margin-top:10px">' + esc(S.phone) + "</p></section></div>";

    $("#foot").textContent = "\u00A9 " + new Date().getFullYear() + " " + S.name;
    drawProjects("all");
    $("#filt").onclick = function (e) {
      var b = e.target.closest("button"); if (!b) return;
      this.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
      drawProjects(b.dataset.f);
    };
  }

  build();

  /* ---- Achievement viewer (pop-up on the same page) ---- */
  var md = document.createElement("div");
  md.className = "md"; md.setAttribute("role", "dialog"); md.setAttribute("aria-modal", "true");
  md.innerHTML = '<div class="mdbox"><button class="x" aria-label="Close">&times;</button><div class="view"><div class="stage"><button class="arr l" aria-label="Previous photo">&#8249;</button><img alt=""><button class="arr r" aria-label="Next photo">&#8250;</button></div><div class="strip"></div></div><div class="info"></div></div>';
  document.body.appendChild(md);
  var cur = null, n = 0, stage = $(".stage img", md), strip = $(".strip", md);

  function show(k) {
    var L = cur.photos.length; if (!L) return;
    n = (k + L) % L;
    stage.src = encodeURI("images/achievements/" + cur.photos[n]);
    strip.querySelectorAll("img").forEach(function (im, j) { im.classList.toggle("on", j === n); });
  }
  function openA(i, back) {
    cur = ACH[i]; md._back = back;
    $(".info", md).innerHTML = '<div class="chips"><span>' + esc(cur.badge) + "</span></div><h3>" + esc(cur.title) + '</h3><p class="sub">' + esc(cur.summary) + "</p><h4>" + esc(cur.pointsTitle || "What I worked on") + "</h4><ul>" +
      cur.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul><em>" + esc(cur.note) + "</em>";
    strip.innerHTML = cur.photos.map(function (f, j) { return '<img src="' + encodeURI("images/achievements/" + f) + '" alt="Photo ' + (j + 1) + '" data-j="' + j + '" onerror="this.remove()">'; }).join("");
    md.classList.toggle("single", cur.photos.length < 2);
    md.classList.toggle("nophoto", !cur.photos.length);
    show(0); md.classList.add("on"); document.body.style.overflow = "hidden"; $(".x", md).focus();
  }
  function closeA() { md.classList.remove("on"); document.body.style.overflow = ""; if (md._back) md._back.focus(); }

  md.addEventListener("click", function (e) {
    if (e.target === md || e.target.closest(".x")) closeA();
    else if (e.target.closest(".arr.l")) show(n - 1);
    else if (e.target.closest(".arr.r")) show(n + 1);
    else if (e.target.matches(".strip img")) show(+e.target.dataset.j);
  });

  /* ---- Certificate zoom ---- */
  var lb = $("#lb");
  document.addEventListener("click", function (e) {
    if (md.contains(e.target)) return;
    var a = e.target.closest(".ach");
    if (a) { openA(+a.dataset.i, a); return; }
    var c = e.target.closest(".cert"), im = c && $("img", c);
    if (im) { lb.querySelector("img").src = im.src; lb.classList.add("on"); }
    else if (lb.classList.contains("on")) lb.classList.remove("on");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { lb.classList.remove("on"); if (md.classList.contains("on")) closeA(); }
    else if (md.classList.contains("on") && e.key === "ArrowLeft") show(n - 1);
    else if (md.classList.contains("on") && e.key === "ArrowRight") show(n + 1);
    else if ((e.key === "Enter" || e.key === " ") && e.target.classList && e.target.classList.contains("ach")) { e.preventDefault(); openA(+e.target.dataset.i, e.target); }
  });
})();
