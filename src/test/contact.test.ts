import { describe, expect, it } from "vitest";
import { createEnquiryMailto, linkedInUrl } from "../components/portfolio/contact";

describe("contact destinations", () => {
  it("opens an enquiry addressed to the supplied mailbox with the entered details", () => {
    const url = new URL(createEnquiryMailto({ name: "Asha", email: "asha@example.com", brand: "Studio & Co", details: "SEO & Meta Ads\nDubai" }));
    expect(url.pathname).toBe("busthanasherink@gmail.com");
    expect(url.searchParams.get("subject")).toBe("Project enquiry from Asha");
    expect(url.searchParams.get("body")).toBe("Name: Asha\nEmail: asha@example.com\nCompany or brand: Studio & Co\n\nProject details:\nSEO & Meta Ads\nDubai");
  });
  it("uses the supplied LinkedIn profile", () => {
    expect(linkedInUrl).toBe("https://www.linkedin.com/in/busthana-shirin-48393723a?utm_source=share_via&utm_content=profile&utm_medium=member_ios");
  });
});