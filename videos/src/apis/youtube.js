import axios from 'axios';

const KEY = 'AIzaSyBHN7RxUtSAPvZ8Ja3RXy_r1Zna4X6l5xI';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: KEY
  }
});
