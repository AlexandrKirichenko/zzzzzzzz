import {FormikConfig, useFormik} from 'formik'
import React, {useContext} from 'react'
import "./Registration.module.scss";
import * as yup from 'yup';
import Input from "../../components/Input";
import AvatarInput from "../../components/AvatarInput"
import style from "./Registration.module.scss";
import {AuthContext} from '../../App';
import {RegistrationUserCredentials} from "../../types";
import Button from "../../components/Button";
import {gql, useMutation} from '@apollo/client';


const Registration: React.FC = () => {
    const context = useContext(AuthContext);
    
    const validationSchema = yup.object({
        login: yup
            .string()
            .matches(/^([^0-9]*)$/, "Name should not contain numbers")
            .required()
            .min(2),
        email: yup
            .string()
            .email()
            .required(),
        password: yup
            .string()
            .required()
            .min(8)
            .max(30),
        repeatPassword: yup
            .string().oneOf([yup.ref('password')], "Password mismatch")
            .required()
            .min(8)
            .max(30),
        avatar: yup
            .string()
            .notRequired()
            .url('Please enter correct url')
    })
    const [addUser, {loading}] = useMutation(REGISTER, {
        update(proxy, result){
            console.log(result)
        },
       variables: values;
    })
    const formikConfig: FormikConfig<RegistrationUserCredentials> = {
        enableReinitialize: false,
        initialValues: {
            login: '',
            password: '',
            repeatPassword: '',
            email: '',
            avatar: ''
        },
        onSubmit: (values) => {
            console.log(values);
            const message = JSON.stringify(values, null, 2);
            addUser();
            alert(message);
            setRegistrationFormValues(values);
        },
        validationSchema,
    };
   
    const formik = useFormik<RegistrationUserCredentials>(formikConfig);
   
    
    if (context === null) {
        return null;
    }
    const {setRegistrationFormValues} = context;
  
    
    return (
        <div className={style.wrap}>
            <div className={style.wrapForm}>
                <div className={style.headerForm}>Registration</div>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <Input
                        type={"text"}
                        id={"form-login-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.login}
                        touched={formik.touched.login}
                        {...formik.getFieldProps('login')}
                    />
                    <Input
                        type={"text"}
                        id={"form-email-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.email}
                        touched={formik.touched.email}
                        {...formik.getFieldProps('email')}
                    />
                    <Input
                        type={"password"}
                        id={"form-password-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.password}
                        touched={formik.touched.password}
                        {...formik.getFieldProps('password')}
                    />
            
                    <Input
                        type={"password"}
                        id={"form-repeatPassword-input"}
                        autoComplete={"off"}
                        inputError={formik.errors.repeatPassword}
                        touched={formik.touched.repeatPassword}
                        {...formik.getFieldProps('repeatPassword')}
                    />
                    <AvatarInput
                        inputProps={{
                            type: "text",
                            id: "form-avatar-input",
                            autoComplete: 'off',
                            inputError: formik.errors.avatar,
                            touched: formik.touched.avatar,
                            ...formik.getFieldProps('avatar')
                        }}
                        avatarProps={{
                            avatar: formik.getFieldProps('avatar').value,
                            nameAvatar: formik.getFieldProps('login').value,
                            sizeAvatar: "large"
                        }}
                    />
                    <div className={style.button}>
                        <Button type={"submit"} color={"primary"} size={'small'}> Register </Button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

const REGISTER = gql`
    mutation registration(
        $avatar: String!
        $email: String!
        $password: String!
        $login: String!
        $avatar: String
    ) {
        registration(
            registrationInput: {
                avatar: $avatar
                email: $email
                password: $password
                login: $login
                avatar: $avatar
            }
        )
        {
            token
            user {
                login
                email
                avatar
            }
        }
    }
`

export default Registration;
