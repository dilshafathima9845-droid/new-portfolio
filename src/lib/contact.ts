import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  brand: z.string().trim().max(150).default(""),
  details: z.string().trim().min(5).max(5000),
});

export const sendEnquiryEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    const host = process.env["SMTP_HOST"];
    const port = Number(process.env["SMTP_PORT"] || 465);
    const user = process.env["SMTP_USER"];
    const pass = process.env["SMTP_PASS"];
    const recipient = process.env["CONTACT_EMAIL"];

    if (!host || !user || !pass || !recipient) {
      throw new Error("Email service is not configured.");
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Enquiry" <${user}>`,
      to: recipient,
      replyTo: data.email,
      subject: `Project enquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company or brand: ${data.brand || "Not specified"}`,
        "",
        "Project details:",
        data.details,
      ].join("\n"),
    });

    return { success: true };
  });
