export const dataURLToBlob = (img: string) => {
  const byteString = atob(img.split(',')[1]);
  const mimeString = img.split(',')[0].split(':')[1].split(';')[0];
  const buffer = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    buffer[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([buffer], { type: mimeString });

  return blob;
};
