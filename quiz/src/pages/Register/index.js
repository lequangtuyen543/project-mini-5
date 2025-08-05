import { useNavigate } from "react-router-dom";
import { checkExits, login, register } from "../../services/usersService";
import { useDispatch } from "react-redux";
import generateToken from "../../helpers/generateToken";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const checkExitEmail = await checkExits("email", email);

    if (checkExitEmail.length > 0) {
      alert("email da ton tai")
    } else {
      const options = {
        fullName: fullName,
        email: email,
        password: password,
        token: generateToken(),
      };

      const response = await register(options);

      if (response) {
        navigate("/login");
        alert("dang ky thanh cong");
      } else {
        alert("dang ky that bai");
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <input
            type="fullName"
            name="fullName"
            placeholder="enter full name"
          ></input>
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="enter email"
          ></input>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="enter password"
          ></input>
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </>
  );
}

export default Register;