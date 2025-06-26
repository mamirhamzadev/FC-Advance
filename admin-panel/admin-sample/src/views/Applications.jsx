import { useEffect, useState } from "react";
import BreadCrumb from "./partials/BreadCrumb";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import PlainDataTable from "../../../shared/styles/dataTables/PlainDataTable";
import axios from "axios";

const DATE_FIELDS = ["dob", "start_date"];

const Application = () => {
  const [formData, setFormData] = useState();
  const [applications, setApplications] = useState([]);
  const [isFetchingApplications, setIsFetchingApplications] = useState(true);
  const [viewApplicationModal, setShowViewApplicationModal] = useState(false);

  useEffect(() => {
    if (!isFetchingApplications) return;
    axios
      .get("/api/applications/list?without_rep=1")
      .then((res) =>
        setApplications(
          (res?.data?.applications || []).map((app) => ({
            ...app,
            downloadLink: `${axios.defaults.baseURL}api/applications/pdf/${app._id}`,
          }))
        )
      )
      .catch((err) => toast.error(err?.msg))
      .finally(() => setIsFetchingApplications(false));
  }, [isFetchingApplications]);

  const handleViewApplicationButton = (item) => {
    setShowViewApplicationModal(true);
    setFormData(item);
  };

  const normalizeKey = (key = "") => {
    key = key.replace("_", " ").replace("-", " ");
    return key
      .split(" ")
      .map((part) =>
        part
          .split("")
          .map((char, index) => (index === 0 ? char.toUpperCase() : char))
          .join("")
      )
      .join(" ");
  };

  return (
    <>
      <div className="fade-in">
        <BreadCrumb pageNames={["Applications"]} />

        <div className="container-xxl">
          <div className="row">
            <div className="d-flex flex-wrap flex-stack my-4">
              <div className="d-flex flex-wrap flex-stack">
                <div className="fw-bolder fs-4">Direct Applications</div>
                <span className="badge badge-square badge-success ms-2">
                  {isFetchingApplications ? "~" : applications?.length}
                </span>
              </div>
            </div>
          </div>

          <div className="row my-5">
            {isFetchingApplications ? (
              <button className="btn fw-bolder px-4">
                <span className="spinner-border spinner-border-lg" />
              </button>
            ) : (
              <div className="col-12 my-5">
                <PlainDataTable
                  data={applications || []}
                  view={handleViewApplicationButton}
                  downloadPDF
                  fieldNamesToShow={[
                    "#",
                    "Submitted By (Email)",
                    "business Name",
                    "business Website",
                    "Owner Email",
                    "Partner Email",
                  ]}
                  fieldsToShow={[
                    "#",
                    "submitted_by.email",
                    "business.name",
                    "business.website",
                    "owner.email",
                    "partner.email",
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>

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
            {formData?.envelope_id && (
              <div className="d-flex mb-4 gap-2">
                <h3 className="card-title fw-bold fs-5 m-0">Envelope ID:</h3>
                <p className="mb-0">{formData?.envelope_id}</p>
              </div>
            )}
            <div className="d-flex mb-4 gap-2">
              <h3 className="card-title fw-bold fs-5 m-0">
                Submitted By (Name):
              </h3>
              <p className="mb-0">{formData?.submitted_by?.full_name}</p>
            </div>
            <div className="d-flex mb-4 gap-2">
              <h3 className="card-title fw-bold fs-5 m-0">
                Submitted By (Email):
              </h3>
              <p className="mb-0">{formData?.submitted_by?.email}</p>
            </div>
            <h2 className="my-5 pt-5">Business Information</h2>
            {Object.keys(formData?.business || {}).map((key, index) => (
              <div className="d-flex mb-4 gap-2" key={index}>
                <h3 className="card-title fw-bold fs-5 m-0">
                  {normalizeKey(key)}:
                </h3>
                <p className="mb-0">
                  {DATE_FIELDS.includes(key)
                    ? new Date(formData?.business?.[key]).toDateString()
                    : formData?.business?.[key]}
                </p>
              </div>
            ))}
            <h2 className="my-5 pt-5">Owner Information</h2>
            {Object.keys(formData?.owner || {}).map((key, index) => (
              <div className="d-flex mb-4 gap-2" key={index}>
                <h3 className="card-title fw-bold fs-5 m-0">
                  {normalizeKey(key)}:
                </h3>
                <p className="mb-0">
                  {typeof formData?.owner?.[key] === "string"
                    ? DATE_FIELDS.includes(key)
                      ? new Date(formData?.owner?.[key]).toDateString()
                      : formData?.owner?.[key]
                    : Object.values(formData?.owner?.[key]).join(", ")}
                </p>
              </div>
            ))}
            <h2 className="my-5 pt-5">Partner Information</h2>
            {formData?.partner?.full_name && formData?.partner?.email ? (
              <>
                {Object.keys(formData?.partner || {}).map((key, index) => {
                  if (
                    (typeof formData?.partner?.[key] === "string" &&
                      !formData?.partner?.[key]) ||
                    (typeof formData?.partner?.[key] === "object" &&
                      !Object.values(formData?.partner?.[key] || {}).find(
                        (val) => !!val
                      ))
                  )
                    return null;
                  return (
                    <div className="d-flex mb-4 gap-2" key={index}>
                      <h3 className="card-title fw-bold fs-5 m-0">
                        {normalizeKey(key)}:
                      </h3>
                      <p className="mb-0">
                        {typeof formData?.partner?.[key] === "string"
                          ? DATE_FIELDS.includes(key)
                            ? new Date(formData?.partner?.[key]).toDateString()
                            : formData?.partner?.[key]
                          : Object.values(formData?.partner?.[key] || {}).join(
                              ", "
                            )}
                      </p>
                    </div>
                  );
                })}
              </>
            ) : (
              <p>No partner available</p>
            )}

            <div className="d-flex mb-4 gap-2">
              <h3 className="card-title fw-bold fs-5 m-0">Signatures:</h3>
              <div className="border p-2 rounded-1 d-flex align-items-center justify-content-center">
                <img
                  src={axios.defaults.baseURL + formData?.signatures}
                  alt="signatures"
                  width="150px"
                />
              </div>
            </div>

            <div className="d-flex mb-4 gap-2">
              <h3 className="card-title fw-bold fs-5 m-0">
                Media (click to download):
              </h3>
              <div className="mb-0 d-flex gap-2 flex-wrap">
                {(formData?.media || []).length ? (
                  <>
                    {(formData?.media || []).map((media, index) => (
                      <a
                        key={index}
                        target="_blank"
                        href={axios.defaults.baseURL + media}
                        style={{
                          width: "100px",
                          aspectRatio: "1/1",
                          cursor: "pointer",
                          fontSize: "70px",
                        }}
                        title={media.split("=")[1]}
                        className="border p-2 rounded-1 d-flex align-items-center justify-content-center"
                      >
                        <i className="fa fa-file-pdf"></i>
                      </a>
                    ))}
                  </>
                ) : (
                  <p>No files attached</p>
                )}
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
    </>
  );
};

export default Application;
