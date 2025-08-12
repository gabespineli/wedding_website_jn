
(function(){
  const C = window.SETTINGS;
  function qs(s){ return document.querySelector(s); }
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-deadline]').forEach(n=>n.textContent=C.rsvpDeadlineText);
    document.querySelectorAll('[data-hashtag]').forEach(n=>n.textContent=C.hashtag);

    const form = qs('#rsvp-form');
    const btn = qs('#submitBtn');
    const spinner = qs('#spinner');
    const ok = qs('#alert-ok');
    const err = qs('#alert-err');

    ok.hidden = true; err.hidden = true;

    const attending = qs('#attending');
    const guestsWrap = qs('#guests-wrap');
    attending.addEventListener('change', () => {
      guestsWrap.style.display = attending.value === 'Yes' ? 'block' : 'none';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      ok.hidden = true; err.hidden = true;

      if (!form.reportValidity()) return;
      btn.disabled = true; spinner.style.display = 'inline-block';

      const fd = new FormData(form);
      fd.append('timestamp', new Date().toISOString());
      fd.append('source', 'website');

      const endpoint = C.appsScriptEndpoint || '';
      const demoMode = endpoint.includes('REPLACE_WITH_YOUR_DEPLOYMENT_ID') || !endpoint;

      try{
        if (demoMode) {
          await new Promise(r=>setTimeout(r,600));
          ok.hidden = false; form.reset(); guestsWrap.style.display='none';
        } else {
          const res = await fetch(endpoint, { method:'POST', body: fd, mode: 'no-cors' });
          ok.hidden = false; form.reset(); guestsWrap.style.display='none';
        }
      }catch(ex){
        err.hidden = false;
      }finally{
        btn.disabled = false; spinner.style.display = 'none';
      }
    });
  });
})();
