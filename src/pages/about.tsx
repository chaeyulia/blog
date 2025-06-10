import React from "react";
import { Link } from "gatsby";

const AboutMePage = () => (
  <main className="container flex items-center justify-center">
    <div className="relative w-[60vw] min-w-[250px] max-w-[620px] bg-white p-8 shadow-sm">
      <div className="tape" />
      <p>
        안녕하세요! 풀스택 개발자를 목표로 하는 <strong>채지원(Julia)</strong>
        입니다.
      </p>
      <p>
        이 블로그는 제가 공부하면서 개인적으로 정리한 내용을 기록하고, 이 내용을
        다른 분들과 공유하고 싶어서 만들게 되었어요.
      </p>
      <p>
        제가 작성한 글에 대해 궁금한 점이나 피드백이 있으시다면 편하게 댓글
        남겨주세요!
      </p>
      <p>봐주셔서 감사합니다, 오늘도 행복하세요 ☘️</p>
      <p>제가 더 궁금하시다면 아래 링크를 참고해주세요! ૮(˙∇˙⁎ ૮)</p>

      <div className="flex gap-4 justify-center">
        <Link to="/resume">🌱 이력서</Link>

        <Link to="/portfolio">💻 포트폴리오</Link>
      </div>
    </div>
  </main>
);

export default AboutMePage;
