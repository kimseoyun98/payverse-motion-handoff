# 페이버스 홈페이지 모션 컴포넌트

사이트의 `/assets/animation/*.mp4` 영상 13개를 React 컴포넌트로 바꾼 코드입니다.
언어를 바꾸면 모션 속 문구도 같이 바뀌고, 배경이 투명하게 처리되어 영상보다 선명합니다.

- `main-hero.mp4`는 실사 영상이라 **그대로 둡니다.**
- 움직임 값은 Figma 원본(개발용 페이지 RESULT 섹션) 키프레임을 그대로 옮겼습니다.

## 적용 방법

1. `motions/` 폴더를 사이트 `src/` 아래에 그대로 복사합니다. (예: `src/motions/`)
2. 영상(`<video>`)을 쓰던 자리에 아래 표의 컴포넌트를 넣고, 문구는 i18n 값(`t(...)`)으로 넘깁니다.
3. 해당 mp4 파일은 더 이상 쓰지 않으므로 삭제해도 됩니다 (`main-hero.mp4` 제외).

### 따로 설치할 것 없음
- React + Tailwind v4 클래스 + CSS keyframes만 씁니다. 애니메이션 라이브러리는 쓰지 않습니다.
- 색·글꼴은 사이트에 이미 있는 SEED 변수(`--seed-color-*`, `--seed-font-family-sans`)를 씁니다. 일본어 화면에서는 `:lang(ja)` 글꼴이 그대로 적용됩니다.
- SVG는 `import x from './a.svg'` 형태(Vite 기본 기능)로 불러옵니다.

### 크기
- 컴포넌트는 **넣는 칸의 너비를 100% 채우고**, 높이는 비율에 맞춰 자동으로 정해집니다. 기존 `<video>`와 같은 칸에 넣으면 됩니다.
- 안쪽은 Figma 크기로 그린 뒤 비율만 줄이고 늘리므로(`_shared/MotionStage.tsx`), 크기 값을 따로 바꿀 필요가 없습니다.
- 모든 컴포넌트는 `className`을 받습니다.

### 접근성
- 장식용이라 스크린리더에서는 숨겨집니다.
- 기기에서 "움직임 줄이기"를 켜면 대표 장면에서 멈춘 화면으로 보입니다.

## 영상 → 컴포넌트 대응표

| 기존 영상 | 위치 | 컴포넌트 | 넘길 값 | 재생 (기본값) |
|---|---|---|---|---|
| `card-section-sb2.mp4` | 홈 카드 · 다국어 결제 버튼 | `card-multilang-pay/CardMultilangPay` | `start` = 현재 언어 (`'ko' \| 'en' \| 'ja'`) | 한 번 |
| `card-section-sb3.mp4` | 홈 카드 · 국기 낙하 | `flag-drop/FlagDrop` | `label` | 한 번 |
| `card-section-sb4.mp4` | 홈 카드 · 정산 목록 | `settlement-list/SettlementList` | `labels` = `{ settling, paidOut, settled }` | 한 번 |
| `card-section-sb5.mp4` | 홈 카드 · 연동 완료 | `connect-confetti/ConnectConfetti` | `label` | 한 번 |
| `payment-qr.mp4` | 홈 부가서비스 · QR결제 | `payment-qr/PaymentQr` | 없음 (글자 없음) | 한 번 |
| `payment-diy-checkout.mp4` | 홈 부가서비스 · DIY 결제창 | `payment-diy/PaymentDiy` | 없음 | 한 번 |
| `payment-subscription.mp4` | 홈 부가서비스 · 정기결제 | `payment-subscription/PaymentSubscription` | `days` = 요일 3개 배열 | 한 번 |
| `payment-link.mp4` | 홈 부가서비스 · 링크결제 | `payment-link/PaymentLink` | `sendLink`, `payLink`, `pay` | 한 번 |
| `feature-section-1.mp4` | PG Feature · 결제사 로고 | `payment-logo-marquee/PaymentLogoMarquee` | 없음 | 반복 |
| `feature-section-2.mp4` | PG Feature · 카드 UI | `card-swap/CardSwap` | `top`, `bottom` = `{ title, pay }` (아래 참고) | 반복 |
| `feature-section-3.mp4` | PG Feature · 통화 아이콘 | `settlement-currency/SettlementCurrency` | `label` | 반복 |
| `api-section-1.mp4` | PG API · 코드 + 결제창 | `api-code-pay/ApiCodePay` | 없음 (아래 참고) | 한 번 |
| `api-section-2.mp4` | PG API · 플러그인 설치 | `api-plugin-install/ApiPluginInstall` | `label` | 한 번 |

### 사용 예

```tsx
import FlagDrop from '@/motions/flag-drop/FlagDrop';
import SettlementList from '@/motions/settlement-list/SettlementList';

<FlagDrop label={t('home.card.amount')} />
<SettlementList labels={{ settling: t('...'), paidOut: t('...'), settled: t('...') }} />
<CardMultilangPay start={i18n.language as 'ko' | 'en' | 'ja'} />
```

## 재생 방식 (한 번 / 반복)

기존 영상과 똑같이 동작하도록 컴포넌트마다 기본값을 맞춰 두었습니다 (위 표 "재생" 열). 따로 넘기지 않아도 됩니다.

- **한 번**: 처음부터 한 번 재생하고 마지막 장면에서 멈춥니다. 다시 재생 신호가 오면 처음부터 다시 재생합니다.
- **반복**: 끊김 없이 무한 반복합니다.

| prop | 설명 |
|---|---|
| `loop` | `true` 반복 / `false` 한 번. 기본값을 바꾸고 싶을 때만 넘깁니다. |
| `play` | 한 번 재생 모드에서만 씁니다. `true`가 될 때마다 처음부터 재생, `false`면 첫 장면에서 대기합니다. 기존 영상에 `video.play()`를 하던 시점(예: 홈 카드가 앞으로 올라올 때)에 `true`로 넘기면 됩니다. |

`play`를 넘기지 않으면 컴포넌트가 화면에 50% 이상 보일 때 처음부터 재생하고, 화면을 벗어나면 첫 장면으로 돌아갑니다.

```tsx
// 홈 카드: 기존에 영상을 재생하던 조건을 그대로 play로
<FlagDrop label={t('motion.amount')} play={activeCard === 'sb3'} />
```

움직임 줄이기 설정(prefers-reduced-motion)에서는 재생하지 않고 정지 장면만 보여줍니다.

## 문구 목록 (i18n에 추가할 값)

> 영어·일본어는 컨플 번역시트에서 유관부서 확인을 마친 확정 문구입니다 (2026.11.17).

| 컴포넌트 · prop | KO | EN | JA |
|---|---|---|---|
| FlagDrop `label` | 결제 금액 | Amount | お支払い金額 |
| SettlementList `labels.settling` | 정산 중 | Settling | 精算処理中 |
| SettlementList `labels.paidOut` | 지급완료 | Paid out | お支払い完了 |
| SettlementList `labels.settled` | 정산완료 | Settled | 精算完了 |
| ConnectConfetti `label` | 연동하기 | Connect | 連携する |
| PaymentSubscription `days` | 월, 화, 수 | Mon, Tue, Wed | 月, 火, 水 |
| PaymentLink `sendLink` | 링크 발송 | Send link | リンクを送信 |
| PaymentLink `payLink` | 페이버스 결제 바로가기 | Pay with PayVerse | PayVerseでお支払い |
| PaymentLink `pay` | 결제하기 | Pay | お支払いへ進む |
| SettlementCurrency `label` | 최종 정산 금액 | Final settlement | ご請求金額 |
| ApiPluginInstall `label` | 설치하기 | Install | インストール |
| CardSwap 카드 `title` / `pay` | 카드정보 / 10,000원 결제 | Card Info / Pay $7.65 | カード情報 / ¥1,100 を支払う |

### 언어별로 넘기는 방식이 다른 것
- **CardMultilangPay**: 문구가 아니라 시작 언어만 넘깁니다. 현재 언어 버튼부터 보이기 시작합니다 (EN이면 ENGLISH부터).
- **CardSwap**: 앞뒤 카드 두 장의 문구를 넘깁니다.
  - KO: `top` = 한국어 카드, `bottom` = 영어 카드
  - EN: `top` = 영어 카드, `bottom` = 한국어 카드
  - JA: `top` = 일본어 카드, `bottom` = 영어 카드

## 참고 사항

- **api-section-1**: 코드 화면이 SVG 그림이라 언어를 바꿔도 그대로입니다.
- **api-section-2**: "설치하기" 버튼이 나왔다가 눌리고 사라진 뒤 로고가 나오는 연출은 Figma에 없고 코드에만 추가했습니다. 기존 영상의 ↓ 아이콘은 지금 Figma에 없어 빠졌습니다.
- **card-section-sb5**: 꽃가루 키프레임이 많아 CSS가 약 250KB(gzip 약 44KB)입니다. `connect-confetti.css`는 자동 생성 파일이라 직접 고치지 마세요.
- **payment-subscription**: 한 번 도는 시간이 Figma 기준(약 1.5초)이라 기존 영상(2.03초)보다 조금 빠릅니다.
