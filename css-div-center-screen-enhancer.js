(()=>{
  if(window.__cssDivCenterScreenAdded)return;
  window.__cssDivCenterScreenAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const section=window.sections.find(item=>item.title==='CSS · Manejo de DIV · Filas y columnas');
  if(!section||!Array.isArray(section.items))return;
  if(section.items.some(item=>String(item.name||'').includes('centro de la pantalla')))return;

  const code=`<!-- index.html -->
<div class="pantalla-centro">
  <div class="caja-centro">
    Estoy exactamente en el centro
  </div>
</div>

<style>
/* MÉTODO RECOMENDADO · FLEXBOX */
.pantalla-centro {
  min-height: 100vh;
  display: flex;
  justify-content: center; /* centro horizontal */
  align-items: center;     /* centro vertical */
}

.caja-centro {
  width: min(320px, 90%);
  padding: 24px;
  border-radius: 14px;
  background: #dbeafe;
  text-align: center;
}
</style>

/* OPCIÓN 2 · GRID */
.pantalla-centro {
  min-height: 100vh;
  display: grid;
  place-items: center;
}

/* OPCIÓN 3 · POSITION */
.caja-centro {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}`;

  const preview=`
<style>
.preview-pantalla-centro {
  min-height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border: 2px dashed #60a5fa;
  border-radius: 14px;
  background: linear-gradient(135deg,#eff6ff,#f8fafc);
}
.preview-caja-centro {
  width: min(320px,90%);
  padding: 24px;
  border-radius: 14px;
  background: #dbeafe;
  box-shadow: 0 10px 30px rgba(15,23,42,.12);
  text-align: center;
  font-weight: 700;
  color: #1e3a8a;
}
</style>
<div class="preview-pantalla-centro">
  <div class="preview-caja-centro">DIV centrado horizontal y verticalmente</div>
</div>`;

  const item=T(
    'centrar div pantalla flex grid',
    'Centrar un DIV exactamente en el centro de la pantalla',
    'Para colocar una caja justo en el centro de la pantalla necesitas centrarla en dos ejes: horizontal y vertical. La forma más clara para principiantes es poner display:flex en el contenedor, justify-content:center para el eje horizontal y align-items:center para el eje vertical. min-height:100vh hace que el contenedor tenga como mínimo la altura completa de la ventana. También puedes hacerlo con Grid usando place-items:center. position:absolute funciona, pero suele ser menos flexible para layouts normales.',
    code,
    preview,
    [],
    {
      kind:'CSS · manejo de div',
      tip:'Regla para recordar: Flexbox va en el PADRE. justify-content:center + align-items:center centra al HIJO en ambos ejes. Para ocupar toda la pantalla usa min-height:100vh; en interfaces móviles modernas también puedes estudiar 100dvh.'
    }
  );

  const alignIndex=section.items.findIndex(item=>String(item.name||'').includes('Alinear los DIV verticalmente'));
  if(alignIndex>=0) section.items.splice(alignIndex+1,0,item);
  else section.items.push(item);
})();
