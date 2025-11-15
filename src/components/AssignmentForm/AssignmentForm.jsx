import { useState } from 'react';
import { useNavigate } from 'react-router';

const initialState = {
  tile: '',
  content: '',
};

const AssignmentForm = (props) => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.addAssignment(formData)
    setFormData(initialState)
    navigate('/assignment')
  };

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
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
        <input
          type="text"
          id="content"
          name="content"
          value={formData.title}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default AssignmentForm;