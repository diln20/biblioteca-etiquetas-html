(()=>{
  if(window.CourseVisuals)return;
  const esc=value=>String(value??'').replace(/[&<>]/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;'
  })[char]);
  const box=(label,body,accent='#2563eb')=>`<section data-visual="box" style="font-family:system-ui;border:1px solid #cbd5e1;border-left:5px solid ${accent};border-radius:14px;background:#fff;color:#334155;overflow:hidden"><header style="padding:10px 14px;background:#f8fafc;font-weight:850;color:${accent}">${esc(label)}</header><div style="padding:15px;line-height:1.65">${body}</div></section>`;
  const pre=(kind,text,background,color,border)=>`<pre data-visual="${kind}" style="margin:0;padding:17px;border:1px solid ${border};border-radius:14px;background:${background};color:${color};font:13px/1.65 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow:auto">${esc(text)}</pre>`;
  const diagram=text=>pre('diagram',text,'#eff6ff','#1e3a8a','#bfdbfe');
  const terminal=text=>pre('terminal',text,'#07111f','#86efac','#1e293b');
  const tree=text=>pre('folder-tree',text,'#f8fafc','#1e293b','#cbd5e1');
  const compare=(badTitle,bad,goodTitle,good)=>`<section data-visual="comparison" style="font-family:system-ui;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px"><article style="padding:15px;border:1px solid #fecaca;border-radius:14px;background:#fff7f7;color:#334155"><strong style="display:block;margin-bottom:8px;color:#dc2626">✕ ${esc(badTitle)}</strong>${bad}</article><article style="padding:15px;border:1px solid #a7f3d0;border-radius:14px;background:#f3fffa;color:#334155"><strong style="display:block;margin-bottom:8px;color:#059669">✓ ${esc(goodTitle)}</strong>${good}</article></section>`;
  const steps=items=>`<ol data-visual="steps" style="font-family:system-ui;line-height:1.75;margin:0;padding-left:22px">${items.map(item=>`<li>${item}</li>`).join('')}</ol>`;
  window.CourseVisuals={esc,box,diagram,terminal,tree,compare,steps};
})();
