import { useState } from 'react'
import { EMAILJS_CONFIG } from '../emailjs.config'
import './ContactoForm.css'

// Dirección oficial de la sede Pereyra Rozas, Ciudad Educativa, Salta Capital.
const direccionUniversidad = 'UPATECO, Ciudad Educativa, Avenida Constitución Nacional s/n, Salta, Argentina'
const mapaUrl = `https://www.google.com/maps?q=${encodeURIComponent(direccionUniversidad)}&output=embed`

export default function ContactoForm() {
  const [estado, setEstado] = useState('idle')
  const [mensajeEstado, setMensajeEstado] = useState('')

  async function enviarFormulario(event) {
    event.preventDefault()
    if (estado === 'enviando') return
    const formulario = event.currentTarget
    const datos = new FormData(formulario)

    if (Object.values(EMAILJS_CONFIG).some((valor) => !valor || valor.startsWith('PEGAR_'))) {
      setEstado('error')
      setMensajeEstado('Falta completar los identificadores de EmailJS en src/emailjs.config.js.')
      return
    }

    setEstado('enviando')
    setMensajeEstado('Enviando mensaje...')

    try {
      const respuesta = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_CONFIG.serviceId,
          template_id: EMAILJS_CONFIG.templateId,
          user_id: EMAILJS_CONFIG.publicKey,
          template_params: {
            from_name: String(datos.get('from_name') || '').trim(),
            reply_to: String(datos.get('reply_to') || '').trim(),
            message: String(datos.get('message') || '').trim(),
            subject: 'Consulta desde el TP React',
          },
        }),
      })
      if (!respuesta.ok) throw new Error(`EmailJS ${respuesta.status}`)
      formulario.reset()
      setEstado('ok')
      setMensajeEstado('¡Tu mensaje fue enviado correctamente!')
    } catch (error) {
      setEstado('error')
      setMensajeEstado('No se pudo enviar. Revisá el servicio, la plantilla y la clave pública en EmailJS.')
      console.error('Error de EmailJS:', error)
    }
  }

  return (
    <section className="tp-contacto" aria-labelledby="titulo-contacto">
      <div className="tp-contacto-presentacion">
        <h2 id="titulo-contacto">Formulario de contacto</h2>
        <p>Completá tus datos para enviar un correo electrónico. Formulario realizado con React y EmailJS.</p>
      </div>
      <div className="tp-contacto-columnas">
        <form className="tp-formulario" onSubmit={enviarFormulario}>
          <label htmlFor="nombre">Nombre y apellido</label>
          <input id="nombre" name="from_name" type="text" minLength="2" placeholder="Escribí tu nombre" required />
          <label htmlFor="correo">Correo electrónico</label>
          <input id="correo" name="reply_to" type="email" placeholder="nombre@correo.com" required />
          <label htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" name="message" rows="6" placeholder="Escribí tu consulta" required />
          <button type="submit" disabled={estado === 'enviando'}>
            {estado === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}
          </button>
          {mensajeEstado && <p role="status" className={`tp-estado tp-estado-${estado}`}>{mensajeEstado}</p>}
        </form>
        <div className="tp-mapa-panel">
          <h3>¿Dónde está UPATECO?</h3>
          <p><strong>Sede Pereyra Rozas</strong> · Ciudad Educativa, Av. Constitución Nacional s/n, Salta Capital.</p>
          <iframe
            title="Mapa de UPATECO, sede Pereyra Rozas, Salta"
            src={mapaUrl}
            width="100%"
            height="310"
            style={{ border: 0, borderRadius: 12 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionUniversidad)}`} target="_blank" rel="noopener noreferrer">Ver UPATECO en Google Maps</a>
        </div>
      </div>
    </section>
  )
}
