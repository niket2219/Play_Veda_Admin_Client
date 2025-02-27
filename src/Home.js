import React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #dcd9d3;
  padding: 20px;
`;

const MainWrapper = styled.div`
  width: 90%;
  max-width: 1200px; /* Increased width */
  background: #e0ddd7;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 10px 10px 20px #bebbb6, -10px -10px 20px #ffffff;
  text-align: center;
  position: relative;
`;

const TopNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const MacDots = styled.div`
  display: flex;
  gap: 6px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.color || "black"};
`;

const WelcomeCircle = styled.div`
  background: #e0ddd7;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  font-size: 24px;
  font-family: "Playfair Display", serif;
  font-weight: 700;
  box-shadow: 10px 10px 20px #bebbb6, -10px -10px 20px #ffffff;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 60px;
  flex-wrap: wrap;
`;

const InfoBox = styled.div`
  background: #e0ddd7;
  width: 250px;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 10px 10px 20px #bebbb6, -10px -10px 20px #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const NumberCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  margin-top: 5px;
  transform: translateY(-50%);
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const InfoText = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: #555;
`;

const ActionButton = styled.a`
  margin-top: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 20px;
  background: #fff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 3px 3px 8px #bebbb6, -3px -3px 8px #ffffff;
  text-decoration: none;
  color: black;
  display: inline-block;

  &:hover {
    background: #f1f1f1;
  }
`;

const App = () => {
  return (
    <PageWrapper>
      <MainWrapper>
        <TopNav>
          <MacDots>
            <Dot color="#ff5f56" />
            <Dot color="#ffbd2e" />
            <Dot color="#27c93f" />
          </MacDots>
        </TopNav>
        <WelcomeCircle>Welcome</WelcomeCircle>
        <InfoContainer>
          <InfoBox>
            <NumberCircle>1</NumberCircle>
            <InfoTitle>Card Template 1</InfoTitle>
            <InfoText>Manage your template1 cards from here</InfoText>
            <ActionButton href="/cards1">Manage</ActionButton>
          </InfoBox>

          <InfoBox>
            <NumberCircle>2</NumberCircle>
            <InfoTitle>Card Template 2</InfoTitle>
            <InfoText>Manage your template2 cards from here</InfoText>
            <ActionButton href="/cards2">Manage</ActionButton>
          </InfoBox>

          <InfoBox>
            <NumberCircle>3</NumberCircle>
            <InfoTitle>Session Templates</InfoTitle>
            <InfoText>Manage Play Lila Sessions from here</InfoText>
            <ActionButton href="/sessions">Manage</ActionButton>
          </InfoBox>
        </InfoContainer>
      </MainWrapper>
    </PageWrapper>
  );
};

export default App;
