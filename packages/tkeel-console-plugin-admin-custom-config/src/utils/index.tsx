export function fileToBase64(file: File | null) {
  return new Promise<string>((resolve) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const resultStr = reader.result as string;
        resolve(resultStr);
      };
      reader.readAsDataURL(file);
    } else {
      resolve('');
    }
  });
}

export function imageToBase64(src: string) {
  return new Promise<string>((resolve) => {
    if (src.startsWith('data:image/')) {
      resolve(src);
    }
    const img = new Image();
    img.src = src;
    img.crossOrigin = 'anonymous';
    img.addEventListener('load', () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const type = src.endsWith('.webp') ? 'image/webp' : undefined;
        const dataURL = canvas.toDataURL(type);
        resolve(dataURL);
      } else {
        resolve('');
      }
    });
  });
}
