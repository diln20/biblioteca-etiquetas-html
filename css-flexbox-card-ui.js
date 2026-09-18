(()=>{
  if(window.__cssInteractiveGameCardUi)return;
  window.__cssInteractiveGameCardUi=true;
  if(typeof window.createCard!=='function')return;

  const originalCreateCard=window.createCard;
  window.createCard=createCard=function(item){
    const fragment=originalCreateCard(item);
    if(item?.kind!=='Juego CSS interactivo')return fragment;

    const card=fragment.querySelector?.('.tag-card');
    if(!card)return fragment;

    card.classList.add('css-interactive-game-card');

    const codePanel=card.querySelector('.code-panel');
    const panelGroup=codePanel?.parentElement||null;
    codePanel?.remove();

    if(panelGroup){
      panelGroup.classList.add('css-game-panel-group');
      panelGroup.style.display='block';
      panelGroup.style.gridTemplateColumns='1fr';
      panelGroup.style.width='100%';
      [...panelGroup.children].forEach(child=>{
        child.style.width='100%';
        child.style.maxWidth='none';
        child.style.gridColumn='1 / -1';
        child.style.flex='1 1 100%';
      });
    }

    card.querySelectorAll('iframe').forEach(frame=>{
      frame.style.width='100%';
      frame.style.height='820px';
      frame.style.minHeight='820px';
      frame.style.maxWidth='none';
    });

    const labels=[...card.querySelectorAll('.panel-label')];
    const resultLabel=labels.find(label=>/resultado/i.test(label.textContent||''));
    if(resultLabel?.firstChild)resultLabel.firstChild.textContent=(item.name||'Juego CSS')+' · editor CSS ';

    return fragment;
  };

  if(typeof window.render==='function')window.render();
})();