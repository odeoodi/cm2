import {useState} from 'react';
import {useNavigate} from 'react-router-dom'

const useSignupUser = (setIsAuthenticated) => {
    const [name, setName] =useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [gender, setGender] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [membershipStatus, setMembershipStatus] = useState("")

    const handleSignupUser = async () => {
        if (password !== password) {
            console.error("Passwords don't match!")
        }
        try {
            const response = await fetch("http://localhost:4000/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, 
                    email, 
                    password, 
                    phone_number: phoneNumber, 
                    gender, 
                    date_of_birth: dateOfBirth,
                    membership_status: membershipStatus
                })
            });
            console.log("made fetch")

            if (response.ok) {
                const user = await response.json()
                localStorage.setItem("user", JSON.stringify(user));
                console.log("User signed up successfully")
                setIsAuthenticated(true)
                navigate("/")
            } else {
                console.error("Signup failed")
            }
        } catch (err) {
            console.error("Error during signup", err)
        }
    }
    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        password2, setPassword2,
        phoneNumber, setPhoneNumber,
        gender, setGender,
        dateOfBirth, setDateOfBirth,
        membershipStatus, setMembershipStatus,
        handleSignupUser
    }
}

export default useSignupUser;

