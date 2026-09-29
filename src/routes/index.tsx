import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import frontQuarter from "@/assets/front-quarter-studio.jpg";
import side from "@/assets/side-studio.jpg";
import front from "@/assets/front-studio.jpg";
import leftSide from "@/assets/left-side-studio.jpg";
import rearQuarter from "@/assets/rear-quarter-studio.jpg";
import rear from "@/assets/rear-studio.jpg";

const photos = [
  { src: frontQuarter, label: "Front three-quarter", number: "01" },
  { src: side, label: "Right profile", number: "02" },
  { src: front, label: "Front view", number: "03" },
  { src: leftSide, label: "Left profile", number: "04" },
  { src: rearQuarter, label: "Rear three-quarter", number: "05" },
  { src: rear, label: "Rear view", number: "06" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hyundai i20 | Studio Gallery" },
      { name: "description", content: "Explore studio-style photographs of a silver Hyundai i20 from every exterior angle, including front and rear views." },
      { property: "og:title", content: "Hyundai i20 | Studio Gallery" },
      { property: "og:description", content: "A studio-style exterior gallery of the silver Hyundai i20, from front to rear." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const current = photos[active] ?? photos[0];
  if (!current) return null;

  const move = (direction: number) => setActive((index) => (index + direction + photos.length) % photos.length);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [expanded]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10 md:py-6">
          <div className="flex items-center gap-3">
            <img src="/favicon.png" alt="Studio Shine Logo" className="h-8 w-8 object-contain" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em]">The studio collection</span>
          </div>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Exterior / 06 frames</span>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-8 md:px-10 md:pt-12">
        <div className="mb-7 flex flex-col justify-between gap-4 md:mb-9 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-primary">Hyundai / i20</p>
            <h1 className="font-display text-5xl font-normal leading-none md:text-7xl">The i20, in focus.</h1>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Every angle of the silver Hyundai i20, photographed in a refined studio setting.</p>
        </div>

        <section aria-label="Selected car photograph" className="relative overflow-hidden bg-secondary">
          <img src={current.src} alt={`Silver Hyundai i20 in a gold-wall studio, ${current.label.toLowerCase()}${current.label.includes("Front") || current.label.includes("Rear") ? ", with dealer number plate visible" : ""}`} className="block aspect-[4/3] w-full object-cover md:aspect-[16/9]" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-image-overlay px-4 pb-4 pt-16 text-image-foreground md:px-7 md:pb-6">
            <div>
              <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.22em] opacity-75">Frame {current.number} / 06</p>
              <h2 className="font-display text-2xl md:text-3xl">{current.label}</h2>
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="image" size="icon" onClick={() => move(-1)} aria-label="Previous image" title="Previous image"><ArrowLeft /></Button>
              <Button variant="image" size="icon" onClick={() => move(1)} aria-label="Next image" title="Next image"><ArrowRight /></Button>
              <Button variant="image" size="icon" onClick={() => setExpanded(true)} aria-label="Expand image" title="Expand image"><Expand /></Button>
            </div>
          </div>
        </section>

        <div className="mt-3 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3" aria-label="Choose a view">
          {photos.map((photo, index) => (
            <Button key={photo.number} variant="thumbnail" aria-label={`Show ${photo.label}`} aria-pressed={active === index} onClick={() => setActive(index)} className={active === index ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}>
              <img src={photo.src} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <span className="absolute bottom-2 left-2 bg-thumbnail-label px-1.5 py-1 text-[10px] font-medium tracking-[0.12em] text-thumbnail-label-foreground">{photo.number}</span>
            </Button>
          ))}
        </div>

        <section aria-labelledby="all-angles" className="mt-16 md:mt-24">
          <div className="mb-6 flex items-end justify-between border-b border-border pb-5">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-primary">The complete set</p>
              <h2 id="all-angles" className="font-display text-3xl md:text-4xl">All angles</h2>
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">01 — 06</span>
          </div>
          <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo, index) => (
              <div key={photo.number}>
                <Button variant="gallery" onClick={() => { setActive(index); setExpanded(true); }} aria-label={`Expand ${photo.label}`} className="group w-full">
                  <img src={photo.src} alt={`Silver Hyundai i20, ${photo.label.toLowerCase()} in gold-wall studio`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                  <span className="absolute bottom-3 right-3 bg-thumbnail-label p-2 text-thumbnail-label-foreground opacity-0 transition-opacity group-hover:opacity-100"><Expand className="size-4" /></span>
                </Button>
                <div className="mt-3 flex justify-between text-sm"><span>{photo.label}</span><span className="text-muted-foreground">{photo.number} / 06</span></div>
              </div>
            ))}
          </div>
        </section>
        <footer className="mt-20 border-t border-border pt-6 text-xs text-muted-foreground">Hyundai i20 · Studio gallery</footer>
      </div>

      {expanded && (
        <div role="dialog" aria-modal="true" aria-label={`${current.label} enlarged`} className="fixed inset-0 z-50 flex flex-col bg-dialog text-dialog-foreground">
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <span className="text-xs uppercase tracking-[0.16em]">{current.label} <span className="ml-3 opacity-60">{current.number} / 06</span></span>
            <div className="flex gap-1">
              <Button variant="dialog" size="icon" asChild title="Download image"><a href={current.src} download={`hyundai-i20-${current.label.toLowerCase().replaceAll(" ", "-")}.jpg`} aria-label="Download image"><ArrowDownToLine /></a></Button>
              <Button variant="dialog" size="icon" onClick={() => setExpanded(false)} aria-label="Close image" title="Close image"><X /></Button>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center px-2 pb-2 md:px-10 md:pb-6">
            <img src={current.src} alt={`Silver Hyundai i20, ${current.label.toLowerCase()}`} className="max-h-full max-w-full object-contain" />
          </div>
          <div className="flex justify-center gap-3 pb-4">
            <Button variant="dialog" size="icon" onClick={() => move(-1)} aria-label="Previous image"><ArrowLeft /></Button>
            <Button variant="dialog" size="icon" onClick={() => move(1)} aria-label="Next image"><ArrowRight /></Button>
          </div>
        </div>
      )}
    </main>
  );
}