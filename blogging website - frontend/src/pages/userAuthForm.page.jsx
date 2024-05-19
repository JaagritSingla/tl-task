import { Link, Navigate } from "react-router-dom";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png"
import { useContext,  useRef } from "react";
import { Toaster,toast } from "react-hot-toast";
import axios from "axios"
import { storeInSession } from "../common/session";
import { UserContext } from "../App";

const UserAuthForm= ({ type }) => {

    const authForm=useRef();

    let {userAuth: { access_token },setUserAuth}=useContext(UserContext)
    // const { UserAuth, setUserAuth } = useContext(UserContext);

    // const access_token = UserAuth?.access_token;
    
    console.log(access_token);
    // if(!access_token){
    //     console.log("hi")
    // }


    const userAuthTroughServer=(serverRoute,formData)=>{

        axios.post('http://localhost:3000'+serverRoute,formData)
        .then(({data})=>{
            storeInSession("user",JSON.stringify(data))
            setUserAuth(data)
        })
        .catch(({response})=>{
            toast.error(response.data.error)
        })
    }
    
    const handleSubmit= async (e)=>{

        e.preventDefault();

        let serverRoute=type=="sign-in"?"/signin":"/signup";

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        let form = new FormData(authForm.current);
        let formData={};

        for(let [key,value] of form.entries()){
            formData[key]=value;
        }
        console.log(formData)
        
        let { fullname, email, password } = formData;

        
        if(fullname){
            if (fullname.length < 3) {
                return toast.error("Fullname must be at least 3 letters long" );
            }
        }

        if (!email.length) {
            return toast.error("Add email" );
        }

        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid" );
        }

        if (!passwordRegex.test(password)) {
            return toast.error("Password should be 6-20 characters long and include at least one lowercase letter, one uppercase letter, and one numeric value" );
        }

        userAuthTroughServer(serverRoute,formData)
    }


    return (
        access_token?
        <Navigate to="/"/>
        :
        <section className="h-cover flex items-center justify-center">
            <Toaster/>
            <form ref={authForm} className="w-[80%= max-w-[400px]">
                <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
                    {type == "sign-in"? "Welcome back" :"Join Us Today"}
                </h1>

                {
                    type!="sign-in"?
                    <InputBox
                        name="fullname"
                        type="text"
                        placeholder="full name"
                        icon="fi-rr-user"
                    />
                    :""
                }
                <InputBox
                        name="email"
                        type="email"
                        placeholder="email"
                        icon="fi fi-rr-envelope"
                />
                <InputBox
                        name="password"
                        type="password"
                        placeholder="password"
                        icon="fi fi-rr-key"
                />

                <button 
                    className="btn-dark center mt-14" 
                    type="submit"
                    onClick={handleSubmit}
                >
                    
                    {type.replace("-"," ")}
                </button>

                <div className="relative w-full items-center flex gap-2 my-10 opacity-10 uppercase text-black font-bold">
                    <hr className="w-1/2 border-black"/>
                    <p>or</p>
                    <hr className="w-1/2 border-black"/>
                </div>

                <button className="btn-dark flex item-centere justify-center gap-4 w-[90%] center">
                    <img src={googleIcon}className="w-5"/>
                    continue with google
                </button>

                {
                    type=="sign-in"?
                    <p className="mt-6 text-dark-grey text-xl text-center">
                        Don't have ans account ?
                        <Link to="/signup" className="underline text-black text-xl ml-1">
                            Join us today
                        </Link>
                    </p>
                    :
                    <p className="mt-6 text-dark-grey text-xl text-center">
                        Already a Member ?
                        <Link to="/signin" className="underline text-black text-xl ml-1">
                            Sign in here.
                        </Link>
                    </p>
                }
            </form>
        </section>
    )
}
export default UserAuthForm;