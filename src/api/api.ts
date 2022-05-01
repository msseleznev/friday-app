import axios, {AxiosResponse} from 'axios';

enum BASE_URLS {
    LOCAL = 'http://localhost:7542/2.0/',
    HEROKU = 'https://neko-back.herokuapp.com/2.0/'
}

export const instance = axios.create({
    baseURL: BASE_URLS.LOCAL,
    withCredentials: true,
});

export const profileAPI = {
    update(name: string, avatar?: string) {
        return instance.put<any, AxiosResponse<UpdateResponseType>, { name: string, avatar?: string }>('auth/me', {
            name,
            avatar
        })
            .then(response => {
                return response.data
            })
    }
};


export type UserType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}
type UpdateResponseType = {
    token: string
    tokenDeathTime: number
    updatedUser: UserType
}
