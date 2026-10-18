self.__BUILD_MANIFEST = {
  "__rewrites": {
    "afterFiles": [
      {
        "source": "/accounts/:path*"
      },
      {
        "source": "/personalize/api/:path*"
      },
      {
        "source": "/recipients/api/:path*"
      },
      {
        "source": "/dj-rest-auth/:path*"
      }
    ],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/_app",
    "/_error"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()