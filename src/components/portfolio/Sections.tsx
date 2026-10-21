import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { projects } from "./projects";
import { linkedInUrl } from "./contact";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sendEnquiryEmail } from "@/lib/contact";

const nav = ["Home", "About", "Services", "Work", "Skills", "Contact"];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-primary"
      />
      <header className="fixed inset-x-0 top-0 z-50 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/60 bg-background/70 px-6 py-3 backdrop-blur-md">
          <a href="#home" className="font-serif text-lg tracking-wide">
            BUSTHANA SHIRIN®
          </a>
          <nav className="hidden gap-8 md:flex">
            {nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="group relative text-sm">
                {n}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 text-xs lg:flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for Opportunities
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menu">
            {open ? "✕" : "☰"}
          </button>
        </div>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 flex max-w-7xl flex-col gap-4 rounded-3xl bg-card p-6 md:hidden"
          >
            {nav.map((n) => (
              <a
                key={n}
                onClick={() => setOpen(false)}
                href={`#${n.toLowerCase()}`}
                className="font-serif text-2xl"
              >
                {n}
              </a>
            ))}
          </motion.nav>
        )}
      </header>
    </>
  );
}

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    el.style.display = "block";
    const xTo = gsap.quickTo(el, "x", { duration: 0.4 });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4 });
    const move = (e: MouseEvent) => {
      xTo(e.clientX - 12);
      yTo(e.clientY - 12);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      style={{ display: "none" }}
      className="pointer-events-none fixed left-0 top-0 z-[70] h-6 w-6 rounded-full border border-primary mix-blend-difference"
    />
  );
}

function Marquee({ items, fast }: { items: string[]; fast?: boolean }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-8">
      <div className={`flex w-max gap-12 ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        {row.map((t, k) => (
          <span key={k} className={`font-serif text-5xl italic md:text-7xl ${k % 2 ? "" : ""}`}>
            {t} ✦
          </span>
        ))}
      </div>
    </div>
  );
}

const Label = ({ children }: { children: string }) => (
  <p className="reveal mb-6 text-xs tracking-[0.3em] opacity-60">{children}</p>
);

export function About() {
  return (
    <section
      id="about"
      className="grain relative z-20 -mt-12 rounded-t-[3rem] bg-ink text-ink-foreground md:rounded-t-[5rem]"
    >
      <Marquee items={["STRATEGY", "CREATIVITY", "PERFORMANCE", "GROWTH", "DIGITAL EXPERIENCE"]} />
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-[1fr_1.2fr] md:px-10">
        <div>
          <Label>01 / A LITTLE ABOUT ME</Label>
          <h2 className="reveal text-5xl font-light leading-tight md:text-7xl">
            Strategy meets <em className="text-sand">creativity.</em>
          </h2>
        </div>
        <div>
          <p className="scrub-text font-serif text-2xl font-light leading-relaxed md:text-3xl">
            I’m a Digital Marketing Professional from Calicut, Kerala, specialising in *SEO and Meta
            Ads* to help brands strengthen their online presence and reach the right audience. My
            experience includes working on brands across international markets, with a focus on
            improving search visibility, building brand awareness, and creating effective digital
            marketing campaigns. I combine analytical thinking with creative strategy to help
            businesses grow, connect with their audiences, and build a stronger digital presence.
          </p>
        </div>
      </div>
    </section>
  );
}

const services = [
  [
    "Search Engine Optimisation",
    "Keyword research, on-page & technical SEO, local SEO, content optimisation.",
  ],
  [
    "Google Ads & Performance",
    "Campaign setup, targeting, ad copy, conversion tracking and optimisation.",
  ],
  ["Meta Ads", "Facebook & Instagram campaigns, creative testing, audiences, lead generation."],
  ["Social Media Management", "Content calendars, strategy, engagement and brand consistency."],
  ["Content & Copywriting", "SEO blogs, website copy, captions and brand storytelling."],
  ["Website Design", "Portfolios, business sites and conversion-focused landing pages."],
];

export function Services() {
  return (
    <section id="services" className="relative bg-background px-6 py-32 md:px-10">
      <div className="mx-auto max-w-7xl">
        <Label>02 / WHAT I DO</Label>
        <h2 className="reveal max-w-3xl text-5xl font-light leading-tight md:text-7xl">
          Digital solutions with <em className="text-primary">purpose.</em>
        </h2>
        <div className="mt-20 grid border-t border-border md:grid-cols-2">
          {services.map(([t, d], k) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: (k % 2) * 0.1, duration: 0.7 }}
              className="tilt group relative flex gap-6 overflow-hidden border-b border-border p-8 md:odd:border-r"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-mocha transition-transform duration-500 group-hover:scale-y-100" />
              <span className="relative font-serif text-4xl text-muted-foreground transition group-hover:text-primary-foreground">
                {String(k + 1).padStart(2, "0")}
              </span>
              <div className="relative transition duration-500 group-hover:translate-x-2 group-hover:text-primary-foreground">
                <h3 className="text-2xl">{t}</h3>
                <p className="mt-2 text-sm opacity-70">{d}</p>
              </div>
              <span className="relative ml-auto self-start text-2xl opacity-0 transition group-hover:rotate-45 group-hover:text-primary-foreground group-hover:opacity-100">
                ↑
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      id="work"
      className="relative rounded-t-[3rem] bg-ink px-6 py-24 text-ink-foreground md:rounded-t-[5rem] md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div>
          <Label>03 / SELECTED WORK</Label>
          <h2 className="text-4xl font-light md:text-6xl">
            Work that speaks through <em className="text-sand">strategy.</em>
          </h2>
        </div>
        <div className="mt-14 grid auto-rows-fr gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, k) => (
            <motion.article
              key={project.name}
              aria-label={project.name}
              initial={reduceMotion ? false : { opacity: 0, y: 36, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              whileHover={reduceMotion ? {} : { y: -6 }}
              transition={{ duration: 0.5, delay: (k % 3) * 0.06 }}
              className="group flex h-full min-w-0 flex-col rounded-lg border border-ink-foreground/20 p-6 transition-colors hover:border-sand"
            >
              <div className="flex h-32 shrink-0 items-center justify-center overflow-hidden rounded-md bg-card p-5">
                <img
                  src={project.logo}
                  alt={`${project.name} logo`}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-500 ease-out motion-safe:hover:scale-125"
                />
              </div>
              <p className="mt-6 text-xs text-sand">{project.category}</p>
              <h3 className="mt-2 text-3xl">{project.name}</h3>
              <p className="mt-5 text-sm leading-relaxed text-ink-foreground/75">
                {project.description}
              </p>
              <div className="mt-auto pt-6">
                <div className="border-t border-ink-foreground/20 pt-5">
                  <p className="text-xs font-semibold text-sand">
                    {project.achievement ? "Key Achievement" : "Key Focus"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-foreground/85">
                    {project.focus}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const skills = [
  "SEO & Keyword Research",
  "Google Search Console",
  "Google Analytics 4",
  "Google Ads",
  "Meta Ads Manager",
  "Social Media Strategy",
  "Content Writing",
  "Technical SEO",
  "Local SEO",
  "Content Optimisation",
  "Canva & Design",
  "Website Design",
  "Basic Web Development",
  "Reporting & Analysis",
];

export function Skills() {
  return (
    <section id="skills" className="bg-ink pb-24 text-ink-foreground">
      <Marquee fast items={["SEO", "GA4", "META ADS", "GOOGLE ADS", "CANVA", "CONTENT"]} />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-16 md:grid-cols-2 md:px-10">
        <h2 className="reveal sticky top-32 self-start text-6xl font-light leading-none md:text-8xl">
          My creative <em className="text-sand">toolkit.</em>
        </h2>
        <ul>
          {skills.map((s) => (
            <li
              key={s}
              className="reveal group flex items-center justify-between border-b border-ink-foreground/15 py-5 font-serif text-2xl transition hover:pl-4 hover:text-sand"
            >
              {s}
              <span className="transition group-hover:translate-x-2">→</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const steps = [
  ["Discover", "Understand the business, audience, objectives and challenges."],
  ["Strategise", "Research keywords, competitors, audiences and channels."],
  ["Create & Execute", "Campaigns, content, website improvements and creatives."],
  ["Analyse & Improve", "Review data, evaluate performance, optimise."],
];

export function Process() {
  return (
    <section className="relative overflow-hidden bg-background px-6 py-32 md:px-10">
      <div className="parallax-blob absolute -left-20 top-20 h-80 w-80 rounded-full bg-sand/50 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <Label>04 / PROCESS</Label>
        <h2 className="reveal max-w-3xl text-5xl font-light leading-tight md:text-6xl">
          From first idea to <em className="text-primary">measurable progress.</em>
        </h2>
        <div className="relative mt-20 grid gap-10 md:grid-cols-4">
          <div className="process-line absolute left-0 top-6 hidden h-px w-full origin-left bg-primary md:block" />
          {steps.map(([t, d], k) => (
            <div key={t} className="reveal tilt relative">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-mocha text-sm text-primary-foreground">
                0{k + 1}
              </span>
              <h3 className="mt-6 text-2xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type EnquiryStatus = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<EnquiryStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget; // capture before the await
    const data = new FormData(form);

    setStatus("sending");
    setErrorMessage("");

    try {
      await sendEnquiryEmail({
        data: {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          brand: String(data.get("brand") ?? ""),
          details: String(data.get("details") ?? ""),
        },
      });
      form.reset();
      setStatus("success");
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong while sending your enquiry. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="grain rounded-t-[3rem] bg-ink px-6 py-32 text-ink-foreground md:rounded-t-[5rem] md:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2">
        <div>
          <Label>05 / CONTACT</Label>
          <h2 className="reveal text-6xl font-light leading-none md:text-8xl">
            Have a project <em className="text-sand">in mind?</em>
          </h2>
          <p className="reveal mt-8 max-w-md opacity-70">
            Let's build something thoughtful, creative, and effective for your business.
          </p>
          <a
            href="https://instagram.com/busthanashirin_"
            target="_blank"
            rel="noreferrer"
            className="reveal mt-10 inline-block font-serif text-2xl underline-offset-8 hover:underline"
          >
            Instagram — @busthanashirin_ ↗
          </a>
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal mt-5 block w-fit font-serif text-2xl underline-offset-8 hover:underline"
          >
            LinkedIn — Busthana Shirin ↗
          </a>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            ["name", "Your name"],
            ["email", "Email"],
            ["brand", "Company or brand"],
          ].map(([n, p]) => (
            <input
              key={n}
              aria-label={p}
              name={n}
              required={n !== "brand"}
              minLength={n === "name" ? 2 : undefined}
              maxLength={n === "name" ? 100 : n === "email" ? 254 : 150}
              type={n === "email" ? "email" : "text"}
              placeholder={p}
              disabled={status === "sending"}
              className="w-full border-b border-ink-foreground/25 bg-transparent py-4 outline-none transition placeholder:opacity-50 focus:border-sand disabled:opacity-50"
            />
          ))}
          <textarea
            aria-label="Project details"
            name="details"
            required
            minLength={5}
            maxLength={5000}
            rows={4}
            placeholder="Project details"
            disabled={status === "sending"}
            className="w-full border-b border-ink-foreground/25 bg-transparent py-4 outline-none placeholder:opacity-50 focus:border-sand disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={status === "sending"}
            className="group h-auto rounded-full bg-sand px-8 py-4 text-xs text-ink transition hover:bg-ink-foreground disabled:opacity-60"
          >
            {status === "sending" ? "SENDING…" : "SEND AN ENQUIRY"}{" "}
            {status !== "sending" && (
              <span className="inline-block transition group-hover:translate-x-1">↗</span>
            )}
          </Button>
          {status === "success" && (
            <p role="status" className="text-sm text-sand">
              Thank you! Your enquiry has been sent. I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-sm text-red-400">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
      <footer className="mx-auto mt-32 flex max-w-7xl flex-col justify-between gap-6 border-t border-ink-foreground/15 pt-10 text-sm md:flex-row">
        <div>
          <p className="font-serif text-2xl">BUSTHANA SHIRIN®</p>
          <p className="opacity-60">Digital Marketing Strategist | Calicut, India</p>
        </div>
        <p className="opacity-60">© {new Date().getFullYear()} Busthana Shirin</p>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </section>
  );
}

export function useScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let lenis: {
      raf: (t: number) => void;
      destroy: () => void;
      on: (e: string, f: () => void) => void;
      scrollTo: (t: string) => void;
    } | null = null;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let tick: ((t: number) => void) | null = null;
    import("lenis").then(({ default: Lenis }) => {
      if (reduce) return;
      lenis = new Lenis({ duration: 1.2 }) as unknown as typeof lenis;
      lenis?.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.querySelectorAll('a[href^="#"]').forEach((a) =>
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const target = a.getAttribute("href");
          if (target) lenis?.scrollTo(target);
        }),
      );
    });

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
        gsap.from(el, {
          y: 80,
          opacity: 0,
          rotateX: -60,
          transformPerspective: 900,
          transformOrigin: "50% 100%",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }),
      );
      document.querySelectorAll<HTMLElement>(".scrub-text").forEach((el) => {
        el.innerHTML = (el.textContent ?? "")
          .split(" ")
          .map((w) => `<span class="sw" style="opacity:.15">${w}</span>`)
          .join(" ");
        gsap.to(el.querySelectorAll(".sw"), {
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 40%", scrub: true },
        });
      });
      const track = document.querySelector<HTMLElement>(".work-track");
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 40),
          ease: "none",
          scrollTrigger: {
            trigger: ".work-pin",
            pin: true,
            scrub: 1,
            end: () => `+=${track.scrollWidth}`,
            invalidateOnRefresh: true,
          },
        });
      }
      gsap.utils.toArray<HTMLElement>("section:not(#home)").forEach((sec) =>
        gsap.from(sec, {
          rotateX: 12,
          scale: 0.94,
          transformPerspective: 1600,
          transformOrigin: "50% 0%",
          scrollTrigger: { trigger: sec, start: "top bottom", end: "top 40%", scrub: true },
        }),
      );
      gsap.utils.toArray<HTMLElement>(".tilt").forEach((el) => {
        const rx = gsap.quickTo(el, "rotateX", { duration: 0.5 });
        const ry = gsap.quickTo(el, "rotateY", { duration: 0.5 });
        gsap.set(el, { transformPerspective: 900 });
        el.addEventListener("mousemove", (e) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 18);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 18);
        });
        el.addEventListener("mouseleave", () => {
          rx(0);
          ry(0);
        });
      });
      gsap.from(".process-line", {
        scaleX: 0,
        scrollTrigger: { trigger: ".process-line", start: "top 80%", end: "top 40%", scrub: true },
      });
      gsap.to(".parallax-blob", {
        y: 300,
        x: 200,
        scrollTrigger: { trigger: ".parallax-blob", scrub: true },
      });
    });
    return () => {
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);
}
