import BreadCrumb from "./partials/BreadCrumb";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useToast from "../../../shared/store/hooks/useToast";
import { changePasswordValidationSchema } from "../../../shared/utils/validations/yupValidations";
import { useEffect } from "react";
import axios from "axios";

const ChangePassword = () => {
  const { notify } = useToast();

  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordValidationSchema),
    mode: "onBlur",
  });
  const passwordValue = watch("newPassword");

  const passwordStrength =
    passwordValue?.length >= 10 &&
    /[A-Z]/.test(passwordValue) &&
    /[!@#$%^&*]/.test(passwordValue)
      ? "strong"
      : passwordValue?.length >= 8 && /[0-9]/.test(passwordValue)
      ? "medium"
      : passwordValue
      ? "weak"
      : "";

  useEffect(() => {
    axios
      .get("/api/admins/profile")
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const handleShowPassword = (fieldName) => {
    setShowPassword({ ...showPassword, [fieldName]: !showPassword[fieldName] });
  };

  const handleUpdatePassword = (data) => {
    setIsSubmittingRequest(true);

    axios
      .post("/api/admins/change-password", data)
      .then((res) => {
        notify("success", res?.msg);
        setIsSubmittingRequest(false);
        reset({ oldPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch((err) => {
        notify("error", err?.msg);
        setIsSubmittingRequest(false);
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
      <BreadCrumb
        pageNames={["Change Password"]}
        page="profile"
        editButtons={true}
      />

      {loading ? (
        LoadingComponent
      ) : (
        <div className="d-flex flex-column-fluid align-items-start container-xxl mt-5 pt-5">
          <div className="content flex-row-fluid" id="kt_content">
            <div className="card mb-5 mb-xl-10">
              <div className="card-body pt-9 pb-0">
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder">
                  <li className="nav-item mt-2">
                    <a
                      className="nav-link text-active-primary ms-0 me-10 py-5 active"
                      href="#"
                    >
                      Change Password
                    </a>
                  </li>
                </ul>
                <div className="card-body border-top p-9">
                  <div className="fv-row mb-10 fv-plugins-icon-container">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      Old Password
                    </label>

                    <div className="position-relative mb-3">
                      <Controller
                        control={control}
                        name="oldPassword"
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="form-control mb-0"
                            placeholder="Password"
                            type={
                              showPassword.oldPassword ? "text" : "password"
                            }
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />

                      <span
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                        data-kt-password-meter-control="visibility"
                      >
                        <i
                          onClick={() => handleShowPassword("oldPassword")}
                          className={`toggle-password bi ${
                            showPassword.oldPassword ? "bi-eye" : "bi-eye-slash"
                          } fs-2`}
                        />
                      </span>
                    </div>

                    {errors.oldPassword && (
                      <p className="text-danger fs-8">
                        {errors.oldPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="fv-row mb-10 fv-plugins-icon-container">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      New Password
                    </label>

                    <div className="position-relative mb-3">
                      <Controller
                        control={control}
                        name="newPassword"
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="form-control mb-0"
                            placeholder="Password"
                            type={
                              showPassword.newPassword ? "text" : "password"
                            }
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />

                      <span
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                        data-kt-password-meter-control="visibility"
                      >
                        <i
                          onClick={() => handleShowPassword("newPassword")}
                          className={`toggle-password bi ${
                            showPassword.newPassword ? "bi-eye" : "bi-eye-slash"
                          } fs-2`}
                        />
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-1 mb-0">
                      {Array.from({ length: 5 }, (_, index) => (
                        <div
                          className={`${
                            passwordStrength === "weak" && index < 2
                              ? "bg-danger"
                              : passwordStrength === "medium" && index < 3
                              ? "bg-warning"
                              : passwordStrength === "strong" && index < 5
                              ? "bg-success"
                              : "bg-light"
                          }`}
                          style={{ height: "5px", width: "5%" }}
                          key={index}
                        />
                      ))}
                      {passwordStrength && (
                        <p
                          className={`text-small mb-0 fw-bold text-${
                            passwordStrength === "weak"
                              ? "danger"
                              : passwordStrength === "medium"
                              ? "warning"
                              : "success"
                          }`}
                        >
                          {passwordStrength.charAt(0).toUpperCase() +
                            passwordStrength.slice(1)}
                        </p>
                      )}
                    </div>

                    {errors.newPassword && (
                      <p className="text-danger fs-8">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="fv-row mb-10 fv-plugins-icon-container">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      Confirm New Password
                    </label>

                    <div className="position-relative mb-3">
                      <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                          <input
                            className="form-control mb-0"
                            placeholder="Password"
                            type={
                              showPassword.confirmPassword ? "text" : "password"
                            }
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />

                      <span
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                        data-kt-password-meter-control="visibility"
                      >
                        <i
                          onClick={() => handleShowPassword("confirmPassword")}
                          className={`toggle-password bi ${
                            showPassword.confirmPassword
                              ? "bi-eye"
                              : "bi-eye-slash"
                          } fs-2`}
                        />
                      </span>
                    </div>

                    {errors.confirmPassword && (
                      <p className="text-danger fs-8">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                  <button
                    className="btn fw-bolder change-btn btn-lg btn-dark w-100 mb-5"
                    name="edit_password"
                    onClick={handleSubmit(handleUpdatePassword)}
                    disabled={isSubmittingRequest}
                    data-kt-indicator={isSubmittingRequest}
                  >
                    <span className="indicator-label">Update Password</span>
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

export default ChangePassword;
