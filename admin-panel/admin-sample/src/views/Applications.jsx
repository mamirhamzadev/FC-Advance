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
  const [applications, setApplications] = useState([]);
  const [isFetchingApplications, setIsFetchingApplications] = useState(true);
  const [application, setApplication] = useState();
  const [viewApplicationModal, setShowViewApplicationModal] = useState(false);

  useEffect(() => {
    if (!isFetchingApplications) return;
    axios
      .get("/api/applications/list?without_rep=1")
      .then((res) => setApplications(res?.data?.applications))
      .catch((err) => notify(err?.msg))
      .finally(() => setIsFetchingApplications(false));
  }, [isFetchingApplications]);

  const handleViewApplicationButton = (item) => {
    setShowViewApplicationModal(true);
    setFormData(item);
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
                <h3 className="card-title fw-bold fs-5 m-0">{key}:</h3>
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
                <h3 className="card-title fw-bold fs-5 m-0">{key}:</h3>
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
                      <h3 className="card-title fw-bold fs-5 m-0">{key}:</h3>
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
              <h3 className="card-title fw-bold fs-5 m-0">
                Media (click to download):
              </h3>
              <div className="mb-0 d-flex gap-2 flex-wrap">
                {(formData?.media || [])
                  .filter((media) => !!media)
                  .map((media, index) => (
                    <div
                      key={index}
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
    </>
  );
};

export default Application;
