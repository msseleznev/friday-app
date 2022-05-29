import axios, {AxiosResponse} from 'axios';

enum BASE_URLS {
    LOCAL = 'http://localhost:7542/2.0/',
    HEROKU = 'https://neko-back.herokuapp.com/2.0/'
}

export const instance = axios.create({
    baseURL: BASE_URLS.HEROKU,
    withCredentials: true,
});


//REQUESTS

export const profileAPI = {
    update(name: string, avatar?: string) {
        return instance.put<UpdateResponseType>('auth/me', {
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
            .then(response => response.data)
    },
    forgot(email: string) {
        return instance.post<AuthResponseType>('auth/forgot', {
            email,
            from: "test-front-admin <ai73a@yandex.by>",
            message: "<div style='background-color: #F5F5F5; padding: 15px'>Password recovery link: " +
                "<a href='https://msseleznev.github.io/friday-app/#/new-password/$token$' style='color:#42A5F5'>Go to password recovery page</a></div>"
        })
    },
    setNewPassword(data: NewPasswordDataType) {
        return instance.post<AuthResponseType>('auth/set-new-password', data)
    }
}

export const packsAPI = {
    getPacks(params: PacksParamsType) {

        return instance.get<PacksType>('cards/pack', {params})
    },
    createPack(params: CreatePackParams) {
        return instance.post<CreatePackParams, AxiosResponse<CardPackType>>('cards/pack', {cardsPack: params})
    },
    deletePack(_id: string) {
        return instance.delete<DeletedCardsPack>(`cards/pack?id=${_id}`)
    },
    editPack(params: EditPackParams) {
        return instance.put('cards/pack',
            {cardsPack: {_id: params._id, name: params.name, deckCover: params.deckCover}})
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


type UpdateResponseType = {
    token: string
    tokenDeathTime: number
    updatedUser: UserType
}

type RegisterResponseType = {
//типизация addedUser не обязательна
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
export type NewPasswordDataType = {
    password: string,
    resetPasswordToken: string
}
export type PacksParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: string
    page: number
    pageCount: number
    user_id: string
}

export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    cardsCount: number
    created: string
    updated: string
    deckCover: string
}

export type PacksType = {
    cardPacks: CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CreatePackParams = {
    name: string
    deckCover: string
    private: boolean
}
export type EditPackParams = {
    _id: string
    name?: string
    deckCover?:string
}

type NewCardsPack = {}
type DeletedCardsPack = {}
type UpdatedCardsPack = {}

