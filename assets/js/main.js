document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.custom-navbar');

    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 63, 154, 0.55)';
        } else {
            navbar.style.background = 'rgba(18, 63, 154, 0.55)';
        }
    });

    // Simple smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Manejar envío del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const dni = document.getElementById('dni').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const asuntoInput = document.getElementById('asunto').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            const mensajeEstado = document.getElementById('mensajeEstado');

            // Validar que los campos no estén vacíos
            if (!nombre || !dni || !telefono || !asuntoInput || !mensaje) {
                mostrarMensaje('Por favor completa todos los campos', 'error', mensajeEstado);
                return;
            }

            if (!/^\d{8}$/.test(dni)) {
                mostrarMensaje('El DNI debe tener exactamente 8 dígitos', 'error', mensajeEstado);
                return;
            }

            if (!/^\d{9}$/.test(telefono)) {
                mostrarMensaje('El número de teléfono debe tener exactamente 9 dígitos', 'error', mensajeEstado);
                return;
            }

            // Crear el contenido del email
            const asunto = asuntoInput;
            const cuerpoEmail = `Hola mi nombre es: ${nombre}
Con DNI: ${dni}
Mi número de contacto es: ${telefono}

Mensaje:
${mensaje}`;

            // Crear URL encoded content
            const asuntoEncoded = encodeURIComponent(asunto);
            const cuerpoEncoded = encodeURIComponent(cuerpoEmail);

            // Copiar el contenido completo al portapapeles
            navigator.clipboard.writeText(cuerpoEmail).then(() => {
                // Abrir Gmail en una nueva pestaña con los parámetros correctos
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=chancaylambayeque@juchl.org.pe&su=${asuntoEncoded}&body=${cuerpoEncoded}`;

                // Intentar abrir con todos los parámetros
                window.open(gmailUrl, '_blank');

                // Mostrar instrucciones detalladas con opción de copiar
                const btnCopiar = '<button id="btnCopiarAgain" style="background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-top: 10px;">📋 Copiar nuevamente</button>';

                mostrarMensajePersonalizado(
                    '✉️ <strong>Gmail se abrirá en una nueva pestaña</strong><br><br>' +
                    '📋 <strong>El contenido ya está copiado</strong><br><br>' +
                    '<strong>En Gmail:</strong><br>' +
                    '1️⃣ Haz clic en el área de composición (campo de mensaje)<br>' +
                    '2️⃣ Pega el contenido (Ctrl+V en Windows o Cmd+V en Mac)<br>' +
                    '3️⃣ Revisa que todo esté correcto<br>' +
                    '4️⃣ Haz clic en "Enviar"<br><br>' +
                    btnCopiar,
                    'exito',
                    mensajeEstado
                );

                // Agregar funcionalidad al botón de copiar
                document.getElementById('btnCopiarAgain').addEventListener('click', () => {
                    navigator.clipboard.writeText(cuerpoEmail).then(() => {
                        mostrarMensaje('✅ Contenido copiado nuevamente', 'exito', mensajeEstado);
                    });
                });

                // Limpiar formulario después de 4 segundos
                setTimeout(() => {
                    contactForm.reset();
                }, 4000);
            }).catch(err => {
                mostrarMensaje('Error al copiar. Por favor intenta nuevamente.', 'error', mensajeEstado);
                console.error('Error al copiar:', err);
            });
        });
    }

    // Función para mostrar mensajes normales
    function mostrarMensaje(texto, tipo, elemento) {
        elemento.innerHTML = texto;
        elemento.style.display = 'block';

        if (tipo === 'exito') {
            elemento.style.background = 'rgba(76, 175, 80, 0.2)';
            elemento.style.color = '#4CAF50';
            elemento.style.border = '1px solid rgba(76, 175, 80, 0.5)';
        } else {
            elemento.style.background = 'rgba(244, 67, 54, 0.2)';
            elemento.style.color = '#f44336';
            elemento.style.border = '1px solid rgba(244, 67, 54, 0.5)';
        }

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            elemento.style.display = 'none';
        }, 5000);
    }

    // Función para mostrar mensajes con HTML
    function mostrarMensajePersonalizado(html, tipo, elemento) {
        elemento.innerHTML = html;
        elemento.style.display = 'block';
        elemento.style.lineHeight = '1.8';
        elemento.style.fontSize = '14px';

        if (tipo === 'exito') {
            elemento.style.background = 'rgba(76, 175, 80, 0.2)';
            elemento.style.color = '#4CAF50';
            elemento.style.border = '1px solid rgba(76, 175, 80, 0.5)';
        } else {
            elemento.style.background = 'rgba(244, 67, 54, 0.2)';
            elemento.style.color = '#f44336';
            elemento.style.border = '1px solid rgba(244, 67, 54, 0.5)';
        }

        // NO ocultar automáticamente, el usuario debe verlo
    }
});
