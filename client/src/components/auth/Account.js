import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { changeUserName } from '../../actions/accountActions';

const Account = ({ auth: { user }, changeUserName }) => {
  useEffect(() => {
    M.AutoInit();
    //eslint-disable-next-line
  }, []);

  const [editName, setEditName] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const saveName = () => {
    changeUserName(firstName, lastName);
    setEditName(false);
    M.toast({ html: 'Name changed' });
  };
  const resetName = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEditName(false);
  };

  const resetAll = (e) => {
    if (!e.target.classList.contains('user-info-action')) {
      resetName();
    }
  };

  return (
    <div id='section-account' className='section' onClick={resetAll}>
      <h4 className='center-align'>Account</h4>
      <div className='row'>
        <div className='col s3'>
          <img src={user.avatar} alt='avatar' className='responsive-img' />
        </div>
        <div className='col s6 user-info'>
          {editName ? (
            <div className='row'>
              <div className=' col s3'>
                <input
                  type='text'
                  className='validate'
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className='col s3'>
                <input
                  type='text'
                  className='validate'
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <div className='edit-name-actions'>
                <i className='material-icons small green-text user-info-action' onClick={saveName}>
                  save
                </i>
              </div>
            </div>
          ) : (
            <h5>
              <span>
                {user.firstName} {user.lastName}
              </span>
              <i className='material-icons user-info-action' onClick={() => setEditName(true)}>
                edit
              </i>
            </h5>
          )}
          <h6>
            <span>{user.email}</span>
            <i className='material-icons user-info-action'>edit</i>
          </h6>
          <h6>
            <a href='#!'>Change password</a>
          </h6>
          <div>
            <a className='dropdown-trigger btn' href='#!' data-target='timezone-dropdown'>
              Timezone
            </a>
            <ul id='timezone-dropdown' className='dropdown-content'>
              <li>
                <a href='#!'>GMT</a>
              </li>
              <li>
                <a href='#!'>CET</a>
              </li>
              <li>
                <a href='#!'>EEST</a>
              </li>
            </ul>
            <span className='teal-text time-zone'>{user.timeZone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  changeUserName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changeUserName })(Account);
