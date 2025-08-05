import { createRoutesFromChildren, useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { useEffect, useState } from "react";
import { getQuestionsList } from "../../services/questionsService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/quizService";

function Quiz() {
  const params = useParams();
  const [topic, setTopic] = useState([]);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopic = async () => {
      const result = await getTopic(params.id);
      setTopic(result);
    }
    fetchTopic();
  }, []);

  useEffect(() => {
    const fetchTopic = async () => {
      const result = await getQuestionsList(params.id);
      setQuestions(result);
    }
    fetchTopic();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedAnswers = [];
    for (let i = 0; i < e.target.elements.length; i++) {
      if (e.target.elements[i].checked) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;

        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value)
        });
      }
    }
    let options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers
    }

    const response = await createAnswer(options);
    if (response) {
      navigate(`/result/${response.id}`);
    }
  }

  return (
    <>
      <h2>Quiz for Topic: {topic.name}</h2>

      <div className="form-quiz">
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div className="form-quiz__item" key={question.id}>
              <p>Cau {index + 1}: {question.question}</p>
              {question.answers.map((answer, indexAnswer) => (
                <div className="form-quiz__answer" key={indexAnswer}>
                  <input type="radio" name={question.id} value={indexAnswer} id={`quiz-${question.id}-${indexAnswer}`} />
                  <label htmlFor={`quiz-${question.id}-${indexAnswer}`}>{answer}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Quiz;