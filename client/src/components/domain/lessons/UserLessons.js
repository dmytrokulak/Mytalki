import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { acceptBookRequest, declineBookRequest, getLessonsByUser } from '../../../actions/lessonActions';
import { getTeacherInfo } from '../../../actions/teacherActions';
import Preloader from '../../layout/Preloader';
import LessonsPanel from './LessonsPanel';

const UserLessons = ({
  lessons: { collection, loading },
  acceptBookRequest,
  declineBookRequest,
  getLessonsByUser,
  getTeacherInfo,
  teacher,
}) => {
  useEffect(() => {
    getLessonsByUser();
    getTeacherInfo();
    //eslint-disable-next-line
  }, []);

  return (
    <div id='section-lessons' className='section'>
      <h4 className='center-align'>Lessons</h4>
      {loading ? (
        <Preloader />
      ) : !collection || !collection.length ? (
        <h6 className='center-align'>Nothing to display</h6>
      ) : (
        <Fragment>
          <LessonsPanel status='requested' teacher={teacher} />
          <LessonsPanel status='upcoming' teacher={teacher} />
          <LessonsPanel status='completed' teacher={teacher} />
        </Fragment>
      )}
    </div>
  );
};

UserLessons.propTypes = {
  lessons: PropTypes.object.isRequired,
  getLessonsByUser: PropTypes.func.isRequired,
  getTeacherInfo: PropTypes.func.isRequired,
  acceptBookRequest: PropTypes.func.isRequired,
  declineBookRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lessons: state.lessons,
  teacher: state.teacher,
});
export default connect(mapStateToProps, { getLessonsByUser, getTeacherInfo, acceptBookRequest, declineBookRequest })(
  UserLessons
);
