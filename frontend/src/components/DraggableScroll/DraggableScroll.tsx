import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import React from "react";

const DraggableScroll = ({
  onScrollChange,
  children,
}: {
  children: React.ReactNode;
  onScrollChange?: (e: boolean) => void;
}) => {
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animationFrame = useRef<number | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (animationFrame.current) {
      velocity.current = 0;
      cancelAnimationFrame(animationFrame.current);
    }
    hasDragged.current = false;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = carouselRef.current?.scrollLeft || 0;

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("mousemove", handleMouseMove);
    isDragging.current = false;
    simulateMomentumScroll();
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      !isDragging.current ||
      !carouselRef.current ||
      Math.abs(startX.current - e.pageX) < 2
    ) {
      return;
    }

    const now = Date.now();
    const dx = e.pageX - lastX.current;
    if (Math.abs(dx) > 1) {
      hasDragged.current = true;
    }
    const dt = now - lastTime.current || 1;

    velocity.current = dx / dt;

    const walk = e.pageX - startX.current;
    carouselRef.current.scrollLeft = scrollLeft.current - walk;

    lastX.current = e.pageX;
    lastTime.current = now;
  };

  const simulateMomentumScroll = () => {
    if (!carouselRef.current) {
      return;
    }

    let currentVelocity = velocity.current * 1000; // pixel/sec
    const decay = 0.95;

    const step = () => {
      if (!carouselRef.current || Math.abs(currentVelocity) < 0.5) {
        if (animationFrame.current) {
          velocity.current = 0; // Reset velocity when stopping
          cancelAnimationFrame(animationFrame.current);

        }
        return;
      }

      carouselRef.current.scrollLeft -= currentVelocity * 0.016; // ~60fps frame
      currentVelocity *= decay;
      animationFrame.current = requestAnimationFrame(step);
    };

    step();
  };

  useEffect(() => {
    if (carouselRef.current && secondaryRef.current && onScrollChange) {
      const container = carouselRef.current.getBoundingClientRect();
      const content = secondaryRef.current.getBoundingClientRect();
      if (content.width > container.width) {
        onScrollChange(true);
      } else {
        onScrollChange(false);
      }
    }
  }, [children]);

  return (
    <div
      onMouseDown={handleMouseDown}
      ref={carouselRef}
      className="no-select custom-scrollbar mt-5 flex max-w-full items-center justify-start overflow-x-auto overflow-y-visible py-5"
      onClickCapture={(e) => {
        if (hasDragged.current) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      <motion.div ref={secondaryRef} className="flex gap-4">
        {children}
      </motion.div>
    </div>
  );
};

export default DraggableScroll;
