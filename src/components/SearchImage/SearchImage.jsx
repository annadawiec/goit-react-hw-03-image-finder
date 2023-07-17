import axios from 'axios';

export const fetchImages = async (im, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${im}&page=${page}&key=36765030-83295107ea1d4bf8cece7a4f0&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
