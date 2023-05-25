import {Button, Modal as RawModal} from 'antd';

import styled from 'styled-components';

import {Colors} from '@shared/styles/colors';

export const ModalBody = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(90vh - 158px);
`;

export const LeftColumn = styled.div`
  position: relative;
  height: 100%;
  width: 40%;
  padding-right: 24px;
`;

export const RightColumn = styled.div`
  position: relative;
  height: 100%;
  width: 60%;
`;

export const CreateButton = styled(Button)`
  margin: 16px 0px 32px 0px;
`;

export const ErrorMessage = styled.div`
  color: ${Colors.redError};
  margin-top: 4px;
`;

export const Note = styled.div`
  font-size: 12px;
  color: ${Colors.grey7};
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const SpinContainer = styled.div`
  padding: 50px;
  width: 100%;
`;

export const Modal = styled(RawModal)`
  height: 75%;
  top: 45px;
  padding-bottom: 0px;

  .ant-modal-content {
    height: 90vh;
  }

  .ant-modal-header,
  .ant-modal-body {
    background-color: #131515;
  }

  .ant-modal-body {
    height: calc(90vh - 110px);
  }
`;

export const PlaceholderContainer = styled.div`
  position: relative;
  color: ${Colors.grey6};
  border: 2px dashed ${Colors.grey6};
  border-radius: 4px;
  height: 100%;
`;

export const PlaceholderBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoContentTitle = styled.p`
  font-weight: 900;
  margin-top: 16px;
  margin-bottom: 4px;
`;

export const Footer = styled.div``;
