import {NamespaceRefTypeEnum} from '@models/resourcekindhandler';

import {
  CERT_MANAGER_DEFAULT_RESOURCE_VERSION,
  CERT_MANAGER_RESOURCE_GROUP,
  CERT_MANAGER_SUBSECTION_NAME,
} from '@src/kindhandlers/certmanager/constants';
import {createNamespacedCustomObjectKindHandler} from '@src/kindhandlers/common/customObjectKindHandler';

const CertificateHandler = createNamespacedCustomObjectKindHandler(
  'Certificate',
  CERT_MANAGER_SUBSECTION_NAME,
  'Certificates',
  CERT_MANAGER_RESOURCE_GROUP,
  CERT_MANAGER_DEFAULT_RESOURCE_VERSION,
  'certificates',
  'certmanager/certificate.json',
  'https://cert-manager.io/docs/concepts/certificate/',
  [
    {
      source: {
        pathParts: ['spec', 'secretName'],
        namespaceRef: NamespaceRefTypeEnum.Implicit,
      },
      type: 'name',
      target: {
        kind: 'Secret',
      },
    },
    {
      source: {
        pathParts: ['spec', 'issuerRef', 'name'],
      },
      type: 'name',
      target: {
        kind: 'ClusterIssuer',
      },
    },
  ]
);

export default CertificateHandler;
