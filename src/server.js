const http = require("node:http");
const https = require("node:https");
const { URL } = require("node:url");

const EXPLICIT_BACKENDS = `
cf.bebas11.workers.dev
cf.bebas9.workers.dev
avaritia.elvinrakus.workers.dev
urv-worker-cf.renaldisch.workers.dev
cf.buatvpn.workers.dev
cf.kebal1.workers.dev
cf.osianne23.workers.dev
wibu.wibucf6.workers.dev
cf.yeyay736.workers.dev
cf.andremith59.workers.dev
fajar.masfajar0004.workers.dev
cf.evintokes.workers.dev
rizaxyz.uddyalsh4.workers.dev
rizaxy.allieisozk96.workers.dev
cf.rneohler.workers.dev
cf.bebas12.workers.dev
ayata.ntls-bbd.workers.dev
ataay.ata-dd0.workers.dev
revil.re1-1f4.workers.dev
revil.atavip.workers.dev
zizifn.re2.workers.dev
zizifn.re3.workers.dev
cf.bebas13.workers.dev
cf.bebas14.workers.dev
cf.bebas15.workers.dev
cf.bebas16.workers.dev
cf.bebas17.workers.dev
cf.bebas18.workers.dev
cf.bebas19.workers.dev
my-worker.axwellllrich.workers.dev
revenge.revenge02821.workers.dev
dd-fathu.fathudede.workers.dev
cf.manutin.workers.dev
cf.janji1.workers.dev
cf.janji2.workers.dev
cf.janji3.workers.dev
cf.janji5.workers.dev
cf.janji6.workers.dev
cf.janji7.workers.dev
cf.janji8.workers.dev
cf.janji9.workers.dev
cf.janji10.workers.dev
cf.sosiisspahit.workers.dev
jokowi.hidupjokowi19.workers.dev
rizaxy.udy18.workers.dev
rizaxy.ett82.workers.dev
rizaxy.ilton89.workers.dev
rizaxy.entakin45.workers.dev
rizaxy.eoerge.workers.dev
rizaxy.heresa46.workers.dev
rizaxy.oriseffler.workers.dev
rizaxy.avonarber.workers.dev
rizaxy.on59.workers.dev
rizaxy.ohnnyeer.workers.dev
cfgw.ennethuettgen.workers.dev
cf.juangxx.workers.dev
agus041114.agus041117.workers.dev
rizaabc.immy48.workers.dev
rizaabc.lejandralick.workers.dev
rizaabc.eniferarter.workers.dev
rizaabc.rittanyunde13.workers.dev
rizaabc.shleyoyle.workers.dev
bonchell.riyanjibril227.workers.dev
yura.ontytracke.workers.dev
rizabc.arianne38.workers.dev
rizabcd.m4ptc5svia.workers.dev
rizabcd.herwood35.workers.dev
rizabcd.izeth83.workers.dev
cf.haxil71864.workers.dev
gmod.1a1.workers.dev
rizabc.orbinriesen19.workers.dev
rizabc.mmanuel79.workers.dev
v4riza.hari24.workers.dev
v4riza.oni10.workers.dev
v4riza.erritt98.workers.dev
v4riza.elipachoen7.workers.dev
v4riza.ealreiger10.workers.dev
v4riza.ridget88.workers.dev
v4riza.essicaarisian.workers.dev
v4riza.arshall94.workers.dev
v4riza.oseseynolds.workers.dev
v4riza.atthew32.workers.dev
v4.sosiisspahit.workers.dev
v4.agus041117.workers.dev
v4trondol.herman60.workers.dev
v4trondol.erson53.workers.dev
v4trondol.laineeilly.workers.dev
v4trondol.annerulauf.workers.dev
v4trondol.arren50.workers.dev
good.revenge02821.workers.dev
v4.juangxx.workers.dev
v4.clam25.workers.dev
gas2.paidk.workers.dev
gas2.goku1-653.workers.dev
gas2.goku2-c51.workers.dev
gas2.goku3-d78.workers.dev
gas2.goku7.workers.dev
gas2.goku25.workers.dev
gas1.goku28.workers.dev
gas2.goku24.workers.dev
v4.urtangworth.workers.dev
v4.homas18.workers.dev
v4.atum34.workers.dev
v4.nnaerde.workers.dev
v4.athy60.workers.dev
v4.ustinwift33.workers.dev
v4riza.rew56.workers.dev
v4riza.liaeil.workers.dev
v4riza.aishaacobi.workers.dev
v4riza.lonzo4.workers.dev
v4riza.rma48.workers.dev
v4riza.aleelorar.workers.dev
v4riza.ascalechimmel42.workers.dev
v4riza.raobel.workers.dev
v4riza.eanaskolski40.workers.dev
v4riza.bbie3.workers.dev
v4riza.ricka28.workers.dev
v4riza.erekbbott35.workers.dev
v4riza.kyeickinson28.workers.dev
freshv4.tera86654.workers.dev
v4riza.ewayne5.workers.dev
v4riza.raader.workers.dev
v4riza.ozelle19.workers.dev
v4riza.uellaerlach.workers.dev
v4riza.aisy6.workers.dev
v4riza.ony99.workers.dev
v4riza.ahsaanobel46.workers.dev
v4riza.lviseuschkeast.workers.dev
v4riza.ay26.workers.dev
v4riza.ash35.workers.dev
v4riza.anda44.workers.dev
v4riza.lbertaing82.workers.dev
v4riza.hilusikowski21.workers.dev
v4riza.einawaniawski79.workers.dev
v4riza.lmailler74.workers.dev
dimas-geo4.fahrulcrandy.workers.dev
lenn-geo4.violent13125.workers.dev
eginaailey.eginaailey.workers.dev
geo4.mahardika.workers.dev
geo4.masuk.workers.dev
geo4.aiaooley.workers.dev
g4riza.ribertoonnellyrady.workers.dev
g4riza.eoffreyeil45.workers.dev
g4riza.ellingtonalvorson.workers.dev
g4riza.ack6.workers.dev
g4riza.aqueltreich54.workers.dev
g4riza.rmahanahan22.workers.dev
g4riza.antosirthe33.workers.dev
g4riza.raulio30.workers.dev
g4riza.iolet0.workers.dev
g4riza.unaacyver37.workers.dev
modv4.mahardika.workers.dev
revenge28.revenge02821.workers.dev
vpn-node.sgmelbiskc.workers.dev
dewi.dewianida8.workers.dev
dewo.dewianida8.workers.dev
custom.1a1.workers.dev
ata.kukubukuku854.workers.dev
modgeo.msabaru56.workers.dev
taly.sgmelbiskc.workers.dev
geomodv5.clam25.workers.dev
vpn-node.lhubhuu321.workers.dev
vpn-node.samuelkason673.workers.dev
dewi8.dewianida8.workers.dev
vpn-node.agus041117.workers.dev
lll.agus041117.workers.dev
masfajar.pages.dev
we.masusilo.my.id
nauutica.fengwhuut.workers.dev
fengwhuut.fengwhuut.workers.dev
vpn-geo.fengwhuut.workers.dev
fenglikethis.fengwhuut.workers.dev
vpn.fengwhuut.workers.dev
cubatrytest.fengwhuut.workers.dev
fng.fengwhuut.workers.dev
geo.fengwhuut.workers.dev
nauticamod.fengwhuut.workers.dev
f32g.fengwhuut.workers.dev
fgfg.fengvpn.workers.dev
github.nizwara94-f3f.workers.dev
kluwut.fengvpn.workers.dev
vpn-wc.fengwhuut.workers.dev
cf.fgfg.web.id
cf-deploy.fengwhuut.workers.dev
cf-dashboard.fengwhuut.workers.dev
`
  .trim()
  .split(/\s+/);

const V4NM_LIFETIME = Array.from({ length: 78 }, (_, i) => {
  return `v4nm.lifetime${String(i + 1).padStart(2, "0")}.workers.dev`;
});

const V5GEO_LIFETIME = Array.from({ length: 77 }, (_, i) => {
  return `v5geo.lifetime${String(i + 2).padStart(2, "0")}.workers.dev`;
});

const DEFAULT_BACKENDS = [
  ...EXPLICIT_BACKENDS,
  ...V4NM_LIFETIME,
  ...V5GEO_LIFETIME,
];

const BACKENDS = [
  ...new Set(
    (process.env.BACKENDS
      ? process.env.BACKENDS.split(",")
      : DEFAULT_BACKENDS
    )
      .map((host) => host.trim())
      .filter(Boolean)
  ),
];

function pickBackend() {
  if (BACKENDS.length === 0) {
    throw new Error("BACKENDS is not configured");
  }
  return BACKENDS[Math.floor(Math.random() * BACKENDS.length)];
}

function proxy(req, res) {
  let backend;
  try {
    backend = pickBackend();
  } catch {
    res.writeHead(503, { "content-type": "text/plain; charset=utf-8" });
    res.end("No backend configured");
    return;
  }

  const incoming = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const target = new URL(`https://${backend}${incoming.pathname}${incoming.search}`);

  const headers = { ...req.headers };
  delete headers.host;

  const upstream = https.request(
    target,
    {
      method: req.method,
      headers,
    },
    (upstreamRes) => {
      res.writeHead(upstreamRes.statusCode || 502, upstreamRes.headers);
      upstreamRes.pipe(res);
    }
  );

  upstream.on("error", (err) => {
    if (!res.headersSent) {
      res.writeHead(502, { "content-type": "text/plain; charset=utf-8" });
    }
    res.end(`Upstream error: ${err.message}`);
  });

  req.pipe(upstream);
}

const port = Number(process.env.PORT || 8080);

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  proxy(req, res);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Hostless server listening on 0.0.0.0:${port}`);
});
