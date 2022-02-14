/* eslint-disable import/prefer-default-export */
function b64ToUTF8(str: string) {
  return unescape(decodeURIComponent(window.atob(str)));
}

export { b64ToUTF8 };
