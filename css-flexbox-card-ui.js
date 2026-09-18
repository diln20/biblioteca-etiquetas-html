(()=>{
  if(window.__cssInteractiveGameCardUi)return;
  window.__cssInteractiveGameCardUi=true;
  if(typeof window.createCard!=='function')return;

  const style=document.createElement('style');
  style.textContent=`
    .css-guided-game-card .tag-description{
      max-width:78ch;
      margin-bottom:12px;
      color:#b9c9dd;
      line-height:1.58;
    }
    .css-guided-game-card .personal-exercise{
      margin:12px 0;
      border-color:rgba(56,189,248,.38);
      background:linear-gradient(180deg,rgba(14,165,233,.08),rgba(8,16,31,.82));
    }
    .css-guided-game-card .personal-exercise summary{
      color:#7dd3fc;
      background:rgba(14,165,233,.08);
      padding:11px 14px;
    }
    .css-guided-game-card .personal-exercise summary::after{color:#38bdf8}
    .css-guided-game-card .personal-exercise-extra{
      border-left-color:#38bdf8;
      background:rgba(14,165,233,.07);
    }
    .css-guided-game-card .code-panel pre{
      max-height:390px;
      overflow:auto;
      line-height:1.58;
    }
    .css-guided-game-card iframe{
      min-height:390px;
      background:#f8fafc;
    }
    .css-guided-game-card .tip{
      margin-block:12px;
    }
    @media(max-width:900px){
      .css-guided-game-card .css-guided-panel-group{
        grid-template-columns:1fr!important;
      }
      .css-guided-game-card iframe{
        min-height:320px;
      }
    }
  `;
  document.head.append(style);

  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char]);

  const fixGuidedExercise=(card,item)=>{
    const details=card.querySelector('.personal-exercise');
    if(!details||!Array.isArray(item.exerciseTasks)||!item.exerciseTasks.length)return;

    const title=details.querySelector('summary span:last-child');
    if(title)title.textContent=item.exerciseTitle||'Misión del reto';

    const intro=details.querySelector('.personal-exercise-intro');
    if(intro)intro.textContent=item.exerciseIntro||'Resuelve estas variaciones y comprueba cada cambio en el resultado.';

    const list=details.querySelector('ol');
    if(list)list.innerHTML=item.exerciseTasks.map(task=>'<li>'+task+'</li>').join('');

    const extra=details.querySelector('.personal-exercise-extra');
    if(extra){
      if(item.exerciseExtra){
        extra.innerHTML='<strong>Reto extra:</strong> '+escape(String(item.exerciseExtra).replace(/^Reto extra:\s*/i,''));
      }else{
        extra.remove();
      }
    }
  };

  const originalCreateCard=window.createCard;
  window.createCard=createCard=function(item){
    const fragment=originalCreateCard(item);
    const card=fragment.querySelector?.('.tag-card');
    if(!card)return fragment;

    if(item?.kind==='Juego CSS interactivo'){
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
    }

    if(item?.kind==='Juego CSS'){
      card.classList.add('css-guided-game-card');

      const description=card.querySelector('.tag-description');
      if(description&&item.gameDescription)description.textContent=item.gameDescription;

      const kindBadge=card.querySelector('.kind-badge');
      const supportBadge=card.querySelector('.support-badge');
      if(kindBadge)kindBadge.textContent='Reto guiado CSS';
      if(supportBadge)supportBadge.textContent='HTML + CSS';

      const codePanel=card.querySelector('.code-panel');
      const panelGroup=codePanel?.parentElement||null;
      if(panelGroup){
        panelGroup.classList.add('css-guided-panel-group');
        panelGroup.style.display='grid';
        panelGroup.style.gridTemplateColumns='minmax(0,.92fr) minmax(0,1.08fr)';
        panelGroup.style.gap='14px';
        panelGroup.style.alignItems='stretch';
      }

      const labels=[...card.querySelectorAll('.panel-label')];
      const codeLabel=labels.find(label=>/código|solución/i.test(label.textContent||''));
      const resultLabel=labels.find(label=>/resultado/i.test(label.textContent||''));
      if(codeLabel?.firstChild)codeLabel.firstChild.textContent='HTML + CSS · referencia ';
      if(resultLabel?.firstChild)resultLabel.firstChild.textContent='Vista del reto ';

      card.querySelectorAll('iframe').forEach(frame=>{
        frame.style.height='390px';
        frame.style.minHeight='390px';
      });

      fixGuidedExercise(card,item);
    }

    return fragment;
  };

  if(typeof window.render==='function')window.render();
})();