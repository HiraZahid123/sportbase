export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/logo.png"
            alt="Sportbase Logo"
            className={props.className}
        />
    );
}
