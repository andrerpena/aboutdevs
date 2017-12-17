import * as React from "react";
import * as commonTypes from "../typings/commonTypes";

interface ProfileViewProps {
    profile: commonTypes.UserProfile;
}

interface ProfileViewState {

}

export class ProfileView extends React.Component<ProfileViewProps, ProfileViewState> {
    render() {
        const {profile} = this.props;
        if (!profile) {
            return null;
        }
        return (
            <div className="profile-view">
                <div className="header-wrapper" style={{backgroundColor: profile.colorPrimary}}>
                    <header>
                        <div className="profile-image" style={{backgroundImage: `url(${profile.photoUrl})`}}/>
                        <h1>{profile.displayName}</h1>
                    </header>
                </div>
            </div>
        );
    }
}