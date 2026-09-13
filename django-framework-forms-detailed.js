(()=>{
  if(window.__djangoFrameworkFormsDetailed)return;
  window.__djangoFrameworkFormsDetailed=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,body)=>`<section style="font-family:system-ui;max-width:620px;padding:24px;border:1px solid #cbd5e1;border-radius:16px;background:#fff;color:#0f172a"><p style="margin:0 0 6px;font-size:12px;font-weight:900;text-transform:uppercase;color:#15803d">Formulario Django</p><h2 style="margin:0 0 12px">${title}</h2>${body}</section>`;
  const D=(topic,name,description,code,result,tip)=>T(topic,name,description,code,result,[],{kind:'Django Framework',tip});

  sections.push({
    title:'Django Framework · Formularios completos',
    navLabel:'Formularios completos',
    group:'Django Framework',
    primaryArea:'Django Framework',
    areaOrder:40,
    description:'Aprende el recorrido completo de un formulario: HTML, request.POST, forms.py, validación del servidor, errores accesibles, CSS de estados y JavaScript como mejora progresiva.',
    quote:'“JavaScript ayuda al usuario; Django decide si los datos son válidos.”',
    challenge:'Crea un formulario de contacto con errores claros, contador de caracteres y redirección después de un envío válido.',
    items:[
      D(
        'forms.py',
        'Entender el ciclo GET y POST de un Form',
        'En una petición GET la view crea un formulario vacío y lo muestra. En POST construye el formulario con request.POST. is_valid() convierte valores, ejecuta validadores y llena cleaned_data cuando todo es correcto. Si algo falla, la misma instancia contiene errores. Esta validación ocurre en el servidor y sigue funcionando aunque el navegador tenga JavaScript desactivado.',
        '# inicio/forms.py\nfrom django import forms\n\nclass ContactoForm(forms.Form):\n    nombre = forms.CharField(max_length=80)\n    email = forms.EmailField()\n    mensaje = forms.CharField(\n        min_length=20,\n        max_length=500,\n        widget=forms.Textarea,\n    )\n\n# inicio/views.py\nfrom django.shortcuts import redirect, render\nfrom .forms import ContactoForm\n\ndef contacto(request):\n    form = ContactoForm(request.POST or None)\n\n    if request.method == "POST" and form.is_valid():\n        datos = form.cleaned_data\n        print(datos)\n        return redirect("inicio:gracias")\n\n    return render(request, "inicio/contacto.html", {"form": form})',
        preview('Recorrido del formulario','<p>GET → formulario vacío → render</p><p>POST → request.POST → is_valid()</p><p style="margin-bottom:0">válido → cleaned_data + redirect · inválido → render con errores</p>'),
        'No guardes request.POST directamente; usa cleaned_data después de validar.'
      ),
      D(
        'csrf_token',
        'Renderizar un formulario HTML protegido',
        'Un formulario POST debe incluir {% csrf_token %}. Django compara ese token con la sesión/cookie esperada antes de aceptar la solicitud. Cada label debe apuntar al input correcto y los errores deben aparecer cerca del campo. Puedes renderizar campos individualmente para controlar mejor el HTML y el diseño.',
        '<!-- inicio/templates/inicio/contacto.html -->\n{% extends "inicio/base.html" %}\n\n{% block content %}\n<form method="post" class="form" novalidate>\n  {% csrf_token %}\n\n  <div class="field">\n    <label for="{{ form.nombre.id_for_label }}">Nombre</label>\n    {{ form.nombre }}\n    {% for error in form.nombre.errors %}\n      <p class="field__error">{{ error }}</p>\n    {% endfor %}\n  </div>\n\n  <div class="field">\n    <label for="{{ form.email.id_for_label }}">Correo</label>\n    {{ form.email }}\n    {% for error in form.email.errors %}\n      <p class="field__error">{{ error }}</p>\n    {% endfor %}\n  </div>\n\n  <button type="submit">Enviar</button>\n</form>\n{% endblock %}',
        preview('Formulario','<label>Nombre</label><input style="display:block;width:100%;margin:6px 0 12px;padding:10px;border:1px solid #cbd5e1;border-radius:8px"><label>Correo</label><input style="display:block;width:100%;margin:6px 0 12px;padding:10px;border:1px solid #cbd5e1;border-radius:8px"><button style="padding:10px 16px;background:#15803d;color:#fff;border:0;border-radius:8px">Enviar</button>'),
        'Durante aprendizaje, novalidate permite ver claramente los errores producidos por Django en lugar de que el navegador bloquee el envío antes.'
      ),
      D(
        'CSS de estados',
        'Diseñar foco, ayuda y error de forma accesible',
        'Los campos deben comunicar su estado con más de un color. :focus-visible muestra claramente qué control tiene el foco cuando se usa teclado. Los mensajes de error deben ser texto legible. No elimines outline sin ofrecer una alternativa de contraste suficiente. Un tamaño mínimo cómodo de los controles también mejora la interacción táctil.',
        '.form {\n  display: grid;\n  gap: 18px;\n  max-width: 620px;\n}\n\n.field { display: grid; gap: 7px; }\n\n.field input,\n.field textarea {\n  width: 100%;\n  padding: 12px 14px;\n  border: 1px solid #64748b;\n  border-radius: 10px;\n  font: inherit;\n}\n\n.field input:focus-visible,\n.field textarea:focus-visible {\n  outline: 3px solid #86efac;\n  outline-offset: 2px;\n  border-color: #15803d;\n}\n\n.field__error {\n  margin: 0;\n  color: #b91c1c;\n  font-weight: 700;\n}\n\nbutton { min-height: 44px; }',
        preview('Error visible','<label>Correo</label><input value="correo-invalido" style="display:block;width:100%;margin:6px 0;padding:10px;border:2px solid #b91c1c;border-radius:8px"><p style="margin:5px 0;color:#b91c1c;font-weight:700">Introduce una dirección de correo válida.</p>'),
        'Prueba el formulario usando solo Tab, Shift+Tab y Enter; siempre debes saber qué control está activo.'
      ),
      D(
        'JavaScript complementario',
        'Agregar un contador de caracteres sin sustituir la validación',
        'JavaScript puede dar retroalimentación inmediata mientras el usuario escribe, pero Django sigue siendo la autoridad. Aunque alguien desactive el script, max_length=500 continuará validándose en el servidor. La capa cliente mejora la experiencia; la capa servidor protege la integridad de los datos.',
        '<!-- contacto.html -->\n<div class="field">\n  <label for="{{ form.mensaje.id_for_label }}">Mensaje</label>\n  {{ form.mensaje }}\n  <p data-counter-output>Máximo 500 caracteres</p>\n</div>\n\n// inicio/static/inicio/js/main.js\nconst message = document.querySelector("textarea[name=mensaje]");\nconst output = document.querySelector("[data-counter-output]");\nconst MAX = 500;\n\nfunction updateCounter() {\n  if (!message || !output) return;\n  const remaining = MAX - message.value.length;\n  output.textContent = remaining + " caracteres disponibles";\n}\n\nmessage?.addEventListener("input", updateCounter);\nupdateCounter();',
        preview('Ayuda inmediata','<label>Mensaje</label><textarea style="display:block;width:100%;height:90px;margin:6px 0;padding:10px;border:1px solid #cbd5e1;border-radius:8px">Hola, quisiera información...</textarea><p style="color:#64748b">470 caracteres disponibles</p>'),
        'Todo dato importante debe volver a validarse en Django aunque exista una validación en JavaScript.'
      ),
      D(
        'POST/Redirect/GET',
        'Evitar envíos duplicados al recargar',
        'Después de procesar correctamente un POST, la view suele devolver redirect(). El navegador hace entonces un GET nuevo. Esto evita que F5 intente reenviar el formulario. Si devuelves el template directamente después de guardar, el navegador conserva el POST como última navegación y puede advertir sobre reenvío de datos.',
        '# inicio/views.py\ndef contacto(request):\n    form = ContactoForm(request.POST or None)\n\n    if request.method == "POST" and form.is_valid():\n        # guardar o enviar datos\n        return redirect("inicio:gracias")\n\n    return render(request, "inicio/contacto.html", {"form": form})\n\ndef gracias(request):\n    return render(request, "inicio/gracias.html")\n\n# inicio/urls.py\npath("contacto/", views.contacto, name="contacto"),\npath("gracias/", views.gracias, name="gracias"),',
        preview('Mensaje enviado','<p style="margin:0">Gracias. El POST terminó y ahora el navegador está en una nueva petición GET.</p>'),
        'Después de crear o modificar datos mediante POST, normalmente redirige a una URL GET.'
      )
    ]
  });
})();
