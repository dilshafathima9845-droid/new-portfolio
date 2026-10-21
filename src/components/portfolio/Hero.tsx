import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import portraitAsset from "@/assets/busthana-real-portrait.asset.json";
// 👉 add your second Busthana image (same .asset.json format) and uncomment both lines below
// import portraitAsset2 from "@/assets/busthana-portrait-2.asset.json";

/** Images shown one after another. Add as many as you like. */
const portraits: string[] = [
  portraitAsset.url,
  // portraitAsset2.url,
];

/** true only if the images are transparent PNG cutouts (head/arms may overflow the card) */
const PORTRAIT_IS_CUTOUT = false;

/**
 * Timeline of ONE slide (milliseconds)
 *   0       image flies in to the CENTER
 *   THOUGHT thought bubble pops above her
 *   SIDE    image glides to the LEFT, thought becomes the headline on the right
 *   NEXT    image leaves, next image comes to the center
 */
const THOUGHT_AT = 1700;
const SIDE_AT = 3800;
const NEXT_AT = 10500;

const thoughts = [
  { pre: "I am a", word: "Digital Marketer", big: "MARKETER", bg: "#d9ddd3", stage: "#8f9a86" },
  { pre: "I am a", word: "Creative Thinker", big: "CREATIVE", bg: "#f6d9b4", stage: "#e07b1a" },
  { pre: "I am an", word: "SEO Strategist", big: "SEO", bg: "#cfe7e0", stage: "#2f9e8f" },
  { pre: "I am a", word: "Brand Storyteller", big: "STORY", bg: "#e6d3e8", stage: "#9a5fa8" },
  { pre: "I am a", word: "Growth Builder", big: "GROWTH", bg: "#dfe3b8", stage: "#7d8a3a" },
];

const bubbles = ["SEO", "Meta Ads", "Google Ads", "Branding", "Content", "Reels"];

const EASE = [0.22, 1, 0.36, 1] as const;

type Phase = "center" | "thought" | "side";

function useIsDesktop() {
  const [d, setD] = useState(true);
  useEffect(() => {
    const m = window.matchMedia("(min-width: 768px)");
    const f = () => setD(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);
  return d;
}

export function Hero() {
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<Phase>("center");
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 15 });
  const sy = useSpring(my, { stiffness: 60, damping: 15 });

  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 800], [0, -90]);
  const textY = useTransform(scrollY, [0, 800], [0, 160]);
  const nameX = useTransform(sx, [-1, 1], [-30, 30]);
  const tiltX = useTransform(sy, [-1, 1], [6, -6]);
  const tiltY = useTransform(sx, [-1, 1], [-8, 8]);
  const wordX = useTransform(sx, [-1, 1], [16, -16]);

  // run the choreography: center -> thought -> side -> next slide
  useEffect(() => {
    if (reducedMotion) return;
    const a = setTimeout(() => setPhase("thought"), THOUGHT_AT);
    const b = setTimeout(() => setPhase("side"), SIDE_AT);
    const c = setTimeout(() => {
      setI((v) => (v + 1) % thoughts.length);
      setPhase("center"); // same batch as setI so the new image always starts in the center
    }, NEXT_AT);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
      clearTimeout(c);
    };
  }, [i, reducedMotion]);

  const t = thoughts[i] ?? thoughts[0];
  if (!t) return null;

  const img = portraits[i % portraits.length] ?? portraits[0];
  const p: Phase = reducedMotion ? "side" : phase;
  const side = p === "side";
  const letters = t.big.split("");

  // where the portrait sits in each phase
  const pos = side
    ? isDesktop
      ? { left: "2%", x: "0%", y: 0, scale: 1 }
      : { left: "50%", x: "-50%", y: 0, scale: 0.82 }
    : { left: "50%", x: "-50%", y: 0, scale: 1 };

  return (
    <motion.section
      id="home"
      animate={{ backgroundColor: t.bg }}
      transition={{ duration: 1.1, ease: "easeInOut" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      className="relative overflow-hidden grid-lines pb-20 pt-28"
    >
      {/* giant outline name at the bottom */}
      <motion.h1
        aria-hidden
        style={{ y: textY, x: nameX }}
        className="pointer-events-none absolute left-0 right-0 top-[62%] select-none whitespace-nowrap text-center font-serif text-8xl font-light leading-none text-outline opacity-30 md:text-[180px]"
      >
        BUSTHANA
      </motion.h1>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:h-[680px] md:px-10">
        {/* ───────────── STAGE: giant word + portrait ───────────── */}
        <motion.div
          style={{ y: imgY }}
          className="relative h-[480px] md:absolute md:inset-x-10 md:inset-y-0 md:h-auto"
        >
          {/* giant word behind the portrait – drifts left together with her */}
          <motion.div
            aria-hidden
            style={{ x: wordX }}
            className="pointer-events-none absolute inset-x-0 top-[6%] z-[1] flex justify-center"
          >
            <motion.div
              animate={{
                x: side && isDesktop ? "-26%" : "0%",
                scale: side ? (isDesktop ? 0.7 : 0.8) : 1,
                opacity: side ? 0.55 : 1,
              }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.big}
                  className="flex font-sans font-black leading-[0.85] tracking-tight"
                  style={{
                    fontSize:
                      t.big.length > 6 ? "clamp(4rem, 12vw, 9rem)" : "clamp(6rem, 17vw, 14rem)",
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(255,255,255,0.95) 5%, rgba(255,255,255,0) 90%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {letters.map((ch, k) => (
                    <motion.span
                      key={`${t.big}-${k}`}
                      initial={
                        reducedMotion ? false : { y: "60%", opacity: 0, filter: "blur(10px)" }
                      }
                      animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                      exit={
                        reducedMotion
                          ? { opacity: 0 }
                          : { y: "-40%", opacity: 0, filter: "blur(10px)" }
                      }
                      transition={{
                        duration: 0.7,
                        delay: reducedMotion ? 0 : 0.5 + k * 0.045,
                        ease: EASE,
                      }}
                      className="inline-block"
                    >
                      {ch}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* portrait: flies to center, then glides to the left */}
          <AnimatePresence initial={!reducedMotion}>
            <motion.div
              key={i}
              data-portrait-frame={i}
              className="absolute bottom-0 z-[2] aspect-[7/9] w-[min(78vw,400px)] md:w-[min(34vw,430px)]"
              initial={
                reducedMotion ? false : { left: "50%", x: "170%", y: 0, scale: 0.75, opacity: 0 }
              }
              animate={{ ...pos, opacity: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { x: "-170%", opacity: 0, scale: 0.9 }}
              transition={{ duration: side ? 1.2 : 1.4, ease: EASE }}
            >
              {/* pop + mouse tilt */}
              <motion.div
                style={{
                  rotateX: tiltX,
                  rotateY: tiltY,
                  transformPerspective: 1400,
                  transformStyle: "preserve-3d",
                }}
                className="relative h-full w-full"
              >
                <motion.div
                  initial={reducedMotion ? false : { scale: 0.85, rotateZ: 8 }}
                  animate={{ scale: [0.85, 1.1, 1], rotateZ: [8, -3, 0] }}
                  transition={{ duration: 1.5, ease: EASE, times: [0, 0.5, 1] }}
                  className="relative h-full w-full"
                >
                  {/* coloured card behind her */}
                  <motion.div
                    animate={{ backgroundColor: t.stage }}
                    transition={{ duration: 1.1, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-t-[40%] shadow-2xl"
                  />
                  <div
                    className={
                      "absolute inset-0 " +
                      (PORTRAIT_IS_CUTOUT
                        ? "overflow-visible"
                        : "overflow-hidden rounded-t-[40%] border border-white/30")
                    }
                  >
                    {/* idle movement: keeps swaying while she is on screen */}
                    <motion.img
                      src={img}
                      alt="Busthana Shirin, digital marketing strategist"
                      width={819}
                      height={768}
                      animate={
                        reducedMotion
                          ? {}
                          : {
                              rotate: [0, -2.5, 2.5, 0],
                              y: [0, -12, 0, -6, 0],
                              scale: [1, 1.05, 1.02, 1.05, 1],
                            }
                      }
                      transition={{
                        delay: 1.5,
                        duration: 4.4,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                      className={
                        "absolute bottom-0 w-full " +
                        (PORTRAIT_IS_CUTOUT
                          ? "h-[118%] object-contain object-bottom drop-shadow-2xl"
                          : "h-full object-cover object-center")
                      }
                    />
                  </div>

                  {/* THOUGHT bubble – pops while she is in the center */}
                  <AnimatePresence>
                    {p === "thought" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.3, y: 20, rotate: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.6, y: -10 }}
                        transition={{ type: "spring", stiffness: 220, damping: 16 }}
                        className="absolute -right-[18%] -top-[6%] z-30 origin-bottom-left"
                      >
                        <span className="absolute -bottom-4 left-3 h-3.5 w-3.5 rounded-full border border-border bg-card/95" />
                        <span className="absolute -bottom-7 left-0 h-2 w-2 rounded-full border border-border bg-card/95" />
                        <div className="rounded-3xl border border-border bg-card/95 px-5 py-4 text-card-foreground shadow-xl backdrop-blur">
                          <span className="block text-xs text-muted-foreground">{t.pre}</span>
                          <span className="mt-1 block whitespace-nowrap font-serif text-xl italic md:text-2xl">
                            {t.word} 💭
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* floating skill chips */}
                  {bubbles.map((b, k) => (
                    <motion.span
                      key={b}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1, y: reducedMotion ? 0 : [0, -12, 0] }}
                      transition={{
                        delay: 1.6 + k * 0.15,
                        y: {
                          repeat: reducedMotion ? 0 : Infinity,
                          duration: 3 + k * 0.4,
                          ease: "easeInOut",
                        },
                      }}
                      className="absolute z-20 hidden rounded-full border border-border bg-card/80 px-4 py-2 text-xs tracking-widest backdrop-blur md:block"
                      style={{
                        top: `${14 + (k % 3) * 26}%`,
                        [k % 2 ? "right" : "left"]: `-${8 + ((k * 5) % 12)}%`,
                      }}
                    >
                      💭 {b}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ───────────── RIGHT: the thought becomes the headline ───────────── */}
        <div className="relative z-20 flex flex-col justify-center pt-6 md:absolute md:bottom-0 md:right-10 md:top-0 md:w-[46%] md:pt-0">
          <AnimatePresence>
            {side && (
              <motion.div
                key={i}
                initial="hidden"
                animate="show"
                exit="gone"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
                  gone: { opacity: 0, x: 40, transition: { duration: 0.5 } },
                }}
              >
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="mb-5 text-xs tracking-[0.3em] text-muted-foreground"
                >
                  DIGITAL MARKETING STRATEGIST · CALICUT, INDIA
                </motion.p>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="font-serif text-3xl font-light md:text-4xl"
                >
                  Hello, I'm Busthana Shirin —
                </motion.p>
                <div className="mt-3" style={{ perspective: 800 }}>
                  <motion.p
                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                    className="font-serif text-4xl font-light text-muted-foreground md:text-5xl"
                  >
                    {t.pre}
                  </motion.p>
                  <motion.p
                    variants={{
                      hidden: { rotateX: -90, opacity: 0, y: 30, filter: "blur(8px)" },
                      show: {
                        rotateX: 0,
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.7, ease: EASE },
                      },
                    }}
                    className="origin-bottom font-serif text-4xl italic leading-tight text-primary md:text-6xl"
                  >
                    {t.word}.
                  </motion.p>
                </div>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="mt-6 max-w-md leading-relaxed text-muted-foreground"
                >
                  Turning creative ideas into digital growth — through SEO, performance marketing,
                  social media and branding that help businesses grow.
                </motion.p>
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  <a
                    href="#work"
                    className="group rounded-full bg-ink px-7 py-4 text-xs tracking-[0.2em] text-ink-foreground transition hover:bg-primary"
                  >
                    EXPLORE MY WORK{" "}
                    <span className="inline-block transition group-hover:translate-x-1">→</span>
                  </a>
                  <a
                    href="#contact"
                    className="group rounded-full border border-foreground/30 px-7 py-4 text-xs tracking-[0.2em] transition hover:bg-foreground hover:text-background"
                  >
                    LET'S CONNECT{" "}
                    <span className="inline-block transition group-hover:-translate-y-1 group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-xs tracking-[0.3em] text-muted-foreground"
      >
        SCROLL ↓
      </motion.div>
    </motion.section>
  );
}
