import React from 'react';

const LessonTypeModal = () => {
  return (
    <div id='lesson-type-modal' className='modal'>
      <div className='modal-content'>
        <input type='text' value='Chinese for beginners' />
        <textarea className='materialize-textarea'>
          Suitable for those just starting to learn the language. Will help you take speed and gain confidence.
        </textarea>
        <div className='row'>
          <div className='input-field col s3'>
            <i className='material-icons prefix'>attach_money</i>
            <input placeholder='7.5' id='30_min' type='number' min='0' step='0.1' className='validate' />
            <label htmlFor='30_min'>30 min price USD</label>
            <div>
              <label>
                <input type='checkbox' checked='checked' />
                <span>On sale</span>
              </label>
            </div>
          </div>
          <div className='input-field col s3'>
            <i className='material-icons prefix'>attach_money</i>
            <input placeholder='7.5' id='45_min' type='number' min='0' step='0.1' className='validate' />
            <label htmlFor='45_min'>45 min price USD</label>
            <div>
              <label>
                <input type='checkbox' checked='checked' />
                <span>On sale</span>
              </label>
            </div>
          </div>
          <div className='input-field col s3'>
            <i className='material-icons prefix'>attach_money</i>
            <input placeholder='7.5' id='60_min' type='number' min='0' step='0.1' className='validate' />
            <label htmlFor='60_min'>60 min price USD</label>
            <div>
              <label>
                <input type='checkbox' checked='checked' />
                <span>On sale</span>
              </label>
            </div>
          </div>
          <div className='input-field col s3'>
            <i className='material-icons prefix'>attach_money</i>
            <input placeholder='7.5' id='90_min' type='number' min='0' step='0.1' className='validate' />
            <label htmlFor='90_min'>90 min price USD</label>
            <div>
              <label>
                <input type='checkbox' checked='checked' />
                <span>On sale</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a href='#!' className='modal-close waves-effect waves-light blue btn'>
          Save
        </a>
      </div>
    </div>
  );
};

export default LessonTypeModal;
