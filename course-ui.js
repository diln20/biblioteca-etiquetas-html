(()=>{
  const nav=document.querySelector('#categoryNav');
  if(!nav||nav.dataset.grouped)return;
  document.querySelector('.challenge-box')?.remove();
  nav.dataset.grouped='true';
  nav.setAttribute('aria-label','Ruta de aprendizaje');

  const groupOf=title=>{
    if(title.startsWith('HTML + CSS + JavaScript'))return 'Proyecto completo';
    if(title.startsWith('HTML + JavaScript'))return 'HTML + JavaScript';
    if(title==='HTML + CSS')return 'HTML + CSS';
    if(title.startsWith('JavaScript')||title==='Manejo del DOM')return 'JavaScript';
    if(title.startsWith('CSS'))return 'CSS';
    return 'HTML';
  };

  const sidebar=nav.closest?.('.sidebar');
  let progressBar=null;
  let jumpButtons=[];
  if(sidebar){
    sidebar.setAttribute('aria-label','Ruta de aprendizaje');
    const header=sidebar.querySelector('.sidebar-head');
    header.querySelector('span:first-child').textContent='RUTA DE APRENDIZAJE';
    const overview=document.createElement('div');
    overview.className='course-overview';
    const progress=document.createElement('div');
    progress.className='course-progress';
    progress.innerHTML='<span class="course-progress-bar"></span>';
    progressBar=progress.firstElementChild;
    const jumps=document.createElement('div');
    jumps.className='course-jumps';
    [...new Set(sections.map(section=>groupOf(section.title)))].forEach(group=>{
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
    overview.append(header,progress,jumps);
  }

  let previous='';
  [...nav.children].forEach((button,index)=>{
    const title=sections[index].title;
    const group=groupOf(title);
    const level=title.includes(' · ')?title.split(' · ').at(-1):'';
    const text=button.querySelector('span:last-child');
    text.classList.add('nav-title');

    button.dataset.group=group;
    if(level){
      button.dataset.level=level.toLowerCase();
      text.textContent=level;
    }else if(group==='HTML + CSS'){
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

  const syncTheme=()=>{
    const active=[...nav.children].findIndex(button=>button.classList.contains('active'));
    const activeIndex=active<0?0:active;
    const activeGroup=groupOf(sections[activeIndex].title);
    document.body.dataset.course=activeGroup;
    if(progressBar)progressBar.style.width=`${((activeIndex+1)/sections.length)*100}%`;
    jumpButtons.forEach(button=>button.classList.toggle('active',button.dataset.group===activeGroup));
  };
  const originalRender=render;
  render=function(){
    originalRender();
    syncTheme();
  };
  syncTheme();
})();
