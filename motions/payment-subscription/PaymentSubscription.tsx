import MotionStage from '../_shared/MotionStage';
import type { PlaybackProps } from '../_shared/playback';
import './payment-subscription.css';

/**
 * 홈 부가서비스 · 정기결제 (Figma 8789:42533) — payment-subscription.mp4 대체.
 * 달력 "22" 둘레에 동그라미 → 밑줄 2개가 차례로 그려진다. 1.507초 반복 (Figma 타임라인 기준).
 * days: 요일 3개 (i18n). 예: ['월','화','수'] / ['Mon','Tue','Wed'] / ['月','火','水']
 */
type Props = { days?: [string, string, string]; className?: string };

const STROKE = { strokeWidth: 12, strokeLinecap: 'round' as const, stroke: '#5E98FE', fill: 'none', pathLength: 1 };

export default function PaymentSubscription({ days = ['월', '화', '수'], className, loop = false, play }: Props & PlaybackProps) {
  return (
    <MotionStage width={322} height={322} className={className} loop={loop} play={play}>
      <div className="pv-sub relative size-[322px] overflow-clip rounded-[16px] bg-[var(--seed-color-bg-brand-weak,#e2edfc)]">
        {/* 날짜 영역 */}
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[219px] left-1/2 overflow-clip rounded-[63.231px] text-center top-[calc(50%-28.5px)] w-[364px] font-bold">
          <div className="absolute flex gap-[60px] items-center leading-[81.714px] left-0 text-[64.852px] top-[136.31px] tracking-[-1.297px]">
            <p className="opacity-50 shrink-0 text-[var(--seed-color-bg-brand-solid,#217cf9)] w-[81.065px]">21</p>
            <p className="shrink-0 text-[var(--seed-color-fg-neutral-muted,#555d6d)] w-[81.065px]">22</p>
            <p className="opacity-50 shrink-0 text-[var(--seed-color-bg-brand-solid,#217cf9)] w-[81.065px]">23</p>
          </div>
          <div className="absolute flex gap-[60px] items-center leading-[81.065px] left-0 text-[42px] text-[rgba(33,124,249,0.5)] top-[5px] tracking-[-0.84px]">
            {days.map((d, i) => (
              <p key={i} className="shrink-0 w-[81.065px] whitespace-nowrap">{d}</p>
            ))}
          </div>
        </div>
        <div className="absolute bg-gradient-to-b from-[rgba(215,223,253,0.12)] h-[156px] left-0 opacity-50 to-[rgba(215,223,253,0)] top-0 w-[332px]" />
        {/* 손그림 동그라미 + 밑줄 (선이 그려지는 애니메이션) */}
        <div className="absolute h-[160.484px] left-[93px] top-[133px] w-[146.5px]">
          <div className="absolute h-[132px] left-[0.5px] top-0 w-[135px]">
            <div className="absolute inset-[-3.63%_-4.22%_-4.55%_-1.52%]"><svg className="block size-full overflow-visible" viewBox="0 0 142.741 142.795" preserveAspectRatio="none">
              <path className="pv-sub__p1" {...STROKE} d="M46.0479 22.7954L30.3535 33.3331C18.0115 41.6198 9.54751 54.5477 6.88822 69.1738C3.83589 85.9616 8.74422 103.216 20.1758 115.883L21.48 117.328C32.6643 129.722 48.5763 136.795 65.2702 136.795H69.1843C86.1344 136.795 102.462 130.407 114.911 118.903C127.821 106.973 135.558 90.4693 136.47 72.914L136.667 69.1359C136.92 64.2636 136.527 59.3793 135.498 54.6101C132.936 42.732 126.533 32.0286 117.278 24.1549L114.628 21.9006C103.863 12.7429 90.4281 7.30899 76.3241 6.40873L72.3855 6.15733C58.4217 5.26602 44.4787 8.17385 32.0355 14.5732L16.0479 22.7954" />
            </svg></div>
          </div>
          <div className="absolute h-[20.647px] left-0 top-[125.85px] w-[146.5px]">
            <div className="absolute inset-[-29.05%_-4.1%_-29.07%_-4.1%]"><svg className="block size-full overflow-visible" viewBox="0 0 158.502 32.646" preserveAspectRatio="none">
              <path className="pv-sub__p2" {...STROKE} d="M6.00146 26.6445C40.0015 17.8112 116.901 1.5445 152.501 7.1445" />
            </svg></div>
          </div>
          <div className="absolute flex h-[30.783px] items-center justify-center left-0 top-[129.7px] w-[136.636px]">
            <div className="flex-none rotate-[5.69deg]">
              <div className="h-[17.431px] relative w-[135.576px]">
                <div className="absolute inset-[-34.42%_-4.43%_-34.43%_-4.43%]"><svg className="block size-full overflow-visible" viewBox="0 0 147.578 29.4317" preserveAspectRatio="none">
                  <path className="pv-sub__p3" {...STROKE} d="M6.00146 23.4302C40.0015 14.5969 105.977 1.76743 141.577 7.36743" />
                </svg></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionStage>
  );
}
