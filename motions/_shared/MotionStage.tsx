import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { usePlayback, type PlaybackProps } from './playback';

/**
 * Figma 디자인 크기(px) 그대로 만든 모션을 부모 폭에 맞춰 비율 그대로 늘리고 줄인다.
 * 안쪽은 항상 디자인 크기로 그려지고 scale만 바뀌므로, Figma px 값을 손대지 않아도 된다.
 */
export default function MotionStage({ width, height, className, label, loop = true, play, children }: PlaybackProps & {
  width: number;
  height: number;
  className?: string;
  /** 스크린리더용 설명. 장식이면 생략 → 숨김 처리 */
  label?: string;
  children: ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const o = outer.current, i = inner.current;
    if (!o || !i) return;
    const fit = () => { i.style.scale = String(o.clientWidth / width); };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(o);
    return () => ro.disconnect();
  }, [width]);
  usePlayback(outer, loop, play);
  return (
    <div
      ref={outer}
      className={className}
      data-motion-once={loop ? undefined : ''}
      style={{ position: 'relative', width: '100%', aspectRatio: `${width} / ${height}`, overflow: 'hidden' }}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      <div ref={inner} style={{ position: 'absolute', left: 0, top: 0, width, height, transformOrigin: '0 0' }}>
        {children}
      </div>
    </div>
  );
}
