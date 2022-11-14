import Intro from "../components/intro";
import Slider from "../components/Slider";
import CoursesList from "../components/CoursesList";
import News from "../components/News";
export default function Home() {
  return (
    <div>
      <Slider/>
      <Intro/>
      <CoursesList/>
      <News/>
    </div>
  )
}
