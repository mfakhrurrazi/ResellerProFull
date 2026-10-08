/**
 * Tampilan.gs — seluruh antarmuka ResellerPro (HTML + CSS + JS klien) dalam satu file.
 * Dipanggil dari doGet() di Code.gs melalui tampilanHtml_().
 *
 * Catatan pengembang: konten memakai String.raw, jadi JANGAN menulis backtick atau "${" di dalamnya.
 * Semua data dinamis di-escape lewat esc()/T() di sisi klien; server tidak pernah mengirim HTML mentah
 * (kecuali label A6 yang di-escape di server dan ditampilkan di iframe srcdoc).
 */
function tampilanHtml_(init) {
  const boot = JSON.stringify({ page: init.page || '', id: init.id || '' }).replace(/</g, '\\u003c');
  return TAMPILAN_HEAD_ + '<style>' + TAMPILAN_CSS_ + '</style></head><body>' + TAMPILAN_BODY_ +
    '<script>var INIT=' + boot + ';</script><script>' + TAMPILAN_JS_ + '</script></body></html>';
}

const TAMPILAN_HEAD_ = String.raw`<!DOCTYPE html><html lang="id"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>`;

const TAMPILAN_CSS_ = String.raw`
:root{--p:#8B5CF6;--s:#EC4899;--a:#06B6D4;--bg:#F6F3FF;--tx:#1E1B2E;--mu:#6B6784;--cd:#fff;--bd:#E9E4FB;--r:16px;--sh:0 8px 28px rgba(139,92,246,.14);--ok:#16A34A;--warn:#F59E0B}
*{box-sizing:border-box}
body{margin:0;font-family:'Poppins',system-ui,sans-serif;background:var(--bg);color:var(--tx);font-size:14px;min-height:100vh;display:flex;flex-direction:column}
.hidden{display:none!important}
a{color:var(--p)}
.hdr{position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:10px 16px;background:linear-gradient(90deg,#8B5CF6,#EC4899);color:#fff;box-shadow:0 4px 18px rgba(139,92,246,.35)}
.brand{display:flex;align-items:center;gap:10px;min-width:0;flex:1}
.brand b{display:block;font-size:15px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.brand>div{min-width:0}
.brand small{opacity:.9;font-size:11px;font-weight:600;letter-spacing:.5px}
.logo{width:40px;height:40px;border-radius:12px;background:#fff;color:var(--p);display:grid;place-items:center;font-weight:700;font-size:18px;overflow:hidden;flex:none;box-shadow:0 2px 8px rgba(0,0,0,.15)}
.logo img{width:100%;height:100%;object-fit:cover}
.maker{flex:none;background:rgba(255,255,255,.22);border:1px solid rgba(255,255,255,.5);padding:4px 10px;border-radius:999px;font-size:11px;font-weight:600;white-space:nowrap}
.hbtn{background:rgba(255,255,255,.2);color:#fff;border:0;border-radius:12px;min-height:44px;padding:0 14px;font:600 13px Poppins;cursor:pointer;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.shell{display:flex;flex:1;min-height:0}
.side{width:236px;flex:none;background:#fff;border-right:1px solid var(--bd);padding:14px 10px;position:sticky;top:64px;height:calc(100vh - 64px);overflow:auto}
.side a{display:flex;align-items:center;gap:10px;min-height:44px;padding:0 12px;border-radius:12px;color:var(--tx);text-decoration:none;font-weight:500;cursor:pointer;margin-bottom:2px;transition:.15s}
.side a:hover{background:#F3EEFF}.side a.on{background:linear-gradient(90deg,var(--p),var(--s));color:#fff;box-shadow:0 6px 16px rgba(139,92,246,.3)}
.view{flex:1;min-width:0;padding:18px 16px 90px;max-width:1180px;margin:0 auto;width:100%}
.bnav{display:none}
.pg-h{margin-bottom:14px}.pg-h h1{margin:0;font-size:22px}.pg-h p{margin:2px 0 0;color:var(--mu)}
.card{background:var(--cd);border-radius:var(--r);box-shadow:var(--sh);padding:16px;margin-bottom:14px;animation:pop .25s ease}
@keyframes pop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.card h3{margin:0 0 10px;font-size:15px}
.grid{display:grid;gap:12px}.g2{grid-template-columns:repeat(2,1fr)}.g3{grid-template-columns:repeat(3,1fr)}.g4{grid-template-columns:repeat(4,1fr)}
.row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.sp{flex:1}
label{display:block;font-size:12px;font-weight:600;color:var(--mu);margin:8px 0 4px}
input,select,textarea{width:100%;min-height:44px;padding:10px 12px;border:1.5px solid var(--bd);border-radius:12px;font:14px Poppins;background:#fff;color:var(--tx)}
input[type=checkbox]{width:22px;min-height:22px;height:22px}
textarea{resize:vertical}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--p);box-shadow:0 0 0 3px rgba(139,92,246,.18)}
.btn{min-height:44px;padding:0 16px;border-radius:12px;border:1.5px solid var(--bd);background:#fff;color:var(--tx);font:600 13px Poppins;cursor:pointer;transition:.15s;display:inline-flex;align-items:center;gap:6px;text-decoration:none;justify-content:center}
.btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,.08)}
.btn.pri{background:linear-gradient(90deg,var(--p),var(--s));color:#fff;border:0}
.btn.acc{background:var(--a);color:#fff;border:0}.btn.dng{background:#FEE2E2;color:#B91C1C;border:0}.btn.sm{min-height:44px;padding:0 12px}
.btn.wa{background:#25D366;color:#fff;border:0}
.chip{display:inline-block;background:#CFFAFE;color:#0E7490;border-radius:999px;padding:3px 10px;font-size:11px;font-weight:600}
.chip.v{background:#EDE9FE;color:#6D28D9}.chip.p{background:#FCE7F3;color:#BE185D}.chip.g{background:#F1F5F9;color:#475569}
.stk{display:inline-block;padding:3px 10px;border-radius:8px;font-size:11px;font-weight:700;border:2px solid currentColor;transform:rotate(-2deg);box-shadow:2px 2px 0 rgba(0,0,0,.08);white-space:nowrap}
.st-Baru{color:#0369A1;background:#E0F2FE}.st-Diproses{color:#B45309;background:#FEF3C7}.st-Dikemas{color:#6D28D9;background:#EDE9FE}.st-Dikirim{color:#0E7490;background:#CFFAFE}.st-Selesai{color:#15803D;background:#DCFCE7}.st-Retur{color:#B91C1C;background:#FEE2E2}
.pay-Lunas{color:#15803D;background:#DCFCE7}.pay-DP{color:#B45309;background:#FEF3C7}.pay-BelumBayar{color:#BE185D;background:#FCE7F3}
.ai-b{display:inline-flex;gap:4px;padding:3px 10px;border-radius:8px;font-size:11px;font-weight:700;background:linear-gradient(90deg,var(--p),var(--s));color:#fff;transform:rotate(-2deg)}
.ai-off{background:#E2E8F0;color:#475569}
.kpi{position:relative;overflow:hidden}.kpi small{color:var(--mu);font-weight:600}.kpi b{display:block;font-size:24px;margin-top:4px}.kpi i{position:absolute;right:-6px;top:-10px;font-size:52px;opacity:.13;font-style:normal}
.kpi.k1{border-top:4px solid var(--p)}.kpi.k2{border-top:4px solid var(--s)}.kpi.k3{border-top:4px solid var(--a)}.kpi.k4{border-top:4px solid var(--ok)}
table{width:100%;border-collapse:collapse}th{text-align:left;font-size:12px;color:var(--mu);padding:8px;border-bottom:2px solid var(--bd)}td{padding:10px 8px;border-bottom:1px solid var(--bd);vertical-align:middle}
.tr{text-align:right}
.board{display:flex;gap:12px;overflow-x:auto;padding-bottom:10px;scroll-snap-type:x mandatory}
.col{flex:0 0 280px;background:#EFEAFE;border-radius:var(--r);padding:10px;scroll-snap-align:start;max-height:70vh;overflow:auto}
.col h4{margin:2px 4px 10px;display:flex;justify-content:space-between;align-items:center}
.oc{background:#fff;border-radius:14px;padding:12px;margin-bottom:10px;box-shadow:0 3px 10px rgba(139,92,246,.1)}
.oc .t{display:flex;justify-content:space-between;gap:6px;font-weight:600}.oc .m{color:var(--mu);font-size:12px;margin:3px 0}
.oc .b{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.irow{display:grid;grid-template-columns:1fr 70px 110px 44px;gap:8px;align-items:end;padding:10px;border-radius:12px;border:1.5px solid var(--bd);margin-bottom:8px}
.irow.unk{border:2px dashed var(--s);background:#FFF1F8}.irow .hint{grid-column:1/-1;color:#BE185D;font-size:12px;font-weight:600}
.empty{text-align:center;padding:26px 10px;color:var(--mu)}.empty svg{width:130px;height:auto;animation:float 3s ease-in-out infinite}
@keyframes float{50%{transform:translateY(-6px)}}
.spinner{width:46px;height:46px;border-radius:50%;border:5px solid #fff;border-top-color:var(--s);border-right-color:var(--p);animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.ovl{position:fixed;inset:0;background:rgba(30,27,46,.35);display:grid;place-items:center;z-index:90}
#toast{position:fixed;left:50%;bottom:86px;transform:translateX(-50%);z-index:95;display:flex;flex-direction:column;gap:8px;width:min(92vw,420px)}
.tst{background:#1E1B2E;color:#fff;padding:12px 16px;border-radius:12px;animation:pop .2s;box-shadow:var(--sh)}.tst.err{background:#B91C1C}.tst.ok{background:#15803D}
.mb{position:fixed;inset:0;background:rgba(30,27,46,.5);z-index:80;display:flex;align-items:center;justify-content:center;padding:12px}
.md{background:#fff;border-radius:var(--r);width:min(640px,100%);max-height:92vh;overflow:auto;padding:18px;animation:pop .2s}
.md h3{margin:0 0 6px;font-size:17px}
.cf{position:fixed;top:-20px;width:10px;height:14px;z-index:99;animation:fall 2.4s ease-in forwards;pointer-events:none}
@keyframes fall{to{transform:translateY(105vh) rotate(720deg);opacity:.8}}
.ftr{background:#fff;border-top:1px solid var(--bd);padding:16px;text-align:center;font-size:12px;color:var(--mu);margin-bottom:0}
.ftr .fl{display:flex;flex-wrap:wrap;gap:6px 14px;justify-content:center;margin-top:6px}.ftr a{cursor:pointer;text-decoration:none;font-weight:600}
.tabs{display:flex;gap:8px;margin-bottom:12px;overflow-x:auto}.tabs button{flex:none}.tabs .on{background:linear-gradient(90deg,var(--p),var(--s));color:#fff;border:0}
.res{white-space:pre-wrap;background:#F8F5FF;border:1.5px dashed var(--p);border-radius:12px;padding:12px;margin-top:10px}
.login{max-width:400px;margin:24px auto}
details{background:#fff;border-radius:12px;padding:12px 14px;margin-bottom:8px;box-shadow:var(--sh)}summary{font-weight:600;cursor:pointer;min-height:24px}
.hero{background:linear-gradient(135deg,var(--p),var(--s));color:#fff;border-radius:22px;padding:28px 20px;margin-bottom:14px}.hero h1{margin:0 0 6px}
iframe.pv{width:100%;height:520px;border:1.5px solid var(--bd);border-radius:12px;background:#fff}
@media(max-width:767px){
 .side{display:none}.maker{font-size:10px;padding:3px 8px}.un{display:none}.hbtn{padding:0 12px}.kpi b{font-size:18px}.g2,.g3,.g4{grid-template-columns:1fr}.g4.kp{grid-template-columns:1fr 1fr}
 .bnav{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:45;background:#fff;border-top:1px solid var(--bd);box-shadow:0 -6px 20px rgba(139,92,246,.15);padding:4px 4px calc(4px + env(safe-area-inset-bottom))}
 .bnav a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:52px;font-size:10px;font-weight:600;color:var(--mu);text-decoration:none;cursor:pointer;border-radius:12px}
 .bnav a span{font-size:20px}.bnav a.on{color:var(--p)}.bnav a.fab span{background:linear-gradient(135deg,var(--p),var(--s));color:#fff;width:48px;height:48px;border-radius:50%;display:grid;place-items:center;margin-top:-22px;box-shadow:0 6px 16px rgba(236,72,153,.45)}
 .view{padding-bottom:110px}.col{flex-basis:84%}
 table.rt thead{display:none}table.rt tr{display:block;background:#fff;border:1px solid var(--bd);border-radius:14px;margin-bottom:10px;padding:6px 10px}
 table.rt td{display:flex;justify-content:space-between;gap:10px;border:0;padding:6px 0;text-align:right}table.rt td:before{content:attr(data-l);font-weight:600;color:var(--mu);text-align:left}
 .irow{grid-template-columns:1fr 1fr}.irow .pr{grid-column:auto}.md{align-self:flex-end;border-bottom-left-radius:0;border-bottom-right-radius:0}.mb{align-items:flex-end;padding:0}
}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

const TAMPILAN_BODY_ = String.raw`
<header class="hdr">
  <div class="brand"><span class="logo" id="logo">R</span><div><b id="bizName">Toko Saya</b><small>ResellerPro</small></div></div>
  <span class="maker">Made by Piyu</span>
  <button class="hbtn hidden" id="userBtn" data-act="userMenu">👤</button>
</header>
<div class="shell"><aside class="side hidden" id="side"></aside><main class="view" id="view"></main></div>
<nav class="bnav hidden" id="bnav"></nav>
<footer class="ftr">
  <div>© 2026 ResellerPro · Made by Piyu</div>
  <div class="fl"><span>v<span id="fVer">1.0.0</span></span>
    <a id="fWa" target="_blank" rel="noopener">💬 Support WhatsApp</a>
    <span>Lisensi: <span class="chip" id="fLic">—</span></span>
    <a data-act="go" data-p="guide">Panduan</a><a data-act="go" data-p="terms">Syarat Lisensi</a><a data-act="go" data-p="privacy">Kebijakan Privasi</a></div>
</footer>
<div class="ovl hidden" id="ovl"><div class="spinner"></div></div><div id="toast"></div><div id="modal"></div>
`;

const TAMPILAN_JS_ = String.raw`
var S={token:'',user:null,biz:{name:'Toko Saya',logo:''},lic:{},set:{},products:[],page:'',charts:[],app:{version:'1.0.0'},supportWa:''};
var A={},IN={},FM={},R={};
S.access={enabled:false,role:'Owner',readonly:false};
var $=function(s,r){return (r||document).querySelector(s)};
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function rp(n){return 'Rp '+String(Math.round(Number(n)||0)).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
function fd(iso){if(!iso)return '-';var p=String(iso).slice(0,10).split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:esc(iso)}
function T(t,o){return t.replace(/\{(!?)(\w+)\}/g,function(m,raw,k){var v=o[k];v=v==null?'':v;return raw?String(v):esc(v)})}
var store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}},del:function(k){try{localStorage.removeItem(k)}catch(e){}}};
var pending=0;function spin(d){pending=Math.max(0,pending+d);$('#ovl').classList.toggle('hidden',pending<=0)}
function toast(msg,type){var t=document.createElement('div');t.className='tst '+(type||'');t.textContent=msg;$('#toast').appendChild(t);setTimeout(function(){t.remove()},3800)}
function fail(e){toast(e&&e.message?e.message:'Terjadi kesalahan','err')}
function call(action,payload,quiet){return new Promise(function(res,rej){
  if(!quiet)spin(1);
  google.script.run.withSuccessHandler(function(r){if(!quiet)spin(-1);
    if(r&&r.ok){res(r.data)}else{if(r&&r.code==='AUTH'&&S.user){forceLogout()}var e=new Error((r&&r.error)||'Gagal');e.code=r&&r.code;rej(e)}})
  .withFailureHandler(function(e){if(!quiet)spin(-1);rej(new Error('Koneksi gagal: '+((e&&e.message)||e)))}).api(S.token,action,payload||{})})}
function modal(title,html,mount){$('#modal').innerHTML='<div class="mb" data-act="mbClose"><div class="md" role="dialog" aria-modal="true"><h3>'+esc(title)+'</h3>'+html+'</div></div>';if(mount)mount($('#modal .md'))}
function closeModal(){$('#modal').innerHTML=''}
function confetti(){var c=['#8B5CF6','#EC4899','#06B6D4','#F59E0B','#22C55E'];for(var i=0;i<70;i++){var d=document.createElement('div');d.className='cf';d.style.left=Math.random()*100+'vw';d.style.background=c[i%5];d.style.animationDelay=(Math.random()*.6)+'s';d.style.borderRadius=i%3?'2px':'50%';document.body.appendChild(d);(function(x){setTimeout(function(){x.remove()},3200)})(d)}}
function empty(msg){return '<div class="empty"><svg viewBox="0 0 160 120" aria-hidden="true"><defs><linearGradient id="eg" x1="0" x2="1"><stop offset="0" stop-color="#8B5CF6"/><stop offset="1" stop-color="#EC4899"/></linearGradient></defs><rect x="30" y="44" width="100" height="62" rx="12" fill="url(#eg)" opacity=".18"/><path d="M30 62h100l-14-24H44z" fill="url(#eg)" opacity=".5"/><rect x="62" y="70" width="36" height="8" rx="4" fill="#fff"/><circle cx="24" cy="30" r="5" fill="#06B6D4"/><circle cx="140" cy="24" r="4" fill="#EC4899"/><path d="M128 50l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#8B5CF6"/></svg><p>'+esc(msg)+'</p></div>'}
function stB(s){return '<span class="stk st-'+esc(String(s).replace(/\s/g,''))+'">'+esc(s)+'</span>'}
function payB(s){return '<span class="stk pay-'+esc(String(s).replace(/\s/g,''))+'">'+esc(s)+'</span>'}
function view(h){$('#view').innerHTML=h}
function fv(form){var o={};Array.prototype.forEach.call(form.elements,function(el){if(!el.name)return;o[el.name]=el.type==='checkbox'?el.checked:el.value});return o}
function dl(name,blob){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);a.remove()},500)}
function dlB64(name,b64,mime){var bin=atob(b64),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);dl(name,new Blob([u],{type:mime}))}
function waUrl(phone,text){var d=String(phone||'').replace(/\D/g,'');if(d.indexOf('0')===0)d='62'+d.slice(1);return 'https://wa.me/'+d+'?text='+encodeURIComponent(text)}
function opts(list,sel){return list.map(function(x){return '<option'+(x===sel?' selected':'')+'>'+esc(x)+'</option>'}).join('')}
var ST=['Baru','Diproses','Dikemas','Dikirim','Selesai','Retur'],PAY=['Belum Bayar','DP','Lunas'],CR=['JNE','J&T','SiCepat','AnterAja','Pos','Kurir Lokal'],MT=['Transfer','QRIS','COD'];
var NEXT={Baru:'Diproses',Diproses:'Dikemas',Dikemas:'Dikirim',Dikirim:'Selesai'};
function isOwner(){return S.user&&S.user.role==='Owner'}
function isPub(){return !!(S.user&&S.user.public)}
function aiBadge(src){return src==='ai'?'<span class="ai-b">✨ Dibantu AI</span>':'<span class="ai-b ai-off">AI tidak aktif</span>'}

/* ---------- navigasi ---------- */
var NAV=[['dashboard','📊','Dashboard'],['order-new','🛒','Order Baru'],['board','🗂️','Papan Order'],['customers','👥','Pelanggan'],['payments','💳','Pembayaran'],['products','📦','Produk'],['suppliers','🏭','Supplier','O'],['label','🏷️','Cetak Label'],['reports','📈','Laporan','O'],['ai','✨','Asisten AI'],['settings','⚙️','Pengaturan','O'],['guide','📖','Panduan'],['license','🔑','Lisensi'],['about','💜','Tentang Aplikasi']];
var PUBLIC={login:1,guide:1,about:1,terms:1,privacy:1},OWNER_ONLY={suppliers:1,reports:1,settings:1,wizard:1};
function navFor(){return NAV.filter(function(n){return !n[3]||isOwner()})}
function buildNav(){
  $('#side').innerHTML=navFor().map(function(n){return '<a data-act="go" data-p="'+n[0]+'" id="sn-'+n[0]+'"><span>'+n[1]+'</span>'+esc(n[2])+'</a>'}).join('');
  var b=[['dashboard','📊','Beranda'],['board','🗂️','Papan'],['order-new','🛒','Order','fab'],['customers','👥','Pelanggan'],['more','☰','Menu']];
  $('#bnav').innerHTML=b.map(function(n){return '<a data-act="'+(n[0]==='more'?'more':'go')+'" data-p="'+n[0]+'" id="bn-'+n[0]+'" class="'+(n[3]||'')+'"><span>'+n[1]+'</span>'+esc(n[2])+'</a>'}).join('')}
A.more=function(){modal('Menu','<div class="grid g2">'+navFor().map(function(n){return '<button class="btn" data-act="go" data-p="'+n[0]+'">'+n[1]+' '+esc(n[2])+'</button>'}).join('')+'</div>')};
A.mbClose=function(d,el,e){if(e.target===el)closeModal()};
A.go=function(d){closeModal();go(d.p,d.id)};
function chrome(){
  $('#bizName').textContent=S.biz.name;var lg=$('#logo');lg.innerHTML='';
  if(S.biz.logo&&/^https?:\/\//i.test(S.biz.logo)){var im=document.createElement('img');im.src=S.biz.logo;im.alt='Logo';im.onerror=function(){lg.textContent=(S.biz.name||'R').charAt(0).toUpperCase()};lg.appendChild(im)}else lg.textContent=(S.biz.name||'R').charAt(0).toUpperCase();
  $('#fVer').textContent=S.app.version;$('#fLic').textContent=S.lic.label||'—';
  var wa=String(S.supportWa||'').replace(/\D/g,'');$('#fWa').href='https://wa.me/'+wa+'?text='+encodeURIComponent('Halo support ResellerPro');
  var loggedIn=!!S.user;$('#userBtn').classList.toggle('hidden',!loggedIn);$('#side').classList.toggle('hidden',!loggedIn);$('#bnav').classList.toggle('hidden',!loggedIn);
  if(loggedIn){$('#userBtn').innerHTML=(isPub()?'🌐':'👤')+'<span class="un"> '+esc(S.user.name)+'</span>';buildNav()}}
function go(p,arg){
  if(!S.user&&!PUBLIC[p])p='login';
  if(S.user&&OWNER_ONLY[p]&&!isOwner()){toast('Fitur ini hanya untuk Owner','err');p='dashboard'}
  if(!R[p])p=S.user?'dashboard':'login';
  S.charts.forEach(function(c){try{c.destroy()}catch(e){}});S.charts=[];S.page=p;
  Array.prototype.forEach.call(document.querySelectorAll('.side a,.bnav a'),function(a){a.classList.remove('on')});
  var s=$('#sn-'+p),b=$('#bn-'+p);if(s)s.classList.add('on');if(b)b.classList.add('on');
  window.scrollTo(0,0);R[p]($('#view'),arg)}
function forceLogout(){S.token='';S.user=null;store.del('rp_tok');chrome();toast('Sesi berakhir, silakan login lagi','err');go('login')}
A.userMenu=function(){if(isPub())return modal('Mode Publik','<p><span class="chip v">'+esc(S.user.role)+'</span> '+(S.access.readonly?'<span class="chip p">hanya-baca</span>':'<span class="chip">baca &amp; ubah</span>')+'</p><p style="color:var(--mu)">Siapa pun yang punya link bisa memakai aplikasi ini tanpa login. Ingin memakai akun sendiri?</p><div class="grid"><button class="btn pri" data-act="pubLogin">🔑 Masuk dengan akun</button><button class="btn" data-act="go" data-p="license">Lisensi</button></div>');
  modal(S.user.name,'<p><span class="chip v">'+esc(S.user.role)+'</span> @'+esc(S.user.username)+'</p><div class="grid"><button class="btn" data-act="chpw">🔒 Ganti Password</button><button class="btn" data-act="go" data-p="license">🔑 Lisensi</button><button class="btn dng" data-act="logout">🚪 Keluar</button></div>')};
A.pubLogin=function(){closeModal();S.token='';S.user=null;S.showLogin=true;chrome();go('login')};
A.logout=function(){closeModal();call('logout').catch(function(){}).then(function(){S.token='';S.user=null;store.del('rp_tok');chrome();if(S.access.enabled){S.showLogin=false;afterLogin().catch(fail)}else go('login')})};
A.chpw=function(){modal('Ganti Password','<form data-form="chpw"><label>Password lama</label><input type="password" name="old_password" required autocomplete="current-password"><label>Password baru (min. 8 karakter)</label><input type="password" name="new_password" minlength="8" required autocomplete="new-password"><div class="row" style="margin-top:12px"><button class="btn pri">Simpan</button><button type="button" class="btn" data-act="closeModal">Batal</button></div></form>')};
A.closeModal=closeModal;
FM.chpw=function(f){call('changePassword',fv(f)).then(function(){closeModal();toast('Password diubah','ok')}).catch(fail)};

/* ---------- login ---------- */
R.login=function(){view('<div class="card login"><div class="empty" style="padding:6px">'+empty('').replace('<p></p>','')+'</div><h2 style="text-align:center;margin:0">Masuk ke ResellerPro</h2><p style="text-align:center;color:var(--mu)">Ubah chat WhatsApp jadi pesanan & pengiriman.</p><form data-form="login"><label>Username</label><input name="username" autocomplete="username" required maxlength="40"><label>Password</label><input type="password" name="password" autocomplete="current-password" required><button class="btn pri" style="width:100%;margin-top:14px">Masuk</button></form>'+(S.access.enabled?'<p style="text-align:center"><button type="button" class="btn" data-act="pubBack">🌐 Lanjut tanpa login</button></p>':'')+(S.needSetup?'<p class="chip p" style="margin-top:12px">Database belum siap — jalankan setupDatabase() di editor Apps Script.</p>':'')+'</div>')};
A.pubBack=function(){S.showLogin=false;afterLogin().catch(fail)};
FM.login=function(f){call('login',fv(f)).then(function(d){S.token=d.token;S.user=d.user;store.set('rp_tok',d.token);return afterLogin()}).catch(fail)};
function afterLogin(){
  return call('me').then(function(d){S.user=d.user;S.set=d.settings;S.lic=d.license;S.biz={name:S.set.BUSINESS_NAME||S.biz.name,logo:S.set.LOGO_URL||''};chrome();return call('products.list',{},true)})
  .then(function(p){S.products=p;
    if(isOwner()&&!S.set.SETUP_DONE)return go('wizard');
    var pg=INIT.page&&R[INIT.page]?INIT.page:'dashboard',id=INIT.id;INIT={};go(pg,id)})}

/* ---------- wizard ---------- */
var WZ=1;
R.wizard=function(){
  var s=S.set,st={1:'<h3>1. Profil Bisnis</h3><label>Nama bisnis</label><input name="BUSINESS_NAME" value="{BUSINESS_NAME}" maxlength="80"><label>URL logo (opsional)</label><input name="LOGO_URL" value="{LOGO_URL}"><label>WhatsApp toko (628…)</label><input name="WHATSAPP" value="{WHATSAPP}"><label>Nama pengirim di label</label><input name="SENDER_NAME" value="{SENDER_NAME}"><label>HP pengirim</label><input name="SENDER_PHONE" value="{SENDER_PHONE}"><label>Alamat pengirim</label><textarea name="SENDER_ADDRESS" rows="2">{SENDER_ADDRESS}</textarea>',
   2:isPub()?'<h3>2. Keamanan</h3><p>Mode publik aktif: aplikasi terbuka untuk siapa pun yang punya link, jadi tidak ada password. Atur <b>PUBLIC_ACCESS</b>, <b>PUBLIC_ROLE</b>, dan <b>PUBLIC_READONLY</b> di Script Properties bila ingin membatasi.</p>':'<h3>2. Keamanan</h3><p>Ganti password bawaan (admin123) sekarang.</p><label>Password saat ini</label><input type="password" name="old_password" value="admin123"><label>Password baru (min. 8 karakter)</label><input type="password" name="new_password" minlength="8">',
   3:'<h3>3. Data & AI</h3><label><input type="checkbox" name="AI_ENABLED" '+(s.AI_ENABLED?'checked':'')+'> Aktifkan fitur AI (opsional — aplikasi tetap jalan tanpa AI)</label><label>Data contoh</label><select name="demo"><option value="keep">Pakai data demo dulu</option><option value="reset">Kosongkan semua data demo (mulai bersih)</option></select>'};
  view('<div class="pg-h"><h1>🚀 Setup Awal</h1><p>Langkah '+WZ+' dari 3</p></div><div class="card"><form data-form="wizard"><div id="wzb">'+T(st[WZ],s)+'</div><div class="row" style="margin-top:14px">'+(WZ>1?'<button type="button" class="btn" data-act="wzBack">‹ Kembali</button>':'')+'<span class="sp"></span><button class="btn pri">'+(WZ<3?'Lanjut ›':'Selesai ✓')+'</button></div></form></div>')};
A.wzBack=function(){WZ--;R.wizard()};
var WZD={};
FM.wizard=function(f){var v=fv(f);Object.keys(v).forEach(function(k){WZD[k]=v[k]});
  if(WZ<3){WZ++;return R.wizard()}
  var vals={BUSINESS_NAME:WZD.BUSINESS_NAME,LOGO_URL:WZD.LOGO_URL,WHATSAPP:WZD.WHATSAPP,SENDER_NAME:WZD.SENDER_NAME,SENDER_PHONE:WZD.SENDER_PHONE,SENDER_ADDRESS:WZD.SENDER_ADDRESS,AI_ENABLED:!!WZD.AI_ENABLED,SETUP_DONE:true};
  var p=Promise.resolve();
  if(WZD.new_password)p=p.then(function(){return call('changePassword',{old_password:WZD.old_password,new_password:WZD.new_password})});
  p=p.then(function(){return call('settings.save',{values:vals})});
  if(WZD.demo==='reset')p=p.then(function(){return call('demo.reset',{confirm:'RESET'})});
  p.then(function(){WZ=1;WZD={};toast('Setup selesai! 🎉','ok');confetti();return afterLogin()}).catch(function(e){fail(e);WZ=1})};

/* ---------- dashboard ---------- */
var PAL=['#8B5CF6','#EC4899','#06B6D4','#F59E0B','#22C55E','#EF4444'];
R.dashboard=function(){
  view('<div class="pg-h"><h1>Halo, '+esc(S.user.name.split(' ')[0])+' 👋</h1><p>Ringkasan toko kamu hari ini.</p></div><div id="dbx"></div>');
  call('dashboard').then(function(d){
    var k=[['k1','🛒','Order Hari Ini',d.today],['k2','💸','Belum Dibayar',rp(d.unpaid)],['k3','🚚','Sedang Dikirim',d.shipped]];
    if(d.profit_month!==undefined)k.push(['k4','💰','Laba Bulan Ini',rp(d.profit_month)]);
    var h='<div class="grid g4 kp">'+k.map(function(x){return '<div class="card kpi '+x[0]+'"><i>'+x[1]+'</i><small>'+x[2]+'</small><b>'+esc(x[3])+'</b></div>'}).join('')+'</div>';
    h+='<div class="grid g2"><div class="card"><h3>Order per Status (30 hari)</h3><canvas id="c1" height="220"></canvas></div>'+(d.profit_supplier?'<div class="card"><h3>Laba per Supplier (bulan ini)</h3><canvas id="c2" height="220"></canvas></div>':'')+'<div class="card"><h3>Pelanggan Repeat vs Baru</h3><canvas id="c3" height="220"></canvas></div>';
    h+='<div class="card"><h3>Order Terbaru</h3>'+(d.recent.length?d.recent.map(function(o){return '<div class="row" style="padding:8px 0;border-bottom:1px solid var(--bd)"><div class="sp"><b>'+esc(o.customer_name)+'</b><br><small>'+esc(o.order_id)+' • '+fd(o.date)+'</small></div><div class="tr">'+rp(o.total)+'<br>'+stB(o.order_status)+'</div></div>'}).join(''):empty('Belum ada order. Yuk buat yang pertama!'))+'<div class="row" style="margin-top:10px"><button class="btn pri" data-act="go" data-p="order-new">＋ Order Baru</button><button class="btn" data-act="go" data-p="board">Papan Order</button></div></div></div>';
    $('#dbx').innerHTML=h;
    if(!window.Chart){toast('Grafik tidak tersedia (Chart.js gagal dimuat)');return}
    var opt={plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,ticks:{precision:0}}}};
    S.charts.push(new Chart($('#c1'),{type:'bar',data:{labels:ST,datasets:[{data:ST.map(function(s){return d.status[s]}),backgroundColor:PAL,borderRadius:8}]},options:opt}));
    if(d.profit_supplier&&$('#c2'))S.charts.push(new Chart($('#c2'),{type:'bar',data:{labels:d.profit_supplier.map(function(s){return s.name}),datasets:[{data:d.profit_supplier.map(function(s){return s.profit}),backgroundColor:'#EC4899',borderRadius:8}]},options:{plugins:{legend:{display:false}},indexAxis:'y'}}));
    S.charts.push(new Chart($('#c3'),{type:'doughnut',data:{labels:['Repeat Buyer','Pelanggan Baru'],datasets:[{data:[d.repeat.repeat,d.repeat.baru],backgroundColor:['#8B5CF6','#06B6D4']}]},options:{plugins:{legend:{position:'bottom'}}}}))
  }).catch(fail)};

/* ---------- order baru ---------- */
var NO={items:[],customer_id:'',ignoreStock:false};
function prodOpts(sel,cands){var h='<option value="">— pilih produk —</option>';
  if(cands&&cands.length)h+='<optgroup label="Saran">'+cands.map(function(c){return '<option value="'+esc(c.product_id)+'">'+esc(c.label)+'</option>'}).join('')+'</optgroup>';
  return h+'<optgroup label="Semua produk">'+S.products.map(function(p){return '<option value="'+esc(p.product_id)+'"'+(p.product_id===sel?' selected':'')+'>'+esc(p.name+(p.variant?' – '+p.variant:'')+' (stok '+p.stock+') '+rp(p.sell_price))+'</option>'}).join('')+'</optgroup>'}
R['order-new']=function(){
  NO={items:[],customer_id:'',ignoreStock:false};
  view('<div class="pg-h"><h1>Order Baru</h1><p>Tempel chat WhatsApp pembeli, lalu tekan Baca Pesan.</p></div>'+
  '<div class="card"><label>Tempel pesan WhatsApp</label><textarea id="paste" rows="6" placeholder="Nama: Siti Rahmawati\nHP: 081234567801\nAlamat: Jl. Melati No. 12, Depok 16415\nPesanan:\n2x Hijab Pashmina Dusty Pink\n1 Casing iPhone 13"></textarea><div class="row" style="margin-top:8px"><button class="btn pri" data-act="parse">⚡ Baca Pesan</button><button class="btn" data-act="clip">📋 Tempel</button></div><div id="warn"></div></div>'+
  '<form id="of" data-form="order"><div class="card"><h3>Penerima <span id="ex"></span></h3><div class="grid g2"><div><label>Nama</label><input name="name" id="c_name" required maxlength="100"></div><div><label>No HP</label><input name="phone" id="c_phone" inputmode="tel" required></div></div><label>Alamat lengkap</label><textarea name="address" id="c_address" rows="2" required maxlength="300"></textarea><div class="grid g2"><div><label>Kota/Kabupaten</label><input name="city" id="c_city" required></div><div><label>Kode pos</label><input name="postal_code" id="c_postal" inputmode="numeric" maxlength="5"></div></div><div class="row" style="margin-top:8px"><button type="button" class="btn sm" data-act="fixAddr">✨ Rapikan Alamat</button></div><div id="addrRes"></div></div>'+
  '<div class="card"><h3>Produk</h3><div id="items"></div><button type="button" class="btn" data-act="addItem">＋ Tambah produk</button></div>'+
  '<div class="card"><h3>Pengiriman & Pembayaran</h3><div class="grid g3"><div><label>Ongkir (Rp)</label><input type="number" min="0" name="shipping_cost" id="ship" data-inp="tot" value="0"><small id="shipHint" style="color:var(--mu)"></small></div><div><label>Kurir</label><select name="courier" id="courier">'+opts(CR)+'</select></div><div><label>Status bayar</label><select name="payment_status" id="pay" data-chg="pay">'+opts(PAY)+'</select></div></div><div class="grid g2" id="dpbox" style="display:none"><div><label>Jumlah DP (Rp)</label><input type="number" min="1" name="paid_amount"></div><div></div></div><div id="mtbox" style="display:none"><label>Metode bayar</label><select name="method">'+opts(MT)+'</select></div><label>Catatan</label><input name="notes" id="notes" maxlength="300"></div>'+
  '<div class="card" id="tot"></div><button class="btn pri" style="width:100%">💾 Simpan Order</button></form><div id="done"></div>');
  addItemRow();drawTot()};
function addItemRow(it){NO.items.push(it||{product_id:'',qty:1,price:0,raw:'',candidates:[]});drawItems()}
A.addItem=function(){addItemRow()};
A.rmItem=function(d){NO.items.splice(+d.i,1);if(!NO.items.length)NO.items.push({product_id:'',qty:1,price:0,raw:'',candidates:[]});drawItems()};
function drawItems(){$('#items').innerHTML=NO.items.map(function(it,i){var unk=!it.product_id;
  return '<div class="irow'+(unk?' unk':'')+'">'+(unk&&it.raw?'<div class="hint">⚠️ "'+esc(it.raw)+'" tidak dikenali — pilih produk manual</div>':'')+'<div><label>Produk</label><select data-chg="itp" data-i="'+i+'">'+prodOpts(it.product_id,it.candidates)+'</select></div><div><label>Qty</label><input type="number" min="1" max="9999" value="'+esc(it.qty)+'" data-inp="itq" data-i="'+i+'"></div><div class="pr"><label>Harga</label><input type="number" min="0" value="'+esc(it.price)+'" data-inp="itr" data-i="'+i+'"></div><button type="button" class="btn dng" data-act="rmItem" data-i="'+i+'" aria-label="Hapus">✕</button></div>'}).join('');drawTot()}
IN.itp=function(el){var it=NO.items[+el.dataset.i];it.product_id=el.value;var p=S.products.filter(function(x){return x.product_id===el.value})[0];if(p)it.price=p.sell_price;drawItems()};
IN.itq=function(el){NO.items[+el.dataset.i].qty=Number(el.value)||0;drawTot()};
IN.itr=function(el){NO.items[+el.dataset.i].price=Number(el.value)||0;drawTot()};
IN.pay=function(el){$('#dpbox').style.display=el.value==='DP'?'grid':'none';$('#mtbox').style.display=el.value==='Belum Bayar'?'none':'block'};
IN.tot=drawTot;
function drawTot(){var el=$('#tot');if(!el)return;var sub=0,pf=0;NO.items.forEach(function(it){sub+=(Number(it.qty)||0)*(Number(it.price)||0);var p=S.products.filter(function(x){return x.product_id===it.product_id})[0];if(p&&p.cost_price!==undefined)pf+=(Number(it.qty)||0)*((Number(it.price)||0)-p.cost_price-(p.dropship_fee||0))});
  var tax=Math.round(sub*(Number(S.set.TAX_PERCENT)||0)/100),sh=Number(($('#ship')||{}).value)||0;
  el.innerHTML='<div class="row"><span class="sp">Subtotal</span><b>'+rp(sub)+'</b></div>'+(tax?'<div class="row"><span class="sp">Pajak '+esc(S.set.TAX_PERCENT)+'%</span><b>'+rp(tax)+'</b></div>':'')+'<div class="row"><span class="sp">Ongkir</span><b>'+rp(sh)+'</b></div><div class="row" style="font-size:18px"><span class="sp">Total</span><b>'+rp(sub+tax+sh)+'</b></div>'+(isOwner()?'<div class="row"><span class="sp">Estimasi laba (jual − modal − fee)</span><span class="chip v">'+rp(pf)+'</span></div>':'')}
A.clip=function(){if(navigator.clipboard&&navigator.clipboard.readText)navigator.clipboard.readText().then(function(t){$('#paste').value=t}).catch(function(){toast('Izin clipboard ditolak — tempel manual (Ctrl+V)')});else toast('Tempel manual (Ctrl+V)')};
A.parse=function(){var t=$('#paste').value.trim();if(!t)return toast('Tempel pesan dulu','err');
  call('parse',{text:t}).then(function(r){var c=r.customer;$('#c_name').value=c.name;$('#c_phone').value=c.phone;$('#c_address').value=c.address;$('#c_city').value=c.city;$('#c_postal').value=c.postal_code;NO.customer_id=c.customer_id;
    $('#ex').innerHTML=c.existing?'<span class="chip v">Pelanggan lama • '+c.total_orders+' order</span>':'<span class="chip">Baru</span>';
    if(r.courier)$('#courier').value=r.courier;if(r.shipping_cost){$('#ship').value=r.shipping_cost;$('#shipHint').textContent=r.shipping_from_memory?'💡 dari memori kota':''}if(r.notes)$('#notes').value=r.notes;
    NO.items=r.items.length?r.items:[{product_id:'',qty:1,price:0,raw:'',candidates:[]}];drawItems();
    var un=r.items.filter(function(i){return !i.product_id}).length;
    $('#warn').innerHTML=(r.warnings.concat(un?[un+' produk belum cocok — pilih manual (kotak pink)']:[])).map(function(w){return '<span class="chip p" style="margin:6px 6px 0 0">⚠️ '+esc(w)+'</span>'}).join('');
    toast('Pesan terbaca ✅','ok')}).catch(fail)};
A.fixAddr=function(){var a=$('#c_address').value.trim();if(!a)return toast('Isi alamat dulu','err');
  call('ai.address',{address:a}).then(function(r){var x=r.result;$('#addrRes').innerHTML='<div class="res"><div class="row">'+aiBadge(r.source)+'</div><div>Jalan: <b>'+esc(x.street)+'</b></div><div>Kecamatan: <b>'+esc(x.district||'-')+'</b></div><div>Kota: <b>'+esc(x.city||'-')+'</b></div><div>Kode pos: <b>'+esc(x.postal_code||'-')+'</b></div>'+(r.missing.length?'<div style="margin-top:6px">'+r.missing.map(function(m){return '<span class="chip p">Kurang: '+esc(m)+'</span> '}).join('')+'</div>':'<span class="chip">Lengkap ✅</span>')+'<div class="row" style="margin-top:8px"><button type="button" class="btn sm" data-act="useAddr" data-c="'+esc(x.city)+'" data-p="'+esc(x.postal_code)+'">Pakai kota & kode pos</button></div></div>'}).catch(fail)};
A.useAddr=function(d){if(d.c)$('#c_city').value=d.c;if(d.p)$('#c_postal').value=d.p;toast('Diterapkan','ok')};
FM.order=function(f){var v=fv(f);
  var body={customer:{customer_id:NO.customer_id,name:v.name,phone:v.phone,address:v.address,city:v.city,postal_code:v.postal_code},items:NO.items.map(function(i){return {product_id:i.product_id,qty:i.qty,price:i.price}}),shipping_cost:v.shipping_cost,courier:v.courier,payment_status:v.payment_status,paid_amount:v.paid_amount,method:v.method,notes:v.notes,ignoreStock:NO.ignoreStock};
  call('orders.create',body).then(function(o){NO.ignoreStock=false;call('products.list',{},true).then(function(p){S.products=p});
    $('#of').style.display='none';
    $('#done').innerHTML='<div class="card"><h3>✅ Order '+esc(o.order_id)+' tersimpan</h3><p>Total <b>'+rp(o.total)+'</b> • '+esc(o.customer_name)+'</p><div class="row"><a class="btn wa" target="_blank" rel="noopener" href="'+esc(o.wa.link)+'">💬 Konfirmasi via WA</a><button class="btn acc" data-act="go" data-p="label" data-id="'+esc(o.order_id)+'">🏷️ Cetak Label</button><button class="btn" data-act="go" data-p="order-new">＋ Order lagi</button></div></div>';window.scrollTo(0,0)})
  .catch(function(e){if(e.code==='STOCK'&&confirm(e.message+'\n\nLanjutkan tetap simpan (stok bisa jadi 0)?')){NO.ignoreStock=true;FM.order(f)}else fail(e)})};

/* ---------- papan order ---------- */
var BD=[];
R.board=function(){view('<div class="pg-h"><h1>Papan Order</h1><p>Ketuk tombol untuk memindahkan status. Selesai/Retur tampil 30 hari terakhir.</p></div><div class="card row"><input id="bq" data-inp="bq" placeholder="Cari nama / no. order / resi…" style="flex:1;min-width:200px"><button class="btn" data-act="reloadBoard">↻ Muat ulang</button></div><div class="board" id="bd"></div>');loadBoard()};
function loadBoard(){call('orders.list',{board:true}).then(function(d){BD=d.orders;drawBoard()}).catch(fail)}
A.reloadBoard=loadBoard;IN.bq=function(){drawBoard()};
function drawBoard(){var q=(($('#bq')||{}).value||'').toLowerCase();var list=BD.filter(function(o){return !q||(o.order_id+' '+o.customer_name+' '+o.awb).toLowerCase().indexOf(q)>=0});
  $('#bd').innerHTML=ST.map(function(s){var os=list.filter(function(o){return o.order_status===s});
    return '<div class="col"><h4>'+stB(s)+'<span class="chip v">'+os.length+'</span></h4>'+(os.length?os.slice(0,40).map(cardH).join(''):'<div class="empty" style="padding:10px"><small>Kosong</small></div>')+'</div>'}).join('')}
function cardH(o){var it=o.items[0]?o.items[0].qty+'× '+o.items[0].name+(o.items.length>1?' +'+(o.items.length-1)+' lagi':''):'-';
  return '<div class="oc"><div class="t"><span>'+esc(o.customer_name)+'</span><span>'+rp(o.total)+'</span></div><div class="m">'+esc(o.order_id)+' • '+fd(o.date)+' • '+esc(o.customer_city)+'</div><div class="m">'+esc(it)+'</div><div class="row">'+payB(o.payment_status)+'<span class="chip">'+esc(o.courier)+(o.awb?' • '+esc(o.awb):'')+'</span></div><div class="b">'+(NEXT[o.order_status]?'<button class="btn pri sm" data-act="move" data-id="'+esc(o.order_id)+'" data-s="'+NEXT[o.order_status]+'">→ '+NEXT[o.order_status]+'</button>':'')+'<button class="btn sm" data-act="ordM" data-id="'+esc(o.order_id)+'">Detail ⋯</button></div></div>'}
function upd(o){for(var i=0;i<BD.length;i++)if(BD[i].order_id===o.order_id){BD[i]=o;break}if($('#bd'))drawBoard()}
A.move=function(d){moveStatus(d.id,d.s)};
function moveStatus(id,s){var o=BD.filter(function(x){return x.order_id===id})[0];
  if(s==='Dikirim'&&o&&!o.awb)return awbModal(id);
  call('orders.status',{order_id:id,status:s}).then(function(n){closeModal();upd(n);if(s==='Selesai'){confetti();toast('Order selesai! 🎉','ok')}else toast('Status: '+s,'ok')}).catch(fail)}
function awbModal(id){var o=BD.filter(function(x){return x.order_id===id})[0]||{};
  modal('Simpan Resi • '+id,'<p>Setelah disimpan, pesan WhatsApp berisi link pelacakan akan disiapkan.</p><form data-form="awb" data-id="'+esc(id)+'"><label>Kurir</label><select name="courier">'+opts(CR,o.courier)+'</select><label>No. resi</label><input name="awb" required maxlength="30" value="'+esc(o.awb||'')+'"><div class="row" style="margin-top:12px"><button class="btn pri">Simpan & siapkan WA</button><button type="button" class="btn" data-act="closeModal">Batal</button></div></form>')}
FM.awb=function(f){var v=fv(f);call('orders.awb',{order_id:f.dataset.id,courier:v.courier,awb:v.awb}).then(function(o){upd(o);
  modal('Resi tersimpan ✅','<p>'+esc(o.order_id)+' → <b>'+esc(o.courier)+' '+esc(o.awb)+'</b></p><div class="res">'+esc(o.wa.text)+'</div><div class="row" style="margin-top:10px">'+(o.wa.link?'<a class="btn wa" target="_blank" rel="noopener" href="'+esc(o.wa.link)+'">💬 Kirim ke pembeli</a>':'')+'<button class="btn" data-act="closeModal">Tutup</button></div>')}).catch(fail)};
A.ordM=function(d){var o=BD.filter(function(x){return x.order_id===d.id})[0];if(!o)return;
  modal(o.order_id,'<p><b>'+esc(o.customer_name)+'</b> • '+esc(o.customer_phone)+'<br>'+stB(o.order_status)+' '+payB(o.payment_status)+'</p>'+o.items.map(function(i){return '<div class="row"><span class="sp">'+i.qty+'× '+esc(i.name)+' '+esc(i.variant)+'</span>'+rp(i.qty*i.price)+'</div>'}).join('')+'<div class="row"><span class="sp">Ongkir</span>'+rp(o.shipping_cost)+'</div><div class="row"><b class="sp">Total</b><b>'+rp(o.total)+'</b></div>'+(o.profit!==undefined?'<div class="row"><span class="sp">Laba</span><span class="chip v">'+rp(o.profit)+'</span></div>':'')+(o.remaining?'<div class="row"><span class="sp">Sisa bayar</span><b style="color:#BE185D">'+rp(o.remaining)+'</b></div>':'')+(o.notes?'<p>📝 '+esc(o.notes)+'</p>':'')+
  '<h3 style="margin-top:12px">Pindah status</h3><div class="row">'+ST.filter(function(s){return s!==o.order_status}).map(function(s){return '<button class="btn sm" data-act="move" data-id="'+esc(o.order_id)+'" data-s="'+s+'">'+s+'</button>'}).join('')+'</div><div class="row" style="margin-top:12px"><button class="btn acc" data-act="awbM" data-id="'+esc(o.order_id)+'">📮 Resi</button><button class="btn" data-act="go" data-p="label" data-id="'+esc(o.order_id)+'">🏷️ Label</button><a class="btn wa" target="_blank" rel="noopener" href="'+esc(waUrl(o.customer_phone,'Halo Kak '+o.customer_name+', pesanan '+o.order_id+' statusnya: '+o.order_status+'.'))+'">💬 WA</a>'+(isOwner()?'<button class="btn dng" data-act="delOrd" data-id="'+esc(o.order_id)+'">🗑 Hapus</button>':'')+'</div>')};
A.awbM=function(d){awbModal(d.id)};
A.delOrd=function(d){if(!confirm('Hapus order '+d.id+'? Stok dikembalikan & pembayaran terkait dihapus.'))return;call('orders.delete',{order_id:d.id}).then(function(){closeModal();BD=BD.filter(function(o){return o.order_id!==d.id});drawBoard();toast('Order dihapus','ok')}).catch(fail)};

/* ---------- produk ---------- */
R.products=function(){var ow=isOwner();
  call('products.list').then(function(ps){S.products=ps;
    view('<div class="pg-h"><h1>Produk</h1><p>'+ps.length+' produk'+(ow?'':' (harga modal disembunyikan untuk Admin)')+'</p></div><div class="card row"><input id="pq" data-inp="pq" placeholder="Cari produk…" style="flex:1;min-width:180px">'+(ow?'<button class="btn pri" data-act="prodM">＋ Produk</button>':'')+'<button class="btn" data-act="catPdf">📄 Katalog PDF</button></div><div class="card" id="pl"></div>');drawProducts()}).catch(fail)};
IN.pq=function(){drawProducts()};
function drawProducts(){var q=(($('#pq')||{}).value||'').toLowerCase(),ow=isOwner(),ps=S.products.filter(function(p){return !q||(p.name+' '+p.sku+' '+p.variant).toLowerCase().indexOf(q)>=0});
  $('#pl').innerHTML=ps.length?'<table class="rt"><thead><tr><th>Produk</th><th>SKU</th>'+(ow?'<th>Supplier</th><th>Modal</th>':'')+'<th>Jual</th><th>Stok</th><th></th></tr></thead><tbody>'+ps.map(function(p){return T('<tr><td data-l="Produk"><b>{name}</b><br><small>{variant}</small></td><td data-l="SKU">{sku}</td>'+(ow?'<td data-l="Supplier">{sup}</td><td data-l="Modal">{cost}</td>':'')+'<td data-l="Jual">{sell}</td><td data-l="Stok">{!stk}</td><td>{!act}</td></tr>',{name:p.name,variant:p.variant,sku:p.sku,sup:p.supplier_name,cost:rp(p.cost_price),sell:rp(p.sell_price),stk:p.stock<5?'<span class="chip p">'+esc(p.stock)+' ⚠️</span>':esc(p.stock),act:ow?'<button class="btn sm" data-act="prodM" data-id="'+esc(p.product_id)+'">Edit</button>':''})}).join('')+'</tbody></table>':empty('Produk tidak ditemukan')}
A.catPdf=function(){call('catalog.pdf').then(function(r){dlB64(r.filename,r.base64,'application/pdf')}).catch(fail)};
A.prodM=function(d){var p=S.products.filter(function(x){return x.product_id===d.id})[0]||{},sups=[];
  call('suppliers.list').then(function(s){sups=s;
    modal(p.product_id?'Edit Produk':'Produk Baru','<form data-form="prod" data-id="'+esc(p.product_id||'')+'"><label>Nama</label><input name="name" required value="'+esc(p.name||'')+'"><div class="grid g2"><div><label>SKU</label><input name="sku" required value="'+esc(p.sku||'')+'"></div><div><label>Varian</label><input name="variant" value="'+esc(p.variant||'')+'"></div></div><label>Supplier</label><select name="supplier_id"><option value="">—</option>'+sups.map(function(s){return '<option value="'+esc(s.supplier_id)+'"'+(s.supplier_id===p.supplier_id?' selected':'')+'>'+esc(s.name)+'</option>'}).join('')+'</select><div class="grid g2"><div><label>Harga modal</label><input type="number" min="0" name="cost_price" required value="'+esc(p.cost_price||0)+'"></div><div><label>Harga jual</label><input type="number" min="0" name="sell_price" required value="'+esc(p.sell_price||0)+'"></div><div><label>Stok</label><input type="number" min="0" name="stock" required value="'+esc(p.stock||0)+'"></div><div><label>Berat (gram)</label><input type="number" min="0" name="weight_gram" value="'+esc(p.weight_gram||0)+'"></div></div><label>URL gambar</label><input name="image_url" value="'+esc(p.image_url||'')+'"><div class="row" style="margin-top:12px"><button class="btn pri">Simpan</button>'+(p.product_id?'<button type="button" class="btn dng" data-act="delProd" data-id="'+esc(p.product_id)+'">Hapus</button>':'')+'<button type="button" class="btn" data-act="closeModal">Batal</button></div></form>')}).catch(fail)};
FM.prod=function(f){var v=fv(f);if(f.dataset.id)v.product_id=f.dataset.id;call('products.save',v).then(function(){closeModal();toast('Produk disimpan','ok');R.products()}).catch(fail)};
A.delProd=function(d){if(confirm('Hapus produk ini?'))call('products.delete',{product_id:d.id}).then(function(){closeModal();R.products()}).catch(fail)};

/* ---------- supplier ---------- */
R.suppliers=function(){call('suppliers.list').then(function(s){S.sups=s;
  view('<div class="pg-h"><h1>Supplier</h1><p>Fee dropship dikenakan per pcs dan dihitung dalam laba.</p></div><div class="card"><button class="btn pri" data-act="supM">＋ Supplier</button></div><div class="card">'+(s.length?'<table class="rt"><thead><tr><th>Nama</th><th>Kota</th><th>HP</th><th>Fee/pcs</th><th></th></tr></thead><tbody>'+s.map(function(x){return T('<tr><td data-l="Nama"><b>{n}</b><br><small>{nt}</small></td><td data-l="Kota">{c}</td><td data-l="HP">{p}</td><td data-l="Fee/pcs">{f}</td><td><button class="btn sm" data-act="supM" data-id="{id}">Edit</button></td></tr>',{n:x.name,nt:x.notes,c:x.city,p:x.phone,f:rp(x.dropship_fee),id:x.supplier_id})}).join('')+'</tbody></table>':empty('Belum ada supplier'))+'</div>')}).catch(fail)};
A.supM=function(d){var s=(S.sups||[]).filter(function(x){return x.supplier_id===d.id})[0]||{};
  modal(s.supplier_id?'Edit Supplier':'Supplier Baru','<form data-form="sup" data-id="'+esc(s.supplier_id||'')+'"><label>Nama</label><input name="name" required value="'+esc(s.name||'')+'"><div class="grid g2"><div><label>No HP</label><input name="phone" value="'+esc(s.phone||'')+'"></div><div><label>Kota</label><input name="city" value="'+esc(s.city||'')+'"></div></div><label>Fee dropship per pcs (Rp)</label><input type="number" min="0" name="dropship_fee" value="'+esc(s.dropship_fee||0)+'"><label>Catatan</label><input name="notes" value="'+esc(s.notes||'')+'"><div class="row" style="margin-top:12px"><button class="btn pri">Simpan</button>'+(s.supplier_id?'<button type="button" class="btn dng" data-act="delSup" data-id="'+esc(s.supplier_id)+'">Hapus</button>':'')+'<button type="button" class="btn" data-act="closeModal">Batal</button></div></form>')};
FM.sup=function(f){var v=fv(f);if(f.dataset.id)v.supplier_id=f.dataset.id;call('suppliers.save',v).then(function(){closeModal();toast('Supplier disimpan','ok');R.suppliers()}).catch(fail)};
A.delSup=function(d){if(confirm('Hapus supplier ini?'))call('suppliers.delete',{supplier_id:d.id}).then(function(){closeModal();R.suppliers()}).catch(fail)};

/* ---------- pelanggan ---------- */
var CU=[];
R.customers=function(){call('customers.list').then(function(c){CU=c;view('<div class="pg-h"><h1>Pelanggan</h1><p>Total order otomatis terhitung; 2+ order = Repeat Buyer.</p></div><div class="card row"><input id="cq" data-inp="cq" placeholder="Cari nama / HP / kota…" style="flex:1;min-width:180px"><button class="btn pri" data-act="cusM">＋ Pelanggan</button></div><div class="card" id="cl"></div>');drawCus()}).catch(fail)};
IN.cq=function(){drawCus()};
function drawCus(){var q=(($('#cq')||{}).value||'').toLowerCase(),l=CU.filter(function(c){return !q||(c.name+' '+c.phone+' '+c.city).toLowerCase().indexOf(q)>=0});
  $('#cl').innerHTML=l.length?'<table class="rt"><thead><tr><th>Nama</th><th>HP</th><th>Kota</th><th>Order</th><th>Terakhir</th><th></th></tr></thead><tbody>'+l.slice(0,300).map(function(c){return T('<tr><td data-l="Nama"><b>{n}</b> <span class="chip {cls}">{tag}</span></td><td data-l="HP">{p}</td><td data-l="Kota">{c}</td><td data-l="Order">{o}</td><td data-l="Terakhir">{!d}</td><td><a class="btn wa sm" target="_blank" rel="noopener" href="{wa}">WA</a> <button class="btn sm" data-act="cusM" data-id="{id}">Edit</button></td></tr>',{n:c.name,cls:c.tag==='Repeat Buyer'||c.tag==='Langganan'?'v':'g',tag:c.tag,p:c.phone,c:c.city,o:c.total_orders,d:fd(c.last_order),wa:waUrl(c.phone,'Halo Kak '+c.name+' 👋'),id:c.customer_id})}).join('')+'</tbody></table>':empty('Pelanggan belum ada')}
A.cusM=function(d){var c=CU.filter(function(x){return x.customer_id===d.id})[0]||{};
  modal(c.customer_id?'Edit Pelanggan':'Pelanggan Baru','<form data-form="cus" data-id="'+esc(c.customer_id||'')+'"><label>Nama</label><input name="name" required value="'+esc(c.name||'')+'"><label>No HP</label><input name="phone" required value="'+esc(c.phone||'')+'"><label>Alamat</label><textarea name="address" rows="2">'+esc(c.address||'')+'</textarea><div class="grid g2"><div><label>Kota</label><input name="city" value="'+esc(c.city||'')+'"></div><div><label>Kode pos</label><input name="postal_code" maxlength="5" value="'+esc(c.postal_code||'')+'"></div></div><div class="row" style="margin-top:12px"><button class="btn pri">Simpan</button><button type="button" class="btn" data-act="closeModal">Batal</button></div></form>')};
FM.cus=function(f){var v=fv(f);if(f.dataset.id)v.customer_id=f.dataset.id;call('customers.save',v).then(function(){closeModal();toast('Tersimpan','ok');R.customers()}).catch(fail)};

/* ---------- pembayaran ---------- */
R.payments=function(){call('payments.list').then(function(l){
  view('<div class="pg-h"><h1>Pembayaran</h1><p>Status bayar order otomatis mengikuti total pembayaran.</p></div><div class="card"><button class="btn pri" data-act="payM">＋ Catat Pembayaran</button></div><div class="card">'+(l.length?'<table class="rt"><thead><tr><th>Tanggal</th><th>Order</th><th>Pelanggan</th><th>Jumlah</th><th>Metode</th><th>Bukti</th><th>Verifikasi</th></tr></thead><tbody>'+l.map(function(p){return T('<tr><td data-l="Tanggal">{d}</td><td data-l="Order">{o}</td><td data-l="Pelanggan">{c}</td><td data-l="Jumlah"><b>{a}</b></td><td data-l="Metode">{m}</td><td data-l="Bukti">{!pf}</td><td data-l="Verifikasi">{!v}</td></tr>',{d:fd(p.date),o:p.order_id,c:p.customer_name,a:rp(p.amount),m:p.method,pf:p.proof_url&&/^https?:/.test(p.proof_url)?'<a href="'+esc(p.proof_url)+'" target="_blank" rel="noopener">Lihat</a>':'-',v:isOwner()?'<input type="checkbox" data-chg="ver" data-id="'+esc(p.payment_id)+'" '+(p.verified?'checked':'')+' aria-label="Verifikasi">':(p.verified?'✅':'⏳')})}).join('')+'</tbody></table>':empty('Belum ada pembayaran'))+'</div>')}).catch(fail)};
IN.ver=function(el){call('payments.verify',{payment_id:el.dataset.id,verified:el.checked}).then(function(){toast('Diperbarui','ok')}).catch(function(e){el.checked=!el.checked;fail(e)})};
A.payM=function(){call('orders.list',{}).then(function(d){var os=d.orders.filter(function(o){return o.remaining>0&&o.order_status!=='Retur'});
  if(!os.length)return toast('Semua order sudah lunas 🎉');
  modal('Catat Pembayaran','<form data-form="pay"><label>Order</label><select name="order_id" id="po">'+os.map(function(o){return '<option value="'+esc(o.order_id)+'" data-r="'+o.remaining+'">'+esc(o.order_id+' • '+o.customer_name+' • sisa '+rp(o.remaining))+'</option>'}).join('')+'</select><div class="grid g2"><div><label>Jumlah (Rp)</label><input type="number" min="1" name="amount" id="pamt" required value="'+os[0].remaining+'"></div><div><label>Metode</label><select name="method">'+opts(MT)+'</select></div></div><label>Tanggal</label><input type="date" name="date" value="'+new Date().toISOString().slice(0,10)+'"><label>URL bukti (opsional)</label><input name="proof_url"><div class="row" style="margin-top:12px"><button class="btn pri">Simpan</button><button type="button" class="btn" data-act="closeModal">Batal</button></div></form>');
  $('#po').addEventListener('change',function(){$('#pamt').value=this.options[this.selectedIndex].dataset.r})}).catch(fail)};
FM.pay=function(f){call('payments.add',fv(f)).then(function(){closeModal();toast('Pembayaran dicatat','ok');R.payments()}).catch(fail)};

/* ---------- cetak label ---------- */
var LB={list:[],sel:{}};
R.label=function(el,arg){LB.sel={};if(arg)LB.sel[arg]=1;
  call('orders.list',{}).then(function(d){LB.list=d.orders.filter(function(o){return o.order_status!=='Selesai'&&o.order_status!=='Retur'||LB.sel[o.order_id]}).slice(0,120);
    view('<div class="pg-h"><h1>Cetak Label</h1><p>Label A6 (105×148 mm): pengirim, penerima, isi paket.</p></div><div class="grid g2"><div class="card"><div class="row"><b class="sp">Pilih order</b><button class="btn sm" data-act="selDikemas">Semua Dikemas</button></div><div id="ll" style="max-height:480px;overflow:auto"></div></div><div class="card"><div class="row"><button class="btn pri" data-act="lbPrev">👁 Pratinjau</button><button class="btn acc" data-act="lbPrint">🖨 Cetak</button><button class="btn" data-act="lbPdf">⬇ PDF</button></div><div id="lp" style="margin-top:10px"></div></div></div>');drawLL();if(arg)A.lbPrev()}).catch(fail)};
function drawLL(){$('#ll').innerHTML=LB.list.length?LB.list.map(function(o){return '<label style="display:flex;gap:10px;align-items:center;min-height:44px;margin:0;color:var(--tx);font-weight:500"><input type="checkbox" data-chg="lsel" data-id="'+esc(o.order_id)+'" '+(LB.sel[o.order_id]?'checked':'')+'><span class="sp">'+esc(o.order_id)+' • '+esc(o.customer_name)+'</span>'+stB(o.order_status)+'</label>'}).join(''):empty('Tidak ada order aktif')}
IN.lsel=function(el){if(el.checked)LB.sel[el.dataset.id]=1;else delete LB.sel[el.dataset.id]};
A.selDikemas=function(){LB.sel={};LB.list.forEach(function(o){if(o.order_status==='Dikemas')LB.sel[o.order_id]=1});drawLL()};
function lbIds(){var ids=Object.keys(LB.sel);if(!ids.length)toast('Pilih minimal 1 order','err');return ids}
A.lbPrev=function(){var ids=lbIds();if(!ids.length)return;call('label.html',{ids:ids}).then(function(r){$('#lp').innerHTML='<iframe class="pv" id="lf" sandbox="allow-same-origin allow-modals" title="Pratinjau label"></iframe>';$('#lf').srcdoc=r.html}).catch(fail)};
A.lbPrint=function(){var f=$('#lf');if(!f)return toast('Tekan Pratinjau dulu','err');try{f.contentWindow.focus();f.contentWindow.print()}catch(e){toast('Cetak diblokir browser — gunakan tombol PDF','err')}};
A.lbPdf=function(){var ids=lbIds();if(!ids.length)return;call('label.pdf',{ids:ids}).then(function(r){dlB64(r.filename,r.base64,'application/pdf')}).catch(fail)};

/* ---------- laporan ---------- */
R.reports=function(){view('<div class="pg-h"><h1>Laporan Laba</h1><p>Laba = harga jual − modal − fee dropship (order Retur tidak dihitung).</p></div><div class="card"><form data-form="rep" class="row"><div><label>Dari</label><input type="date" name="from"></div><div><label>Sampai</label><input type="date" name="to"></div><button class="btn pri" style="align-self:flex-end">Tampilkan</button><button type="button" class="btn" data-act="repPdf" style="align-self:flex-end">📄 PDF</button></form></div><div id="rp"></div><div class="card"><h3>Ekspor CSV</h3><div class="row"><select id="csvT" style="max-width:220px"><option>Orders</option><option>Products</option><option>Suppliers</option><option>Customers</option><option>Payments</option></select><button class="btn" data-act="csv">⬇ Unduh CSV</button></div></div>');loadRep({})};
function repArgs(){var f=$('form[data-form=rep]'),v=fv(f);return {from:v.from||undefined,to:v.to||undefined}}
FM.rep=function(){loadRep(repArgs())};
function loadRep(a){call('reports.summary',a).then(function(r){var t=r.totals;
  var tb=function(title,rows,cols){return '<div class="card"><h3>'+title+'</h3>'+(rows.length?'<table class="rt"><thead><tr>'+cols.map(function(c){return '<th>'+c[0]+'</th>'}).join('')+'</tr></thead><tbody>'+rows.map(function(x){return '<tr>'+cols.map(function(c){return '<td data-l="'+esc(c[0])+'">'+esc(c[2]?rp(x[c[1]]):x[c[1]])+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table>':empty('Belum ada data'))+'</div>'};
  $('#rp').innerHTML='<div class="grid g4 kp"><div class="card kpi k1"><small>Order</small><b>'+t.orders+'</b></div><div class="card kpi k2"><small>Omzet</small><b>'+rp(t.revenue)+'</b></div><div class="card kpi k3"><small>Modal + Fee</small><b>'+rp(t.cost+t.fee)+'</b></div><div class="card kpi k4"><small>Laba</small><b>'+rp(t.profit)+'</b></div></div><div class="card"><h3>Laba per Bulan</h3><canvas id="cm" height="160"></canvas></div>'+
  tb('Per Supplier',r.by_supplier,[['Supplier','name'],['Qty','qty'],['Omzet','revenue',1],['Modal','cost',1],['Fee','fee',1],['Laba','profit',1]])+tb('Per Produk',r.by_product,[['Produk','name'],['Qty','qty'],['Omzet','revenue',1],['Laba','profit',1]])+tb('Per Bulan',r.by_month,[['Bulan','month'],['Order','orders'],['Omzet','revenue',1],['Laba','profit',1]]);
  if(window.Chart&&r.by_month.length)S.charts.push(new Chart($('#cm'),{type:'bar',data:{labels:r.by_month.map(function(m){return m.month}),datasets:[{label:'Omzet',data:r.by_month.map(function(m){return m.revenue}),backgroundColor:'#06B6D4',borderRadius:8},{label:'Laba',data:r.by_month.map(function(m){return m.profit}),backgroundColor:'#8B5CF6',borderRadius:8}]}}))}).catch(fail)}
A.repPdf=function(){call('report.pdf',repArgs()).then(function(r){dlB64(r.filename,r.base64,'application/pdf')}).catch(fail)};
A.csv=function(){call('export.csv',{type:$('#csvT').value}).then(function(r){dl(r.filename,new Blob([r.csv],{type:'text/csv;charset=utf-8'}))}).catch(fail)};

/* ---------- asisten AI ---------- */
var AIT='chat';
R.ai=function(){var tabs=[['chat','💬 Balas Chat'],['cap','📣 Caption & Broadcast'],['addr','📍 Rapikan Alamat']];
  var body={chat:'<label>Pesan / pertanyaan pembeli</label><textarea id="q" rows="4" maxlength="1000" placeholder="Kak, hijab pashmina dusty pink ready? harganya berapa?"></textarea><button class="btn pri" style="margin-top:8px" data-act="aiChat">✨ Buat Balasan</button>',
   cap:'<div class="grid g2"><div><label>Produk</label><select id="cp">'+S.products.map(function(p){return '<option value="'+esc(p.product_id)+'">'+esc(p.name+' '+p.variant)+'</option>'}).join('')+'</select></div><div><label>Gaya</label><select id="cs"><option>santai</option><option>formal</option><option>hard-sell</option></select></div></div><div class="row" style="margin-top:8px"><button class="btn pri" data-act="aiCap" data-m="caption">✨ Caption Promo</button><button class="btn acc" data-act="aiCap" data-m="broadcast">📣 Broadcast Repeat Buyer</button></div>',
   addr:'<label>Alamat berantakan</label><textarea id="aa" rows="4" maxlength="500" placeholder="jl melati 12 rt3/5 sukamaju cilodong depok 16415"></textarea><button class="btn pri" style="margin-top:8px" data-act="aiAddr">✨ Rapikan</button>'};
  view('<div class="pg-h"><h1>Asisten AI</h1><p>Opsional. Jika AI mati/gagal, hasil dibuat otomatis dari aturan & template.</p></div><div class="tabs">'+tabs.map(function(t){return '<button class="btn'+(AIT===t[0]?' on':'')+'" data-act="aiTab" data-t="'+t[0]+'">'+t[1]+'</button>'}).join('')+'</div><div class="card">'+body[AIT]+'<div id="air"></div></div>')};
A.aiTab=function(d){AIT=d.t;R.ai()};
function aiOut(r,extra){$('#air').innerHTML='<div class="row" style="margin-top:12px">'+aiBadge(r.source)+(r.source!=='ai'?'<small style="color:var(--mu)">memakai template/aturan</small>':'')+'</div><div class="res" id="aiT">'+esc(r.text)+'</div><div class="row" style="margin-top:8px"><button class="btn sm" data-act="copyAi">📋 Salin</button>'+(extra||'')+'</div>'}
A.copyAi=function(){var t=$('#aiT').textContent;if(navigator.clipboard)navigator.clipboard.writeText(t).then(function(){toast('Tersalin','ok')});else toast('Salin manual','err')};
A.aiChat=function(){var q=$('#q').value.trim();if(!q)return toast('Isi pesan pembeli','err');call('ai.reply',{question:q}).then(function(r){aiOut(r)}).catch(fail)};
A.aiCap=function(d){call('ai.caption',{product_id:$('#cp').value,style:$('#cs').value,mode:d.m}).then(function(r){aiOut(r);
  if(d.m==='broadcast'){var h='<div style="margin-top:10px"><b>Penerima ('+r.recipients.length+' repeat buyer)</b></div>'+(r.recipients.length?r.recipients.map(function(c){var t=r.text.replace(/\{nama\}/g,c.name.split(' ')[0]);return '<div class="row" style="padding:6px 0;border-bottom:1px solid var(--bd)"><span class="sp">'+esc(c.name)+'</span><a class="btn wa sm" target="_blank" rel="noopener" href="'+esc(waUrl(c.phone,t))+'">Kirim WA</a></div>'}).join(''):empty('Belum ada pelanggan repeat'));$('#air').insertAdjacentHTML('beforeend',h)}}).catch(fail)};
A.aiAddr=function(){var a=$('#aa').value.trim();if(!a)return toast('Isi alamat','err');call('ai.address',{address:a}).then(function(r){var x=r.result;
  $('#air').innerHTML='<div class="row" style="margin-top:12px">'+aiBadge(r.source)+'</div><div class="res">Jalan: '+esc(x.street||'-')+'\nRT/RW: '+esc(x.rt_rw||'-')+'\nKecamatan: '+esc(x.district||'-')+'\nKota: '+esc(x.city||'-')+'\nProvinsi: '+esc(x.province||'-')+'\nKode pos: '+esc(x.postal_code||'-')+'</div>'+(r.missing.length?'<div style="margin-top:8px">'+r.missing.map(function(m){return '<span class="chip p">⚠️ Kurang: '+esc(m)+'</span> '}).join('')+'</div>':'<span class="chip">Alamat lengkap ✅</span>')}).catch(fail)};

/* ---------- pengaturan ---------- */
R.settings=function(){var s=S.set;
  view('<div class="pg-h"><h1>Pengaturan</h1></div><div class="card"><h3>Profil Bisnis</h3><form data-form="set"><div class="grid g2"><div><label>Nama bisnis</label><input name="BUSINESS_NAME" required value="'+esc(s.BUSINESS_NAME)+'"></div><div><label>WhatsApp toko (628…)</label><input name="WHATSAPP" value="'+esc(s.WHATSAPP)+'"></div><div><label>URL logo</label><input name="LOGO_URL" value="'+esc(s.LOGO_URL)+'"></div><div><label>Pajak (%)</label><input type="number" min="0" max="100" step="0.1" name="TAX_PERCENT" value="'+esc(s.TAX_PERCENT)+'"></div><div><label>Nama pengirim (label)</label><input name="SENDER_NAME" value="'+esc(s.SENDER_NAME)+'"></div><div><label>HP pengirim</label><input name="SENDER_PHONE" value="'+esc(s.SENDER_PHONE)+'"></div></div><label>Alamat pengirim</label><textarea name="SENDER_ADDRESS" rows="2">'+esc(s.SENDER_ADDRESS)+'</textarea><label style="display:flex;gap:10px;align-items:center;color:var(--tx)"><input type="checkbox" name="AI_ENABLED" '+(s.AI_ENABLED?'checked':'')+'> Aktifkan fitur AI</label><p style="color:var(--mu);font-size:12px">Status AI: '+(s.ai_configured?'<span class="chip">Terkonfigurasi</span>':'<span class="chip p">Belum dikonfigurasi (isi Script Properties)</span>')+(s.ai_insecure?' <span class="chip p">Endpoint HTTP — pakai proxy HTTPS untuk produksi</span>':'')+'</p><button class="btn pri">Simpan</button></form></div>'+
  '<div class="card"><h3>Memori Ongkir per Kota</h3><div id="mem"></div><form data-form="mem" class="row" style="margin-top:8px"><input name="city" placeholder="Kota" required style="flex:1"><input type="number" name="cost" min="0" placeholder="Ongkir" required style="flex:1"><button class="btn">Tambah</button></form></div>'+
  '<div class="card"><h3>Pengguna</h3><div id="usr"></div><button class="btn" data-act="usrM">＋ Pengguna</button></div>'+
  '<div class="card"><h3>Data & Backup</h3><div class="row"><button class="btn" data-act="demoSeed">🧪 Muat data demo</button><button class="btn dng" data-act="demoReset">♻ Reset semua data</button><button class="btn acc" data-act="backup">☁ Backup ke Drive sekarang</button></div><small style="color:var(--mu)">Backup otomatis harian butuh trigger: jalankan installTriggers() sekali dari editor.</small></div>'+
  '<div class="card"><h3>Log Aktivitas</h3><button class="btn" data-act="actLog">Muat log</button><div id="act"></div></div>');
  drawMem();loadUsers()};
function drawMem(){var m=S.set.shipping_memory||{},k=Object.keys(m);$('#mem').innerHTML=k.length?k.map(function(c){return '<span class="chip" style="margin:3px">'+esc(c)+': '+rp(m[c])+' <a data-act="memDel" data-c="'+esc(c)+'" style="cursor:pointer">✕</a></span>'}).join(''):'<small>Belum ada. Tersimpan otomatis saat order disimpan.</small>'}
FM.mem=function(f){var v=fv(f),m=Object.assign({},S.set.shipping_memory);m[v.city.trim().toLowerCase()]=Number(v.cost);saveSet({shipping_memory:m},function(){R.settings()})};
A.memDel=function(d){var m=Object.assign({},S.set.shipping_memory);delete m[d.c];saveSet({shipping_memory:m},function(){R.settings()})};
function saveSet(vals,cb){call('settings.save',{values:vals}).then(function(s){S.set=s;S.biz={name:s.BUSINESS_NAME,logo:s.LOGO_URL};chrome();toast('Tersimpan','ok');if(cb)cb()}).catch(fail)}
FM.set=function(f){saveSet(fv(f))};
function loadUsers(){call('users.list',{},true).then(function(u){S.users=u;$('#usr').innerHTML='<table class="rt"><thead><tr><th>Username</th><th>Nama</th><th>Peran</th><th>Aktif</th><th></th></tr></thead><tbody>'+u.map(function(x){return T('<tr><td data-l="Username">{u}</td><td data-l="Nama">{n}</td><td data-l="Peran">{r}</td><td data-l="Aktif">{a}</td><td><button class="btn sm" data-act="usrM" data-u="{u}">Edit</button></td></tr>',{u:x.username,n:x.full_name,r:x.role,a:x.active?'✅':'—'})}).join('')+'</tbody></table>'}).catch(fail)}
A.usrM=function(d){var u=(S.users||[]).filter(function(x){return x.username===d.u})[0]||{active:true,role:'Admin'};
  modal(u.username?'Edit Pengguna':'Pengguna Baru','<form data-form="usr"><label>Username</label><input name="username" required '+(u.username?'readonly':'')+' value="'+esc(u.username||'')+'"><label>Nama lengkap</label><input name="full_name" required value="'+esc(u.full_name||'')+'"><label>Peran</label><select name="role"><option'+(u.role==='Owner'?' selected':'')+'>Owner</option><option'+(u.role==='Admin'?' selected':'')+'>Admin</option></select><label>Password '+(u.username?'(kosongkan jika tidak diganti)':'(min. 8 karakter)')+'</label><input type="password" name="password" minlength="8" '+(u.username?'':'required')+' autocomplete="new-password"><label style="display:flex;gap:10px;align-items:center;color:var(--tx)"><input type="checkbox" name="active" '+(u.active?'checked':'')+'> Aktif</label><div class="row" style="margin-top:12px"><button class="btn pri">Simpan</button><button type="button" class="btn" data-act="closeModal">Batal</button></div></form>')};
FM.usr=function(f){call('users.save',fv(f)).then(function(){closeModal();toast('Pengguna disimpan','ok');loadUsers()}).catch(fail)};
A.demoSeed=function(){call('demo.seed').then(function(){toast('Data demo dimuat','ok');return call('products.list',{},true)}).then(function(p){S.products=p}).catch(fail)};
A.demoReset=function(){var t=prompt('Ini menghapus SEMUA order, produk, supplier, pelanggan & pembayaran.\nKetik RESET untuk melanjutkan:');if(t!=='RESET')return;call('demo.reset',{confirm:'RESET'}).then(function(){S.products=[];toast('Data direset','ok')}).catch(fail)};
A.backup=function(){call('backup.now').then(function(r){toast('Backup dibuat: '+r.name,'ok')}).catch(fail)};
A.actLog=function(){call('activity.list').then(function(l){$('#act').innerHTML=l.length?'<table class="rt"><thead><tr><th>Waktu</th><th>User</th><th>Aksi</th><th>Detail</th></tr></thead><tbody>'+l.map(function(x){return T('<tr><td data-l="Waktu">{t}</td><td data-l="User">{u}</td><td data-l="Aksi">{a}</td><td data-l="Detail">{d}</td></tr>',{t:String(x.timestamp).slice(0,16).replace('-','/').replace('-','/'),u:x.user,a:x.action,d:x.detail})}).join('')+'</tbody></table>':empty('Log kosong')}).catch(fail)};

/* ---------- lisensi ---------- */
R.license=function(){call('license.status').then(function(l){S.lic=l;chrome();
  view('<div class="pg-h"><h1>Lisensi</h1></div><div class="card"><p>Status: <span class="chip '+(l.status==='active'?'':'p')+'">'+esc(l.label)+'</span> '+(l.masked?'<code>'+esc(l.masked)+'</code>':'')+'</p>'+(isOwner()?'<form data-form="lic"><label>Kunci lisensi (RP-XXXX-XXXX-XXXX-XXXX)</label><input name="key" required maxlength="40" placeholder="RP-…"><button class="btn pri" style="margin-top:10px">Aktifkan</button></form><p style="color:var(--mu);font-size:12px">Atau isi Script Property LICENSE_KEY di editor Apps Script, lalu muat ulang halaman ini.</p>':'<p>Hubungi Owner untuk mengaktifkan lisensi.</p>')+'<p>Belum punya lisensi? <a href="https://wa.me/'+esc(String(S.supportWa).replace(/\D/g,''))+'" target="_blank" rel="noopener">Hubungi Piyu via WhatsApp</a>. Baca <a data-act="go" data-p="terms" style="cursor:pointer">Syarat Lisensi</a>.</p></div>')}).catch(fail)};
FM.lic=function(f){call('license.save',fv(f)).then(function(l){S.lic=l;chrome();toast('Lisensi aktif 🎉','ok');confetti();R.license()}).catch(fail)};

/* ---------- halaman statis ---------- */
function page(t,sub,html){view('<div class="pg-h"><h1>'+t+'</h1>'+(sub?'<p>'+sub+'</p>':'')+'</div>'+html)}
R.guide=function(){var f=[['Cara membuat order dari chat WhatsApp?','Buka Order Baru → tempel chat berformat "Nama:", "HP:", "Alamat:", "Pesanan:" → Baca Pesan → cek kotak pink (produk tidak dikenali) → isi ongkir → Simpan. Ongkir kota yang pernah diinput akan diingat.'],['Apa arti kolom Pesanan?','Tulis satu produk per baris: "2x Hijab Pashmina", "Serum 1", atau "Kopi Gayo 3 pcs". Pisahkan beberapa produk dengan koma.'],['Bagaimana memindahkan status order?','Di Papan Order ketuk tombol → di kartu. Saat ke Dikirim aplikasi meminta nomor resi, lalu menyiapkan pesan WhatsApp berisi link pelacakan.'],['Bagaimana laba dihitung?','Laba = harga jual − harga modal − fee dropship supplier (per pcs). Ongkir diteruskan ke pembeli dan tidak dihitung sebagai laba. Order Retur dikecualikan.'],['Cara cetak label?','Menu Cetak Label → pilih order → Pratinjau → Cetak (ukuran A6) atau unduh PDF.'],['Apakah harus pakai AI?','Tidak. Semua fitur inti jalan tanpa AI. Tombol AI otomatis memakai template/aturan bila AI dimatikan (Pengaturan) atau gagal.'],['Perbedaan Owner & Admin?','Owner: semua fitur termasuk produk, supplier, laporan, pengaturan & pengguna. Admin: order, pelanggan, pembayaran, label (tanpa melihat modal/laba).'],['Bagaimana backup data?','Jalankan installTriggers() sekali di editor Apps Script: salinan spreadsheet dibuat tiap hari jam 02.00 ke folder "ResellerPro Backup" di Drive (14 terakhir disimpan).'],['Lupa password?','Owner lain bisa mereset di Pengaturan → Pengguna. Jika satu-satunya Owner, ubah manual di sheet Users oleh pemilik spreadsheet.']];
  page('Panduan & FAQ','Jawaban singkat untuk pertanyaan yang sering muncul.',f.map(function(x){return '<details><summary>'+esc(x[0])+'</summary><p>'+esc(x[1])+'</p></details>'}).join(''))};
R.about=function(){view('<div class="hero"><h1>ResellerPro 💜</h1><p>Order desk untuk reseller, dropshipper & penjual WhatsApp. Dari chat pembeli jadi pengiriman terlacak — tanpa ribet.</p><a class="btn" style="color:var(--p)" target="_blank" rel="noopener" href="https://wa.me/'+esc(String(S.supportWa).replace(/\D/g,''))+'">💬 Tanya Piyu</a></div><div class="grid g3">'+[['⚡','Tempel & jadi','Parser membaca Nama/HP/Alamat/Pesanan dalam hitungan detik.'],['🗂️','Papan Order','Status order jelas: Baru → Selesai, tanpa drag.'],['🏷️','Label A6 & Resi','Cetak label, kirim link pelacakan via WhatsApp.'],['💰','Laba akurat','Per order, supplier, produk & bulan.'],['✨','AI opsional','Balas chat, caption, rapikan alamat — bisa dimatikan.'],['🔒','Aman','Login berperan, log aktivitas, backup harian.']].map(function(x){return '<div class="card"><div style="font-size:30px">'+x[0]+'</div><h3>'+x[1]+'</h3><p style="color:var(--mu);margin:0">'+x[2]+'</p></div>'}).join('')+'</div><p style="text-align:center;color:var(--mu)">ResellerPro v'+esc(S.app.version)+' • © 2026 ResellerPro · Made by Piyu</p>')};
R.terms=function(){page('Syarat Lisensi','Berlaku untuk penggunaan ResellerPro.','<div class="card"><ol><li>Lisensi diberikan untuk satu bisnis/spreadsheet; tidak boleh dijual ulang atau dibagikan tanpa izin tertulis Piyu.</li><li>Masa trial 14 hari; setelahnya fitur tulis dikunci sampai kunci lisensi valid dimasukkan.</li><li>Kode boleh disesuaikan (nama, logo, template) untuk bisnis pemegang lisensi.</li><li>Aplikasi diberikan apa adanya; pemegang lisensi bertanggung jawab atas backup data dan kerahasiaan kredensial.</li><li>Fitur AI memakai layanan pihak ketiga yang dikonfigurasi pemilik; biaya dan kebijakannya mengikuti penyedia tersebut.</li></ol></div>')};
R.privacy=function(){page('Kebijakan Privasi','Bagaimana data diperlakukan.','<div class="card"><ul><li>Semua data (order, pelanggan, produk) tersimpan di Google Sheet milik Anda; pengembang tidak menerima salinan.</li><li>Password disimpan sebagai hash SHA-256 bersalt; tidak pernah dikirim ke browser.</li><li>Jika AI aktif, teks yang Anda kirim ke fitur AI (pertanyaan, alamat, nama produk) dikirim ke endpoint AI yang Anda konfigurasi. Kunci API hanya ada di Script Properties. Matikan AI di Pengaturan bila tidak ingin data dikirim keluar.</li><li>Aktivitas penting dicatat di sheet Log_Activity dan Log_AI untuk audit Owner.</li><li>Anda wajib menjaga data pembeli sesuai UU Pelindungan Data Pribadi yang berlaku.</li></ul></div>')};

/* ---------- event delegation & boot ---------- */
document.addEventListener('click',function(e){var el=e.target.closest('[data-act]');if(!el)return;var f=A[el.dataset.act];if(f){e.preventDefault();f(el.dataset,el,e)}});
function onIn(e){var el=e.target,k=el.dataset&&(e.type==='input'?el.dataset.inp:el.dataset.chg);if(k&&IN[k])IN[k](el)}
document.addEventListener('input',onIn);document.addEventListener('change',onIn);
document.addEventListener('submit',function(e){var f=e.target;if(f.dataset&&f.dataset.form&&FM[f.dataset.form]){e.preventDefault();FM[f.dataset.form](f)}});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeModal()});
(function boot(){
  call('bootstrap',{},true).then(function(b){S.app=b.app;S.supportWa=b.supportWa;S.biz=b.business;S.lic=b.license;S.needSetup=!!b.needSetup;S.access=b.access||S.access;chrome();
    var t=store.get('rp_tok'),toLogin=function(){S.token='';S.user=null;store.del('rp_tok');chrome();go(INIT.page&&PUBLIC[INIT.page]?INIT.page:'login')};
    if(b.needSetup)return toLogin();
    if(t){S.token=t;return afterLogin().catch(function(){S.token='';store.del('rp_tok');if(S.access.enabled)return afterLogin().catch(toLogin);toLogin()})}
    if(S.access.enabled)return afterLogin().catch(toLogin);
    toLogin()}).catch(function(e){view('<div class="card">'+empty('Gagal memuat aplikasi: '+e.message)+'</div>')})})();
`;
