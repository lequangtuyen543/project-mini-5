import PrivateRoutes from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import Answers from "../pages/Answers";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { Logout } from "../pages/Logout";
import Quiz from "../pages/Quiz";
import Register from "../pages/Register";
import Result from "../pages/Result";
import Topic from "../pages/Topic";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/answers",
            element: <Answers />
          },
          {
            path: "/quiz/:id",
            element: <Quiz />
          },
          {
            path: "/result/:id",
            element: <Result />
          },
          {
            path: "/topic",
            element: <Topic />
          },
        ]
      }
    ],
  },
];

/**
<Routes>
        <Route path='/' element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} >
            <Route index element={<BlogAll />} />
            <Route path="news" element={<BlogNews />} />
            <Route path="related" element={<BlogRelated />} />
            <Route path=":id" element={<BlogDetail />} />
          </Route>
          <Route path="login" element={<Login />} />

          <Route path="*" element={<Error404 />} />
          <Route element={<PrivateRoutes />}>
            <Route path="info-user" element={<InfoUser />} />
          </Route>
        </Route>
      </Routes >
 */