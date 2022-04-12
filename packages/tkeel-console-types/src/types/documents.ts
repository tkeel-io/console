interface BaseDocuments {
  isOpen: boolean;
  baseURL: string;
  path: string;
}

interface GlobalPortalValueDocuments extends BaseDocuments {
  setIsOpen: (isOpen: boolean) => void;
  setPath: (path: string) => void;
}

interface DocumentsProps extends BaseDocuments {
  setPath: (path: string) => void;
  onClose: () => void;
}

interface DocumentsConfig {
  paths: {
    adminGuide: Record<string, string>;
    tenantGuide: Record<string, string>;
  };
}

interface UserDocumentsReturns extends BaseDocuments {
  config: DocumentsConfig;
  setIsOpen: (isOpen: boolean) => void;
  setPath: (path: string) => void;
  onOen: (path: string) => void;
  onClose: () => void;
}

export type {
  DocumentsProps,
  GlobalPortalValueDocuments,
  UserDocumentsReturns,
};
