import './Button.css'
const Button = (props) => {
    return(
        <>
            <button className={props.class} onClick={props.func}>{props.children}</button>
        </>
    )
}

export default Button;