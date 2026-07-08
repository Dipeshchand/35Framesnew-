
// import { createBrowserRouter } from "react-router-dom";
// import { lazy, Suspense } from "react";

// import App from "./App";
// import ProtectedRoute from "./components/ProtectedRoute";

// const Loader = () => (
//   <div className="h-screen flex items-center justify-center">
//     Loading...
//   </div>
// );

// // Lazy pages
// const IntroPage = lazy(() => import("./pages/IntroPage"));
// const Home = lazy(() => import("./pages/Home"));
// const About = lazy(() => import("./pages/About"));
// const Gallery = lazy(() => import("./pages/Gallery"));
// const Portfolio = lazy(() => import("./pages/Portfolio"));
// const AlbumPage = lazy(() => import("./pages/AlbumPage"));
// const Testimonials = lazy(() => import("./pages/Testimonials"));
// const Contact = lazy(() => import("./pages/Contact"));
// const Login = lazy(() => import("./pages/Login"));
// const Admin = lazy(() => import("./pages/Admin"));

// const Blog = lazy(() => import("./pages/Blog"));
// const BlogDetails = lazy(() => import("./pages/BlogDetails"));
// const AdminBlog = lazy(() => import("./pages/AdminBlog"));


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Suspense fallback={<Loader />}>
//         <IntroPage />
//       </Suspense>
//     ),
//   },

//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "home", element: <Suspense fallback={<Loader />}><Home /></Suspense> },
//       { path: "about", element: <Suspense fallback={<Loader />}><About /></Suspense> },
//       { path: "gallery", element: <Suspense fallback={<Loader />}><Gallery /></Suspense> },
//       { path: "portfolio", element: <Suspense fallback={<Loader />}><Portfolio /></Suspense> },
//       { path: "album/:name", element: <Suspense fallback={<Loader />}><AlbumPage /></Suspense> },
//       { path: "testimonials", element: <Suspense fallback={<Loader />}><Testimonials /></Suspense> },
//       { path: "contact", element: <Suspense fallback={<Loader />}><Contact /></Suspense> },
      
//     ],
//   },
//     {
//         path: "blogs",
//         element: (
//           <Suspense fallback={<Loader />}>
//             <Blog />
//           </Suspense>
//         ),
//       },
//     {
//     element: <ProtectedRoute />,
//     children: [
//       {
//         path: "/admin",
//         element: (
//           <Suspense fallback={<Loader />}>
//             <Admin />
//           </Suspense>
//         ),
//       },
//       {
//         path: "/admin/blog",
//         element: (
//           <Suspense fallback={<Loader />}>
//             <AdminBlog />
//           </Suspense>
//         ),
//       },
//     ],
//   },

//   {
//     path: "/login",
//     element: (
//       <Suspense fallback={<Loader />}>
//         <Login />
//       </Suspense>
//     ),
//   },

//   {
//     path: "/admin",
//     element: (
//       <ProtectedRoute>
//         <Suspense fallback={<Loader />}>
//           <Admin />
//         </Suspense>
//       </ProtectedRoute>
//     ),
//   },
// ]);

// export default router;


import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";

const Loader = () => (
  <div className="h-screen flex items-center justify-center">
    Loading...
  </div>
);

// Lazy Pages
const IntroPage = lazy(() => import("./pages/IntroPage"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const AlbumPage = lazy(() => import("./pages/AlbumPage"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));

const Blog = lazy(() => import("./pages/Blog"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const AdminBlog = lazy(() => import("./pages/AdminBlog"));

const router = createBrowserRouter([
  // Intro Page
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <IntroPage />
      </Suspense>
    ),
  },

  // Main Website
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: (
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loader />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "gallery",
        element: (
          <Suspense fallback={<Loader />}>
            <Gallery />
          </Suspense>
        ),
      },
      {
        path: "portfolio",
        element: (
          <Suspense fallback={<Loader />}>
            <Portfolio />
          </Suspense>
        ),
      },
      {
        path: "album/:name",
        element: (
          <Suspense fallback={<Loader />}>
            <AlbumPage />
          </Suspense>
        ),
      },
      {
        path: "testimonials",
        element: (
          <Suspense fallback={<Loader />}>
            <Testimonials />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loader />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<Loader />}>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: "blogs/:slug",
        element: (
          <Suspense fallback={<Loader />}>
            <BlogDetails />
          </Suspense>
        ),
      },
    ],
  },

  // Protected Admin Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: (
          <Suspense fallback={<Loader />}>
            <Admin />
          </Suspense>
        ),
      },
      {
        path: "/admin/blog",
        element: (
          <Suspense fallback={<Loader />}>
            <AdminBlog />
          </Suspense>
        ),
      },
//       {
//   path: "/admin/blog",
//   element: <h1 style={{ color: "red", fontSize: "50px" }}>HELLO ADMIN BLOG</h1>,
// },
    ],
  },

  // Login
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },

  // 404
  {
    path: "*",
    element: <h1 className="text-center text-3xl mt-20">404 Page Not Found</h1>,
  },
]);

export default router;