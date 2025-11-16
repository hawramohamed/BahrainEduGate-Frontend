import { Link, useParams } from 'react-router-dom';
import{ useContext } from 'react';

import { AssignmentsContext } from '../../contexts/AssignmentContext';


const AssignmentList = () => {
  const {assignments} = useContext(AssignmentsContext);
  const {courseId} = useParams();

  const filteredAssignments = courseId
  ? assignments.filter(one => one.course === courseId || one.course?._id === courseId)
  :assignments;

  return (
    <>
      <h2>Assignments</h2>

      {filteredAssignments.length === 0 ? (
        <p>No assignments yet!</p>
      ) : (
        <ul>
          {filteredAssignments.map((assignment) => (
            <li key={assignment._id}>
              <Link to={`/assignments/${assignment._id}`}>
                {assignment.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      
    </>
  );
};

export default AssignmentList;
