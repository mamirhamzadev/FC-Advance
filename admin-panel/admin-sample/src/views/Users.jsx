import { useEffect, useState } from "react";
import BreadCrumb from "./partials/BreadCrumb";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useToast from "../../../shared/store/hooks/useToast";
import { createDeveloperValidationSchema } from "../../../shared/utils/validations/yupValidations";
import { SWAL_VARIANT_CONFIGS } from "../../../shared/utils/constants";
import PlainDataTable from "../../../shared/styles/dataTables/PlainDataTable";
import ProcessingModal from "../../../shared/styles/modals/ProcessingModal";
import axios from "axios";
import { useDispatch } from "react-redux";

const Users = () => {
  const { notify } = useToast();

  const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isEmailAlreadyExists, setIsEmailAlreadyExists] = useState(false);
  const [isUsernameAlreadyExists, setIsUsernameAlreadyExists] = useState(false);
  const [isFetchingUsers, setIsFetchingUsers] = useState(true);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [users, setUsers] = useState([]);

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createDeveloperValidationSchema),
    mode: "onBlur",
    context: { isUpdatingRecord },
  });
  const passwordValue = watch("password");

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
      .get("/api/admins/list-users")
      .then((res) => {
        setUsers(res?.data?.users);
        setIsFetchingUsers(false);
      })
      .catch((err) => {
        setUsers([]);
        notify("error", err?.msg);
        setIsFetchingUsers(false);
      });
  }, [isFetchingUsers]);

  const handleAddUpdateButton = (item) => {
    reset({
      _id: item?._id,
      about: { name: item?.about?.name || "" },
      username: item?.username || "",
      email: item?.email || "",
      password: item?.password || "",
    });

    setIsUpdatingRecord(item?._id ? true : false);
    setShowAddUpdateModal(true);
    setIsEmailAlreadyExists(false);
    setIsUsernameAlreadyExists(false);
  };

  const handleShowPassword = (fieldName) => {
    setShowPassword({ ...showPassword, [fieldName]: !showPassword[fieldName] });
  };

  const handleUpdateActiveStatus = (e, formData) => {
    Swal.fire(SWAL_VARIANT_CONFIGS?.update?.before).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("/api/admins/change-user-state/" + formData?._id)
          .then((res) => {
            setIsFetchingUsers(true);
            Swal.fire(SWAL_VARIANT_CONFIGS?.update?.after);
          })
          .catch((err) => {
            Swal.fire(SWAL_VARIANT_CONFIGS?.update?.before);
            notify("error", err?.msg);
          });
      }
    });
  };

  const handleSubmitUserForm = async (data) => {
    setShowProgressModal(true);
    // try {
    //   await axios.post("/api/admins/create", data);
    //   notify("success", isUpdatingRecord ? "User Updated" : "User Added");
    //   setShowProgressModal(false);
    //   setShowAddUpdateModal(false);
    //   setIsFetchingUsers(true);
    // } catch (err) {
    //   console.log(err);
    //   notify("error", err.msg);
    //   setShowProgressModal(false);
    // }
    setTimeout(() => {
      notify("success", isUpdatingRecord ? "User Updated" : "User Added");
      setShowProgressModal(false);
      setShowAddUpdateModal(false);
      setIsFetchingUsers(true);
    }, 500);
  };

  const handleDeleteItemButton = () => {
    Swal.fire(SWAL_VARIANT_CONFIGS?.delete?.before).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          Swal.fire(SWAL_VARIANT_CONFIGS?.delete?.after);
        }, 500);
      }
    });
  };

  return (
    <>
      <div className="fade-in">
        <BreadCrumb pageNames={["Users"]} />

        <div className="container-xxl">
          <div className="row">
            <div className="d-flex flex-wrap flex-stack my-4">
              <div className="d-flex flex-wrap flex-stack">
                <div className="fw-bolder fs-4">Users</div>
                <span className="badge badge-square badge-success ms-2">
                  {isFetchingUsers ? "~" : users?.length}
                </span>
              </div>
              <div className="d-flex flex-wrap my-1">
                <div className="row">
                  <div className="col-12 me-5 d-flex justify-content-end">
                    <ul className="nav nav-pills">
                      <li className="me-3">
                        <button
                          onClick={() => handleAddUpdateButton()}
                          className="btn btn-icon bg-primary text-white plan-action-btn w-100 py-2 px-4 ms-4"
                        >
                          <i className="las la-plus fs-2 me-1 text-white" />
                          Create User
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row my-5">
            {isFetchingUsers ? (
              <button className="btn fw-bolder px-4">
                <span className="spinner-border spinner-border-lg" />
              </button>
            ) : (
              <div className="col-12 my-5">
                <PlainDataTable
                  data={users || []}
                  edit={handleAddUpdateButton}
                  delete={handleDeleteItemButton}
                  handleSwitch={handleUpdateActiveStatus}
                  quickActions={["isActive"]}
                  fieldNamesToShow={[
                    "First Name",
                    "Last Name",
                    "Email",
                    // "Username",
                    "Created",
                    "Updated",
                    "Access",
                  ]}
                  fieldsToShow={[
                    "first_name",
                    "last_name",
                    "email",
                    // "username",
                    "createdAt",
                    "updatedAt",
                    "isActive",
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showAddUpdateModal}
        onHide={() => setShowAddUpdateModal(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isUpdatingRecord ? "Update" : "Add New "} User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div className="row mb-6">
              <p className="fw-bold fs-7">
                Enter the email for which you want to create a new account.
                After you create an account for this email they will get an
                email to setup their password and start using their account.
              </p>
            </div>

            <div>
              <div className="mb-3">
                <label>Name</label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <input
                      className="form-control mb-0"
                      placeholder="Graham"
                      value={value}
                      onChange={onChange}
                      autoComplete="off"
                    />
                  )}
                />
                {errors?.name && (
                  <p className="text-danger fs-8">{errors.name.message}</p>
                )}
              </div>

              <div className="mb-3">
                <label>Email</label>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <input
                      className="form-control mb-0"
                      placeholder="john-dev@gmail.com"
                      type="email"
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setIsEmailAlreadyExists(false);
                      }}
                      autoComplete="new-email"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-danger fs-8 m-0">{errors.email.message}</p>
                )}
                {isEmailAlreadyExists && (
                  <p className="text-danger fs-8 m-0">
                    This email is already registered.
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label>Username</label>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value } }) => (
                    <input
                      className="form-control mb-0"
                      placeholder="john"
                      type="text"
                      value={value}
                      onChange={(e) => {
                        onChange(e);
                        setIsUsernameAlreadyExists(false);
                      }}
                      autoComplete="new-username"
                    />
                  )}
                />
                {errors.username && (
                  <p className="text-danger fs-8">{errors.username.message}</p>
                )}
                {isUsernameAlreadyExists && (
                  <p className="text-danger fs-8">
                    This username is already registered.
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label>Password</label>
                <div className="position-relative">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                      <input
                        className="form-control mb-0"
                        placeholder="*******"
                        type={showPassword.password ? "text" : "password"}
                        value={value}
                        onChange={onChange}
                        autoComplete="new-password"
                      />
                    )}
                  />
                  <i
                    className={`position-absolute end-0 top-50 translate-middle-y p-2 fa ${
                      showPassword.password ? "fa-eye-slash" : "fa-eye"
                    }`}
                    onClick={() => handleShowPassword("password")}
                  />
                </div>
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

              {errors.password && (
                <p className="text-danger fs-8">{errors.password.message}</p>
              )}
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
            <button
              type="button"
              className="btn btn-success py-2 fw-bolder px-4"
              onClick={handleSubmit(handleSubmitUserForm)}
              disabled={isCreatingUser}
            >
              {isCreatingUser ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Processing...
                </>
              ) : isUpdatingRecord ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
            <button
              type="button"
              disabled={isCreatingUser}
              className="btn btn-light"
              onClick={() => setShowAddUpdateModal(false)}
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <ProcessingModal
        isOpen={showProgressModal}
        setIsOpen={setShowProgressModal}
        icon="processing"
        heading={isUpdatingRecord ? "Updating User" : "Adding User"}
        handleSubmit={() => window.location.reload()}
        description="Please wait for the process to complete, do not close browser."
      />
    </>
  );
};

export default Users;
