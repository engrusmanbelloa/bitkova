import {google} from 'googleapis'

const auth = new google.auth.GoogleAuth({
  // add your credentials here
  keyFile: './credential.json',
  scopes: ['https://www.googleapis.com/auth/youtube.upload'],
})
const youtube = google.youtube({ 
  version: 'v3', 
  auth
})

// const res = youtube.videos.insert({
//   part: 'snippet,status',
//   resource: {
//     snippet: {
//       title: video.originalFilename.slice(0, -4),
//       categoryId: 28,
//       // channelId: "UCtGfgq_hzHa494Cc61WYerw"
//     },
//     status: {
//       privacyStatus: "unlisted"
//     }
//   },
//   media: {
//     body: video.path
//   }
// }).then((response) => {
//   const videoId = response.data.id
//   const videoLink = `https://www.youtube.com/watch?v=${videoId}`
//   lessonObj.videos.push({
//     name: video.originalFilename.slice(0, -4),
//     url: videoLink,
//     videoId: videoId,
//   })
// }).catch((err) => {
//   console.error(err)
// })

export default youtube