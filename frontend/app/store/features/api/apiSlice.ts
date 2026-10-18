//RTK Query: central access to all REST API endpoints
import type { RootState } from '../../store';
import type { Address } from '../addressbook/addressbookSlice';
import { createApi, fetchBaseQuery,  } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex';   ////from chat: The Mutex ensures that only one refresh token request runs at a time
import { setCredentials, clearCredentials } from '../auth/authSlice';

//typescript
type RepCoItem = { id: number; rep: number; company: number };

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://localhost:8000/',
  baseUrl: '/',
  credentials:'include',   //needed if in settings using JWT_AUTH_COOKIE, else comment-out if using jwt in header. https://stackoverflow.com/questions/71266954/rtk-query-set-token-inside-cookies-but-it-is-not-having-any-effect
    //see note on prepareHeaders
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth.access; //Get token from auth slice
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);  //this sets jwt in authorization header, thus no need for cookie
  //   }
  //   return headers;
  // },
});

//Handling Token Expiration with Reauthorization
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {  //is token expired? same as: if (result.error && result.error.status === 401) 
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      //token expired and mutex not locked send refresh token request to endpoint
      try {
        const refreshResult = await baseQuery(
          {
            url: '/dj-rest-auth/token/refresh/',
            method: 'POST',
            body: {
              refresh: api.getState().auth.refresh,
            },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {  //if successful, store new access token
          api.dispatch(setCredentials(refreshResult.data));
          //retry initial query
          result = await baseQuery(args, api, extraOptions);
        } else {  //if refresh fails, log user out          
          api.dispatch(clearCredentials());
        }
      } finally {
        // release must be called once the mutex can be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock(); 
      result = await baseQuery(args, api, extraOptions);  //retry original request
    }
  }
  //retry original request with new token
  return result;
};

//BASE API AND ENDPOINTS___________________________________________________
export const apiSlice = createApi({
  reducerPath: 'api',  //specifies where in state cache is to be stored -> state.api
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true, // or a number of seconds, e.g. 30: forces refetching of RTK Query cache upon refresh, This makes the UI render instantly from persisted cache, then silently revalidate in the background and update when the response arrives
  tagTypes: ['co', 'Allrecipients'], //tag type breaks cache invalidation — after a createrecipient, updaterecipient, or deleterecipient mutation,
  //see note on builder
  endpoints: (builder) => ({   

    //__________________________________________________USER REGISTRATION ENDPOINT
    registration: builder.mutation ({
      query: (credentials) => ({
        url: '/api/auth/registration/',
        method: 'POST',
        body: credentials,
      })
    }),

    //_____________________________LOGIN ENDPOINT
    login: builder.mutation({
      query: (credentials ) => ({
        url: '/api/auth/login/', 
        method: 'POST',
        body: credentials,
        // responseHandler: "text" //[https://redux-starter-kit.js.org/rtk-query/api/fetchBaseQuery#parsing-a-response] By default, fetchBaseQuery assumes that every Response you get will be parsed as json. In the event that you don't want that to happen, you can customize the behavior by specifying an alternative response handler like text, or take complete control and use a custom function that accepts the raw Response object — allowing you to use any Response method.
        }),
      }),
  
    //_____________________________LOGOUT ENDPOINT
    //explicitly declares both the result and argument are void, so logout() with no arguments becomes valid.
    logout: builder.mutation<void, void> ({
      query: () => ({
        url: '/api/auth/logout/',
        method: 'POST'
      })
    }),

    //_____________________________GET CURRENT USER ENDPOINT
    //The query just hits the endpoint, and if the cookie is valid Django says "here's your user", if not it returns 401
    //on page refresh: cookie → backend validates → user object → Redux state (via dispatch)
    getUser: builder.query<{ pk: number; email?: string; [key: string]: unknown }, void>({
      query: () => '/api/auth/user/',
    }),

    //_____________________________PERSONALIZE ENDPOINT

    //LIST: list of greeting cards objejcts for given user
    listgreetingcards: builder.query ({
      query: () => '/personalize/api/greetingcard',
    }),

    //CREATE
    creategreetingcard: builder.mutation ({
      query: (data) => ({
        url: '/personalize/api/greetingcard',
        method: 'POST',
        body: data,
      })
    }),

    //RETRIEVE: returns card object with nested style and field instances 
    retrievegreetingcard: builder.query ({
      query: (id) => `/personalize/api/greetingcard/${id}`, //use template literal `` to insert id in url
    }),

    //UPDATE
    updategreetingcard: builder.mutation ({
      query: ({id, ...data}) => ({  //inserts id into data object ie, {id: 123, name: "New Name"}
        url: `/personalize/api/greetingcard/${id}/`,  
        method: 'PUT',
        body: data,
      }),
    }),

    //DELETE
    deleteregreetingcard: builder.mutation ({
      query: (id) => ({  //inserts id into data object ie, {id: 123, name: "New Name"}
        url: `/personalize/api/greetingcard/${id}/`,  
        method: 'DELETE',
      }),
    }),

    //_____________________________SENDER ENDPOINT: 
    //CREATE
    createsender: builder.mutation ({
      query: (data) => ({
        url: '/accounts/sender/',
        method: 'POST',
        body: data,
      })
    }),
    
    //RETRIEVE
    retrievesender: builder.query ({
      query: (id) => `/accounts/sender/${id}`, //using template literal `` to insert id in url
    }),

    //UPDATE
    updatesender: builder.mutation ({
      query: ({id, ...data}) => ({  //to insert id into data object ie., {id: 123, name: "New Name"}
        url: `/accounts/sender/${id}/`,  
        method: 'PUT',
        body: data,
      }),
    }),

    //_____________________________RECIPIENT: see urls* 
    
    //LIST: list of all addressbook entries for auth_user, API view automatically filters by customuser
    listrecipients: builder.query<Address[], void> ({
      query: () => '/recipients/api/recipients/',
      providesTags: ['Allrecipients']
    }),
    //TypeScript: the endpoint takes no argument (void), so useListrecipientsQuery() with zero arguments becomes valid.

    //CREATE: a new recipient
    // Using fetchBaseQuery so body field will automatically be JSON-serialized.
    createrecipient: builder.mutation ({
      query: (data) => ({
        url: '/recipients/api/recipients/',  
        method: 'POST',
        body: data,
      }),
        invalidatesTags: ['Allrecipients',]  //When call createRecip(), RTK Query will invalidate Allrecipients tag. This triggers useListrecipientsQuery to refetch the recipients list. store updates and re-render follows.
    }),

    //RETRIEVE: 
    // Using fetchBaseQuery so body field will automatically be JSON-serialized.
    retrieverecipient: builder.query ({
      query: (id) => `/recipients/api/recipients/${id}`,
    }),
    
    //UPDATE
    updaterecipient: builder.mutation ({
      query: ({id, ...data}) => ({  //id is used to construct the URL and the rest of the fields (name, etc.) are sent in the request body., {id: 123, name: "New Name"}
        url: `/recipients/api/recipients/${id}/`,  //You called this URL via PATCH, but the URL doesn't end in a slash and you have APPEND_SLASH set. Django can't redirect to the slash URL while maintaining PATCH data. Change your form to point to localhost:8000/recipients/api/101/ (note the trailing slash)
        method: 'PATCH',  //PATCH updates only the fields provided in the request.
        body: data,
      }),
      invalidatesTags: ['Allrecipients',]  //When call updateRecip(), RTK Query will invalidate Allrecipients tag. This triggers useListrecipientsQuery to refetch the recipients list. store updates and re-render follows.
    }),

    //DELETE
    deleterecipient: builder.mutation ({
      query: (id) => ({  //automatically inserts id into data object ie, {id: 123, name: "New Name"}
        url: `/recipients/api/recipients/${id}/`,  
        method: 'DELETE',
      }),
      invalidatesTags: ['Allrecipients',] 
    }),

    //_____________________________GREETINGCARD_RECIPIENT JOIN TABLE ENDPOINTs: 

    //RETRIEVE: retrieve recipients, given greetingcard_id
    // retrievegreetingcardrecipients: builder.query ({
    //   query: (id) => `/recipients/api/greetingcard_recipient/?greetingcard_id=${id}`,
    // }),

    //RETRIEVE
    retrievegreetingcardrecipients: builder.query({
      query: ({ greetingcard_id, recipient_id } = {}) => {
        const params = new URLSearchParams();
        if (greetingcard_id) params.append('greetingcard_id', greetingcard_id);
        if (recipient_id) params.append('recipient_id', recipient_id);
        const qs = params.toString() ? `?${params.toString()}` : '';
        return `/recipients/api/greetingcard_recipient/${qs}`;
      },
    }),

    //CREATE: Send a POST request to this endpoint with data as { "greetingcard": 1, "recipient": 2 }
    creategreetingcardrecipient: builder.mutation ({
      query: (data) => ({
        url: '/recipients/api/greetingcard_recipient/',  
        method: 'POST',
        body: data,
      }),
        // invalidatesTags: ['Allrecipients',]  //When call createRecip(), RTK Query will invalidate Allrecipients tag. This triggers useListrecipientsQuery to refetch the recipients list. store updates and re-render follows.
    }),


    //DELETE
    // deletegreetingcardrecipient: builder.mutation ({
    //   query: (data) => ({  //automatically inserts id into data object ie, {greetingcard: 5, recipient: 35}
    //     url: `/recipients/api/greetingcard_recipient/`,  
    //     method: 'DELETE',
    //     body: data,
    //   }),
    //   // invalidatesTags: ['Allrecipients',] 
    // }),

    deletegreetingcardrecipient: builder.mutation ({
      query: (id) => ({  //id of the joint entity
        url: `/recipients/api/greetingcard_recipient/${id}/`,  
        method: 'DELETE',
        // body: data,
      }),
      // invalidatesTags: ['Allrecipients',] 
    }),

    //RETRIEVE BULK VIEW: ccepts a list of greetingcard IDs and returns recipients grouped per greetingcard
    //expects { "greetingcard_ids": [1,2,3] }, returns [ { "greetingcard_id": 34, "recipients": [ { "id": 32, "name": "Spiderman5", "greetingcards": [34, 36] },...]
    retrievecardsrecipsbulk: builder.query ({
      query: (data) => ({ 
        url: `/recipients/api/greetingcards/recipients_bulk`,
        method: 'POST',
        body: data,
        }),
      }),

    //_____________________________RECIPIENT LINK ENDPOINTs: 
    // CREATE LINK FOR RECIPIENT TO FILL OUT
    // expects request JSON {greetingcard_id: 1}, returns: ({ 'token': str(token), 'link': full_url }, status=status.HTTP_201_CREATED)
    recipcreatelink: builder.mutation ({
      query: (data) => ({
        url: '/recipients/createlink/',
        method: 'POST',
        body: data,
      })
    }),

    // POST RECIPIENT DATA VIA LINK. expects: recip address data, returns: status
    // <uuid:token> tells Django to extract a uuid parameter from the URL. It passes that parameter into the view as kwargs['token']
    reciplinksubmit: builder.mutation ({
      query: (data) => ({
        url: '/recipients/forms/submit/<uuid:token>/',
        method: 'POST',
        body: data,
      })
    }),


    //DELETE_______________________________________________________REP ENDPOINT: 
    //CREATE
    createrep: builder.mutation ({
      query: (data) => ({
        url: '/accounts/rep/',
        method: 'POST',
        body: data,
      })
    }),
    
    //RETRIEVE
    retrieverep: builder.query ({
      query: (id) => `/accounts/rep/${id}`, //using template literal `` to insert id in url
    }),

    //UPDATE
    updaterep: builder.mutation ({
      query: ({id, ...data}) => ({  //to insert id into data object ie., {id: 123, name: "New Name"}
        url: `/accounts/rep/${id}/`,  
        method: 'PUT',
        body: data,
      }),
    }),

    //DELETE
    deleterep: builder.mutation ({
      query: (id) => ({  
        url: `/accounts/rep/${id}/`,  
        method: 'DELETE',
        }),
    }),

    //DELETE_______________________________________________________COMPANY ENDPOINT: 

    // LIST — returns all RepCompanyAssignments for the authenticated user,  filters by rep__customuser=request.user automatically.
    //TypeScript type for builder.query without explicit generic types defaults to requiring an arg. Fix it by adding <unknown, void> generics to tell TypeScript the <result_type, arg_type> :
    // List companies, each with current_campaign_level embedded
    listco: builder.query<RepCoItem[], void>({
      query: () => '/accounts/co/',
    }),

    //CREATE
    createco: builder.mutation ({
      query: (data) => ({
        url: '/accounts/co/',
        method: 'POST',
        body: data,
      })
    }),
    
    //RETRIEVE
    retrieveco: builder.query ({
      query: (id) => `/accounts/co/${id}`, //using template literal `` to insert id in url
    }),

    //UPDATE
    updateco: builder.mutation ({
      query: ({id, ...data}) => ({  //to insert id into data object ie., {id: 123, name: "New Name"}
        url: `/accounts/co/${id}/`,  
        method: 'PUT',
        body: data,
      }),
    }),

    //DELETE
    deleteco: builder.mutation ({
      query: (id) => ({  
        url: `/accounts/co/${id}/`,  
        method: 'DELETE',
        }),
    }),

    //Expands endpoint to allow for campaign_levels, url: /accounts/co/{id}/campaign-levels/
    //gets campaign levels for specified company
    //GET campaign level
    getcampaignlevels: builder.query({
        query: (companyId) => `accounts/co/${companyId}/campaign-levels/`,
    }),

    //POST campaign level
    //creates new campaign level for specified company
    createcampaignlevel: builder.mutation({
        query: ({ companyId, level, notes = '' }) => ({
            url: `accounts/co/${companyId}/campaign-levels/`,
            method: 'POST',
            body: { level, notes },
        }),
        invalidatesTags: ['co'],  // refetches company list to get updated current_campaign_level
    }),


//DELETE_______________________________________________________REP-COMPANY ENDPOINT: 

    // LIST — returns all RepCompanyAssignments for the authenticated user,  filters by rep__customuser=request.user automatically.
    //TypeScript type for builder.query without explicit generic types defaults to requiring an arg. Fix it by adding <unknown, void> generics to tell TypeScript the <result_type, arg_type> :
    listrepco: builder.query<RepCoItem[], void>({
      query: () => '/accounts/repco/',
    }),

    //CREATE
    createrepco: builder.mutation ({
      query: (data) => ({
        url: '/accounts/repco/',
        method: 'POST',
        body: data,
      })
    }),

    //RETRIEVE
    retrieverepco: builder.query ({
      query: (id) => `/accounts/repco/${id}/`, //using template literal `` to insert id in url
    }),


  }) //CLOSE BASEQUERY AND ENDPOINTS
});

//EXPORT HOOKS 
export const { 

  // User and Auth
  useLoginMutation, useLogoutMutation, useGetUserQuery,useRegistrationMutation,
  
  //sender
  useCreatesenderMutation, useRetrievesenderQuery, useUpdatesenderMutation,
  
  //recipient
  useLazyListrecipientsQuery, useListrecipientsQuery, useCreaterecipientMutation, useRetrieverecipientQuery, useUpdaterecipientMutation, useDeleterecipientMutation,
  
  // greetingcard_recipient
  useCreategreetingcardrecipientMutation, useRetrievegreetingcardrecipientsQuery, useLazyRetrievegreetingcardrecipientsQuery, useDeletegreetingcardrecipientMutation, useRetrievecardsrecipsbulkQuery, useLazyRetrievecardsrecipsbulkQuery,
  
  //greetingcard
  useListgreetingcardsQuery, useCreategreetingcardMutation, useRetrievegreetingcardQuery, useUpdategreetingcardMutation, useDeletegreetingcardMutation, useLazyRetrievegreetingcardQuery,

  //reciplink
  useRecipcreatelinkMutation, useReciplinksubmitMutation

} = apiSlice; //automatically named action hooks, useEndpointnameMutation

  // useGetsenderaddressQuery, useSenderaddressMutation, 
  // useGetrecipientsQuery, usePostrecipientMutation,


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

/*Lazy v normal hooks
Normal query hooks (e.g. useRetrievecoQuery) fire automatically when the component mounts. 
Lazy query hooks (e.g. useLazyRetrievecoQuery) give you a trigger function you call manually:
Mutations (useLoginMutation, useCreaterepMutation, etc.) are always manually triggered — there's no "lazy" variant 
because mutations never auto-fire. The useMutation hook already returns a trigger function by design.
*/






//DELETE
//EXPORT HOOKS 
// export const { 
//   // USER 
//   useLoginMutation, useLogoutMutation, useRegistrationMutation, useGetUserQuery,
//   //REP
//   useCreaterepMutation, useRetrieverepQuery, useUpdaterepMutation, useDeleterepMutation, useLazyRetrieverepQuery,
//   //COMPANY
//   useCreatecoMutation, useRetrievecoQuery, useUpdatecoMutation, useDeletecoMutation, useLazyRetrievecoQuery,
//   //Rep Co Assignment
//   useListrepcoQuery, useLazyListrepcoQuery, useCreaterepcoMutation, useRetrieverepcoQuery, useLazyRetrieverepcoQuery,
//   //Campaign Level
//   useGetcampaignlevelsQuery, useLazyGetcampaignlevelsQuery, useCreatecampaignlevelMutation,

//   } = apiSlice; //automatically named action hooks, useEndpointnameMutation

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
*/


