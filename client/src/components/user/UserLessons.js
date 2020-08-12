import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLessonsByUser } from '../../actions/lessonActions';
import { getTeacherInfo } from '../../actions/teacherActions';
import Preloader from '../layout/Preloader';
import UserLessonItem from './UserLessonItem';

const UserLessons = ({
  lessons: { collection, loading },
  auth: { user },
  getLessonsByUser,

  getTeacherInfo,
  teacher,
}) => {
  const [requested, setRequested] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    if (user) {
      getLessonsByUser(user.id);
      getTeacherInfo();
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    let req = [];
    let upc = [];
    let com = [];
    for (let i = 0; collection && i < collection.length; i++) {
      if (collection[i].status === 'requested') {
        req.push(collection[i]);
      } else if (collection[i].status === 'upcoming') {
        upc.push(collection[i]);
      } else if (collection[i].status === 'completed') {
        com.push(collection[i]);
      }
    }
    setRequested(req);
    setUpcoming(upc);
    setCompleted(com);
  }, [collection]);

  return (
    <div id='section-lessons' className='section'>
      <h4 className='center-align'>Lessons</h4>
      {loading || !collection || !teacher ? (
        <Preloader />
      ) : (
        <Fragment>
          {requested.length > 0 && (
            <Fragment>
              <blockquote>Requested</blockquote>
              <ul className='collection'>
                {requested.map((item) => (
                  <li key={item.id} className='collection-item'>
                    <UserLessonItem item={item} teacher={teacher} />
                    <div className='action-buttons'></div>
                  </li>
                ))}
              </ul>
            </Fragment>
          )}
          {upcoming.length > 0 && (
            <Fragment>
              <blockquote>Upcoming</blockquote>
              <ul className='collection'>
                {upcoming.map((item) => (
                  <li key={item.id} className='collection-item'>
                    <UserLessonItem item={item} teacher={teacher} />
                    <div className='action-buttons'></div>
                  </li>
                ))}
              </ul>
            </Fragment>
          )}
          {completed.length > 0 && (
            <Fragment>
              <blockquote>Completed</blockquote>
              <ul className='collection'>
                {completed.map((item) => (
                  <li key={item.id} className='collection-item'>
                    <UserLessonItem item={item} teacher={teacher} />
                    <div className='action-buttons'></div>
                  </li>
                ))}
              </ul>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};

UserLessons.propTypes = {
  lessons: PropTypes.object.isRequired,
  getLessonsByUser: PropTypes.func.isRequired,
  getTeacherInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lessons: state.lessons,
  auth: state.auth,
  teacher: state.teacher,
});
export default connect(mapStateToProps, { getLessonsByUser, getTeacherInfo })(UserLessons);
