import React, { useState, FormEventHandler } from 'react'
import Link from "next/link";
import type { NextPage } from "next";
import { useRouter } from "next/router";
// import { api } from "../utils/api";

const Signup: NextPage = () => {
    const [userInfo, setUserInfo] = useState({ username: "", email: "", password: "" });
    const router = useRouter();
    // const hello = api.example.hello.useQuery({ text: "from tRPC" });
    // const { mutateAsync } = api.user.signup.useMutation();
    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            // const result = await mutateAsync(userInfo);
            if (userInfo.username == '201') { 
                router.push("/signin");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        // <!-- component -->
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fullname"
                            placeholder="Full Name"
                            value={userInfo.username}
                            onChange={({ target }) =>
                                setUserInfo({ ...userInfo, username: target.value })
                            }
                        />

                        <input
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={userInfo.email}
                            onChange={({ target }) =>
                                setUserInfo({ ...userInfo, email: target.value })
                            }
                        />

                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password" />
                        <input
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={userInfo.password}
                            onChange={({ target }) =>
                                setUserInfo({ ...userInfo, password: target.value })
                            }
                        />

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-200 text-grey-dark hover:bg-green-300 focus:outline-none my-1"
                        >Create Account</button>
                    </form>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Terms of Service
                        </a> and
                        <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    {/* <a className="no-underline border-b border-blue text-blue" href="../login/">
                        Log in
                    </a>. */}
                    <Link href="/signin" className="text-sm cursor-pointer hover:underline hover:text-red-800 ease-in duration-150">
                        Go to login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
