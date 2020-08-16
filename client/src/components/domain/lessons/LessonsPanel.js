import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LessonItem from './LessonItem';
import Utils from '../../../utils';

const LessonsPanel = ({ lessons: { collection }, status, actions = () => {}, teacher }) => {
  const listItems = collection
    .filter((item) => item.status === status)
    .map((item) => (
      <li key={item.id} className='collection-item'>
        <LessonItem item={item} teacher={teacher} />
        <div className='action-buttons'>{actions(item.id)}</div>
      </li>
    ));
  return (
    listItems.length > 0 && (
      <Fragment>
        <blockquote>{Utils.capitilze(status)}</blockquote>
        <ul className='collection'>{listItems}</ul>
      </Fragment>
    )
  );
};

LessonsPanel.propTypes = {
  lessons: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  actions: PropTypes.func,
};

const mapStateToProps = (state) => ({
  lessons: state.lessons,
});

export default connect(mapStateToProps, {})(LessonsPanel);
