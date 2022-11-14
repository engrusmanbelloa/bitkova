import Intro from "../components/intro";
import Slider from "../components/Slider";
import CoursesList from "../components/CoursesList";
export default function Home() {
  return (
    <div>
      <Slider/>
      <Intro/>
      <CoursesList/>
    </div>
  )
}
