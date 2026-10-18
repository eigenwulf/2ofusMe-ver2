module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/theme.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "theme",
    ()=>theme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/createTheme.js [app-ssr] (ecmascript) <export default as createTheme>");
'use client';
;
const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$createTheme$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__createTheme$3e$__["createTheme"])({
    palette: {
        primary: {
            // main: '#B6C6CB',
            main: '#aac4a2',
            dark: '#354d54',
            contrastText: '#713e11ff'
        },
        secondary: {
            main: '#4a3d9eff',
            light: 'rgb(122, 105, 230)',
            dark: 'rgb(31, 23, 87)'
        }
    },
    // current default is spectral. to use the below fonts, 
    // 1. load in layout.ts 2. add 'font'.variable to html className, 3. use in Typography sx, fontFamily: 'var(--font-quintessential)',
    typography: {
        fontFamily: [
            'var(--font-spectral)',
            'Montserrat',
            'Sacramento',
            'var(--font-goudy)',
            'Courgette',
            'Tangerine',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(',')
    },
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontSize: '1rem',
                    // backgroundColor: 'yellow!important',
                    backgroundColor: 'main',
                    textTransform: 'none'
                }
            }
        }
    }
});
//color names
// 'inherit'
// | 'action'
// | 'disabled'
// | 'primary'
// | 'secondary'
// | 'error'
// | 'info'
// | 'success'
// | 'warning'
// | string
{}{}}),
"[project]/app/store/listenerMiddleware.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "listenerMiddleware",
    ()=>listenerMiddleware,
    "startListening",
    ()=>startListening,
    "stopListening",
    ()=>stopListening
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const listenerMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createListenerMiddleware"])();
const { startListening, stopListening } = listenerMiddleware;
}),
"[project]/app/store/features/auth/authSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearCredentials",
    ()=>clearCredentials,
    "default",
    ()=>__TURBOPACK__default__export__,
    "selectCurrentUser",
    ()=>selectCurrentUser,
    "setCredentials",
    ()=>setCredentials
]);
//Sets and clears user credentials and user details, see logindialog.js
//Takes a JWT from a login mutation, then setting that in our store. We then use prepareHeaders to inject the authentication headers into every subsequent request.
// import { PURGE } from "redux-persist";
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
;
const initialState = {
    user: null
}//type assertion
;
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action)=>{
            state.user = action.payload.user; //action.payload is server response data 
        // state.access = action.payload.access;
        // state.refresh = action.payload.refresh; 
        // state.token = action.payload.access;
        },
        clearCredentials: (state)=>{
            state.user = null;
        }
    }
});
const { setCredentials, clearCredentials } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
const selectCurrentUser = (state)=>state.auth.user;
}),
"[project]/app/store/features/api/apiSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

//RTK Query: central access to all REST API endpoints
__turbopack_context__.s([
    "apiSlice",
    ()=>apiSlice,
    "useCreatecampaignlevelMutation",
    ()=>useCreatecampaignlevelMutation,
    "useCreatecoMutation",
    ()=>useCreatecoMutation,
    "useCreaterepMutation",
    ()=>useCreaterepMutation,
    "useCreaterepcoMutation",
    ()=>useCreaterepcoMutation,
    "useDeletecoMutation",
    ()=>useDeletecoMutation,
    "useDeleterepMutation",
    ()=>useDeleterepMutation,
    "useGetUserQuery",
    ()=>useGetUserQuery,
    "useGetcampaignlevelsQuery",
    ()=>useGetcampaignlevelsQuery,
    "useLazyGetcampaignlevelsQuery",
    ()=>useLazyGetcampaignlevelsQuery,
    "useLazyListrepcoQuery",
    ()=>useLazyListrepcoQuery,
    "useLazyRetrievecoQuery",
    ()=>useLazyRetrievecoQuery,
    "useLazyRetrieverepQuery",
    ()=>useLazyRetrieverepQuery,
    "useLazyRetrieverepcoQuery",
    ()=>useLazyRetrieverepcoQuery,
    "useListrepcoQuery",
    ()=>useListrepcoQuery,
    "useLoginMutation",
    ()=>useLoginMutation,
    "useLogoutMutation",
    ()=>useLogoutMutation,
    "useRegistrationMutation",
    ()=>useRegistrationMutation,
    "useRetrievecoQuery",
    ()=>useRetrievecoQuery,
    "useRetrieverepQuery",
    ()=>useRetrieverepQuery,
    "useRetrieverepcoQuery",
    ()=>useRetrieverepcoQuery,
    "useUpdatecoMutation",
    ()=>useUpdatecoMutation,
    "useUpdaterepMutation",
    ()=>useUpdaterepMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$async$2d$mutex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/async-mutex/index.mjs [app-ssr] (ecmascript)"); ////from chat: The Mutex ensures that only one refresh token request runs at a time
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$auth$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/features/auth/authSlice.ts [app-ssr] (ecmascript)");
;
;
;
// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
const mutex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$async$2d$mutex$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Mutex"]();
const baseQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
    // baseUrl: 'http://localhost:8000/',
    baseUrl: '/',
    credentials: 'include'
});
//Handling Token Expiration with Reauthorization
const baseQueryWithReauth = async (args, api, extraOptions)=>{
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            //token expired and mutex not locked send refresh token request to endpoint
            try {
                const refreshResult = await baseQuery({
                    url: '/dj-rest-auth/token/refresh/',
                    method: 'POST',
                    body: {
                        refresh: api.getState().auth.refresh
                    }
                }, api, extraOptions);
                if (refreshResult.data) {
                    api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$auth$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCredentials"])(refreshResult.data));
                    //retry initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$auth$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearCredentials"])());
                }
            } finally{
                // release must be called once the mutex can be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions); //retry original request
        }
    }
    //retry original request with new token
    return result;
};
const apiSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'co'
    ],
    //see note on builder
    endpoints: (builder)=>({
            //__________________________________________________USER REGISTRATION ENDPOINT
            registration: builder.mutation({
                query: (credentials)=>({
                        url: '/api/auth/registration/',
                        method: 'POST',
                        body: credentials
                    })
            }),
            //_____________________________LOGIN ENDPOINT
            login: builder.mutation({
                query: (credentials)=>({
                        url: '/api/auth/login/',
                        method: 'POST',
                        body: credentials
                    })
            }),
            //_____________________________LOGOUT ENDPOINT
            //explicitly declares both the result and argument are void, so logout() with no arguments becomes valid.
            logout: builder.mutation({
                query: ()=>({
                        url: '/api/auth/logout/',
                        method: 'POST'
                    })
            }),
            //_____________________________GET CURRENT USER ENDPOINT
            //The query just hits the endpoint, and if the cookie is valid Django says "here's your user", if not it returns 401
            //on page refresh: cookie → backend validates → user object → Redux state (via dispatch)
            getUser: builder.query({
                query: ()=>'/api/auth/user/'
            }),
            //_______________________________________________________REP ENDPOINT: 
            //CREATE
            createrep: builder.mutation({
                query: (data)=>({
                        url: '/accounts/rep/',
                        method: 'POST',
                        body: data
                    })
            }),
            //RETRIEVE
            retrieverep: builder.query({
                query: (id)=>`/accounts/rep/${id}`
            }),
            //UPDATE
            updaterep: builder.mutation({
                query: ({ id, ...data })=>({
                        url: `/accounts/rep/${id}/`,
                        method: 'PUT',
                        body: data
                    })
            }),
            //DELETE
            deleterep: builder.mutation({
                query: (id)=>({
                        url: `/accounts/rep/${id}/`,
                        method: 'DELETE'
                    })
            }),
            //_______________________________________________________COMPANY ENDPOINT: 
            // LIST — returns all RepCompanyAssignments for the authenticated user,  filters by rep__customuser=request.user automatically.
            //TypeScript type for builder.query without explicit generic types defaults to requiring an arg. Fix it by adding <unknown, void> generics to tell TypeScript the <result_type, arg_type> :
            // List companies, each with current_campaign_level embedded
            listco: builder.query({
                query: ()=>'/accounts/co/'
            }),
            //CREATE
            createco: builder.mutation({
                query: (data)=>({
                        url: '/accounts/co/',
                        method: 'POST',
                        body: data
                    })
            }),
            //RETRIEVE
            retrieveco: builder.query({
                query: (id)=>`/accounts/co/${id}`
            }),
            //UPDATE
            updateco: builder.mutation({
                query: ({ id, ...data })=>({
                        url: `/accounts/co/${id}/`,
                        method: 'PUT',
                        body: data
                    })
            }),
            //DELETE
            deleteco: builder.mutation({
                query: (id)=>({
                        url: `/accounts/co/${id}/`,
                        method: 'DELETE'
                    })
            }),
            //Expands endpoint to allow for campaign_levels, url: /accounts/co/{id}/campaign-levels/
            //gets campaign levels for specified company
            //GET campaign level
            getcampaignlevels: builder.query({
                query: (companyId)=>`accounts/co/${companyId}/campaign-levels/`
            }),
            //POST campaign level
            //creates new campaign level for specified company
            createcampaignlevel: builder.mutation({
                query: ({ companyId, level, notes = '' })=>({
                        url: `accounts/co/${companyId}/campaign-levels/`,
                        method: 'POST',
                        body: {
                            level,
                            notes
                        }
                    }),
                invalidatesTags: [
                    'co'
                ]
            }),
            //_______________________________________________________REP-COMPANY ENDPOINT: 
            // LIST — returns all RepCompanyAssignments for the authenticated user,  filters by rep__customuser=request.user automatically.
            //TypeScript type for builder.query without explicit generic types defaults to requiring an arg. Fix it by adding <unknown, void> generics to tell TypeScript the <result_type, arg_type> :
            listrepco: builder.query({
                query: ()=>'/accounts/repco/'
            }),
            //CREATE
            createrepco: builder.mutation({
                query: (data)=>({
                        url: '/accounts/repco/',
                        method: 'POST',
                        body: data
                    })
            }),
            //RETRIEVE
            retrieverepco: builder.query({
                query: (id)=>`/accounts/repco/${id}/`
            })
        }) //CLOSE BASEQUERY AND ENDPOINTS
});
const { // USER 
useLoginMutation, useLogoutMutation, useRegistrationMutation, useGetUserQuery, //REP
useCreaterepMutation, useRetrieverepQuery, useUpdaterepMutation, useDeleterepMutation, useLazyRetrieverepQuery, //COMPANY
useCreatecoMutation, useRetrievecoQuery, useUpdatecoMutation, useDeletecoMutation, useLazyRetrievecoQuery, //Rep Co Assignment
useListrepcoQuery, useLazyListrepcoQuery, useCreaterepcoMutation, useRetrieverepcoQuery, useLazyRetrieverepcoQuery, //Campaign Level
useGetcampaignlevelsQuery, useLazyGetcampaignlevelsQuery, useCreatecampaignlevelMutation } = apiSlice; //automatically named action hooks, useEndpointnameMutation
 /*
EXPORT HOOK: RTK Query's React integration will automatically generate React hooks for every endpoint we define! Those hooks encapsulate the process of triggering a request when a component mounts, and re-rendering the component as the request is processed and data is available. 
We can export those hooks out of this API slice file for use in our React components.
The hooks are automatically named based on a standard convention:
-use, the normal prefix for any React hook
-The name of the endpoint, capitalized
-The type of the endpoint, Query or Mutation
[https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics]


REDUCERPATH: reducerPath field, which defines the expected top-level state slice field for the generated reducer. 
For our other slices like postsSlice, there's no guarantee that it will be used to update state.posts - we could have attached the reducer anywhere in the root state, like someOtherField: postsReducer. 
Here, createApi expects us to tell it where the cache state will exist when we add the cache reducer to the store. 
If you don't provide a reducerPath option, it defaults to 'api', so all your RTKQ cache data will be stored under state.api.

ENDPOINTS
The endpoints are defined using a callback function that accepts a builder parameter and returns an object 
containing endpoint definitions created with builder.query() and builder.mutation().

AUTHENTICATION
PREPAREHEADERS: https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#prepareheaders
Allows you to inject headers on every request by setting common headers.
In authorization: at login, tokens are saved in authSlice, then injected into prepareheaders for use in subsequent api requests. 
As a convenience mechanism, the second argument allows you to use getState to access your redux store in the event 
you store information you'll need there such as an auth token. i.e. 


BUILDER
builder is an object that provides methods for defining various types of requests, such as: query: For sending GET requests.
mutation: For sending POST, PUT, PATCH, or DELETE requests (i.e., any operation that modifies data).
When you define your endpoints, the builder is the object you use to set up each of those operations.

Hooks are automatically generated based on the name of the endpoint in the service definition. 
An endpoint field with getPost: build.query() will generate a hook named useGetPostQuery, 
as well as a generically-named hook attached to the endpoint, like api.endpoints.getPost.useQuery.


When you dispatch and store the API response in Redux, you (or your reducer) are wrapping the array 
in an object with an items property.
  i.e.: useSelector ( state=>state.recip_list ) yields  { "items":[{recip1}, {recip2}...] }

HTTP method	URL	Action
GET	/recipients/api/	List your notes
POST	/recipients/api/	Create a note
GET	/recipients/api<id>/	Retrieve a note
PUT / PATCH	/recipients/api<id>/	Update your note
DELETE	/recipients/api<id>/	Delete your note
*/  /*Lazy v normal hooks
Normal query hooks (e.g. useRetrievecoQuery) fire automatically when the component mounts. 
Lazy query hooks (e.g. useLazyRetrievecoQuery) give you a trigger function you call manually:
Mutations (useLoginMutation, useCreaterepMutation, etc.) are always manually triggered — there's no "lazy" variant 
because mutations never auto-fire. The useMutation hook already returns a trigger function by design.
*/ 
}),
"[project]/app/store/features/rep/repSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearRep",
    ()=>clearRep,
    "default",
    ()=>__TURBOPACK__default__export__,
    "updateRep",
    ()=>updateRep
]);
// Purpose: to avoid losing form inputs on refresh. This slice will save form data to redux store when onBlur is triggered in a form field.
// This slice will handle the form data for a recipient_envelope component, allowing it to be saved and cleared as needed.  
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/constants.js [app-ssr] (ecmascript)");
;
;
//PayloadAction is a TypeScript type that describes the structure of Redux actions that carry data.
//can be used to replace type in PayloadAction
// interface RepFormData {
//   email?: string;
//   name?: string;
//   phone?: string;
// }
const initialState = {
    formData: {}
};
const repSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'rep',
    initialState,
    reducers: {
        updateRep: (state, action)=>{
            state.formData = {
                ...state.formData,
                ...action.payload
            };
        // It creates a new object by copying all existing properties from state.formData and then overwrites or adds properties from action.payload.
        // This means any fields in action.payload will update the corresponding fields in formData, while other fields remain unchanged.
        },
        clearRep: (state)=>{
            state.formData = {};
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PURGE"], (state)=>{
            // When PURGE action is dispatched, remove all form data
            state.formData = {};
        });
    }
});
const { updateRep, clearRep } = repSlice.actions;
const __TURBOPACK__default__export__ = repSlice.reducer;
 //*Record<string, any> is a TypeScript utility type that describes an object structure.
}),
"[project]/app/store/features/co/coSlice.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearCo",
    ()=>clearCo,
    "default",
    ()=>__TURBOPACK__default__export__,
    "updateCo",
    ()=>updateCo
]);
// Purpose: to avoid losing form inputs on refresh. This slice will save form data to redux store when onBlur is triggered in a form field.
// This slice will handle the form data for a recipient_envelope component, allowing it to be saved and cleared as needed.  
// Note: Sending form data to API happens in apiSlice, not here.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/constants.js [app-ssr] (ecmascript)");
;
;
const initialState = {
    coData: {}
};
const coSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'co',
    initialState,
    reducers: {
        // updateCo: (state, action: PayloadAction<Record<string, unknown>>) => {  //*The action's payload is an object with string keys and values of any type
        updateCo: (state, action)=>{
            state.coData = {
                ...state.coData,
                ...action.payload
            };
        // copies all existing properties from state.formData and then overwrites or adds properties from action.payload.
        // This means any fields in action.payload will update the corresponding fields, while other fields remain unchanged.
        },
        clearCo: (state)=>{
            state.coData = {};
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PURGE"], (state)=>{
            // When PURGE action is dispatched, remove all form data
            state.coData = {};
        });
    }
});
const { updateCo, clearCo } = coSlice.actions;
const __TURBOPACK__default__export__ = coSlice.reducer;
 //to update co in component: const dispatch = useDispatch() 
 //*Record<string, any> is a TypeScript utility type that describes an object structure.
}),
"[project]/app/store/store.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "persistor",
    ()=>persistor,
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$listenerMiddleware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/listenerMiddleware.ts [app-ssr] (ecmascript)");
//redux-persist
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/persistStore.js [app-ssr] (ecmascript) <export default as persistStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/persistReducer.js [app-ssr] (ecmascript) <export default as persistReducer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/constants.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/lib/storage/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$api$2f$apiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/features/api/apiSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$auth$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/features/auth/authSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$rep$2f$repSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/features/rep/repSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$co$2f$coSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/features/co/coSlice.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
//REDUX-PERSIST: in order to persist data through page reloads
const persistConfig = {
    key: 'root',
    version: 1,
    storage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
    blacklist: [
        __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$api$2f$apiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiSlice"].reducerPath
    ] //blacklist apis so they will not be persisted.
};
//Rather than persisting the entire Redux state, we can be selective using persistReducer:
//[https://expertbeacon.com/the-complete-guide-to-redux-persist-for-seamless-state-migration/]
//Not recommended to persist Auth, due to hydrator, see Providers.tsx
// const persistedAuthReducer = persistReducer(persistConfig, authReducer)
const persistedRepReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__["persistReducer"])({
    key: 'rep',
    version: 1,
    storage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
}, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$rep$2f$repSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
const persistedCoReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistReducer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistReducer$3e$__["persistReducer"])({
    key: 'co',
    version: 1,
    storage: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$lib$2f$storage$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
}, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$co$2f$coSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]);
//The store is created by passing in a reducer, and has a method called getState that returns the current state value:
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        [__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$api$2f$apiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiSlice"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$api$2f$apiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiSlice"].reducer,
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$auth$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"],
        rep: persistedRepReducer,
        co: persistedCoReducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FLUSH"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["REHYDRATE"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PAUSE"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PERSIST"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PURGE"],
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["REGISTER"]
                ]
            }
        }).prepend(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$listenerMiddleware$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listenerMiddleware"].middleware).concat(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$api$2f$apiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiSlice"].middleware) //adds api middleware
});
const persistor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$persistStore$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__persistStore$3e$__["persistStore"])(store);
;
}),
"[project]/app/providers.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/styles/ThemeProvider.js [app-ssr] (ecmascript) <export default as ThemeProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/CssBaseline/CssBaseline.js [app-ssr] (ecmascript)");
// import { myTheme } from './myTheme';
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/theme.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/store.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/redux-persist/es/integration/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$api$2f$apiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/features/api/apiSlice.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$auth$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/store/features/auth/authSlice.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
function AuthHydrator() {
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDispatch"])();
    const { data: user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$api$2f$apiSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetUserQuery"])();
    // AuthHydrator component calls useGetUserQuery() on mount, which hits the API to check if the user's session cookie is still valid. If it is, it dispatches setCredentials to repopulate the auth store.
    // Hydrator repopulates auth store upon refresh if cookis is still valid. 
    // rep and co have no equivalent hydration mechanism — nothing re-fetches them on reload.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$features$2f$auth$2f$authSlice$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setCredentials"])({
            user
        }));
    }, [
        user,
        dispatch
    ]);
    return null;
}
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["store"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$redux$2d$persist$2f$es$2f$integration$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PersistGate"], {
            loading: null,
            persistor: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$store$2f$store$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persistor"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$styles$2f$ThemeProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ThemeProvider$3e$__["ThemeProvider"], {
                theme: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$theme$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["theme"],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$CssBaseline$2f$CssBaseline$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/app/providers.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthHydrator, {}, void 0, false, {
                        fileName: "[project]/app/providers.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    children
                ]
            }, void 0, true, {
                fileName: "[project]/app/providers.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/providers.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/providers.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1032qu4._.js.map