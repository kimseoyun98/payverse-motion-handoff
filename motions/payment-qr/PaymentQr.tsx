import MotionStage from '../_shared/MotionStage';
import type { PlaybackProps } from '../_shared/playback';
import './payment-qr.css';
import qrGray from './assets/qr-gray.svg';
import qrMask from './assets/qr-mask.svg';
import qrBlue from './assets/qr-blue.svg';
import scanGlow from './assets/scan-glow.svg';
import scanLine from './assets/scan-line.svg';

/**
 * 홈 부가서비스 · QR결제 (Figma 7757:45855) — payment-qr.mp4 대체.
 * 회색 QR 위로 스캔선이 올라갔다 내려오고, 스캔선 아래쪽만 파란 QR이 보인다. 2초 반복.
 * 글자 없음 → 언어 공통.
 */
export default function PaymentQr({ className, loop = false, play }: { className?: string } & PlaybackProps) {
  return (
    <MotionStage width={322} height={322} className={className} loop={loop} play={play}>
      <div className="pv-qr relative size-[322px] overflow-clip rounded-[16px] bg-[var(--seed-color-bg-brand-weak,#e2edfc)]">
        <div className="absolute inset-[22.98%_23.65%_22.98%_22.86%]">
          <img alt="" src={qrGray} className="absolute inset-0 block size-full max-w-none" />
        </div>
        {/* 파란 QR: 스캔선과 같이 움직이는 마스크 아래로만 보임 */}
        <div
          className="pv-qr__blue absolute inset-[22.98%_23.65%_22.98%_22.86%]"
          style={{ maskImage: `url("${qrMask}")`, WebkitMaskImage: `url("${qrMask}")` }}
        >
          <img alt="" src={qrBlue} className="absolute inset-0 block size-full max-w-none" />
        </div>
        <div className="pv-qr__scan absolute bottom-[23.05%] left-1/2 top-[51.55%] w-[204px]">
          <div className="absolute inset-[14.54%_0_0_0]"><img alt="" src={scanGlow} className="absolute inset-0 block size-full max-w-none" /></div>
          <div className="absolute inset-[0_0_85.28%_0]"><img alt="" src={scanLine} className="absolute inset-0 block size-full max-w-none" /></div>
        </div>
      </div>
    </MotionStage>
  );
}
