import { ReactNode } from "react";
import 'vite/client'
export interface MainRoute {
    path?: string;
    element?: any;
    children?: any;

}

export interface CustomRoute {
    index?: boolean;
    path?: string;
    element: ReactNode;
    loader?: () => void;
    action?: () => void;
}

export interface ImportMeta {
    env: {
      REACT_APP_API_URL: string;
      REACT_APP_URL: string;
      REACT_APP_THEME_TAG: string;
      REACT_APP_GOOGLE_CLIENT_ID: string;
    };
}

export interface StoreState {
    user: any|null;
    message: string|null;
    search: any;
    loading: boolean;
    courses: any;
    stepUrl: any;
    isLoggedIn: boolean;
    isAuthenticated : () => boolean;
    lasChosen: any|null;
    electionData: any|null;
    loadUserData: () => void;
    loadStudentVote: () => void;
    lasChoose: (data: object) => void;
    setSearch: (data: object) => void;
    logout: () => void;
    withCredential: (username:string, password: string) => void;
    withGoogle: (providerId:string, email: string) => void;
    changePassword: (tag:string, oldpassword: string, newpassword: string) => void;
    

}


