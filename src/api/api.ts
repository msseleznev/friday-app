import axios, {AxiosResponse} from 'axios';

enum BASE_URLS {
    LOCAL = 'http://localhost:7542/2.0/',
    HEROKU = 'https://neko-back.herokuapp.com/2.0/'
}

export const instance = axios.create({
    baseURL: BASE_URLS.LOCAL,
    withCredentials: true,
});


//REQUESTS

export const profileAPI = {
    update(data: { name: string, avatar: string }) {
        return instance.put<any, AxiosResponse<UpdateResponseType>, { name: string, avatar: string }>('auth/me', data)
            .then(response => {
                return response.data
            })
    }
};


// Requests related to login in and out, register and password re
export const authAPI = {

    me() {
        return instance.post('auth/me', {})
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType, { email: string, password: string }>('auth/register', {
            email,
            password
        })
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete<AuthResponseType>('auth/me')
    },
    forgot(email: string, from: string, message: string) {
        return instance.post<AuthResponseType, {email: string, from: string, message: string}>('auth/forgot', {email, from, message})
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<AuthResponseType, {password: string, resetPasswordToken: string}>('auth/set-new-password', {password, resetPasswordToken})
    }

}

//TYPE

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


// может еще типизацию ошибки добавить 'error?: string' ? (Ваня)
type UpdateResponseType = {
    token: string
    tokenDeathTime: number
    updatedUser: UserType
}

type RegisterResponseType = {
//типизация addedUser не обязательно
    addedUser: any
    error?: string
    email?: string
}
type AuthResponseType = {
    info: string
    error: string
}
