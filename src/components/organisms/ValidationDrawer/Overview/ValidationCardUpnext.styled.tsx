import {Card as AntdCard} from 'antd';

import {QuestionCircleFilled} from '@ant-design/icons';

import styled from 'styled-components';

import Colors from '@styles/Colors';

export const Card = styled(AntdCard)`
  border: 2px dashed #31393c;
  border-radius: 2px;
  height: 100%;

  .ant-card-body {
    background-color: #191f21;
    height: 100%;
    min-height: 255px;
  }
`;

export const Name = styled.h1`
  color: ${Colors.grey8};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 6px;
  margin-bottom: 6px;
  font-size: 16px;
`;

export const Icon = styled(QuestionCircleFilled)`
  font-size: 32px;
  color: #495a5f;
`;

export const Link = styled.a`
  color: ${Colors.blue6};
`;
