import { validateUserInfoSchema } from 'schemas/validateUserInfoSchema.js';
import { useState } from 'react';
import sprite from '../../../images/sprite.svg';
import {
  AvatarBox,
  AvatarBtn,
  AvatarBtnText,
  AvatarImg,
  AvatarWrapper,
  EyeBtn,
  FieldWrapper,
  FileInput,
  FlexBox,
  Input,
  InputWrapper,
  LabelRadio,
  LabelRadioGender,
  PasswordBox,
  PasswordBoxTitle,
  PasswordLabel,
  RadioBox,
  StyledErrorMessage,
  StyledForm,
  SubmitBtn,
  Text,
  UserBox,
  UserLabel,
} from './SettingModal.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'redux/auth/authSelectors';
import { updateAvatarThunk } from '../../../redux/auth/authOperations';
import { Formik } from 'formik';

export const SettingModal = ({ isOpen, onRequestClose }) => {
  const { avatarUrl } = useSelector(selectUser);
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();

  const [isPassword, setIsPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleUploadPhoto = () => {
    console.log('File to upload:', selectedFile);
    dispatch(updateAvatarThunk(selectedFile));
  };

  const initialValues = {
    name: '',
    email: '',
    gender: 'woman',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleTogglePassword = passwordKey => {
    setIsPassword(prev => ({
      ...prev,
      [passwordKey]: !prev[passwordKey],
    }));
  };

  const handleSubmit = async () => {
    console.log('data has been saved');
    onRequestClose();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateUserInfoSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, handleChange }) => (
        <StyledForm>
          <Text>Your photo</Text>
          <AvatarWrapper>
            <AvatarBox>
              <AvatarImg src={avatarUrl} alt="user avatar" />
            </AvatarBox>

            <FileInput
              name="avatarUrl"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="uploadInput"
            />
            <AvatarBtn type="button" onClick={handleUploadPhoto}>
              <svg width="16" height="16" stroke="#407BFF" fill="none">
                <use xlinkHref={`${sprite}#icon-arrow-up-tray`} />
              </svg>
              <AvatarBtnText>Upload a photo</AvatarBtnText>
            </AvatarBtn>
          </AvatarWrapper>
          <FlexBox>
            <UserBox>
              <LabelRadioGender>Your gender identity</LabelRadioGender>
              <RadioBox>
                <Input
                  type="radio"
                  id="woman"
                  value="woman"
                  name="gender"
                  checked={values.gender === 'woman'}
                  onChange={handleChange}
                  className={errors.gender && touched.gender ? 'error' : ''}
                />
                <LabelRadio htmlFor="woman">Woman</LabelRadio>
                <Input
                  type="radio"
                  id="man"
                  value="man"
                  name="gender"
                  checked={values.gender === 'man'}
                  onChange={handleChange}
                />
                <LabelRadio htmlFor="man">Man</LabelRadio>
              </RadioBox>

              <FieldWrapper>
                <UserLabel htmlFor="name">Your name</UserLabel>
                <InputWrapper>
                  <Input id="name" name="name" />
                  <StyledErrorMessage component="div" name="name" />
                </InputWrapper>
              </FieldWrapper>

              <FieldWrapper>
                <UserLabel htmlFor="email">Your email</UserLabel>
                <InputWrapper>
                  <Input id="email" name="email" />
                  <StyledErrorMessage component="div" name="email" />
                </InputWrapper>
              </FieldWrapper>
            </UserBox>

            <PasswordBox>
              <PasswordBoxTitle>Password</PasswordBoxTitle>

              <FieldWrapper>
                <PasswordLabel htmlFor="oldPassword">
                  Outdated password:
                </PasswordLabel>
                <InputWrapper>
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Password"
                    type={isPassword.oldPassword ? 'text' : 'password'}
                    pattern="[0-9a-fA-F]{8,64}"
                  />

                  <EyeBtn
                    onClick={() => handleTogglePassword('oldPassword')}
                    type="button"
                  >
                    <svg width="16" height="16" stroke="#407BFF" fill="none">
                      <use
                        xlinkHref={
                          isPassword.oldPassword
                            ? `${sprite}#icon-eye`
                            : `${sprite}#icon-eye-slash`
                        }
                      />
                    </svg>
                  </EyeBtn>
                  <StyledErrorMessage component="div" name="oldPassword" />
                </InputWrapper>
              </FieldWrapper>

              <FieldWrapper>
                <PasswordLabel htmlFor="newPassword">
                  New password:
                </PasswordLabel>

                <InputWrapper>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    placeholder="Password"
                    type={isPassword.newPassword ? 'text' : 'password'}
                    pattern="[0-9a-fA-F]{8,64}"
                  />

                  <EyeBtn
                    onClick={() => handleTogglePassword('newPassword')}
                    type="button"
                  >
                    <svg width="16" height="16" stroke="#407BFF" fill="none">
                      <use
                        xlinkHref={
                          isPassword.newPassword
                            ? `${sprite}#icon-eye`
                            : `${sprite}#icon-eye-slash`
                        }
                      />
                    </svg>
                  </EyeBtn>
                  <StyledErrorMessage component="div" name="newPassword" />
                </InputWrapper>
              </FieldWrapper>

              <FieldWrapper>
                <PasswordLabel htmlFor="confirmPassword">
                  Repeat new password:
                </PasswordLabel>
                <InputWrapper>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Password"
                    type={isPassword.confirmPassword ? 'text' : 'password'}
                  />

                  <EyeBtn
                    onClick={() => handleTogglePassword('confirmPassword')}
                    type="button"
                  >
                    <svg width="16" height="16" stroke="#407BFF" fill="none">
                      <use
                        xlinkHref={
                          isPassword.confirmPassword
                            ? `${sprite}#icon-eye`
                            : `${sprite}#icon-eye-slash`
                        }
                      />
                    </svg>
                  </EyeBtn>
                  <StyledErrorMessage component="div" name="confirmPassword" />
                </InputWrapper>
              </FieldWrapper>
            </PasswordBox>
          </FlexBox>

          <SubmitBtn type="submit">
            Save
          </SubmitBtn>
        </StyledForm>
      )}
    </Formik>
  );
};
