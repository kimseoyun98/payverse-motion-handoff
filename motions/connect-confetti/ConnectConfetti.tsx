import type { CSSProperties } from 'react';
import MotionStage from '../_shared/MotionStage';
import './connect-confetti.css';
import symbol from './assets/symbol.svg';

/**
 * 홈 카드 · 연동 완료 (Figma 7744:36785) — card-section-sb5.mp4 대체. 4초 반복.
 * 페이버스 심볼과 "연동하기" 버튼이 올라오고, 버튼이 눌리며(물결 3개) 초록색으로 바뀌고 체크가 그려진 뒤 꽃가루가 떨어진다.
 * 움직임 값은 connect-confetti.css (Figma 키프레임에서 자동 생성). 버튼 문구만 i18n 값으로 넘긴다.
 */

// 꽃가루 조각 모양 3종 (Figma 벡터 경로 그대로). 조각마다 상자 안 여백(inset)이 다르다.
const SHAPES = {
  p: { // 꽃잎
    w: 13.915, h: 13.391, inset: '8.04% 7.41% 8.03% 5.37%',
    d: 'M0 5.088C2.507 8.8 5.895 12.274 8.138 13.346C9.613 13.781 13.915 10.86 13.915 10.86C13.915 10.86 5.708 6.849 3.063 0C1.258 2.059.314 3.595 0 5.088Z',
  },
  h: { // 육각형
    w: 14.017, h: 16.186, inset: '0 6.7%',
    d: 'M7.008 0L14.017 4.046V12.139L7.008 16.186L0 12.139V4.046L7.008 0Z',
  },
  s: { // 가는 조각
    w: 11.865, h: 11.263, inset: '11.64% 10.61% 11.65% 8.57%',
    d: 'M8.522 0L11.865.251L3.748 9.983L0 11.263L8.522 0Z',
  },
} as const;

// [노드번호, 모양(r=사각형), 색, x, y, 폭, 높이] — Figma 7744:36909 안 배치 그대로
type Piece = [string, 'p' | 'h' | 's' | 'r', string, number, number, number, number];
const PIECES: Piece[] = [
  ['36910', 'p', '#53e561', 271.66, 221.75, 15.96, 15.96], ['36913', 'h', '#33c5ff', 404.65, 478.34, 16.19, 16.19],
  ['36916', 'h', '#eb59e1', 441.77, 181.44, 16.03, 16.03], ['36919', 'p', '#ffd333', 482.61, 1847.9, 14.74, 14.74],
  ['36922', 'p', '#ff3856', 88.58, 2232.07, 15.33, 15.33], ['36925', 's', '#33c5ff', 300.52, 281.44, 14.68, 14.68],
  ['36928', 'h', '#ff3856', 326.8, 293.77, 14.38, 14.38], ['36931', 'r', '#ffd333', 232.6, 1578.87, 7.71, 14.02],
  ['36932', 'p', '#53e561', 515.57, 460.17, 15.85, 15.85], ['36935', 'p', '#eb59e1', 162.8, 456.07, 15.93, 15.93],
  ['36938', 'h', '#33c5ff', 168.18, 1948.03, 15.22, 15.22], ['36941', 'h', '#33c5ff', 405.36, 256.33, 15.41, 15.41],
  ['36944', 'p', '#53e561', 586.74, 1459.19, 13.99, 13.99], ['36947', 'p', '#ff3856', 644.72, 472.29, 15.49, 15.49],
  ['36950', 'r', '#33c5ff', 77.12, 1495.14, 7.64, 13.88], ['36951', 's', '#eb59e1', 456.39, 743.97, 14.93, 14.93],
  ['36954', 'p', '#ff3856', 196.18, 1583.13, 14.66, 14.66], ['36957', 'r', '#33c5ff', 642.91, 1297.44, 7.81, 14.2],
  ['36958', 'p', '#33c5ff', 747.65, 1903.06, 15.33, 15.33], ['36961', 'p', '#33c5ff', 614.91, 2241.77, 14.22, 14.22],
  ['36964', 'r', '#53e561', 476.91, 1109.54, 8.55, 15.54], ['36965', 's', '#33c5ff', 41.8, 1840.34, 14.94, 14.94],
  ['36968', 'h', '#eb59e1', 235.63, 288.63, 14.31, 14.31], ['36971', 'h', '#33c5ff', 369.3, 243.86, 16, 16],
  ['36974', 's', '#eb59e1', 541.42, 1293, 14.87, 14.87], ['36977', 's', '#ffd333', 479.1, 732.86, 14.13, 14.13],
  ['36980', 'p', '#ffd333', 420.07, 445.34, 14.25, 14.25], ['36983', 'h', '#ff3856', 563.26, 302.61, 15.46, 15.46],
  ['36986', 'p', '#ff3856', 285.02, 371.63, 15.77, 15.77], ['36989', 'p', '#ff3856', 592.39, 635.64, 15.21, 15.21],
  ['36992', 'h', '#ffd333', 471.2, 237.5, 15.08, 15.08], ['36995', 'r', '#33c5ff', 188.87, 1733.3, 8.34, 15.16],
  ['36996', 'h', '#ff3856', 483.76, 1992.94, 13.98, 13.98], ['36999', 's', '#53e561', 49.56, 1175.59, 14.14, 14.14],
  ['37002', 'r', '#eb59e1', 504.53, 528.22, 8.73, 15.86], ['37003', 'p', '#33c5ff', 486.01, 1915.34, 14.25, 14.25],
  ['37006', 's', '#ff3856', 339.23, 319.32, 14.34, 14.34], ['37009', 'p', '#33c5ff', 338.22, 893.71, 15.42, 15.42],
  ['37012', 'p', '#eb59e1', 370.24, 503.3, 13.94, 13.94], ['37015', 's', '#53e561', 539.39, 419.92, 13.84, 13.84],
  ['37018', 'r', '#53e561', 491.65, 342.88, 7.71, 14.02], ['37019', 'r', '#ffd333', 395.11, 228.22, 7.7, 14.01],
  ['37020', 'p', '#33c5ff', 382.9, 1220.33, 15.74, 15.74], ['37023', 's', '#ffd333', 520.52, 367.18, 15.75, 15.75],
  ['37026', 'r', '#ff3856', 583.84, 1600.85, 8.57, 15.58], ['37027', 's', '#53e561', 405.03, 209.01, 15.91, 15.91],
  ['37030', 'r', '#33c5ff', 238.82, 662.52, 8.15, 14.81], ['37031', 'r', '#ff3856', 239.83, 690.54, 8.44, 15.34],
  ['37032', 'r', '#eb59e1', 365.95, 433.69, 8.79, 15.98], ['37033', 's', '#ff3856', 392.19, 953.52, 13.86, 13.86],
  ['37036', 's', '#ff3856', 30, 1559.99, 15.87, 15.87], ['37039', 'p', '#33c5ff', 284.94, 1836.86, 14.31, 14.31],
  ['37042', 'r', '#53e561', 218.45, 1522.61, 8.76, 15.92], ['37043', 'p', '#53e561', 440.13, 232.56, 15.76, 15.76],
  ['37046', 'h', '#ff3856', 216.38, 1264.7, 14.98, 14.98],
];

const L = (v: string) => ({ '--motion-layout-transform': v }) as CSSProperties;

function Confetti({ piece: [id, kind, color, x, y, w, h] }: { piece: Piece }) {
  const box = { left: x, top: y, width: w, height: h };
  if (kind === 'r') {
    return <div data-node-id={`7744:${id}`} className="absolute" style={{ ...box, background: color, borderRadius: w * 0.15 }} />;
  }
  const s = SHAPES[kind];
  return (
    <div data-node-id={`7744:${id}`} className="absolute" style={box}>
      <div className="absolute" style={{ inset: s.inset }}>
        <svg className="block size-full" viewBox={`0 0 ${s.w} ${s.h}`} preserveAspectRatio="none" aria-hidden>
          <path d={s.d} fill={color} />
        </svg>
      </div>
    </div>
  );
}

export default function ConnectConfetti({ label = '연동하기', className }: { label?: string; className?: string }) {
  return (
    <MotionStage width={620} height={680} className={className}>
      <div className="pv-sb5 relative h-[680px] w-[620px] overflow-clip border border-solid border-[var(--seed-color-stroke-neutral-subtle,rgba(0,0,0,0.05))] bg-[var(--seed-color-bg-layer-fill,#f7f8f9)]">
        <div className="absolute left-[calc(50%-0.5px)] top-[calc(50%+19.8px)] flex w-[449px] -translate-x-1/2 -translate-y-1/2 flex-col items-start gap-[32px]">
          {/* 페이버스 심볼 (위에서 내려옴, 버튼 눌릴 때 살짝 커짐) */}
          <div data-node-id="7744:36787" className="relative flex w-full shrink-0 flex-col items-center justify-center">
            <div data-node-id="7744:36788" className="relative shrink-0 rounded-full bg-[var(--seed-color-bg-layer-default,white)] p-[50px] drop-shadow-[0px_0px_40px_rgba(255,255,255,0.4)]">
              <div className="relative size-[100px]">
                <div className="absolute inset-[5.77%_0.28%_6.2%_0.38%]"><img alt="" className="absolute inset-0 block size-full max-w-none" src={symbol} /></div>
              </div>
            </div>
          </div>

          {/* 연동하기 버튼 (아래에서 올라옴 → 눌림 물결 → 초록으로 바뀌며 체크) */}
          <div data-node-id="7744:36790" className="relative flex h-[132px] w-full shrink-0 flex-col items-center justify-center overflow-clip rounded-full bg-[#217cf9]">
            {['7744:36806', '7744:36823', '7744:36840'].map((id) => (
              <div key={id} data-node-id={id} className="absolute left-[164px] top-[6.2px] size-[120px] rounded-full bg-white/30" />
            ))}
            <p data-node-id="7721:38466" className="absolute left-[calc(50%-1.61px)] top-[calc(50%+0.33px)] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[40px] font-bold leading-none tracking-[-0.8px] text-white">
              {label}
            </p>
            <div data-node-id="7744:36867" className="absolute left-[206px] top-[54px] h-[24px] w-[37px]">
              <svg className="absolute left-[-5px] top-[-5px] block" width="47" height="34" viewBox="0 0 47 34" fill="none" aria-hidden>
                <path d="M5 15.1599L19.5865 29L42 5" pathLength="1" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* 꽃가루 (800×600 상자, 체크 뒤에 나타나 떨어지며 사라짐) */}
        <div data-node-id="7744:36909" className="absolute left-1/2 top-[calc(50%-191px)] h-[600px] w-[800px] overflow-clip opacity-0" style={L('translateX(-50%) translateY(-50%)')} aria-hidden>
          {PIECES.map((p) => <Confetti key={p[0]} piece={p} />)}
        </div>
      </div>
    </MotionStage>
  );
}
