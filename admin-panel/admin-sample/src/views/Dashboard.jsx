import BreadCrumb from "./partials/BreadCrumb";
import DashboardInfoCard from "../../../shared/styles/cards/DashboardInfoCard";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import useToast from "../../../shared/store/hooks/useToast";

const Dashboard = () => {
  const { notify } = useToast();
  const profile = useSelector((state) => state?.profile?.profile);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("/api/admins/dashboard")
      .then((res) => setData({ companies: res?.data?.companies }))
      .catch((err) => notify("error", err?.msg))
      .finally(() => setLoading(false));
  }, []);

  const LoadingComponent = (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <BreadCrumb pageNames={["Dashboard"]} />
      {loading ? (
        LoadingComponent
      ) : (
        <div className="container-xxl">
          <div className="row">
            <div className="col-xl-12 mb-5 mb-xl-10">
              <div className="card card-flush h-xl-100">
                <div
                  className="card-header justify-content-center rounded bgi-no-repeat bgi-size-cover bgi-position-y-bottom bgi-position-x-center align-items-start h-250px"
                  style={{ background: "#d21825" }}
                >
                  <h3 className="card-title align-items-start flex-column text-white pt-15 mb-10 text-center ">
                    <span className="d-block fs-2x fw-bolder mb-3 w-100">
                      Hello, {profile?.name}
                    </span>
                    <div className="d-block fs-3tx text-white mb-3 w-100">
                      Welcome To Dashboard
                    </div>
                  </h3>
                </div>

                <div className="card-body mt-n10">
                  <div className="mt-n20 position-relative">
                    <div className="row g-3 g-lg-6 justify-content-center">
                      <DashboardInfoCard
                        title="Companies"
                        icon="fa-cubes"
                        count={data?.companies || 0}
                        page="companies"
                        isFetching={loading}
                      />
                      <DashboardInfoCard
                        title="Products"
                        icon="fa-box-open"
                        count={0}
                        page="products"
                        isFetching={loading}
                      />
                      <DashboardInfoCard
                        title="Users"
                        icon="fa-user"
                        count={0}
                        page="users"
                        isFetching={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
