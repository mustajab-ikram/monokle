import styled from 'styled-components';

export const GettingStartedCards = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-auto-rows: 275px;
`;

export const GettingStartedImg = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 120px;
`;

export const GettingStartedOverviewContainer = styled.div`
  padding: 15px;
`;

export const GettingStartedTitle = styled.h1`
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 8px;
  margin-bottom: 32px;
`;
