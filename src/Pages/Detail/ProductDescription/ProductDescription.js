import { React, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function ProductDescription({ product }) {
  const [isShowMoreContent, setIsShowMoreContent] = useState(true);
  const contentViewer = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (contentViewer.current.clientHeight > 100) {
      setIsShowMoreContent(false);
    }
  }, [contentViewer.current]);

  return (
    <Wrapper>
      <Description isShowMoreContent={isShowMoreContent}>
        <DescTitle>
          <p>상세 설명</p>
        </DescTitle>
        <div>
          <ContentViewer>
            <div ref={contentViewer}>
              {product?.content?.split('\n').map((line, i) => (
                <div key={i}>
                  {line}
                  <br />
                </div>
              ))}
            </div>
          </ContentViewer>
          <ExpertTagSection></ExpertTagSection>
        </div>
        {!isShowMoreContent && (
          <MoreContentButtonArea>
            <MoreContentButton onClick={() => setIsShowMoreContent(true)}>
              <strong>상세설명 펼치기</strong>
              <i className="fas fa-arrow-circle-down"></i>
            </MoreContentButton>
          </MoreContentButtonArea>
        )}
      </Description>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow: hidden;
`;

const Description = styled.div`
  position: relative;
  margin-top: 60px;
  box-sizing: border-box;
  overflow: hidden;
  ${props => {
    if (!props.isShowMoreContent) {
      return `max-height: 600px`;
    }
  }}
`;

const DescTitle = styled.div`
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2.4rem;
`;

const ContentViewer = styled.div`
  padding: 30px 0 30px;
  font-size: initial;
  font: revert;
  line-height: 28px;
  word-wrap: break-word;
  word-break: break-all;
`;

const ExpertTagSection = styled.div`
  margin: 0 atuo;
  padding: 0 20px 22px;
  padding: 0 40px;
  max-width: 1280px;
`;

const MoreContentButtonArea = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 86px 0 0;
  width: 100%;
  height: 136px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    #fff 57%
  );
  box-sizing: border-box;
  z-index: 1;
`;

const MoreContentButton = styled.a`
  display: inline-flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: rgba(126, 150, 255, 0.04);
  box-sizing: border-box;
  border: 1px solid rgba(126, 150, 255, 0.15);
  border-radius: 16px;
  font-size: 15px;
  color: #7e96ff;
`;

export default ProductDescription;
