import React, { useEffect, useState } from "react";
import "../style/profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faUserTie,
  faCalendar,
  faPenToSquare,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { editCurrentUser } from "../services/editCurrentUser";
import DeleteAccountModal from "./reusableComponents/modal-delete";
import { ReactModal } from "react-modal";

const Profile = () => {
  const { user } = useGlobalContext();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    description: "",
  });

  const genderOptions = [
    {
      label: "Male",
      value: "Male",
    },
    {
      label: "Female",
      value: "Female",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  useEffect(() => {
    if (user) {
      setUserDetails({
        firstName: user.firstName || "-",
        lastName: user.lastName || "-",
        email: user.email || "-",
        phone: user.phone || "-",
        gender: user.gender || "-",
        birthDate: user.birthDate || "-",
        description: user.description || "",
      });
    }
  }, [user]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);
  const [userImage, setUserImage] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState("");

  const handleImageUserChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = (index) => {
    setActiveThemeIndex(index);
  };

  let updatedSearchParams = {};

  function handleClick(searchParams) {
    updatedSearchParams = {
      ...searchParams,
      action: "edit-details",
    };
    setSearchParams(updatedSearchParams);
  }

  function handleClickEditDescription(searchParams) {
    updatedSearchParams = {
      ...searchParams,
      action: "edit-description",
    };
    setSearchParams(updatedSearchParams);
  }

  function handleClickRemove(searchParams) {
    updatedSearchParams = {
      ...searchParams,
      action: "details",
    };
    setSearchParams(updatedSearchParams);
  }

  function handleClickChangePassword(searchParams) {
    updatedSearchParams = {
      ...searchParams,
      action: "change-password",
    };
    setSearchParams(updatedSearchParams);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOpenImageModal = () => {
    setImageModal(true);
  };

  const handleCloseImageModal = () => {
    setImageModal(false);
  };
  

  return (
    <div className="profile__page">
      <DeleteAccountModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />

      {editSuccess ? (
        <div className="toast">
          <FontAwesomeIcon icon={faCheck} className="check-icon" />
          <p className="toast__text">Profile updated successfully!</p>
        </div>
      ) : null}

      
      {imageModal ? (
        <div className="profile__banner--modal-open">
        <div className="profile__banner__image--modal-open">
          <img src={image} alt="Profile Banner" />
        </div>
        <input type="file" onChange={handleImageUserChange} />
        <button onClick={handleCloseImageModal}>Save</button>
      </div>
      ) : (
        <div className="profile__banner">
          <div className="profile__banner__image"
          onMouseEnter={handleOpenImageModal}
          >
            {userImage ? (
              <img src={userImage} alt="Profile Banner" />
            ) : (
              <></>
            )}

          </div>
        </div>
      )}
      <div className="profile__container">
        <div className="profile__container__details__main">
          {searchParams.get("action") !== "edit-details" ? (
            <>
              <p className="profile__container__details__name">
                {`${userDetails.firstName}  ${userDetails.lastName}`}
              </p>
              <p className="profile__container__details__email">
                {userDetails.email}
              </p>
            </>
          ) : (
            <div className="no-data"></div>
          )}
        </div>
        <Tabs>
          <div className="tabs-container">
            <TabList className="tab-list">
              <Tab
                className={`tab ${activeTabIndex === 0 ? "active" : ""}`}
                onClick={() => setActiveTabIndex(0)}
              >
                My Account
              </Tab>
              <Tab
                className={`tab ${activeTabIndex === 1 ? "active" : ""}`}
                onClick={() => setActiveTabIndex(1)}
              >
                Settings
              </Tab>
            </TabList>
          </div>
          <TabPanel>
            <div className="profile__container__details">
              {searchParams.get("action") !== "edit-details" ? (
                <div className="profile__container__details__container">
                  <p className="profile__container__details__title">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="padding-icons cursor-pointer"
                      onClick={() => handleClick(searchParams)}
                    ></FontAwesomeIcon>
                    Details:
                  </p>
                  <hr className="details-hr"></hr>
                  <p className="profile__container__details__phone">
                    <FontAwesomeIcon icon={faPhone} className="padding-icons" />
                    {userDetails.phone}
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="padding-icons"
                    />
                    {userDetails.gender}
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="padding-icons"
                    ></FontAwesomeIcon>
                    {userDetails.birthDate}
                  </p>
                </div>
              ) : (
                <div className="profile__container__details__edit">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    id="firstName"
                    className="edit-inputs"
                    value={userDetails.firstName}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        firstName: e.target.value,
                      });
                    }}
                  ></input>
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    id="lastName"
                    className="edit-inputs"
                    value={userDetails.lastName}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        lastName: e.target.value,
                      });
                    }}
                  ></input>
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    className="edit-inputs"
                    value={userDetails.email}
                    onChange={(e) => {
                      setUserDetails({ ...userDetails, email: e.target.value });
                    }}
                  ></input>
                  <label htmlFor="phone">Phone:</label>
                  <input
                    id="phone"
                    className="edit-inputs"
                    value={userDetails.phone}
                    onChange={(e) => {
                      setUserDetails({ ...userDetails, phone: e.target.value });
                    }}
                  ></input>
                  <label htmlFor="gender">Gender:</label>
                  <select
                    id="gender"
                    className="profile-edit-select cursor-pointer"
                    value={userDetails.gender || "Choose"}
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        gender: e.target.value,
                      });
                    }}
                  >
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <label htmlFor="birthDate">Date of birth:</label>
                  <input
                    type="date"
                    className="edit-birth-date"
                    value={userDetails.birthDate}
                    id="birthDate"
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        birthDate: e.target.value,
                      });
                    }}
                  ></input>
                  <div className="profile-edit-buttons">
                    <button
                      className="edit-cancel-details-button edit-buttons"
                      onClick={() => {
                        setUserDetails({
                          ...userDetails,
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email,
                          phone: user.phone,
                          gender: user.gender,
                          birthDate: user.birthDate,
                        });
                        handleClickRemove(searchParams);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="edit-submit-details-button edit-buttons"
                      onClick={() => {
                        editCurrentUser(userDetails);
                        handleClickRemove(searchParams);
                        setEditSuccess(true);
                        setTimeout(() => {
                          setEditSuccess(false);
                        }, 3000);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
              {searchParams.get("action") !== "edit-description" ? (
                <div className="profile__container__about-me">
                  <p className="profile__container__about-me__title">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="padding-icons cursor-pointer"
                      onClick={() => handleClickEditDescription(searchParams)}
                    ></FontAwesomeIcon>
                    About me:
                  </p>
                  <hr className="details-hr"></hr>
                  <p className="profile__container__about-me-description">
                    {userDetails.description}
                  </p>
                </div>
              ) : (
                <>
                  <div className="profile__container__about-me__edit">
                    <textarea
                      className="profile-edit-textarea"
                      placeholder="Write something about yourself..."
                      maxLength={200}
                      value={userDetails.description}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          description: e.target.value,
                        });
                      }}
                    ></textarea>
                    <div className="profile-edit-buttons">
                      <button
                        className="edit-cancel-details-button edit-buttons"
                        onClick={() => {
                          setUserDetails({
                            ...userDetails,
                            description: user.description,
                          });
                          handleClickRemove(searchParams);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="edit-submit-details-button edit-buttons"
                        onClick={() => {
                          editCurrentUser(userDetails);
                          handleClickRemove(searchParams);
                          setEditSuccess(true);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="profile__container__settings">
              <div className="profile__container__settings__theme">
                <h1 className="profile__container__about-me__title">Theme:</h1>
                <div className="settings_themes">
                  <button
                    className={`settings_default-theme ${
                      activeThemeIndex === 0 ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick(0)}
                  ></button>
                  <p className="profile__settings__theme">Default</p>
                </div>
                <div className="settings_themes">
                  <button
                    className={`settings_dark-theme ${
                      activeThemeIndex === 1 ? "active" : ""
                    }`}
                    onClick={() => handleButtonClick(1)}
                  ></button>
                  <p className="profile__settings__theme">Dark Theme</p>
                </div>
              </div>
              {searchParams.get("action") !== "change-password" ? (
                <div className="settings__change-password__delete-account">
                  <div className="profile__container__settings__change-password">
                    <button
                      className="profile__container__settings__change-password__button"
                      onClick={() => handleClickChangePassword(searchParams)}
                    >
                      Change Password
                    </button>
                  </div>
                  <div className="settings__delete-account">
                    <button
                      className="settings__delete-account__button"
                      onClick={() => {
                        handleOpenModal();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="trash-icon"
                      ></FontAwesomeIcon>
                      Delete Account
                    </button>
                  </div>
                </div>
              ) : (
                <div className="settings__change-password">
                  <div className="settings__change-password__inputs">
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input
                      id="oldPassword"
                      className="edit-inputs"
                      type="password"
                      onChange={(e) => {
                        setChangePassword({
                          ...changePassword,
                          oldPassword: e.target.value,
                        });
                      }}
                    ></input>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                      id="newPassword"
                      className="edit-inputs"
                      type="password"
                      onChange={(e) => {
                        setChangePassword({
                          ...changePassword,
                          newPassword: e.target.value,
                        });
                      }}
                    ></input>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      id="confirmPassword"
                      className="edit-inputs"
                      type="password"
                      onChange={(e) => {
                        setChangePassword({
                          ...changePassword,
                          confirmPassword: e.target.value,
                        });
                      }}
                    ></input>
                    <div className="profile-edit-buttons">
                      <button
                        className="edit-cancel-details-button edit-buttons"
                        onClick={() => {
                          setChangePassword({
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                          handleClickRemove(searchParams);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="edit-submit-details-button edit-buttons"
                        onClick={() => {
                          changePassword(changePassword);
                          setChangePassword({
                            oldPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
