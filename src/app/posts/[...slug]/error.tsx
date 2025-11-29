"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-screen flex gingham p-4">
      <div className="container max-w-[600px] h-max m-auto p-8 border rounded-4xl flex flex-col items-center justify-center gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
            포스트를 불러올 수 없습니다
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {error.message || "일시적인 오류가 발생했습니다."}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="px-6 py-2 bg-cBlue text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            다시 시도
          </button>
          <a
            href="/posts"
            className="px-6 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            포스트 목록으로
          </a>
        </div>
      </div>
    </div>
  );
}
