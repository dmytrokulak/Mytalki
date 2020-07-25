import React from 'react';
import LessonType from './LessonType';
import LessonTypeModal from './LessonTypeModal';

const LessonTypes = () => {
  return (
    <div id='section-lesson-types' className='section'>
      <h4 className='center-align'>Lesson Types</h4>
      <ul className='collapsible popout'>
        <LessonType />
        <LessonType />
        <LessonType />
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

export default LessonTypes;
