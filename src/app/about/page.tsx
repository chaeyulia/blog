export default async function About() {
  return (
    <main className="gingham flex items-center justify-center w-screen h-screen overflow-hidden">
      <div className="relative container w-[70vw] min-w-[300px] max-w-[600px] p-8 shadow-sm m-0">
        <div className="content">
          <div className="tape" />
          <p>
            안녕하세요! 프론트엔드 개발자 <strong>채지원(Julia)</strong> 입니다.
          </p>
          <p>아름다운 웹 디자인에 관심이 많아요.</p>
          <p>
            제품을 만들 때 작은 디테일 하나하나까지 신경쓰는 것을 좋아합니다.
          </p>
          <p>
            <strong>치악산 복숭아</strong> 블로그는 제가 공부하면서 개인적으로
            정리한 내용을 기록하고, 이 내용을 다른 분들과 공유하고 싶어서 만들게
            되었어요.
          </p>
          <p>봐주셔서 감사합니다, 오늘도 행복하세요 ☘️</p>
        </div>
      </div>
    </main>
  );
}
