import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLessons } from '../../actions/lessonActions';
import Preloader from '../layout/Preloader';
import moment from 'moment';

const Lessons = ({ lessons: { collection, loading }, getLessons }) => {
  useEffect(() => {
    getLessons();
    //eslint-disable-next-line
  }, []);

  return (
    <div id='section-lessons' className='section'>
      <h4 className='center-align'>Lessons</h4>
      {loading || collection == null ? (
        <Preloader />
      ) : (
        <Fragment>
          <blockquote>Requested</blockquote>
          <ul className='collection'>
            {collection
              .filter((item) => item.status === 'requested')
              .map((item) => (
                <li className='collection-item'>
                  <div class='lesson-info'>
                    {new moment(item.dateTime).format('ddd MMMM DD, hh:mm')}-
                    {new moment(item.dateTime).add(item.offer.time, 'm').format('hh:mm')}
                    <br />
                    {item.lessonType.title}
                  </div>
                  <div class='user-info'>
                    <span>
                      {item.user.firstName} {item.user.lastName}
                    </span>
                    <br />
                    <span>skype number</span>
                  </div>
                  <div class='action-buttons'>
                    <a href='#!' className='waves-effect waves-light grey lighten-3 btn-flat '>
                      Cancel
                    </a>
                    <a href='#!' className='waves-effect waves-light teal white-text btn-flat'>
                      Accept
                    </a>
                  </div>
                </li>
              ))}
          </ul>
          <blockquote>Upcoming</blockquote>
          <ul className='collection'>
            {collection
              .filter((item) => item.status === 'upcoming')
              .map((item) => (
                <li className='collection-item'>{item.id}</li>
              ))}
          </ul>
          <blockquote>Completed</blockquote>
          <ul className='collection'>
            {collection
              .filter((item) => item.status === 'completed')
              .map((item) => (
                <li className='collection-item'>{item.id}</li>
              ))}
          </ul>
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  lessons: state.lessons,
});
export default connect(mapStateToProps, { getLessons })(Lessons);
