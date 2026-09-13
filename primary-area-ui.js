(()=>{
  if(window.__primaryAreaUiApplied)return;
  window.__primaryAreaUiApplied=true;
  const nav=document.querySelector('#categoryNav');
  if(!nav||!Array.isArray(window.sections))return;

  const rawAreas=Array.isArray(window.learningPath?.areas)?window.learningPath.areas:[];
  const areaNames=rawAreas.map(area=>typeof area==='string'?area:area?.id).filter(Boolean);
  const totals=new Map();
  sections.forEach(section=>{
    const group=section.primaryArea||section.group||'HTML';
    totals.set(group,(totals.get(group)||0)+1);
  });
  const areas=areaNames.map((id,index)=>({id,order:index+1,total:totals.get(id)||0}));

  const positions=new Map();
  sections.forEach(section=>{
    const group=section.primaryArea||section.group||'HTML';
    const position=(positions.get(group)||0)+1;
    positions.set(group,position);
    section.primaryArea=group;
    section.group=group;
    section.routeAreaPosition=position;
    section.routeAreaTotal=totals.get(group)||1;
  });

  const buttons=[...nav.children];
  nav.querySelectorAll('.nav-group-label').forEach(label=>label.remove());

  let previous='';
  buttons.forEach((button,index)=>{
    const section=sections[index];
    const group=section.primaryArea||'HTML';
    button.classList.remove('group-start');
    button.dataset.group=group;
    button.title=section.title;

    const text=button.querySelector('span:last-child');
    if(text)text.textContent=`${String(section.routeAreaPosition).padStart(2,'0')}. ${section.navLabel||section.title}`;

    if(group!==previous){
      const meta=areas.find(area=>area.id===group)||{order:1,total:section.routeAreaTotal};
      const label=document.createElement('span');
      label.className='nav-group-label';
      label.textContent=`${String(meta.order).padStart(2,'0')} · ${group} · ${meta.total} temas`;
      button.classList.add('group-start');
      button.prepend(label);
      previous=group;
    }
  });

  const jumps=document.querySelector('.course-jumps');
  if(jumps){
    jumps.replaceChildren();
    areas.forEach(area=>{
      const jump=document.createElement('button');
      jump.type='button';
      jump.className='course-jump';
      jump.dataset.group=area.id;
      jump.textContent=`${String(area.order).padStart(2,'0')} · ${area.id}`;
      jump.onclick=()=>{
        const target=buttons.find(button=>button.dataset.group===area.id);
        target?.click();
        target?.scrollIntoView({behavior:'smooth',block:'center'});
      };
      jumps.append(jump);
    });
  }

  const sync=()=>{
    const index=Math.max(0,buttons.findIndex(button=>button.classList.contains('active')));
    const section=sections[index];
    const group=section.primaryArea||'HTML';
    document.body.dataset.course=group;
    document.querySelectorAll('.course-jump').forEach(button=>button.classList.toggle('active',button.dataset.group===group));

    const heading=document.querySelector('.section-heading');
    if(!heading)return;
    let context=heading.querySelector('[data-route-context]');
    if(!context){
      context=document.createElement('div');
      context.className='route-context';
      context.dataset.routeContext='true';
      heading.prepend(context);
    }
    const meta=areas.find(area=>area.id===group)||{order:1,total:section.routeAreaTotal};
    context.textContent=`RUTA ${meta.order}/${areas.length} · ${group} · TEMA ${section.routeAreaPosition}/${section.routeAreaTotal}`;
  };

  nav.addEventListener('click',()=>setTimeout(sync,0));
  sync();
})();
