import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import Loader from "../components/Loader";

const Profile = () => {
    const { isAuthenticated, loading, user } = useContext(AuthContext);

    return loading ? (
        <Loader />
    ) : (
        <div>
            {!isAuthenticated && <h3 style={{ textAlign: 'center', marginTop: '30px' }}>Please login for using this app</h3>}
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
        </div>
    );
};

export default Profile;