import type { CSSProperties } from 'react';
import MotionStage from '../_shared/MotionStage';
import type { PlaybackProps } from '../_shared/playback';
import '../_shared/figma-motion.css';
import './api-plugin-install.css';
import iconHome from './assets/icon-home.svg';
import iconReceipt from './assets/icon-receipt.svg';
import iconSlot3 from './assets/icon-wrench-active.svg';
import iconSlot4 from './assets/icon-wrench.svg';
import iconGear from './assets/icon-gear.svg';
import puzzle from './assets/puzzle.svg';
import symbol from './assets/symbol.svg';
import tail from './assets/tail.svg';

/**
 * PG 서비스 API 섹션 · 플러그인 설치 (Figma 7939:25784) — api-section-2.mp4 대체. 3초 반복.
 * 관리자 화면 사이드바의 퍼즐(플러그인) 버튼이 눌리면 오른쪽에 말풍선 카드가 튀어나오고, 이어서 페이버스 심볼이 튀어나온다.
 * 카드 안에 "설치하기" 버튼이 먼저 보였다가 눌리고(1.4초) 사라진 뒤 심볼이 나온다. 버튼 문구는 i18n 값(label)으로 넘긴다.
 * (버튼 연출은 Figma에 없고 요청으로 추가. 심볼 등장 타이밍은 Figma 그대로)
 */
const L = (v: string) => ({ '--motion-layout-transform': v }) as CSSProperties;
const slot = 'flex h-[87.159px] w-full shrink-0 items-center justify-center overflow-clip rounded-[17.432px] p-[24px]';

export default function ApiPluginInstall({ label = '설치하기', className, loop = false, play }: { label?: string; className?: string } & PlaybackProps) {
  return (
    <MotionStage width={472} height={472} className={className} loop={loop} play={play}>
      <div className="pv-api2 relative size-[472px]">
        <div className="-translate-y-1/2 absolute left-0 right-0 top-1/2 flex h-[472px] flex-col items-start overflow-clip rounded-[24px] border border-solid border-[rgba(0,0,0,0.05)] bg-[var(--seed-color-bg-neutral-inverted,#2a3038)]">
          {/* 창 위쪽 막대 (신호등 버튼) */}
          <div className="flex w-full shrink-0 items-center border-b-[1.341px] border-solid border-[rgba(255,255,255,0.08)] bg-[var(--seed-color-bg-neutral-solid,#1a1c20)] px-[24px] pb-[17.341px] pt-[16px]">
            <div className="flex items-center gap-[10.727px]">
              <div className="size-[16.091px] rounded-full bg-[#ed8796]" />
              <div className="size-[16.091px] rounded-full bg-[#eed49f]" />
              <div className="size-[16.091px] rounded-full bg-[#a6da95]" />
              <div className="h-[21.455px] w-[163.591px]" />
            </div>
          </div>
          <div className="relative flex min-h-px w-full flex-[1_0_0] items-center gap-[72px] pr-[24px]">
            {/* 사이드바 */}
            <div className="relative flex h-full shrink-0 flex-col items-start justify-center overflow-clip bg-[var(--seed-color-bg-neutral-solid,#1a1c20)] opacity-50">
              <div className="flex w-[122.023px] min-h-px flex-[1_0_0] flex-col items-start justify-center overflow-clip p-[17.432px]">
                <div className={slot}><img alt="" className="block aspect-square h-full max-w-none" src={iconHome} /></div>
                <div className={slot}><img alt="" className="block size-full max-w-none object-contain" src={iconReceipt} /></div>
                <div data-node-id="7939:25811" className="fm flex size-[87.159px] shrink-0 items-center justify-center overflow-clip rounded-[17.432px]" style={L('translate(0px)')}>
                  <img alt="" className="block size-[43.58px] max-w-none" src={iconSlot3} />
                </div>
                <div className={slot}><img alt="" className="block aspect-square h-full max-w-none" src={iconSlot4} /></div>
                <div className={`${slot} size-[87.159px]`}><img alt="" className="block size-[36.712px] max-w-none" src={iconGear} /></div>
              </div>
            </div>
            {/* 눌리는 퍼즐 버튼 (사이드바 3번째 칸 위) */}
            <div data-node-id="7939:25826" className="fm absolute left-[17.43px] top-[calc(50%-0.09px)] flex size-[87.159px] items-center justify-center overflow-clip rounded-[17.432px] bg-[var(--seed-color-bg-neutral-solid,#1a1c20)] shadow-[0px_0px_40px_0px_rgba(255,255,255,0.12)]" style={L('translateY(-50%)')}>
              <img alt="" className="block size-[60px] max-w-none" src={puzzle} />
            </div>
            {/* 말풍선 카드 + 페이버스 심볼 */}
            <div data-node-id="7939:25839" className="fm relative flex size-[200px] shrink-0 flex-col items-center justify-center gap-[16px] rounded-[20px] bg-[var(--seed-color-bg-layer-basement,#f3f4f5)] drop-shadow-[0px_5.364px_10.727px_rgba(0,0,0,0.12)]" style={L('translate(0px)')}>
              {/* "설치하기" 버튼: 카드와 함께 나왔다가 눌리고 사라짐 → 이어서 심볼 등장 (Figma에 없는 추가 연출) */}
              <div className="pv-api2__install absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="pv-api2__btn block whitespace-nowrap rounded-full px-[20px] py-[12px] text-[28px] font-bold leading-none tracking-[-0.56px] text-[#133566]">{label}</span>
              </div>
              <div data-node-id="7939:25840" className="fm relative size-[80px] shrink-0" style={L('translate(0px)')}>
                <div className="absolute inset-[5.77%_0.28%_6.2%_0.38%]"><img alt="" className="absolute inset-0 block size-full max-w-none" src={symbol} /></div>
              </div>
              <div className="-translate-y-1/2 absolute left-[-20.02px] top-[calc(50%+0.1px)] flex h-[45px] w-[21px] items-center justify-center">
                <div className="-rotate-90 flex-none">
                  <div className="relative h-[21px] w-[45px]">
                    <div className="absolute inset-[19.27%_0_0_0]"><img alt="" className="block size-full max-w-none" src={tail} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionStage>
  );
}
