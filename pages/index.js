import Intro from "../components/intro";
import Slider from "../components/Slider";
import CoursesList from "../components/CoursesList";
import News from "../components/News";
import Events from "../components/Events";
import Testimonals from "../components/Testimonals";
import Newsletter from "../components/Newsletter";
export default function Home() {
  return (
    <div>
      <Slider/>
      <Intro/>
      <CoursesList title="Featured courses" foot="See more"/>
      <News/>
      <Events/>
      <Testimonals/>
      <Newsletter/>
    </div>
  )
}
