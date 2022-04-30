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
    update(data: { name: string, avatar: string }) {
        return instance.put<any, AxiosResponse<UpdateResponseType>, { name: string, avatar: string }>('auth/me', data)
            .then(response=>{
                return response.data
            })
    }
};


type UserType = {
    avatar: string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}
type UpdateResponseType = {
    token: string
    tokenDeathTime: number
    updatedUser: UserType
}
