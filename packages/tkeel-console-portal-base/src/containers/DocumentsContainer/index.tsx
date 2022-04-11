import {
  Documents,
  useGlobalPortalValue,
} from '@tkeel/console-business-components';

export default function DocumentsContainer() {
  const { documents } = useGlobalPortalValue();
  const { isOpen, baseURL, path, setIsOpen, setPath } = documents;

  return (
    <Documents
      isOpen={isOpen}
      baseURL={baseURL}
      path={path}
      setPath={setPath}
      onClose={() => {
        setIsOpen(false);
      }}
    />
  );
}
