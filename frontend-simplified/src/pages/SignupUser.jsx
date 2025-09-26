import useSignupUser from "../hooks/useSignupUser" 

const SignupComponent = ({ setIsAuthenticated }) => {

  const {name, setName,
    email, setEmail,
    password, setPassword,
    password2, setPassword2,
    phoneNumber, setPhoneNumber,
    gender, setGender,
    dateOfBirth, setDateOfBirth,
    membershipStatus, setMembershipStatus,
    handleSignupUser} = 
      useSignupUser(setIsAuthenticated)

    const handleSignup = (e) => {
        e.preventdefault()
        console.log("In handlesignup")

        // handleSignupUser()
    }
  

  return (
    <div className="signup_home-bg">
            <div className="signup_main-box">
                <h2 className="signup_heading">Create an Account</h2>

                    <form className="signup_form">
                        <div className="signup_input-field">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="signup_input-field">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value )}
                                required
                            />
                        </div>

                        <div className="signup_input-field signup_password-container">
                            <input
                                type="text"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value )}
                                required
                            />
                        </div>

                        <div className="signup_input-field">
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value )}
                                required
                            />
                        </div>
                        <div className="signup_input-field">
                            <input
                                type="text"
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value )}
                                required
                            />
                        </div>

                        <div className="signup_input-field">
                            <input
                                type="text"
                                placeholder="Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value )}
                                required
                            />
                        </div>
                        <div className="signup_input-field">
                            <input
                                type="date"
                                placeholder="Date of birth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Membership status
              </label>
              <select
        
                name="membershipStatus"
                className="border rounded w-full py-2 px-3"
                required
                value={membershipStatus}
                onChange={(e) => setMembershipStatus(e.target.value)}
              >
                <option value="">Select option</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
                        {/* <div className="signup_radio-field">
                          
                            <label>
                                Membership status: <br/>
                                <input
                                    type="radio"
                                    name="membership"
                                    value="active"
                                    checked={membershipStatus === "active"}
                                    onChange={(e) => setMembershipStatus(e.target.value )}
                                />
                                Active
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="membership"
                                    value="inactive"
                                    checked={membershipStatus === "inactive"}
                                    onChange={(e) => setMembershipStatus( e.target.value )}
                                />
                                Inactive
                            </label>
                        </div> */}


                        <button className="signup_create-button" type="submit" onClick={handleSignup}>
                            Create Account
                        </button>
                    </form>
               
            </div>
        </div>
  );
};

export default SignupComponent;
