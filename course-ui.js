(()=>{
  const nav=document.querySelector('#categoryNav');
  if(!nav||nav.dataset.grouped)return;

  document.querySelector('.challenge-box')?.remove();
  nav.dataset.grouped='true';
  nav.setAttribute('aria-label','Ruta de aprendizaje');

  const groupOf=section=>{
    if(section?.group)return section.group;
    const title=typeof section==='string'?section:(section?.title||'');

    if(title.startsWith('HTML + CSS + JavaScript'))return 'Proyecto completo';
    if(title.startsWith('HTML + JavaScript'))return 'HTML + JavaScript';
    if(title==='HTML + CSS')return 'HTML + CSS';
    if(title.startsWith('Git'))return 'Git';
    if(title.startsWith('Frameworks frontend'))return 'Frameworks frontend';
    if(title.startsWith('Frameworks CSS'))return 'Frameworks CSS';
    if(title.startsWith('Proyectos con frameworks'))return 'Proyectos con frameworks';
    if(title.startsWith('Backend FastAPI'))return 'Backend FastAPI';
    if(title.startsWith('Backend APIs'))return 'Backend Python';
    if(title.startsWith('Django REST'))return 'Django REST';
    if(/^Django\s*\+\s*HTML\s*\+\s*CSS/i.test(title)||title.startsWith('Django HTML CSS'))return 'Django + Frontend';
    if(/^(APIs?|Consumo de APIs?|API HTML CSS)/i.test(title))return 'APIs';
    if(/^(UI\/UX|UI y UX|Herramientas UI\/UX)/i.test(title))return 'UI/UX';
    if(title.startsWith('JavaScript')||title==='Manejo del DOM')return 'JavaScript';
    if(title.startsWith('CSS'))return 'CSS';
    return 'HTML';
  };

  const slugify=value=>String(value||'seccion')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-|-$/g,'');

  const repeatedIds=new Map();
  const sectionIds=sections.map((section,index)=>{
    if(section.id)return String(section.id);
    const base=slugify(section.title)||`seccion-${index+1}`;
    const count=(repeatedIds.get(base)||0)+1;
    repeatedIds.set(base,count);
    return count===1?base:`${base}-${count}`;
  });

  const STORAGE_KEY='biblioteca-ruta-progreso-v1';
  const readProgress=()=>{
    try{
      const parsed=JSON.parse(window.localStorage?.getItem(STORAGE_KEY)||'{}');
      if(Array.isArray(parsed))return {completed:parsed,lastSection:''};
      return {
        completed:Array.isArray(parsed.completed)?parsed.completed:[],
        lastSection:typeof parsed.lastSection==='string'?parsed.lastSection:''
      };
    }catch{
      return {completed:[],lastSection:''};
    }
  };
  const state=readProgress();
  const validIds=new Set(sectionIds);
  const completed=new Set(state.completed.filter(id=>validIds.has(id)));
  const saveProgress=()=>{
    try{
      window.localStorage?.setItem(STORAGE_KEY,JSON.stringify({
        completed:[...completed],
        lastSection:state.lastSection
      }));
    }catch{
      // La biblioteca sigue funcionando aunque el navegador bloquee localStorage.
    }
  };

  const sidebar=nav.closest?.('.sidebar');
  let progressBar=null;
  let progress=null;
  let progressLabel=null;
  let jumpButtons=[];

  if(sidebar){
    sidebar.setAttribute('aria-label','Ruta de aprendizaje');
    const header=sidebar.querySelector('.sidebar-head');
    const headerTitle=header?.querySelector('span:first-child');
    if(headerTitle)headerTitle.textContent='RUTA DE APRENDIZAJE';

    const overview=document.createElement('div');
    overview.className='course-overview';

    progressLabel=document.createElement('p');
    progressLabel.className='course-progress-label';

    progress=document.createElement('div');
    progress.className='course-progress';
    progress.setAttribute('role','progressbar');
    progress.setAttribute('aria-label','Progreso de la ruta');
    progress.setAttribute('aria-valuemin','0');
    progress.setAttribute('aria-valuemax',String(sections.length));
    progress.innerHTML='<span class="course-progress-bar"></span>';
    progressBar=progress.firstElementChild;

    const jumps=document.createElement('div');
    jumps.className='course-jumps';
    [...new Set(sections.map(groupOf))].forEach(group=>{
      const jump=document.createElement('button');
      jump.type='button';
      jump.className='course-jump';
      jump.dataset.group=group;
      jump.textContent=group==='Proyecto completo'?'Completo':group;
      jump.onclick=()=>{
        const target=[...nav.children].find(button=>button.dataset.group===group);
        target?.click();
        target?.scrollIntoView({behavior:'smooth',block:'center'});
      };
      jumps.append(jump);
    });
    jumpButtons=[...jumps.children];

    sidebar.insertBefore(overview,nav);
    if(header)overview.append(header);
    overview.append(progressLabel,progress,jumps);

    const toggle=document.createElement('button');
    toggle.type='button';
    toggle.className='course-sidebar-toggle';
    sidebar.id=sidebar.id||'courseSidebar';
    toggle.setAttribute('aria-controls',sidebar.id);
    const setCollapsed=collapsed=>{
      sidebar.classList.toggle('is-collapsed',collapsed);
      sidebar.closest('.layout')?.classList.toggle('is-sidebar-collapsed',collapsed);
      toggle.setAttribute('aria-expanded',String(!collapsed));
      toggle.setAttribute('aria-label',collapsed?'Expandir ruta de aprendizaje':'Contraer ruta de aprendizaje');
      toggle.title=collapsed?'Expandir ruta de aprendizaje':'Contraer ruta de aprendizaje';
      toggle.textContent=collapsed?'›':'‹ Contraer ruta';
    };
    toggle.addEventListener('click',()=>setCollapsed(!sidebar.classList.contains('is-collapsed')));
    overview.prepend(toggle);
    setCollapsed(false);
  }

  const navButtons=[...nav.children];
  let previous='';
  navButtons.forEach((button,index)=>{
    const section=sections[index];
    const title=section.title;
    const group=groupOf(section);
    const detail=title.includes(' · ')?title.split(' · ').at(-1):'';
    const normalizedDetail=detail.toLowerCase();
    const text=button.querySelector('span:last-child');
    text?.classList.add('nav-title');

    button.dataset.group=group;
    button.dataset.sectionId=sectionIds[index];

    if(['principiante','intermedio','avanzado'].includes(normalizedDetail)){
      button.dataset.level=normalizedDetail;
    }
    if(detail&&text){
      text.textContent=detail;
    }else if(group==='HTML + CSS'&&text){
      text.textContent='Ejemplos prácticos';
    }

    if(group!==previous){
      button.classList.add('group-start');
      const label=document.createElement('span');
      label.className='nav-group-label';
      label.textContent=group;
      button.prepend(label);
      previous=group;
    }
  });

  const activeIndex=()=>{
    const index=navButtons.findIndex(button=>button.classList.contains('active'));
    return index<0?0:index;
  };

  const syncProgress=()=>{
    navButtons.forEach((button,index)=>{
      const isCompleted=completed.has(sectionIds[index]);
      button.dataset.completed=String(isCompleted);
      button.setAttribute('aria-label',`${sections[index].title}${isCompleted?' — completada':''}`);
    });

    const done=completed.size;
    const percent=sections.length?done/sections.length*100:0;
    if(progressBar)progressBar.style.width=`${percent}%`;
    if(progress){
      progress.setAttribute('aria-valuenow',String(done));
      progress.setAttribute('aria-valuetext',`${done} de ${sections.length} secciones completadas`);
    }
    if(progressLabel)progressLabel.textContent=`${done} de ${sections.length} completadas`;
  };

  const mountCompletionControl=()=>{
    const toolbar=document.querySelector('.section-toolbar')
      || document.querySelector('.section-heading .section-actions')
      || document.querySelector('.section-heading');
    if(!toolbar)return;

    let button=toolbar.querySelector?.('[data-completion-toggle]');
    if(!button){
      button=document.createElement('button');
      button.type='button';
      button.className='compact-btn completion-toggle';
      button.dataset.completionToggle='true';
      button.onclick=()=>{
        const index=activeIndex();
        const id=sectionIds[index];
        if(completed.has(id))completed.delete(id);
        else completed.add(id);
        saveProgress();
        syncProgress();
        mountCompletionControl();
      };
      toolbar.append(button);
    }

    const isCompleted=completed.has(sectionIds[activeIndex()]);
    button.textContent=isCompleted?'✓ Completada':'Marcar como completada';
    button.setAttribute('aria-pressed',String(isCompleted));
  };

  const syncTheme=()=>{
    const index=activeIndex();
    const activeGroup=groupOf(sections[index]);
    document.body.dataset.course=activeGroup;
    state.lastSection=sectionIds[index];
    saveProgress();
    syncProgress();
    mountCompletionControl();
    jumpButtons.forEach(button=>button.classList.toggle('active',button.dataset.group===activeGroup));
  };

  const originalCreateCard=createCard;
  createCard=function(item){
    const fragment=originalCreateCard(item);
    if(item.tag!=='Construcción guiada'||!item.guide?.length)return fragment;
    const card=fragment.querySelector('.tag-card');
    if(!card)return fragment;
    card.classList.add('guided-build-card');
    const kindBadge=card.querySelector('.kind-badge');
    const supportBadge=card.querySelector('.support-badge');
    if(kindBadge)kindBadge.textContent='Proyecto paso a paso';
    if(supportBadge)supportBadge.textContent='FastAPI';
    card.querySelector('.attributes-toggle')?.remove();
    card.querySelector('.attributes-box')?.remove();
    const guide=document.createElement('section');
    guide.className='file-guide';
    guide.setAttribute('aria-label','Dónde colocar cada código');
    guide.innerHTML='<div class="file-guide-title">Dónde colocar cada código</div><ol>'+item.guide.map(([action,path,detail])=>`<li><span class="file-action">${esc(action)}</span><code>${esc(path)}</code><p>${esc(detail)}</p></li>`).join('')+'</ol>';
    card.querySelector('.tip')?.before(guide);
    const codeLabel=card.querySelector('.code-panel .panel-label');
    if(codeLabel?.firstChild)codeLabel.firstChild.textContent='Código por archivo ';
    return fragment;
  };

  const originalRender=render;
  render=function(){
    originalRender();
    syncTheme();
  };

  const savedIndex=sectionIds.indexOf(state.lastSection);
  const savedButton=savedIndex>0?navButtons[savedIndex]:null;
  if(savedButton&&typeof savedButton.click==='function')savedButton.click();
  else render();
})();
