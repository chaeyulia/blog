"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // 프로덕션 환경에서는 분석 서비스로 전송
    // 개발 환경에서는 콘솔에 출력
    if (process.env.NODE_ENV === "development") {
      console.log(metric);
    }

    // 여기에 Google Analytics, Vercel Analytics 등으로 전송 가능
    // window.gtag?.('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   metric_id: metric.id,
    //   metric_value: metric.value,
    //   metric_delta: metric.delta,
    // });
  });

  return null;
}
