import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./AuthPage.module.css";
import { useAuthStore } from "../../store/useAuthStore";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal = ({ isOpen, onClose }: EmailModalProps) => {
  const [email, setEmail] = useState("");
  const { forgotPassword, error, setError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await forgotPassword(email);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Введите ваш Email</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="Введите ваш email"
            required
            className={styles.modalInput}
          />
          <div className={styles.modalButtons}>
            <button type="submit" className={styles.modalSubmitButton}>
              Отправить
            </button>
            <button type="button" onClick={onClose} className={styles.modalCloseButton}>
              Закрыть
            </button>
          </div>
        </form>
        {error && <div className={styles.modalError}>Неправильный email</div>}
      </div>
    </div>
  );
};

export function AuthPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { signIn, error } = useAuthStore();

  const click = () => {
    navigate("/home");
  };

  const clickreg = () => {
    navigate("/registration");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChangep = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangee = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSignIn = async () => {
    await signIn(email, password, navigate);
  };

  return (
    <div className={styles.sky}>
      <div className={styles.stars}></div>
      <div className={styles.stars1}></div>
      <div className={styles.stars2}></div>
      <div className={styles.shootingstars}></div>
      <div className={styles.auth}>
        <div className={styles.Headbox}>
          <header className={styles.HEAD}>ВХОД В ПРОФИЛЬ</header>
          <h5 className={styles.Logintext}>Почта</h5>
          <input
            type="text"
            value={email}
            onChange={handleChangee}
            placeholder="Введите e-mail"
            className={styles.inputField}
          />
          <h5 className={styles.Passwordtext}>Пароль</h5>
          <input
            type="password"
            value={password}
            onChange={handleChangep}
            placeholder="Введите пароль"
            className={styles.inputField}
          />
          <Button
            onClick={toggleModal}
            sx={{
              color: "white",
              fontSize: { xs: "9px", sm: "10px" },
              top: 15,
              left: { xs: 20, sm: 57 },
              fontFamily: "Montserrat",
              opacity: 1,
            }}
          >
            Забыли пароль?
          </Button>
          <EmailModal isOpen={isModalOpen} onClose={toggleModal} />
          <div className={styles.Button}>
            <button className={styles.buttonAuth} onClick={handleSignIn}>
              Войти
            </button>
            {error && <div className={styles.errormessage}>Неправильный логин или пароль</div>}
          </div>
          <div className={styles.Button}>
            <button className={styles.buttonReg} onClick={clickreg}>
              Зарегистрироваться
            </button>
          </div>
          <Button
            onClick={click}
            color="inherit"
            sx={{
              color: "white",
              fontSize: { xs: "9px", sm: "10px" },
              top: 50,
              left: { xs: 100, sm: 155 },
              opacity: 1,
            }}
          >
            Назад на главную страницу
          </Button>
        </div>
      </div>
    </div>
  );
}