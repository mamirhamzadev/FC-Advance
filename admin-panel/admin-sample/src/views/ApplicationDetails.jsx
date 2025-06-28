import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import classes from "./applicationDetails.module.css";

const DATE_FIELDS = ["dob", "start_date"];

function ApplicationDetails() {
  const [application, setApplication] = useState(null);
  const [rep, setRep] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    axios
      .get("/api/applications/get/" + params?.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("rep_token"),
        },
      })
      .then((res) => {
        setApplication(res?.data?.application);
        setRep(res?.data?.rep);
      })
      .catch((err) => toast.error(err?.msg))
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

  return (
    <div className="container-xxl fade-in">
      <div className="my-5 w-100">
        {loading ? (
          <div className="d-flex align-items-center justify-content-center fw-bolder px-5">
            <span className="spinner-border spinner-border-lg" />
          </div>
        ) : !application ? (
          <div className="d-flex align-items-center justify-content-center flex-column gap-3 my-5 py-5">
            <p
              className="m-0 p-0 text-center fw-bold"
              style={{ color: "gray", fontSize: "14px" }}
            >
              Cannot find any application
            </p>
            <Link
              style={{ color: "blue", textDecoration: "underline" }}
              to={"/reps"}
            >
              Go Back
            </Link>
          </div>
        ) : (
          <div className="my-5 w-100">
            {rep ? (
              <div className="mb-5">
                <h3 className={classes.heading}>Rep Details:</h3>
                <div
                  className={`mt-5 d-flex gap-5 align-items-center ${classes.wrap_md}`}
                >
                  <div className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded w-100 p-3">
                    <p
                      className="position-absolute bg-white px-2 fs-7 fw-bolder"
                      style={{
                        whiteSpace: "nowrap",
                        left: "10px",
                        top: "0px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      Rep Full Name
                    </p>
                    <p className="m-0 p-0 w-100 text-left">{rep?.name}</p>
                  </div>
                  <div className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded w-100 p-3">
                    <p
                      className="position-absolute bg-white px-2 fs-7 fw-bolder"
                      style={{
                        whiteSpace: "nowrap",
                        left: "10px",
                        top: "0px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      Rep Email
                    </p>
                    <p className="m-0 p-0 w-100 text-left">{rep?.email}</p>
                  </div>
                </div>
              </div>
            ) : null}
            <h3 style={{ margin: "30px 0px 20px" }} className={classes.heading}>
              Application Details
            </h3>
            <div className={`d-flex gap-5 w-100 ${classes.wrap_md}`}>
              <div className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded w-100 p-3">
                <p
                  className="position-absolute bg-white px-2 fs-7 fw-bolder"
                  style={{
                    whiteSpace: "nowrap",
                    left: "10px",
                    top: "0px",
                    transform: "translateY(-50%)",
                  }}
                >
                  Application Submitted By (Full Name)
                </p>
                <p className="m-0 p-0 w-100 text-left">
                  {application?.submitted_by?.full_name}
                </p>
              </div>
              <div className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded w-100 p-3">
                <p
                  className="position-absolute bg-white px-2 fs-7 fw-bolder"
                  style={{
                    whiteSpace: "nowrap",
                    left: "10px",
                    top: "0px",
                    transform: "translateY(-50%)",
                  }}
                >
                  Application Submitted By (Email)
                </p>
                <p className="m-0 p-0 w-100 text-left">
                  {application?.submitted_by?.email}
                </p>
              </div>
            </div>
            <div
              style={{ marginTop: "30px" }}
              className={`d-flex gap-5 w-100 ${classes.wrap_md}`}
            >
              <div className="d-flex flex-column gap-5 w-100">
                <h3 className={classes.heading}>Business Information</h3>
                {Object.keys(application?.business).map((key, index) => (
                  <div
                    key={index}
                    className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded w-100 p-3"
                  >
                    <p
                      className="position-absolute bg-white px-2 fs-7 fw-bolder"
                      style={{
                        whiteSpace: "nowrap",
                        left: "10px",
                        top: "0px",
                        transform: "translateY(-50%)",
                      }}
                    >
                      {normalizeKey(key)}
                    </p>
                    {key.includes("website") ? (
                      <>
                        {application.business[key] ? (
                          <a
                            className="m-0 p-0 w-100 text-left"
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                            }}
                            target="_blank"
                            href={application.business[key]}
                          >
                            View Business
                          </a>
                        ) : (
                          <p
                            className="m-0 p-0 w-100 text-left"
                            style={{
                              fontStyle: "italic",
                              fontSize: "14px",
                              color: "gray",
                            }}
                          >
                            No Website
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="m-0 p-0 w-100 text-left">
                        {DATE_FIELDS.includes(key)
                          ? new Date(application.business[key]).toDateString()
                          : application?.business[key] || "N/A"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="d-flex flex-column gap-5 w-100">
                <h3 className={classes.heading}>Owner Information</h3>
                {Object.keys(application?.owner).map((key, index) => (
                  <>
                    {typeof (application?.owner[key] || "") === "string" ? (
                      <div
                        key={index}
                        className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded w-100 p-3"
                      >
                        <p
                          className="position-absolute bg-white px-2 fs-7 fw-bolder"
                          style={{
                            whiteSpace: "nowrap",
                            left: "10px",
                            top: "0px",
                            transform: "translateY(-50%)",
                          }}
                        >
                          {normalizeKey(key)}
                        </p>
                        <p className="m-0 p-0 w-100 text-left">
                          {DATE_FIELDS.includes(key)
                            ? application?.owner[key]
                              ? new Date(application?.owner[key]).toDateString()
                              : "N/A"
                            : application?.owner[key] || "N/A"}
                        </p>
                      </div>
                    ) : (
                      <>
                        {Object.keys(application?.owner[key] || {}).map(
                          (childKey, childIndex) => (
                            <div
                              key={`${index}${childIndex}`}
                              className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded    w-100 p-3"
                            >
                              <p
                                className="position-absolute bg-white px-2 fs-7 fw-bolder"
                                style={{
                                  whiteSpace: "nowrap",
                                  left: "10px",
                                  top: "0px",
                                  transform: "translateY(-50%)",
                                }}
                              >
                                {normalizeKey(key + " " + childKey)}
                              </p>
                              <p className="m-0 p-0 w-100 text-left">
                                {application?.partner[key][childKey] || "N/A"}
                              </p>
                            </div>
                          )
                        )}
                      </>
                    )}
                  </>
                ))}
              </div>
              <div className="d-flex flex-column gap-5 w-100">
                <h3 className={classes.heading}>Partner Information</h3>
                {Object.keys(application?.partner).map((key, index) => (
                  <>
                    {typeof (application?.partner[key] || "") === "string" ? (
                      <div
                        key={index}
                        className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded w-100 p-3"
                      >
                        <p
                          className="position-absolute bg-white px-2 fs-7 fw-bolder"
                          style={{
                            whiteSpace: "nowrap",
                            left: "10px",
                            top: "0px",
                            transform: "translateY(-50%)",
                          }}
                        >
                          {normalizeKey(key)}
                        </p>
                        <p className="m-0 p-0 w-100 text-left">
                          {DATE_FIELDS.includes(key)
                            ? application?.partner[key]
                              ? new Date(
                                  application?.partner[key]
                                ).toDateString()
                              : "N/A"
                            : application?.partner[key] || "N/A"}
                        </p>
                      </div>
                    ) : (
                      <>
                        {Object.keys(application?.partner[key] || {}).map(
                          (childKey, childIndex) => (
                            <div
                              key={`${index}${childIndex}`}
                              className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded w-100 p-3"
                            >
                              <p
                                className="position-absolute bg-white px-2 fs-7 fw-bolder"
                                style={{
                                  whiteSpace: "nowrap",
                                  left: "10px",
                                  top: "0px",
                                  transform: "translateY(-50%)",
                                }}
                              >
                                {normalizeKey(key + " " + childKey)}
                              </p>
                              <p className="m-0 p-0 w-100 text-left">
                                {application?.partner[key][childKey] || "N/A"}
                              </p>
                            </div>
                          )
                        )}
                      </>
                    )}
                  </>
                ))}
              </div>
            </div>

            <div
              style={{ width: "fit-content", marginTop: "30px" }}
              className="position-relative d-flex d-flex align-items-center justify-content-center border border-primary rounded p-3"
            >
              <p
                className="position-absolute bg-white px-2 fs-7 fw-bolder"
                style={{
                  whiteSpace: "nowrap",
                  left: "10px",
                  top: "0px",
                  transform: "translateY(-50%)",
                }}
              >
                Signatures:
              </p>
              <img
                src={`${axios.defaults.baseURL}${application.signatures}`}
                alt="Signatures"
                width="200px"
              />
            </div>

            <div
              style={{ marginTop: "30px" }}
              className={`position-relative d-flex d-flex gap-3 align-items-center border border-primary rounded p-5 ${classes.wrap_sm}`}
            >
              <p
                className="position-absolute bg-white px-2 fs-7 fw-bolder"
                style={{
                  whiteSpace: "nowrap",
                  left: "10px",
                  top: "0px",
                  transform: "translateY(-50%)",
                }}
              >
                Media (Click to View):
              </p>
              {(application.media || []).length ? (
                <>
                  {application.media.map((file, index) => (
                    <a
                      href={`${axios.defaults.baseURL}${file}`}
                      target="_blank"
                      key={index}
                      style={{
                        width: "100px",
                        height: "100px",
                        fontSize: "30px",
                      }}
                      className="d-flex align-items-center justify-content-center rounded border border-secondary"
                    >
                      <i
                        className="fa fa-file-pdf"
                        style={{ fontSize: "70px" }}
                      ></i>
                    </a>
                  ))}
                </>
              ) : (
                <p className="m-0 p-0">No files attached</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationDetails;
