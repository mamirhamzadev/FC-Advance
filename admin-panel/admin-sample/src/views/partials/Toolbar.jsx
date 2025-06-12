import { useEffect, Fragment } from "react";

export default function Toolbar(props) {
  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }, []);

  return (
    <Fragment>
      <div className="container-fluid px-0">
        <div>
          <div className="container-xl">
            <div className="row">
              <div className="d-flex flex-wrap flex-stack pt-5 pb-8">
                <h1 className="fw-bolder my-2">{props.pageName}</h1>

                {props.buttonName && (
                  <div className="d-flex flex-wrap my-1">
                    <div className="row">
                      <div className="col-12 me-5">
                        <ul className="nav nav-pills">
                          <li className="nav-item m-0">
                            <span
                              data-bs-toggle="tooltip"
                              data-bs-trigger="hover"
                              data-bs-dismiss-="click"
                              data-bs-original-title={props.buttonName}
                            >
                              <button
                                type="button"
                                className="btn btn-icon btn-primary fw-bolder w-100 px-4"
                                data-bs-toggle="modal"
                                data-bs-target={`#${props.firstModalId}`}
                                aria-describedby="tooltip846317"
                              >
                                <i className="las la-plus fs-2 " />{" "}
                                {props.buttonName}
                              </button>
                            </span>
                          </li>
                          {props.secondButton && (
                            <li className="nav-item ms-2">
                              <span
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-dismiss-="click"
                                title=""
                                data-bs-original-title={props.secondButton}
                              >
                                <button
                                  type="button"
                                  className="btn btn-icon btn-success fw-bolder w-100 px-4  btn-hover-scale ms-4"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#${props.secondModalId}`}
                                >
                                  <i className="las la-plus fs-2 me-4" />
                                  {props.secondButton}
                                </button>
                              </span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {props.count > -1 && (
                <div className="mb-9">
                  <div className="d-flex  flex-wrap flex-stack">
                    <div className="fw-bolder fs-4">All {props.pageName}</div>

                    <div>
                      {" "}
                      <span className="badge badge-square badge-success">
                        {props.count}
                      </span>{" "}
                    </div>
                  </div>
                  <div className="mt-2 h-3px w-100 bg-warning" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {props.firstBtnModal}
      {props.secondBtnModal}
    </Fragment>
  );
}
