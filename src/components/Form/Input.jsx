const Input = ({id, type, classes, placeholder,value, change, disabled, name,required} ) => {
    return (
      
      <input
          id={id}
          type={type}
          className={classes}
          placeholder={placeholder}
          value={value}
          onChange={change}
          disabled={disabled}
          name={name}
          required={required}
      />
    )
  }
  
  export default Input