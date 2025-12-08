import { CONTACT_INFO } from "@/lib/constants";

export interface RegistrationEmailTemplateProps {
  name: string;
}

const PRIMARY_COLOR = "#7948c4";

export const RegistrationConfirmationEmail = ({
  name,
}: RegistrationEmailTemplateProps) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
    {/* Logo */}
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      {/** biome-ignore lint/performance/noImgElement: this is an email */}
      <img
        src="cid:logo"
        alt="Magnetic Pole Dance Studio"
        style={{ maxWidth: "300px", height: "auto" }}
      />
    </div>

    {/* Subject line style header */}
    <h1
      style={{
        color: PRIMARY_COLOR,
        fontSize: "24px",
        marginBottom: "30px",
        textAlign: "center",
      }}
    >
      💜 ¡Bienvenidx a la familia Magnetic! 💜
    </h1>

    {/* Main content */}
    <div style={{ lineHeight: "1.6", color: "#333" }}>
      <p>
        <strong>Hola {name},</strong>
      </p>

      <p>
        <strong>¡Qué ilusión tenerte con nosotrxs! ✨</strong>
        <br />
        Ya formas parte de Magnetic Pole Dance Studio. Esperamos que disfrutes
        cada clase o entreno, que te retes, te inspires y que, sobre todo, ¡te
        diviertas muchísimo!
      </p>

      <p>
        Te adjuntamos la <strong>Hoja de Normas del Estudio</strong>, para que
        la tengas a mano y puedas consultarla si la necesitas. En ella
        encontrarás información importante sobre el funcionamiento del centro,
        seguridad y convivencia.
      </p>

      {/* Contact info box */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          border: `2px solid ${PRIMARY_COLOR}`,
          borderRadius: "8px",
          padding: "20px",
          margin: "25px 0",
        }}
      >
        <p style={{ margin: "0 0 10px 0" }}>
          📍 <strong>Dónde estamos:</strong>{" "}
          <a href={CONTACT_INFO.MAPS} style={{ color: PRIMARY_COLOR }}>
            Centro Comercial San Agustín (planta -1), Gijón
          </a>
        </p>
        <p style={{ margin: "0 0 10px 0" }}>
          📞 <strong>Contacto:</strong>{" "}
          <a
            href={`https://wa.me/34${CONTACT_INFO.PHONE}`}
            style={{ color: PRIMARY_COLOR }}
          >
            {CONTACT_INFO.PHONE}
          </a>{" "}
          -{" "}
          <a
            href={`mailto:${CONTACT_INFO.EMAIL}`}
            style={{ color: PRIMARY_COLOR }}
          >
            {CONTACT_INFO.EMAIL}
          </a>
        </p>
        <p style={{ margin: "0" }}>
          📲 <strong>Síguenos en redes</strong> para enterarte de todas las
          novedades, talleres y eventos especiales.
        </p>
      </div>

      <p>
        Gracias por confiar en nosotrxs y por unirte a esta aventura.
        <br />
        Nos vemos muy pronto en la barra 💪💜
      </p>

      <p>
        <strong>Un abrazo magnético,</strong>
        <br />
        El equipo de Magnetic Pole Dance Studio
      </p>
    </div>

    {/* Footer */}
    <hr
      style={{ margin: "30px 0", border: "none", borderTop: "1px solid #ddd" }}
    />
    <p
      style={{
        fontSize: "12px",
        color: "#666",
        textAlign: "center",
        margin: "0",
      }}
    >
      Este correo fue enviado automáticamente desde Magnetic Pole Studio.
    </p>
  </div>
);
