import React, { forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Ripple } from "@/components/magicui/ripples";
import {
  Twitter,
  Youtube,
  Instagram,
  Hash,
  Rss,
  Mic,
  TrendingUp
} from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex h-[300px] pb-[10rem] lg:w-[100vh] md:w-[50vh] xs:w-[30vh] items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      <div className="flex size-full max-h-[200px] max-w-lg flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle className="Circ" ref={div1Ref}>
            <Twitter className="Ic" />
          </Circle>
          <Circle className="Circ" ref={div5Ref}>
            <Youtube className="Ic" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle className="Circ" ref={div2Ref}>
            <Instagram className="Ic" />
          </Circle>
          <Circle className="Circ size-16" ref={div4Ref}>
            <TrendingUp className="Ic" />
            <Ripple className="absolute lg:bottom-[60px] md:bottom-[60px] sm:bottom-[60px] xs:bottom-[60px] xss:bottom-[60px] inset-0" />
          </Circle>
          <Circle className="Circ" ref={div6Ref}>
            <Hash className="Ic" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle className="Circ" ref={div3Ref}>
            <Rss className="Ic" />
          </Circle>
          <Circle className="Circ" ref={div7Ref}>
            <Mic className="Ic" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
    </div>
  );
}
