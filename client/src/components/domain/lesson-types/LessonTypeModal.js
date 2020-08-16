import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLessonType, updateLessonType, clearCurrent } from '../../../actions/lessonTypeActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const LessonTypeModal = ({ lessonTypes: { current }, addLessonType, updateLessonType, clearCurrent }) => {
  const offersDefault = [
    {
      id: 1,
      minutes: 30,
      price: 1.0,
      currency: 'USD',
      onSale: true,
    },
    {
      id: 2,
      minutes: 45,
      price: 1.0,
      currency: 'USD',
      onSale: false,
    },
    {
      id: 3,
      minutes: 60,
      price: 1.0,
      currency: 'USD',
      onSale: true,
    },
    {
      id: 4,
      minutes: 90,
      price: 1.0,
      currency: 'USD',
      onSale: false,
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
          onSale: current.onSale,
          offers,
        });
        M.toast({ html: `Lesson type ${title} updated.` });
      } else {
        addLessonType({
          title,
          description,
          onSale: true,
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
              <div className='input-field col s3' key={`${offer.minutes}_min`}>
                <i className='material-icons prefix'>attach_money</i>
                <input
                  value={offer.price}
                  id={`${offer.minutes}_min`}
                  type='number'
                  min='1'
                  step='0.1'
                  className='validate'
                  onChange={(e) => {
                    offers[index].price = +e.target.value;
                    setOffers([...offers]);
                  }}
                />
                <label className='active' htmlFor={`${offer.minutes}_min`}>
                  {offer.minutes} min price {offer.currency}
                </label>
                <div>
                  <label>
                    <input
                      type='checkbox'
                      checked={offer.onSale}
                      value={offer.onSale}
                      onChange={(e) => {
                        offers[index].onSale = !(e.target.value === 'true');
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
