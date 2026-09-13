(()=>{
  if(window.__fileGuideUiAdded)return;
  window.__fileGuideUiAdded=true;
  if(typeof window.createCard!=='function')return;

  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char]);

  const originalCreateCard=createCard;
  createCard=function(item){
    const fragment=originalCreateCard(item);
    const guideEntries=Array.isArray(item?.guide)?item.guide.filter(entry=>Array.isArray(entry)&&entry.length>=2):[];
    if(!guideEntries.length)return fragment;

    const card=fragment.querySelector?.('.tag-card');
    if(!card)return fragment;
    card.classList.add('has-file-guide');

    if(!card.querySelector('.file-guide')){
      const guide=document.createElement('section');
      guide.className='file-guide';
      guide.dataset.fileGuide='true';
      guide.setAttribute('aria-label',item.guideTitle||'Dónde colocar cada código');
      guide.innerHTML=`
        <div class="file-guide-title">
          <span aria-hidden="true">📁</span>
          ${escape(item.guideTitle||'Dónde colocar cada código')}
        </div>
        <ol>
          ${guideEntries.map(([action,path,detail])=>`
            <li>
              <span class="file-action">${escape(action||'Modificar')}</span>
              <code>${escape(path||'Archivo por definir')}</code>
              ${detail?`<p>${escape(detail)}</p>`:''}
            </li>
          `).join('')}
        </ol>`;

      const codePanel=card.querySelector('.code-panel');
      const panelGroup=codePanel?.parentElement;
      if(panelGroup&&panelGroup!==card)panelGroup.before(guide);
      else if(codePanel)codePanel.before(guide);
      else card.querySelector('.tip')?.before(guide)||card.append(guide);
    }

    const codeLabel=card.querySelector('.code-panel .panel-label');
    if(codeLabel?.firstChild){
      codeLabel.firstChild.textContent=`${item.codeLabel||'Código por archivo'} `;
    }

    return fragment;
  };

  if(typeof window.render==='function')render();
})();
