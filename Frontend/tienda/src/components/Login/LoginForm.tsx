import { useState, type FormEvent } from 'react';
import './_login.css';
import { login } from './_service';
import swals from "sweetalert2";
import { SweetModal } from '../ModalPopup/SweetAlert';

export default function LoginForm(props: any) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await login({ email, password });
        if (response && response.ok) {
            swals.fire({
                title: "Información",
                text: "Usuario valido, redirigiendo a la pagina de inicio.",
                icon: "success",
                imageHeight: 80,
                imageWidth: 80,
                showCloseButton: true,
                confirmButtonText: "Seguir comprando"
            }).then((result) => {
                localStorage.setItem('user', JSON.stringify(response.body.token));
                if (result.isConfirmed) {
                    props.getCartItems();
                    window.location.reload
                }

            });
        } else {
            swals.fire({
                title: "Información",
                text: "Por favor, ingresa un usuario valido.",
                icon: "error",
                imageHeight: 80,
                imageWidth: 80,
                showCloseButton: true,
                confirmButtonText: "Iniciar sesión"
            }).then((result) => {
                if (result.isConfirmed) {
                    SweetModal({
                        html: <LoginForm />,
                        width: 'auto'
                    })
                }
            });
        }


    };

    return (


        <form onSubmit={handleSubmit} className="login-form">
            <h2>Iniciar Sesión</h2>

            <div>
                <label htmlFor="email">Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                />
            </div>

            <div>
                <label htmlFor="password">Contraseña</label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                />
            </div>

            <button type="submit">Ingresar</button>
        </form>

    );
}
