import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopicList } from "../../services/topicService";

function Topic() {
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    const fetchTopic = async () => {
      const result = await getTopicList(`topic`);
      setTopic(result);
    }
    fetchTopic();
  }, []);

  return (
    <>
      <h2>Topic List</h2>
      {topic.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>topic name</th>
              <th>id</th>
            </tr>
          </thead>
          <tbody>
            {topic.map((topic) => (
              <tr key={topic.id}>
                <td>{topic.id}</td>
                <td>{topic.name}</td>
                <td><Link to={"/quiz/" + topic.id}>Do quiz</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Topic;