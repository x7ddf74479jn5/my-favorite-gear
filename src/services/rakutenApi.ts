// import axios from "axios";

// import { Gear } from "./models/gear";

// interface ApiConfig {
//   baseURL?: string;
//   timeout?: number;
//   keyword?: string;
//   elements?: string;
//   affiliateId?: string;
//   entity?: string;
//   hits?: number;
//   formValidation?: 1 | 2;
// }

// const DEFAULT_API_CONFIG: ApiConfig = {
//   baseURL: "https://app.rakuten.co.jp/services/api/Product/Search/20170426",
//   timeout: 7000,
//   elements: [
//     "affiliateUrl",
//     "makerName",
//     "mediumImageUrl",
//     "productId",
//     "productName",
//   ].join(),
//   keyword: "",
//   affiliateId: "1ea10fb2.e46bf703.1ea10fb3.49311a3d",
//   hits: 20,
//   formValidation: 2,
// };

// // https://app.rakuten.co.jp/services/api/Product/Search/20170426?applicationId=1012659610415700155&elements=makerName,mediumImageUrl,affiliateUrl,productName,productId&keyword=%E7%B6%BE%E9%B7%B9&hits=3&affiliateId=1ea10fb2.e46bf703.1ea10fb3.49311a3d&formatValidation=2

// export const getSongsFactory = (optionConfig?: ApiConfig) => {
//   const config = {
//     ...DEFAULT_API_CONFIG,
//     ...optionConfig,
//   };
//   const instance = axios.create({
//     baseURL: config.baseURL,
//     timeout: config.timeout,
//   });

//   const getSongs = async () => {
//     const response = await instance.get(
//       `/search?term=${encodeURI(config.term ? config.term : "")}&country=${
//         config.country
//       }&media=${config.media}&limit=${config.limit}&entity=${
//         config.entity
//       }&lang=${config.lang}`
//     );

//     if (response.status !== 200) {
//       const songs: Song[] = [];
//       return songs;
//     }
//     const songs: Song[] = response.data.results;
//     return songs.map((song) => {
//       return {
//         ...song,
//         artworkUrl600: song.artworkUrl100
//           ? song.artworkUrl100.replace("100x100", "600x600")
//           : null,
//       };
//     });
//   };

//   return getSongs;
// };
