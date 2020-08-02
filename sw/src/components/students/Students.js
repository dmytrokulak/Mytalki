import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStudents, setCurrent } from '../../actions/studentActions';
import Preloader from '../layout/Preloader';

const Students = ({ students: { collection, loading }, getStudents, setCurrent }) => {
  useEffect(() => {
    getStudents();
    //eslint-disable-next-line
  }, []);
  return (
    <div id='section-students' className='section'>
      <h4 className='center-align'>Students</h4>
      {loading || collection === null || collection.lenght === 0 ? (
        <Preloader />
      ) : (
        <ul className='collection'>
          {collection &&
            collection.map((item) => (
              <a href='#!' className='collection-item'>
                <div className='bio-info'>
                  <img width='50' src={item.avatar} alt='' />
                  <span>
                    {item.firstName} {item.lastName}
                  </span>
                </div>
                <div className='lessons-info'>
                  {item.lessons.filter((lesson) => lesson.status === 'requested').length > 0 && (
                    <span className='orange-text text-darken-3'>
                      Requested: {item.lessons.filter((lesson) => lesson.status === 'requested').length}
                    </span>
                  )}
                  <span className='green-text text-darken-3'>
                    Upcoming: {item.lessons.filter((lesson) => lesson.status === 'upcoming').length}
                  </span>
                  <span className='black-text text-darken-3'>
                    Completed: {item.lessons.filter((lesson) => lesson.status === 'completed').length}
                  </span>
                </div>
              </a>
            ))}
        </ul>
      )}
    </div>
  );
};

Students.propTypes = {
  getStudents: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  students: state.students,
});

export default connect(mapStateToProps, { getStudents, setCurrent })(Students);
