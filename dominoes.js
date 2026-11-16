// Easter egg: a row of dominoes at the foot of the page. When the cursor
// enters the area, a wrecking ball hangs from it on a short chain and can be
// swung into them. Once knocked over, they stay down.
// Physics: Planck.js (a port of Box2D), which handles domino chains well.
(function () {
  // Touch screens have no cursor to hang the ball from, so the strip is hidden
  // there (see style.css) and the physics library is never downloaded.
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/planck@1.0.6/dist/planck.min.js";
  script.onload = start;
  document.head.appendChild(script);

  function start() {
    var pl = planck, Vec2 = pl.Vec2;

    var canvas = document.getElementById("dominoes");
    var ctx = canvas.getContext("2d");
    var ink = getComputedStyle(document.documentElement)
      .getPropertyValue("--muted").trim() || "#5a6878";

    // Layout in CSS pixels; physics runs in metres at SCALE px per metre.
    var SCALE = 20;
    var HEIGHT = 220, GROUND = HEIGHT - 1;   // floor sits on the page's bottom edge
    var DOM_W = 7, DOM_H = 46, DOM_GAP = 26, DOM_COUNT = 13;
    var LINKS = 5, LINK_LEN = 16, BALL_R = 11; // chain is LINKS * LINK_LEN long
    var CHAIN = LINKS * LINK_LEN;
    var STEP = 1 / 240;                      // s
    // Strong "screen" gravity (3000 px/s²) so the ball feels heavy; at
    // real-world 10 m/s² any quick flick would throw it over the top.
    var GRAVITY = 150;                       // m/s²
    // The chain's anchor follows the cursor like a crane with some inertia:
    // it eases towards it (time constant FOLLOW) at no more than MAX_SPEED,
    // so it never stops dead and catapults the ball upwards.
    var FOLLOW = 0.05;                       // s
    var MAX_SPEED = 45;                      // m/s (900 px/s)

    var world, width, dominoes, rowLeft, rowRight;
    var anchor = null, links = [], ball = null;
    var pointer = null;

    // Pixel <-> world coordinates (world y points up from the floor).
    function toWorld(x, y) { return Vec2(x / SCALE, (GROUND - y) / SCALE); }
    function toPx(v) { return { x: v.x * SCALE, y: GROUND - v.y * SCALE }; }

    function sizeCanvas() {
      width = canvas.clientWidth;
      var dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = HEIGHT * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function build() {
      sizeCanvas();
      world = new pl.World({ gravity: Vec2(0, -GRAVITY) });
      // Floor wide enough for any screen, so resizing never needs a rebuild.
      world.createBody().createFixture(pl.Edge(Vec2(-1000, 0), Vec2(1000, 0)), { friction: 0.5 });

      dominoes = [];
      rowLeft = width / 2 - (DOM_COUNT - 1) * DOM_GAP / 2;
      rowRight = rowLeft + (DOM_COUNT - 1) * DOM_GAP;
      for (var i = 0; i < DOM_COUNT; i++) {
        var d = world.createDynamicBody({ position: toWorld(rowLeft + i * DOM_GAP, GROUND - DOM_H / 2) });
        d.createFixture(pl.Box(DOM_W / 2 / SCALE, DOM_H / 2 / SCALE), { density: 1, friction: 0.5 });
        dominoes.push(d);
      }
      anchor = ball = null;
      links = [];
    }

    // The chain spawns hanging straight down, so only spawn it where the ball
    // would be clear of the floor and the dominoes.
    function fits(p) {
      var by = p.y + CHAIN;
      var floor = GROUND - BALL_R - 2;
      var overRow = p.x > rowLeft - DOM_W - BALL_R && p.x < rowRight + DOM_W + BALL_R;
      return by <= (overRow ? floor - DOM_H : floor);
    }

    function addChain() {
      anchor = world.createKinematicBody({ position: toWorld(pointer.x, pointer.y) });
      var prev = anchor, noCollide = { filterMaskBits: 0 };
      links = [];
      for (var i = 0; i < LINKS; i++) {
        // Rigid links joined by pin joints; they don't collide with anything.
        // Kept within ~5x of the ball's mass, as Box2D chains go unstable when
        // a heavy body hangs from much lighter links.
        var link = world.createDynamicBody({
          position: toWorld(pointer.x, pointer.y + (i + 0.5) * LINK_LEN), angularDamping: 0.2
        });
        link.createFixture(pl.Box(1 / SCALE, LINK_LEN / 2 / SCALE),
          Object.assign({ density: 15 }, noCollide));
        world.createJoint(pl.RevoluteJoint({}, prev, link, toWorld(pointer.x, pointer.y + i * LINK_LEN)));
        links.push(link);
        prev = link;
      }
      // Damping stands in for air drag and joint friction, so swings die down.
      ball = world.createDynamicBody({
        position: toWorld(pointer.x, pointer.y + CHAIN), bullet: true, linearDamping: 0.3
      });
      ball.createFixture(pl.Circle(BALL_R / SCALE), { density: 6, friction: 0.2, restitution: 0.1 });
      world.createJoint(pl.RevoluteJoint({}, prev, ball, ball.getPosition()));
      // A heavy ball on light links makes Box2D chains stretch; a rope joint
      // capping the total length keeps it looking rigid (standard Box2D trick).
      world.createJoint(pl.RopeJoint({ maxLength: CHAIN / SCALE }, anchor, ball, anchor.getPosition(), ball.getPosition()));
    }

    function removeChain() {
      if (!anchor) return;
      [anchor, ball].concat(links).forEach(function (b) { world.destroyBody(b); });
      anchor = ball = null;
      links = [];
    }

    function toLocal(e) {
      var r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    canvas.addEventListener("pointermove", function (e) {
      pointer = toLocal(e);
      if (!anchor && fits(pointer)) addChain();
    });
    canvas.addEventListener("pointerleave", function () {
      pointer = null;
      removeChain();
    });

    function draw() {
      ctx.clearRect(0, 0, width, HEIGHT);
      ctx.fillStyle = ink;
      ctx.strokeStyle = ink;
      ctx.lineWidth = 1;

      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.moveTo(0, GROUND + 0.5);
      ctx.lineTo(width, GROUND + 0.5);
      ctx.stroke();

      ctx.globalAlpha = 0.8;
      dominoes.forEach(function (d) {
        var verts = d.getFixtureList().getShape().m_vertices;
        ctx.beginPath();
        verts.forEach(function (v, j) {
          var p = toPx(d.getWorldPoint(v));
          j ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
        });
        ctx.closePath();
        ctx.fill();
      });

      if (ball) {
        // Joint positions: the anchor, then the bottom end of each link.
        var half = Vec2(0, -LINK_LEN / 2 / SCALE);
        var pts = [toPx(anchor.getPosition())].concat(links.map(function (l) {
          return toPx(l.getWorldPoint(half));
        }));
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        pts.forEach(function (p, j) { j ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
        ctx.stroke();
        var b = toPx(ball.getPosition());
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(b.x, b.y, BALL_R, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Fixed physics step, decoupled from the display's frame rate.
    var acc = 0, last = performance.now();
    function tick(now) {
      acc += Math.min(now - last, 100) / 1000;
      last = now;
      var steps = Math.floor(acc / STEP);
      for (var k = 0; k < steps; k++) {
        if (anchor) {
          // Drive the anchor with a velocity (rather than teleporting it) so the
          // movement carries momentum down the chain.
          var target = toWorld(pointer.x, pointer.y), p = anchor.getPosition();
          var v = Vec2((target.x - p.x) / FOLLOW, (target.y - p.y) / FOLLOW);
          var speed = v.length();
          if (speed > MAX_SPEED) v.mul(MAX_SPEED / speed);
          anchor.setLinearVelocity(v);
        }
        world.step(STEP, 10, 10);
      }
      acc -= steps * STEP;

      draw();
      requestAnimationFrame(tick);
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      if (canvas.clientWidth === width) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        // Keep the dominoes as they are (standing or fallen), just re-centred.
        var old = width;
        removeChain();
        sizeCanvas();
        var dx = (width - old) / 2;
        rowLeft += dx; rowRight += dx;
        dominoes.forEach(function (d) {
          var p = d.getPosition();
          d.setTransform(Vec2(p.x + dx / SCALE, p.y), d.getAngle());
        });
      }, 150);
    });

    build();
    requestAnimationFrame(tick);
  }
})();
