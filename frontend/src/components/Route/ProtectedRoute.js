import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoutes = ({ isAdmin, element: Element, ...rest }) => {
  
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  
    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated === false) {
                            return <Navigate to="/login" />;
                        }

                        if (isAdmin === true && user.role !== 'admin') {
                            return <Navigate to="/login" />;
                        }

                        return <Element {...props} />;
                    }}
                />
            )}
        </Fragment>
    );
}

export default ProtectedRoutes