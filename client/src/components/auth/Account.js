import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { changeUserName, changeEmail, changePassword, changeTimezone } from '../../actions/accountActions';

const Account = ({
  auth: { user },
  system: { timezones },
  changeUserName,
  changeEmail,
  changePassword,
  changeTimezone,
}) => {
  useEffect(() => {
    M.AutoInit();
    //eslint-disable-next-line
  }, []);

  const [editName, setEditName] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const [editEmail, setEditEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [emailRepeat, setEmailRepeat] = useState('');

  const [editPassword, setEditPassword] = useState(false);
  const [passwordOld, setPasswordOld] = useState('');
  const [passwordNew, setPasswordNew] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [timezone, setTimezone] = useState(user.timezone);

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

  const saveEmail = () => {
    if (email !== emailRepeat) {
      M.toast({ html: "Emails don't match" });
      return;
    }
    changeEmail(email);
    setEditEmail(false);
    M.toast({ html: 'Email changed' });
  };

  const resetEmail = () => {
    setEmail('');
    setEmailRepeat('');
    setEditEmail(false);
  };

  const savePassword = () => {
    if (passwordNew !== passwordRepeat) {
      M.toast({ html: "Passwords don't match" });
      return;
    }
    changePassword(user.email, passwordOld, passwordNew);
    setEditPassword(false);
    M.toast({ html: 'Password changed' });
  };

  const resetPassword = () => {
    setPasswordOld('');
    setPasswordNew('');
    setPasswordRepeat('');
    setEditPassword(false);
  };

  const saveTimezone = (tz) => {
    setTimezone(tz);
    changeTimezone(tz);
    M.toast({ html: 'Timezone changed' });
  };

  return (
    <div id='section-account' className='section'>
      <h4 className='center-align'>Account</h4>
      <div className='row'>
        <div className='col s3'>
          <img src={user.avatar} alt='avatar' className='responsive-img' />
        </div>
        <div className='col s8 user-info'>
          {editName ? (
            <div className='row'>
              <div className='col s4'>
                <input
                  type='text'
                  className='validate'
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
              </div>
              <div className='col s4'>
                <input
                  type='text'
                  className='validate'
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <div className='edit-name-actions'>
                <i className='material-icons small green-text' onClick={saveName}>
                  save
                </i>
                <i className='material-icons small red-text' onClick={resetName}>
                  cancel
                </i>
              </div>
            </div>
          ) : (
            <h5>
              <span>
                {user.firstName} {user.lastName}
              </span>
              <i className='material-icons' onClick={() => setEditName(true)}>
                edit
              </i>
            </h5>
          )}
          {editEmail ? (
            <div className='row'>
              <div className='col s4'>
                <input
                  type='email'
                  className='validate'
                  placeholder='New email'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className='col s4'>
                <input
                  type='email'
                  className='validate'
                  placeholder='Repeat email'
                  onChange={(e) => setEmailRepeat(e.target.value)}
                  value={emailRepeat}
                />
              </div>
              <div className='edit-name-actions'>
                <i className='material-icons small green-text' onClick={saveEmail}>
                  save
                </i>
                <i className='material-icons small red-text' onClick={resetEmail}>
                  cancel
                </i>
              </div>
            </div>
          ) : (
            <h6>
              <span>{user.email}</span>
              <i className='material-icons' onClick={() => setEditEmail(true)}>
                edit
              </i>
            </h6>
          )}
          {editPassword ? (
            <div className='row'>
              <div className='col s3'>
                <input
                  type='password'
                  className='validate'
                  placeholder='Old password'
                  onChange={(e) => setPasswordOld(e.target.value)}
                  value={passwordOld}
                />
              </div>
              <div className='col s3'>
                <input
                  type='password'
                  className='validate'
                  placeholder='New password'
                  onChange={(e) => setPasswordNew(e.target.value)}
                  value={passwordNew}
                />
              </div>
              <div className='col s3'>
                <input
                  type='password'
                  className='validate'
                  placeholder='Repeat password'
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  value={passwordRepeat}
                />
              </div>
              <div className='edit-name-actions'>
                <i className='material-icons small green-text' onClick={savePassword}>
                  save
                </i>
                <i className='material-icons small red-text' onClick={resetPassword}>
                  cancel
                </i>
              </div>
            </div>
          ) : (
            <h6>
              <a href='#!' onClick={() => setEditPassword(true)}>
                Change password
              </a>
            </h6>
          )}

          <div className='timezone-container'>
            <a className='dropdown-trigger btn' href='#' data-target='timezone-dropdown'>
              {timezone.displayName}
            </a>
            <ul id='timezone-dropdown' className='dropdown-content'>
              {timezones &&
                timezones.map((tz) => (
                  <li key={tz.id}>
                    <a href='#!' onClick={() => saveTimezone({ id: tz.id, displayName: tz.displayName })}>
                      {tz.displayName}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Account.propTypes = {
  auth: PropTypes.object.isRequired,
  changeUserName: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  system: state.system,
});

export default connect(mapStateToProps, { changeUserName, changeEmail, changePassword, changeTimezone })(Account);
