
const Label = ({children, classes, htmlFor}) => {
  return (

    <label
    className={classes}
    htmlFor={htmlFor}
    >
        {children}
        
    </label>
  )
}

export default Label