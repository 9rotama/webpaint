import axios from 'axios';

export const postWorkData = async (
  imgBlob: Blob,
  title: string,
  artist: string,
  description: string,
) => {
  const formData = new FormData();
  formData.append('image', imgBlob, 'image.webp');
  formData.append('title', title);
  formData.append('artist', artist);
  formData.append('description', description);

  const post_url = process.env.NEXT_PUBLIC_API_URL + '/post';

  try {
    const res = await axios.post(post_url, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
    console.log('body:', res.data);
    return res.data;
  } catch (e) {
    throw e;
  }
};
