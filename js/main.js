// Builds the whole page from the files in /data. Normally you never edit this file.
(function () {
  var S = SITE, $ = function (s) { return document.querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var chips = function (a) { return a.length ? '<div class="chips">' + a.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("") + "</div>" : ""; };
  var pills = function (a) { return a.map(function (x) { return '<span class="pill">' + esc(x) + "</span>"; }).join(" "); };
  var img = function (src, alt, zoom) { return '<img src="' + src + '" alt="' + esc(alt) + '" loading="lazy"' + (zoom ? " data-zoom" : "") + ' onerror="this.remove()">'; };
  var byOrder = function (a, b) { return a.order - b.order; };
  var facts = function (t, a) { return "<h3>" + t + "</h3>" + a.map(function (e) { return "<div><b>" + esc(e.title) + "</b><small>" + esc(e.place) + ", " + esc(e.period) + "</small></div>"; }).join(""); };
  var STAT = { completed: "Completed", ongoing: "Ongoing", upcoming: "Upcoming" };

  // "general-perception/tree/main/x" -> page "general-perception/x/"
  var pageOf = function (p) { return p.repo ? S.pagesBase + p.repo.replace("tree/main/", "").replace(/\/$/, "") + "/" : ""; };

  function card(p) {
    var page = pageOf(p);
    var t = page ? '<a href="' + page + '">' + esc(p.title) + "</a>" : esc(p.title);
    var cov = page ? '<a class="cover" href="' + page + '" aria-label="' + esc(p.title) + '">' : '<div class="cover">';
    var links = page ? '<a href="' + page + '">Project page</a><a href="' + S.githubBase + p.repo + '">GitHub</a>' : '<span class="soon">Coming soon</span>';
    return '<article class="card">' + cov + img("images/projects/" + p.id + ".jpg", p.title) + (page ? "</a>" : "</div>") +
      '<div class="body"><span class="st ' + p.status + '">' + STAT[p.status] + "</span><h3>" + t + "</h3><p>" + esc(p.summary) + "</p>" +
      chips(p.tags) + '<div class="links">' + links + "</div></div></article>";
  }

  function drawProjects(f) {
    $("#grid").innerHTML = PROJECTS.slice().sort(byOrder).filter(function (p) { return f === "all" || p.status === f; }).map(card).join("");
  }

  function build() {
    var L = S.links, nav = [["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["achievements", "Achievements"], ["certificates", "Certificates"], ["contact", "Contact"]];
    $("#nav").innerHTML = nav.map(function (n) { return '<a href="#' + n[0] + '">' + n[1] + "</a>"; }).join("");

    var cur = S.currently.map(function (c) {
      var tag = c.active ? "Active build" : "In progress";
      var inner = "<b>" + tag + "</b><h3>" + esc(c.title) + "</h3><p>" + esc(c.text) + "</p>";
      var p = PROJECTS.filter(function (x) { return x.id === c.slug && x.repo; })[0];
      return p ? '<a class="box' + (c.active ? " on" : "") + '" href="' + pageOf(p) + '">' + inner + "</a>" : '<div class="box' + (c.active ? " on" : "") + '">' + inner + "</div>";
    }).join("");

    var ach = ACHIEVEMENTS.slice().sort(byOrder).map(function (a) {
      var pics = ""; for (var i = 1; i <= a.photos; i++) pics += img("images/achievements/" + a.id + "-" + i + ".jpg", a.title + " photo " + i, true);
      return '<article class="ach"><div class="chips"><span>' + esc(a.badge) + "</span></div><h3>" + esc(a.title) + '</h3><p class="sub">' + esc(a.summary) + "</p><ul>" +
        a.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul><em>" + esc(a.note) + '</em><div class="pics">' + pics + "</div></article>";
    }).join("");

    var certs = CERTIFICATES.slice().sort(byOrder).map(function (c) {
      return '<div class="cert"><div class="ph">' + img("images/certificates/" + c.id + ".jpg", c.title, true) + "</div><b>" + esc(c.title) + "</b>" +
        (c.issuer ? "<span>" + esc(c.issuer) + "</span>" : "") + (c.text ? "<span>" + esc(c.text) + "</span>" : "") + "</div>";
    }).join("");

    var btns = '<a class="btn p" href="mailto:' + S.email + '">Email me</a><a class="btn" href="' + L.github + '">GitHub</a><a class="btn" href="' + L.linkedin + '">LinkedIn</a>' +
      (L.youtube ? '<a class="btn" href="' + L.youtube + '">YouTube</a>' : "") + (L.resume ? '<a class="btn" href="' + L.resume + '">Resume</a>' : "");

    $("#app").innerHTML =
      '<div class="w" id="top"><div class="hero"><div><h1>' + esc(S.name) + '</h1><div class="role">' + esc(S.role) + '</div><p class="tag">' + esc(S.tagline) + '</p><p class="stat">' + esc(S.status) + "</p>" +
      chips(S.heroTags) + '<a class="btn p" href="#projects">View projects</a><a class="btn" href="#contact">Get in touch</a></div><div class="me">VG' + img("images/hero/me.jpg", S.name) + "</div></div>" +

      '<section id="about"><h2>About</h2><div class="about"><div>' + S.about.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("") +
      '</div><div class="facts">' + facts("Education", S.education) + facts("Experience", S.experience) + "<h3>Languages</h3><div>" + esc(S.languages.join(", ")) + "</div></div></div></section>" +

      '<section id="skills"><h2>Skills</h2><div class="skills">' + pills(S.skills).replace(/<span class="pill">/g, "<span>") + '</div><div class="sec3"><div><h3>Hardware</h3><div class="skills">' + pills(S.hardware).replace(/<span class="pill">/g, "<span>") +
      '</div></div><div><h3>Robots worked on</h3><div class="skills">' + pills(S.robots).replace(/<span class="pill">/g, "<span>") + "</div></div></div></section>" +

      '<section id="current"><h2>Currently working on</h2><div class="cur">' + cur + "</div></section>" +

      '<section id="projects"><h2>Projects</h2><div class="filt" id="filt">' +
      ["all"].concat(["completed", "ongoing", "upcoming"].filter(function (s) { return PROJECTS.some(function (p) { return p.status === s; }); })).map(function (f) { return '<button class="btn" data-f="' + f + '" aria-pressed="' + (f === "all") + '">' + (f === "all" ? "All" : STAT[f]) + "</button>"; }).join("") +
      '</div><div class="grid" id="grid"></div></section>' +

      '<section id="achievements"><h2>Achievements</h2>' + ach + "</section>" +
      '<section id="certificates"><h2>Certificates</h2><div class="certs">' + certs + "</div></section>" +
      '<section id="contact" class="contact"><h2>Contact</h2><p class="sub">Open to robotics internships, research collaborations and interesting problems. The quickest way to reach me is email.</p>' + btns +
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
  var lb = $("#lb");
  document.addEventListener("click", function (e) {
    if (e.target.matches("img[data-zoom]")) { lb.querySelector("img").src = e.target.src; lb.classList.add("on"); }
    else if (lb.classList.contains("on")) lb.classList.remove("on");
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.classList.remove("on"); });
})();
