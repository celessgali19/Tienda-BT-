import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import withReactContent, { type ReactSweetAlertOptions } from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const SweetSuccess = (config?: ReactSweetAlertOptions) => {
    return MySwal.fire({
        text: 'Proceso exitoso.',
        icon: "success",
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: 'Cerrar',
        ...config,
    })
}

export const SweetError = (config?: ReactSweetAlertOptions) => {
    return MySwal.fire({
        title: "Error",
        text: 'Ha ocurrido un error.',
        icon: "error",
        showConfirmButton: false,
        showDenyButton: true,
        denyButtonText: 'Cerrar',
        ...config,
    })
}

export const SweetWaiting = (config?: ReactSweetAlertOptions) => {
    MySwal.fire({
        title: "Procesando...",
        icon: "info",
        didOpen: () => {
            MySwal.showLoading()
        },
        allowOutsideClick: () => !MySwal.isLoading(),
        ...config,
    })
    return MySwal
}

export const SweetModal = (config?: ReactSweetAlertOptions) => {
    return MySwal.fire({
        showConfirmButton: false,
        showCloseButton: true,
        ...config,
    })
}


export default MySwal
