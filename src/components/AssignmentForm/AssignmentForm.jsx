import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';

import { assignmentService } from '../../services/assignmentService';
import { AssignmentsContext } from '../../contexts/AssignmentContext';
import './AssignmentForm.css';

const initialState = { title: '', content: '' };

const AssignmentForm = () => {
  const {courseId} = useParams();
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { addAssignment } = useContext(AssignmentsContext);

  if (!courseId) {
    return <p>Error: No course selected. Please navigate from a course page.</p>;
  }

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newAssignment = await assignmentService.createAssignment({...formData, course: courseId,});
      addAssignment(newAssignment);
      setFormData(initialState);
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h2>New Assignment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Assignment Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="content">Assignment Content:</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
        />
        <button type="submit">Add Assignment</button>
      </form>
    </main>
  );
};

export default AssignmentForm;
