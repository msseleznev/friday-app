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


export const authAPI = {
    me() {
        return instance.post<UserType>('auth/me')
            .then(response => {
                return response.data
            })
    },
    register(email: string, password: string) {
        return instance.post<RegisterResponseType, { email: string, password: string }>('auth/register', {
            email,
            password
        })
    },
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<UserType>>('auth/login', data)
    },
    logout() {
        return instance.delete<AuthResponseType>('auth/me')
    },
    forgot(email: string) {
        return instance.post<any, AxiosResponse<AuthResponseType>, RecoverParamsType>('auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message:`<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/friday-app?#/new-password/$token$'>link</a></div>`
        })
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<AuthResponseType, { password: string, resetPasswordToken: string }>('auth/set-new-password', {
            password,
            resetPasswordToken
        })
    }

}

//TYPE

export type UserType = {
    _id: string,
    avatar?: string
    created: Date
    email: string
    name: string
    publicCardPacksCount: number
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
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
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type RecoverParamsType = {
    email: string
    from: string
    message: string
}