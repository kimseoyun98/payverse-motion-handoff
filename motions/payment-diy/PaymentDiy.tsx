import type { CSSProperties } from 'react';
import MotionStage from '../_shared/MotionStage';
import '../_shared/figma-motion.css';
import './payment-diy.css';
import paypal from './assets/paypal.svg';
import gpay from './assets/gpay.png';
import alipay from './assets/alipay.png';
import shopeepay from './assets/shopeepay.png';
import dana from './assets/dana.png';
import zalopay from './assets/zalopay.png';
import wechatTile from './assets/wechat-tile.svg';
import apFrame from './assets/applepay-frame.svg';
import apInner from './assets/applepay-inner.svg';
import apApple from './assets/applepay-apple.svg';
import apPay from './assets/applepay-pay.svg';
import apFrameLg from './assets/applepay-frame-lg.svg';
import apInnerLg from './assets/applepay-inner-lg.svg';
import apAppleLg from './assets/applepay-apple-lg.svg';
import apPayLg from './assets/applepay-pay-lg.svg';

/**
 * 홈 부가서비스 · DIY 결제창 (Figma 7757:49737) — payment-diy-checkout.mp4 대체.
 * 오른쪽 Apple Pay 카드가 떠올라 가운데 빈 칸으로 날아가 끼워진다. 2.4초 반복. 글자 없음 → 언어 공통.
 */
const tile = 'bg-[var(--seed-color-bg-layer-default,white)] flex items-center justify-center relative rounded-[12px] shrink-0 size-[94px]';
const layout = (v: string) => ({ '--motion-layout-transform': v }) as CSSProperties;

function ApplePayMark({ size, src }: { size: string; src: [string, string, string, string] }) {
  return (
    <div className={`${size} overflow-clip relative shrink-0`}>
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={src[0]} />
      {(['inset-[3.33%_2.13%]', 'inset-[27.42%_66.25%_33.8%_13.55%]', 'inset-[30.15%_13.72%_24.39%_37.78%]'] as const).map((inset, i) => (
        <div key={inset} className={`absolute ${inset}`}>
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={src[i + 1]} />
        </div>
      ))}
    </div>
  );
}

function Logo({ src, w, h, fit = 'object-cover' }: { src: string; w: string; h: string; fit?: string }) {
  return (
    <div className={`${w} ${h} relative shrink-0`}>
      <img alt="" className={`absolute inset-0 max-w-none ${fit} pointer-events-none size-full`} src={src} />
    </div>
  );
}

export default function PaymentDiy({ className }: { className?: string }) {
  return (
    <MotionStage width={322} height={322} className={className}>
      <div className="pv-diy relative size-[322px] overflow-clip rounded-[16px] bg-[var(--seed-color-bg-brand-weak,#e2edfc)]">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute content-center flex flex-wrap gap-[8px] items-center justify-center left-1/2 top-1/2 w-[298px]">
          <div className={tile}>
            <div className="h-[18px] relative shrink-0 w-[53px]">
              <div className="absolute inset-[0_0_-11.11%_0]"><img alt="" className="block max-w-none size-full" src={paypal} /></div>
            </div>
          </div>
          <div className={tile}><Logo src={gpay} w="w-[55px]" h="h-[26px]" /></div>
          <div className={tile}><Logo src={alipay} w="w-[64px]" h="h-[16px]" /></div>
          <div className={tile}>
            <div className="h-[20px] relative shrink-0 w-[53px]">
              <div className="absolute h-[24.091px] left-0 top-0 w-[53px]">
                <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" src={shopeepay} />
              </div>
            </div>
          </div>
          {/* 5: 빈 칸 (점선) */}
          <div data-node-id="7757:49798" className="fm bg-[var(--seed-color-bg-brand-weak-pressed,#cbdffa)] border-2 border-[var(--seed-color-bg-brand-solid,#217cf9)] border-dashed opacity-50 relative rounded-[12px] shrink-0 size-[94px]" style={layout('translate(0px)')} />
          {/* 6: 원래 자리의 Apple Pay */}
          <div data-node-id="7757:49799" className={`fm ${tile}`} style={layout('translate(0px)')}>
            <ApplePayMark size="h-[32px] w-[52px]" src={[apFrame, apInner, apApple, apPay]} />
          </div>
          <div className="relative shrink-0 size-[94px]"><img alt="" className="absolute block inset-0 max-w-none size-full" src={wechatTile} /></div>
          <div className={tile}><Logo src={dana} w="w-[64px]" h="h-[18.059px]" /></div>
          <div className={tile}><Logo src={zalopay} w="w-[64px]" h="h-[14px]" /></div>
        </div>
        {/* 날아가는 Apple Pay 카드 (유리 효과) */}
        <div data-node-id="7757:49818" className="fm absolute left-[calc(50%+21px)] opacity-0 rounded-[16px] size-[110px] top-[calc(50%+20px)]" style={layout('translateX(-50%) translateY(-50%)')}>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute drop-shadow-[0px_0px_6px_#a4c0ff] left-1/2 rounded-[16px] size-[110px] top-1/2">
            <div aria-hidden className="absolute bg-white inset-0 mix-blend-screen pointer-events-none rounded-[16px]" />
            <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%-0.5px)] top-1/2">
              <ApplePayMark size="h-[40px] w-[65px]" src={[apFrameLg, apInnerLg, apAppleLg, apPayLg]} />
            </div>
          </div>
        </div>
      </div>
    </MotionStage>
  );
}
