import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputSwitch } from "primereact/inputswitch";
import { convertToDate } from "../../utils/helpers";
import { Link } from "react-router-dom";

const capitalizeFirstLetter = (text) => {
  if (typeof text !== "string" || !text.length) return text; // Check if text is a string and not empty
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const PlainDataTable = React.memo((props) => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    setTableData(props.data || []);
  }, [props.data]);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
  };

  const renderColumnBody = (rowData, columnField, options) => {
    const nestedFields = columnField.split(".");
    let value = rowData;

    // Traverse through nested fields
    for (let field of nestedFields) {
      if (value && value?.hasOwnProperty(field)) {
        value = value[field];
      } else {
        value = null;
        break;
      }
    }

    if (columnField === "media") {
      return (
        <div
          className="rounded p-1"
          style={{
            height: "60px",
            aspectRatio: "1/1",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <img
            className="w-100 h-100 object-fit-contain"
            src={
              value
                ? `${import.meta.env.VITE_APP_API_URL}/${value}`
                : "https://dpfibqm29tl7w.cloudfront.net/placeholder.webp"
            }
            alt="Image"
            loading="lazy"
          />
        </div>
      );
    } else if (columnField === "isActive") {
      return (
        <div className="text-start d-flex align-items-center">
          {props?.quickActions?.includes("isActive") ? (
            <InputSwitch
              checked={value}
              className="me-2"
              onChange={(e) => props.handleSwitch(e, rowData)}
            />
          ) : (
            <i
              className={`fa ${value ? "fa-check" : "fa-close"} pe-2`}
              style={{ color: value ? "#28a745" : "#dc3545" }}
            />
          )}
          {value ? "Active" : "Inactive"}
        </div>
      );
    } else if (
      columnField.includes("website") ||
      columnField.includes("link")
    ) {
      return (
        <div className="d-flex gap-3 align-items-center">
          <button
            onClick={(e) =>
              navigator.clipboard.writeText(value).then(() => {
                e.target.innerHTML = "Copied";
                setTimeout(() => {
                  e.target.innerHTML = "Copy Link";
                }, 2000);
              })
            }
            style={{ minWidth: "85px" }}
            className="btn btn-primary p-2 py-1"
          >
            Copy Link
          </button>
          <Link
            to={value}
            target="_blank"
            className="text-start d-flex align-items-center text-primary"
          >
            Visit Instead
          </Link>
        </div>
      );
    } else if (columnField === "isFollowUpRequired") {
      return (
        <div className="text-start d-flex align-items-center">
          {props?.quickActions?.includes("isFollowUpRequired") ? (
            <InputSwitch
              checked={value}
              className="me-2"
              onChange={(e) => props.handleFollowUpSwitch(e, rowData)}
            />
          ) : (
            <i
              className={`fa ${value ? "fa-check" : "fa-close"} pe-2`}
              style={{ color: value ? "#28a745" : "#dc3545" }}
            />
          )}
          {value ? "Yes" : "No"}
        </div>
      );
    } else if (
      columnField === "source.postedAt" ||
      columnField === "proposal.sentAt" ||
      columnField === "createdAt" ||
      columnField === "updatedAt"
    ) {
      return convertToDate(value, "yyyy-MM-dd hh:mm a") || "N/A";
    } else if (columnField === "#") {
      return <div>{options.rowIndex + 1}</div>;
    } else if (columnField === "description") {
      return value && value.length > 50 ? `${value.slice(0, 50)}...` : value;
    }

    return value !== undefined || value !== null || value !== NaN
      ? value
      : "N/A";
  };

  const renderColumns = () => {
    const columns = props.fieldsToShow.map((columnField, index) => {
      return (
        <Column
          key={index}
          field={columnField}
          header={props?.fieldNamesToShow[index]}
          headerStyle={{ whiteSpace: "nowrap", minWidth: "30px" }} // Prevent header text wrapping
          body={(rowData, options) => (
            <div style={{ wordBreak: "keep-all", minWidth: "30px" }}>
              {capitalizeFirstLetter(
                renderColumnBody(rowData, columnField, options)
              )}
            </div>
          )}
          sortable
        />
      );
    });

    if (props?.view || props?.edit || props?.delete || props?.subscription) {
      columns.push(
        <Column
          key="actions"
          field="actions"
          header="Actions"
          bodyStyle={{ backgroundColor: "#fbfafa" }}
          body={(rowData) => (
            <div
              className="d-flex"
              style={{ justifyContent: "center", gap: "0.8rem" }}
            >
              {props?.view &&
                (props?.showFullSizeButton ? (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => props?.view(rowData)}
                    style={{ padding: "0.25rem 0.5rem" }}
                  >
                    View
                  </button>
                ) : (
                  <i
                    className="far fa-eye cursor-pointer"
                    onClick={() => props?.view(rowData)}
                    title="View"
                    style={{ fontSize: "1rem" }}
                  />
                ))}
              {props?.edit &&
                (props?.showFullSizeButton ? (
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => props?.edit(rowData)}
                    style={{ padding: "0.25rem 0.5rem" }}
                  >
                    Edit
                  </button>
                ) : (
                  <i
                    className="far fa-edit cursor-pointer"
                    onClick={() => props?.edit(rowData)}
                    title="Edit"
                    style={{ fontSize: "1rem" }}
                  />
                ))}
              {props?.delete &&
                (props?.showFullSizeButton ? (
                  <button
                    className="btn btn-sm fw-bolder btn-hover-scale text-white"
                    style={{
                      backgroundColor: "#DD6B55",
                      padding: "0.25rem 0.5rem",
                    }}
                    onClick={() => props?.delete(rowData)}
                  >
                    Delete
                  </button>
                ) : (
                  <i
                    className="far fa-trash-can svg-icon svg-icon-5 svg-icon-gray-500 cursor-pointer"
                    onClick={() => props?.delete(rowData)}
                    title="Delete"
                    style={{ fontSize: "1rem" }}
                  />
                ))}
              {props?.subscription && (
                <i
                  className="fas fa-credit-card svg-icon svg-icon-5 svg-icon-gray-500 cursor-pointer"
                  onClick={() => props?.subscription(rowData)}
                  title="Subscription"
                  style={{ fontSize: "1rem" }}
                />
              )}
            </div>
          )}
          frozen
          alignFrozen="right"
          style={{
            minWidth: props?.showFullSizeButton ? "180px" : "90px",
            width: props?.showFullSizeButton ? "180px" : "90px",
            maxWidth: props?.showFullSizeButton ? "180px" : "90px",
          }}
        />
      );
    }

    return columns;
  };

  return (
    <div className="col-12">
      <div className="border-0" style={{ background: "none" }}>
        <DataTable
          value={tableData}
          paginator
          removableSort
          showGridlines
          rows={10}
          loading={loading}
          dataKey="_id"
          scrollable
          scrollHeight="flex"
          globalFilter={globalFilterValue}
          frozenWidth="50px"
          header={
            <div className="p-d-flex p-jc-between p-ai-center w-100">
              <span className="p-input-icon-left">
                <i className="fa fa-search ps-3" />
                <input
                  className="form-control ps-8"
                  value={globalFilterValue}
                  onChange={onGlobalFilterChange}
                  placeholder="Keyword Search"
                />
              </span>
            </div>
          }
          emptyMessage="No record found."
        >
          {renderColumns()}
        </DataTable>
      </div>
    </div>
  );
});

PlainDataTable.displayName = "PlainDataTable";

export default PlainDataTable;
