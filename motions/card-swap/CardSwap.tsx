import type { CSSProperties } from 'react';
import MotionStage from '../_shared/MotionStage';
import '../_shared/figma-motion.css';
import './card-swap.css';
import num1234 from './assets/num-1234.svg';
import mmYy from './assets/mm-yy.svg';
import cvcCvv from './assets/cvc-cvv.svg';
import swapLeft from './assets/swap-left.svg';
import swapRight from './assets/swap-right.svg';

/**
 * PG 서비스 Feature · 카드 UI 클립 인터랙션 (Figma 7835:79974) — feature-section-2.mp4 대체. 4초 반복.
 * 왼쪽 위 카드와 오른쪽 아래 카드가 납작하게 접혔다 펴지며 서로 내용이 바뀐다. 화살표 아이콘은 뒤집힌다.
 * 카드 2장의 문구를 props로 받는다:
 *   KR: top=한국어, bottom=영어  /  EN: top=영어, bottom=한국어  /  JP: top=일본어, bottom=영어
 */
export type CardText = { title: string; pay: string };
type Props = { top?: CardText; bottom?: CardText; className?: string };

const KO: CardText = { title: '카드정보', pay: '10,000원 결제' };
const EN: CardText = { title: 'Card Info', pay: 'Pay $7.65' };

const L = { '--motion-layout-transform': 'translateX(-50%) translateY(-50%)' } as CSSProperties;
const field = 'flex h-[30px] min-w-px flex-[1_0_0] items-center justify-center rounded-[4.5px] border border-solid border-[rgba(0,0,0,0.05)] bg-white px-[8px]';

function Card({ text, nodeId, pos, overlay = false }: { text: CardText; nodeId: string; pos: 'top' | 'bottom'; overlay?: boolean }) {
  const place = pos === 'top' ? 'left-[calc(50%-63.5px)] top-[calc(50%-90.7px)]' : 'left-[calc(50%+62.5px)] top-[calc(50%+91.3px)]';
  return (
    <div data-node-id={nodeId} className={`fm absolute ${place} flex w-[200px] flex-col items-start overflow-clip rounded-[14px] border border-solid border-[rgba(0,0,0,0.05)] bg-white ${overlay ? 'opacity-0' : ''}`} style={L}>
      <div className="relative flex h-[106px] w-full shrink-0 flex-col items-start">
        <div className="flex w-full flex-col items-start gap-[12px] bg-gradient-to-b from-[rgba(247,248,249,0)] to-[#f7f8f9] p-[16px]">
          <p className="h-[12px] text-[11px] font-medium leading-[12px] whitespace-nowrap text-[#555d6d]">{text.title}</p>
          <div className="flex w-full flex-col gap-[4px]">
            <div className="flex w-full items-center gap-[3px]">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={field}><img alt="" className="block h-[7.992px] w-[23.815px] max-w-none" src={num1234} /></div>
              ))}
            </div>
            <div className="flex w-full items-center gap-[3px]">
              <div className={field}><img alt="" className="block h-[9.313px] w-[35.331px] max-w-none" src={mmYy} /></div>
              <div className={field}><img alt="" className="block h-[9.313px] w-[46.739px] max-w-none" src={cvcCvv} /></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[41px] w-[200px] bg-gradient-to-b from-[rgba(247,248,249,0)] to-[#f7f8f9]" />
      </div>
      <div className="flex w-full shrink-0 flex-col items-center justify-end bg-[var(--seed-color-bg-layer-fill,#f7f8f9)] px-[16px] pb-[16px] pt-[10px]">
        <div className="flex h-[38px] w-full items-center justify-center rounded-[7.085px] bg-[var(--seed-color-bg-brand-solid,#217cf9)]">
          <p className="whitespace-nowrap text-[17.3px] font-semibold leading-none text-white">{text.pay}</p>
        </div>
      </div>
    </div>
  );
}

export default function CardSwap({ top = KO, bottom = EN, className }: Props) {
  return (
    <MotionStage width={435} height={435} className={className}>
      <div className="pv-swap relative size-[435px] overflow-clip rounded-[24px] bg-[var(--seed-color-bg-brand-solid,#217cf9)]">
        <Card text={top} nodeId="7835:79996" pos="top" />
        <Card text={bottom} nodeId="7835:80040" pos="bottom" />
        {/* 접혔다 펴질 때 보이는 반대쪽 내용 */}
        <Card text={bottom} nodeId="7835:80087" pos="top" overlay />
        <Card text={top} nodeId="7835:80135" pos="bottom" overlay />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 flex size-[321px] items-center justify-between px-[24px] py-[40px]">
          <div className="flex h-full items-end">
            <div data-node-id="7835:80178" className="fm relative size-[57px] shrink-0"><img alt="" className="absolute inset-0 block size-full" src={swapLeft} /></div>
          </div>
          <div className="flex h-full items-start justify-end">
            <div data-node-id="7835:80197" className="fm relative size-[57px] shrink-0"><img alt="" className="absolute inset-0 block size-full" src={swapRight} /></div>
          </div>
        </div>
      </div>
    </MotionStage>
  );
}
