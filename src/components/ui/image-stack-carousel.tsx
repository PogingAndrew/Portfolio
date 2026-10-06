"use client";

import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import React, { useState } from "react";

// Your images live here. Swap these out or pass your own via the `cards` prop.
const defaultCards: SwipeCardItem[] = [
  {
    id: 1,
    img: "https://cdn.21st.dev/assets/mirror/c4/c4897a1bec4558fde4b955e1c5502b8edbc6b7c16e95e9aa55088de17fa9a843.jpg",
  },
  {
    id: 2,
    img: "https://cdn.21st.dev/assets/mirror/c5/c59885ef893eb494af268a9817f69d74df81b808c32b42a95d409c0d9fc8fa5e.jpg",
  },
  {
    id: 3,
    img: "https://cdn.21st.dev/assets/mirror/d0/d0d42b2410bfa5189ed7477a10651e1131e236c064cf7d0401858a6f32686d55.jpg",
  },
  {
    id: 4,
    img: "https://cdn.21st.dev/assets/mirror/c7/c74a36fb6d8aa8555994f7864cef5cafd63dacaf51f0c7b56cb92c4a7a6841eb.jpg",
  },
  {
    id: 5,
    img: "https://cdn.21st.dev/assets/mirror/65/65886795affef649de28e939dc146c40c4eae14c9d08b069fa203188278a8f44.jpg",
  },
];

// Change how the stack looks and feels here — no need to touch the logic below.
const defaultSettings = {
  width: 320, // card width in px (this is the desktop/base size)
  height: 320, // card height in px (this is the desktop/base size)
  radius: 16, // corner roundness in px
  swipeThreshold: 120, // how far someone has to drag before the card flies off
  stackRotation: 5, // degrees each card behind the front one tilts
  stackScale: 0.035, // how much smaller each card behind the front one gets
  tiltStrength: 25, // how far the card tilts while dragging (3D effect)
  springStiffness: 300, // how snappy the drag/return animation feels
  springDamping: 30, // how quickly the bounce settles
  // Below this viewport width, cards shrink by mobileScale. Tweak either value
  // to control how small (or whether) the stack shrinks on phones.
  mobileBreakpoint: 480,
  mobileScale: 0.8,
  // Cards deeper in the pile than this fade out, so a long list doesn't spray
  // a fan of edges behind the front card.
  maxVisible: 99,
  // "contain" shows the whole picture (certificates, badges) on a white card
  // instead of cropping it to fill.
  fit: "cover" as "cover" | "contain",
};

export type SwipeCardsSettings = typeof defaultSettings;

export interface SwipeCardItem {
  id: number | string;
  img: string;
  alt?: string;
}

/** Imperative controls, so buttons and lists outside the stack can drive it. */
export interface SwipeCardsHandle {
  next: () => void;
  prev: () => void;
  goTo: (id: number | string) => void;
}

interface SwipeCardProps {
  children: React.ReactNode;
  isFront: boolean;
  zIndex: number;
  onSendToBack: () => void;
  settings: SwipeCardsSettings;
}

function SwipeCard({
  children,
  isFront,
  zIndex,
  onSendToBack,
  settings,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // These turn your drag distance into a 3D tilt. Bigger tiltStrength = more dramatic tilt.
  const rotateX = useTransform(
    y,
    [-200, 200],
    [settings.tiltStrength, -settings.tiltStrength],
  );
  const rotateY = useTransform(
    x,
    [-200, 200],
    [-settings.tiltStrength, settings.tiltStrength],
  );

  function handleDragEnd(
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    const draggedFarEnough =
      Math.abs(info.offset.x) > settings.swipeThreshold ||
      Math.abs(info.offset.y) > settings.swipeThreshold;

    if (draggedFarEnough) {
      onSendToBack();
    } else {
      // Didn't drag far enough — snap back to center.
      x.set(0);
      y.set(0);
    }
  }

  return (
    <motion.div
      className="absolute cursor-grab select-none active:cursor-grabbing"
      style={{
        width: settings.width,
        height: settings.height,
        x: isFront ? x : 0,
        y: isFront ? y : 0,
        rotateX: isFront ? rotateX : 0,
        rotateY: isFront ? rotateY : 0,
        zIndex,
      }}
      drag={isFront}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.5}
      onDragEnd={handleDragEnd}
      whileHover={isFront ? { scale: 1.03 } : {}}
      transition={{
        type: "spring",
        stiffness: settings.springStiffness,
        damping: settings.springDamping,
      }}
    >
      {children}
    </motion.div>
  );
}

interface SwipeCardsProps {
  cards?: SwipeCardItem[];
  // Override any of the defaults above without touching this file again.
  settings?: Partial<SwipeCardsSettings>;
  className?: string;
  /** Called with the id of the card at the front, on mount and after every change. */
  onChange?: (id: number | string) => void;
}

// Shrinks the stack a bit on small screens so it doesn't feel oversized on mobile.
// Returns 1 on the server / before mount to avoid a layout jump on first paint.
function useResponsiveScale(breakpoint: number, mobileScale: number) {
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setScale(mq.matches ? mobileScale : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint, mobileScale]);

  return scale;
}

export const SwipeCards = React.forwardRef<SwipeCardsHandle, SwipeCardsProps>(
  function SwipeCards(
    { cards = defaultCards, settings, className = "", onChange },
    ref,
  ) {
    const baseConfig = { ...defaultSettings, ...settings };
    const scale = useResponsiveScale(
      baseConfig.mobileBreakpoint,
      baseConfig.mobileScale,
    );
    const config = {
      ...baseConfig,
      width: Math.round(baseConfig.width * scale),
      height: Math.round(baseConfig.height * scale),
    };
    const [cardList, setCardList] = useState(cards);

    // Sends the front card to the back of the pile after a swipe.
    const moveToBack = (id: number | string) => {
      setCardList((prev) => {
        const updated = [...prev];
        const cardIndex = updated.findIndex((card) => card.id === id);
        if (cardIndex !== -1) {
          const [movedCard] = updated.splice(cardIndex, 1);
          updated.push(movedCard);
        }
        return updated;
      });
    };

    React.useImperativeHandle(
      ref,
      () => ({
        next: () =>
          setCardList((prev) =>
            prev.length > 1 ? [...prev.slice(1), prev[0]] : prev,
          ),
        prev: () =>
          setCardList((prev) =>
            prev.length > 1
              ? [prev[prev.length - 1], ...prev.slice(0, -1)]
              : prev,
          ),
        goTo: (id) =>
          setCardList((prev) => {
            const i = prev.findIndex((card) => card.id === id);
            return i <= 0 ? prev : [...prev.slice(i), ...prev.slice(0, i)];
          }),
      }),
      [],
    );

    const frontId = cardList[0]?.id;
    const onChangeRef = React.useRef(onChange);
    onChangeRef.current = onChange;
    React.useEffect(() => {
      if (frontId !== undefined) onChangeRef.current?.(frontId);
    }, [frontId]);

    return (
      <div
        className={`flex items-center justify-center p-6 select-none ${className}`}
      >
        <div
          className="relative mx-auto"
          style={{
            width: config.width,
            height: config.height,
            perspective: 1200,
          }}
        >
          {cardList.map((card, index) => {
            const isFront = index === 0;
            const zIndex = cardList.length - index;

            return (
              <SwipeCard
                key={card.id}
                isFront={isFront}
                zIndex={zIndex}
                settings={config}
                onSendToBack={() => moveToBack(card.id)}
              >
                <motion.div
                  className="relative h-full w-full overflow-hidden bg-neutral-900 shadow-xl"
                  style={{
                    borderRadius: config.radius,
                    background: config.fit === "contain" ? "#fff" : undefined,
                  }}
                  animate={{
                    rotateZ: index * config.stackRotation,
                    scale: 1 - index * config.stackScale,
                    opacity: index < config.maxVisible ? 1 : 0,
                    transformOrigin: "85% 85%",
                  }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                >
                  {/* Plain <img>: this project is Vite, not Next, so next/image isn't available. */}
                  <img
                    src={card.img}
                    alt={card.alt ?? `card-${card.id}`}
                    draggable={false}
                    loading={isFront ? "eager" : "lazy"}
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    style={{ objectFit: config.fit }}
                  />
                </motion.div>
              </SwipeCard>
            );
          })}
        </div>
      </div>
    );
  },
);

export default SwipeCards;
