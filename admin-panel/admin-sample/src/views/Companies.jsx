import { useEffect, useRef, useState } from "react";
import BreadCrumb from "./partials/BreadCrumb";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import useToast from "../../../shared/store/hooks/useToast";
import PlainDataTable from "../../../shared/styles/dataTables/PlainDataTable";
// import { handleFormDataInput } from "../../../shared/utils/helpers";
import ProcessingModal from "../../../shared/styles/modals/ProcessingModal";
import { SWAL_VARIANT_CONFIGS } from "../../../shared/utils/constants";
import axios from "axios";
// import ImageLoader from "../../../shared/styles/loaders/ImageLoader";

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

const Categories = () => {
  const { notify } = useToast();

  // const hiddenInputFileField = useRef();
  const [formData, setFormData] = useState();
  // const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
  const [showViewCompanyModal, setShowViewCompanyModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [hasPartner, setHasPartner] = useState([]);
  const [isFetchingCompanies, setIsFetchingCompanies] = useState(true);

  // const [isProcessingAddUpdate, setIsProcessingAddUpdate] = useState(false);

  useEffect(() => {
    if (!isFetchingCompanies) return;
    axios
      .get("/api/companies/list")
      .then((res) => setCompanies(res?.data?.companies))
      .catch((err) => notify(err?.msg))
      .finally(() => setIsFetchingCompanies(false));
  }, [isFetchingCompanies]);

  useEffect(() => {
    if (!formData) return;
    setHasPartner(
      !!Object.values(formData?.partner || {}).find(
        (val) => Object.values(val || {}).filter((_val) => !!_val).length
      )
    );
  }, [formData]);

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

  // const handleAddUpdateButton = (item) => {
  //   setFormData(item?._id ? item : null);
  //   setIsUpdatingRecord(item?._id ? true : false);
  // setShowAddUpdateModal(true);
  // };

  const handleViewCategoryButton = (item) => {
    setFormData(item);
    setShowViewCompanyModal(true);
  };

  const handleDeleteItemButton = (data) => {
    Swal.fire(SWAL_VARIANT_CONFIGS?.delete?.before).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/api/companies/remove/" + data._id)
          .then((res) => {
            notify("success", res?.msg);
            Swal.fire(SWAL_VARIANT_CONFIGS?.delete?.after);
            setIsFetchingCompanies(true);
          })
          .catch((err) => {
            notify("error", err?.msg);
            Swal.fire(SWAL_VARIANT_CONFIGS?.delete?.before);
          });
      }
    });
  };

  // const handleSubmitCompanyForm = (e) => {
  //   e.preventDefault();

  //   setShowProgressModal(true);
  //   setIsProcessingAddUpdate(true);

  //   const dataToSend = new FormData();
  // axios
  //   .post("/api/companies/update", dataToSend)
  //   .then((res) => {
  //     setShowAddUpdateModal(false);
  //     notify("success", res?.msg);
  //     setIsFetchingCompanies(true);
  //     setIsUpdatingRecord(false);
  //   })
  //   .catch((err) => {
  //     notify("error", err?.msg);
  //   })
  //   .finally(() => {
  //     setIsProcessingAddUpdate(false);
  //     setShowProgressModal(false);
  //   });
  // };

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
                  {isFetchingCompanies ? "~" : companies?.length}
                </span>
              </div>
              <div className="d-flex flex-wrap my-1">
                <div className="row">
                  <div className="col-12 me-5 d-flex justify-content-end">
                    <ul className="nav nav-pills">
                      <li className="me-3">
                        {/* <button
                          onClick={() => handleAddUpdateButton()}
                          className="btn btn-icon bg-primary text-white plan-action-btn w-100 py-2 px-4 ms-4"
                        >
                          <i className="las la-plus fs-2 me-1 text-white" />
                          Add Company
                        </button> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row my-5">
            {isFetchingCompanies ? (
              <button className="btn fw-bolder px-4">
                <span className="spinner-border spinner-border-lg" />
              </button>
            ) : (
              <div className="col-12 my-5">
                <PlainDataTable
                  data={companies || []}
                  view={handleViewCategoryButton}
                  // edit={handleAddUpdateButton}
                  delete={handleDeleteItemButton}
                  fieldNamesToShow={[
                    "Submitted By (Email)",
                    "Business Name",
                    "Business Webiste",
                    "Owner Email",
                  ]}
                  fieldsToShow={[
                    "submitted_by.email",
                    "business.name",
                    "business.website",
                    "owner.email",
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Modal
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
            {isUpdatingRecord ? "Update" : "Add New "} Company
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmitCompanyForm}>
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
                  placeholder="Company Name"
                  value={formData?.name || ""}
                  onChange={(e) => handleFormDataInput(e, setFormData)}
                />
              </div>
            </div>
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Target Audience
              </label>
              <div className="col-lg-8 fv-row">
                <select
                  name="targetAudience"
                  className="form-control form-control-solid mb-3 mb-lg-0"
                  value={formData?.targetAudience || "All"}
                  onChange={(e) => handleFormDataInput(e, setFormData)}
                >
                  <option value="All">All</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>
            </div>
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Image
              </label>

              <div className="col-lg-4 position-relative">
                <div
                  className="picture__image"
                  onClick={() => hiddenInputFileField.current.click()}
                >
                  {/* {media ? (
                    <img
                      src={URL.createObjectURL(media)}
                      alt=""
                      className="w-100 h-100 rounded object-fit-contain"
                      loading="lazy"
                    />
                  ) : (
                    <ImageLoader
                      className="w-100 h-100 rounded object-fit-contain"
                      alt="Logo"
                      src={
                        formData?.media
                          ? `${axios.defaults.baseURL}${formData?.media[0]}`
                          : `${
                              import.meta.env.VITE_APP_CLOUD_FRONT_URL
                            }/placeholder.webp`
                      }
                      loading="lazy"
                    />
                  )}
                </div>

                <input
                  style={{ display: "none" }}
                  ref={hiddenInputFileField}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setMedia(file);
                  }}
                />

                <div
                  className="position-absolute form-text"
                  style={{ left: -5, top: -20 }}
                >
                  <span
                    onClick={() => hiddenInputFileField.current.click()}
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
                      setFormData({ ...formData, media: "" });
                      hiddenInputFileField.current.value = "";
                    }}
                    className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow ms-4 "
                  >
                    <i className="bi bi-trash fs-7" />
                  </span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="modal-fixed-footer">
            <div className="w-100 d-flex justify-content-between flex-wrap flex-row-reverse">
              <button
                type="submit"
                className="btn btn-success py-2 fw-bolder px-4"
                disabled={!formData?.name}
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
      </Modal> */}

      <Modal
        show={showViewCompanyModal}
        onHide={() => setShowViewCompanyModal(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Company</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modal-scrollable-body p-7">
          <div className="flex-col">
            <div className="d-flex mb-4 gap-2">
              <h3 className="card-title fw-bold fs-5 m-0">Envelope ID:</h3>
              <p className="mb-0">{formData?.envelope_id}</p>
            </div>
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
            {Object.keys(formData?.business || {}).map(
              (business_key, index) => (
                <div className="d-flex mb-4 gap-2" key={index}>
                  <h3 className="card-title fw-bold fs-5 m-0">
                    {business_key}:
                  </h3>
                  <p className="mb-0">{formData?.business?.[business_key]}</p>
                </div>
              )
            )}
            <h2 className="my-5 pt-5">Owner Information</h2>
            {Object.keys(formData?.owner || {}).map((owner_key, index) => (
              <div className="d-flex mb-4 gap-2" key={index}>
                <h3 className="card-title fw-bold fs-5 m-0">{owner_key}:</h3>
                <p className="mb-0">
                  {typeof formData?.owner?.[owner_key] === "string"
                    ? formData?.owner?.[owner_key]
                    : Object.values(formData?.owner?.[owner_key]).join(", ")}
                </p>
              </div>
            ))}
            <h2 className="my-5 pt-5">Partner Information</h2>
            {hasPartner ? (
              <>
                {Object.keys(formData?.partner || {}).map(
                  (partner_key, index) => {
                    if (
                      (typeof formData?.partner?.[partner_key] === "string" &&
                        !formData?.partner?.[partner_key]) ||
                      (typeof formData?.partner?.[partner_key] === "object" &&
                        !Object.values(
                          formData?.partner?.[partner_key] || {}
                        ).find((val) => !!val))
                    )
                      return null;
                    return (
                      <div className="d-flex mb-4 gap-2" key={index}>
                        <h3 className="card-title fw-bold fs-5 m-0">
                          {partner_key}:
                        </h3>
                        <p className="mb-0">
                          {typeof formData?.partner?.[partner_key] === "string"
                            ? formData?.partner?.[partner_key]
                            : Object.values(
                                formData?.partner?.[partner_key] || {}
                              ).join(", ")}
                        </p>
                      </div>
                    );
                  }
                )}
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
              onClick={() => setShowViewCompanyModal(false)}
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
        heading={isUpdatingRecord ? "Updating Comapny" : "Adding Company"}
        handleSubmit={() => window.location.reload()}
        description="Please wait for the process to complete, do not close browser."
      />
    </>
  );
};

export default Categories;
