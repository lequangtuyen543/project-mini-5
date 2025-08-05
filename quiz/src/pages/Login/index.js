import { useNavigate } from "react-router-dom";
import { login } from "../../services/usersService";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const response = await login(email, password);
    if (response.length > 0) {
      setCookie("id", response[0].id, 1);
      setCookie("fullName", response[0].fullName, 1);
      setCookie("email", response[0].email, 1);
      setCookie("token", response[0].token, 1);
      dispatch(checkLogin(true));
      navigate("/");
    } else {
      alert("sai tai khoan hoac mk")
    }
  }

  return (
    <>
      <form method="POST" action="/" onSubmit={handleSubmit} autoComplete="on">
        <h2>Login</h2>
        <div>
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="enter email"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            placeholder="enter password"
            required
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>

    </>
  );
}

export default Login;