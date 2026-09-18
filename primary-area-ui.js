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

  const cleanSequence=value=>String(value||'')
    .replace(/^\s*\d{1,2}[A-Z]?\.\s*/i,'')
    .replace(/(·\s*)\d{1,2}[A-Z]?\.\s*/gi,'$1')
    .replace(/\s*·\s*$/,'')
    .replace(/\s{2,}/g,' ')
    .trim();

  const navLabelOf=(section,group)=>{
    let label=String(section.navLabel||section.title||'').trim();

    if(group==='HTML'){
      label=label.replace(/^HTML\s*·\s*/i,'');
    }else if(group==='CSS'){
      label=label.replace(/^CSS\s*·\s*/i,'');
    }else if(group==='JavaScript'){
      label=label.replace(/^JavaScript\s*·\s*/i,'');
    }else if(group==='Git'){
      label=label.replace(/^Git\s*·\s*/i,'');
    }else if(group==='APIs'){
      label=label
        .replace(/^APIs?\s+gratuitas?\s*·\s*/i,'')
        .replace(/^Consumo\s+de\s+APIs?\s*·\s*/i,'')
        .replace(/^APIs?\s*·\s*/i,'');
    }else if(group==='Angular'){
      label=label
        .replace(/^Frameworks\s+frontend\s*·\s*Angular\s*·?\s*/i,'')
        .replace(/^Angular\s*·\s*/i,'');
    }else if(group==='Frameworks'){
      label=label
        .replace(/^Frameworks\s+frontend\s*·\s*/i,'')
        .replace(/^Proyectos\s+con\s+frameworks\s*·\s*/i,'');
    }else if(group==='Backend'){
      label=label
        .replace(/^Backend\s+APIs?\s*·\s*/i,'')
        .replace(/^Backend\s+FastAPI\s*·\s*/i,'FastAPI · ')
        .replace(/^Backend\s*·\s*/i,'');
    }

    return cleanSequence(label)||String(section.title||'Tema');
  };

  window.formatCourseNavLabel=navLabelOf;

  const syncHeadingCounter=(heading,group,section)=>{
    const candidates=[...heading.querySelectorAll('span,div,p,strong,small')];
    const counter=candidates.find(element=>{
      const text=String(element.textContent||'').trim();
      const parts=text.split('/');
      return parts.length===2
        && areaNames.includes(parts[0].trim())
        && /^\d+$/.test(parts[1].trim());
    });
    if(counter){
      counter.textContent=`${group} / ${section.routeAreaTotal}`;
      counter.dataset.areaCounter='true';
    }
  };

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
    const label=navLabelOf(section,group);
    if(text)text.textContent=`${String(section.routeAreaPosition).padStart(2,'0')}. ${label}`;

    if(group!==previous){
      const meta=areas.find(area=>area.id===group)||{order:1,total:section.routeAreaTotal};
      const groupLabel=document.createElement('span');
      groupLabel.className='nav-group-label';
      groupLabel.textContent=`${String(meta.order).padStart(2,'0')} · ${group} · ${meta.total} temas`;
      button.classList.add('group-start');
      button.prepend(groupLabel);
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
    syncHeadingCounter(heading,group,section);
  };

  nav.addEventListener('click',()=>setTimeout(sync,0));
  sync();
})();
