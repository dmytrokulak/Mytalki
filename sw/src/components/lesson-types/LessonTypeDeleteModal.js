import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteLessonType, clearCurrent } from '../../actions/lessonTypeActions';

function LessonTypeDeleteModal({ lessonTypes: { current }, deleteLessonType, clearCurrent }) {
  return (
    <div id='confirm-delete-modal' class='modal'>
      <div class='modal-content'>
        <h6>
          Are you sure you want to delete <strong> {current && current.title}</strong>?
        </h6>
        <span>This action cannot be undone.</span>
      </div>
      <div class='modal-footer'>
        <a
          href='#!'
          onClick={() => {
            clearCurrent();
          }}
          class='modal-close waves-effect waves-green green white-text btn-flat'
        >
          Cancel
        </a>
        <a
          href='#!'
          onClick={() => {
            deleteLessonType(current.id);
            clearCurrent();
          }}
          class='modal-close waves-effect waves-green red white-text btn-flat'
        >
          Confirm
        </a>
      </div>
    </div>
  );
}

LessonTypeDeleteModal.propTypes = {
  lessonTypes: PropTypes.object.isRequired,
  deleteLessonType: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lessonTypes: state.lessonTypes,
});

export default connect(mapStateToProps, { deleteLessonType, clearCurrent })(LessonTypeDeleteModal);
