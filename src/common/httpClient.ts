import axios, { AxiosPromise } from "axios";

import * as commonTypes from "../common/typings/commonTypes";
import { getDataFromFormattedAddress } from "./helpers/locationFormatHelper";
import { createTagsParameter } from "../server/helpers/tagHelper";

export function getLoggedUserData() {
    return axios.get("/api/u/my_user");
}

export function getMyProfileData() {
    return axios.get("/api/u/edit_my_profile");
}

export function getProfileData(userName: string) {
    if (!userName) throw Error("Argument is null or undefined. Argument: userName");
    return axios.get(`/api/u/${encodeURIComponent(userName)}`);
}

export function saveProfileData(profile: commonTypes.UserProfile): AxiosPromise {
    if (!profile) throw Error("Argument 'profile' should be truthy");
    const data = new FormData();
    if (profile.cv.file) {
        data.append("cv", profile.cv.file, profile.cv.file.name);
    }
    // this copy is to eliminate the profile.cv.file without altering the original
    const profileCopy = {...profile, ...{cv: {file: null, fileName: profile.cv.fileName, url: profile.cv.url}}};
    data.append("profile", JSON.stringify(profileCopy));
    return axios.post("/api/u/edit_my_profile", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export function checkUserName(userName: string): AxiosPromise {
    if (!userName) throw Error("Argument 'userName' should be truthy");
    return axios.get(`/api/u/check_name?q=${encodeURIComponent(userName)}`);
}

// SEARCH

export function searchDevelopers(tags: string[], formattedAddress: string): AxiosPromise {
    const tagsParameter = createTagsParameter(tags);
    if (tagsParameter && formattedAddress) {
        const {placeId, address} = getDataFromFormattedAddress(formattedAddress);
        return axios.get(`/api/s/t/${encodeURIComponent(tagsParameter)}/l/${encodeURIComponent(placeId)}/${encodeURIComponent(address)}`);
    }
    if (tags) {
        return axios.get(`/api/s/t/${encodeURIComponent(tagsParameter)}`);
    }
    return axios.get(`/api/s/`);
}

export function searchLocations(search: string): AxiosPromise {
    return axios.get(`/api/l?q=${encodeURIComponent(search)}`);
}

export function searchTags(search: string): AxiosPromise {
    return axios.get(`/api/t?q=${encodeURIComponent(search)}`);
}
