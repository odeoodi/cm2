import useSignup from "../hooks/useSignup";
import "../styles/global.css";
const Signup = ({ setIsAuthenticated }) => {
  const { form, setForm, submitted, message, handleSubmit } =
    useSignup(setIsAuthenticated);

  return (
    <div className="signup_home-bg">
      <div className="signup_main-box">
        <h2 className="signup_heading">Create an Account!</h2>

        {!submitted ? (
          <form className="signup_form" onSubmit={handleSubmit}>
            <div className="signup_input-field">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="signup_input-field">
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="signup_input-field signup_password-container">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="signup_input-field">
              <input
                type="password"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
              />
            </div>
            <div className="signup_input-field">
              <input
                type="text"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
            </div>

            <div className="signup_input-field">
              <input
                type="text"
                placeholder="Gender"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                required
              />
            </div>
            <div className="signup_input-field">
              <input
                type="date"
                placeholder="Date of birth"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                required
              />
            </div>
            <div className="signup_radio-field">
              <label>
                Membership status: <br />
                <input
                  type="radio"
                  name="membership"
                  value="active"
                  checked={form.membership === "active"}
                  onChange={(e) =>
                    setForm({ ...form, membership: e.target.value })
                  }
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="membership"
                  value="inactive"
                  checked={form.membership === "inactive"}
                  onChange={(e) =>
                    setForm({ ...form, membership: e.target.value })
                  }
                />
                Inactive
              </label>
            </div>

            <button className="signup_create-button" type="submit">
              Create Account
            </button>
            {message?.type === "error" && (
              <p className={`signup_message ${message.type}`}>{message.text}</p>
            )}
          </form>
        ) : (
          <p className={`signup_message ${message.type}`}>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
