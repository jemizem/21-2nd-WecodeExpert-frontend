import { React, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function ExpertIntroduce() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Title>Expert 사용자로 전환하고 유료 상담을 진행해보세요!</Title>
      <Description>
        아래 버튼을 눌러, 신청서를 작성하신 후 톡톡을 연결하면 eXpert 사용자
        신청이 완료됩니다.
      </Description>
      <StepButtonBox>
        <StepButton active={true} to="/expert/join/type">
          <span>1. 신청서 작성하기</span>
        </StepButton>
        <StepBar></StepBar>
        <StepButton>
          <span>2. 톡톡 연결하기</span>
        </StepButton>
      </StepButtonBox>
      <InformationArea>
        <InfoTitle>신청 시작 전 확인해주세요.</InfoTitle>
        <ContentList>
          <ContentItem>
            신청 분야 및 자격 확인 후 필요 서류를 준비해 주세요.
          </ContentItem>
          <ContentItem>
            판매자 유형을 확인 후 필요 서류를 준비해 주세요.
          </ContentItem>
        </ContentList>
      </InformationArea>

      <InformationArea>
        <InfoTitle>주의사항</InfoTitle>
        <ContentList>
          <ContentItem>
            매월 1~3일은 시스템 점검 기간으로 해당 기간 동안 전환 신청 승인이
            지연될 수 있습ㄴ지다.
          </ContentItem>
          <ContentItem>
            이메일로 신청 결과를 알려드리니 해당 메일을 확인해 주세요.
          </ContentItem>
          <ContentItem>
            단계 별로 '다음' 버튼 클릭 시, 뒤로 가기 및 수정이 되지않으니 작성
            내용을 잘 확인해주세요.
          </ContentItem>
        </ContentList>
      </InformationArea>
    </Container>
  );
}
const Container = styled.div`
  padding: 100px 0;
`;

const Title = styled.p`
  color: #4a65f6;
  font-size: 30px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
`;

const Description = styled.p`
  margin-top: 13px;
  color: #4c4c4c;
  font-size: 15px;
  text-align: center;
  line-height: 24px;
`;

const StepButtonBox = styled.div`
  margin-top: 37px;
  text-align: center;
`;

const StepButton = styled(Link)`
  display: inline-block;
  width: 260px;
  height: 80px;
  border-radius: 40px;
  box-shadow: 0 12px 10px -10px #4a65f6;
  line-height: 80px;
  ${props => {
    if (props.active) {
      return `
          background-color: #4a65f6;
          
          span {
            color : #fff;
            font-size: 18px;
            vertical-align: middle;
            cursor: pointer;
          }`;
    } else {
      return `
          background-color: #f1f5ff;
          box-sizing: border-box;
          border: 1px solid rgba(126,150,255,0.3);
          
          span {
            color : rgba(126,150,255,0.3);
          }`;
    }
  }}
`;

const StepBar = styled.span`
  display: inline-block;
  margin-top: 39px;
  width: 38px;
  height: 1px;
  background-color: rgba(126, 150, 255, 0.2);
  vertical-align: top;
`;

const InformationArea = styled.div`
  width: 1160px;
  margin: 90px auto 0;
`;

const InfoTitle = styled.span`
  font-size: 18px;
  color: #000;
`;

const ContentList = styled.ul`
  margin-top: 18px;
  padding: 30px;
  background-color: #fff;
  border: 1px solid rgba(126, 150, 255, 0.2);
  border-radius: 20px;
`;

const ContentItem = styled.li`
  position: relative;
  padding-left: 15px;
  line-height: 29px;

  &::before {
    position: absolute;
    top: 11px;
    left: 0;
    width: 3px;
    height: 3px;
    background-color: #4a65f6;
    border-radius: 3px;
    content: '';
  }
`;

export default ExpertIntroduce;
