import type { CSSProperties, ReactNode } from 'react';
import MotionStage from '../_shared/MotionStage';
import '../_shared/figma-motion.css';
import './payment-link.css';
import gpay from './assets/gpay.png';
import alipay from './assets/alipay.png';
import dana from './assets/dana.png';
import zalopay from './assets/zalopay.png';
import shopeepay from './assets/shopeepay.png';
import payverseLogo from './assets/payverse-logo.png';
import symbol from './assets/symbol.svg';
import linkIcon from './assets/link-icon.svg';
import paypal from './assets/paypal.svg';
import apFrame from './assets/ap-frame.svg';
import apInner from './assets/ap-inner.svg';
import apApple from './assets/ap-apple.svg';
import apPay from './assets/ap-pay.svg';
import wechatpay from './assets/wechatpay.svg';

/**
 * 홈 부가서비스 · 링크결제 (Figma 7749:30889) — payment-link.mp4 대체. 6초 반복.
 * ① "링크 발송" 버튼 누름 → ② 채팅 화면 올라옴 → ③ 결제 링크 메시지 → ④ 결제창(결제수단 스크롤 + 결제하기)
 * 문구 3개는 i18n 값으로 넘긴다.
 */
type Props = {
  sendLink?: string; // 링크 발송
  payLink?: string; // 페이버스 결제 바로가기
  pay?: string; // 결제하기
  className?: string;
};

const L = (v: string) => ({ '--motion-layout-transform': v }) as CSSProperties;
const bar = 'bg-[var(--seed-color-fg-disabled,#d1d3d8)] relative rounded-[8px] shrink-0';
const tile = 'bg-[var(--seed-color-bg-layer-default,white)] flex flex-[1_0_0] h-[62px] items-center justify-center min-w-px px-[9px] py-[12px] relative rounded-[12px]';

function Img({ src, box, fit = 'block size-full' }: { src: string; box: string; fit?: string }) {
  return (
    <div className={`${box} relative shrink-0`}>
      <img alt="" className={`absolute inset-0 max-w-none ${fit}`} src={src} />
    </div>
  );
}
const Row = ({ children }: { children: ReactNode }) => <div className="flex gap-[10px] items-start relative shrink-0 w-full">{children}</div>;

export default function PaymentLink({ sendLink = '링크 발송', payLink = '페이버스 결제 바로가기', pay = '결제하기', className }: Props) {
  return (
    <MotionStage width={322} height={322} className={className}>
      <div className="pv-link relative size-[322px] overflow-clip rounded-[16px] bg-[var(--seed-color-bg-brand-weak,#e2edfc)]">
        {/* ① 링크 발송 버튼 */}
        <div data-node-id="7749:30890" className="absolute left-0 top-0 size-[322px]">
          <div className="absolute bg-[var(--seed-color-bg-brand-solid,#217cf9)] flex flex-col h-[79px] items-center justify-center left-[41px] overflow-clip rounded-[9999px] top-[121px] w-[240px]">
            {/* 눌림 물결 2개: Figma Ripple 1·2 (흰 원, 채움 투명도 30%). 에셋 대신 CSS 원으로 그림 */}
            <div data-node-id="7749:31029" className="fm absolute left-[60px] size-[120px] top-[-20.5px] rounded-full bg-white/30" style={L('translate(0px)')} />
            <div data-node-id="7749:31038" className="fm absolute left-[60px] size-[120px] top-[-20.5px] rounded-full bg-white/30" style={L('translate(0px)')} />
            <span className="relative text-[25.2px] font-bold leading-[1.2] text-white whitespace-nowrap">{sendLink}</span>
          </div>
        </div>

        {/* ② 채팅 화면 */}
        <div data-node-id="7749:30895" className="fm absolute bg-[var(--seed-color-bg-brand-weak,#e2edfc)] left-0 rounded-[16px] size-[322px] top-0" style={L('translate(0px)')}>
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="absolute bg-[var(--seed-color-bg-layer-default,white)] border-[5px] border-[var(--seed-color-stroke-neutral-weak,#dcdee3)] border-solid bottom-0 h-[289px] left-[25px] overflow-clip rounded-tl-[22px] rounded-tr-[22px] w-[272px]">
              <div data-node-id="7749:30897" className="absolute bg-white flex flex-col items-start left-0 top-0 w-[272px]">
                <div className="bg-[var(--seed-color-bg-layer-fill,#f7f8f9)] flex flex-col items-end justify-center pt-[12px] px-[12px] w-full">
                  <div className="flex gap-[12px] items-center justify-end w-full">
                    <div className={`${bar} h-[13.069px] w-[32.673px]`} />
                    <div className={`${bar} h-[13.069px] w-[47.92px]`} />
                  </div>
                </div>
                <div className="bg-[var(--seed-color-bg-layer-fill,#f7f8f9)] flex h-[58px] items-center w-full">
                  <div className="flex h-full items-center px-[16px]"><div className="bg-[var(--seed-color-fg-disabled,#d1d3d8)] rounded-[12px] size-[20px]" /></div>
                  <div className={`${bar} h-[20px] w-[103px]`} />
                </div>
              </div>
              <div data-node-id="7749:30907" className="absolute flex flex-col h-[206px] items-center justify-center left-0 p-[16px] top-[83px] w-[272px]">
                <div data-node-id="7749:30908" className="fm flex gap-[6px] items-start relative shrink-0 w-full" style={L('translate(0px)')}>
                  <div className="flex items-center justify-center p-[12.757px] relative rounded-full shrink-0 size-[52px] bg-[var(--seed-color-bg-disabled,#f3f4f5)]">
                    <div className="relative shrink-0 size-[25.514px]">
                      <div className="absolute inset-[5.77%_0.28%_6.2%_0.38%]"><img alt="" className="absolute block inset-0 size-full" src={symbol} /></div>
                    </div>
                  </div>
                  <div className="flex flex-[1_0_0] flex-col min-w-px">
                    <div className="bg-[var(--seed-color-bg-disabled,#f3f4f5)] flex flex-col p-[12px] rounded-[17.202px] w-full">
                      <div className="flex gap-[9px] items-center w-full">
                        <div className={`${bar} size-[62px]`} />
                        <div className="flex flex-[1_0_0] flex-col gap-[9px] min-w-px">
                          <div className="flex overflow-clip w-full"><div className={`${bar} flex-[1_0_0] h-[10.891px] min-w-px`} /></div>
                          <div className="flex h-[19.604px] items-end w-full"><div className={`${bar} h-[19.604px] w-[47.92px]`} /></div>
                          <div className="flex gap-[4.356px] items-center overflow-clip w-full">
                            <div className={`${bar} h-[13.069px] w-[32.673px]`} />
                            <div className={`${bar} flex-[1_0_0] h-[13.069px] min-w-px`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ③ 결제 링크 메시지 */}
        <div className="absolute left-0 rounded-[16px] size-[322px] top-0">
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div data-node-id="7749:30950" className="fm absolute bg-[var(--seed-color-bg-disabled,#f3f4f5)] flex gap-[4px] items-center left-[99px] p-[12px] rounded-[17.202px] top-[236px] w-[182px]" style={L('translate(0px)')}>
              <Img src={linkIcon} box="size-[20px]" />
              <p className="font-semibold leading-[17.202px] text-[14px] text-[var(--seed-color-fg-brand,#217cf9)] underline whitespace-nowrap">{payLink}</p>
            </div>
          </div>
        </div>

        {/* ④ 결제창 */}
        <div data-node-id="7749:30967" className="fm absolute left-0 rounded-[16px] size-[322px] top-0" style={L('translate(0px)')}>
          <div className="overflow-clip relative rounded-[inherit] size-full">
            <div className="-translate-x-1/2 absolute bg-[var(--seed-color-bg-layer-fill,#f7f8f9)] bottom-0 h-[289px] left-1/2 overflow-clip rounded-tl-[22px] rounded-tr-[22px] w-[272px]">
              <div data-node-id="7749:31099" className="fm absolute bg-[var(--seed-color-bg-layer-fill,#f7f8f9)] bottom-0 h-[206px] left-1/2 overflow-clip w-[240px]" style={L('translateX(-50%)')}>
                <div data-node-id="7749:31100" className="fm absolute bottom-[-96px] flex flex-col gap-[10px] items-start left-0 pt-[24px] right-0" style={L('translate(0px)')}>
                  <Row>
                    <div className={tile}><Img src={paypal} box="h-[18px] w-[53px]" /></div>
                    <div className={tile}>
                      <div className="h-[32px] overflow-clip relative shrink-0 w-[53px]">
                        <img alt="" className="absolute block inset-0 size-full" src={apFrame} />
                        <div className="absolute inset-[3.33%_2.13%]"><img alt="" className="absolute block inset-0 size-full" src={apInner} /></div>
                        <div className="absolute inset-[27.42%_66.25%_33.8%_13.55%]"><img alt="" className="absolute block inset-0 size-full" src={apApple} /></div>
                        <div className="absolute inset-[30.15%_13.72%_24.39%_37.78%]"><img alt="" className="absolute block inset-0 size-full" src={apPay} /></div>
                      </div>
                    </div>
                  </Row>
                  <Row>
                    <div className={tile}><Img src={gpay} box="h-[26px] w-[55px]" fit="object-cover size-full" /></div>
                    <div className={tile}><Img src={alipay} box="h-[18px] w-[72px]" fit="object-cover size-full" /></div>
                  </Row>
                  <Row>
                    <div className={tile}><Img src={dana} box="h-[19px] w-[67px]" fit="object-cover size-full" /></div>
                    <div className={tile}><Img src={zalopay} box="h-[16px] w-[69px]" fit="object-cover size-full" /></div>
                  </Row>
                  <Row>
                    <div className={tile}><Img src={wechatpay} box="h-[18px] w-[93px]" /></div>
                    <div className={tile}><Img src={shopeepay} box="h-[25px] w-[55px]" fit="object-contain size-full" /></div>
                  </Row>
                </div>
              </div>
              <div data-node-id="7749:30975" className="fm absolute bg-gradient-to-b bottom-0 flex flex-col from-[rgba(248,249,252,0)] h-[84px] items-start left-1/2 p-[16px] to-[#f8f9fc] to-[25.595%] w-[272px]" style={L('translateX(-50%)')}>
                <div className="bg-[var(--seed-color-bg-brand-solid,#217cf9)] flex h-[52px] items-center justify-center p-[4.3px] rounded-[99px] w-full">
                  <p className="font-semibold leading-[17.202px] text-[18px] text-white whitespace-nowrap">{pay}</p>
                </div>
              </div>
              <div className="absolute bg-[var(--seed-color-bg-layer-fill,#f7f8f9)] flex flex-col h-[58px] items-start left-0 px-[24px] py-[6.957px] top-[25px] w-[272px]">
                <div className="flex flex-[1_0_0] flex-col items-start justify-center min-h-px w-full">
                  <Img src={payverseLogo} box="h-[18.231px] w-[130.091px]" fit="object-cover size-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MotionStage>
  );
}
