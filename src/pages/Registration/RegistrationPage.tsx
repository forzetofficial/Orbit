import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";
import { useAuthStore } from "../../store/useAuthStore";

export function RegistrationPage() {
  const navigate = useNavigate();
  const { signUp, error, setError } = useAuthStore();

  const [error1, setError1] = useState(false);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;
  const loginRegex = /^[a-z0-9](-?[a-z0-9]){2,20}$/i;

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPasswordreg1] = useState("");
  const [pass2, setPasswordreg2] = useState("");

  const clicktest = async () => {
    if (loginRegex.test(login) && emailRegex.test(email) && passwordRegex.test(pass1) && pass1 === pass2) {
      await signUp(email, pass1, login, navigate);
    } else {
      if (pass1 !== pass2) {
        setError1(true);
        setTimeout(() => setError1(false), 3000);
      } else if (!loginRegex.test(login) || !emailRegex.test(email)) {
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
    }
  };

  return (
    <div className={styles.sky}>
      <div className={styles.stars}></div>
      <div className={styles.stars1}></div>
      <div className={styles.stars2}></div>
      <div className={styles.shootingstars}></div>
      {error && <div className={styles.errormessage}>Неправильный логин или email</div>}
      <div className={styles.indiv}>
        <div className={styles.Headbox}>
          <header className={styles.HEAD}>РЕГИСТРАЦИЯ</header>

          <h5 className={styles.Logintext1}>Логин</h5>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
            className={styles.inputField}
          />

          <h5 className={styles.Etext}>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите e-mail"
            className={styles.inputField}
          />

          <h5 className={styles.Passwordtext1}>Пароль</h5>
          <input
            type="password"
            value={pass1}
            onChange={(e) => setPasswordreg1(e.target.value)}
            placeholder="Введите пароль"
            className={styles.inputField}
          />

          <h5 className={styles.Passwordtext11}>Повтор пароля</h5>
          <input
            type="password"
            value={pass2}
            onChange={(e) => setPasswordreg2(e.target.value)}
            placeholder="Повторите пароль"
            className={styles.inputField}
          />

          <div className={styles.Button}>
            <button className={styles.buttonrev} onClick={clicktest}>
              Зарегистрироваться
            </button>
          </div>

          {error1 && <div className={styles.errormessage}>Пароли не совпадают</div>}
          <Button
            onClick={() => navigate("/auth")}
            color="secondary"
            sx={{
              color: "white",
              fontSize: { xs: "9px", sm: "11px" },
              top: 40,
              left: { xs: 130, sm: 190 },
            }}
          >
            Назад ко входу
          </Button>
        </div>
      </div>
    </div>
  );
}