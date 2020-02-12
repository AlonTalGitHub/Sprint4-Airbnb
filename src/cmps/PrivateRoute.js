import React from 'react';
import { Redirect,Route} from 'react-router';
import { getUserById } from '../actions/UserActions'
import { connect } from 'react-redux';

function PrivateRoute({ children, getUserById, ...rest }) {
    return (
        <Route
            {...rest}
            render={({location}) => {
                if (sessionStorage.user){
                    const localLoggedinUser = JSON.parse(sessionStorage.user);
                    getUserById(localLoggedinUser._id)
                    return (children)
                } else{
                   return (<Redirect
                      to={{
                        pathname: "/login",
                        state: { from: location }
                      }}
                    />)
                }    
            }}
        />
    );
}

const mapDispatchToProps = {
    getUserById
};

export default connect(null, mapDispatchToProps)(PrivateRoute)






