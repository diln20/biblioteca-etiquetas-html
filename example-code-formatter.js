(()=>{
  if(window.__htmlExamplesFormatted)return;
  window.__htmlExamplesFormatted=true;

  const voidTags=new Set(['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']);
  const looksLikeHtml=source=>/^\s*(?:<!doctype\b|<!--|<\/?[a-z][\w-]*(?:\s|>|\/?>))/i.test(String(source||''));

  const formatHtml=source=>{
    let depth=0;
    const normalized=String(source||'').trim().replace(/\r\n?/g,'\n');
    if(!looksLikeHtml(normalized))return normalized;

    return normalized
      .replace(/>\s*</g,'>\n<')
      .split('\n')
      .map(raw=>{
        const line=raw.trim();
        if(!line)return '';

        const closing=/^<\//.test(line);
        if(closing)depth=Math.max(0,depth-1);

        const formatted=`${'  '.repeat(depth)}${line}`;
        const opening=line.match(/^<([a-z][\w-]*)\b/i);
        const tag=opening?.[1]?.toLowerCase();
        const selfClosing=/\/\s*>$/.test(line);
        const sameLineClose=tag?new RegExp(`<\\/${tag}\\s*>`,'i').test(line):false;
        const special=/^<!|^<\?/.test(line);

        if(tag&&!voidTags.has(tag)&&!selfClosing&&!sameLineClose&&!special)depth++;
        return formatted;
      })
      .join('\n');
  };

  let formattedCount=0;
  sections.forEach(section=>{
    if(!Array.isArray(section?.items))return;
    section.items.forEach(item=>{
      if(typeof item?.code!=='string'||!looksLikeHtml(item.code))return;
      const next=formatHtml(item.code);
      if(next!==item.code){
        item.code=next;
        formattedCount++;
      }
    });
  });

  window.formatHtmlExample=formatHtml;
  window.formattedHtmlExampleCount=formattedCount;
})();
