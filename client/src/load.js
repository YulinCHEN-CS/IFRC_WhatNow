import { lazy } from 'react';


export const Homepage  = lazy(
    async()=>await import('./Component/Homepage/Blog')
);

export const Login  = lazy(
    async()=>await import('./Component/Login/index')
);

export const Register  = lazy(
    async()=>await import('./Component/Register/index')
);

export const Content = lazy(
    async()=>await import('./Component/Content/index')
);
