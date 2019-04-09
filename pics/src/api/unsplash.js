import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization:
      'Client-ID e6a7ffb3eefe026719627db5b55387ef2b2808534608d2b26654aab289237dc4'
  }
});
