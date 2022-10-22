import {Redirect, Route, RouteProps} from 'react-router-dom';
import {FC, ReactNode} from "react";
import {getCookie} from "../../utils/cookieUtils";


const ProtectedRoute:  FC<RouteProps & {children:ReactNode; path:string; exact:boolean}>= ({ children, exact, path }) => {
   // const {isAuth} = useSelector((state:any) => state.userReducer);
    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) =>
                getCookie('accessToken') ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}
export default ProtectedRoute;