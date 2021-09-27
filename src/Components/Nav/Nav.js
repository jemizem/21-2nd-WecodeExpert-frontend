import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavCategory from '../NavModal/NavCategory/NavCategory';
import SocialLogin from '../NavModal/SocialLogin/SocialLogin';
import SocialLogout from '../NavModal/SocialLogout/SocialLogout';
import Header from '../../Pages/Expert/Header/Header';
import styled from 'styled-components';

const ALLOWED_PATH = [
  '/expert/join',
  '/expert/join/type',
  '/expert/join/agree',
  '/expert/join/basic',
  '/expert/join/seller',
];

function Nav(props) {
  const [categoryValid, setCategoryValid] = useState(false);
  const [accountModalValid, setAccountModalValid] = useState(false);
  const [profileValid, setProfileValid] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const isAllowed = ALLOWED_PATH.includes(location.pathname);
    setShowNav(isAllowed);
  }, [location.pathname]);

  const categoryOn = () => {
    setCategoryValid(!categoryValid);
  };

  const loginModalon = () => {
    setAccountModalValid(true);
  };

  const loginModalOff = () => {
    setAccountModalValid(false);
  };

  useEffect(() => {}, [profileValid]);

  return (
    <Container>
      <Wrapper>
        {showNav ? (
          <>
            <Header />
          </>
        ) : (
          <NavBox>
            <LogoWrap>
              <Link to="/">
                <Logo
                  src="https://user-images.githubusercontent.com/3303885/124051964-72a00900-da58-11eb-9065-6fe9df3ed4f9.png"
                  alt="logo"
                />
              </Link>
            </LogoWrap>

            <SearchWrap>
              <FontIcon>
                <i className="fas fa-search" />
              </FontIcon>

              <Input type="text" placeholder="필요한 상담 찾기" />
            </SearchWrap>

            <UserItems>
              <ItemLink>
                <i className="far fa-comment-dots" />
              </ItemLink>
              <ItemLink onClick={categoryOn}>
                <i className="fas fa-list" />
                {categoryValid && <NavCategory isCheck={categoryValid} />}
              </ItemLink>
              <ItemLink
              // onMouseEnter={loginModalon}
              // onMouseLeave={loginModalOff}
              >
                {localStorage.getItem('Wexpert_token') && (
                  <UserImg
                    src={localStorage.getItem('User_profile')}
                    alt="profile"
                  />
                )}
                {!localStorage.getItem('Wexpert_token') && (
                  <i className="far fa-user-circle" />
                )}
                {!localStorage.getItem('Wexpert_token') &&
                  accountModalValid && (
                    <SocialLogin setProfileValid={setProfileValid} />
                  )}
                {localStorage.getItem('Wexpert_token') && accountModalValid && (
                  <SocialLogout setProfileValid={setProfileValid} />
                )}
              </ItemLink>
            </UserItems>
          </NavBox>
        )}
      </Wrapper>
    </Container>
  );
}
export default Nav;

const Container = styled.div`
  position: relative;
  padding-bottom: 68px;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 200;
  background-color: #fff;
`;

const NavBox = styled.div`
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  height: 68px;
  justify-content: space-around;
  align-items: center;
`;

const LogoWrap = styled.div`
  padding: 10px;
`;

const SearchWrap = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;
  padding: 20px 20px 20px 46px;
  height: 31px;
  align-items: center;
  ${props => props.theme.borderBlue}
  border-radius: 27px;
  box-shadow: 0 8px 8px 0 rgb(111 138 255 / 10%);
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 30px;
`;

const FontIcon = styled.div`
  position: absolute;
  left: 10px;
  color: #8ca0ff;
`;

const Input = styled.input`
  font-size: 15px;
  border: none;
  outline: none;
  line-height: 31px;
  ::placeholder {
    color: #8ca0ff;
  }
`;

const UserItems = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
`;

const ItemLink = styled.span`
  margin: 0 5px;
  position: relative;
  font-size: 22px;
`;

const Logo = styled.img`
  width: 110px;
`;
