import { JSX } from "preact/jsx-runtime";
import { UserRole } from "../../lib/repositories/UsuarioRepo.ts";

interface Props {
    haveUser: boolean;
    userRole: UserRole | null;
}

export default function Header(props: Props) {
    const navBar: JSX.Element[] = [];
    if (props.haveUser && props.userRole !== null) {

        if (props.userRole >= UserRole.BARISTA) {
            const _navBar = [
                <>
                    <div className="flex items-center">
                        <a
                            href="#"
                            className="text-slate-200 hover:text-slate-50 transition-all font-bold text-xl"
                        >
                            Pedidos
                        </a>
                    </div>
                </>,
            ];
            navBar.push(..._navBar);
        }

        if (props.userRole >= UserRole.MESERO) {
            const _navBar = [
                <>
                    <div className="flex items-center">
                        <a
                            href="#"
                            className="text-slate-200 hover:text-slate-50 transition-all font-bold text-xl"
                        >
                            Menu
                        </a>
                    </div>
                </>,
            ];
            navBar.push(..._navBar);
        }

        if (props.userRole >= UserRole.ADMIN) {
            const _navBar = [
                <>
                    <div className="flex items-center">
                        <a
                            href="#"
                            className="text-slate-200 hover:text-slate-50 transition-all font-bold text-xl"
                        >
                            Usuarios
                        </a>
                    </div>
                </>,
                <>
                    <div className="flex items-center">
                        <a
                            href="#"
                            className="text-slate-200 hover:text-slate-50 transition-all font-bold text-xl"
                        >
                            Reportes
                        </a>
                    </div>
                </>,
            ];
            navBar.push(..._navBar);
        }

        navBar.push(
            <>
                <div className="flex items-center">
                    <a
                        href="/logout"
                        className="text-pink-300 hover:text-pink-700 transition-all font-bold text-xl"
                    >
                        Cerrar sesion
                    </a>
                </div>
            </>,
        );
    }
    return (
        <>
            <nav className="bg-indigo-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <a
                                href="/"
                                className="text-white font-bold text-xl"
                            >
                                La Cafetería
                            </a>
                        </div>
                        {navBar}
                    </div>
                </div>
            </nav>
        </>
    );
}
