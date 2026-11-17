import type { CSSProperties } from 'react';
import MotionStage from '../_shared/MotionStage';
import type { PlaybackProps } from '../_shared/playback';
import './payment-logo-marquee.css';
import sprite from './assets/logo-sprite.svg';

/**
 * PG 서비스 Feature · 결제사 로고 마퀴 (Figma 7835:71930) — feature-section-1.mp4 대체.
 * 로고 타일 5줄이 홀수 줄은 왼쪽, 짝수 줄은 오른쪽으로 10초에 712px(타일 4개 폭) 흐르고 끊김 없이 반복된다.
 * Figma는 타일마다 위치를 되감는 방식이지만, 화면상 결과가 같도록 줄 단위(타일 4개 × 2벌)로 흘린다.
 * 로고는 Figma 로고 컴포넌트 20개를 한 장으로 모은 SVG 스프라이트(4열 × 5행, 칸 95×60).
 * 글자 없음 → 언어 공통.
 */
const ROWS: { top: number; dir: 'left' | 'right' }[] = [
  { top: 47, dir: 'left' }, // PayPal · Google Pay · Apple Pay · Alipay
  { top: 116.5, dir: 'right' }, // WeChat Pay · toss pay · kakao · NAVER
  { top: 186.5, dir: 'left' }, // Samsung Wallet · PAYCO · L.pay · SSG PAY
  { top: 256.5, dir: 'right' }, // PayEasy · Konbini · MPay · ZaloPay
  { top: 326.5, dir: 'left' }, // DANA · ShopeePay · GCash · PayNow
];

function Tile({ index }: { index: number }) {
  const style = { '--col': index % 4, '--row': Math.floor(index / 4), backgroundImage: `url("${sprite}")` } as CSSProperties;
  return (
    <div className="flex h-[62px] w-[170px] shrink-0 items-center justify-center rounded-[4px] border border-solid border-[rgba(0,0,0,0.05)] bg-white drop-shadow-[0px_0px_6px_rgba(0,0,0,0.04)]">
      <div className="pv-marquee__logo h-[60px] w-[95px]" style={style} />
    </div>
  );
}

export default function PaymentLogoMarquee({ className, loop = true, play }: { className?: string } & PlaybackProps) {
  return (
    <MotionStage width={435} height={435} className={className} loop={loop} play={play}>
      <div className="pv-marquee relative size-[435px] overflow-clip rounded-[24px] bg-[var(--seed-color-bg-brand-solid,#217cf9)]">
        {ROWS.map((r, ri) => (
          <div key={ri} className={`pv-marquee__track pv-marquee__track--${r.dir} absolute left-0 flex gap-[8px]`} style={{ top: r.top }}>
            {[0, 1].map((copy) => [0, 1, 2, 3].map((i) => <Tile key={`${copy}-${i}`} index={ri * 4 + i} />))}
          </div>
        ))}
      </div>
    </MotionStage>
  );
}
