import Input from "./Input"

const Form = ( {children, classes, submit}) => {
    return (
      
      <form className={classes} onSubmit={submit}>
  
          {children}
  
      </form>
    )
  }
  Form.Input = Input;
  export default Form