import './settlement-currency.css';
import arc from './assets/arc.svg';
import coinYen from './assets/coin-yen.svg';
import coinDollarRight from './assets/coin-dollar-right.svg';
import coinWon from './assets/coin-won.svg';
import coinDollarLeft from './assets/coin-dollar-left.svg';
import centerCoin from './assets/center-coin.svg';
import strip1 from './assets/strip-1.svg';
import strip2 from './assets/strip-2.svg';
import strip3 from './assets/strip-3.svg';
import strip3Loop from './assets/strip-3-loop.svg';

/**
 * PG 서비스 Feature 카드 · 통화 아이콘 순환 (Figma 7835:80199)
 * 기존 feature-section-3.mp4 를 대체한다.
 *
 * - 디자인 기준 크기 435×435. 부모 폭에 맞춰 비율 그대로 늘고 줄어든다.
 * - label 은 i18n 문구를 그대로 넘긴다. 예: <SettlementCurrency label={t('pg.feature.settlement')} />
 * - 움직임: 가운데 동전 안의 통화 기호 줄이 5초 동안 72px씩 3번 위로 이동하고 반복 (Figma 키프레임 그대로).
 * - prefers-reduced-motion 이면 움직이지 않는다.
 */

// 바깥 반원 위 동전 5개 — 중심 좌표(px, 디자인 기준)와 에셋. 위치는 Figma 값 그대로.
const ARC_COINS = [
  { src: coinDollarLeft, x: 23.75, y: 125.53 },
  { src: coinWon, x: 86.51, y: 51.14 },
  { src: coinYen, x: 181.24, y: 23.25 },
  { src: coinDollarRight, x: 275.97, y: 51.14 },
  { src: coinWon, x: 341.06, y: 125.53 },
];

// 가운데 동전 안에서 위로 흐르는 기호 줄. 뒤 3개는 끊김 없는 반복용 복사본.
const STRIP = [strip1, strip2, strip3, strip1, strip2, strip3Loop];

type Props = {
  /** 아래 알약 안 문구. 기본값은 한국어 */
  label?: string;
  className?: string;
};

export default function SettlementCurrency({ label = '최종 정산 금액', className }: Props) {
  return (
    <div className={['pv-settle', className].filter(Boolean).join(' ')} role="img" aria-label={label}>
      <div className="pv-settle__card">
        <div className="pv-settle__stage">
          {/* 점선 반원: Figma "Outer circle border" 레이어를 SVG로 그대로 내보낸 고정 에셋 */}
          <img className="pv-settle__arc" src={arc} alt="" />

          {ARC_COINS.map((c, i) => (
            <img key={i} className="pv-settle__arc-coin" src={c.src} alt="" style={{ left: `${c.x}em`, top: `${c.y}em` }} />
          ))}

          <div className="pv-settle__center">
            <div className="pv-settle__coin">
              <img className="pv-settle__coin-bg" src={centerCoin} alt="" />
              <div className="pv-settle__strip">
                {STRIP.map((src, i) => (
                  <img key={i} src={src} alt="" />
                ))}
              </div>
            </div>
            <div className="pv-settle__pill">
              <span className="pv-settle__label">{label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
