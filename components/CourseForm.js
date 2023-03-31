import { useState } from 'react'
import axios from 'axios'

const NewCourseForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')
  const [videos, setVideos] = useState([])
  const [pdfs, setPdfs] = useState([])
  const [about, setAbout] = useState('')
  const [whatYouWillLearn, setWhatYouWillLearn] = useState([])
  const [content, setContent] = useState([])
  const [reviews, setReviews] = useState([])
  const [image, setImage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('description', description)
      formData.append('duration', duration)
      formData.append('price', price)
      formData.append('about', about)
      videos.forEach((video) => formData.append('videos', video))
      pdfs.forEach((pdf) => formData.append('pdfs', pdf))
      whatYouWillLearn.forEach((item) => formData.append('whatYouWillLearn', item))
      content.forEach((item) => formData.append('content', item))
      reviews.forEach((review) => {
        formData.append('reviews', JSON.stringify(review))
      })
      formData.append('image', image)

      const response = await axios.post('/api/courses', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      console.log(response.data)
      // Handle successful response
    } catch (error) {
      console.error(error)
      // Handle error
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label htmlFor="description">Description</label>
      <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label htmlFor="duration">Duration (in minutes)</label>
      <input type="number" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} required />

      <label htmlFor="price">Price</label>
      <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />

      <label htmlFor="videos">Videos</label>
      <input type="file" id="videos" multiple onChange={(e) => setVideos(Array.from(e.target.files))} />

      <label htmlFor="pdfs">PDF Files</label>
      <input type="file" id="pdfs" multiple onChange={(e) => setPdfs(Array.from(e.target.files))} />

      <label htmlFor="about">About</label>
      <textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} />

      <label htmlFor="whatYouWillLearn">What You Will Learn</label>
      <input type="text" id="whatYouWillLearn" value={whatYouWillLearn} onChange={(e) => setWhatYouWillLearn(e.target.value)} />

      <label htmlFor="content">Course Content</label>
      <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />

      <label htmlFor="reviews">Reviews</label>
      <div>
        <button type="button" onClick={() => setReviews([...reviews, { title: '', body: '' }])}>
          Add Review
        </button>
        {reviews.map((review, index) => (
          <div key={index}>
            <input type="text" value={review.title} onChange={(e) => setReviews([
              ...reviews.slice(0, index),
              { ...review, title: e.target.value },
              ...reviews.slice(index + 1),
            ])} />
            <textarea value={review.body} onChange={(e) => setReviews([
              ...reviews.slice(0, index),
              { ...review, body: e.target.value },
              ...reviews.slice(index + 1),
            ])} />
          </div>
        ))}
      </div>

      <label htmlFor="image">Image</label>
      <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">Create Course</button>
    </form>
  )
}