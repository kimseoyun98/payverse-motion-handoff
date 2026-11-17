import type { CSSProperties } from 'react';
import MotionStage from '../_shared/MotionStage';
import type { PlaybackProps } from '../_shared/playback';
import { useFitText } from '../_shared/fit-text';
import './flag-drop.css';
import us from './assets/us.svg';
import kr from './assets/kr.svg';
import jp from './assets/jp.svg';
import cn from './assets/cn.svg';
import phone from './assets/phone.svg';

/**
 * 홈 카드 · 국기 낙하 (Figma 7711:27822) — card-section-sb3.mp4 대체. 7초 반복, 끊김 없이 무한 반복.
 * 국기 동전이 한 칸씩 휴대폰 안으로 떨어지며 회전하고, 휴대폰 화면의 결제 금액이 통화별로 바뀐다.
 * 뒤에는 같은 국기들을 크게 흐리게 깐 배경이 함께 내려온다.
 * "결제 금액" 문구만 i18n 값으로 넘긴다. 금액·통화 기호는 언어 공통.
 * 문구는 왼쪽 정렬(x 96)이고, 가장 긴 금액(₩10,000)과 40px 이상 띄우도록 폭 180px을 넘으면 글씨를 줄인다.
 */
const FLAG = { us, kr, jp, cn } as const;
type Flag = keyof typeof FLAG;

// 앞쪽 국기 12개 (위 → 아래). 각도는 Figma 기본 회전값(도).
const FRONT: [Flag, number, number, number][] = [
  // [국기, 기본 각도, x 보정, y 보정]
  ['us', 132, -0.44, -0.31], ['kr', 120, -0.22, -0.27], ['jp', 108, -0.06, 0.11], ['cn', 144, 0.35, 0.24],
  ['us', 16, -0.44, -0.31], ['kr', 4, -0.22, -0.27], ['jp', -8, -0.06, 0.11], ['cn', 28, 0.35, 0.24],
  ['us', -100, -0.04, -0.28], ['kr', -112, 0.77, 0.37], ['jp', -124, 0.33, -0.12], ['cn', -88, 0.16, 0.22],
];

// 뒤 흐린 배경 국기 (배경 레이어 좌표). [국기, 기본 각도, 상자 left, 상자 top, 상자 크기, 이동 키프레임]
const BG: [Flag, number, number, number, number, string][] = [
  ['cn', -168, -286.75, -2743.62, 740.101, 'fd-bg-h'],
  ['us', 180, -230.01, -1986.69, 624, 'fd-bg-g'],
  ['kr', 168, 69.54, -1345.45, 740.101, 'fd-bg-f'],
  ['jp', 156, 27.63, -688.85, 823.856, 'fd-bg-e'],
  ['cn', 76, -294.91, 0, 756.424, 'fd-bg-h'],
  ['us', 64, -335.2, 659.9, 834.391, 'fd-bg-g'],
  ['kr', 52, 1.58, 1338.43, 875.892, 'fd-bg-f'],
  ['jp', 40, 0, 2035.3, 879.111, 'fd-bg-e'],
  ['cn', -40, 0, 2734.18, 879.111, 'fd-bg-d'],
  ['us', -52, 1.61, 3434.67, 875.892, 'fd-bg-c'],
  ['kr', -64, 365.6, 4154.7, 834.391, 'fd-bg-b'],
  ['jp', -76, 375.27, 4892.16, 756.424, 'fd-bg-a'],
];

const AMOUNTS = [['$', '6.81'], ['¥', '11.28'], ['¥', '46.67'], ['₩', '10,000']] as const;

const v = (o: Record<string, string>) => o as CSSProperties;

const LABEL_MAX = 180; // 96(문구 시작) + 180 + 40(여백) ≈ ₩10,000 시작점(315)
const LABEL_SIZE = 38;


export default function FlagDrop({ label = '결제 금액', className, loop = false, play }: { label?: string; className?: string } & PlaybackProps) {
  const labelRef = useFitText<HTMLParagraphElement>(label, LABEL_SIZE, LABEL_MAX);
  return (
    <MotionStage width={620} height={680} className={className} loop={loop} play={play}>
      <div className="pv-flag relative h-[680px] w-[620px] overflow-clip border border-solid border-[var(--seed-color-stroke-neutral-muted,rgba(0,0,0,0.06))] bg-[var(--seed-color-bg-layer-fill,#f7f8f9)]">
        {/* 흐린 배경 (Figma 레이어 블러 400 = CSS blur 200px). Figma 마스크(7711:27824): 위 40%는 안 보이고 아래로 갈수록 진해짐 */}
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_272.5px,#000_681px)]">
        <div className="absolute left-[-132.56px] top-[-3227.73px] h-[5622.758px] w-[879.111px] blur-[200px]" aria-hidden>
          {BG.map(([f, base, l, t, s, track], i) => (
            <img
              key={i} alt="" src={FLAG[f]}
              className="pv-flag__f absolute block size-[624px] max-w-none rounded-full"
              style={{ left: l + (s - 624) / 2, top: t + (s - 624) / 2, ...v({ '--base': `${base}deg`, '--track': track }) }}
            />
          ))}
        </div>
        </div>

        {/* 앞쪽 국기 줄 (200px, 간격 28px) */}
        <div className="absolute left-[206px] top-[-1482px]" aria-hidden>
          {FRONT.map(([f, base, dx, dy], i) => (
            <img
              key={i} alt="" src={FLAG[f]}
              className="pv-flag__f absolute block size-[200px] max-w-none rounded-full"
              style={{ left: dx, top: i * 228 + dy, ...v({ '--base': `${base}deg`, '--track': 'fd-front' }) }}
            />
          ))}
        </div>

        {/* 휴대폰 (유리 흐림은 CSS backdrop-filter) */}
        <div className="absolute bottom-[-1px] left-[38px] h-[219px] w-[540px]">
          <div className="absolute inset-x-0 bottom-0 top-[-1px] rounded-t-[82px] backdrop-blur-[20px]" />
          <img alt="" className="absolute inset-x-0 bottom-0 top-[-1px] block h-[220px] w-[540px] max-w-none" src={phone} />
        </div>

        {/* 결제 금액 */}
        {AMOUNTS.map(([sym, num], i) => (
          <div key={i} data-i={i} className="pv-flag__amt absolute left-[323px] top-[578px] flex w-[200px] items-center justify-end">
            <p className="flex items-center gap-[12px] whitespace-nowrap text-[48px] font-bold leading-[60px] tracking-[-0.96px] text-[var(--seed-color-fg-brand,#217cf9)]">
              <span>{sym}</span><span>{num}</span>
            </p>
          </div>
        ))}
        <p ref={labelRef} className="absolute left-[96px] top-[608px] -translate-y-1/2 whitespace-nowrap text-[38px] font-semibold leading-none tracking-[-0.76px] text-[var(--seed-color-fg-neutral-muted,#555d6d)]">
          {label}
        </p>
      </div>
    </MotionStage>
  );
}
