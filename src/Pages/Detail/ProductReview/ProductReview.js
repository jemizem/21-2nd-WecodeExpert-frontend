import { React, useState, useEffect } from 'react';
import { getHiddenEmail } from '../../../Utils/helpers';
import styled from 'styled-components';
import { GET_PRODUCT_API } from '../../../config';

function ProductReview({ product }) {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // fetch(`${GET_PRODUCT_API}/${product.product_id}/review`)
    fetch('/21-2nd-WecodeExpert-frontend/data/ReviewData.json')
      .then(res => res.json())
      .then(data => setReviews(data.result));
  }, []);

  const paingReviews = reviews.slice(0, page * LIMIT);
  const totalPageNumber =
    parseInt(reviews.length / LIMIT) + (reviews.length % LIMIT === 0 ? 0 : 1);

  return (
    <Wrapper>
      <TitleArea>
        <TitleSection>
          <p>후기</p>
        </TitleSection>
        <ReviewInfoArea>
          <ReviewInfoItem>
            <ReviewInfoTitle>상품 후기수</ReviewInfoTitle>
            <ReviewInfoDesc>{reviews.length}</ReviewInfoDesc>
          </ReviewInfoItem>
          <ReviewInfoItem>
            <ReviewInfoTitle>상품 평균 별점</ReviewInfoTitle>
            <ReviewInfoDesc>
              {reviews.reduce((cur, item) => cur + item.star_rating, 0) /
                reviews.length || 0}
            </ReviewInfoDesc>
          </ReviewInfoItem>
        </ReviewInfoArea>
      </TitleArea>
      <ReviewListArea>
        {paingReviews?.map(review => {
          return (
            <ReviewItem key={review.review_id}>
              <ReviewItemPoint>
                <ReviewItemPointBar>
                  {STAR_POINT_ARRAY.map(point => {
                    return (
                      <ReviewItemPointStart
                        fill={review.star_rating >= point}
                        key={point}
                      >
                        <i className="fas fa-star"></i>
                      </ReviewItemPointStart>
                    );
                  })}
                </ReviewItemPointBar>
                <ReviewItemPointNumber>
                  {review.star_rating}
                </ReviewItemPointNumber>
              </ReviewItemPoint>
              <ReviewItemText>{review.content}</ReviewItemText>
              <ReviewItemStateBox>
                <ReviewItemStateBoxLeft>
                  <ReviewItemStateBoxItem>
                    {getHiddenEmail(review.user_email)}
                  </ReviewItemStateBoxItem>
                </ReviewItemStateBoxLeft>
              </ReviewItemStateBox>
            </ReviewItem>
          );
        })}
      </ReviewListArea>
      {page < totalPageNumber && (
        <ReviewPagenation>
          <PageLink onClick={() => setPage(page + 1)} to="#">
            <PageNumber>{page}</PageNumber>
            <PageNumber>/</PageNumber>
            <PageNumber>{totalPageNumber}</PageNumber>
            <PageMore></PageMore>
          </PageLink>
        </ReviewPagenation>
      )}
    </Wrapper>
  );
}

const LIMIT = 3;
const STAR_POINT_ARRAY = [1, 2, 3, 4, 5];

const Wrapper = styled.div`
  padding-bottom: 25px;
  background-color: #fafbff;
  overflow: hidden;
`;

const TitleArea = styled.div`
  position: relative;
  margin-bottom: 45px;
  padding: 36px 20px 0;
  height: 135px;
  background-color: rgb(126, 146, 255);
  box-sizing: border-box;
`;

const TitleSection = styled.div`
  p {
    position: relative;
    color: #fff;
    font-size: 1.5em;
    font-weight: bold;
    line-height: 2.4rem;
  }
`;

const ReviewInfoArea = styled.div`
  position: relative;
  display: flex;
  margin-top: 8px;
  padding: 20px 0;
  height: 105px;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid rgba(74, 101, 246, 0.1);
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 5%);
`;

const ReviewInfoItem = styled.div`
  flex-basis: 50%;
  border-left: 1px solid rgba(126, 150, 255, 0.2);
  text-align: center;
`;

const ReviewInfoTitle = styled.p`
  margin-top: 6px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 13px;
  line-height: 16px;
`;

const ReviewInfoDesc = styled.p`
  margin-top: 5px;
  font-size: 24px;
  font-weight: bold;
  line-height: 28px;
`;

const ReviewListArea = styled.div`
  padding: 24px;
`;

const ReviewItem = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(225, 233, 255, 0.5);
  word-break: break-word;
  word-wrap: break-word;
`;

const ReviewItemPoint = styled.div`
  display: flex;
  line-height: 18px;
`;

const ReviewItemPointBar = styled.div`
  position: relaice;
  display: flex;
`;

const ReviewItemPointStart = styled.span`
  i {
    ${props => {
      if (props.fill) {
        return `color: rgb(74, 101, 246);`;
      } else {
        return `color: rgba(74, 101, 246, 0.15);`;
      }
    }}
    padding: 0 1px;
  }
`;

const ReviewItemPointNumber = styled.div`
  margin-left: 4px;
  color: #000;
  font-size: 18px;
  font-weigth: bold;
`;

const ReviewItemText = styled.p`
  margin-top: 8px;
  color: #333;
  font-size: 15px;
  line-heigth: 22px;
`;

const ReviewItemStateBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  max-width: 100%;
  font-size: 13px;
  line-height: 16px;
`;

const ReviewItemStateBoxLeft = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  mat-width: 100%;
`;

const ReviewItemStateBoxItem = styled.div`
  flex: 1;
  color: #8c8c8c;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${props => {
    if (props.stick) {
      return `
        position: relative;
        margin-left: 14px;
        padding-left: 14px;
        vertical-align: top;
      
        &::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 11px;
          top: 50%;
          transform: translateY(-50%);
          background-color: #cdcdcd;
        }`;
    }
  }}
`;

const ReviewPagenation = styled.div`
  margin-top: 25px;
`;

const PageLink = styled.a`
  display: block;
  margin: 0 auto;
  padding: 13px 0;
  width: 110px;
  background-color: #fff;
  border: solid 1px rgba(107, 108, 128, 0.1);
  box-shadow: 0 4px 8px 0 rgba(157 167 195 / 10%);
  border-radius: 23px;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
`;

const PageNumber = styled.span`
  padding: 0 3px;
`;

const PageMore = styled.span`
  display: inline-block;
  position: relative;
  margin: 6px 0 0 8px;
  width: 15px;
  height: 7px;
  font-size: 0;
  line-height: 0;
  vertical-align: top;
  overflow: hidden;

  &::before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    margin-top: -3px;
    border: 1px solid #4c4c4c;
    border-width: 0 1px 1px 0;
    transform: translate(-50%, -50%) scale(1, 0.93333) rotate(45deg);
    content: '';
  }
`;

export default ProductReview;
