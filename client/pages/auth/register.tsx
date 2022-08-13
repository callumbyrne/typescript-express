import { useForm } from "react-hook-form";
import axios from "axios";
import { ErrorMessage } from "@hookform/error-message";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/router";

const createUserSchema = object({
    name: string().min(1, {
        message: "Name is required",
    }),
    password: string().min(6, {
        message: "Password too short - should be 6 chars minimum",
    }),
    passwordConfirmation: string().min(1, {
        message: "Password confirmation is required",
    }),
    email: string({
        required_error: "Email is required",
    }).email("Not a valid email"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

const RegisterPage = () => {
    const [registerError, setRegisterError] = useState(null);

    const router = useRouter();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

    const onSubmit = async (values: CreateUserInput) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
                values
            );
            router.push("/");
        } catch (error: any) {
            setRegisterError(error.message);
        }
    };

    return (
        <>
            <p>{registerError}</p>
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
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        type='text'
                        placeholder='Jane Doe'
                        {...register("name")}
                    />
                    <ErrorMessage errors={errors} name='name' as='p' />
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

                <div className='form-element'>
                    <label htmlFor='passwordConfirmation'>
                        Confirm password
                    </label>
                    <input
                        id='passwordConfirmation'
                        type='password'
                        placeholder='******'
                        autoComplete='new-password'
                        {...register("passwordConfirmation")}
                    />
                    <ErrorMessage
                        errors={errors}
                        name='passwordConfirmation'
                        as='p'
                    />
                </div>
                <button type='submit'>SUBMIT</button>
            </form>
        </>
    );
};

export default RegisterPage;
