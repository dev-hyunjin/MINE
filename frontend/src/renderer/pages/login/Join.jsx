import { useState } from 'react';
import styles from '../../../styles/login/join.module.css'; // 올바른 경로로 CSS 모듈 임포트
import InputForm from "../../components/login/LoginComponent"; // InputForm 컴포넌트 확인
import InputForm2 from "../../components/login/LoginComponent"; // 임포트 오류 없는지 확인

const Join = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        passwordCheck: "",
        nickname: "",
        address: "",
        addressDetail: "",
        category1: "",
        category2: "",
        category3: ""
    });

    const [error, setError] = useState({
        emailError: '',
        passwordError: '',
        passwordCheckError: '',
        nicknameError: '',
        addressError: ''
    });

    const onChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const onClick = () => {
        if (validateForm()) {
            alert('회원가입 성공');
        }
    };

    const validateForm = () => {
        const errors = {};

        const emailRegex = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/;
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,}$/;

        if (!input.email) {
            errors.emailError = '이메일을 입력하세요';
        } else if (!emailRegex.test(input.email)) {
            errors.emailError = '이메일 형식이 맞지 않습니다';
        }

        if (!input.password) {
            errors.passwordError = '비밀번호를 입력하세요';
        } else if (!passwordRegex.test(input.password)) {
            errors.passwordError = '비밀번호는 8자 이상, 영어 대/소문자, 특수문자가 포함되어야합니다';
        }

        if (!input.passwordCheck) {
            errors.passwordCheckError = '비밀번호를 다시 한번 적어주세요';
        } else if (input.passwordCheck !== input.password) {
            errors.passwordCheckError = '비밀번호가 동일하지 않습니다';
        }

        if (!input.nickname) {
            errors.nicknameError = '닉네임을 입력하세요';
        } else if (input.nickname.length > 10) {
            errors.nicknameError = '닉네임은 10자 이하여야합니다';
        }

        if (!input.address) {
            errors.addressError = '주소를 선택하세요';
        }

        if (input.address && !input.addressDetail) {
            errors.addressError = '상세주소를 입력하세요';
        }

        setError(errors);

        return Object.keys(errors).length === 0;
    }

    return (
        <div className={styles['login-container']}>
            <div className={styles['signup-form']}>
                <h2>이메일로 회원가입</h2>
                <form>
                    <div className={styles['form-group']}>
                        <InputForm type={'email'} input={input} onChange={onChange} />
                        {error.emailError && <span className={styles['error-message']}>{error.emailError}</span>}
                    </div>
                    <div className={styles['form-group']}>
                        <InputForm type={'password'} input={input} onChange={onChange} />
                        {error.passwordError && <span className={styles['error-message']}>{error.passwordError}</span>}
                    </div>
                    <div className={styles['form-group']}>
                        <InputForm type={'passwordCheck'} input={input} onChange={onChange} />
                        {error.passwordCheckError && <span className={styles['error-message']}>{error.passwordCheckError}</span>}
                    </div>
                    <div className={styles['form-group']}>
                        <InputForm type={'nickname'} input={input} onChange={onChange} />
                        {error.nicknameError && <span className={styles['error-message']}>{error.nicknameError}</span>}
                    </div>
                    <div className={styles['form-group']}>
                        <label>주소</label>
                        <div className={styles['address-container']}>
                            <input type="text" name='address' placeholder="주소를 찾아주세요" onChange={onChange} value={input.address} readOnly />
                            <button type='button' className={styles['find-address']}>찾기</button>
                        </div>
                        <input type="text" name='addressDetail' placeholder="상세주소 입력" onChange={onChange} value={input.addressDetail} readOnly />
                        {error.addressError && <span className={styles['error-message']}>{error.addressError}</span>}
                    </div>
                    <div className={styles['form-group']}>
                        <label>관심 카테고리</label>
                        <Category onChange={onChange} input={input.category1} name={'category1'} />
                        <Category onChange={onChange} input={input.category2} name={'category2'} />
                        <Category onChange={onChange} input={input.category3} name={'category3'} />
                    </div>
                    <button type="button" onClick={onClick} className={styles['submit-button']}>제출하기</button>
                </form>
            </div>
        </div>
    );
}

const Category = ({ onChange, input, name }) => {
    return (
        <>
            <select id={name} name={name} onChange={onChange} value={input}>
                <option value="">카테고리</option>
                <option value="1">머리</option>
                <option value="2">어깨</option>
                <option value="3">무릎</option>
                <option value="4">발</option>
                <option value="5">스웩</option>
            </select>
        </>
    )
}

export default Join;
