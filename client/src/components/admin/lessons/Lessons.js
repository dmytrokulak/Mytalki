import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLessons, acceptBookRequest, declineBookRequest } from '../../../actions/lessonActions';
import Preloader from '../../layout/Preloader';
import LessonsPanel from './LessonsPanel';

const Lessons = ({ lessons: { collection, loading }, acceptBookRequest, declineBookRequest, getLessons }) => {
  useEffect(() => {
    getLessons();
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
          <LessonsPanel
            status='requested'
            actions={(id) => (
              <Fragment>
                <a
                  href='#!'
                  onClick={() => declineBookRequest(collection.filter((item) => item.id === id)[0])}
                  className='waves-effect waves-light grey lighten-3 btn-flat '
                >
                  Decline
                </a>
                <a
                  href='#!'
                  onClick={() => acceptBookRequest(collection.filter((item) => item.id === id)[0])}
                  className='waves-effect waves-light teal white-text btn-flat'
                >
                  Accept
                </a>
              </Fragment>
            )}
          />
          <LessonsPanel status='upcoming' />
          <LessonsPanel status='completed' />
        </Fragment>
      )}
    </div>
  );
};

Lessons.propTypes = {
  lessons: PropTypes.object.isRequired,
  getLessons: PropTypes.func.isRequired,
  acceptBookRequest: PropTypes.func.isRequired,
  declineBookRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lessons: state.lessons,
});
export default connect(mapStateToProps, { getLessons, acceptBookRequest, declineBookRequest })(Lessons);
