import type { CSSProperties } from 'react';
import MotionStage from '../_shared/MotionStage';
import '../_shared/figma-motion.css';
import './card-multilang-pay.css';
import payverseLogo from './assets/payverse-logo.png';

/**
 * 홈 카드 · 다국어 결제 버튼 (Figma 7771:30994) — card-section-sb2.mp4 대체.
 * 위쪽 언어 이름과 결제 버튼 문구가 한국어 → ENGLISH → 简体中文 → 日本語 순서로 1.2초마다 바뀐다 (4.8초 반복).
 * 화면 속 문구는 "언어 이름" 자체라 번역하지 않는다. 대신 start 로 시작 언어만 바꾼다
 * (EN 페이지는 'en' → ENGLISH부터, JP 페이지는 'ja' → 日本語부터).
 */
type Lang = 'ko' | 'en' | 'zh' | 'ja';
const START_DELAY: Record<Lang, string> = { ko: '0s', en: '-1.2s', zh: '-2.4s', ja: '-3.6s' };

const L = (v: string) => ({ '--motion-layout-transform': v }) as CSSProperties;

// 장면별 [왼쪽, 가운데(현재), 오른쪽] 언어 이름과 버튼 문구
const SCENES = [
  { id: 'ko', labels: ['日本語', '한국어', 'ENGLISH'], pay: '결제하기', big: 65 },
  { id: 'en', labels: ['한국어', 'ENGLISH', '简体中文'], pay: 'PAY', big: 60 },
  { id: 'zh', labels: ['ENGLISH', '简体中文', '日本語'], pay: '支付', big: 60 },
  { id: 'ja', labels: ['简体中文', '日本語', '한국어'], pay: '支払う', big: 60 },
] as const;

function Header({ labels, big, nodeId }: { labels: readonly string[]; big: number; nodeId: string }) {
  return (
    <div data-node-id={nodeId} className="fm relative flex w-full flex-[1_0_0] flex-col items-center justify-center py-[60px] min-h-px" style={L('translate(0px)')}>
      <div className="flex w-full items-center justify-between">
        {labels.map((t, i) => (
          <div key={i} className="flex w-[200px] shrink-0 items-center justify-center">
            <p
              className={`pv-mlp__lang shrink-0 whitespace-nowrap text-center leading-none font-bold ${i === 1 ? 'text-[var(--seed-color-fg-neutral-muted,#555d6d)]' : 'text-[32px] tracking-[-1.28px] text-[var(--seed-color-fg-disabled,#d1d3d8)]'}`}
              style={i === 1 ? { fontSize: big, letterSpacing: big * -0.04 } : undefined}
            >
              {t}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 left-1/2 h-[386px] w-[484px] overflow-clip rounded-tl-[39.099px] rounded-tr-[39.099px] border-x-[10px] border-t-[10px] border-solid border-[var(--seed-color-stroke-neutral-weak,#dcdee3)] bg-white">
      <div className="absolute left-0 top-[44.43px] flex h-[152.843px] w-[483.412px] flex-col px-[28.436px] py-[12.363px]">
        <div className="flex min-h-px w-full flex-[1_0_0] flex-col justify-center pt-[7.109px]">
          <div className="flex w-full items-center justify-center">
            <div className="relative h-[40px] w-[286px] shrink-0">
              <img alt="" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover" src={payverseLogo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PayButton({ text, solid, textNodeId }: { text: string; solid: boolean; textNodeId?: string }) {
  return (
    <div className="-translate-x-1/2 absolute bottom-[-1px] left-1/2 flex w-[620px] flex-col items-center justify-center p-[40px]">
      <div className={`flex w-full items-center justify-center rounded-[225.662px] px-[9.802px] py-[40px] ${solid ? 'bg-[#217cf9]' : ''}`}>
        <p data-node-id={textNodeId} className="whitespace-nowrap text-[41.029px] font-semibold leading-[39.209px] text-white">{text}</p>
      </div>
    </div>
  );
}

export default function CardMultilangPay({ start = 'ko', className }: { start?: Lang; className?: string }) {
  const [ko, ...rest] = SCENES;
  return (
    <MotionStage width={620} height={680} className={className}>
      <div className="pv-mlp relative size-[620px] h-[680px] border border-solid border-[rgba(0,0,0,0.06)] bg-[var(--seed-color-bg-layer-fill,#f7f8f9)]" style={{ '--pv-mlp-delay': START_DELAY[start] } as CSSProperties}>
        {/* 기본 장면: 한국어 (휴대폰·파란 버튼은 이 장면 것이 계속 깔려 있음) */}
        <div className="absolute inset-0 flex flex-col items-start">
          <Header labels={ko.labels} big={ko.big} nodeId="7771:30996" />
          <div className="relative h-[380px] w-full shrink-0">
            <Phone />
            <PayButton text={ko.pay} solid textNodeId="7771:31012" />
          </div>
        </div>
        {/* EN · 简体中文 · 日本語 장면: 언어 이름과 버튼 문구만 겹쳐서 바뀜 */}
        {rest.map((s) => (
          <div key={s.id} data-scene={s.id} className="pv-mlp__scene absolute left-[-1px] top-[-1px] h-[680px] w-[620px] overflow-clip border border-solid border-[rgba(0,0,0,0.06)] opacity-0">
            <div className="absolute inset-0 flex flex-col items-start">
              <Header labels={s.labels} big={s.big} nodeId={`scene-${s.id}-header`} />
              <div className="relative h-[380px] w-full shrink-0">
                <PayButton text={s.pay} solid={false} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </MotionStage>
  );
}
