(()=>{
  if(window.__cssInteractiveGameCardUi)return;
  window.__cssInteractiveGameCardUi=true;
  if(typeof window.createCard!=='function')return;

  const style=document.createElement('style');
  style.textContent=`
    .css-game-screen-controls{display:flex;align-items:center;flex-wrap:wrap;gap:10px;padding:8px 12px;background:#0b1b2d;color:#cbd5e1;font-size:12px}
    .css-game-screen-button{border:1px solid #365a80;border-radius:8px;background:#10243c;color:#e8f1ff;padding:8px 12px;font:inherit;cursor:pointer}
    .css-game-screen-button:focus-visible{outline:2px solid #38bdf8;outline-offset:3px}
    .preview-panel:fullscreen{box-sizing:border-box;width:100%;height:100%;max-width:none;min-height:0;padding:0;overflow:hidden;background:#06111e;border:0;border-radius:0;display:flex;flex-direction:column}
    .preview-panel:fullscreen .css-game-screen-controls{flex:none;border-bottom:1px solid #294766}
    .preview-panel:fullscreen>.panel-label,.preview-panel:fullscreen>.browser-bar{display:none}
    .preview-panel:fullscreen>iframe{display:block;width:100%!important;height:0!important;min-height:0!important;max-height:none!important;flex:1 1 0;min-width:0;border:0;border-radius:0;background:#06111e}
    .css-game-screen-name{display:none;font-weight:700}
    .preview-panel:fullscreen .css-game-screen-name{display:block}
    .css-guided-game-card .tag-description{
      max-width:78ch;
      margin-bottom:12px;
      color:#b9c9dd;
      line-height:1.58;
    }
    .css-guided-heading{
      margin:0 0 12px;
      padding:16px 18px;
      border:1px solid rgba(96,165,250,.34);
      border-radius:14px;
      background:linear-gradient(135deg,rgba(37,99,235,.12),rgba(8,16,31,.82));
    }
    .css-guided-heading-top{
      display:flex;
      flex-wrap:wrap;
      gap:8px;
      align-items:center;
      margin-bottom:8px;
    }
    .css-guided-heading-badge{
      display:inline-flex;
      align-items:center;
      min-height:24px;
      padding:3px 9px;
      border:1px solid rgba(96,165,250,.42);
      border-radius:999px;
      background:rgba(30,64,175,.18);
      color:#93c5fd;
      font-size:11px;
      font-weight:800;
    }
    .css-guided-heading h3{
      margin:0 0 6px;
      color:#f8fafc;
      font-size:clamp(18px,2vw,22px);
      line-height:1.25;
    }
    .css-guided-heading p{
      max-width:90ch;
      margin:0;
      color:#b9c9dd;
      line-height:1.55;
    }
    .css-guided-mission{
      margin:0 0 12px;
      padding:13px 15px;
      border:1px solid rgba(34,197,94,.38);
      border-radius:12px;
      background:rgba(20,83,45,.16);
    }
    .css-guided-mission strong{
      display:block;
      margin-bottom:8px;
      color:#86efac;
    }
    .css-guided-mission ol{
      margin:0;
      padding-left:20px;
      color:#d7e4f3;
      line-height:1.55;
    }
    .css-guided-mission li+li{margin-top:5px}
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

  const ensureGuidedHeading=(card,item)=>{
    card.querySelector('.css-guided-heading')?.remove();
    const heading=document.createElement('header');
    heading.className='css-guided-heading';
    heading.innerHTML=`
      <div class="css-guided-heading-top">
        <span class="css-guided-heading-badge">Reto guiado CSS</span>
        <span class="css-guided-heading-badge">HTML + CSS</span>
      </div>
      <h3>${escape(item.name||'Reto CSS')}</h3>
      <p>${escape(item.gameDescription||item.description||'Practica CSS comparando el código con el resultado.')}</p>
    `;
    const tip=card.querySelector('.tip');
    if(tip)tip.before(heading);
    else card.prepend(heading);
  };

  const ensureGuidedMission=(card,item)=>{
    card.querySelector('.css-guided-mission')?.remove();
    if(!Array.isArray(item.exerciseTasks)||!item.exerciseTasks.length)return;
    const mission=document.createElement('section');
    mission.className='css-guided-mission';
    mission.innerHTML=`
      <strong>${escape(item.exerciseTitle||'Misión del reto')}</strong>
      <ol>${item.exerciseTasks.map(task=>'<li>'+task+'</li>').join('')}</ol>
    `;
    const tip=card.querySelector('.tip');
    if(tip)tip.after(mission);
    else card.prepend(mission);
  };

  const fixGuidedExercise=(card,item)=>{
    const details=card.querySelector('.personal-exercise');
    if(!details||!Array.isArray(item.exerciseTasks)||!item.exerciseTasks.length)return;

    const title=details.querySelector('summary span:last-child');
    if(title)title.textContent=item.exerciseTitle||'Misión del reto';

    const intro=details.querySelector('.personal-exercise-intro');
    if(intro)intro.textContent=item.exerciseIntro||'Resuelve estas variaciones y comprueba cada cambio en el resultado.';

    const list=details.querySelector('ol');
    if(list)list.innerHTML=item.exerciseTasks.map(task=>'<li>'+task+'</li>').join('');

    const privacy=details.querySelector('.personal-exercise-privacy');
    privacy?.remove();

    const extra=details.querySelector('.personal-exercise-extra');
    if(extra){
      if(item.exerciseExtra){
        extra.innerHTML='<strong>Reto extra:</strong> '+escape(String(item.exerciseExtra).replace(/^Reto extra:\s*/i,''));
      }else{
        extra.remove();
      }
    }
  };

  const addFullscreen=(card,item)=>{
    const panel=card.querySelector('.preview-panel');
    if(!panel)return;
    const controls=document.createElement('div');
    controls.className='css-game-screen-controls';
    const button=document.createElement('button');
    button.type='button';
    button.className='css-game-screen-button';
    const status=document.createElement('span');
    status.setAttribute('role','status');
    const name=document.createElement('span');
    name.className='css-game-screen-name';
    name.textContent=item.name||'Reto CSS';
    const frame=panel.querySelector('iframe');
    let wasActive=false;
    const update=()=>{
      const active=document.fullscreenElement===panel;
      button.textContent=active?'⤢ Salir de pantalla completa':'⤢ Pantalla completa';
      button.setAttribute('aria-pressed',String(active));
      button.title=active?'Volver a la vista normal (también puedes usar Esc)':'Ampliar este reto a pantalla completa';
      // The game keeps its document and editor state when changing layout.
      if(frame?.classList.contains('css-game-direct-frame')){
        frame.contentDocument?.documentElement.classList.toggle('game-fullscreen',active);
      }
      if(wasActive&&!active)button.focus({preventScroll:true});
      wasActive=active;
    };
    button.addEventListener('click',async()=>{
      status.textContent='';
      try{
        if(document.fullscreenElement===panel)await document.exitFullscreen();
        else if(panel.requestFullscreen)await panel.requestFullscreen();
        else status.textContent='Este navegador no admite pantalla completa.';
      }catch{
        status.textContent='No se pudo activar la pantalla completa. Revisa los permisos del navegador.';
      }
      update();
    });
    panel.addEventListener('fullscreenchange',update);
    frame?.addEventListener('load',update);
    controls.append(button,name,status);
    panel.prepend(controls);
    update();
  };

  const originalCreateCard=window.createCard;
  window.createCard=createCard=function(item){
    const fragment=originalCreateCard(item);
    const card=fragment.querySelector?.('.tag-card');
    if(!card)return fragment;

    if(item?.kind==='Juego CSS interactivo'){
      card.classList.add('css-interactive-game-card');
      card.querySelector('.file-guide')?.remove();
      card.querySelector('.file-create-guide')?.remove();

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

      const frame=card.querySelector('.preview-panel iframe');
      const preview=document.createElement('template');
      preview.innerHTML=item.preview||'';
      const gameUrl=preview.content.querySelector('iframe')?.getAttribute('src');
      // Only our two local game pages bypass the sandbox for arbitrary HTML examples.
      // A direct frame removes the white srcdoc wrapper and lets the game save progress.
      if(frame&&/^css-(?:flexbox|arcade)-game\.html(?:\?|$)/.test(gameUrl||'')){
        frame.classList.add('css-game-direct-frame');
        frame.removeAttribute('srcdoc');
        frame.removeAttribute('sandbox');
        frame.src=gameUrl;
        frame.title=item.name+' · juego editable';
        frame.loading='lazy';
      }
      addFullscreen(card,item);

      const labels=[...card.querySelectorAll('.panel-label')];
      const resultLabel=labels.find(label=>/resultado/i.test(label.textContent||''));
      if(resultLabel?.firstChild)resultLabel.firstChild.textContent=(item.name||'Juego CSS')+' · editor CSS ';
      return fragment;
    }

    if(item?.kind==='Juego CSS'){
      addFullscreen(card,item);
      card.classList.add('css-guided-game-card');
      card.querySelector('.file-guide')?.remove();
      card.querySelector('.file-create-guide')?.remove();

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

      ensureGuidedHeading(card,item);
      fixGuidedExercise(card,item);
      card.querySelector('.personal-exercise')?.remove();
      ensureGuidedMission(card,item);
    }

    return fragment;
  };

  if(typeof window.render==='function')window.render();
})();
