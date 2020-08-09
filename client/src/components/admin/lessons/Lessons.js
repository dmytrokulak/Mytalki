import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLessons, updateLesson } from '../../../actions/lessonActions';
import Preloader from '../../layout/Preloader';
import LessonItem from './LessonItem';

const Lessons = ({ lessons: { collection, loading }, getLessons, updateLesson }) => {
  const [requested, setRequested] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    getLessons();
    //eslint-disable-next-line
  }, []);

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

  const updateLessonStatus = (id, status) => {
    const item = collection[id];
    item.status = status;
    updateLesson(item);
  };

  return (
    <div id='section-lessons' className='section'>
      <h4 className='center-align'>Lessons</h4>
      {loading ? (
        <Preloader />
      ) : !collection || !collection.length ? (
        <h6 className='center-align'>Nothing to display</h6>
      ) : (
        <Fragment>
          {requested.length > 0 && (
            <Fragment>
              <blockquote>Requested</blockquote>
              <ul className='collection'>
                {requested.map((item) => (
                  <li key={item.id} className='collection-item'>
                    <LessonItem item={item} />
                    <div className='action-buttons'>
                      <a href='#!' className='waves-effect waves-light grey lighten-3 btn-flat '>
                        Decline
                      </a>
                      <a
                        href='#!'
                        onClick={() => updateLessonStatus(item.id - 1, 'upcoming')}
                        className='waves-effect waves-light teal white-text btn-flat'
                      >
                        Accept
                      </a>
                    </div>
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
                    <LessonItem item={item} />
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
                    <LessonItem item={item} />
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

Lessons.propTypes = {
  lessons: PropTypes.object.isRequired,
  getLessons: PropTypes.func.isRequired,
  updateLesson: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lessons: state.lessons,
});
export default connect(mapStateToProps, { getLessons, updateLesson })(Lessons);
