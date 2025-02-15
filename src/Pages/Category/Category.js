import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import CategoryCard from '../../Components/CategoryCard/CategoryCard';
import ExpertCard from '../../Components/ExpertCard/ExpertCard';
import FilterDropdown from '../../Components/FilterDropdown/FilterDropdown';

function Category(props) {
  const [categoryData, setCategoryData] = useState([]);
  const [expertData, setExpertData] = useState([]);
  const [chooseCardFilter, setChooseCardFilter] = useState(0);
  const [selectedSort, setSelectedSort] = useState('-sell_count');
  const [cardCount, setCardCount] = useState(12);
  const location = useLocation();

  const cardFilter =
    chooseCardFilter === 0 ? 'products?category' : 'products/expert?category';

  const makeBorderBottom = event => {
    setChooseCardFilter(event.target.value);
  };

  let category = fetch(
    `http://3.133.12.85:8000/products?category=${props.match.params.id}&sort=-sell_count`
  );
  let expert = fetch(
    `http://3.133.12.85:8000/products/expert?category=${props.match.params.id}`
  );

  const mapSetFunctionToIndex = {
    0: setCategoryData,
    1: setExpertData,
  };

  useEffect(() => {
    Promise.all([category, expert])
      .then(res => Promise.all(res.map(el => el.json())))
      .then(data => {
        data.forEach((element, index) => {
          const forFetcth = mapSetFunctionToIndex[index];
          forFetcth(element);
        });
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://3.133.12.85:8000/${cardFilter}=${props.match.params.id}&sort=${selectedSort}`
    )
      .then(res => res.json())
      .then(data => {
        chooseCardFilter === 0 ? setCategoryData(data) : setExpertData(data);
      });
  }, [selectedSort]);

  const plusCount = () => {
    setCardCount(cardCount + 4);
    fetchCard();
  };

  const fetchCard = () => {
    fetch(
      `http://3.133.12.85:8000/${cardFilter}=${props.match.params.id}&sort=${selectedSort}&page_size=${cardCount}`
    )
      .then(res => res.json())
      .then(data => {
        chooseCardFilter === 0 ? setCategoryData(data) : setExpertData(data);
      });
  };

  return (
    <>
      <HeaderDiv>
        <Title>{CATEGORY[location.pathname.split('/')[2]]}</Title>
        <FilterTap>
          {TOP_FILTER_LIST.map((items, i) => {
            return (
              <FilterItems
                key={i}
                value={i}
                onClick={makeBorderBottom}
                style={{
                  borderBottom: `${
                    chooseCardFilter === i ? '2px solid #4b65f6' : ''
                  }`,
                  color: `${chooseCardFilter === i ? '#4b65f6' : '#252525'}`,
                }}
              >
                {items}
              </FilterItems>
            );
          })}
        </FilterTap>
      </HeaderDiv>
      <FakeLine />
      <Banner>
        <FirstBanner>
          <TextArea>
            <span>묻지도 따지지도 않고 Rebase</span>
            모든 커밋 50% 삭제
          </TextArea>
          <CouponWrap>
            <CouponImg src="/image/coupon_blue.jpg" />
            <CouponWordFirst>-50%</CouponWordFirst>
          </CouponWrap>
        </FirstBanner>
        <SecondBanner>
          <TextArea>
            <span>위코드에 다시 돌아오면</span>
            모든 상품 200% 가격 상승!
          </TextArea>
          <CouponWrap>
            <CouponImg src="/image/coupon_purple.jpg" />
            <CouponWordSecond>+200%</CouponWordSecond>
          </CouponWrap>
        </SecondBanner>
      </Banner>
      <ListSection>
        <ListWrap>
          <ListNav>
            <ListCount>
              전체{' '}
              {chooseCardFilter === 0 ? categoryData.count : expertData.count}
            </ListCount>
            {chooseCardFilter === 0 && (
              <FilterDropdown setSelectedSort={setSelectedSort} />
            )}
          </ListNav>
          {chooseCardFilter === 0 ? (
            <CategoryCard categoryData={categoryData} />
          ) : (
            <ExpertCard expertData={expertData} />
          )}
        </ListWrap>
        <ButtonDiv>
          <FetchMoreCard onClick={plusCount}>
            <span>상담 상품</span> 더보기
          </FetchMoreCard>
        </ButtonDiv>
      </ListSection>
    </>
  );
}
const CATEGORY = {
  1: 'JavaScript',
  2: 'Python',
  3: 'React',
  4: 'HTML',
  5: 'Go',
  6: 'MySql',
  7: 'Java',
  8: 'C',
  9: 'C++',
};

const TOP_FILTER_LIST = ['상담', '엑스퍼트'];

const HeaderDiv = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 7px 20px 0;
  line-height: 24px;
  background: #fff;
`;

const Title = styled.div`
  max-width: 1280px;
  font-size: 36px;
  font-weight: 800;
`;

const FilterTap = styled.ul`
  max-width: 1280px;
  margin-top: 30px;
  display: flex;
`;

const FilterItems = styled.li`
  margin-right: 15px;
  font-weight: 800;
`;

const FakeLine = styled.div`
  width: 100%;
  margin-bottom: 50px;
  ${props => props.theme.borderBlue};
`;

const Banner = styled.div`
  display: flex;

  margin: 0 auto;
  max-width: 1280px;
  background-color: blue;
`;

const FirstBanner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  background-color: #5e75d9;
`;

const TextArea = styled.p`
  display: flex;
  color: white;
  margin-left: 20px;
  padding: 30px 0;
  flex-direction: column;
  span {
    font-weight: 600;
  }
`;

const CouponWrap = styled.div`
  position: relative;
`;

const CouponImg = styled.img`
  width: 168px;
  hegith: 90px;
  shadow
`;

const CouponWordFirst = styled.p`
  position: absolute;
  color: white;
  font-size: 40px;
  top: 30px;
  left: 40px;
`;

const CouponWordSecond = styled.p`
  position: absolute;
  color: white;
  font-size: 40px;
  left: 23px;
  top: 30px;
`;

const SecondBanner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  background-color: #514cab;
`;

const ListSection = styled.div`
  background-color: #f9faff;
`;

const ListWrap = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const ListNav = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin: 10px 0;
  padding-top: 10px;
`;

const ListCount = styled.div``;

const ButtonDiv = styled.div`
  padding-bottom: 20px;
`;

const FetchMoreCard = styled.button`
  display: block;
  margin: 0 auto;
  padding: 10px 60px;
  border-radius: 23px;
  border: solid 1px rgba(107, 108, 128, 0.1);
  font-size: 15px;
  line-height: 18px;
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgb(157 167 195 / 10%);
  cursor: pointer;
  span {
    color: #7e96ff;
  }
`;

export default Category;
