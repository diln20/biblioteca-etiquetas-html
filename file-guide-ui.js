(()=>{
  if(window.__fileGuideUiAdded)return;
  window.__fileGuideUiAdded=true;
  if(typeof window.createCard!=='function')return;

  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char]);
  const guidedCourse=item=>/Código\s+(?:Angular|React|Vue|Svelte|Solid\.js|FastAPI|Django REST|Django Framework|Oracle|PostgreSQL|MongoDB|Neo4j|Redis|Cassandra|Fundamentos|Comparativa)/i.test(String(item?.codeLabel||''))
    || /^(?:Angular|React|Vue|Svelte|Solid\.js|FastAPI|Django REST|Django Framework|Base de datos)$/i.test(String(item?.kind||''));

  const originalCreateCard=createCard;
  createCard=function(item){
    const fragment=originalCreateCard(item);
    const allGuideEntries=Array.isArray(item?.guide)?item.guide.filter(entry=>Array.isArray(entry)&&entry.length>=2):[];
    const creationEntries=Array.isArray(item?.filesToCreate)?item.filesToCreate:[];
    const guided=guidedCourse(item);
    const guideEntries=creationEntries.length
      ? allGuideEntries.filter(([action])=>!/^crear/i.test(String(action||'')))
      : allGuideEntries;

    if(!allGuideEntries.length&&!guided)return fragment;
    const card=fragment.querySelector?.('.tag-card');
    if(!card)return fragment;
    card.classList.add('has-file-guide');

    const codePanel=card.querySelector('.code-panel');
    const panelGroup=codePanel?.parentElement;
    const insertBeforeCode=element=>{
      if(panelGroup&&panelGroup!==card)panelGroup.before(element);
      else if(codePanel)codePanel.before(element);
      else card.querySelector('.tip')?.before(element)||card.append(element);
    };

    if(guided&&!card.querySelector('.file-create-guide')){
      const creation=document.createElement('section');
      creation.className=`file-create-guide${creationEntries.length?'':' is-empty'}`;
      creation.dataset.fileCreateGuide='true';
      creation.setAttribute('aria-label',item.filesToCreateTitle||'Archivos que se crean en esta lección');
      const list=creationEntries.length
        ? `<ul>${creationEntries.map(entry=>{
            const path=entry?.path||'Archivo por definir';
            const method=entry?.method||'MANUAL';
            const command=entry?.command||'';
            const detail=entry?.detail||'';
            return `<li><span class="file-create-icon" aria-hidden="true">＋</span><span class="file-create-method">${escape(method)}</span><code class="file-create-path">${escape(path)}</code>${detail?`<p>${escape(detail)}</p>`:''}${command?`<div class="file-create-command"><span>Comando</span><code>${escape(command)}</code></div>`:''}</li>`;
          }).join('')}</ul>`
        : `<p class="file-create-empty">${escape(item.filesToCreateStatus||'No debes crear archivos nuevos en esta lección; usa los archivos existentes indicados abajo.')}</p>`;
      creation.innerHTML=`<div class="file-create-title"><span aria-hidden="true">🗂️</span><span>${escape(item.filesToCreateTitle||'Archivos que se crean en esta lección')}</span>${creationEntries.length?`<strong>${creationEntries.length}</strong>`:''}</div>${list}`;
      insertBeforeCode(creation);
    }

    if(guideEntries.length&&!card.querySelector('.file-guide')){
      const guide=document.createElement('section');
      guide.className='file-guide';
      guide.dataset.fileGuide='true';
      guide.setAttribute('aria-label',item.guideTitle||'Dónde colocar cada código');
      guide.innerHTML=`<div class="file-guide-title"><span aria-hidden="true">📁</span>${escape(item.guideTitle||'Dónde colocar cada código')}</div><ol>${guideEntries.map(([action,path,detail])=>`<li><span class="file-action">${escape(action||'Modificar')}</span><code>${escape(path||'Archivo por definir')}</code>${detail?`<p>${escape(detail)}</p>`:''}</li>`).join('')}</ol>`;
      insertBeforeCode(guide);
    }

    const codeLabel=card.querySelector('.code-panel .panel-label');
    if(codeLabel?.firstChild)codeLabel.firstChild.textContent=`${item.codeLabel||'Código por archivo'} `;
    return fragment;
  };

  if(typeof window.render==='function')render();
})();
