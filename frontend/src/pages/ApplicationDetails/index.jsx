import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setRepAuthorized } from "../../redux/actions/rep-dashboard";
import { REP_DASHBOARD_ROUTE } from "../../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Display from "./Display";
import Button from "../../components/Button";

const DATE_FIELDS = ["dob", "start_date"];

function ApplicationDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [rep, setRep] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    axios
      .get("/api/reps/application/" + params?.id)
      .then((res) => {
        setApplication(res?.data?.data?.application);
        setRep(res?.data?.data?.rep);
        dispatch(setRepAuthorized());
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          dispatch(setRepAuthorized(false));
          navigate(REP_DASHBOARD_ROUTE);
        } else toast.error(err?.response?.data?.msg);
      })
      .finally(() => setLoading(false));
  }, [params]);

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

  const navigateBack = () => {
    if (location.key === "default") navigate("/reps");
    else navigate(-1);
  };

  return (
    <div className="wrapper">
      <div className="my-5 w-full">
        {loading ? (
          <div className="flex items-center justify-center w-full py-[50px]">
            <span className="flex size-[30px] aspect-square rounded-full border-[3px] border-black border-b-transparent animate-spin"></span>
          </div>
        ) : !application ? (
          <div className="flex items-center justify-center my-[100px]">
            <p className="text-center font-bold text-gray-400 text-[14px]">
              Cannot find any application
            </p>
          </div>
        ) : (
          <div className="my-[1.5rem] w-full">
            {rep ? (
              <>
                <div className="flex gap-[20px]">
                  <button onClick={navigateBack}>
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                  </button>
                  <h3 className="font-bold pb-[5px] relative w-fit before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                    Rep Details:
                  </h3>
                </div>
                <div className="mt-[1rem] flex gap-[20px] md:flex-row flex-col items-center">
                  <Display title="Rep Full Name" data={rep?.name} />
                  <Display title="Rep Email" data={rep?.email} />
                </div>
              </>
            ) : null}
            <div className="flex gap-[20px] items-center">
              {rep ? null : (
                <button onClick={navigateBack} className="translate-y-[5px]">
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </button>
              )}
              <h3 className="mt-[30px] mb-[1rem] font-bold pb-[5px] relative w-fit before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                Application Details
              </h3>
            </div>
            <div className="flex gap-[20px] w-full md:flex-row flex-col">
              <Display
                title="Application Submitted By (Full Name)"
                data={application?.submitted_by?.full_name}
              />
              <Display
                title="Application Submitted By (Email)"
                data={application?.submitted_by?.email}
              />
            </div>
            <div className="flex gap-[1rem] w-full md:flex-row flex-col mt-[30px]">
              <div className="flex flex-col gap-[20px] w-full">
                <h3 className="mb-[10px] font-bold pb-[5px] relative w-fit before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                  Business Information
                </h3>
                {Object.keys(application?.business).map((key, index) => (
                  <Display
                    key={index}
                    title={normalizeKey(key)}
                    data={
                      key.includes("website") ? (
                        <>
                          {application.business[key] ? (
                            <a
                              className="w-full text-start underline text-blue-500"
                              target="_blank"
                              href={application.business[key]}
                            >
                              View Business
                            </a>
                          ) : (
                            <span className="italic text-gray-400">
                              No Website
                            </span>
                          )}
                        </>
                      ) : DATE_FIELDS.includes(key) ? (
                        new Date(application.business[key]).toDateString()
                      ) : (
                        application?.business[key] || "N/A"
                      )
                    }
                  />
                ))}
              </div>
              <div className="flex flex-col gap-[20px] w-full">
                <h3 className="mb-[10px] font-bold pb-[5px] relative w-fit before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                  Owner Information
                </h3>
                {Object.keys(application?.owner).map((key, index) => {
                  if (typeof (application?.owner[key] || "") === "string")
                    return (
                      <Display
                        key={index}
                        title={normalizeKey(key)}
                        data={
                          DATE_FIELDS.includes(key)
                            ? application?.owner[key]
                              ? new Date(application?.owner[key]).toDateString()
                              : "N/A"
                            : application?.owner[key] || "N/A"
                        }
                      />
                    );
                  else
                    return Object.keys(application?.owner[key] || {}).map(
                      (childKey, childIndex) => (
                        <Display
                          key={childIndex}
                          title={normalizeKey(key + " " + childKey)}
                          data={application?.partner[key][childKey] || "N/A"}
                        />
                      )
                    );
                })}
              </div>
              <div className="flex flex-col gap-[20px] w-full">
                <h3 className="mb-[10px] font-bold pb-[5px] relative w-fit before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-[25%] before:bg-black">
                  Partner Information
                </h3>
                {Object.keys(application?.partner).map((key, index) => {
                  if (typeof (application?.partner[key] || "") === "string")
                    return (
                      <Display
                        key={index}
                        title={normalizeKey(key)}
                        data={
                          DATE_FIELDS.includes(key)
                            ? application?.partner[key]
                              ? new Date(
                                  application?.partner[key]
                                ).toDateString()
                              : "N/A"
                            : application?.partner[key] || "N/A"
                        }
                      />
                    );
                  else
                    return Object.keys(application?.partner[key] || {}).map(
                      (childKey, childIndex) => (
                        <Display
                          key={childIndex}
                          title={normalizeKey(key + " " + childKey)}
                          data={application?.partner[key][childKey] || "N/A"}
                        />
                      )
                    );
                })}
              </div>
            </div>

            <Display
              className="!w-fit mt-[30px]"
              title="Signatures:"
              data={
                <img
                  src={`${axios.defaults.baseURL}${application.signatures}`}
                  alt="Signatures"
                  width="200px"
                />
              }
            />

            <Display
              title="Media (Click to Download):"
              className="mt-[30px]"
              dataClassName="flex flex-wrap gap-[10px]"
              data={
                (application.media || []).length ? (
                  <>
                    {application.media.map((file, index) => (
                      <a
                        href={`${axios.defaults.baseURL}${file}`}
                        target="_blank"
                        title={file.split("=")[1]}
                        key={index}
                        className="flex items-center justify-center rounded text-gray-700 border border-gray-300 size-[100px]"
                      >
                        <FontAwesomeIcon
                          className="text-[70px]"
                          icon={faFilePdf}
                        />
                      </a>
                    ))}
                  </>
                ) : (
                  <span className="italic text-gray-400">
                    No files attached
                  </span>
                )
              }
            />
            <div className="mt-[20px] flex items-center justify-center">
              <Button onClick={navigateBack} text="Back" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationDetails;
