import MotionStage from '../_shared/MotionStage';
import type { PlaybackProps } from '../_shared/playback';
import './settlement-list.css';
import coin1 from './assets/coin-1.svg';
import coin2 from './assets/coin-2.svg';
import coin3 from './assets/coin-3.svg';
import coin4 from './assets/coin-4.svg';
import amount1 from './assets/amount-1.svg';
import amount2 from './assets/amount-2.svg';
import amount3 from './assets/amount-3.svg';
import amount4 from './assets/amount-4.svg';

/**
 * 홈 카드 · 정산 목록 (Figma 7744:30890) — card-section-sb4.mp4 대체. 8초 반복.
 * 정산 행 목록이 2초마다 한 칸씩 위로 올라가고, 가운데 온 행만 1.2배로 커지며 선명해진다.
 * 상태 배지 문구 3개는 i18n 값으로 넘긴다. 금액 숫자와 통화 동전은 그림(언어 공통).
 * 영어처럼 문구가 길면 커진 가운데 행이 모션 영역(620px)보다 넓어진다. 좌우는 자르지 않고 넘기므로
 * 감싸는 카드에 overflow: hidden을 주면 카드 끝에서 잘린다.
 */
type Status = 'settling' | 'paidOut' | 'settled';
type Labels = Record<Status, string>;
const KO: Labels = { settling: '정산 중', paidOut: '지급완료', settled: '정산완료' };

// 행 4종 (Figma 순서). 목록은 이 4종을 3번 반복한 12행.
const KINDS = [
  { coin: coin1, coinSize: 50, amount: amount1, amountW: 164.628, status: 'settling' },
  { coin: coin2, coinSize: 48, amount: amount2, amountW: 170.912, status: 'paidOut' },
  { coin: coin3, coinSize: 50, amount: amount3, amountW: 146.031, status: 'settling' },
  { coin: coin4, coinSize: 50, amount: amount4, amountW: 168.935, status: 'settled' },
] as const;

const CHIP: Record<Status, string> = {
  settling: 'bg-[#e2e6f4] text-[#6773a3]',
  paidOut: 'bg-[rgba(173,255,204,0.5)] text-[#189c4a]',
  settled: 'bg-[#d7e8ff] text-[#217cf9]',
};

export default function SettlementList({ labels = KO, className, loop = false, play }: { labels?: Labels; className?: string } & PlaybackProps) {
  return (
    <MotionStage width={620} height={680} className={className} loop={loop} play={play} bleedX>
      <div className="pv-slist relative h-[680px] w-[620px] [overflow:visible_clip] bg-[var(--seed-color-bg-layer-fill,#f7f8f9)]">
        {/* Figma 마스크(7744:30891): 위아래 170px에서 배경으로 흐려짐. 좌우로 넘친 행도 보이도록 마스크를 양옆 200px씩 넓힘 */}
        <div className="absolute inset-y-0 -left-[200px] -right-[200px] [mask-image:linear-gradient(to_bottom,transparent_0,#000_170px,#000_510px,transparent_680px)]">
        <div className="pv-slist__stack absolute left-[274.26px] top-0 flex w-[471.48px] flex-col items-center gap-[24px]">
          {Array.from({ length: 12 }, (_, i) => {
            const k = KINDS[i % 4];
            return (
              <div key={i} data-row={i} className="pv-slist__row flex h-[92px] shrink-0 items-center justify-center gap-[9.621px] rounded-[999px] bg-white px-[24px] py-[9.621px] drop-shadow-[0px_1px_2px_rgba(0,0,0,0.08)]">
                <div className="flex h-[72.923px] items-center">
                  <img alt="" className="block max-w-none" style={{ width: k.coinSize, height: k.coinSize }} src={k.coin} />
                </div>
                <img alt="" className="block h-[21.422px] max-w-none shrink-0" style={{ width: k.amountW }} src={k.amount} />
                <div className="flex h-[73px] items-center justify-center">
                  <span className={`inline-flex h-[37.03px] items-center justify-center whitespace-nowrap rounded-full px-[19.24px] text-[20px] font-bold leading-none ${CHIP[k.status]}`}>{labels[k.status]}</span>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </MotionStage>
  );
}
