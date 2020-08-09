import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LessonType from './LessonType';
import LessonTypeModal from './LessonTypeModal';
import LessonTypeDeleteModal from './LessonTypeDeleteModal';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { getLessonTypes } from '../../../actions/lessonTypeActions';
import Preloader from '../../layout/Preloader';

const LessonTypes = ({ lessonTypes: { collection, loading }, getLessonTypes }) => {
  useEffect(() => {
    getLessonTypes();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    M.AutoInit();
    //eslint-disable-next-line
  }, [collection]);

  return (
    <div id='section-lesson-types' className='section'>
      <h4 className='center-align'>Lesson Types</h4>
      {loading || collection === null || collection.lenght === 0 ? (
        <Preloader />
      ) : (
        <ul className='collapsible popout'>
          {collection && collection.map((item) => <LessonType id={item.id} key={item.id} />)}
        </ul>
      )}
      <div className='fixed-action-btn'>
        <a
          href='#lesson-type-modal'
          className='btn-floating btn-large teal tooltipped modal-trigger'
          data-position='left'
          data-tooltip='Add new lesson type'
        >
          <i className='large material-icons'>add</i>
        </a>
      </div>
      <LessonTypeModal />
      <LessonTypeDeleteModal />
    </div>
  );
};

LessonTypes.propTypes = {
  lessonTypes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  lessonTypes: state.lessonTypes,
});

export default connect(mapStateToProps, { getLessonTypes })(LessonTypes);
