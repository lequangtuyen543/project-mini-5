import { useEffect, useState } from "react";
import { getTopicList } from "../../services/topicService";
import { getAnswersByUserId } from "../../services/answersService";
import { Link } from "react-router-dom";

function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      const answersById = await getAnswersByUserId();
      const topics = await getTopicList();

      let result = [];
      for (let i = 0; i < answersById.length; i++) {
        result.push({
          ...topics.find((topic) => topic.id == answersById[i].topicId),
          ...answersById[i]
        });
      }
      
      setDataAnswers(result.reverse());
    }
    fetchTopic();
  }, []);

  return (
    <>
      <h2>Answers List</h2>
      {dataAnswers.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>topic name</th>
              <th>id</th>
            </tr>
          </thead>
          <tbody>
            {dataAnswers.map((topic) => (
              <tr key={topic.id}>
                <td>{topic.id}</td>
                <td>{topic.name}</td>
                <td><Link to={"/result/" + topic.id}>Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Answers;