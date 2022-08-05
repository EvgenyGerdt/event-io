import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Auth",
      component: () => import("@/views/AuthView.vue"),
      meta: {
        requiredAuth: false,
      },
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/RegisterView.vue"),
      meta: {
        requiredAuth: false,
      },
    },
    {
      path: "",
      name: "Layout",
      component: () => import("@/layouts/HeaderMenu.vue"),
      children: [
        {
          path: "/profile",
          name: "Profile",
          component: () => import("@/views/Profile/ProfileView.vue"),
        },
        {
          path: "/friends",
          name: "Friends",
          component: () => import("@/views/Profile/FriendsView.vue"),
        },
        {
          path: "/messages",
          name: "Messages",
          component: () => import("@/views/Profile/MessagesView.vue"),
          children: [
            {
              path: "/messages/:id",
              name: "Chat",
              component: () => import("@/views/Chat/Chat.vue"),
            },
          ],
        },
        {
          path: "/events",
          name: "Events",
          component: () => import("@/views/Profile/EventsView.vue"),
        },
        {
          path: "/settings",
          name: "Settings",
          component: () => import("@/views/Profile/SettingsView.vue"),
        },
      ],
      meta: {
        requiredAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (!isAuthenticated && to.meta.requiredAuth) {
    next({ name: 'Auth' });
  }

  if(to.path === '/' && isAuthenticated) {
    next({ name: 'Profile' });
  }

  next();
});

export default router;
