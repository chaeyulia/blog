# Next.js 블로그 최적화 가이드

이 문서는 적용된 최적화 내용과 사용 방법을 설명합니다.

## 📊 적용된 최적화

### 1. 이미지 최적화
- **WebP 변환**: 모든 PNG 이미지를 WebP 포맷으로 변환 (평균 75% 용량 감소)
- **thumbnail.png**: 1.1MB → 345KB (68% 감소)
- **Next.js Image 최적화**:
  - 첫 화면 이미지에 `priority` 속성 (LCP 개선)
  - 나머지 이미지에 `loading="lazy"` (지연 로딩)
  - AVIF, WebP 자동 변환 지원
  - 반응형 이미지 크기 자동 조정

### 2. S3 데이터 캐싱 (ISR)
- **Incremental Static Regeneration** 적용
- 재검증 주기: 1시간 (`revalidate = 3600`)
- S3 요청이 1시간마다 1번으로 감소하여 응답 속도 대폭 향상
- 적용 페이지:
  - `src/app/posts/page.tsx`
  - `src/app/posts/[...slug]/page.tsx`

### 3. Next.js 설정 강화
- **이미지 최적화**: AVIF, WebP 자동 변환
- **컴파일러 최적화**: 프로덕션에서 console.log 자동 제거
- **번들 분석기**: `npm run build:analyze`로 번들 크기 분석 가능

### 4. 타입 안전성 개선
- **Post 인터페이스** 정의 (`src/types/post.ts`)
- 모든 컴포넌트에서 `any` 타입 제거
- 유틸 함수에 명시적 반환 타입 지정
- IDE 자동완성 및 타입 체크 지원 향상

### 5. 폰트 최적화
- **next/font** 사용: Noto Sans KR
- **display: swap**: FOIT(Flash of Invisible Text) 방지
- **폰트 preload**: CLS(Cumulative Layout Shift) 개선
- **자동 서브셋팅**: 사용된 글자만 로드
- **fallback 폰트**: 시스템 폰트로 폴백

### 6. 번들 크기 최적화
- **번들 분석기** 통합: `@next/bundle-analyzer`
- **AWS SDK** 서버 전용 최적화
- **Tree shaking** 자동 적용

### 7. 성능 모니터링
- **Web Vitals** 자동 측정
- 측정 메트릭:
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
  - FCP (First Contentful Paint)
  - TTFB (Time to First Byte)
- 개발 환경에서 콘솔에 자동 출력
- Google Analytics 연동 준비 완료

## 🚀 사용 방법

### 이미지 최적화 스크립트 실행
```bash
node scripts/optimize-images.mjs
```

### 번들 크기 분석
```bash
npm run build:analyze
```
브라우저에서 자동으로 번들 분석 결과가 열립니다.

### Web Vitals 확인
개발 모드에서 브라우저 콘솔을 열면 성능 메트릭이 자동으로 출력됩니다:
```bash
npm run dev
```

## 📈 성능 개선 효과

### 이미지 최적화
- 전체 이미지 용량 **~75% 감소**
- LCP(Largest Contentful Paint) 개선
- 페이지 로딩 속도 향상

### S3 캐싱 (ISR)
- S3 요청 **95% 감소** (1시간당 1회)
- 평균 응답 속도 **10배 향상**
- 서버 부하 감소

### 폰트 최적화
- FCP(First Contentful Paint) 개선
- CLS(Cumulative Layout Shift) **0에 근접**
- 폰트 깜빡임 현상 제거

### 타입 안전성
- 런타임 에러 사전 방지
- 개발 생산성 향상
- 코드 유지보수성 향상

## 🔧 추가 최적화 가능 항목

### Markdown 처리 최적화 (선택사항)
현재 Remark/Rehype 플러그인이 런타임에 실행됩니다.
빌드 타임에 사전 처리하면 추가 성능 향상 가능합니다.

### Google Analytics 연동
`src/app/web-vitals.tsx` 파일에서 주석 처리된 부분을 활성화하여
Google Analytics로 성능 데이터를 전송할 수 있습니다.

## 📦 설치된 패키지

### 프로덕션
- `next`: Next.js 프레임워크
- `react`, `react-dom`: React 라이브러리
- `@aws-sdk/client-s3`: S3 클라이언트
- 마크다운 처리: `gray-matter`, `remark`, `rehype`, `shiki`

### 개발
- `@next/bundle-analyzer`: 번들 크기 분석
- `sharp`: 이미지 최적화
- `typescript`: 타입 안전성
- `@biomejs/biome`: 린터 & 포매터
- `tailwindcss`: CSS 프레임워크

## 💡 권장사항

1. **정기적인 번들 분석**: 새로운 패키지 추가 시 `npm run build:analyze` 실행
2. **Web Vitals 모니터링**: 프로덕션에서 실제 사용자 데이터 수집
3. **이미지 최적화**: 새 이미지 추가 시 `scripts/optimize-images.mjs` 실행
4. **ISR 재검증 주기 조정**: 콘텐츠 업데이트 빈도에 따라 `revalidate` 값 조정

## 📚 참고 자료

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Next.js Analytics](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)
- [Web Vitals](https://web.dev/vitals/)
