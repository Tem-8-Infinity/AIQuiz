import { auth, db } from "../config/firebase-config.js";
import { useFormik } from "formik";
import { basicSchema } from "../schemas/index.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "../services/user.services.js";
import { useStore } from "zustand";
import useUserStore from "../context/store.js";

const SignUp = () => {
  const { user, setUser } = useStore(useUserStore);
  console.log(user);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        role: "",
      },
      validationSchema: basicSchema,
      onSubmit: async (values, { setTouched }) => {
        setTouched({ ...touched, role: true });
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          const user = userCredential.user;
          console.log(user);
          await createUser(
            values.username,
            values.email,
            values.phoneNumber,
            user.uid,
            values.role
          );
          // Update the user in Zustand store
          useUserStore.setState({ user: values.username });
        } catch (error) {
          console.error("Registration error:", error.message);
        }
      },
    });
  console.log(user, "asd");
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [phoneNumber, setNumber] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
  //     const db = getDatabase();
  //     console.log(user);
  //     await createUser(username, email, phoneNumber, user.uid)
  //   } catch (error) {
  //     console.error("Registration error:", error.message);
  //   }
  // };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">Provide your details to create a new account.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Type Your Username"
                className="input input-bordered"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                id="username"
                required
              />
              {touched.username && errors.username && (
                <p className="text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Type Your Email"
                className="input input-bordered"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                id="email"
                required
              />
              {touched.email && errors.email && (
                <p className="text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Type Your Phone Number"
                className="input input-bordered"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                id="phoneNumber"
                required
              />
              {touched.phoneNumber && errors.phoneNumber && (
                <p className="text-red-500">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Type Your Password"
                className="input input-bordered"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                id="password"
                required
              />
              {touched.password && errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                className="input input-bordered"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                id="confirmPassword"
                required
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <div className="flex">
                <button
                  type="button"
                  className={`btn ${
                    values.role === "participant" ? "btn-active" : ""
                  }`}
                  onClick={() =>
                    handleChange({
                      target: { name: "role", value: "participant" },
                    })
                  }
                >
                  Participant
                </button>
                <button
                  type="button"
                  className={`btn ${
                    values.role === "creator" ? "btn-active" : ""
                  }`}
                  onClick={() =>
                    handleChange({ target: { name: "role", value: "creator" } })
                  }
                >
                  Creator
                </button>
              </div>
              {touched.role && errors.role && (
                <p className="text-red-500">{errors.role}</p>
              )}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
