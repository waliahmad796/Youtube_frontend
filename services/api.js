import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Backend URL
});

export default {
  fetchFormats(videoUrl) {
    return api.post("/youtube/formats", { videoUrl });
  },
  downloadVideo(videoUrl, formatId) {
    console.log("video url=======>", videoUrl);
    console.log("video url=======>", formatId);
    let res = api.post("/youtube/download", { videoUrl, formatId });
    console.log("res--------------", res);
  },
};
