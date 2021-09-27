import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BannerSlider from './BannerSlider/BannerSlider';
import SwipeToSlide from './SwipeToSlide/SwipeToSlide';
// import { GET_PRODUCT_API } from '../../config';

function Main() {
  const [bestseller, setBestseller] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 카테고리 Mock Data
    fetch('/21-2nd-WecodeExpert-frontend/data/categoryData.json')
      .then(res => res.json())
      .then(data => setCategories(data.results));

    // 구매율이 높은 인기상품
    //fetch(`${GET_PRODUCT_API}?sort=sell_count&limit=10`)
    fetch('/21-2nd-WecodeExpert-frontend/data/bestItemData.json')
      .then(res => res.json())
      .then(data => setBestseller(data.result));
  }, []);

  return (
    <Container>
      <BannerSlider />
      <CategoryList>
        {categories.map(cate => {
          return (
            <CategoryItem key={cate.name}>
              <Link to={cate.url}>
                <img alt={cate.name} src={cate.image} />
                <div>{cate.name}</div>
              </Link>
            </CategoryItem>
          );
        })}
      </CategoryList>

      <BestSellerSection>
        <BestSellerWrapper>
          <SectionTitle>
            <em>구매율이 높은</em> 인기 상담 상품
          </SectionTitle>
          <SlideContainer>
            <SwipeToSlide>
              {bestseller?.map(item => {
                return (
                  <BestSellerItem key={item.product_id}>
                    <CardItem>
                      <Link to={`/detail/${item.product_id}`}>
                        <CardItemTitle>
                          <strong>{item.title}</strong>
                        </CardItemTitle>
                        <CardItemContet>
                          <em>{item.content}</em>
                        </CardItemContet>
                      </Link>
                      <Link to={`/detail/${item.product_id}`}>
                        <ProfileBox>
                          <ProfileThumb src={item.expert_image} size="30px" />
                          <ProfileInfoArea>
                            <ProfileInfoSpan>
                              {item.expert_name} {item.expert_type}
                            </ProfileInfoSpan>
                            <ProfileInfoSpan before={true}>
                              {item.category_name}
                            </ProfileInfoSpan>
                          </ProfileInfoArea>
                          <i className="fas fa-arrow-circle-right"></i>
                        </ProfileBox>
                      </Link>
                    </CardItem>
                  </BestSellerItem>
                );
              })}
            </SwipeToSlide>
          </SlideContainer>
        </BestSellerWrapper>
      </BestSellerSection>

      <ExpertInformation>
        <InformationSection>
          <InformationTitle>엑스퍼트 활동을 시작하세요!</InformationTitle>
          <InformationDesc>
            나의 전문 지식을 나누고, 의미있는 수익을 창출하세요!
          </InformationDesc>
        </InformationSection>
        <InformationList>
          <a href="https://expert.naver.com/expert/introduction" target="blank">
            <InformationItem imageUrl="https://ssl.pstatic.net/static/kin/section/expert/m/startExpert.svg">
              <strong>
                엑스퍼트란
                <br />
                무엇인가요?
              </strong>
            </InformationItem>
          </a>
          <Link to="#">
            <InformationItem imageUrl="https://ssl.pstatic.net/static/kin/section/expert/m/startExpert.svg">
              <strong>
                엑스퍼트
                <br />
                인터뷰
              </strong>
            </InformationItem>
          </Link>
          <Link to="#">
            <InformationItem imageUrl="https://ssl.pstatic.net/static/kin/section/expert/m/startCertificate.svg">
              <strong>
                자격 조건이
                <br />
                궁금해요!
              </strong>
            </InformationItem>
          </Link>
          <Link to="/expert/join">
            <InformationItem imageUrl="https://ssl.pstatic.net/static/kin/section/expert/m/startCompany.svg">
              <strong>
                엑스퍼트
                <br />
                가입신청하기
              </strong>
            </InformationItem>
          </Link>
        </InformationList>
      </ExpertInformation>
    </Container>
  );
}

const ProfileThumb = styled.div.attrs(props => ({
  image: props.src,
  size: props.size || '30px',
}))`
  position: relative;
  margin-right: 6px;
  width: ${props => props.size};
  height: ${props => props.size};
  background-image: url(${props => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
`;

const Container = styled.div`
  margin: 0 auto;
  overflow: hidden;
`;

const CategoryList = styled.div`
  display: flex;
  padding: 40px 0;
  margin: 0 auto;
  max-width: 1280px;
`;

const CategoryItem = styled.div`
  width: 100%;
  text-align: center;

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: #000;

    img {
      align-self: center;
      display: block;
      width: 50px;
      height: 100%;
    }

    div {
      padding: 2px;
      font-size: 14px;
      font-weight: 500;
      line-height: 19px;
      text-transform: uppercase;
    }
  }
`;

const BestSellerSection = styled.div`
  position: relative;
  padding: 50px 0px;
  background-color: #f8f9fd;
`;

const BestSellerWrapper = styled.div`
  margin: 0 auto;
  max-width: 1280px;
`;

const SectionTitle = styled.div`
  display: inline-block;
  font-size: 1.5em;
  font-weight: bold;
  letter-spacing: -0.5px;
  vertical-align: top;

  em {
    position: relative;
    display: inline-block;
    color: #4a65f6;
    font-weight: 900;
    vertical-align: top;

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 6px;
      background-color: rgba(74, 101, 246, 0.3);
      content: '';
    }
  }
`;

const SlideContainer = styled.div`
  margin: 20px -12px;
`;

const BestSellerItem = styled.div`
  position: relative;
  padding: 0 12px;
  margin: 0 auto;
  width: 306px;
  box-sizing: border-box;

  a {
    display: block;
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

const CardItem = styled.div`
  background-color: #fff;
  border: 1px solid rgba(111, 138, 255, 0.15);
  border-radius: 5px;
  overflow: hidden;
`;

const CardItemTitle = styled.div`
  position: relative;
  padding: 15px;
  box-sizing: border-box;
  background-image: url(https://ssl.pstatic.net/static/kin/section/expert/m/bgCardSquare.png);
  bacground-size: 188px auto;
  background-color: rgb(121, 146, 255);

  strong {
    position: relative;
    display: block;
    height: 75px;
    color: #fff;
    font-size: 19px;
    font-weight: 600;
    line-height: 25px;
    overflow: hidden;
  }
`;

const CardItemContet = styled.div`
  padding: 12px 15px;

  em {
    display: block;
    height: 42px;
    color: #4c4c4c;
    font-size: 15px;
    line-height: 21px;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const ProfileBox = styled.div`
  align-items: center;
  position: relative;
  display: flex;
  padding: 12px 15px;
  width: 100%;

  &::before {
    position: absolute;
    top: 0;
    left: 15px;
    right: 15px;
    height: 1px;
    background-color: rgba(156, 174, 228, 0.1);
    content: '';
  }
`;

const ProfileInfoArea = styled.div`
  flex: 1;
  display: flex;
  color: #8c8c8c;
  font-size: 14px;
  line-height: 20px;
  overflow: hidden;
`;

const ProfileInfoSpan = styled.span`
 ${props => {
   if (props.before) {
     return `
       flex: none;

       ::before {
         display: inline-block;
         margin: 9px 4px 0;
         width: 2px;
         height: 2px;
         background-color: #939393;
         border-radius: 50%;
         vertical-align: top;
         content: '';
       }
     `;
   }
 }} }
`;

const ExpertInformation = styled.div`
  padding-top: 60px;
  margin: 0 auto;
  max-width: 1280px;
`;

const InformationSection = styled.div`
  padding: 20px 10px;
  box-sizing: border-box;
  color: #4a65f6;
  text-align: center;
`;

const InformationTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: -0.5px;
`;

const InformationDesc = styled.p`
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 2.6rem;
  letter-spacing: -0.5px;
`;

const InformationList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  padding-bottom: 20px;

  a {
    display: block;
    color: #000;
    text-decoration: none;
  }
`;

const InformationItem = styled.div`
  position: relative;
  padding-top: 100%;
  background-color: #4a65f6;
  border-radius: 5px;

  strong {
    position: absolute;
    top: 1.5rem;
    left: 1.3rem;
    color: #fff;
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.4rem;
  }

  &::after {
    position: absolute;
    top: 40%;
    bottom: 0;
    left: 22px;
    right: 22px;
    width: auto;
    height: auto;
    background: url(${props => props.imageUrl}) no-repeat top center;
    background-size: 100% auto;
    content: '';
  }
`;

export default Main;
