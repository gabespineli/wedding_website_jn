
(function(){
  const C = window.SETTINGS;
  const qs = (s)=>document.querySelector(s);
  const qsa = (s)=>Array.from(document.querySelectorAll(s));
  const setTxt = (sel, val)=>{ const n=qs(sel); if(n) n.textContent=val; };
  const setHref = (sel, val)=>{ const n=qs(sel); if(n) n.href=val; };
  const setSrc = (sel, val)=>{ const n=qs(sel); if(n) n.src=val; };

  document.addEventListener('DOMContentLoaded', () => {
    const names = C.coupleNames.split('&').map(s=>s.trim());
    const hero = qs('[data-couple-title]');
    if (hero) hero.innerHTML = `<span class="top">${names[0]}</span><span class="bottom">& ${names[1]}</span>`;

    qsa('[data-date]').forEach(n=>n.textContent=C.dateDisplay);
    qsa('[data-hashtag]').forEach(n=>n.textContent=C.hashtag);
    qsa('[data-deadline]').forEach(n=>n.textContent=C.rsvpDeadlineText);

    // Locations (safe if elements are missing)
    setTxt('[data-ceremony-venue]', C.ceremony.venue);
    setTxt('[data-ceremony-address]', C.ceremony.address);
    setHref('[data-ceremony-map-open]', C.ceremony.openMap);
    setSrc('[data-ceremony-map-embed]', C.ceremony.embedMap);

    setTxt('[data-reception-venue]', C.reception.venue);
    setTxt('[data-reception-address]', C.reception.address);
    setHref('[data-reception-map-open]', C.reception.openMap);
    setSrc('[data-reception-map-embed]', C.reception.embedMap);

    // Attire swatches
    const allowWrap = qs('#attire-allowed');
    if (allowWrap) C.attireAllowed.forEach(hex=>{ const d=document.createElement('div'); d.className='dot'; d.style.background=hex; allowWrap.appendChild(d); });
    const avoidWrap = qs('#attire-avoid');
    if (avoidWrap) C.attireAvoid.forEach(hex=>{ const d=document.createElement('div'); d.className='dot'; d.style.background=hex; avoidWrap.appendChild(d); });

    // Entourage
    const E = C.entourage;
    function fillCol(id, data){
      const root = qs('#'+id); if(!root) return;
      data.forEach(([title, arr])=>{
        if(!arr || !arr.length) return;
        const sec = document.createElement('section');
        const h = document.createElement('h3'); h.textContent = title;
        const ul = document.createElement('ul');
        arr.forEach(name=>{ const li=document.createElement('li'); li.textContent=name; ul.appendChild(li); });
        sec.appendChild(h); sec.appendChild(ul); root.appendChild(sec);
      });
    }
    const leftMap = [
      ["Groom", E.groom],["Parents of the Groom", E.parentsGroom],["Ninongs", E.ninongs],
      ["Best Man", E.bestMan],["Groomsmen", E.groomsmen],["Secondary Sponsors — Candle", E.secondarySponsors.candle],
      ["Secondary Sponsors — Cord", E.secondarySponsors.cord],["Secondary Sponsors — Veil", E.secondarySponsors.veil],
      ["Ring Bearer", E.ringBearer],["Coin Bearer", E.coinBearer],["Bible Bearer", E.bibleBearer]
    ];
    const rightMap = [
      ["Bride", E.bride],["Parents of the Bride", E.parentsBride],["Ninangs", E.ninangs],
      ["Maid of Honor", E.maidOfHonor],["Bridesmaids", E.bridesmaids],["Flower Girls", E.flowerGirls]
    ];
    fillCol('entourage-left', leftMap);
    fillCol('entourage-right', rightMap);

    // Countdown (robust)
    const t = C.weddingTarget;
    const target = new Date(t.y, t.m-1, t.d, t.hh||0, t.mm||0, 0, 0);
    const el = {days:qs('#cd-days'),hours:qs('#cd-hours'),minutes:qs('#cd-minutes'),seconds:qs('#cd-seconds')};
    function tick(){
      const diff = target - new Date();
      if(diff <= 0){
        const c = qs('#countdown'); if(c) c.innerHTML = "<div class='card'>It's the wedding day! 🎉</div>";
        clearInterval(timer); return;
      }
      const sec = Math.floor(diff/1000);
      const days = Math.floor(sec/86400);
      const hours = Math.floor((sec%86400)/3600);
      const minutes = Math.floor((sec%3600)/60);
      const seconds = sec%60;
      if(el.days){ el.days.textContent = days; el.hours.textContent = String(hours).padStart(2,'0'); el.minutes.textContent = String(minutes).padStart(2,'0'); el.seconds.textContent = String(seconds).padStart(2,'0'); }
    }
    const timer = setInterval(tick, 1000); tick();

    // Drive button
    const driveBtn = qs('[data-drive-btn]'); if (driveBtn && window.SETTINGS.googleDriveLink) driveBtn.href = window.SETTINGS.googleDriveLink;
  });
})();
