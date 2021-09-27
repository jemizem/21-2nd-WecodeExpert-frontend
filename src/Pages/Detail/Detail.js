import { React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FixableTabMenu from '../../Components/FixableTabMenu/FixableTabMenu';
import ProductDescription from './ProductDescription/ProductDescription';
import ProductReview from './ProductReview/ProductReview';
import { GET_PRODUCT_API } from '../../config';

function Detail({ location, match }) {
  const [product, setProduct] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const tabScroll = useRef();

  useEffect(() => {
    // 상품 Mock Data
    // fetch(`${GET_PRODUCT_API}/${match.params.id}`)
    fetch('/21-2nd-WecodeExpert-frontend/data/ProductData.json')
      .then(res => res.json())
      .then(data => setProduct(data.result));
  }, []);

  // Tab 변경 Event
  useEffect(() => {
    tabScroll.current.focus();
  }, [tabIndex]);

  return (
    <Container>
      <ContentWrap>
        <ContentLeft>
          <Wrapper>
            <ProductCover>
              <ProductInner>
                <ProductInnerBox>
                  <ProductInnerTitle>{product.title}</ProductInnerTitle>
                  <ProductInnerInfo>
                    <Link>{product.expert_name}</Link>
                    <WithMentorType>{product.expert_type}</WithMentorType>
                  </ProductInnerInfo>
                </ProductInnerBox>
                <ProductNoticeBox>
                  <ProductNoticeTitle>
                    상품 이용에 관한 중요한 안내
                  </ProductNoticeTitle>
                  <ProductNoticeList>
                    <li>실제 상담 시작은 상호 협의하에 진행됩니다.</li>
                  </ProductNoticeList>
                </ProductNoticeBox>
              </ProductInner>
            </ProductCover>

            <FixableTabMenu
              tabList={['상세정보', '후기']}
              tabIndex={tabIndex}
              setTabIndex={setTabIndex}
              top={58}
            />
            <div ref={tabScroll}></div>
            {tabIndex === 0 && <ProductDescription product={product} />}
            {tabIndex === 1 && <ProductReview product={product} />}

            <FoldListGroup>
              <FoldItem>
                <TitleSectionMore>
                  <TitleText>
                    <span>판매자 정보</span>
                  </TitleText>
                </TitleSectionMore>
                <FoldItemInner>
                  <EtcInfoList>
                    <EtcInfoListItem>
                      <EtcInfoListTitle>이름</EtcInfoListTitle>
                      <EtcInfoListText>{product.expert_name}</EtcInfoListText>
                    </EtcInfoListItem>
                    <EtcInfoListItem>
                      <EtcInfoListTitle>메일</EtcInfoListTitle>
                      <EtcInfoListText>{product.email}</EtcInfoListText>
                    </EtcInfoListItem>

                    <EtcInfoListItem>
                      <EtcInfoListTitle>고객센터</EtcInfoListTitle>
                      <EtcInfoListText>{product.phone_number}</EtcInfoListText>
                    </EtcInfoListItem>
                    <EtcInfoListItem>
                      <EtcInfoListTitle>사업장 주소</EtcInfoListTitle>
                      <EtcInfoListText>{product.address}</EtcInfoListText>
                    </EtcInfoListItem>
                  </EtcInfoList>
                </FoldItemInner>
              </FoldItem>
            </FoldListGroup>
          </Wrapper>
        </ContentLeft>

        <ContentRight>
          <InnerGrid>
            <ProductPriceArea>
              <ProductPrice>
                <strong>{product.price?.toLocaleString()}</strong>원
              </ProductPrice>
              <ProductCountInfoArea>
                <Link>
                  <ProductCountNumber>
                    총 {product.sell_count}회 상담
                  </ProductCountNumber>
                  <i className="fas fa-chevron-right"></i>
                </Link>
              </ProductCountInfoArea>
            </ProductPriceArea>
            <BasicInformation>
              <ProductOffering>
                <ProductOfferingTitle>기본 정보</ProductOfferingTitle>
                <div>
                  <ProductOfferingItem>
                    <i className="far fa-calendar-alt"></i>
                    <ProductOfferingInfoArea>
                      <ProductOfferingInfoTitle>
                        최대 작업 소요 <em>1일</em>
                      </ProductOfferingInfoTitle>
                    </ProductOfferingInfoArea>
                  </ProductOfferingItem>
                  <ProductOfferingItem>
                    <i className="fas fa-pencil-alt"></i>
                    <ProductOfferingInfoArea>
                      <ProductOfferingInfoTitle>
                        무료 수정 <em>2회</em>
                      </ProductOfferingInfoTitle>
                    </ProductOfferingInfoArea>
                  </ProductOfferingItem>

                  <ProductOfferingItem>
                    <i className="fas fa-user-check"></i>
                    <ProductOfferingInfoArea>
                      <ProductOfferingInfoTitle>
                        대화 방법
                      </ProductOfferingInfoTitle>
                      <ProductOfferingInfoText>
                        1:1 채팅, 음성 통화, 영상 통화 가능
                      </ProductOfferingInfoText>
                    </ProductOfferingInfoArea>
                  </ProductOfferingItem>
                  <ProductOfferingItem>
                    <i className="fas fa-paste"></i>
                    <ProductOfferingInfoArea>
                      <ProductOfferingInfoTitle>
                        수정 제공
                      </ProductOfferingInfoTitle>
                      <ProductOfferingInfoText>
                        제공 받은 소스코드에 오류가 있는 경우 2회 수정 무상
                        지원해 드립니다.
                      </ProductOfferingInfoText>
                    </ProductOfferingInfoArea>
                  </ProductOfferingItem>
                </div>
              </ProductOffering>
              <LinkArea>
                <Link to="#">
                  구매하기<i className="fas fa-arrow-circle-right"></i>
                </Link>
              </LinkArea>
            </BasicInformation>
          </InnerGrid>

          <MentorProfile>
            <MentorProfileInfoArea>
              <strong>
                {product.expert_name} {product.expert_type}
              </strong>
              <p>{product.introduce}</p>
            </MentorProfileInfoArea>
            <MentorProfileThumbnail
              to="#"
              image={product.expert_image}
            ></MentorProfileThumbnail>
            <MentorCareerArea>
              <Link to="#">프로필 보기</Link>
            </MentorCareerArea>
          </MentorProfile>
        </ContentRight>
      </ContentWrap>
      <ProductRecommend></ProductRecommend>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1280px;
  overflow: hidden;
`;

const ContentLeft = styled.section`
  flex: 1;
  max-width: 816px;
`;

const ContentRight = styled.section`
  flex-shrink: 0;
  padding-left: 24px;
  width: 399px;
`;

const ContentWrap = styled.div`
  display: flex;
  padding: 24px 40px 0;
  width: 100%;
`;

const InnerGrid = styled.div`
  position: relative;
  border: 1px solid rgba(111, 138, 255, 0.15);
  border-radius: 5px;
  box-shadow: 0 10px 10px 0 rgb(111 138 255 / 10%);
`;

const Wrapper = styled.div`
  overflow: hidden;
`;

const ProductCover = styled.div`
  margin-bottom: 40px;
`;

const ProductInner = styled.div`
  position: relative;
  background-color: rgba(149, 182, 227, 1);
  background-image: url(https://ssl.pstatic.net/static/kin/section/expert/m/bgCardTriangle.png);
  background-size: contain;
  border-radius: 5px;
`;

const ProductInnerBox = styled.div`
  position: relative;
  padding: 24px 20px;
`;

const ProductInnerTitle = styled.p`
  color: #fff;
  font-size: 28px;
  font-weight: 800;
  line-height: 42px;
  word-break: break-all;
  word-wrap: break-word;

  &:first-child {
    padding-top: 34px;
  }
`;

const ProductInnerInfo = styled.div`
  margin-top: 8px;
  font-size: 15px;
  line-height: 22px;

  a {
    display: inline-block;
    max-width: 100%;
    color: rgba(255, 255, 255, 0.8);
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
    overflow: hidden;
  }
`;

const WithMentorType = styled.div`
  display: inline-block;
  max-width: 100%;
  color: rgba(255, 255, 255, 0.8);
  verical-align: top;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &::before {
    display: inline-block;
    margin: 9px 6px 0;
    width: 3px;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    vertical-align: top;
    content: '';
  }
`;

const ProductNoticeBox = styled(ProductInnerBox)`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
`;

const ProductNoticeTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
`;

const ProductNoticeList = styled.ul`
  margin-top: 12px;

  li {
    position: relative;
    padding-left: 11px;
    font-size: 14px;
    line-height: 18px;

    &::before {
      position: absolute;
      top: -3px;
      left: 1px;
      width: 2px;
      height: 2px;
      color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;
      content: '.';
    }
  }
`;

const ProductRecommend = styled.div`
  background-color: #f4f7ff;
  overflow: hidden;
`;

const FoldListGroup = styled.div`
  padding: 60px 0;
  max-width: 1280px;
  margin: 0 auto;
`;

const FoldItem = styled.div``;

const TitleSectionMore = styled.div`
  position: relative;
  display: block;
  padding: 17px 0 7px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 2px solid #000;
  text-align: left;
`;

const TitleText = styled.div`
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: bold;

  span {
    position: relative;
  }

  &::after {
    display: block;
    content: '';
  }
`;

const FoldItemInner = styled.div`
  display: block;
  padding: 20px 0 17px;
  padding-bottom: 47px;
  word-break: break-all;
`;

const EtcInfoList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const EtcInfoListItem = styled.li`
  display: flex;
  width: 50%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const EtcInfoSpan = styled.span`
  display: block;
  padding: 14px 15px;
  font-size: 14px;
  line-height: 20px;
`;

const EtcInfoListTitle = styled(EtcInfoSpan)`
  width: 150px;
  background-color: #f6f7fc;
  box-sizing: border-box;
  word-break: keep-all;
`;

const EtcInfoListText = styled(EtcInfoSpan)`
  flex: 1;
  color: #4c4c4c;
`;

/* Right */
const ProductPriceArea = styled.div`
  margin: 0 20px;
  padding: 24px 0;
  border-bottom: 1px solid #eceffe;
`;

const ProductPrice = styled.div`
  padding-right: 30px;
  height: 34px;
  font-size: 19px;
  line-height: 34px;

  strong {
    display: inline-block;
    margin-right: 1px;
    font-size: 28px;
    vertical-align: top;
  }
`;

const ProductCountInfoArea = styled.div`
  margin-top: 10px;

  a {
    display: inline-block;
    padding: 4px 8px;
    background-color: #f4f5fb;
    border-radius: 5px;
    color: #000;
    vertical-align: top;

    i {
      margin: 5px 0 0 5px;
      color: #a4b1f9;
      font-size: 5px;
    }
  }
`;

const ProductCountNumber = styled.span`
  display: inline-block;
  color: #8c8c8c;
  font-size: 13px;
  line-height: 20px;
  vertical-align: top;
`;

const BasicInformation = styled.div`
  padding: 4px 20px 24px;
`;

const ProductOffering = styled.div`
  padding: 20px 0;
  background-color: #fff;
`;

const ProductOfferingTitle = styled.div`
  display: block;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
`;

const ProductOfferingItem = styled.div`
  display: flex;
  margin-top: 18px;
  width: 100%;

  i {
    flex: none;
    margin-right: 16px;
    font-size: 22px;
    width: 24px;
  }
`;

const ProductOfferingInfoArea = styled.div`
  flex: 1;
`;

const ProductOfferingInfoTitle = styled.p`
  font-size: 15px;
  line-height: 20px;

  em {
    font-weight: bold;
  }
`;

const ProductOfferingInfoText = styled.p`
  margin-top: 4px;
  color: #666;
  font-size: 14px;
  line-height: 20px;
  word-break: break-all;
  word-wrap: break-word;
`;

const LinkArea = styled.div`
  padding-top: 4px;

  a {
    display: block;
    padding: 17px 6px;
    background-color: #4a65f6;
    box-sizing: border-box;
    border: 1px solid rgba(126, 150, 255, 0.15);
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    line-height: 20px;
    cursor: pointer;

    i {
      margin-left: 6px;
    }
  }
`;

const MentorProfile = styled.div`
  position: relative;
  margin-top: 15px;
  box-shadow: 0 10px 10px 0 rgb(111 138 255 / 10%);
  border: 1px solid rgba(111, 138, 255, 0.15);
  border-radius: 5px;
  overflow: hidden;
`;

const MentorProfileInfoArea = styled.div`
  position: relative;
  padding: 20px 120px 15px 20px;
  background-color: rgba(149, 141, 213);

  strong {
    position: relative;
    display: block;
    white-space: nowrap;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-overflow: ellipsis;
    line-height: 22px;
    overflow: hidden;
  }

  p {
    display: block;
    position: relative;
    margin-top: 5px;
    max-height: 32px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 13px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const MentorProfileThumbnail = styled.a`
  position: absolute;
  right: 20px;
  margin-top: -40px;
  width: 80px;
  height: 80px;
  background-position: center;
  background-image: url(${props => props.image});
  background-color: #eff1ee;
  background-size: cover;
  background-repear: no-reapeat;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;

  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    content: '';
  }
`;

const MentorCareerArea = styled.div`
  position: relative;
  padding: 15px 20px 20px;

  a {
    position: relative;
    display: inline-block;
    margin-top: 13px;
    padding: 8px 14px;
    background-color: rgba(74, 101, 246, 0.05);
    border-radius: 20px;
    color: #666;
    font-size: 14px;
    font-weight: bold;
    line-height: 20px;
    text-decoration: none;
    vertical-align: top;
    cursor: pointer;
  }
`;

export default Detail;
