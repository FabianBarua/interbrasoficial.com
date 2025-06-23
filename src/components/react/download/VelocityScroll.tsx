import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/shared/tailwind";

interface VelocityScrollProps {
  text: string;
  defaultVelocity?: number;
  className?: string;
}

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  className?: string;
}

export const wrap = (min: number, max: number, v: number): number => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function VelocityScroll({
  text,
  defaultVelocity = 5,
  className,
}: VelocityScrollProps): any {
  function ParallaxText({
    children,
    baseVelocity = 100,
    className,
  }: ParallaxProps): any {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: 50,
      stiffness: 400,
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
      clamp: false,
    });

    const [repetitions, setRepetitions] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      const calculateRepetitions = (): void => {
        if (containerRef.current != null && textRef.current != null) {
          const containerWidth = containerRef.current.offsetWidth;
          const textWidth = textRef.current.offsetWidth;
          const newRepetitions = Math.ceil(containerWidth / textWidth) + 2;
          setRepetitions(newRepetitions);
        }
      };

      calculateRepetitions();

      window.addEventListener("resize", calculateRepetitions);
      return () => window.removeEventListener("resize", calculateRepetitions);
    }, [children]);

    const x = useTransform(baseX, (v) => `${wrap(-100 / repetitions, 0, v)}%`);

    const directionFactor = React.useRef<number>(1);
    useAnimationFrame((_, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();

      baseX.set(baseX.get() + moveBy);
    });

    return (
      <div
        className="w-full overflow-hidden py-1 whitespace-nowrap"
        ref={containerRef}
      >
        <motion.div className={cn("inline-block", className)} style={{ x }}>
          {Array.from({ length: repetitions }).map((_, i) => (
            <span key={i} ref={i === 0 ? textRef : null}>
              {children}{" "}
            </span>
          ))}
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <section className="relative doublemask w-full flex flex-col gap-2">
        <ParallaxText baseVelocity={defaultVelocity} className={className}>
          {text}
        </ParallaxText>
        <ParallaxText baseVelocity={-defaultVelocity} className={className}>
          {text}
        </ParallaxText>
      </section>

      <div className="flex rotate-180 justify-center items-center absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 size-20 bg-interbrasGreen-500 rounded-[2rem] shadow-custom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Bold"
          viewBox="0 0 24 24"
          className="size-12 animate-jumpinfinite"
          fill="#fff"
        >
          <path d="M18.061,9.525,14.475,5.939a3.585,3.585,0,0,0-4.95,0L5.939,9.525a1.5,1.5,0,0,0,2.122,2.121L10.5,9.207V19a1.5,1.5,0,0,0,3,0V9.207l2.439,2.439a1.5,1.5,0,0,0,2.122-2.121Z" />
        </svg>
      </div>
    </>
  );
}
