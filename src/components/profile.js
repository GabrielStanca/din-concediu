import React, {useEffect, useState} from "react";
import "../style/profile.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import noPhoto from "../images/no-photo.png";
import {
    faPhone,
    faUserTie,
    faCalendar,
    faPenToSquare,
    faCheck,
    faTrash,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {Tabs, TabList, TabPanel, Tab} from "react-tabs";
import {useSearchParams} from "react-router-dom";
import {useGlobalContext} from "../context/GlobalContext";
import {editCurrentUser} from "../services/editCurrentUser";
import DeleteAccountModal from "./reusableComponents/modal-delete";
import "../style/theme.css"


const Profile = () => {
    const {user} = useGlobalContext();

    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        birthDate: "",
        description: "",
        imageUser: "",
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
                imageUser: user.imageUser || "",
            });
        }
    }, [user]);

    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeThemeIndex, setActiveThemeIndex] = useState(0);
    const [editSuccess, setEditSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changePassword, setChangePassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [theme, setTheme] = useState("default");

    const handleThemeButtonClick = (theme) => {
        setTheme(theme === 0 ? "default" : "dark");
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

    return (
        <html className={`theme-${theme} html-page`}>
        <div className="profile__page">
            <DeleteAccountModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
            />

            {editSuccess ? (
                <div className="toast">
                    <FontAwesomeIcon icon={faCheck} className="check-icon"/>
                    <p className="toast__text">Profile updated successfully!</p>
                </div>
            ) : null}

            <div className="profile__banner">
                <FontAwesomeIcon icon={faPlus} className="plus-icon"/>
                {userDetails.imageUser ? (
                    <img
                        src={userDetails.imageUser}
                        alt="user"
                        className="profile__banner__image-user"
                        //onClick={() => document.getElementById("fileInput").click()}
                    />
                ) : (
                    <img
                        src={noPhoto}
                        alt="user"
                        className="profile__banner__image-user"
                        //onClick={() => document.getElementById("fileInput").click()}
                        //onChange={handleImageChange}
                    />
                )}
                <input
                    type="file"
                    id="fileInput"
                    style={{display: "none"}}
                    //onChange={handleImageChange}
                />
            </div>

            <div className="profile__container">
                <div className="profile__container__details__main">
                    {searchParams.get("action") !== "edit-details" ? (
                        <>
                            <p className="profile__container__details__name color-black">
                                {`${userDetails.firstName}  ${userDetails.lastName}`}
                            </p>
                            <p className="profile__container__details__email color-black">
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
                                onClick={() => {
                                    setActiveTabIndex(0)
                                    setSearchParams({action: "details"})
                                }}
                            >
                                My Account
                            </Tab>
                            <Tab
                                className={`tab ${activeTabIndex === 1 ? "active" : ""}`}
                                onClick={() => {
                                    setActiveTabIndex(1)
                                    setSearchParams({action: "details"})
                                }}
                            >
                                Settings
                            </Tab>
                        </TabList>
                    </div>
                    <TabPanel>
                        <div className="profile__container__details">
                            {searchParams.get("action") !== "edit-details" ? (
                                <div className="profile__container__details__container">
                                    <p className="profile__container__details__title color-black">
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="padding-icons cursor-pointer title-icon"
                                            onClick={() => handleClick(searchParams)}
                                        ></FontAwesomeIcon>
                                        Details:
                                    </p>
                                    <hr className="details-hr"></hr>
                                    <p className="font-size-16 color-black">
                                        <FontAwesomeIcon icon={faPhone} className="padding-icons"/>
                                        {userDetails.phone}
                                    </p>
                                    <p className="font-size-16 color-black">
                                        <FontAwesomeIcon
                                            icon={faUserTie}
                                            className="padding-icons "
                                        />
                                        {userDetails.gender}
                                    </p>
                                    <p className="font-size-16 color-black">
                                        <FontAwesomeIcon
                                            icon={faCalendar}
                                            className="padding-icons"
                                        ></FontAwesomeIcon>
                                        {userDetails.birthDate}
                                    </p>
                                </div>
                            ) : (
                                <div className="profile__container__details__edit">
                                    <label htmlFor="firstName" className="color-black">First Name:</label>
                                    <input
                                        id="firstName"
                                        className="edit-inputs color-black"
                                        value={userDetails.firstName}
                                        onChange={(e) => {
                                            setUserDetails({
                                                ...userDetails,
                                                firstName: e.target.value,
                                            });
                                        }}
                                    ></input>
                                    <label htmlFor="lastName" className="color-black">Last Name:</label>
                                    <input
                                        id="lastName"
                                        className="edit-inputs color-black"
                                        value={userDetails.lastName}
                                        onChange={(e) => {
                                            setUserDetails({
                                                ...userDetails,
                                                lastName: e.target.value,
                                            });
                                        }}
                                    ></input>
                                    <label htmlFor="email" className="color-black">Email:</label>
                                    <input
                                        id="email"
                                        className="edit-inputs color-black"
                                        value={userDetails.email}
                                        onChange={(e) => {
                                            setUserDetails({...userDetails, email: e.target.value});
                                        }}
                                    ></input>
                                    <label htmlFor="phone" className="color-black">Phone:</label>
                                    <input
                                        id="phone"
                                        className="edit-inputs color-black"
                                        value={userDetails.phone}
                                        onChange={(e) => {
                                            setUserDetails({...userDetails, phone: e.target.value});
                                        }}
                                    ></input>
                                    <label htmlFor="gender" className="color-black">Gender:</label>
                                    <select
                                        id="gender"
                                        className="profile-edit-select cursor-pointer color-black"
                                        value={userDetails.gender || "Choose"}
                                        onChange={(e) => {
                                            setUserDetails({
                                                ...userDetails,
                                                gender: e.target.value,
                                            });
                                        }}
                                    >
                                        {genderOptions.map((option) => (
                                            <option key={option.value} value={option.value} className="color-black">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>

                                    <label htmlFor="birthDate" className="color-black">Date of birth:</label>
                                    <input
                                        type="date"
                                        className="edit-birth-date color-black"
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
                                    <p className="profile__container__about-me__title font-size-16 color-black">
                                        <FontAwesomeIcon
                                            icon={faPenToSquare}
                                            className="padding-icons cursor-pointer title-icon"
                                            onClick={() => handleClickEditDescription(searchParams)}
                                        ></FontAwesomeIcon>
                                        About me:
                                    </p>
                                    <hr className="details-hr"></hr>
                                    <p className="profile__container__about-me-description font-size-16 color-black">
                                        {userDetails.description}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="profile__container__about-me__edit">
                    <textarea
                        className="profile-edit-textarea color-black"
                        placeholder="Write something about yourself..."
                        maxLength={400}
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
                                        onClick={() => {
                                            handleButtonClick(0)
                                            handleThemeButtonClick(0)
                                        }}
                                    ></button>
                                    <p className="profile__settings__theme color-black">Default</p>
                                </div>
                                <div className="settings_themes">
                                    <button
                                        className={`settings_dark-theme ${
                                            activeThemeIndex === 1 ? "active" : ""
                                        }`}
                                        onClick={() => {
                                            handleButtonClick(1)
                                            handleThemeButtonClick(1)

                                        }}
                                    ></button>
                                    <p className="profile__settings__theme color-black">Dark Theme</p>
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
                                                    editCurrentUser(changePassword);
                                                    handleClickRemove(searchParams);
                                                    setEditSuccess(true);
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
          <TabPanel>
            <div className="profile__container__settings">
              <div className="profile__container__settings__theme">
                <h1 className="profile__container__about-me__title">Theme:</h1>
                <div className="settings_themes">
                  <button
                    className={`settings_default-theme ${
                      activeThemeIndex === 0 ? "active" : ""
                    }`}
                    onClick={() =>{handleButtonClick(0)
                      handleThemeButtonClick(0)
                    }}
                  ></button>
                  <p className="profile__settings__theme color-black">Default</p>
                </div>
                <div className="settings_themes">
                  <button
                    className={`settings_dark-theme ${
                      activeThemeIndex === 1 ? "active" : ""
                    }`}
                    onClick={() =>{
                      handleButtonClick(1)
                      handleThemeButtonClick(1)
                      
                    }}
                  ></button>
                  <p className="profile__settings__theme color-black">Dark Theme</p>
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
                    <label htmlFor="oldPassword" className="color-black">Old Password:</label>
                    <input
                      id="oldPassword"
                      className="edit-inputs color-black"
                      type="password"
                      onChange={(e) => {
                        setChangePassword({
                          ...changePassword,
                          oldPassword: e.target.value,
                        });
                      }}
                    ></input>
                    <label htmlFor="newPassword" className="color-black">New Password:</label>
                    <input
                      id="newPassword"
                      className="edit-inputs color-black"
                      type="password"
                      onChange={(e) => {
                        setChangePassword({
                          ...changePassword,
                          newPassword: e.target.value,
                        });
                      }}
                    ></input>
                    <label htmlFor="confirmPassword" className="color-black">Confirm Password:</label>
                    <input
                      id="confirmPassword"
                      className="edit-inputs color-black"
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
                          editCurrentUser(changePassword);
                          handleClickRemove(searchParams);
                          setEditSuccess(true);
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
    </html>
  );
};

export default Profile;
