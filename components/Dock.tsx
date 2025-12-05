'use client';

import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import './Dock.css';

interface DockItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  spring?: Parameters<typeof useSpring>[1];
  distance: number;
  magnification: number;
  baseItemSize: number;
}

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }: DockItemProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val: number) => {
    const rect: { x: number; width: number } = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring ?? { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => cloneElement(child as React.ReactElement, { isHovered }))}
    </motion.div>
  );
}

interface DockLabelProps {
  children: React.ReactNode;
  className?: string;
  isHovered?: ReturnType<typeof useMotionValue>;
}

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const hoverValue = isHovered ?? useMotionValue(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = hoverValue.on('change', (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [hoverValue]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export interface DockItemConfig {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

interface DockProps {
  items: DockItemConfig[];
  className?: string;
  spring?: Parameters<typeof useSpring>[1];
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  dockHeight?: number;
  baseItemSize?: number;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50,
}: DockProps) {
  const mouseX = useMotionValue<number>(Infinity);

  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification, dockHeight]);

  return (
    <motion.div style={{ height: maxHeight, scrollbarWidth: 'none' }} className="dock-outer">
      <motion.div
        onMouseMove={({ pageX }) => {
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Dock social"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
