import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import FloatingInput from "../../components/Input";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
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
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

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
  const [reps, setReps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRep, setSelectedRep] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    axios
      .get("/api/reps/list-with-applications", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("rep-token") || "",
        },
      })
      .then((res) => setReps(res?.data?.data?.reps))
      .catch((err) => {
        if (err.response?.status === 401) setIsAuthorized(false);
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
        setReps(res?.data?.data?.reps);
        setIsAuthorized(true);
      })
      .catch((err) => toast.error(err?.response?.data?.msg))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isAuthorized ? (
        <section className="wrapper my-[50px]">
          <h2 className="text-center text-[26px] font-bold mb-[20px] capitalize">
            Rep Dashboard
          </h2>
          <div className="border border-gray-300 rounded-2xl relative flex h-max">
            <div className="w-full lg:w-[300px] lg:border-e lg:border-e-gray-300 flex flex-col items-stretch overflow-y-auto">
              {reps.map((rep, index) => (
                <button
                  onClick={() => setSelectedRep(rep)}
                  key={index}
                  className={`flex items-center gap-[5px] border-b-gray-300 border-b p-[15px] ${
                    selectedRep?.name === rep?.name
                      ? "text-red-600 font-bold"
                      : ""
                  } ${
                    index + 1 === reps.length ? "lg:border-b border-b-0" : ""
                  }`}
                >
                  <span>{rep?.name}</span>
                  <span className="text-[14px] text-gray-400">
                    ({(rep.applications || []).length})
                  </span>
                </button>
              ))}
            </div>
            <div className="lg:flex hidden flex-1 min-h-[60vh] p-[20px] flex-col overflow-auto">
              {selectedRep ? (
                <>
                  <h3 className="mb-[10px] font-bold text-[20px]">
                    Rep - {selectedRep?.name}
                  </h3>
                  <p className="mb-[30px] text-[14px]">
                    <span className="font-semibold">Email: </span>
                    <span>{selectedRep.email}</span>
                  </p>
                  <p className="mb-[20px] text-[18px] font-semibold">
                    <span>Applications: </span>
                    <span className="bg-red-600 text-[14px] p-[5px] rounded-[5px] text-white inline-flex items-center justify-center w-fit max-h-[25px] min-w-[25px]">
                      {(selectedRep.applications || []).length}
                    </span>
                  </p>
                  <div className="overflow-auto w-full">
                    <table className="w-full border-collapse text-[14px]">
                      <thead>
                        <tr>
                          <th className="p-[15px] whitespace-nowrap border border-gray-300">
                            #
                          </th>
                          <th className="p-[15px] whitespace-nowrap border border-gray-300">
                            Submitted By
                            <br />
                            (Email)
                          </th>
                          <th className="p-[15px] whitespace-nowrap border border-gray-300">
                            Business
                            <br />
                            Name & website
                          </th>
                          <th className="p-[15px] whitespace-nowrap border border-gray-300">
                            Owner
                            <br />
                            Email
                          </th>
                          <th className="p-[15px] whitespace-nowrap border border-gray-300">
                            Partner
                            <br />
                            Email
                          </th>
                          <th className="p-[15px] whitespace-nowrap border border-gray-300">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedRep?.applications || []).length ? (
                          <>
                            {(selectedRep?.applications || []).map(
                              (application, index) => (
                                <tr key={index}>
                                  <td className="border border-gray-300 py-[5px] px-[10px]">
                                    {index + 1}
                                  </td>
                                  <td className="border border-gray-300 py-[5px] px-[10px]">
                                    {application?.submitted_by?.email}
                                  </td>
                                  <td className="border border-gray-300 py-[5px] px-[10px]">
                                    <div className="flex items-center gap-[5px] flex-wrap">
                                      <p className="m-0">
                                        {application?.business?.name}
                                      </p>
                                      <Link
                                        className="text-red-600 underline"
                                        target="_blank"
                                        to={application?.business?.website}
                                      >
                                        View Business
                                      </Link>
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 py-[5px] px-[10px]">
                                    {application?.owner?.email}
                                  </td>
                                  <td className="border border-gray-300 py-[5px] px-[10px]">
                                    {application?.partner?.email || "-"}
                                  </td>
                                  <td className="border border-gray-300 py-[5px] px-[10px]">
                                    <button
                                      onClick={() =>
                                        setSelectedApplication(application)
                                      }
                                      className="flex items-center justify-center"
                                    >
                                      <FontAwesomeIcon icon={faEye} />
                                    </button>
                                  </td>
                                </tr>
                              )
                            )}
                          </>
                        ) : (
                          <tr>
                            <td
                              className="p-[10px] text-center font-bold border border-gray-300"
                              colSpan={6}
                            >
                              No Records Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-300 text-[14px] font-semibold">
                    Select Rep to display here
                  </p>
                </div>
              )}
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

      {/* reps modal for lower than lg screen */}
      {selectedRep ? (
        <div className="fixed top-0 left-0 size-full bg-black/50 z-100 lg:hidden flex pt-[50px] justify-center px-[10px] overflow-auto">
          <div className="flex flex-col text-[14px] bg-white rounded-[1rem] min-w-[280px] max-w-[60%] w-full h-fit overflow-hidden">
            <div className="flex items-center justify-between gap-[10px] p-[15px] md:p-[20px] border-b border-b-gray-300">
              <h3 className="font-bold text-[18px]">
                Rep - {selectedRep?.name}
              </h3>
              <button
                className="flex items-center justify-center size-[25px] text-[20px]"
                onClick={() => setSelectedRep(null)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className="flex flex-1 min-h-[60vh] p-[15px] md:p-[20px] flex-col overflow-auto">
              <h3 className="mb-[10px] font-bold text-[20px]">
                Rep - {selectedRep?.name}
              </h3>
              <p className="mb-[30px] text-[14px]">
                <span className="font-semibold">Email: </span>
                <span>{selectedRep.email}</span>
              </p>
              <p className="mb-[20px] text-[18px] font-semibold">
                <span>Applications: </span>
                <span className="bg-red-600 text-[14px] p-[5px] rounded-[5px] text-white inline-flex items-center justify-center w-fit max-h-[25px] min-w-[25px]">
                  {(selectedRep.applications || []).length}
                </span>
              </p>
              <div className="overflow-auto w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[10px]">
                {(selectedRep.applications || []).map((application, index) => (
                  <div
                    onClick={() => setSelectedApplication(application)}
                    key={index}
                    className="flex flex-col gap-[5px] border border-gray-300 overflow-hidden rounded-[0.5rem] p-[15px] cursor-pointer relative group"
                  >
                    <span className="absolute top-0 left-0 size-full bg-black/50 backdrop-blur-md z-1 flex items-center justify-center text-white text-[20px] opacity-0 transition-[opacity] duration-300 group-[:hover]:opacity-100">
                      <FontAwesomeIcon icon={faEye} />
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
                {/* <table className="w-full border-collapse text-[14px]">
                  <thead>
                    <tr>
                      <th className="p-[15px] whitespace-nowrap border border-gray-300">
                        #
                      </th>
                      <th className="p-[15px] whitespace-nowrap border border-gray-300">
                        Submitted By
                        <br />
                        (Email)
                      </th>
                      <th className="p-[15px] whitespace-nowrap border border-gray-300">
                        Business
                        <br />
                        Name & website
                      </th>
                      <th className="p-[15px] whitespace-nowrap border border-gray-300">
                        Owner
                        <br />
                        Email
                      </th>
                      <th className="p-[15px] whitespace-nowrap border border-gray-300">
                        Partner
                        <br />
                        Email
                      </th>
                      <th className="p-[15px] whitespace-nowrap border border-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedRep?.applications || []).length ? (
                      <>
                        {(selectedRep?.applications || []).map(
                          (application, index) => (
                            <tr key={index}>
                              <td className="border border-gray-300 py-[5px] px-[10px]">
                                {index + 1}
                              </td>
                              <td className="border border-gray-300 py-[5px] px-[10px]">
                                {application?.submitted_by?.email}
                              </td>
                              <td className="border border-gray-300 py-[5px] px-[10px]">
                                <div className="flex items-center gap-[5px] flex-wrap">
                                  <p className="m-0">
                                    {application?.business?.name}
                                  </p>
                                  <Link
                                    className="text-red-600 underline"
                                    target="_blank"
                                    to={application?.business?.website}
                                  >
                                    View Business
                                  </Link>
                                </div>
                              </td>
                              <td className="border border-gray-300 py-[5px] px-[10px]">
                                {application?.owner?.email}
                              </td>
                              <td className="border border-gray-300 py-[5px] px-[10px]">
                                {application?.partner?.email || "-"}
                              </td>
                              <td className="border border-gray-300 py-[5px] px-[10px]">
                                <button
                                  onClick={() =>
                                    setSelectedApplication(application)
                                  }
                                  className="flex items-center justify-center"
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </>
                    ) : (
                      <tr>
                        <td
                          className="p-[10px] text-center font-bold border border-gray-300"
                          colSpan={6}
                        >
                          No Records Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
    </>
  );
}

export default RepDashboard;
