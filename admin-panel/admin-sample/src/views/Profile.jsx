import { useRef, useState } from "react";
import BreadCrumb from "./partials/BreadCrumb";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfileValidationSchema } from "../../../shared/utils/validations/yupValidations";
import ImageLoader from "../../../shared/styles/loaders/ImageLoader";
import useToast from "../../../shared/store/hooks/useToast";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/actions/profile";

const Profile = () => {
  const dispatch = useDispatch();
  const { notify } = useToast();
  const hiddenImageFileInput = useRef();

  const {
    control,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateProfileValidationSchema),
    mode: "onBlur",
  });

  const [userProfileFormData, setUserProfileFormData] = useState({});
  const [userProfileImg, setUserProfileImg] = useState(null);
  const [isEmailAlreadyExists, setIsEmailAlreadyExists] = useState(false);
  const [isUsernameAlreadyExists, setIsUsernameAlreadyExists] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
    .get("/api/admins/profile")
      .then((res) => {
        const profile = res?.data?.profile;
        setUserProfileFormData(profile);
        dispatch(setProfile(profile));
        setValue("_id", profile?._id);
        setValue("name", profile?.name);
        setValue("email", profile?.email);
        setValue("username", profile?.username);
        setValue("profileImage", profile?.profileImage);
        setLoading(false);
      })
      .catch((err) => {
        notify("error", err?.msg);
        setValue("_id", "");
        setValue("name", "");
        setValue("email", "");
        setValue("username", "");
        setValue("profileImage", "");
        setLoading(false);
      });
  }, [loading]);

  const handleUpdateUser = async (data) => {
    setIsUpdatingUser(true);
    setIsEmailAlreadyExists(false);
    setIsUsernameAlreadyExists(false);

    const formDataToSend = new FormData();
    formDataToSend.append("imageBlob", userProfileImg);
    Object.keys(data).forEach((key) => formDataToSend.append(key, data[key]));
    axios
      .post("/api/admins/update", formDataToSend)
      .then((res) => {
        console.log(res);
        notify("success", res?.msg);
        setIsUpdatingUser(false);
        setLoading(true);
      })
      .catch((err) => {
        notify("error", err?.msg);
        console.log(err);
        setIsUpdatingUser(false);
        setIsEmailAlreadyExists(!!err?.data?.email);
        setIsUsernameAlreadyExists(!!err?.data?.username);
      });
  };

  const LoadingComponent = (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <BreadCrumb pageNames={["Personal Information"]} editButtons={true} />

      {loading ? (
        LoadingComponent
      ) : (
        <div className="container-xxl mt-5 pt-5">
          <div className="content flex-row-fluid" id="kt_content">
            <div className="card mb-5 mb-xl-10">
              <div className="card-body pt-9 pb-0">
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
                  <li className="nav-item mt-2">
                    <a
                      className="nav-link text-active-primary ms-0 me-10 py-5 active"
                      href="#"
                    >
                      Personal Information
                    </a>
                  </li>
                </ul>
                <div className="card-body border-top p-9">
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label fw-bold fs-6">
                      Profile Image
                    </label>
                    <div className="col-lg-4 position-relative">
                      <div
                        className="picture__image"
                        onClick={() => hiddenImageFileInput.current.click()}
                      >
                        {userProfileImg ? (
                          <img
                            src={URL.createObjectURL(userProfileImg)}
                            alt=""
                            className="w-100 h-100 rounded object-fit-contain"
                            loading="lazy"
                          />
                        ) : (
                          <ImageLoader
                            className="w-100 h-100 rounded object-fit-contain"
                            alt="Logo"
                            src={
                              userProfileFormData?.profileImage
                                ? `${axios.defaults.baseURL}${userProfileFormData?.profileImage}`
                                : `https://i.ibb.co/xSK2rKR6/default-profile-placeholder-mfby2k0rliz1szsn.webp`
                            }
                            loading="lazy"
                          />
                        )}
                      </div>

                      <Controller
                        control={control}
                        name="profileImage"
                        render={({ field: { onChange } }) => (
                          <div>
                            <input
                              style={{ display: "none" }}
                              ref={hiddenImageFileInput}
                              type="file"
                              accept="image/png, image/jpeg"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setUserProfileImg(file);
                              }}
                            />
                          </div>
                        )}
                      />

                      <div
                        className="position-absolute form-text"
                        style={{ left: -5, top: -20 }}
                      >
                        <span
                          onClick={() => hiddenImageFileInput.current.click()}
                          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow ms-4 "
                        >
                          <i className="bi bi-pencil-fill fs-7" />
                        </span>
                      </div>
                      <div
                        className="position-absolute form-text"
                        style={{ left: 25, top: -20 }}
                      >
                        <span
                          onClick={() => {
                            setUserProfileImg(null);
                            setValue("profileImage", "");
                            setUserProfileFormData({
                              ...userProfileFormData,
                              profileImage: "",
                            });
                            hiddenImageFileInput.current.value = "";
                          }}
                          className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow ms-4 "
                        >
                          <i className="bi bi-trash fs-7" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      Name
                    </label>
                    <div className="col-lg-8 fv-row">
                      <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="form-control mb-0"
                            placeholder="Name"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      {errors?.name && (
                        <p className="text-danger fs-8">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      Email
                    </label>
                    <div className="col-lg-8 fv-row">
                      <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="form-control mb-0"
                            placeholder="Email"
                            type="email"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-danger fs-8 m-0">
                          {errors.email.message}
                        </p>
                      )}
                      {isEmailAlreadyExists && (
                        <p className="text-danger fs-8 m-0">
                          This email is already registered.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row mb-6">
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      Username
                    </label>
                    <div className="col-lg-8 fv-row">
                      <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="form-control mb-0"
                            placeholder="Username"
                            type="text"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      {errors.username && (
                        <p className="text-danger fs-8">
                          {errors.username.message}
                        </p>
                      )}
                      {isUsernameAlreadyExists && (
                        <p className="text-danger fs-8">
                          This username is already registered.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card-footer d-flex justify-content-end py-6 px-9">
                  <button
                    className="btn fw-bolder change-btn btn-lg btn-dark w-100 mb-5"
                    name="edit_password"
                    onClick={handleSubmit(handleUpdateUser)}
                    disabled={isUpdatingUser}
                  >
                    <span className="indicator-label">Update</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
