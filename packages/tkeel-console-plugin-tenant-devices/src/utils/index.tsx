const handleSubscribeAddr = (data: string) => {
  const addrInfoArr = data.split(',');
  const temp = addrInfoArr.map((r) => {
    const addrInfo = r.split('@');
    const title = addrInfo[0];
    const id = addrInfo[1];
    const addr = addrInfo[2];
    return { id, title, addr };
  });
  return temp.filter((r) => r.id);
};

export default handleSubscribeAddr;
