import React, { useState, useCallback } from "react";
import styled from "styled-components";

const FlipImageContainer = styled.div`
  width: 180px;
  height: 180px;
  perspective: 1000px;
`;

const FlipInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  cursor: pointer;
  transform: ${(props) => (props.$isFlipped ? "rotateY(180deg)" : "rotateY(0deg)")};
`;

const FlipFace = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  object-fit: contain;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
`;

const FrontFace = styled(FlipFace)`
  background-color: white;
`;

const BackFace = styled(FlipFace)`
  transform: rotateY(180deg);
  background-color: white;
`;

const FlipButton = styled.button`
  margin-top: 16px;
  padding: 8px 20px;
  border: none;
  border-radius: 8px;
  background-color: #6366f1; /* indigo-500 */
  color: white;
  cursor: pointer;
  font-weight: 700;
  user-select: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4f46e5; /* indigo-600 */
  }
`;

function FlipCard({ frontSrc, backSrc, alt }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const toggleFlip = useCallback(() => setIsFlipped((prev) => !prev), []);

  // 이미지 로딩 완료 시 호출
  const handleImageLoad = useCallback(() => setIsImageLoading(false), []);

  console.log("FlipCard 렌더링", alt);

  return (
    <div>
      <FlipImageContainer onClick={toggleFlip} aria-label="포켓몬 이미지 뒤집기">
        {isImageLoading && (
          <div
            style={{
              width: "180px",
              height: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "#666",
              backgroundColor: "#eee",
              borderRadius: "15px",
            }}
          >
            로딩 중...
          </div>
        )}
        <FlipInner $isFlipped={isFlipped} style={{ display: isImageLoading ? "none" : "block" }}>
          <FrontFace src={frontSrc} alt={alt + " 앞면"} onLoad={handleImageLoad} />
          <BackFace src={backSrc} alt={alt + " 뒷면"} onLoad={handleImageLoad} />
        </FlipInner>
      </FlipImageContainer>
      <FlipButton onClick={toggleFlip} type="button">
        {isFlipped ? "앞면 보기" : "뒷면 보기"}
      </FlipButton>
    </div>
  );
}

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(FlipCard);
