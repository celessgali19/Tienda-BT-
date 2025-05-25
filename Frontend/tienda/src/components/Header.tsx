import { useNavigate } from 'react-router-dom';

interface Props {
    page?: string;
    name?: string;
}

export default function Header({ page, name }: Props) {
    
    const navigate = useNavigate();

    return (
        <>
            {localStorage.getItem('user') && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', gap: '1rem' }}>
                    <button
                        onClick={() => page && navigate(page)}
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
                    >
                        {name}
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('user');
                            window.location.reload();
                        }}
                        style={{ padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#f44336', color: '#fff', border: 'none' }}
                    >
                        Cerrar sesión
                    </button>
                </div>

            )}
            {
                !localStorage.getItem('user') && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem', gap: '1rem' }}>
                        <button
                            onClick={() => page && navigate(page)}
                            style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
                        >
                            {name}
                        </button>
                    </div>

                )
            }

        </>

    );
}
