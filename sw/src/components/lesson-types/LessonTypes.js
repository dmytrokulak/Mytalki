import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LessonType from './LessonType';
import LessonTypeModal from './LessonTypeModal';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { getLessonTypes } from '../../actions/lessonTypeActions';

const LessonTypes = ({ lessonTypes: { collection, loading }, getLessonTypes }) => {
  useEffect(() => {
    M.AutoInit();
    getLessonTypes();
    //eslint-disable-next-line
  }, []);
  return (
    <div id='section-lesson-types' className='section'>
      <h4 className='center-align'>Lesson Types</h4>
      <ul className='collapsible popout'>
        {!loading && collection && collection.map((item) => <LessonType item={item} key={item.id} />)}
      </ul>
      <div className='fixed-action-btn'>
        <a
          href='#lesson-type-modal'
          className='btn-floating btn-large teal darken-1 tooltipped modal-trigger'
          data-position='left'
          data-tooltip='Add new lesson type'
        >
          <i className='large material-icons'>add</i>
        </a>
      </div>
      <LessonTypeModal />
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
