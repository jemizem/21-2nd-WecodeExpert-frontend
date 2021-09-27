## WecodeExpert 프로젝트 소개

- [네이버 Expert](https://m.expert.naver.com/)를 모티브로 한 프로젝트 
- 짧은 프로젝트 기간동안 개발에 집중해야 하므로 디자인/기획 부분만 클론했습니다.
- 개발은 초기 세팅부터 전부 직접 구현했으며, 아래 데모 영상에서 보이는 부분은 모두 백앤드와 연결하여 실제 서비스 동작과 비슷하게 개발하였습니다.

## 프로젝트 기간 및 인원

### 개발기간 : 2021/06/21 ~ 2021/7/02

### Frontend (2명)

- 김지민
- 황윤성

### Backend (3명)

- 김민규
- 박창현
- 정효진

### 데모 영상
https://www.youtube.com/watch?v=NDgbTXL3dcQ
![image](https://user-images.githubusercontent.com/55984573/124383418-4bbb2e80-dd07-11eb-9ba9-97a76e6f1087.png)

### 데모 사이트 : https://jemizem.github.io/21-2nd-WecodeExpert-frontend/

## 사용 기술 및 구현 기능

### 사용 기술 및 tools
> - Front-End : <img src="https://img.shields.io/badge/ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=React-router&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/styledcomponent-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
> - Back-End : <img src="https://img.shields.io/badge/Python 3.8-3776AB?style=for-the-badge&logo=Python&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Django 3.2.4-092E20?style=for-the-badge&logo=Django&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Mysql 8.0-4479A1?style=for-the-badge&logo=Mysql&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/PyJWT 2.1-000000?style=for-the-badge&logo=JsonWebTokens&logoColor=white"/>&nbsp;
> - Common : <img src="https://img.shields.io/badge/AWS RDS/EC2-232F3E?style=for-the-badge&logo=Amazon&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Kakao API-FFCD00?style=for-the-badge&logo=kakao&logoColor=white"/>
> - ETC : <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=Github&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>&nbsp;<img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=Trello&logoColor=white"/>


## 구현 기능

### 메인 화면 (*담당 구현)
- slick 라이브러리를 활용하여 배너 슬라이드 구현. 자동 슬라이드 시간을 프로그래스바로 표현
- 추천 상품 카드 슬라이드 구현

#### 소셜 로그인/회원가입(카카오)
- 카카오 API를 활용하여 로그인, 회원가입 구현

#### 상품목록
- 상담 상품, 엑스퍼트 API GET 구현
- 카드 컴포넌트 
- 정렬과 페이징네이션 적용

### 상품상세 (*담당 구현)
- 상품 상세 정보 API GET 구현
- 상품 상세 콘텐츠 길이에 따른 상품 상세 더보기 기능 구현
- 상품 후기 GET 하여 상품 더보기 구현

### 엑스퍼트 신청하기 (*담당 구현)
- 서브 라우트 기능 활용하여 신청하기 단계 화면 구현
- 태그 입력 기능
- S3 이미지 업로드 구현

## Reference

- 이 프로젝트는 [네이버 Expert](https://m.expert.naver.com/) 사이트를 참조하여 학습목적으로 만들었습니다.
- 실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
- 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다.
