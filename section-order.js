(()=>{
  if(window.__sectionOrderApplied)return;
  window.__sectionOrderApplied=true;

  if(!Array.isArray(window.sections)) return;

  const domIndex=sections.findIndex(section=>section?.title==='Manejo del DOM');
  if(domIndex<0) return;

  const [domSection]=sections.splice(domIndex,1);

  let lastJavascriptIndex=-1;
  sections.forEach((section,index)=>{
    if(typeof section?.title==='string' && section.title.startsWith('JavaScript')){
      lastJavascriptIndex=index;
    }
  });

  if(lastJavascriptIndex>=0){
    sections.splice(lastJavascriptIndex+1,0,domSection);
  }else{
    sections.push(domSection);
  }

  if(typeof buildNav==='function') buildNav();
  if(typeof render==='function') render();
})();
