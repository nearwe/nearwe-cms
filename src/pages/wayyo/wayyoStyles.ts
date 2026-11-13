export const wyStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
.wy{--bg:#f7f7f5;--ink:#141414;--muted:#6b6b6b;--soft:#9a9a9a;--line:#e4e4e1;--frame:#2a2a2a;--blue:#3559C7;--blue2:#4a74ec;--blue-soft:#e8eefc;
  --wy-primary:var(--blue);--wy-line:var(--line);--wy-muted:var(--muted);--wy-deep:#202A40;--wy-light:var(--blue-soft);
  min-height:100vh;background:var(--bg);color:var(--ink);font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;overflow-x:clip;
  background-image:radial-gradient(#00000014 1px,transparent 1.2px);background-size:22px 22px}
.wy *{box-sizing:border-box;letter-spacing:0}
.wy a{color:inherit;text-decoration:none}
.wy::before{content:"";position:fixed;inset:0 0 auto 0;height:2px;z-index:80;background:linear-gradient(90deg,var(--blue),#7ea0ff);transform-origin:0 50%;transform:scaleX(var(--wy-progress,0));pointer-events:none}
.wy a:focus-visible,.wy button:focus-visible,.wy summary:focus-visible{outline:2px solid var(--blue);outline-offset:3px;border-radius:6px}
.wy-pill{display:inline-block;font-size:10px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:#555;border:1px solid #9a9a9a;border-radius:999px;padding:6px 12px;background:#fff}
.wy-spin{animation:wy-spin .8s linear infinite}@keyframes wy-spin{to{transform:rotate(360deg)}}

/* nav */
.wy-nav{position:sticky;top:0;z-index:60;height:44px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:0 18px;background:#f7f7f5d9;-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid var(--line);font-size:13px}
.wy-nav-left{display:flex;align-items:center;gap:18px;color:var(--muted)}
.wy-nav-left a:hover,.wy-nav-left a.active{color:var(--ink)}
.wy-nav-brand{font-weight:700;color:var(--ink)!important}
.wy-nav-mark img{height:30px;width:auto;display:block;object-fit:contain;transition:transform .3s}
.wy-nav-mark:hover img{transform:rotate(-12deg) scale(1.08)}
.wy-nav-right{display:flex;justify-content:flex-end;align-items:center;gap:16px}
.wy-nav-status{display:flex;align-items:center;gap:10px;color:var(--soft);font-size:12px}
.wy-nav-cta{color:var(--blue)!important;font-weight:600}
.wy-nav-cta:hover{text-decoration:underline}

/* mac window */
.wy-win{margin:0;display:flex;flex-direction:column;align-items:center}
.wy-win>.wy-win-bar,.wy-win>.wy-win-body{width:100%}
.wy-win-bar{height:24px;display:flex;align-items:center;gap:5px;padding:0 9px;background:linear-gradient(#f3f3f3,#e3e3e3);border:1px solid #b9b9b9;border-bottom-color:#cfcfcf;border-radius:8px 8px 0 0}
.wy-win-bar i{width:9px;height:9px;border-radius:50%;background:#ff5f57;box-shadow:inset 0 0 0 .5px #0003}
.wy-win-bar i:nth-child(2){background:#febc2e}.wy-win-bar i:nth-child(3){background:#28c840}
.wy-win-bar span{flex:1;text-align:center;font-size:10px;color:#777;margin-right:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wy-win-bar b{font-weight:400;color:#aaa;font-size:12px;margin-left:auto}
.wy-win-bar span+b{margin-left:0}
.wy-win-body{background:#fff;border:1px solid #b9b9b9;border-top:0;border-radius:0 0 8px 8px;box-shadow:0 18px 40px -22px #0006,0 2px 6px -2px #0002;overflow:hidden}
.wy-win figcaption{font-size:10px;color:var(--soft);margin-top:7px}

/* hero */
.wy-hero{position:relative;max-width:1280px;margin:0 auto;min-height:610px;padding:178px 24px 40px;scroll-margin-top:60px}
.wy-hero-center{position:relative;z-index:2;text-align:center;pointer-events:none}
.wy-hero-center>*{pointer-events:auto}
.wy-hero h1{font-size:clamp(64px,9vw,112px);font-weight:600;letter-spacing:-.055em;line-height:.95;margin:0;color:var(--ink)}
.wy-hero-center>p{font-size:clamp(15px,1.5vw,18px);color:#333;margin:14px 0 30px}

/* download pills */
.wy-dl-wrap{display:grid;justify-items:center;gap:14px}
.wy-dl{display:flex;justify-content:center;gap:18px;flex-wrap:wrap}
.wy-dl-item{display:grid;justify-items:center;gap:8px}
.wy-dl-item small{font-size:10.5px;color:var(--soft)}
.wy-dl-btn{display:inline-flex;align-items:center;gap:10px;height:40px;padding:0 20px;border-radius:999px;font-size:15px;font-weight:500;white-space:nowrap;transition:transform .2s,box-shadow .2s,background .2s}
.wy .wy-dl-win{background:linear-gradient(#5f86f5,#3559C7);color:#fff;border:1px solid #2747a8;box-shadow:inset 0 1px 0 #ffffff55,0 6px 16px -6px #3559c7aa}
.wy .wy-dl-win:hover{transform:translateY(-1px);box-shadow:inset 0 1px 0 #ffffff55,0 10px 22px -8px #3559c7cc}
.wy .wy-dl-win:active{transform:scale(.98)}
.wy-dl-mac{background:#fff;color:#888;border:1px solid #c9c9c9;cursor:not-allowed;position:relative}
.wy-dl-mac::after{content:"soon";position:absolute;top:-9px;right:-8px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;background:#ffd84d;color:#3a2f00;border:1px solid #d1ad1f;padding:2px 6px;border-radius:999px;transform:rotate(6deg)}
.wy-ms{display:grid;grid-template-columns:1fr 1fr;gap:2px;width:15px;height:15px}
.wy-ms i{background:#f25022}.wy-ms i:nth-child(2){background:#7fba00}.wy-ms i:nth-child(3){background:#00a4ef}.wy-ms i:nth-child(4){background:#ffb900}
.wy-dl-note{font-size:11px;color:var(--soft);margin:0}
.wy-dl-note b{color:#555;font-variant-numeric:tabular-nums}
.wy-dl-note a{color:var(--blue);text-decoration:underline;text-underline-offset:2px}

/* floating desktop clutter */
.wy-floats{position:absolute;inset:0;z-index:1}
.wy-float{position:absolute;cursor:grab;user-select:none;touch-action:none;animation:wy-bob 6s ease-in-out infinite}
.wy-float:nth-child(3n){animation-duration:7.5s;animation-delay:-2s}
.wy-float:nth-child(3n+1){animation-duration:5.5s;animation-delay:-1s}
.wy-float.is-dragging{cursor:grabbing;z-index:5;animation-play-state:paused}
.wy-float.is-dragging .wy-win-body{box-shadow:0 30px 60px -20px #0007}
@keyframes wy-bob{50%{transform:translateY(-7px)}}
.f-flow{left:3%;top:50px;width:190px}
.f-tag-blue{left:21%;top:24px}
.f-ai{left:35%;top:6px;width:210px}
.f-k1{left:27%;top:132px}
.f-k2{right:29%;top:74px}
.f-k3{left:20%;top:420px}
.f-k4{right:23%;top:330px}
.f-orb{right:37%;top:172px}
.f-report{right:4%;top:34px;width:230px}
.f-tag-red{right:1.5%;top:178px}
.f-folder1{left:21%;top:212px}
.f-folder2{right:20%;top:420px}
.f-files{left:2.5%;top:350px;width:200px}
.f-meet{right:3%;top:320px;width:176px}
.f-box{left:13%;top:470px;width:86px}
.f-box img{width:100%;display:block;transform:rotate(-10deg);filter:drop-shadow(0 12px 16px #0003);pointer-events:none}
.wy-kao{font-size:17px;color:#222;white-space:nowrap}
.wy-orb{width:18px;height:18px;border-radius:50%;background:conic-gradient(#ff5f57,#febc2e,#28c840,#00a4ef,#7b61ff,#ff5f57);box-shadow:0 2px 6px #0003}
.wy-nametag{transform:rotate(-6deg);width:86px;background:#2b5ce6;border-radius:4px;padding:5px 5px 6px;box-shadow:0 6px 14px -6px #0006;text-align:center}
.wy-nametag small{display:block;font-size:6px;font-weight:800;color:#fff;letter-spacing:.3px;margin-bottom:4px}
.wy-nametag b{display:block;background:#fff;font:italic 600 14px 'Georgia',serif;color:#222;padding:5px 0;border-radius:2px}
.wy-nametag.red{background:#e0303a;transform:rotate(8deg)}
.wy-folder{position:relative;display:inline-block;width:38px;height:28px;border-radius:3px 4px 4px 4px;background:linear-gradient(#7cc0f5,#4ea3ea);box-shadow:inset 0 1px 0 #ffffff80,0 3px 6px -2px #0004}
.wy-folder::before{content:"";position:absolute;left:0;top:-5px;width:15px;height:7px;border-radius:3px 3px 0 0;background:#6cb4f1}
.wy-folder small{position:absolute;top:33px;left:50%;transform:translateX(-50%);font-size:10px;color:#555;white-space:nowrap}
.wy-mini-flow{display:grid;gap:5px;padding:10px}
.wy-mini-flow span{position:relative;font-size:10px;padding:6px 8px;border-radius:6px;background:var(--blue-soft);color:#24418f}
.wy-mini-flow span:not(:last-child)::after{content:"";position:absolute;left:14px;bottom:-6px;width:1px;height:6px;background:#9cb2ec}
.wy-mini-flow span.ok{background:#e3f6ea;color:#18794e}
.wy-mini-flow span{animation:wy-step 4s ease-in-out infinite}
.wy-mini-flow span:nth-child(2){animation-delay:1s}.wy-mini-flow span:nth-child(3){animation-delay:2s}.wy-mini-flow span:nth-child(4){animation-delay:3s}
@keyframes wy-step{0%,20%{box-shadow:0 0 0 1.5px var(--blue)}30%,100%{box-shadow:none}}
.wy-mini-chat{padding:10px;display:grid;gap:6px}
.wy-mini-chat p{margin:0;font-size:10px;line-height:1.4;padding:6px 8px;border-radius:9px;max-width:88%}
.wy-mini-chat .me{justify-self:end;background:var(--blue);color:#fff;border-bottom-right-radius:3px}
.wy-mini-chat .ai{background:#f0f0ee;color:#222;border-bottom-left-radius:3px}
.wy-mini-chat small{font-size:8.5px;color:#18794e}
.wy-mini-table{padding:10px;display:grid;gap:6px}
.wy-mini-table div{display:grid;grid-template-columns:52px 1fr 48px;align-items:center;gap:6px;font-size:9.5px}
.wy-mini-table span{color:#555}
.wy-mini-table i{height:7px;border-radius:4px;background:linear-gradient(90deg,#28c840,#7fd99a)}
.wy-mini-table b{font-weight:600;text-align:right;font-variant-numeric:tabular-nums}
.wy-mini-files{display:grid;grid-template-columns:repeat(3,1fr);gap:12px 6px;padding:14px 8px 10px}
.wy-mini-files span{display:grid;justify-items:center;gap:4px;font-size:9px;color:#555}
.wy-mini-files .wy-folder{width:30px;height:22px}
.wy-mini-meet{background:#141b2d;padding:8px}
.wy-mini-meet>div{display:grid;grid-template-columns:1fr 1fr;gap:5px}
.wy-mini-meet span{aspect-ratio:4/3;border-radius:5px;background:#26314d;display:grid;place-items:center;font-size:10px;font-weight:700;color:#c9d6ff}
.wy-mini-meet span.on{box-shadow:0 0 0 1.5px #6a8bf0}
.wy-mini-meet small{display:block;margin-top:6px;font-size:8.5px;color:#ff8a80}

/* showcase */
.wy-showcase{max-width:900px;margin:0 auto;padding:0 24px 90px}
.wy-win-hero .wy-win-body{border-radius:0 0 12px 12px}
.wy-win-hero .wy-win-bar{height:30px;border-radius:12px 12px 0 0}
.wy-dash{display:grid;grid-template-columns:150px 1fr;min-height:360px;font-size:12px;background:#fafaf9}
.wy-dash aside{display:flex;flex-direction:column;gap:3px;padding:14px 10px;border-right:1px solid var(--line);background:#fff}
.wy-dash aside b{display:flex;align-items:center;gap:7px;font-size:14px;margin:0 0 12px 4px}
.wy-dash aside b img{height:22px;width:auto;object-fit:contain}
.wy-dash aside span{padding:7px 9px;border-radius:7px;color:#555}
.wy-dash aside span.on{background:var(--blue-soft);color:var(--blue);font-weight:600}
.wy-dash aside small{margin-top:auto;font-size:10px;color:#18794e;padding:0 6px}
.wy-dash-main{padding:16px;min-width:0}
.wy-dash-hello small{font-size:11px;color:var(--muted)}
.wy-dash-hello h3{font-size:20px;font-weight:600;letter-spacing:-.02em;margin:2px 0 12px}
.wy-dash-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px}
.wy-dash-stats div{background:#fff;border:1px solid var(--line);border-radius:9px;padding:10px}
.wy-dash-stats small{display:block;font-size:10px;color:var(--muted)}
.wy-dash-stats b{font-size:16px;font-weight:600}
.wy-dash-list{background:#fff;border:1px solid var(--line);border-radius:10px;overflow:hidden}
.wy-dash-list>div{display:flex;align-items:center;gap:10px;padding:11px 12px;border-top:1px solid #f0f0ee;transition:background .3s}
.wy-dash-list>div:first-child{border-top:0}
.wy-dash-list>div>div{flex:1;min-width:0;display:grid;gap:2px}
.wy-dash-list b{font-weight:600}
.wy-dash-list small{font-size:10px;color:var(--muted)}
.wy-dash-list code{font:10px ui-monospace,Consolas,monospace;color:#24418f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wy-dash-list .dot{width:8px;height:8px;border-radius:50%;background:#cfcfcf;flex:none}
.wy-dash-list em{font-style:normal;font-size:10px;color:var(--muted);padding:4px 8px;border-radius:999px;background:#f2f2f0}
.wy-dash-list .is-running{background:#f5f8ff}
.wy-dash-list .is-running .dot{background:#28c840;box-shadow:0 0 0 4px #28c84033;animation:wy-pulse 1.2s ease-in-out infinite}
.wy-dash-list .is-running em{background:var(--blue);color:#fff}
@keyframes wy-pulse{50%{box-shadow:0 0 0 7px #28c84000}}
.wy-dash-note{text-align:right;font-size:9px;color:var(--soft);margin:8px 0 0}

/* quick features */
.wy-quick{max-width:1000px;margin:0 auto;padding:30px 24px 90px;text-align:center}
.wy-quick-head h2,.wy-split-head h2,.wy-local h2,.wy-audience h2,.wy-cta h2{font-size:clamp(30px,4vw,46px);font-weight:600;letter-spacing:-.04em;line-height:1.05;margin:18px 0 0}
.wy-quick-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:40px;text-align:left}
.wy-quick-card{display:flex;gap:13px;align-items:flex-start;padding:18px;background:#fff;border:1px solid var(--line);border-radius:14px;transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s,border-color .25s}
.wy-quick-card:hover{transform:translateY(-3px);border-color:#c8d4f4;box-shadow:0 16px 30px -18px #3559c766}
.wy-quick-card>span{flex:none;width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:var(--blue-soft);color:var(--blue)}
.wy-quick-card b{font-size:14px;font-weight:600}
.wy-quick-card p{font-size:13px;color:var(--muted);margin:4px 0 0;line-height:1.45}
.wy-quick-more{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:26px}
.wy-quick-more a{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:500;padding:9px 16px;border-radius:999px;border:1px solid var(--frame);background:#fff;transition:transform .2s,box-shadow .2s}
.wy-quick-more a:hover{transform:translateY(-1px);box-shadow:0 8px 18px -8px #0004}

/* love wall */
.wy-love{position:relative;padding:80px 24px 70px;background:#f2f2f0;border-block:1px solid var(--line);text-align:center;overflow:hidden}
.wy-love-head{display:flex;align-items:center;justify-content:center;gap:28px;margin:22px auto 54px;max-width:1200px;white-space:nowrap}
.wy-love-main,.wy-love-ghost{font-size:clamp(30px,4.2vw,48px);line-height:1.1;letter-spacing:-.035em;margin:0}
.wy-love-main{font-weight:700;color:#111;flex:none;animation:wy-love-in .55s cubic-bezier(.2,.8,.2,1) both}
.wy-love-ghost{font-weight:600;color:#9c9c9c;flex:1 1 0;overflow:hidden;filter:blur(.4px)}
.wy-love-ghost-l{text-align:right;direction:rtl;-webkit-mask-image:linear-gradient(90deg,transparent,#000 70%);mask-image:linear-gradient(90deg,transparent,#000 70%)}
.wy-love-ghost-r{text-align:left;-webkit-mask-image:linear-gradient(90deg,#000 30%,transparent);mask-image:linear-gradient(90deg,#000 30%,transparent)}
@keyframes wy-love-in{from{opacity:0;transform:translateY(14px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
.wy-love-grid{columns:3 290px;column-gap:16px;max-width:930px;margin:0 auto;padding-top:4px;text-align:left;max-height:760px;overflow:hidden;-webkit-mask-image:linear-gradient(#000 72%,transparent);mask-image:linear-gradient(#000 72%,transparent);transition:max-height .7s ease}
.wy-love-grid.is-open{max-height:3000px;-webkit-mask-image:none;mask-image:none}
.wy-note{break-inside:avoid;margin:0 0 16px;background:#fff;border:1px solid #1d2b45;border-radius:7px;overflow:hidden;box-shadow:0 1px 0 #0000000d;transition:transform .25s cubic-bezier(.2,.8,.2,1),box-shadow .25s}
.wy-note:hover{transform:translateY(-3px) rotate(-.4deg);box-shadow:0 14px 30px -12px #0003}
.wy-note-bar{height:25px;display:flex;align-items:center;gap:5px;padding:0 9px;border-bottom:1px solid var(--frame);background:linear-gradient(90deg,var(--tint),color-mix(in srgb,var(--tint) 40%,#fff) 55%,var(--tint))}
.wy-note-bar i{width:8px;height:8px;border-radius:50%;background:#ff5f57;box-shadow:inset 0 0 0 1px #0002}
.wy-note-bar i:nth-child(2){background:#febc2e}.wy-note-bar i:nth-child(3){background:#28c840}
.wy-note-bar b{margin-left:auto;font-size:11px;font-weight:700;color:#4a4a4a}
.wy-note-body{padding:14px 15px 13px}
.wy-note-who{display:flex;align-items:center;gap:10px}
.wy-note-who>div{display:grid;flex:1;min-width:0;line-height:1.25}
.wy-note-who b{font-size:13px;font-weight:600;color:#111}
.wy-note-who small{font-size:11.5px;color:#8a8a8a}
.wy-note-avatar{width:34px;height:34px;flex:none;border-radius:8px;display:grid;place-items:center;font-size:12px;font-weight:700;color:#1d1d1d;border:1px solid #0000001a}
.wy-note-heart{display:grid;place-items:center;width:38px;height:24px;border:1px solid #3d7bf0;border-radius:4px;color:#3d7bf0;transition:background .2s,color .2s}
.wy-note:hover .wy-note-heart{background:#3d7bf0;color:#fff}
.wy-note p{font-size:14px;line-height:1.55;color:#262626;margin:14px 0 12px}
.wy-note time{display:block;font-size:11px;color:#a0a0a0}
.wy-love-more{display:inline-flex;align-items:center;gap:7px;margin-top:6px;padding:10px 18px;border-radius:999px;border:1px solid var(--frame);background:#fff;font:500 13px Inter,sans-serif;color:#111;cursor:pointer;transition:transform .2s,box-shadow .2s}
.wy-love-more:hover{transform:translateY(-1px);box-shadow:0 8px 18px -8px #0004}

/* pricing */
.wy-intro h1 span{font-style:normal;background:linear-gradient(100deg,#3559C7 10%,#6f93ff 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
.wy-pricing{padding:110px 24px 120px;scroll-margin-top:44px}
.wy-pricing-head{text-align:center;max-width:620px;margin:0 auto 54px}
.wy-pricing-head h2{font-size:clamp(34px,4.4vw,52px);font-weight:600;letter-spacing:-.04em;line-height:1.05;margin:18px 0 0;color:#fff;text-shadow:0 2px 18px #0a2a6a55}
.wy-pricing-head p{font-size:16px;line-height:1.6;color:#fff;margin:14px 0 0;text-shadow:0 1px 10px #0a2a6a66}
.wy-plans{display:grid;grid-template-columns:repeat(2,minmax(0,300px));justify-content:center;gap:16px;align-items:stretch}
.wy-plan{position:relative;display:flex;flex-direction:column;border:1px solid #1d2b45;border-radius:8px;text-align:center;box-shadow:0 30px 60px -30px #0a2a6a99;transition:transform .3s cubic-bezier(.2,.8,.2,1)}
.wy-plan:hover{transform:translateY(-4px)}
.wy-plan-bar{height:22px;display:flex;align-items:center;gap:5px;padding:0 8px;border-radius:7px 7px 0 0;background:linear-gradient(#a9c3ea,#8eaedf);border-bottom:1px solid #6d8fc7}
.wy-plan-bar i{width:8px;height:8px;border-radius:50%;background:#ff5f57;box-shadow:inset 0 0 0 .5px #0003}
.wy-plan-bar i:nth-child(2){background:#febc2e}.wy-plan-bar i:nth-child(3){background:#28c840}
.wy-plan-pro .wy-plan-bar{background:linear-gradient(#6f9cf5,#3d74e6);border-bottom-color:#2a5bc4}
.wy-plan-badge{position:absolute;top:-10px;left:50%;transform:translateX(-50%);display:inline-flex;align-items:center;gap:4px;white-space:nowrap;font-size:11px;font-weight:500;padding:3px 10px;border-radius:999px;background:#eef3ff;color:#1d2b45;border:1px solid #1d2b45;box-shadow:0 2px 6px #0003}
.wy-plan-pro .wy-plan-badge{background:#ffd84d;border-color:#8a6d00;color:#3a2f00}
.wy-plan-in{flex:1;display:flex;flex-direction:column;align-items:center;padding:26px 22px 24px;border-radius:0 0 7px 7px;background:linear-gradient(#fff 0%,#ffffffee 45%,#ffffffb8 100%);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.wy-plan h3{font-size:24px;font-weight:600;margin:0;letter-spacing:-.02em}
.wy-plan-sub{font-size:15px;color:#222;margin:8px 0 6px}
.wy-plan-best{font-size:11px;color:var(--soft);padding-bottom:20px;width:100%;border-bottom:1px dashed #d6d6d6}
.wy-plan-price{display:grid;justify-items:center;gap:10px;padding:26px 0 18px}
.wy-plan-price b{font-size:50px;line-height:1;font-weight:600;letter-spacing:-.04em;color:#111}
.wy-plan-price small{font-size:12px;color:#333}
.wy .wy-plan-cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;height:34px;padding:0 18px;border-radius:999px;font-weight:500;font-size:14px;background:linear-gradient(#6f9cf5,#3559C7);color:#fff;border:1px solid #2747a8;box-shadow:inset 0 1px 0 #ffffff66,0 4px 10px -4px #3559c7aa;transition:transform .2s}
.wy .wy-plan-cta:hover{transform:translateY(-1px)}
.wy .wy-plan-cta.is-disabled{background:linear-gradient(#fff,#ececec);border-color:#9a9a9a;color:#666;box-shadow:inset 0 1px 0 #fff;cursor:not-allowed;transform:none}
.wy-plan-list{width:100%;text-align:left;margin-top:24px;padding-top:20px;border-top:1px dashed #d6d6d6}
.wy-plan-list>span{font-size:13px;color:var(--muted)}
.wy-plan-list ul{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:10px}
.wy-plan-list li{display:flex;gap:9px;align-items:flex-start;font-size:13px;line-height:1.4;color:#1d1d1d}
.wy-plan-list li svg{flex:none;width:16px;height:16px;padding:2.5px;margin-top:1px;border-radius:50%;background:#141414;color:#fff}
.wy-plan-pro .wy-plan-list li svg{background:var(--blue)}

/* sky + clouds (feedback & pricing) */
.wy-sky{position:relative;isolation:isolate;overflow:hidden;border:0;background:linear-gradient(#1c5bb5 0%,#2d6fca 40%,#5c98e2 75%,#8cbcf0 100%)}
.wy-sky::before,.wy-sky::after{content:"";position:absolute;inset:-5% 0 -5% -1600px;z-index:-1;pointer-events:none;background-repeat:repeat-x;background-size:1600px 100%}
.wy-sky::before{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000'><filter id='c' x='0' y='0' width='100%25' height='100%25'><feTurbulence type='fractalNoise' baseFrequency='0.0028 0.0055' numOctaves='6' seed='11' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  2.9 0 0 0 -1.3'/></filter><rect width='100%25' height='100%25' filter='url(%23c)'/></svg>");opacity:.95;animation:wy-drift 160s linear infinite}
.wy-sky::after{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='1000'><filter id='c' x='0' y='0' width='100%25' height='100%25'><feTurbulence type='fractalNoise' baseFrequency='0.006 0.011' numOctaves='5' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  3.2 0 0 0 -1.7'/></filter><rect width='100%25' height='100%25' filter='url(%23c)'/></svg>");opacity:.55;animation:wy-drift 90s linear infinite reverse}
@keyframes wy-drift{to{transform:translateX(1600px)}}
.wy-sky .wy-pill{background:#ffffffe6;border-color:#ffffff;color:#3a4a66}

/* cta band */
.wy-cta{text-align:center;padding:90px 24px 100px;border-top:1px solid var(--line)}
.wy-cta>p{font-size:14px;color:var(--muted);margin:12px 0 28px}

/* sub-page intro */
.wy-intro{max-width:820px;margin:0 auto;padding:90px 24px 50px;text-align:center}
.wy-intro h1{font-size:clamp(40px,6vw,72px);font-weight:600;letter-spacing:-.05em;line-height:1;margin:20px 0 0}
.wy-intro p{font-size:16px;color:var(--muted);line-height:1.6;max-width:580px;margin:18px auto 0}

/* features page */
.wy-feat-grid{max-width:1080px;margin:0 auto;padding:10px 24px 90px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.wy-feat{align-items:stretch}
.wy-feat .wy-win-body{position:relative;flex:1;padding:22px}
.wy-feat-icon{width:38px;height:38px;border-radius:10px;display:grid;place-items:center;background:var(--blue-soft);color:var(--blue)}
.wy-feat small{position:absolute;top:24px;right:20px;font-size:10px;color:var(--soft)}
.wy-feat h3{font-size:16px;font-weight:600;letter-spacing:-.01em;margin:16px 0 8px}
.wy-feat p{font-size:13px;line-height:1.6;color:var(--muted);margin:0}
.wy-feat:hover .wy-win-body{box-shadow:0 26px 50px -24px #3559c770}
.wy-split{max-width:1080px;margin:0 auto;padding:80px 24px;display:grid;grid-template-columns:.85fr 1.15fr;gap:70px;border-top:1px solid var(--line)}
.wy-split-head{position:sticky;top:70px;align-self:start}
.wy-split-head p,.wy-local p{font-size:14px;line-height:1.7;color:var(--muted);margin:14px 0 0}
.wy-uses{list-style:none;margin:0;padding:0}
.wy-uses li{display:grid;grid-template-columns:30px 1fr 16px;gap:12px;padding:18px 0;border-bottom:1px solid var(--line);transition:padding .2s}
.wy-uses li:first-child{border-top:1px solid var(--line)}
.wy-uses li:hover{padding-left:6px}
.wy-uses li>span{font-size:11px;font-weight:700;color:var(--blue);padding-top:2px}
.wy-uses b{font-size:15px;font-weight:600}
.wy-uses p{font-size:13px;color:var(--muted);margin:4px 0 0}
.wy-uses svg{color:var(--soft);margin-top:3px}
.wy-local{max-width:1080px;margin:0 auto;padding:80px 24px;display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}
.wy-local-art{position:relative;height:320px;border-radius:16px;background:var(--blue-soft);display:grid;place-items:center;overflow:hidden;border:1px solid #d4def7}
.wy-local-art .ring{position:absolute;border:1px solid #b8c8f1;border-radius:50%;width:250px;height:250px;animation:wy-spin 40s linear infinite}
.wy-local-art .r2{width:180px;height:180px;border-style:dashed;animation-direction:reverse}
.wy-local-art .lock{position:relative;z-index:1;width:80px;height:80px;border-radius:22px;background:var(--blue);color:#fff;display:grid;place-items:center;box-shadow:0 14px 30px #3559c755}
.wy-local-art i{position:absolute;font-style:normal;font-size:10px;font-weight:600;background:#fff;border:1px solid #d4def7;border-radius:999px;padding:6px 10px;color:#24418f}
.wy-local-art .l1{top:16%;left:10%}.wy-local-art .l2{top:26%;right:8%}.wy-local-art .l3{bottom:14%;left:36%}
.wy-local ul{list-style:none;padding:0;margin:20px 0 0;display:grid;gap:10px}
.wy-local li{display:flex;gap:9px;font-size:13px;color:#333}
.wy-local li svg{flex:none;color:var(--blue);margin-top:1px}
.wy-audience{background:var(--wy-deep);color:#fff;padding:70px max(6vw,24px);display:grid;grid-template-columns:.8fr 1.2fr;gap:50px;align-items:center}
.wy-audience h2{margin:0}
.wy-audience>div{display:grid;grid-template-columns:1fr 1fr;gap:22px 32px}
.wy-audience b{font-size:15px;font-weight:600}
.wy-audience p{font-size:13px;color:#b8c3dd;margin:5px 0 0}
.wy-specs{max-width:760px;margin:0 auto;padding:90px 24px 40px}
.wy-specs dl{display:grid;grid-template-columns:110px 1fr;margin:0;font-size:13px}
.wy-specs dt,.wy-specs dd{margin:0;padding:12px 18px;border-top:1px solid #f0f0ee}
.wy-specs dt{font:12px ui-monospace,Consolas,monospace;color:var(--blue)}
.wy-specs dd{color:#333}
.wy-specs dt:first-child,.wy-specs dt:first-child+dd{border-top:0}

/* meetings page */
.wy-meet{max-width:980px;margin:0 auto;padding:10px 24px 90px}
.wy-meet-win .wy-win-body{background:#141b2d;color:#fff;padding:14px}
.wy-meet-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:11px}
.wy-meet-top .rec{display:flex;align-items:center;gap:6px;color:#ff8a80;font-weight:600}
.wy-meet-top .rec i{width:8px;height:8px;border-radius:50%;background:#ff5f57;animation:wy-blink 1.4s ease-in-out infinite}
@keyframes wy-blink{50%{opacity:.25}}
.wy-meet-top .lim{display:flex;align-items:center;gap:4px;padding:4px 10px;border-radius:999px;background:#3559c755;color:#c9d6ff}
.wy-meet-body{display:grid;grid-template-columns:1.3fr 1fr;gap:12px}
.wy-meet-tiles{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.wy-meet-tiles>div{position:relative;aspect-ratio:4/3;border-radius:10px;background:linear-gradient(135deg,#25304c,#1b2338);display:grid;place-items:center;border:2px solid transparent}
.wy-meet-tiles>div.on{border-color:#6a8bf0;box-shadow:0 0 0 4px #6a8bf030}
.wy-meet-tiles span{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;background:var(--blue);font-weight:700}
.wy-meet-tiles small{position:absolute;left:8px;bottom:7px;display:flex;align-items:center;gap:3px;font-size:10px;color:#d5dcf0;background:#00000055;padding:2px 7px;border-radius:5px}
.wy-meet-body aside{display:flex;flex-direction:column;gap:9px;min-width:0}
.wy-meet-body .tr,.wy-meet-body .mom{border-radius:10px;padding:12px;background:#1e2740}
.wy-meet-body .mom{background:linear-gradient(135deg,#3559C7,#4d74e6)}
.wy-meet-body aside b{display:flex;align-items:center;gap:5px;font-size:11px;margin-bottom:8px;color:#c9d6ff}
.wy-meet-body .mom b{color:#fff}
.wy-meet-body .tr p{font-size:11px;line-height:1.45;margin:0 0 7px;color:#e4e9f7}
.wy-meet-body .tr em{display:block;font-style:normal;font-size:9px;color:#8fa3d6}
.wy-meet-body ul{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.wy-meet-body li{display:flex;align-items:center;gap:6px;font-size:11px}
.wy-perks{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:40px}
.wy-perks article{display:grid;gap:12px;padding:18px;background:#fff;border:1px solid var(--line);border-radius:14px}
.wy-perks span{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;background:var(--blue-soft);color:var(--blue)}
.wy-perks b{font-size:14px;font-weight:600}
.wy-perks p{font-size:12.5px;color:var(--muted);margin:5px 0 0;line-height:1.5}
.wy-soon{text-align:center;font-size:13px;color:var(--muted);margin:28px 0 0}

/* faq page */
.wy-faq{max-width:760px;margin:0 auto;padding:0 24px 80px}
.wy-faq details{background:#fff;border:1px solid var(--line);border-radius:12px;margin-bottom:10px;transition:border-color .2s,box-shadow .2s}
.wy-faq details[open]{border-color:#c8d4f4;box-shadow:0 14px 30px -20px #3559c766}
.wy-faq summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:16px;padding:17px 20px;font-size:15px;font-weight:500}
.wy-faq summary::-webkit-details-marker{display:none}
.wy-faq summary span{font-size:20px;line-height:1;color:var(--blue);transition:transform .2s}
.wy-faq details[open] summary span{transform:rotate(45deg)}
.wy-faq details p{margin:0;padding:0 20px 18px;font-size:14px;line-height:1.65;color:var(--muted)}

/* footer */
.wy-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:18px;padding:28px max(4vw,18px);border-top:1px solid var(--line);background:#f7f7f5}
.wy-footer-brand{display:flex;align-items:center;gap:12px}
.wy-footer-brand img{width:52px;height:34px;object-fit:contain}
.wy-footer-brand div{display:grid}
.wy-footer-brand b{font-size:16px;font-weight:700}
.wy-footer-brand small{font-size:12px;color:var(--muted)}
.wy-footer nav{display:flex;gap:18px;flex-wrap:wrap;font-size:13px;color:var(--muted)}
.wy-footer nav a{display:inline-flex;align-items:center;gap:4px}
.wy-footer nav a:hover{color:var(--ink)}
.wy-footer-copy{width:100%;font-size:11px;color:var(--soft)}

/* responsive */
@media(max-width:1140px){.wy-floats{display:none}.wy-hero{min-height:0;padding:96px 20px 60px}}
@media(max-width:900px){.wy-quick-grid,.wy-feat-grid{grid-template-columns:1fr 1fr}.wy-split,.wy-local{grid-template-columns:1fr;gap:36px}.wy-split-head{position:static}.wy-audience{grid-template-columns:1fr;gap:30px}.wy-perks{grid-template-columns:1fr 1fr}.wy-meet-body{grid-template-columns:1fr}}
@media(max-width:760px){.wy-plans{grid-template-columns:minmax(0,340px);gap:30px}.wy-love-ghost{display:none}.wy-love-head{white-space:normal;margin-bottom:40px}.wy-love-grid{max-height:900px}.wy-nav-status{display:none}}
@media(max-width:640px){
.wy-nav{grid-template-columns:auto 1fr auto;gap:10px;padding:0 14px}
.wy-nav-left a:not(.wy-nav-brand){display:none}
.wy-nav-mark{justify-self:center}
.wy-hero{padding:70px 16px 44px}
.wy-dl{flex-direction:column;align-items:center}
.wy-showcase{padding:0 12px 60px}
.wy-dash{grid-template-columns:1fr}.wy-dash aside{display:none}
.wy-quick,.wy-pricing{padding-left:16px;padding-right:16px}
.wy-quick-grid,.wy-feat-grid,.wy-perks{grid-template-columns:1fr}
.wy-love{padding:64px 16px 56px}
.wy-pricing{padding:80px 16px 90px}.wy-plan-price b{font-size:42px}
.wy-intro{padding:64px 16px 36px}
.wy-feat-grid,.wy-split,.wy-local,.wy-meet,.wy-faq,.wy-specs{padding-left:16px;padding-right:16px}
.wy-specs dl{grid-template-columns:1fr}.wy-specs dd{border-top:0;padding-top:0}
.wy-audience{padding:56px 16px}.wy-audience>div{grid-template-columns:1fr}
}
@media(prefers-reduced-motion:reduce){.wy *{animation:none!important;transition:none!important}}

/* live count bar under the feedback wall */
.wy-countbar{position:relative;z-index:2;max-width:1000px;margin:-70px auto 26px;display:flex;align-items:center;justify-content:center;min-height:86px;padding:14px 24px 14px 170px;background:linear-gradient(#fff,#f6f6f4);border:1px solid #dcdcd8;border-radius:10px;box-shadow:0 18px 40px -22px #0004,inset 0 1px 0 #fff}
.wy-countbar img{position:absolute;left:44px;top:50%;width:104px;transform:translateY(-46%) rotate(-7deg);filter:drop-shadow(0 12px 14px #0004);transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.wy-countbar:hover img{transform:translateY(-52%) rotate(-2deg) scale(1.04)}
.wy-countbar p{margin:0;font-size:clamp(17px,2vw,24px);color:#111;letter-spacing:-.01em}
.wy-countbar b{font-weight:600;font-variant-numeric:tabular-nums}
.wy-countbar a{color:#1a7cf0;text-decoration:underline;text-underline-offset:3px}
.wy-countbar a:hover{color:var(--blue)}
@media(max-width:640px){.wy-countbar{margin-top:-50px;padding:14px 16px 14px 96px;min-height:74px;justify-content:flex-start;text-align:left}.wy-countbar img{left:14px;width:70px}}
.wy-love-grid.is-open+.wy-countbar{margin-top:14px}
`;
