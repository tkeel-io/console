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
  open: (path: string) => void;
  close: () => void;
}

export type {
  DocumentsProps,
  GlobalPortalValueDocuments,
  UserDocumentsReturns,
};
