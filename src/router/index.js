import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { useGlobalConfigStore } from "@/stores/globalConfig";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {

    if (to.meta.noScroll) return false;

    if (to.path === from.path && to.name === from.name) {
      return false
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        const main = document.querySelector("main");
        if (main) {
          main.scrollTo({ top: 0, behavior: "smooth" });
          // main.scrollTop = 0
        }
        resolve({ left: 0, top: 0 });
      }, 0);
    });
  },
  routes: [
    {
      path: "/:lang(en|is)",
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
          meta: {
            title: {
              is: "Málbankinn",
              en: "The Icelandic Language Bank",
            },
          },
        },
        {
          path: "um",
          name: "about",
          component: () => import("../views/AboutView.vue"),
          meta: {
            title: {
              is: "Um Málbankann",
              en: "About The Icelandic Language Bank",
            },
          },
        },
        {
          path: "leit",
          name: "search",
          component: () => import("../views/SearchView.vue"),
          meta: {
            title: {
              is: "Leit",
              en: "Search",
            },
            noScroll: true,
          },
        },
        {
          path: "malheildir",
          name: "malheildir",
          component: () => import("../views/SingleCategoryView.vue"),
          meta: {
            title: {
              is: "Málheildir",
              en: "Corpora",
            },
          },
        },
        {
          path: "maltaeknilausnir/:category?",
          name: "maltaeknilausnir",
          component: () => import("../views/SingleCategoryView.vue"),
          meta: {
            title: {
              is: "Máltæknilausnir",
              en: "Language Technology Solutions",
            },
          },
        },
        {
          path: "verkfaeri",
          name: "verkfaeri",
          component: () => import("../views/SingleCategoryView.vue"),
          meta: {
            title: {
              is: "Grunnverkfæri",
              en: "Foundational Tools",
            },
          },
        },
        {
          path: "gogn/:name",
          name: "gogn",
          component: () => import("../views/SingleItemView.vue"),
          meta: {
            title: {
              is: "Gögn",
              en: "Data",
            },
          },
        },
        {
          path: "frettir",
          name: "news",
          component: () => import("../views/NewsOverviewView.vue"),
          meta: {
            title: {
              is: "Fréttir",
              en: "News",
            },
          },
        },
        {
          path: "ordalistar",
          name: "ordalistar",
          component: () => import("../views/SingleCategoryView.vue"),
          meta: {
            title: {
              is: "Orðalistar",
              en: "Wordlists",
            },
          },
        },
        {
          path: "hugvisindi",
          name: "hugvisindi",
          component: () => import("../views/HugvisindiView.vue"),
          meta: {
            title: {
              is: "Hugvísindi",
              en: "Humanities",
            },
          },
        },
        {
          path: "nams_og_kennsluefni",
          name: "kennsluefni",
          component: () => import("../views/SingleCategoryView.vue"),
          meta: {
            title: {
              is: "Kennsluefni",
              en: "Teaching Material",
            },
          },
        },
        {
          path: "afhending",
          name: "afhending",
          component: () => import("../views/SubmitView.vue"),
          meta: {
            title: {
              is: "Innlögn",
              en: "Submissions",
            },
          },
        },
        {
          path: "snid",
          name: "snid",
          component: () => import("../views/FormatsInfoView.vue"),
          meta: {
            title: {
              is: "Snið",
              en: "Formats",
            },
          },
        },
        {
          path: "mali/:subcat",
          name: "mali",
          component: () => import("../views/SubCategoryPageView.vue"),
          meta: {
            title: {
              is: "Málföng",
              en: "Resources",
            },
          },
        },
        {
          path: "malfong/:maincat",
          name: "malfong",
          component: () => import("../views/MainCategoryView.vue"),
          meta: {
            title: {
              is: "Málföng",
              en: "Resources",
            },
          },
        },
        {
          path: "maltaekniaetlun",
          name: "maltaekniaetlun",
          component: () => import("../views/MaltaekniaetlunView.vue"),
          meta: {
            title: {
              is: "Máltækniáætlun",
              en: "Language Technology Programme",
            },
          },
        },
        {
          path: "fraedimadur-manadarins/:time?",
          name: "fraedimadur-manadarins",
          component: () => import("../views/ScholarOfTheMonthView.vue"),
          meta: {
            title: {
              is: "Kastljósið",
              en: "Spotlight",
            },
          },
        },
      ],
    },
    {
      path: "/",
      redirect: () => {
        const stored = localStorage.getItem("language") || "is";
        return `/${stored}`;
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/is",
    },
  ],
});

const siteName = {
  is: "Málbankinn",
  en: "The Language Bank",
};

router.beforeEach((to, from, next) => {
  // TODO: Eyða þessu út þegar enskar þýðingar eru komnar.
  // if (/^\/en(\/|$)/.test(to.path)) {
  //   const targetPath = to.path.replace(/^\/en(\/|$)/, "/is$1");
  //   return next({
  //     path: targetPath,
  //     query: to.query,
  //     hash: to.hash,
  //     replace: true,
  //   });
  // }
  const globalConfig = useGlobalConfigStore();
  globalConfig.initLanguageFromRoute(to);

  const lang = globalConfig.activeLanguage;

  let title = to.meta?.title ?? siteName[lang];

  // pick correct language if meta.title is an object
  if (typeof title === "object") {
    title = title[lang] || title["is"]; // fallback to Icelandic
  }

  if (!["home", "about"].includes(to.name)) {
    document.title = `${title} - ${siteName[lang]}`;
  } else {
    document.title = title;
  }

  next();
});

export default router;
