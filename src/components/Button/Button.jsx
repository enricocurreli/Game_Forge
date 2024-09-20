

const Button = ({children, click, mouseOver, classes, type}) => {

  
  
  return (
    
    <button className={"btn " + classes}  onClick={click} type={type} > {children}</button>

  )
}

export default Button;

