import { useState } from "react";
import useToast from "../../../../../shared/store/hooks/useToast";
import axios from "axios";
import ProcessingModal from "../../../../../shared/styles/modals/ProcessingModal";

const ForgotPassword = (props) => {
  const { notify } = useToast();

  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setIsSubmittingRequest(true);
    const payload = new FormData(e.target);
    console.log(Object.fromEntries(payload));
    const api_route = showOtpInput
      ? "/api/admins/verify-otp"
      : "/api/admins/send-otp";
    axios
      .post(api_route, Object.fromEntries(payload))
      .then((res) => {
        if (showOtpInput) props.setCurrentComponent("login");
        notify("success", res?.msg);
        setShowOtpInput(!showOtpInput);
      })
      .catch((err) => {
        notify("error", err?.msg);
        setShowOtpInput(showOtpInput ? true : false);
      })
      .finally(() => setIsSubmittingRequest(false));
  };

  return (
    <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
      <form className="form w-100" onSubmit={handleForgotPassword}>
        <div className="text-center mb-10">
          <h1 className="text-dark mb-3">Forgot Password</h1>
          <div className="text-gray-400 fw-bold fs-4" />
        </div>
        <div className="fv-row mb-10">
          <label className="form-label fs-6 fw-bolder text-dark">Email</label>
          <input
            type="email"
            className="form-control form-control-lg form-control-solid"
            placeholder="example@domain.com"
            name="email"
            required
            readOnly={showOtpInput}
          />
        </div>
        {showOtpInput ? (
          <div className="fv-row mb-10">
            <label className="form-label fs-6 fw-bolder text-dark">OTP</label>
            <input
              type="text"
              className="form-control form-control-lg form-control-solid"
              placeholder="123456"
              name="otp"
              required
            />
          </div>
        ) : null}

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-lg btn-primary w-100 mb-5"
            disabled={isSubmittingRequest}
          >
            <span className="indicator-label">
              {showOtpInput ? "Verify OTP" : "Send Password Reset Email"}
            </span>
          </button>

          <div>
            Remember Password?{" "}
            <a
              className="cursor-pointer"
              onClick={() => props.setCurrentComponent("login")}
            >
              Sign in now!
            </a>
          </div>
        </div>
      </form>
      <ProcessingModal
        isOpen={isSubmittingRequest}
        setIsOpen={setIsSubmittingRequest}
        icon="processing"
        heading={"Sending Email"}
        handleSubmit={() => {}}
        description="Please wait for the process to complete, do not close browser."
      />
    </div>
  );
};

export default ForgotPassword;
