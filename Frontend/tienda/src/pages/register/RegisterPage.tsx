import { useState } from 'react';
import './register.css'
import Header from '../../components/Header';
import swals from "sweetalert2";
import { register } from './_service';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        shippingAddress: '',
        birthDate: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await register(formData);
        if (res.ok) {
            {
                swals.fire({
                    title: "Información",
                    text: "Usuario registrado correctamente, redirigiendo a la pagina de inicio.",
                    icon: "success",
                    imageHeight: 80,
                    imageWidth: 80,
                    showCloseButton: true,
                    confirmButtonText: "Seguir comprando"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                }
                )

            }
        }

        console.log('Usuario registrado:', formData);

    };

    return (
        <>
            <Header page='/' name='Tienda' />
            <div className="register-form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2>Registro de Usuario</h2>

                    <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Apellido:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Correo electrónico:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Dirección de envío:</label>
                        <input type="text" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Fecha de nacimiento:</label>
                        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>

                    <button type="submit">Registrarse</button>
                </form>
            </div>
        </>

    );
}
