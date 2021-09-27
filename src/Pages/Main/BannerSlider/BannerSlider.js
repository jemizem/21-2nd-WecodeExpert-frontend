import { React, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import useInterval from '../../../Hooks/useInterval';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* 
  Main 화면 배너 슬라이드 

    1) 무한 재생
    setInterval로 1ms마다 width를 %으로 계산하여 100가 된 경우 다음 배너로 슬라이드

    2) next, prev Button Control 
    현재 progressWidth 초기화 후 다음 또는 이전 배너로 슬라이드

    3) play, pause Control
    pause : progressWidth 유지하고 setInterval clear
    play : setInterval 시작
*/

function BannerSlider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const slider = useRef();

  // auto play time (3초)을 프로그래스바로 보여주기 위한 Interval
  useInterval(
    () => {
      if (progressWidth >= 100) {
        setProgressWidth(0);
        next();
      } else {
        setProgressWidth(progressWidth + 1 / (0.1 + 3));
      }
    },
    isRunning ? 10 : null
  );

  // Next 슬라이드 Event
  const next = () => {
    setSlideIndex(slideIndex + 1 >= BANNERS.length ? 0 : slideIndex + 1);
    setProgressWidth(0);
    slider.current.slickNext();
  };

  // Prev 슬라이드 Event
  const previous = () => {
    setSlideIndex(slideIndex === 0 ? BANNERS.length - 1 : slideIndex - 1);
    setProgressWidth(0);
    slider.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <PromotionBanner>
      <BannerBg color={BANNERS[slideIndex].color}>
        <BannerInner>
          <BannerItem>
            <BannerInfo to={BANNERS[slideIndex].link} target="_blank">
              <BannerTitle>
                {BANNERS[slideIndex].title.split('\n').map((line, i) => (
                  <div key={i}>
                    {line}
                    <br />
                  </div>
                ))}
              </BannerTitle>
              <a
                href={BANNERS[slideIndex].link}
                target="_blank"
                rel="noreferrer"
              >
                자세히 보기
              </a>
            </BannerInfo>
            <ProgressBarArea>
              <ProgressBar>
                <Progress width={`${progressWidth}%`}></Progress>
              </ProgressBar>
              <SlidePageNumber>
                {('00' + (slideIndex + 1)).slice(-2)}
              </SlidePageNumber>

              <SlidePageNumber left="76px" opacity="0.5">
                {('00' + BANNERS.length).slice(-2)}
              </SlidePageNumber>

              <PlayControlArea
                onClick={() => {
                  setIsRunning(!isRunning);
                }}
              >
                {isRunning ? (
                  <i className="fas fa-pause"></i>
                ) : (
                  <i className="fas fa-play"></i>
                )}
              </PlayControlArea>
            </ProgressBarArea>
            <BannerWrapper>
              <Slider ref={slider} {...settings}>
                {BANNERS?.map((banner, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <Link to={banner.link}>
                        <img alt={banner.title} src={banner.image} />
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Slider>
            </BannerWrapper>
          </BannerItem>
          <CatouselButtonArea>
            <CarouselPrevButton onClick={previous}></CarouselPrevButton>
            <CarouselNextButton onClick={next}></CarouselNextButton>
          </CatouselButtonArea>
        </BannerInner>
      </BannerBg>
    </PromotionBanner>
  );
}

const BANNERS = [
  {
    no: 1,
    image:
      'http://user-images.githubusercontent.com/3303885/123605928-54a78e00-d837-11eb-8423-d772d3a093a2.jpeg',
    title: '엑스퍼트 X KOTRA\n실시간 전문가\n상담 사업 신청 안내',
    color: '#064689',
    link: '',
  },
  {
    no: 2,
    image:
      'http://user-images.githubusercontent.com/3303885/123605922-53766100-d837-11eb-8507-a424802283dc.jpeg',
    title: '영어공부를\n다시 시작한다면\n1:1 맞춤클래스',
    color: '#035ac6',
    link: '',
  },
  {
    no: 3,
    image:
      'http://user-images.githubusercontent.com/3303885/123605924-540ef780-d837-11eb-929d-144f03690c32.jpeg',
    title: '무료한 일상\n솜씨당과 함께하는\n즐거운 취미 생활',
    color: '#cc6a71',
    link: '',
  },
  {
    no: 4,
    image:
      'http://user-images.githubusercontent.com/3303885/123605914-507b7080-d837-11eb-93fa-fa4cc2713473.jpeg',
    title: '요즘 핫한\n클래스만 모았어!\n90%할인 중',
    color: '#4c7d19',
    link: '',
  },
];

const PromotionBanner = styled.div`
  position: relative;
  margin-top: -1px;
  padding-bottom: 20px;
  overflow: hidden;
`;

const BannerBg = styled.div.attrs(props => ({
  color: props.color || '#4a65f6',
}))`
  position: relative;
  height: 100%;
  min-height: 24.4rem;
  background-color: ${props => props.color};
  transition: background-color 0.5s;

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    content: '';
  }
`;

const BannerInner = styled.div`
  position: relative;
  top: 30px;
`;

const BannerItem = styled.div`
  position: relative;
  margin: 0 auto;
  width: 600px;
  box-sizing: border-box;
  overflow: hidden;
`;

const BannerInfo = styled(Link)`
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  width: 380px;
  box-sizing: border-box;
  color: #fff;
  text-decoration: none;
  overflow: hidden;
  z-index: 10;

  a {
    display: block;
    padding: 10px;
    margin: 0 -10px -10px;
    color: #fff;
    font-size: 18px;
    line-height: 17px;
    text-decoration: none;
    overflow: hidden;
  }
`;

const BannerTitle = styled.div`
  display: block;
  max-height: 240px;
  font-size: 42px;
  font-weight: bold;
  line-height: 60px;
  letter-spacing: -1px;
`;

const ProgressBarArea = styled.div`
  position: absolute;
  left: 0;
  bottom: 50px;
  width: 125px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  line-height: 2.2;
  overflow: hidden;
  z-index: 15;
`;

const SlidePageNumber = styled.span`
  position: absolute;
  top: 0;
  left: ${props => props.left || '0px'};
  opacity: ${props => props.opacity || 1};
  line-height: 24px;
  vertival-align: top;
`;

const ProgressBar = styled.div`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 1px;
  margin: 11px 0 0 20px;
  background-color: rgba(255, 255, 255, 0.3);
  vertical-align: top;
`;

const Progress = styled.div.attrs(props => ({
  style: {
    width: props.width,
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background: #fff;
  transition: width 0.1s linear;
`;

const PlayControlArea = styled.button`
  float: right;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);

  i {
    color: #fff;
    font-size: 10px;
    margin: -4px -2px 0 0;
  }
`;

const BannerWrapper = styled.div`
  float: right;
  width: 380px;
`;

const SwiperSlide = styled.div`
  width: 380px;
  height: 380px;

  a {
    position: relative;
    display: block;
    width: 100%;

    img {
      float: right;
      width: 380px;
      height: 380px;
    }
  }
`;

const CatouselButtonArea = styled.div`
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  width: 100%;
  max-width: 941px;
  margin-top: -56px;
  transform: translateX(-50%);
`;

const CarouselButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 0;
  box-shadow: none;
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    border: 2px solid #fff;
    content: '';
`;

const CarouselPrevButton = styled(CarouselButton)`
  top: 0;
  left: 20px;

  &::after {
    margin: -4px 0 0 -3px;
    border-width: 0 0 2px 2px;
    transform: rotate(45deg);
  }
`;

const CarouselNextButton = styled(CarouselButton)`
  top: 0;
  right: 20px;

  &::after {
    margin: -4px 0 0 -6px;
    border-width: 2px 2px 0 0;
    transform: rotate(45deg);
  }
`;

export default BannerSlider;
