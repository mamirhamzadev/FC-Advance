import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import FloatingInput from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRepAuthorized } from "../../redux/actions/rep-dashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFile,
  faFileCsv,
  faFileExcel,
  faFileLines,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faFileZipper,
  faGear,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
  any: faFile,
  xls: faFileExcel,
  xlsx: faFileExcel,
  doc: faFileWord,
  docx: faFileWord,
  pdf: faFilePdf,
  zip: faFileZipper,
  tar: faFileZipper,
  rar: faFileZipper,
  ppt: faFilePowerpoint,
  pptx: faFilePowerpoint,
  txt: faFileLines,
  csv: faFileCsv,
  video: faFileVideo,
};

const DATE_FIELDS = ["dob", "start_date"];

function RepDashboard() {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(
    (state) => state?.repDashboard?.isAuthorized
  );
  const [rep, setRep] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewSettingModal, setViewSettingModal] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    axios
      .get("/api/reps/get")
      .then((res) => {
        setRep(res?.data?.data?.rep);
        dispatch(setRepAuthorized());
      })
      .catch((err) => {
        if (err.response?.status === 401) dispatch(setRepAuthorized(false));
        else toast.error(err?.response?.data?.msg);
      })
      .finally(() => setIsLoading(false));
  }, []);

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
          className="h-full w-full object-cover"
        />
      );
    else if (preview?.icon) return <FontAwesomeIcon icon={preview.icon} />;
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

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = new FormData(e.target);
    axios
      .post("/api/reps/dashboard/login", Object.fromEntries(payload))
      .then((res) => {
        localStorage.setItem("rep-token", res?.data?.data?.rep_token);
        setRep(res?.data?.data?.rep);
        dispatch(setRepAuthorized());
      })
      .catch((err) => {
        if (err?.response?.status === 401) dispatch(setRepAuthorized(false));
        else toast.error(err?.response?.data?.msg);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setFilteredApplications(
      (rep?.applications || []).filter(
        (application) =>
          (application?.submitted_by?.email || "").includes(
            globalFilterValue
          ) ||
          (application?.business?.name || "").includes(globalFilterValue) ||
          (application?.business?.website || "").includes(globalFilterValue) ||
          (application?.owner?.email || "").includes(globalFilterValue) ||
          (application?.partner?.email || "").includes(globalFilterValue)
      )
    );
  }, [globalFilterValue, rep]);

  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    const payload = new FormData(e.target);

    axios
      .post("/api/reps/change-password", Object.fromEntries(payload))
      .then((res) => {
        toast(res?.data?.msg);
        e.target?.reset();
        setViewSettingModal(false);
      })
      .catch((err) => {
        toast(err?.response?.data?.msg);
      })
      .finally(() => {
        setIsChangingPassword(false);
      });
  };

  return (
    <>
      {isAuthorized ? (
        <section className="wrapper my-[50px]">
          <h2 className="font-bold text-[26px] capitalize text-center mb-[15px] sm:mb-[25px]">
            Welcome, {rep?.name}
          </h2>
          <div className="flex gap-[10px] items-center flex-wrap md:flex-row flex-col">
            <p className="flex-1">
              <span className="font-semibold">Email: </span>
              <span>{rep?.email}</span>
            </p>

            <div className="flex gap-[10px] items-center justify-end">
              <Button
                onClick={(e) =>
                  navigator.clipboard.writeText(rep?.link).then(() => {
                    e.target.innerHTML = "Copied";
                    setTimeout(() => {
                      e.target.innerHTML = "Copy Link for Client";
                    }, 1000);
                  })
                }
                className="!py-[10px] sm:!py-[12px] !px-[20px] sm:!px-[40px]"
              >
                Copy Link for Client
              </Button>
              <Button
                onClick={() => setViewSettingModal(true)}
                className="!py-[10px] sm:!py-[12px] !px-[15px] sm:!px-[20px] !text-[16px]"
              >
                <FontAwesomeIcon icon={faGear} />
              </Button>
            </div>
          </div>
          <div className="flex mt-[25px] flex-col">
            <p className="mb-[25px] text-[18px] font-semibold">
              <span>Applications: </span>
              <span className="bg-gray-700 text-[14px] ms-[10px] p-[5px] rounded-[5px] text-white inline-flex items-center justify-center w-fit max-h-[25px] min-w-[25px]">
                {(rep?.applications || []).length}
              </span>
            </p>
            <div className="hidden md:block overflow-auto w-full">
              <DataTable
                value={rep?.applications || []}
                paginator
                removableSort
                showGridlines
                rows={10}
                loading={isLoading}
                dataKey="_id"
                scrollable
                scrollHeight="flex"
                globalFilter={globalFilterValue}
                frozenWidth="50px"
                header={
                  <div className="w-[300px] bg-white border border-gray-200 flex items-center justify-center rounded-[0.475rem] shadow-[inset_0_1px_2px_rgba(0,0,0,0.075)] ps-[1rem] text-gray-600 gap-[10px] text-[14px]">
                    <FontAwesomeIcon icon={faSearch} />
                    <input
                      className="w-full py-[0.6rem] outline-0"
                      value={globalFilterValue}
                      onChange={(e) => setGlobalFilterValue(e.target.value)}
                      placeholder="Keyword Search"
                    />
                  </div>
                }
                emptyMessage="No record found."
              >
                <Column
                  header={"#"}
                  field={"#"}
                  headerClassName="whitespace-nowrap min-w-[30px] !text-[14px]"
                  body={(options) => (
                    <div className="min-w-[30px] text-[14px]">
                      {(options?.rowIndex || 0) + 1}
                    </div>
                  )}
                  sortable
                />
                <Column
                  header={"Submitted By (Email)"}
                  field={"submitted_by.email"}
                  headerClassName="whitespace-nowrap min-w-[30px] !text-[14px]"
                  body={(rowData) => (
                    <div className="min-w-[30px] text-[14px]">
                      {rowData?.submitted_by?.email || "N/A"}
                    </div>
                  )}
                  sortable
                />
                <Column
                  header={"Business Name & website"}
                  field={"business.name"}
                  headerClassName="whitespace-nowrap min-w-[30px] !text-[14px]"
                  body={(rowData) => (
                    <div className="min-w-[30px] text-[14px] flex gap-[10px] items-center whitespace-nowrap">
                      {rowData?.business?.name || "N/A"}
                      {rowData?.business?.website && (
                        <Link
                          to={rowData?.business?.website}
                          target="_blank"
                          className="text-red-600 underline"
                        >
                          View Business
                        </Link>
                      )}
                    </div>
                  )}
                  sortable
                />
                <Column
                  header={"Owner Email"}
                  field={"owner.email"}
                  headerClassName="whitespace-nowrap min-w-[30px] !text-[14px]"
                  body={(rowData) => rowData?.owner?.email || "N/A"}
                  sortable
                />
                <Column
                  header={"Partner Email"}
                  field={"partner.email"}
                  headerClassName="whitespace-nowrap min-w-[30px] !text-[14px]"
                  body={(rowData) => (
                    <div className="whitespace-nowrap min-w-[30px] !text-[14px]">
                      {rowData?.partner?.email || "N/A"}
                    </div>
                  )}
                  sortable
                />
                <Column
                  header={"Actions"}
                  headerClassName="whitespace-nowrap min-w-[30px] !text-[14px]"
                  body={(rowData) => (
                    <button
                      onClick={() => setSelectedApplication(rowData)}
                      className="w-full flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  )}
                  sortable
                />
              </DataTable>
            </div>

            <div className="text-[14px] overflow-auto w-full md:hidden grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[10px]">
              <div className="col-span-full bg-white border border-gray-200 flex items-center justify-center rounded-[0.475rem] shadow-[inset_0_1px_2px_rgba(0,0,0,0.075)] ps-[1rem] text-gray-600 gap-[10px] text-[14px]">
                <FontAwesomeIcon icon={faSearch} />
                <input
                  className="w-full py-[0.6rem] outline-0"
                  value={globalFilterValue}
                  onChange={(e) => setGlobalFilterValue(e.target.value)}
                  placeholder="Keyword Search"
                />
              </div>
              {filteredApplications.map((application, index) => (
                <div
                  onClick={() => setSelectedApplication(application)}
                  key={index}
                  className="flex flex-col gap-[10px] bg-gray-100 overflow-hidden rounded-[0.5rem] p-[15px] cursor-pointer relative group"
                >
                  <span className="absolute bottom-0 left-0 w-full bg-black/50 z-1 flex items-center justify-center text-white text-[16px] transform-[translateY(100%)] transition-[transform] duration-300 group-[:hover]:transform-[translateY(0)]">
                    Click to View
                  </span>
                  <p>
                    <strong>Submitted By: </strong>
                    {application?.submitted_by?.email}
                  </p>
                  <p>
                    <strong>Business Name: </strong>
                    <Link
                      to={application?.business?.website}
                      className="text-red-600 underline"
                    >
                      {application?.business?.name}
                    </Link>
                  </p>
                  <p>
                    <strong>Owner Email: </strong>
                    {application?.owner?.email}
                  </p>
                  <p>
                    <strong>Partner Email: </strong>
                    {application?.partner?.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="wrapper py-[100px] flex items-center justify-center flex-col">
          <form onSubmit={handleLogin} className="max-w-[500px] w-full">
            <h2 className="text-[20px] text-center font-bold uppercase mb-[30px]">
              Login to view stats
            </h2>
            <FloatingInput
              placeholder="Email"
              className="mb-[30px]"
              name="email"
            />
            <FloatingInput
              type="password"
              placeholder="Password"
              name="password"
            />
            <div className="flex items-end justify-end">
              <Button
                type="submit"
                className={`mt-[15px] ${
                  isLoading
                    ? "pointer-events-none cursor-not-allowed"
                    : "pointer-events-auto"
                }`}
              >
                <div className="flex items-center justify-center gap-[15px]">
                  <span>Login</span>
                  {isLoading && (
                    <span className="flex size-[20px] rounded-full border-[3px] border-b-transparent animate-spin"></span>
                  )}
                </div>
              </Button>
            </div>
          </form>
        </section>
      )}

      {/* appllications modal */}
      {selectedApplication ? (
        <div className="fixed top-0 left-0 size-full bg-black/50 z-100 flex pt-[50px] justify-center px-[10px]">
          <div className="flex flex-col text-[14px] bg-white rounded-[1rem] min-w-[300px] max-w-[60%] w-full h-[calc(100vh-100px)] overflow-hidden">
            <div className="flex items-center justify-between gap-[10px] p-[20px] border-b border-b-gray-300">
              <h3 className="font-bold text-[18px]">Application Details</h3>
              <button
                className="flex items-center justify-center size-[25px] text-[20px]"
                onClick={() => setSelectedApplication(null)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="overflow-auto p-[20px]">
              <div className="flex flex-col gap-[10px]">
                <div className="flex gap-[10px]">
                  <h3 className="font-bold">Envelope ID:</h3>
                  <p>{selectedApplication?.envelope_id}</p>
                </div>
                <div className="flex gap-[10px]">
                  <h3 className="font-bold">Submitted By (Name):</h3>
                  <p>{selectedApplication?.submitted_by?.full_name}</p>
                </div>
                <div className="flex gap-[10px]">
                  <h3 className="font-bold">Submitted By (Email):</h3>
                  <p>{selectedApplication?.submitted_by?.email}</p>
                </div>
                <h2 className="mt-[1rem] font-bold text-[18px]">
                  Business Information
                </h2>
                {Object.keys(selectedApplication?.business || {}).map(
                  (key, index) => (
                    <div className="flex gap-[10px]" key={index}>
                      <h3 className="font-bold">{key}:</h3>
                      <p>
                        {DATE_FIELDS.includes(key)
                          ? new Date(
                              selectedApplication?.business?.[key]
                            ).toDateString()
                          : selectedApplication?.business?.[key]}
                      </p>
                    </div>
                  )
                )}
                <h2 className="mt-[1rem] font-bold text-[18px]">
                  Owner Information
                </h2>
                {Object.keys(selectedApplication?.owner || {}).map(
                  (key, index) => (
                    <div className="flex gap-[10px]" key={index}>
                      <h3 className="font-bold">{key}:</h3>
                      <p>
                        {typeof selectedApplication?.owner?.[key] === "string"
                          ? DATE_FIELDS.includes(key)
                            ? new Date(
                                selectedApplication?.owner?.[key]
                              ).toDateString()
                            : selectedApplication?.owner?.[key]
                          : Object.values(
                              selectedApplication?.owner?.[key]
                            ).join(", ")}
                      </p>
                    </div>
                  )
                )}
                <h2 className="mt-[1rem] font-bold text-[18px]">
                  Partner Information
                </h2>
                {selectedApplication?.partner?.full_name &&
                selectedApplication?.partner?.email ? (
                  <>
                    {Object.keys(selectedApplication?.partner || {}).map(
                      (key, index) => {
                        if (
                          (typeof selectedApplication?.partner?.[key] ===
                            "string" &&
                            !selectedApplication?.partner?.[key]) ||
                          (typeof selectedApplication?.partner?.[key] ===
                            "object" &&
                            !Object.values(
                              selectedApplication?.partner?.[key] || {}
                            ).find((val) => !!val))
                        )
                          return null;
                        return (
                          <div className="flex gap-[10px]" key={index}>
                            <h3 className="font-bold">{key}:</h3>
                            <p>
                              {typeof selectedApplication?.partner?.[key] ===
                              "string"
                                ? DATE_FIELDS.includes(key)
                                  ? new Date(
                                      selectedApplication?.partner?.[key]
                                    ).toDateString()
                                  : selectedApplication?.partner?.[key]
                                : Object.values(
                                    selectedApplication?.partner?.[key] || {}
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

                <div className="flex gap-[10px] mt-[10px] mb-[50px]">
                  <h3 className="font-bold">Media (click to download):</h3>
                  <div className="flex gap-[10px] flex-wrap">
                    {(selectedApplication?.media || []).filter(
                      (media) => !!media
                    ).length ? (
                      <>
                        {(selectedApplication?.media || [])
                          .filter((media) => !!media)
                          .map((media, index) => (
                            <div
                              key={index}
                              onClick={() => downloadFile(media)}
                              className="w-[100px] aspect-square cursor-pointer text-[70px] border border-gray-200 p-[5px] rounded-[5px] flex items-center justify-center"
                            >
                              {constructPreview(media)}
                            </div>
                          ))}
                      </>
                    ) : (
                      <p>No media availble</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* settings modal */}
      {viewSettingModal ? (
        <div className="fixed top-0 left-0 size-full bg-black/50 z-100 flex pt-[50px] justify-center px-[10px]">
          <div className="flex flex-col text-[14px] bg-white rounded-[1rem] min-w-[300px] max-w-[60%] w-full max-h-[calc(100vh-100px)] h-fit pb-[20px] overflow-hidden">
            <div className="flex items-center justify-between gap-[10px] p-[20px] border-b border-b-gray-300">
              <h3 className="font-bold text-[18px]">Settings</h3>
              <button
                className="flex items-center justify-center size-[25px] text-[20px]"
                onClick={() => setViewSettingModal(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <form
              onSubmit={passwordChangeHandler}
              className="overflow-auto p-[20px] flex items-center flex-col gap-[2rem]"
            >
              <h3 className="text-[20px] font-bold">Change Password</h3>
              <FloatingInput
                name="old_password"
                placeholder="Current Password"
                type="password"
                required
              />
              <FloatingInput
                name="new_password"
                placeholder="New Password"
                type="password"
                required
              />
              <FloatingInput
                name="confirm_password"
                placeholder="Confirm Password"
                type="password"
                required
              />
              <Button
                disabled={isChangingPassword}
                type="submit"
                className="self-end mt-[10px] flex items-center gap-[10px]"
              >
                <span>Change Password</span>
                <span className="in-disabled:flex hidden size-[20px] rounded-full border-[3px] border-e-transparent border-white animate-spin"></span>
              </Button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default RepDashboard;
