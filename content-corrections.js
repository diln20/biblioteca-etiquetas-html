(()=>{
  if(window.__contentCorrectionsApplied)return;
  window.__contentCorrectionsApplied=true;
  if(!Array.isArray(window.sections))return;

  const modelItem=sections
    .flatMap(section=>Array.isArray(section?.items)?section.items:[])
    .find(item=>item?.name==='Archivo: productos/models.py'
      && typeof item.code==='string'
      && item.code.includes('class Producto(models.Model):'));

  if(!modelItem)return;

  const original=[
    'class Producto(models.Model):',
    '    nombre = models.CharField(max_length=120)',
    '    precio = models.DecimalField(max_digits=10, decimal_places=2)'
  ].join('\n');
  const corrected=original+'\n    stock = models.PositiveIntegerField(default=0)';

  if(!modelItem.code.includes('stock = models.PositiveIntegerField(default=0)')
    && modelItem.code.includes(original)){
    modelItem.code=modelItem.code.replace(original,corrected);
  }
})();
