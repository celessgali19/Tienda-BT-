import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { getInformationProfile } from "./_service";
import { jwtDecode } from "jwt-decode";
import  './profile.css';
export default function ProfilePage() {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const [data, setData] = useState<any>({});

    useEffect(() => {
        const fetchInformation = async () => {
            try {
                //desencriptar jwt de user
                const decoded = jwtDecode<any>(user);

                const response = await getInformationProfile(decoded.userId, user);
                if (response.ok) {
                    setData(response.body);
                } else {
                    console.log('Error fetching information:', response.body);
                }
            } catch (error) {
                console.log('Error fetching information:', error);
            } finally {
                console.log('Error fetching information:');
            }
        };
        fetchInformation();
    }, []);

    return (
        <>
            <Header page='/' name='Tienda' />
            <div className="profile-page" style={{ padding: '2em' }}>
                <h1>Mi Perfil</h1>
                <table style={{ width: '100%', maxWidth: '600px', borderCollapse: 'collapse', marginTop: '1em' }}>
                    <tbody>
                        <tr>
                            <td style={{ fontWeight: 'bold', padding: '0.5em' }}>Nombre:</td>
                            <td style={{ padding: '0.5em' }}>{data.name}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold', padding: '0.5em' }}>Apellido:</td>
                            <td style={{ padding: '0.5em' }}>{data.lastName}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold', padding: '0.5em' }}>Correo electrónico:</td>
                            <td style={{ padding: '0.5em' }}>{data.email}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold', padding: '0.5em' }}>Dirección de envío:</td>
                            <td style={{ padding: '0.5em' }}>{data.shippingAddress}</td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: 'bold', padding: '0.5em' }}>Fecha de nacimiento:</td>
                            <td style={{ padding: '0.5em' }}>{data.birthDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
