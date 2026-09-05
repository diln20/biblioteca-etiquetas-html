(()=>{
  if(window.__htmlExamplesFormatted)return;
  window.__htmlExamplesFormatted=true;

  const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  const format=source=>{
    let depth=0;
    return source.trim().replace(/>\s*</g,'>\n<').split('\n').map(raw=>{
      const line=raw.trim();
      if(!line)return '';
      if(/^<\//.test(line))depth=Math.max(0,depth-1);
      const formatted=`${'  '.repeat(depth)}${line}`;
      const opening=line.match(/^<([a-z][\w-]*)\b/i);
      if(opening&&!voidTags.has(opening[1].toLowerCase())&&!line.toLowerCase().includes(`</${opening[1].toLowerCase()}>`))depth++;
      return formatted;
    }).join('\n');
  };

  const firstAddedSection=sections.findIndex(section=>section.title==='Fundamentos web');
  const htmlSections=firstAddedSection<0?sections:sections.slice(0,firstAddedSection);
  htmlSections.forEach(section=>section.items.forEach(item=>{
    if(typeof item.code==='string'&&item.code.includes('<'))item.code=format(item.code);
  }));
})();
