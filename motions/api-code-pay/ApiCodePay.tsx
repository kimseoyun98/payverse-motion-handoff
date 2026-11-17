import type { CSSProperties } from 'react';
import MotionStage from '../_shared/MotionStage';
import type { PlaybackProps } from '../_shared/playback';
import '../_shared/figma-motion.css';
import './api-code-pay.css';
import logo from './assets/logo.svg';
import code from './assets/code.svg';
import dollar from './assets/dollar.svg';
import digit8 from './assets/digit-8.svg';
import digit0 from './assets/digit-0.svg';
import payButton from './assets/pay-button.svg';

/**
 * PG 서비스 API 섹션 · 코드 + 결제창 (Figma 7928:26910) — api-section-1.mp4 대체. 3초 반복.
 * 연동 코드 위로 결제창이 떠 있고, 금액 "$ 80"이 한 글자씩 입력된 뒤(커서 깜빡임) Pay 버튼이 눌린다.
 * 화면 속 글자는 코드와 "Pay"뿐이라 언어 공통.
 */
const L = { '--motion-layout-transform': 'translate(0px)' } as CSSProperties;

export default function ApiCodePay({ className, loop = false, play }: { className?: string } & PlaybackProps) {
  return (
    <MotionStage width={472} height={472} className={className} loop={loop} play={play}>
      <div className="pv-api1 relative size-[472px]">
        <div className="absolute inset-0 overflow-clip rounded-[24px] border border-solid border-[rgba(0,0,0,0.05)] bg-[var(--seed-color-bg-neutral-solid,#1a1c20)]">
          {/* 연동 코드 (그림) */}
          <div className="-translate-y-1/2 absolute left-[40px] top-[calc(50%+0.5px)] h-[376px] w-[630px]">
            <img alt="" className="absolute inset-0 block size-full max-w-none" src={code} />
          </div>
          {/* 휴대폰 + 결제창 */}
          <div className="-translate-x-1/2 absolute bottom-0 left-1/2 flex h-[312px] items-start justify-center overflow-clip pt-[16px]">
            <div className="relative flex h-[296px] shrink-0 flex-col items-center justify-center overflow-clip rounded-tl-[50px] rounded-tr-[50px] px-[10px] pt-[10px] shadow-[0px_16px_32px_0px_rgba(0,0,0,0.08),0px_0px_1px_0px_rgba(0,0,0,0.25)]">
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-tl-[50px] rounded-tr-[50px] bg-[rgba(255,255,255,0.12)] backdrop-blur-[2px]" />
              <div className="relative flex w-[280px] min-h-px flex-[1_0_0] flex-col items-center justify-end overflow-clip rounded-tl-[40px] rounded-tr-[40px] bg-[var(--seed-color-bg-neutral-solid,#1a1c20)] pt-[40px]">
                <div className="-translate-x-1/2 absolute left-1/2 top-[29.5px] h-[67px] w-[252px] rounded-[16px] bg-[rgba(255,255,255,0.5)]" />
                <div className="relative flex h-[247px] w-full shrink-0 flex-col items-center overflow-clip rounded-tl-[16px] rounded-tr-[16px] bg-white">
                  <div className="flex w-full items-center justify-center overflow-clip px-[16px] pb-[12px] pt-[24px]">
                    <img alt="" className="block h-[15px] w-[106px] max-w-none" src={logo} />
                  </div>
                  <div className="flex h-[196px] w-full flex-col items-center justify-between px-[24px] py-[25px]">
                    <div className="flex items-center gap-[8px]">
                      <div className="flex items-center justify-center gap-[20px] overflow-clip">
                        <div className="relative h-[57px] w-[36px] shrink-0">
                          <img alt="" className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-[calc(50%-0.32px)] block h-[56.364px] w-[35.668px] max-w-none" src={dollar} />
                        </div>
                        <div className="flex items-center gap-[4px]">
                          <img data-node-id="7928:26931" alt="" className="block h-[50px] w-[39.333px] max-w-none shrink-0" src={digit8} />
                          <img data-node-id="7928:26936" alt="" className="block h-[50px] w-[39.773px] max-w-none shrink-0" src={digit0} />
                        </div>
                      </div>
                      {/* 입력 커서 */}
                      <div data-node-id="7928:26954" className="fm relative h-[75px] w-[5px] shrink-0 rounded-[60px] bg-[var(--seed-color-fg-disabled,#d1d3d8)]" style={L} />
                    </div>
                    <div data-node-id="7928:26973" className="fm relative h-[50px] w-[154px] shrink-0" style={L}>
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={payButton} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_8px_0px_rgba(0,0,0,0.08)]" />
            </div>
          </div>
        </div>
      </div>
    </MotionStage>
  );
}
