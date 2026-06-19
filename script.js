
function toggleLanguage(){
  const html=document.documentElement;
  const next=html.lang==='de'?'en':'de';
  html.lang=next;
  document.querySelectorAll('[data-de][data-en]').forEach(el=>{
    el.textContent=el.dataset[next];
  });
}
