/* eslint-disable no-unused-vars */
import React, { useEffect, Suspense, lazy, useMemo } from "react";
import { Route, Navigate, useParams, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  BASE_ROUTE,
  DRAFT_ENABLED,
  MULTITENANCY_ENABLED,
  KEYCLOAK_AUTH_URL,
  Keycloak_Client,
  KEYCLOAK_REALM,
} from "../constants/constants";
import { KeycloakService, StorageService } from "@formsflow/service";
import {
  setUserAuth,
  setUserRole,
  setUserToken,
  setUserDetails,
} from "../actions/bpmActions";
import { setLanguage } from "../actions/languageSetAction";
import {
  CLIENT,
  STAFF_REVIEWER,
  STAFF_DESIGNER,
  ENABLE_APPLICATIONS_MODULE,
  ENABLE_DASHBOARDS_MODULE,
  ENABLE_FORMS_MODULE,
  ENABLE_PROCESSES_MODULE,
  ENABLE_TASKS_MODULE,
} from "../constants/constants";

import Loading from "../containers/Loading";
import NotFound from "./NotFound";
import { setTenantFromId } from "../apiManager/services/tenantServices";

// Lazy imports is having issues with micro-front-end build

import Form from "./Form";
import ServiceFlow from "./ServiceFlow";
import DashboardPage from "./Dashboard";
import InsightsPage from "./Insights";
import Application from "./Application";
import Modeler from "./Modeler";
import Drafts from "./Draft";
import {
  BPM_API_URL_WITH_VERSION,
  WEB_BASE_URL,
  WEB_BASE_CUSTOM_URL,
  CUSTOM_SUBMISSION_URL,
} from "../apiManager/endpoints/config";
import { AppConfig } from "../config";
import { getFormioRoleIds } from "../apiManager/services/userservices";
import { toast } from "react-toastify";

export const kcServiceInstance = (tenantId = null) => {
  return KeycloakService.getInstance(
    KEYCLOAK_AUTH_URL,
    KEYCLOAK_REALM,
    tenantId ? `${tenantId}-${Keycloak_Client}` : Keycloak_Client
  );
};

const setApiBaseUrlToLocalStorage = () => {
  localStorage.setItem("bpmApiUrl", BPM_API_URL_WITH_VERSION);
  localStorage.setItem("formioApiUrl", AppConfig.projectUrl);
  localStorage.setItem("formsflow.ai.url", window.location.origin);
  localStorage.setItem("formsflow.ai.api.url", WEB_BASE_URL);
  localStorage.setItem("customApiUrl", WEB_BASE_CUSTOM_URL);
  localStorage.setItem("customSubmissionUrl", CUSTOM_SUBMISSION_URL);
};

const PrivateRoute = React.memo((props) => {
  const { publish, subscribe, getKcInstance } = props;
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const userRoles = useSelector((state) => state.user.roles || []);
  const { tenantId } = useParams();
  const redirecUrl = MULTITENANCY_ENABLED ? `/tenant/${tenantId}/` : `/`;

  const [kcInstance, setKcInstance] = React.useState(getKcInstance());

  const authenticate = (instance, store) => {
    store.dispatch(
      setUserRole(JSON.parse(StorageService.get(StorageService.User.USER_ROLE)))
    );
    dispatch(setUserAuth(instance.isAuthenticated()));
    store.dispatch(setUserToken(instance.getToken()));
    store.dispatch(setLanguage(instance.getUserData()?.locale || "en"));
    //Set Cammunda/Formio Base URL
    setApiBaseUrlToLocalStorage();
    // get formio roles
    store.dispatch(
      getFormioRoleIds((err) => {
        if (err) {
          console.error(err);
          // doLogout();
        } else {
          store.dispatch(
            setUserDetails(
              JSON.parse(StorageService.get(StorageService.User.USER_DETAILS))
            )
          );

          // onAuthenticatedCallback();
        }
      })
    );
  };

  useEffect(() => {
    let instance = tenantId ? kcServiceInstance(tenantId) : kcServiceInstance();
    if (tenantId && props.store) {
      let currentTenant = sessionStorage.getItem("tenantKey");
      if (currentTenant && currentTenant !== tenantId) {
        sessionStorage.clear();
        localStorage.clear();
      }
      sessionStorage.setItem("tenantKey", tenantId);
      dispatch(setTenantFromId(tenantId));
    }
    if (props.store) {
      if (kcInstance) {
        authenticate(kcInstance, props.store);
      } else {
        instance.initKeycloak((authenticated) => {
          if (!authenticated) {
            toast.error("Unauthorized Access.", { autoClose: 3000 });
            setTimeout(function () {
              instance.userLogout();
            }, 3000);
          } else {
            authenticate(instance, props.store);
            publish("FF_AUTH", instance);
          }
        });
      }
    }
  }, [props.store, tenantId, dispatch]);

  // useMemo prevents unneccessary rerendering caused by the route update.

  const DesignerRoute = useMemo(
    () =>
      ({ element: Element, ...rest }) =>
        (
          <Route
            {...rest}
            element={(props) =>
              userRoles.includes(STAFF_DESIGNER) ? (
                <Element {...props} />
              ) : (
                <>unauthorized</>
              )
            }
          />
        ),
    [userRoles]
  );

  const ReviewerRoute = useMemo(
    () =>
      ({ element: Element, ...rest }) =>
        (
          <Route
            {...rest}
            element={(props) =>
              userRoles.includes(STAFF_REVIEWER) ? (
                <Element {...props} />
              ) : (
                <>unauthorized</>
              )
            }
          />
        ),
    [userRoles]
  );

  const ClientReviewerRoute = useMemo(
    () =>
      ({ element: Element, ...rest }) =>
        (
          <Route
            {...rest}
            element={(props) =>
              userRoles.includes(STAFF_REVIEWER) ||
              userRoles.includes(CLIENT) ? (
                <Element {...props} />
              ) : (
                <>unauthorized</>
              )
            }
          />
        ),
    [userRoles]
  );

  const DraftRoute = useMemo(
    () =>
      ({ element: Element, ...rest }) =>
        (
          <Route
            {...rest}
            element={(props) =>
              DRAFT_ENABLED &&
              (userRoles.includes(STAFF_REVIEWER) ||
                userRoles.includes(CLIENT)) ? (
                <Element {...props} />
              ) : (
                <>unauthorized</>
              )
            }
          />
        ),
    [userRoles]
  );
  return (
    <>
      {isAuth ? (
        // <Suspense fallback={<Loading />}>
          <Routes>
            {ENABLE_FORMS_MODULE && (
              <Route path={`form`} element={<NotFound/>} />
            )}
            {ENABLE_FORMS_MODULE && (
              <DesignerRoute
                path={`${BASE_ROUTE}formflow`}
                element={<Form />}
              />
            )}
            {ENABLE_APPLICATIONS_MODULE && (
              <DraftRoute path={`${BASE_ROUTE}draft`} element={<Drafts />} />
            )}
            {ENABLE_APPLICATIONS_MODULE && (
              <ClientReviewerRoute
                path={`${BASE_ROUTE}application`}
                element={<Application />}
              />
            )}

            {ENABLE_PROCESSES_MODULE && (
              <DesignerRoute
                path={`${BASE_ROUTE}processes`}
                element={<Modeler />}
              />
            )}

            {ENABLE_DASHBOARDS_MODULE && (
              <ReviewerRoute
                path={`${BASE_ROUTE}metrics`}
                element={<DashboardPage />}
              />
            )}
            {ENABLE_DASHBOARDS_MODULE && (
              <ReviewerRoute
                path={`${BASE_ROUTE}insights`}
                element={<InsightsPage />}
              />
            )}
            {ENABLE_TASKS_MODULE && (
              <ReviewerRoute
                path={`${BASE_ROUTE}task`}
                element={<ServiceFlow />}
              />
            )}

            <Route
              path={BASE_ROUTE}
              element={
                userRoles?.includes(STAFF_REVIEWER) ? (
                  <Navigate to={`${redirecUrl}task`} />
                ) : (
                  <Navigate to={`${redirecUrl}form`} />
                )
              }
            />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        // </Suspense>
      ) : (
        <Loading />
      )}
    </>
  );
});

export default PrivateRoute;
