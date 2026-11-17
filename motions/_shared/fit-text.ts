import { useLayoutEffect, useRef } from 'react';

/**
 * 번역 문구가 정해진 폭(디자인 px)보다 길면 글씨 크기를 비율대로 줄인다. 짧으면 원래 크기 그대로.
 * MotionStage의 scale과 상관없이 디자인 px 기준으로 잰다 (scrollWidth는 scale 영향을 받지 않음).
 */
export function useFitText<T extends HTMLElement>(text: string, size: number, maxWidth: number) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = `${size}px`;
      const w = el.scrollWidth;
      if (w > maxWidth) el.style.fontSize = `${Math.floor(((size * maxWidth) / w) * 10) / 10}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [text, size, maxWidth]);
  return ref;
}
