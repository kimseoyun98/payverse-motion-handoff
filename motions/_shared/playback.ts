import { useEffect, type RefObject } from 'react';

/**
 * 재생 방식 공통 props.
 * - loop: true = 무한 반복 / false = 한 번 재생하고 마지막 장면에서 멈춤.
 *   기본값은 컴포넌트마다 기존 영상과 같게 맞춰 둠 (README 표 참고).
 * - play: loop=false일 때만 씀. true가 될 때마다 처음부터 한 번 재생하고, false면 첫 장면에서 대기.
 *   기존 영상에 video.play()를 걸던 시점(예: 홈 카드가 앞으로 올라올 때)에 true로 넘기면 된다.
 *   생략하면 화면에 50% 이상 보일 때 자동으로 처음부터 재생하고, 벗어나면 첫 장면으로 돌아간다.
 */
export type PlaybackProps = { loop?: boolean; play?: boolean };

// 한 번 재생 모드: 컴포넌트 CSS의 infinite를 1회로 바꾸고, 끝난 뒤 마지막 장면을 유지한다.
if (typeof document !== 'undefined' && !document.getElementById('pv-motion-once')) {
  const s = document.createElement('style');
  s.id = 'pv-motion-once';
  s.textContent = '[data-motion-once] *{animation-iteration-count:1 !important;animation-fill-mode:both !important;}';
  document.head.appendChild(s);
}

/** 루트 요소에 `data-motion-once`를 붙인 뒤 이 훅을 쓴다. */
export function usePlayback(ref: RefObject<HTMLElement | null>, loop: boolean, play: boolean | undefined) {
  useEffect(() => {
    const el = ref.current;
    if (!el || loop) return;
    // 움직임 줄이기 설정이면 컴포넌트 CSS가 정한 정지 장면을 그대로 둔다.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const anims = () => el.getAnimations({ subtree: true });
    const start = () => anims().forEach((a) => { a.currentTime = 0; a.play(); });
    const reset = () => anims().forEach((a) => { a.pause(); a.currentTime = 0; });
    if (play !== undefined) {
      if (play) start(); else reset();
      return;
    }
    reset();
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : reset()), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, loop, play]);
}
