import axios from 'axios';

export const getNewReleases = async () => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/browse/new-releases');
  } catch (error) {}
};
