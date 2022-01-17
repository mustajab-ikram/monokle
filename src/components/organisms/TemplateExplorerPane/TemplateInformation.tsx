import React from 'react';

import {Button, Popconfirm} from 'antd';

import {DeleteOutlined, ExclamationOutlined, FormOutlined} from '@ant-design/icons';

import styled from 'styled-components';

import {AnyTemplate} from '@models/template';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {
  deletePlugin,
  deleteStandalonTemplate,
  deleteTemplatePack,
  isPluginTemplate,
  isStandaloneTemplate,
  isTemplatePackTemplate,
} from '@redux/services/templates';

import Colors from '@styles/Colors';

const Container = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  position: relative;
  margin-bottom: 16px;
`;

const IconContainer = styled.span`
  height: 50px;
  width: 50px;
`;

const InfoContainer = styled.span`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 600;
`;

const Description = styled.span`
  font-weight: 300;
`;

const Footer = styled.span`
  display: flex;
  justify-content: space-between;
`;

const Author = styled.span`
  color: ${Colors.grey500};
`;

const Version = styled.span`
  font-style: italic;
`;

const StyledDeleteOutlined = styled(DeleteOutlined)`
  position: absolute;
  top: 5px;
  right: 0px;
  color: ${Colors.red7};
  cursor: pointer;
`;

const StyledFormOutlined = styled(FormOutlined)`
  font-size: 30px;
  padding-top: 4px;
`;

interface IProps {
  template: AnyTemplate;
  templatePath: string;
  onClickOpenTemplate: () => void;
}

const getTemplatePackPluginPath = (templatePath: string) => {
  const splittedTemplatePath = templatePath.split('\\');
  splittedTemplatePath.pop();

  return splittedTemplatePath.join('\\');
};

const TemplateInformation: React.FC<IProps> = props => {
  const {template, templatePath, onClickOpenTemplate} = props;

  const dispatch = useAppDispatch();
  const pluginMap = useAppSelector(state => state.extension.pluginMap);
  const pluginsDir = useAppSelector(state => state.extension.pluginsDir);
  const templatesDir = useAppSelector(state => state.extension.templatesDir);
  const templatePacksDir = useAppSelector(state => state.extension.templatePacksDir);
  const templatePackMap = useAppSelector(state => state.extension.templatePackMap);

  const handleDelete = () => {
    if (templatesDir && isStandaloneTemplate(templatePath, templatesDir)) {
      deleteStandalonTemplate(templatePath, dispatch);
    } else if (templatePacksDir && isTemplatePackTemplate(templatePath, templatePacksDir)) {
      const templatePackPath = getTemplatePackPluginPath(templatePath);
      deleteTemplatePack(templatePackMap[templatePackPath], templatePackPath, dispatch);
    } else if (pluginsDir && isPluginTemplate(templatePath, pluginsDir)) {
      const pluginPath = getTemplatePackPluginPath(templatePath);
      deletePlugin(pluginMap[pluginPath], pluginPath, dispatch);
    }
  };

  return (
    <Container>
      <IconContainer>
        <StyledFormOutlined />
      </IconContainer>

      <InfoContainer>
        <Name>{template.name}</Name>
        <span>Type: {template.type}</span>
        <Description>{template.description}</Description>
        <Footer>
          <Author>{template.author}</Author> <Version>{template.version}</Version>
        </Footer>
        <Button onClick={onClickOpenTemplate} type="primary" ghost size="small" style={{marginTop: '8px'}}>
          Open
        </Button>
      </InfoContainer>

      <Popconfirm
        cancelText="Cancel"
        okText="Delete"
        okType="danger"
        placement="bottom"
        title={() => (
          <>
            <p>Are you sure you want to delete {template.name}?</p>
            {templatePacksDir && isTemplatePackTemplate(templatePath, templatePacksDir) ? (
              <p>
                <ExclamationOutlined style={{color: 'red'}} />
                This will delete all the templates corresponding to the pack.
              </p>
            ) : pluginsDir && isPluginTemplate(templatePath, pluginsDir) ? (
              <p>
                <ExclamationOutlined style={{color: 'red'}} />
                This will delete all the templates corresponding to the plugin.
              </p>
            ) : null}
          </>
        )}
        onConfirm={handleDelete}
      >
        <StyledDeleteOutlined />
      </Popconfirm>
    </Container>
  );
};

export default TemplateInformation;
