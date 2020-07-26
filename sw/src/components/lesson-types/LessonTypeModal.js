import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLessonType } from '../../actions/lessonTypeActions';

const LessonTypeModal = ({ lessonTypes: { current }, updateLessonType }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [offers, setOffers] = useState([
    {
      time: 30,
      price: 5.0,
      currency: 'USD',
      onsale: true,
    },
    {
      time: 45,
      price: 7.5,
      currency: 'USD',
      onsale: false,
    },
    {
      time: 60,
      price: 10.0,
      currency: 'USD',
      onsale: true,
    },
    {
      time: 90,
      price: 15.0,
      currency: 'USD',
      onsale: true,
    },
  ]);

  useEffect(() => {
    if (current != null) {
      setTitle(current.title);
      setDescription(current.description);
      setOffers(current.offers);
    }
  }, [current]);

  const onSubmit = () => {
    console.log({
      id: current.id,
      title,
      description,
      offers,
    });
    updateLessonType({
      id: current.id,
      title,
      description,
      offers,
    });
  };

  return (
    <div onSubmit={onSubmit} id='lesson-type-modal' className='modal'>
      <div className='modal-content'>
        <input name='title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea
          name='description'
          className='materialize-textarea'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
                  min='0'
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
                        offers[index].onsale = e.target.value;
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
        <a href='#!' onClick={onSubmit} className='modal-close waves-effect waves-light teal btn'>
          Save
        </a>
      </div>
    </div>
  );
};

LessonTypeModal.propTypes = {
  lessonTypes: PropTypes.object.isRequired,
  updateLessonType: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lessonTypes: state.lessonTypes,
});

export default connect(mapStateToProps, { updateLessonType })(LessonTypeModal);
