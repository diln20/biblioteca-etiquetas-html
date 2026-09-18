(()=>{
  if(window.__globalInteractiveCodeEditorAdded)return;
  window.__globalInteractiveCodeEditorAdded=true;
  if(!Array.isArray(window.sections)||typeof window.createCard!=='function')return;

  const itemSection=new WeakMap();
  sections.forEach(section=>{
    if(!Array.isArray(section?.items))return;
    section.items.forEach(item=>{
      if(item&&typeof item==='object')itemSection.set(item,section);
    });
  });

  const STORAGE_PREFIX='biblioteca-code-draft-v1:';
  const readDraft=key=>{
    try{return window.localStorage?.getItem(key)??null;}catch{return null;}
  };
  const writeDraft=(key,value)=>{
    try{window.localStorage?.setItem(key,value);}catch{}
  };
  const removeDraft=key=>{
    try{window.localStorage?.removeItem(key);}catch{}
  };
  const hash=value=>{
    let h=2166136261;
    const text=String(value||'');
    for(let i=0;i<text.length;i++){
      h^=text.charCodeAt(i);
      h=Math.imul(h,16777619);
    }
    return (h>>>0).toString(36);
  };
  const escapeHtml=value=>String(value??'').replace(/[&<>"]/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'
  })[char]);

  const sectionArea=section=>String(section?.primaryArea||section?.group||'');
  const looksLikeHtml=value=>/<(?:!doctype|html|head|body|main|section|article|div|span|p|h[1-6]|form|input|button|table|img|svg|style|script)\b/i.test(String(value||''));
  const hasNodeOnlySyntax=code=>/\b(?:require\s*\(|module\.exports|exports\.|process\.env|__dirname|__filename|node:fs|node:http|createServer\s*\()/i.test(code)
    || /^\s*(?:import|export)\s/m.test(code);

  const detectMode=(item,section)=>{
    const area=sectionArea(section);
    const source=String(item?.code||'');
    if(item?.interactiveWeb){
      if(area==='JavaScript')return 'javascript';
      if(area==='CSS')return 'css';
      return 'html';
    }
    if(area==='CSS')return 'css';
    if(area==='HTML')return 'html';
    if(area==='JavaScript')return hasNodeOnlySyntax(source)?'text':'javascript';
    return 'text';
  };

  const documentShell=body=>'<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>html{color-scheme:light}body{margin:0;padding:18px;font-family:system-ui;background:#f8fafc;color:#0f172a;box-sizing:border-box}*,*::before,*::after{box-sizing:border-box}</style></head><body>'+body+'</body></html>';

  const splitExternalCss=source=>{
    const match=source.match(/\/\*\s*(?:styles?(?:\.css)?|estilos\.css|css)\s*\*\//i);
    if(!match||!source.slice(0,match.index).includes('<'))return null;
    return {
      html:source.slice(0,match.index).trim(),
      css:source.slice(match.index+match[0].length).trim()
    };
  };

  const htmlDocument=source=>{
    const split=splitExternalCss(source);
    if(split)return documentShell(split.html+'<style>'+split.css+'</style>');
    if(/<!doctype\s+html/i.test(source)||/<html\b/i.test(source))return source;
    return documentShell(source);
  };

  const cssDocument=(source,preview)=>{
    const split=splitExternalCss(source);
    if(split)return documentShell(split.html+'<style>'+split.css+'</style>');
    if(/<style\b/i.test(source))return htmlDocument(source);
    if(looksLikeHtml(source))return htmlDocument(source);
    const scaffold=looksLikeHtml(preview)
      ? String(preview)
      : '<main style="display:grid;gap:12px"><h2 style="margin:0">Vista de práctica CSS</h2><div class="card box panel fila grid elemento texto demo">Edita el CSS y observa los cambios que coincidan con este ejemplo.</div><button class="btn boton">Botón de prueba</button></main>';
    return documentShell(scaffold+'<style>'+source+'</style>');
  };

  const javascriptDocument=(source,preview)=>{
    const scaffold=looksLikeHtml(preview)&&!/<iframe\b/i.test(String(preview))
      ? String(preview)
      : '<main><h2 style="margin-top:0">Salida JavaScript</h2><p>El código se ejecuta dentro de un iframe aislado.</p></main>';
    const safeSource=String(source).replace(/<\/script/gi,'<\\/script');
    const runner='<section id="__js_console_wrap" style="margin-top:16px;padding:12px;border-radius:10px;background:#0f172a;color:#e2e8f0;font:13px/1.55 Consolas,monospace"><strong style="display:block;margin-bottom:8px;color:#67e8f9">Consola</strong><pre id="__js_console" style="margin:0;white-space:pre-wrap"></pre></section>'+
      '<script>(function(){var out=document.getElementById("__js_console");function fmt(v){if(typeof v==="string")return v;try{var j=JSON.stringify(v,null,2);return j===undefined?String(v):j}catch(e){return String(v)}}function line(type,args){var p=document.createElement("div");p.textContent=(type==="log"?"":type.toUpperCase()+": ")+Array.from(args).map(fmt).join(" ");if(type==="error")p.style.color="#fca5a5";if(type==="warn")p.style.color="#fde68a";out.appendChild(p)}["log","warn","error"].forEach(function(type){var original=console[type];console[type]=function(){line(type,arguments);try{original.apply(console,arguments)}catch(e){}}});window.addEventListener("error",function(event){line("error",[event.message])});Promise.resolve().then(async function(){try{'+safeSource+'}catch(error){console.error(error&&error.stack?error.stack:error)}});})();<\/script>';
    return documentShell(scaffold+runner);
  };

  const environmentLabel=section=>{
    const area=sectionArea(section);
    const title=String(section?.title||'');
    if(area==='Git')return 'una terminal con Git';
    if(area==='Backend'||/FastAPI|Django|Node|Base de datos/i.test(title))return 'el entorno indicado en la lección';
    if(area==='Angular'||area==='Frameworks')return 'el proyecto y herramientas del framework';
    if(area==='APIs')return 'el navegador o backend indicado en el ejemplo';
    return 'su entorno correspondiente';
  };

  const previousCreateCard=window.createCard;
  window.createCard=createCard=function(item){
    const fragment=previousCreateCard(item);
    const card=fragment.querySelector?.('.tag-card');
    if(!card||typeof item?.code!=='string'||!item.code.trim())return fragment;
    if(/Editor CSS interactivo integrado/i.test(item.code)&&card.querySelector('.preview-panel iframe'))return fragment;

    const codePanel=card.querySelector('.code-panel');
    const pre=codePanel?.querySelector('pre');
    if(!codePanel||!pre||codePanel.querySelector('[data-live-code-editor="true"]'))return fragment;

    const section=itemSection.get(item);
    const mode=detectMode(item,section);
    const original=String(item.code);
    const draftKey=STORAGE_PREFIX+hash(String(section?.title||'')+'|'+String(item?.name||item?.tag||'')+'|'+original.slice(0,80));
    const saved=readDraft(draftKey);

    codePanel.classList.add('is-live-editable');
    pre.hidden=true;

    const editor=document.createElement('textarea');
    editor.className='global-code-editor';
    editor.dataset.liveCodeEditor='true';
    editor.dataset.codeMode=mode;
    editor.spellcheck=false;
    editor.autocomplete='off';
    editor.autocapitalize='off';
    editor.setAttribute('aria-label','Editor de código editable');
    editor.value=saved===null?original:saved;

    const toolbar=document.createElement('div');
    toolbar.className='live-code-toolbar';

    const left=document.createElement('div');
    left.className='live-code-toolbar-left';
    const modeBadge=document.createElement('span');
    modeBadge.className='live-code-mode';
    modeBadge.textContent=mode==='html'?'HTML interactivo':mode==='css'?'CSS interactivo':mode==='javascript'?'JavaScript sandbox':'Código editable';
    const status=document.createElement('span');
    status.className='live-code-status';
    status.textContent=mode==='text'
      ? 'Editable · ejecútalo en '+environmentLabel(section)+'.'
      : mode==='javascript'
        ? 'Edita y pulsa Ejecutar o Ctrl + Enter.'
        : 'Edita y observa la vista; Ctrl + Enter también aplica los cambios.';
    left.append(modeBadge,status);

    const right=document.createElement('div');
    right.className='live-code-toolbar-right';

    const copy=document.createElement('button');
    copy.type='button';
    copy.className='live-code-action';
    copy.textContent='Copiar edición';

    const run=document.createElement('button');
    run.type='button';
    run.className='live-code-action primary';
    run.textContent=mode==='javascript'?'Ejecutar':'Aplicar';
    if(mode==='text'){
      run.disabled=true;
      run.textContent='Requiere entorno';
    }

    const reset=document.createElement('button');
    reset.type='button';
    reset.className='live-code-action danger';
    reset.textContent='Restablecer';
    right.append(copy,run,reset);
    toolbar.append(left,right);

    codePanel.append(editor,toolbar);

    const previewPanel=card.querySelector('.preview-panel');
    let frame=previewPanel?.querySelector('iframe')||null;
    if(!frame&&previewPanel&&mode!=='text'){
      frame=document.createElement('iframe');
      frame.title='Vista interactiva del código editado';
      previewPanel.append(frame);
    }
    if(frame&&mode!=='text'){
      frame.setAttribute('sandbox','allow-scripts allow-forms');
      frame.setAttribute('referrerpolicy','no-referrer');
      previewPanel.classList.add('is-live-preview');
    }

    const note=document.createElement('p');
    note.className='live-code-runtime-note';
    note.textContent=mode==='text'
      ? 'Puedes modificar y copiar este código aquí. Para ejecutarlo necesitas '+environmentLabel(section)+'.'
      : mode==='javascript'
        ? 'JavaScript se ejecuta solo cuando lo solicitas y dentro de un iframe aislado.'
        : 'La vista se actualiza con tus cambios sin modificar el ejemplo original de la biblioteca.';
    codePanel.append(note);

    const apply=()=>{
      if(mode==='text'||!frame)return;
      const source=editor.value;
      if(mode==='html')frame.srcdoc=htmlDocument(source);
      if(mode==='css')frame.srcdoc=cssDocument(source,item.preview);
      if(mode==='javascript')frame.srcdoc=javascriptDocument(source,item.preview);
      status.textContent=mode==='javascript'?'Ejecutado en sandbox.':'Vista actualizada.';
    };

    let timer=0;
    editor.addEventListener('input',()=>{
      writeDraft(draftKey,editor.value);
      status.textContent='Cambios guardados en este navegador.';
      if(mode==='html'||mode==='css'){
        window.clearTimeout(timer);
        timer=window.setTimeout(apply,180);
      }
    });

    editor.addEventListener('keydown',event=>{
      if(event.key==='Tab'){
        event.preventDefault();
        const start=editor.selectionStart;
        const end=editor.selectionEnd;
        editor.setRangeText('  ',start,end,'end');
        writeDraft(draftKey,editor.value);
        if(mode==='html'||mode==='css'){
          window.clearTimeout(timer);
          timer=window.setTimeout(apply,120);
        }
        return;
      }
      if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){
        event.preventDefault();
        apply();
      }
    });

    run.addEventListener('click',apply);

    reset.addEventListener('click',()=>{
      editor.value=original;
      removeDraft(draftKey);
      status.textContent='Código original restaurado.';
      if(mode!=='text')apply();
      editor.focus();
    });

    copy.addEventListener('click',async()=>{
      try{
        await navigator.clipboard.writeText(editor.value);
        status.textContent='Edición copiada.';
      }catch{
        editor.focus();
        editor.select();
        status.textContent='Seleccionado: usa Ctrl + C para copiar.';
      }
    });

    if(saved!==null&&mode!=='text')window.setTimeout(apply,0);
    return fragment;
  };

  if(typeof window.render==='function')render();
})();