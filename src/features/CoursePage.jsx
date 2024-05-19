import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CourseSideBar from "./CourseSideBar";
import Question from "./Question";

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    // Fetch course data
    fetch(`${import.meta.env.VITE_SERVER}/course/${courseId}?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data); // Set course data to state
        setLoading(false); // Update loading state to false once data is fetched
        data.course.Enrolled
          ? setCurrentQuestion(data.course.progress)
          : setCurrentQuestion(data.course.courseQuestions.questions[0]);
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        setLoading(false); // Update loading state to false in case of error
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {course ? (
        <div className="d-flex">
          <div className="col-md-2 min-vh-100 bg-light">
            <CourseSideBar
              courseDetails={course.course}
              setCurrentQuestion={setCurrentQuestion}
            />
          </div>
          <div className="col-md-10">
            <Question currentQuestion={currentQuestion} />
          </div>
        </div>
      ) : (
        <div>Course not found</div>
      )}
    </div>
  );
};

export default CoursePage;
