import Intro from "../components/intro";
import Slider from "../components/Slider";
import CoursesList from "../components/CoursesList";
import News from "../components/News";
import Events from "../components/Events";
import Testimonals from "../components/Testimonals";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div>
      <Slider/>
      <Intro/>
      <CoursesList/>
      <News/>
      <Events/>
      <Testimonals/>
      <Newsletter/>
    </div>
  )
}
