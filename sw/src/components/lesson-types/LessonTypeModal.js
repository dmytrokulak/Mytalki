import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLessonType, updateLessonType, clearCurrent } from '../../actions/lessonTypeActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const LessonTypeModal = ({ lessonTypes: { current }, addLessonType, updateLessonType, clearCurrent }) => {
  const offersDefault = [
    {
      id: 1,
      time: 30,
      price: 1.0,
      currency: 'USD',
      onsale: true,
    },
    {
      id: 2,
      time: 45,
      price: 1.0,
      currency: 'USD',
      onsale: false,
    },
    {
      id: 3,
      time: 60,
      price: 1.0,
      currency: 'USD',
      onsale: true,
    },
    {
      id: 4,
      time: 90,
      price: 1.0,
      currency: 'USD',
      onsale: false,
    },
  ];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [offers, setOffers] = useState(offersDefault);

  useEffect(() => {
    if (current != null) {
      setTitle(current.title);
      setDescription(current.description);
      setOffers(current.offers);
    }
  }, [current]);

  const onSubmit = () => {
    if (!title) {
      M.toast({ html: 'Please enter title!' });
    } else if (!description) {
      M.toast({ html: 'Please enter description!' });
    } else {
      if (current) {
        updateLessonType({
          id: current.id,
          title,
          description,
          active: current.active,
          offers,
        });
        M.toast({ html: `Lesson type ${title} updated.` });
      } else {
        addLessonType({
          title,
          description,
          active: true,
          offers,
        });
        M.toast({ html: `Lesson type ${title} added.` });
      }

      M.Modal.getInstance(document.getElementById('lesson-type-modal')).close();
      doCleanUp();
    }
  };

  const doCleanUp = () => {
    if (current) {
      clearCurrent();
    }
    setTitle('');
    setDescription('');
    setOffers(offersDefault);
  };

  return (
    <div id='lesson-type-modal' className='modal'>
      <div className='modal-content'>
        <input
          name='title'
          type='text'
          className='validate'
          value={title}
          placeholder='Please enter title...'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name='description'
          className='materialize-textarea validate'
          value={description}
          placeholder='Please enter description...'
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <div className='row'>
          {offers.map((offer, index) => {
            return (
              <div className='input-field col s3' key={`${offer.time}_min`}>
                <i className='material-icons prefix'>attach_money</i>
                <input
                  value={offer.price}
                  id={`${offer.time}_min`}
                  type='number'
                  min='1'
                  step='0.1'
                  className='validate'
                  onChange={(e) => {
                    offers[index].price = e.target.value;
                    setOffers([...offers]);
                  }}
                />
                <label className='active' htmlFor={`${offer.time}_min`}>
                  {offer.time} min price {offer.currency}
                </label>
                <div>
                  <label>
                    <input
                      type='checkbox'
                      checked={offer.onsale}
                      value={offer.onsale}
                      onChange={(e) => {
                        offers[index].onsale = !(e.target.value === 'true');
                        setOffers([...offers]);
                      }}
                    />
                    <span>On sale</span>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='modal-footer'>
        <a href='#!' onClick={doCleanUp} className='waves-effect waves-light grey lighten-3 btn-flat modal-close'>
          Cancel
        </a>
        <a href='#!' onClick={onSubmit} className='waves-effect waves-light teal white-text btn-flat'>
          Save
        </a>
      </div>
    </div>
  );
};

LessonTypeModal.propTypes = {
  lessonTypes: PropTypes.object.isRequired,
  addLessonType: PropTypes.func.isRequired,
  updateLessonType: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lessonTypes: state.lessonTypes,
});

export default connect(mapStateToProps, { addLessonType, updateLessonType, clearCurrent })(LessonTypeModal);
