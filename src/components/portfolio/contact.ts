export const contactEmail = "busthanasherink@gmail.com";
export const linkedInUrl =
  "https://www.linkedin.com/in/busthana-shirin-48393723a?utm_source=share_via&utm_content=profile&utm_medium=member_ios";

export function createEnquiryMailto(fields: {
  name: string;
  email: string;
  brand: string;
  details: string;
}) {
  const subject = `Project enquiry from ${fields.name}`;
  const body = `Name: ${fields.name}\nEmail: ${fields.email}\nCompany or brand: ${fields.brand || "Not specified"}\n\nProject details:\n${fields.details}`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
