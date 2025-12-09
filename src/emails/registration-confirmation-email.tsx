import { applicationName } from "@/config";

export interface ExampleEmailTemplateProps {
  name: string;
}

export const ExampleEmailTemplate = ({ name }: ExampleEmailTemplateProps) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
    <div style={{ lineHeight: "1.6", color: "#333" }}>
      <p>
        <strong>Hello {name},</strong>
      </p>

      <p>This is an example email template.</p>

      <hr
        style={{
          margin: "30px 0",
          border: "none",
          borderTop: "1px solid #ddd",
        }}
      />
      <p
        style={{
          fontSize: "12px",
          color: "#666",
          textAlign: "center",
          margin: "0",
        }}
      >
        Sent from {applicationName}.
      </p>
    </div>
  </div>
);
