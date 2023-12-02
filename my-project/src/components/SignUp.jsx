import { useFormik } from "formik";
import { basicSchema } from "../schemas/index";
import { createUser } from "../services/user.services";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.services";

const SignUp = () => {
  // const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: basicSchema,
    onSubmit: async (values) => {
      try {
        const credentials = await registerUser(values.email, values.password);

        await createUser(
          values.firstName,
          values.lastName,
          values.userName,
          values.email,
          values.phoneNumber,
          credentials.user.uid,
          values.role
        );
        navigate("/");
      } catch (error) {
        console.error("Registration error:", error.message);
      }
    },
  });

  return (
    <div className="hero min-h-screen bg-gray-400">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">Provide your details to create a new account.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={formik.handleSubmit}>
            {/* First Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Type Your First Name"
                className="input input-bordered"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500">{formik.errors.firstName}</p>
              )}
            </div>

            {/* Last Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Type Your Last Name"
                className="input input-bordered"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500">{formik.errors.lastName}</p>
              )}
            </div>

            {/* Username Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="userName"
                placeholder="Type Your Username"
                className="input input-bordered"
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-red-500">{formik.errors.userName}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Type Your Email"
                className="input input-bordered"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Type Your Phone Number"
                className="input input-bordered"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-500">{formik.errors.phoneNumber}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Type Your Password"
                className="input input-bordered"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Your Password"
                className="input input-bordered"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Role Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <div className="flex gap-x-12">
              <div>
                <button
                  type="button"
                  className={`btn ${
                    formik.values.role === "participant" ? "btn-active" : ""
                  }`}
                  onClick={() => formik.setFieldValue("role", "participant")}
                >
                  Participant
                </button>
                <button
                  type="button"
                  className={`btn ${
                    formik.values.role === "creator" ? "btn-active" : ""
                  }`}
                  onClick={() => formik.setFieldValue("role", "creator")}
                >
                  Creator
                </button>
                </div>
                <a className="btn btn-link " href="./LogIn">Log In</a>
              </div>
              {formik.touched.role && formik.errors.role && (
                <p className="text-red-500">{formik.errors.role}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-blue-400">
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
