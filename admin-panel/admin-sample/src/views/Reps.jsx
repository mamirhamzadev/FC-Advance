import { useEffect, useState } from "react";
import BreadCrumb from "./partials/BreadCrumb";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import useToast from "../../../shared/store/hooks/useToast";
import PlainDataTable from "../../../shared/styles/dataTables/PlainDataTable";
import { handleFormDataInput } from "../../../shared/utils/helpers";
import ProcessingModal from "../../../shared/styles/modals/ProcessingModal";
import { SWAL_VARIANT_CONFIGS } from "../../../shared/utils/constants";
import axios from "axios";
import { Link } from "react-router-dom";

const IMAGE_EXTS = ["png", "jpg", "jpeg", "gif", "tiff", "bmp", "webp", "svg"];
const VIDEO_EXTS = [
  ".mp4",
  ".mkv",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".webm",
  ".3gp",
  ".m4v",
  ".ts",
  ".vob",
  ".m2ts",
  ".ogv",
  ".f4v",
  ".rm",
];
const FILE_NAMES = {
  any: "fa fa-file",
  xls: "fa fa-file-excel",
  xlsx: "fa fa-file-excel",
  doc: "fa fa-file-word",
  docx: "fa fa-file-word",
  pdf: "fa fa-file-pdf",
  zip: "fa fa-file-zipper",
  tar: "fa fa-file-zipper",
  rar: "fa fa-file-zipper",
  ppt: "fa fa-file-powerpoint",
  pptx: "fa fa-file-powerpoint",
  txt: "fa fa-file-lines",
  csv: "fa fa-file-csv",
  video: "fa fa-file-video",
};

const DATE_FIELDS = ["dob", "start_date"];

const Application = () => {
  const { notify } = useToast();

  const [formData, setFormData] = useState();
  const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
  const [reps, setReps] = useState([]);
  const [isFetchingReps, setIsFetchingReps] = useState(true);
  const [isFetchingRep, setIsFetchingRep] = useState(false);
  const [viewRepModal, setShowViewRepModal] = useState(false);
  const [application, setApplication] = useState();
  const [viewApplicationModal, setShowViewApplicationModal] = useState(false);
  const [isProcessingAddUpdate, setIsProcessingAddUpdate] = useState(false);

  useEffect(() => {
    if (!isFetchingReps) return;
    axios
      .get("/api/reps/list")
      .then((res) => setReps(res?.data?.reps))
      .catch((err) => notify(err?.msg))
      .finally(() => setIsFetchingReps(false));
  }, [isFetchingReps]);

  const handleAddUpdateButton = (item) => {
    setFormData(item?._id ? item : null);
    setIsUpdatingRecord(item?._id ? true : false);
    setShowAddUpdateModal(true);
  };

  const handleViewRepsButton = (item) => {
    setIsFetchingRep(true);
    setShowViewRepModal(true);
    axios
      .get("/api/reps/get/" + item?._id)
      .then((res) => setFormData(res?.data?.rep))
      .catch((err) => notify("error", err.msg))
      .finally(() => setIsFetchingRep(false));
  };

  const handleViewApplicationDialog = (application) => {
    setApplication(application);
    setShowViewApplicationModal(true);
  };

  const handleDeleteItemButton = (data) => {
    Swal.fire(SWAL_VARIANT_CONFIGS?.delete?.before).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/api/reps/remove/" + data._id)
          .then((res) => {
            notify("success", res?.msg);
            Swal.fire(SWAL_VARIANT_CONFIGS?.delete?.after);
            setIsFetchingReps(true);
          })
          .catch((err) => {
            notify("error", err?.msg);
            Swal.fire(SWAL_VARIANT_CONFIGS?.delete?.before);
          });
      }
    });
  };

  const handleSubmitRepForm = (e) => {
    e.preventDefault();

    setShowProgressModal(true);
    setIsProcessingAddUpdate(true);

    const dataToSend = new FormData(e.target);
    const api_url = isUpdatingRecord ? "/api/reps/update" : "/api/reps/create";
    axios
      .post(api_url, Object.fromEntries(dataToSend))
      .then((res) => {
        setShowAddUpdateModal(false);
        notify("success", res?.msg);
        setIsFetchingReps(true);
        setIsUpdatingRecord(false);
      })
      .catch((err) => {
        notify("error", err?.msg);
      })
      .finally(() => {
        setIsProcessingAddUpdate(false);
        setShowProgressModal(false);
      });
  };

  const constructPreview = (media) => {
    if (!media) return;
    let preview = {};
    const ext = (media.split(".").pop() || "").toLowerCase();
    if (IMAGE_EXTS.includes(ext))
      preview = { url: axios.defaults.baseURL + media };
    else if (VIDEO_EXTS.includes(ext)) preview = { icon: FILE_NAMES.video };
    else if (Object.keys(FILE_NAMES).includes(ext))
      preview = { icon: FILE_NAMES[ext] };
    else preview = { icon: FILE_NAMES.any };

    if (preview?.url)
      return (
        <img
          src={preview.url}
          alt="..."
          className="h-100 w-100 object-fit-cover"
        />
      );
    else if (preview?.icon) return <i className={preview.icon}></i>;
    return null;
  };

  const downloadFile = async (media) => {
    try {
      const response = await fetch(`${axios.defaults.baseURL}${media}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", media.split("\\")[1]);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <div className="fade-in">
        <BreadCrumb pageNames={["Companies"]} />

        <div className="container-xxl">
          <div className="row">
            <div className="d-flex flex-wrap flex-stack my-4">
              <div className="d-flex flex-wrap flex-stack">
                <div className="fw-bolder fs-4">Companies</div>
                <span className="badge badge-square badge-success ms-2">
                  {isFetchingReps ? "~" : reps?.length}
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
                          Add Rep
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row my-5">
            {isFetchingReps ? (
              <button className="btn fw-bolder px-4">
                <span className="spinner-border spinner-border-lg" />
              </button>
            ) : (
              <div className="col-12 my-5">
                <PlainDataTable
                  data={reps || []}
                  view={handleViewRepsButton}
                  edit={handleAddUpdateButton}
                  delete={handleDeleteItemButton}
                  fieldNamesToShow={["#", "Name", "Link"]}
                  fieldsToShow={["#", "name", "link"]}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={showAddUpdateModal}
        onHide={() => {
          setShowAddUpdateModal(false);
          setIsUpdatingRecord(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isUpdatingRecord ? "Update" : "Add New "} Rep
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitRepForm}>
          {isUpdatingRecord ? (
            <input type="hidden" name="_id" value={formData?._id || ""} />
          ) : null}
          <Modal.Body className="modal-scrollable-body">
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Name
              </label>
              <div className="col-lg-8 fv-row">
                <input
                  type="text"
                  name="name"
                  className="form-control form-control-solid mb-3 mb-lg-0"
                  placeholder="Rep Name"
                  value={formData?.name || ""}
                  onChange={(e) => handleFormDataInput(e, setFormData)}
                  required
                />
              </div>
            </div>
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Email
              </label>
              <div className="col-lg-8 fv-row">
                <input
                  type="email"
                  name="email"
                  className="form-control form-control-solid mb-3 mb-lg-0"
                  placeholder="Email"
                  value={formData?.email || ""}
                  onChange={(e) => handleFormDataInput(e, setFormData)}
                  required
                />
                <p className="mt-1" style={{ color: "gray" }}>
                  Email is used to access rep dashboard & password wil be sent
                  via email.
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-fixed-footer">
            <div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
              <button
                type="submit"
                className="btn btn-success py-2 fw-bolder px-4"
                disabled={!formData?.name || !formData?.email}
              >
                {isProcessingAddUpdate ? (
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
                  "Add"
                )}
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={() => setShowAddUpdateModal(false)}
              >
                Close
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        show={viewRepModal}
        onHide={() => setShowViewRepModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Rep{isFetchingRep ? "" : " - " + formData?.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-scrollable-body p-7">
          <div className="flex-col">
            {isFetchingRep ? (
              <button className="btn fw-bolder px-4 d-flex justify-content-center w-100">
                <span className="spinner-border spinner-border-lg" />
              </button>
            ) : (
              <>
                <div className="d-flex mb-4 gap-2">
                  <h3 className="card-title fw-bold fs-5 m-0">Email:</h3>
                  <p className="mb-0">{formData?.email}</p>
                </div>
                <div className="d-flex flex-column mb-4 w-100">
                  <div className="d-flex gap-2 mt-3">
                    <div className="fw-bold fs-5">Applications</div>
                    <span className="badge badge-square badge-success">
                      {isFetchingReps
                        ? "~"
                        : formData?.applications?.length || 0}
                    </span>
                  </div>

                  <div className="w-100">
                    {isFetchingReps ? (
                      <button className="btn fw-bolder px-4">
                        <span className="spinner-border spinner-border-lg" />
                      </button>
                    ) : (
                      <div className="col-12 my-5 overflow-auto">
                        <table className="w-100 border border-collapse">
                          <thead>
                            <tr>
                              <th
                                className="p-3"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                #
                              </th>
                              <th
                                className="p-3"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Submitted By (Email)
                              </th>
                              <th
                                className="p-3"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Business Name & website
                              </th>
                              <th
                                className="p-3"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Owner Email
                              </th>
                              <th
                                className="p-3"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Partner Email
                              </th>
                              <th
                                className="p-3"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(formData?.applications || []).length ? (
                              <>
                                {(formData?.applications || []).map(
                                  (application, index) => (
                                    <tr key={index}>
                                      <td className="p-3">{index + 1}</td>
                                      <td className="p-3">
                                        {application?.submitted_by?.email}
                                      </td>
                                      <td className="p-3">
                                        <div className="d-flex align-items-center gap-2 flex-wrap">
                                          <p className="m-0">
                                            {application?.business?.name}
                                          </p>
                                          <Link
                                            className="text-primary"
                                            target="_blank"
                                            to={application?.business?.website}
                                          >
                                            View Business
                                          </Link>
                                        </div>
                                      </td>
                                      <td className="p-3">
                                        {application?.owner?.email}
                                      </td>
                                      <td className="p-3">
                                        {application?.partner?.email || "-"}
                                      </td>
                                      <td className="p-3">
                                        <button
                                          onClick={() =>
                                            handleViewApplicationDialog(
                                              application
                                            )
                                          }
                                          className="border-0 bg-transparent d-flex lign-items-center justify-content-center"
                                        >
                                          <i className="fa fa-eye"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </>
                            ) : (
                              <tr>
                                <td
                                  className="p-3 text-center fw-bold"
                                  colSpan={6}
                                >
                                  No Records Found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-fixed-footer">
          <div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setShowViewRepModal(false)}
            >
              Close
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        show={viewApplicationModal}
        onHide={() => setShowViewApplicationModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Application Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-scrollable-body p-7">
          <div className="flex-col">
            <div className="d-flex mb-4 gap-2">
              <h3 className="card-title fw-bold fs-5 m-0">Envelope ID:</h3>
              <p className="mb-0">{application?.envelope_id}</p>
            </div>
            <div className="d-flex mb-4 gap-2">
              <h3 className="card-title fw-bold fs-5 m-0">
                Submitted By (Name):
              </h3>
              <p className="mb-0">{application?.submitted_by?.full_name}</p>
            </div>
            <div className="d-flex mb-4 gap-2">
              <h3 className="card-title fw-bold fs-5 m-0">
                Submitted By (Email):
              </h3>
              <p className="mb-0">{application?.submitted_by?.email}</p>
            </div>
            <h2 className="my-5 pt-5">Business Information</h2>
            {Object.keys(application?.business || {}).map((key, index) => (
              <div className="d-flex mb-4 gap-2" key={index}>
                <h3 className="card-title fw-bold fs-5 m-0">{key}:</h3>
                <p className="mb-0">
                  {DATE_FIELDS.includes(key)
                    ? new Date(application?.business?.[key]).toDateString()
                    : application?.business?.[key]}
                </p>
              </div>
            ))}
            <h2 className="my-5 pt-5">Owner Information</h2>
            {Object.keys(application?.owner || {}).map((key, index) => (
              <div className="d-flex mb-4 gap-2" key={index}>
                <h3 className="card-title fw-bold fs-5 m-0">{key}:</h3>
                <p className="mb-0">
                  {typeof application?.owner?.[key] === "string"
                    ? DATE_FIELDS.includes(key)
                      ? new Date(application?.owner?.[key]).toDateString()
                      : application?.owner?.[key]
                    : Object.values(application?.owner?.[key]).join(", ")}
                </p>
              </div>
            ))}
            <h2 className="my-5 pt-5">Partner Information</h2>
            {application?.partner?.full_name && application?.partner?.email ? (
              <>
                {Object.keys(application?.partner || {}).map((key, index) => {
                  if (
                    (typeof application?.partner?.[key] === "string" &&
                      !application?.partner?.[key]) ||
                    (typeof application?.partner?.[key] === "object" &&
                      !Object.values(application?.partner?.[key] || {}).find(
                        (val) => !!val
                      ))
                  )
                    return null;
                  return (
                    <div className="d-flex mb-4 gap-2" key={index}>
                      <h3 className="card-title fw-bold fs-5 m-0">{key}:</h3>
                      <p className="mb-0">
                        {typeof application?.partner?.[key] === "string"
                          ? DATE_FIELDS.includes(key)
                            ? new Date(
                                application?.partner?.[key]
                              ).toDateString()
                            : application?.partner?.[key]
                          : Object.values(
                              application?.partner?.[key] || {}
                            ).join(", ")}
                      </p>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>No partner available</p>
            )}

            <div className="d-flex mb-4 gap-2">
              <h3 className="card-title fw-bold fs-5 m-0">
                Media (click to download):
              </h3>
              <div className="mb-0 d-flex gap-2 flex-wrap">
                {(application?.media || [])
                  .filter((media) => !!media)
                  .map((media) => (
                    <div
                      onClick={() => downloadFile(media)}
                      style={{
                        width: "100px",
                        aspectRatio: "1/1",
                        cursor: "pointer",
                        fontSize: "70px",
                      }}
                      className="border p-2 rounded-1 d-flex align-items-center justify-content-center"
                    >
                      {constructPreview(media)}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-fixed-footer">
          <div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setShowViewApplicationModal(false)}
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
        heading={isUpdatingRecord ? "Updating Rep" : "Adding Rep"}
        handleSubmit={() => window.location.reload()}
        description="Please wait for the process to complete, do not close browser."
      />
    </>
  );
};

export default Application;
