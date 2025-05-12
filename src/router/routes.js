const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/homePage.vue") },
      {
        path: "/youtube",
        component: () => import("pages/youtubePage.vue"),
      },
      {
        path: "/instagram",
        component: () => import("pages/instagramPage.vue"),
      },
      {
        path: "/tiktok",
        component: () => import("pages/tiktokPage.vue"),
      },
      {
        path: "/theme",
        component: () => import("src/pages/themePage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
