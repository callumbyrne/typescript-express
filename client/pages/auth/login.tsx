import { useForm } from "react-hook-form";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/router";

export const createSessionSchema = object({
    email: string().min(1, { message: "Email is required" }),
    password: string().min(1, { message: "Password is required" }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const LoginPage = () => {
    const [loginError, setLoginError] = useState(null);

    const router = useRouter();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateSessionInput>({
        resolver: zodResolver(createSessionSchema),
    });

    const onSubmit = async (values: CreateSessionInput) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                values,
                { withCredentials: true }
            );
            router.push("/");
        } catch (error: any) {
            setLoginError(error.message);
        }
    };

    return (
        <>
            <p>{loginError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-element'>
                    <label htmlFor='email'>Email</label>
                    <input
                        id='email'
                        type='email'
                        placeholder='jane.doe@example.com'
                        autoComplete='username'
                        {...register("email")}
                    />
                    <ErrorMessage errors={errors} name='email' as='p' />
                </div>

                <div className='form-element'>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        placeholder='******'
                        autoComplete='new-password'
                        {...register("password")}
                    />
                    <ErrorMessage errors={errors} name='password' as='p' />
                </div>

                <button type='submit'>SUBMIT</button>
            </form>
        </>
    );
};

export default LoginPage;
